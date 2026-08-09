'use client';
import { Layout, Menu, Typography } from 'antd';
import { SettingOutlined, DashboardOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} theme="dark">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>
            Wedding Admin
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={[
            {
              key: '/admin',
              icon: <DashboardOutlined />,
              label: <Link href="/admin">Dashboard</Link>,
            },
            {
              key: '/',
              icon: <LogoutOutlined />,
              label: <Link href="/">Xem thiệp</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, paddingLeft: '24px' }}>
          <Title level={3} style={{ marginTop: '16px', marginBottom: 0 }}>
            Trang Quản Trị
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, borderRadius: '8px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
