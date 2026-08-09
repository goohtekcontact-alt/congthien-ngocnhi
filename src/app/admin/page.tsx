'use client';
import { useState, useEffect, useCallback } from 'react';
import { Button, message, Spin, Drawer, Form, Select, Input, Space, Card, Row, Col, Upload } from 'antd';
import { SaveOutlined, SettingOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import Template1 from '@/components/wedding-templates/Template1';
import api from '@/lib/axios';

const setNestedValue = (obj: any, path: string, value: any): any => {
  const keys = path.split(/[.\[\]]/).filter(Boolean);
  const newObj = Array.isArray(obj) ? [...obj] : { ...obj };
  let current: any = newObj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i+1];
    // Nếu key tiếp theo là số, tạo mảng, ngược lại tạo object
    if (current[key] === undefined || current[key] === null) {
        current[key] = !isNaN(Number(nextKey)) ? [] : {};
    } else {
        current[key] = Array.isArray(current[key]) ? [...current[key]] : { ...current[key] };
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  return newObj;
};

export default function AdminPage() {
  const [weddingData, setWeddingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetch('/api/wedding', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setWeddingData(data);
        form.setFieldsValue(data); // Đồng bộ cho drawer form
        setLoading(false);
      })
      .catch(err => {
        message.error('Lỗi khi tải dữ liệu');
        setLoading(false);
      });
  }, [form]);

  const handleFieldChange = useCallback((fieldPath: string, value: any) => {
    setWeddingData((prev: any) => {
      const newData = setNestedValue(prev || {}, fieldPath, value);
      form.setFieldsValue(newData); // Đồng bộ cho drawer form
      return newData;
    });
  }, [form]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/wedding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weddingData),
      });
      if (res.ok) {
        message.success('Lưu cấu hình thành công!');
      } else {
        message.error('Lưu thất bại!');
      }
    } catch (error) {
      message.error('Lưu thất bại!');
    }
    setSaving(false);
  };

  const handleDrawerValuesChange = (changedValues: any, allValues: any) => {
    // Chỉ cập nhật các giá trị đã thay đổi thay vì override toàn bộ
    // Để cho an toàn, ta có thể ghi đè toàn bộ vì Drawer Form chứa đủ dữ liệu
    setWeddingData(allValues);
  };

  const uploadProps = (fieldName: string | (string | number)[]): UploadProps => ({
    name: 'file',
    action: '/api/upload',
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        const url = info.file.response.url || info.file.response.relativePath;
        message.success(`${info.file.name} tải lên thành công`);
        
        let pathStr = Array.isArray(fieldName) ? fieldName.join('.') : fieldName;
        handleFieldChange(pathStr, url);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} tải lên thất bại.`);
      }
    },
  });

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: 60 }}>
      {/* Floating Toolbar */}
      <div style={{
        position: 'fixed', top: 16, right: 16, zIndex: 1000,
        display: 'flex', gap: 12, background: 'rgba(255,255,255,0.9)', 
        padding: '8px 16px', borderRadius: 32, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(8px)'
      }}>
        <Button 
          type="default" 
          icon={<SettingOutlined />} 
          onClick={() => setDrawerVisible(true)}
          shape="round"
        >
          Cài đặt nâng cao
        </Button>
        <Button 
          type="primary" 
          icon={<SaveOutlined />} 
          onClick={handleSave} 
          loading={saving}
          shape="round"
          style={{ background: '#db2777', borderColor: '#db2777' }}
        >
          Lưu thay đổi
        </Button>
      </div>

      {/* Live Preview Area */}
      <div style={{ margin: '0 auto', width: '100%', maxWidth: 600, background: '#fff', minHeight: '100vh', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
        <Template1 weddingData={{ ...weddingData, editMode: true, onFieldChange: handleFieldChange }} />
      </div>

      {/* Advanced Settings Drawer */}
      <Drawer
        title="Cài đặt Nâng cao"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={500}
      >
        <Form 
          form={form} 
          layout="vertical" 
          onValuesChange={handleDrawerValuesChange}
        >
          <Card title="Cấu hình Chung" size="small" style={{ marginBottom: 16 }}>
            <Form.Item name="inviteType" label="Loại thiệp đang thiết kế">
              <Select>
                <Select.Option value="chung">Thiệp Chung</Select.Option>
                <Select.Option value="nhaGai">Nhà Gái</Select.Option>
                <Select.Option value="nhaTrai">Nhà Trai</Select.Option>
              </Select>
            </Form.Item>
             <Form.Item name="invitationMsg" label="Lời mời">
              <Input.TextArea rows={3} placeholder="VD: Trân trọng kính mời..." />
            </Form.Item>
          </Card>

          <Card title="Sự kiện (Dòng thời gian)" size="small" style={{ marginBottom: 16 }}>
             <Form.List name="events">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'time']}
                        rules={[{ required: true, message: 'Nhập giờ' }]}
                      >
                        <Input placeholder="Thời gian (vd: 17:30)" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'title']}
                        rules={[{ required: true, message: 'Nhập tên sự kiện' }]}
                      >
                        <Input placeholder="Tên sự kiện" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Thêm sự kiện
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Card>

          <Card title="Cấu hình Hình ảnh nâng cao" size="small" style={{ marginBottom: 16 }}>
            <div style={{ color: '#666', fontSize: 13, marginBottom: 12, fontStyle: 'italic' }}>
              Mẹo: Các ảnh chính đã có thể sửa trực tiếp ngoài giao diện thiệp (nhấn vào ảnh để đổi). Ở đây chỉ dành cho các ảnh nền hoặc các ảnh ẩn.
            </div>
             <Row gutter={16}>
               <Col span={12}>
                  <Form.Item name={['images', 'heroImage']} label="Ảnh bìa (Phụ)">
                    <Upload {...uploadProps(['images', 'heroImage'])}>
                      <Button icon={<UploadOutlined />}>Tải lên</Button>
                    </Upload>
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item shouldUpdate>
                    {() => {
                        const img = form.getFieldValue(['images', 'heroImage']);
                        return img ? <img src={img} alt="Hero" style={{ width: '100%', maxHeight: 100, objectFit: 'cover', borderRadius: 8 }} /> : null;
                    }}
                  </Form.Item>
               </Col>
             </Row>
          </Card>
        </Form>
      </Drawer>
    </div>
  );
}

