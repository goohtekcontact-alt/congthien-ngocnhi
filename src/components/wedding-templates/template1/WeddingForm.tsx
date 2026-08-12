'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { message } from 'antd'
import { A, OLIVE, OLIVE_BG, FONT_SANS, FONT_SERIF, fVariants, fImgVariants, marginConfig, fZoomIn, fSlideLeft, fRotateIn } from './shared'

export function WeddingForm({ d }: { d: any }) {
  const weddingType = d.weddingType || 'bride'
  const [attendance, setAttendance] = useState('')
  const [guestCount, setGuestCount] = useState('1 người')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!attendance) {
      message.warning('Vui lòng chọn trạng thái tham dự!')
      return
    }

    try {
      setIsSubmitting(true)

      // URL Web App của Google Apps Script. 
      // Có thể cấu hình ở đây hoặc truyền qua biến d.googleSheetUrl
      const scriptURL = d.googleSheetUrl || 'https://script.google.com/macros/s/AKfycbzZevFhIpP6Uzk6KSVcLqiF1qpCG8owesZ-FGAfOcq4ru7pCzdI3acaMs23MHEwsn6e/exec' 

      if (!scriptURL) {
        // Mock request nếu chưa cấu hình Google Sheet
        await new Promise(resolve => setTimeout(resolve, 800))
        message.success('Cảm ơn bạn đã xác nhận tham dự! (Bản dùng thử chưa gắn link Sheet)')
        return
      }

      const formData = new FormData()
      formData.append('Tên khách mời', d.guestName || 'Khách vãng lai')
      formData.append('Sẽ tham dự', attendance === 'yes' ? 'Có' : 'Không')
      formData.append('Số lượng', guestCount)
      formData.append('Loại thiệp', weddingType === 'groom' ? 'Nhà Trai' : (weddingType === 'bride' ? 'Nhà Gái' : 'Chung'))
      formData.append('Thời gian gửi', new Date().toLocaleString('vi-VN'))

      await fetch(scriptURL, { 
        method: 'POST', 
        body: formData,
        mode: 'no-cors' // Google Apps Script yêu cầu no-cors đối với form
      })

      message.success('Cảm ơn bạn đã xác nhận tham dự!')
    } catch (error) {
      console.error(error)
      message.error('Có lỗi xảy ra, vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const em = !!d.editMode
  const onFC = d.onFieldChange
  const [bankConfigModal, setBankConfigModal] = useState<'groom' | 'bride' | null>(null);
  const [bankForm, setBankForm] = useState({ bankName: '', bankId: '', accountNumber: '', accountName: '' });
  const [qrModal, setQrModal] = useState<'groom' | 'bride' | null>(null);

  const bankGroom = d.bankInfo?.groom || {};
  const bankBride = d.bankInfo?.bride || {};
  const activeBank = qrModal === 'groom' ? bankGroom : bankBride;
  const qrUrl = activeBank.bankId && activeBank.accountNumber
    ? `https://img.vietqr.io/image/${activeBank.bankId}-${activeBank.accountNumber}-compact2.jpg?addInfo=Mung+cuoi&accountName=${encodeURIComponent(activeBank.accountName || '')}`
    : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 500, margin: '0 auto', fontFamily: FONT_SANS, padding: '0 16px', color: OLIVE, marginTop: 80 }}>

      {/* RSVP */}
      <section style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40 }}>
        <motion.div variants={fZoomIn} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.1} style={{ position: 'relative', width: 72, height: 24, marginBottom: 32 }}>
          <img src={A.heartwithline} alt="divider" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </motion.div>

        <motion.h2 variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.2}
          style={{ fontSize: 28, letterSpacing: '0.1em', fontWeight: 500, marginBottom: 4 }}>XÁC NHẬN THAM DỰ</motion.h2>
        <motion.p variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.3}
          style={{ fontStyle: 'italic', fontSize: 14, color: OLIVE, marginBottom: 40 }}>Bạn sẽ tham dự chứ?</motion.p>

        {/* Radio options */}
        {weddingType === 'all' ? (
          <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.4}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {['Nhất định mình sẽ tham dự nhà trai', 'Nhất định mình sẽ tham dự nhà gái', 'Tiếc quá, mình không tham dự được'].map((label, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input type="radio" name="attend" style={{ width: 20, height: 20, accentColor: OLIVE_BG }} onChange={() => setAttendance(i < 2 ? 'yes' : 'no')} />
                <span style={{ fontStyle: 'italic', fontSize: 15 }}>{label}</span>
              </label>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.4}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <input type="radio" name="attend" style={{ width: 20, height: 20, accentColor: OLIVE_BG }} onChange={() => setAttendance('yes')} />
              <span style={{ fontStyle: 'italic', fontSize: 15 }}>
                {weddingType === 'groom' ? 'Nhất định mình sẽ tham dự nhà trai' : 'Nhất định mình sẽ tham dự nhà gái'}
              </span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <input type="radio" name="attend" style={{ width: 20, height: 20, accentColor: OLIVE_BG }} onChange={() => setAttendance('no')} />
              <span style={{ fontStyle: 'italic', fontSize: 15 }}>Tiếc quá, mình không tham dự được</span>
            </label>
          </motion.div>
        )}

        {/* Guest count */}
        <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.5} style={{ width: '100%' }}>
          <AnimatePresence>
            {attendance !== 'no' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', overflow: 'hidden', marginBottom: 40 }}
              >
                <div style={{ paddingTop: 4 }}>
                  <p style={{ fontStyle: 'italic', fontSize: 15, color: OLIVE, marginBottom: 8 }}>Số lượng người tham dự</p>
                  <input
                    type="text"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 16px', fontStyle: 'italic', color: '#6b7280', outline: 'none', fontSize: 15 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.6}
          disabled={isSubmitting}
          onClick={handleSubmit}
          style={{ background: isSubmitting ? '#9ca3af' : OLIVE_BG, color: '#fff', padding: '12px 0', borderRadius: 9999, width: '60%', fontSize: 16, fontWeight: 500, boxShadow: '0 2px 4px rgba(0,0,0,0.12)', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginBottom: 60, position: 'relative', zIndex: 10 }}>
          {isSubmitting ? 'Đang gửi...' : 'Gửi xác nhận'}
        </motion.button>
      </section>

      {/* Rose decoration */}
      <motion.div variants={fZoomIn} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.3} style={{ position: 'relative', width: 480, maxWidth: '100%', height: 48, marginTop: -80 }}>
        <img src={A.twinrose} alt="Rose" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '0 16px' }} />
      </motion.div>

      {/* Gift box */}
      {false && (
      <section style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, letterSpacing: '0.1em', fontWeight: 500, marginBottom: 16 }}>HỘP MỪNG CƯỚI</h2>
        <p style={{ fontStyle: 'italic', fontSize: 14, color: OLIVE, lineHeight: 1.6, maxWidth: 280, marginBottom: 40 }}>
          Cảm ơn tình cảm của mọi người đã dành cho chúng mình.
        </p>

        <div style={{ width: '100%', display: 'flex', gap: 40, justifyContent: 'center' }}>
          {(weddingType === 'all' || weddingType === 'bride') && (
            <motion.div variants={fRotateIn} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.2}
              style={{ position: 'relative', width: 160, height: 160, background: OLIVE_BG, borderRadius: 40, padding: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)', marginBottom: 80, cursor: 'pointer' }}
              onClick={() => setQrModal('bride')}
            >
              {em && (
                <button
                  onClick={e => {
                    e.stopPropagation()
                    setBankForm({
                      bankName: bankBride.bankName || '',
                      bankId: bankBride.bankId || '',
                      accountNumber: bankBride.accountNumber || '',
                      accountName: bankBride.accountName || '',
                    })
                    setBankConfigModal('bride')
                  }}
                  style={{
                    position: 'absolute', top: -8, right: -8, zIndex: 10,
                    width: 28, height: 28, borderRadius: '50%',
                    background: '#fff',
                    border: '1px solid #e5e7eb', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    padding: 0,
                  }}
                  title="Cấu hình ngân hàng Nhà Gái"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                    stroke={OLIVE} strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              )}
              <img src={A.gift} alt="Gift" style={{ width: '100%', height: '100%', objectFit: 'contain', marginBottom: 16 }} />
              <h3 style={{ position: 'absolute', bottom: 6, fontSize: 14, color: '#fff', fontStyle: 'italic' }}>Nhà gái</h3>
            </motion.div>
          )}

          {(weddingType === 'all' || weddingType === 'groom') && (
            <motion.div variants={fRotateIn} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.3}
              style={{ position: 'relative', width: 160, height: 160, background: OLIVE_BG, borderRadius: 40, padding: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)', marginBottom: 80, cursor: 'pointer' }}
              onClick={() => setQrModal('groom')}
            >
              {em && (
                <button
                  onClick={e => {
                    e.stopPropagation()
                    setBankForm({
                      bankName: bankGroom.bankName || '',
                      bankId: bankGroom.bankId || '',
                      accountNumber: bankGroom.accountNumber || '',
                      accountName: bankGroom.accountName || '',
                    })
                    setBankConfigModal('groom')
                  }}
                  style={{
                    position: 'absolute', top: -8, right: -8, zIndex: 10,
                    width: 28, height: 28, borderRadius: '50%',
                    background: '#fff',
                    border: '1px solid #e5e7eb', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    padding: 0,
                  }}
                  title="Cấu hình ngân hàng Nhà Trai"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                    stroke={OLIVE} strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              )}
              <img src={A.gift} alt="Gift" style={{ width: '100%', height: '100%', objectFit: 'contain', marginBottom: 16 }} />
              <h3 style={{ position: 'absolute', bottom: 6, fontSize: 14, color: '#fff', fontStyle: 'italic' }}>Nhà trai</h3>
            </motion.div>
          )}
        </div>
      </section>
      )}
      {/* ═══ QR MODAL MỪNG CƯỚI ═══ */}
      {qrModal && (
        <div
          onClick={() => setQrModal(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: '28px 24px 20px',
              maxWidth: 320,
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setQrModal(null)}
              style={{
                position: 'absolute', top: 12, right: 14,
                background: 'none', border: 'none', fontSize: 22,
                cursor: 'pointer', color: '#999', lineHeight: 1,
              }}
            >×</button>

            <div style={{ fontFamily: FONT_SERIF, fontSize: 24, color: OLIVE, marginBottom: 4 }}>
              Hộp Mừng Cưới
            </div>
            <div style={{ fontSize: 13, color: '#aaa', letterSpacing: 1, marginBottom: 16 }}>
              {qrModal === 'groom' ? '🤵 NHÀ TRAI' : '👰 NHÀ GÁI'}
            </div>

            {qrUrl ? (
              <img
                src={qrUrl}
                alt="QR mừng cưới"
                style={{ width: '100%', maxWidth: 220, borderRadius: 12, margin: '0 auto', display: 'block' }}
              />
            ) : (
              <div style={{ padding: '24px 0', color: '#bbb', fontSize: 14 }}>
                Chưa cấu hình số tài khoản
              </div>
            )}

            {activeBank.accountNumber && (
              <div style={{ marginTop: 16, background: '#faf8f5', borderRadius: 12, padding: '12px 16px', textAlign: 'left' }}>
                <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>Thông tin tài khoản</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#3d3545' }}>{activeBank.accountName}</div>
                <div style={{ fontSize: 14, color: '#6f6f6f', marginTop: 2 }}>
                  {activeBank.bankName} · {activeBank.accountNumber}
                </div>
              </div>
            )}

            <div style={{ marginTop: 14, fontSize: 12, color: '#bbb', fontStyle: 'italic' }}>
              Nhấn ra ngoài để đóng
            </div>
          </div>
        </div>
      )}

      {/* ═══ BANK CONFIG MODAL (chỉ hiện khi editMode) ═══ */}
      {em && bankConfigModal && (
        <div
          onClick={() => setBankConfigModal(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 20,
              padding: '24px 20px 20px', maxWidth: 340, width: '92%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative',
            }}
          >
            <button onClick={() => setBankConfigModal(null)}
              style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#999' }}
            >×</button>

            <div style={{ fontFamily: FONT_SERIF, fontSize: 22, color: OLIVE, marginBottom: 4, textAlign: 'center' }}>
              Cấu hình Hộp Quà
            </div>
            <div style={{ fontSize: 13, color: '#aaa', textAlign: 'center', marginBottom: 18 }}>
              {bankConfigModal === 'groom' ? '🤵 Nhà Trai (Chú Rể)' : '👰 Nhà Gái (Cô Dâu)'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {([
                { label: 'Tên ngân hàng', key: 'bankName', placeholder: 'VD: MB Bank, Vietcombank...' },
                { label: 'Mã VietQR', key: 'bankId', placeholder: 'VD: MB, VCB, TCB...' },
                { label: 'Số tài khoản', key: 'accountNumber', placeholder: 'VD: 0334806461' },
                { label: 'Tên chủ TK', key: 'accountName', placeholder: 'VD: NGUYEN VAN A' },
              ] as const).map(({ label, key, placeholder }) => (
                <div key={key}>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>
                    {label}
                    {key === 'bankId' && (
                      <a href="https://api.vietqr.io/v2/banks" target="_blank" rel="noreferrer"
                        style={{ marginLeft: 8, fontSize: 11, color: '#60a5fa', textDecoration: 'underline' }}>
                        Tra cứu mã
                      </a>
                    )}
                  </div>
                  <input
                    value={bankForm[key as keyof typeof bankForm]}
                    onChange={e => {
                      const val = (key === 'bankId' || key === 'accountName')
                        ? e.target.value.toUpperCase() : e.target.value
                      setBankForm(prev => ({ ...prev, [key]: val }))
                    }}
                    placeholder={placeholder}
                    style={{
                      width: '100%', padding: '8px 12px',
                      border: '1px solid #e5e7eb', borderRadius: 8,
                      fontSize: 14, outline: 'none', boxSizing: 'border-box',
                      fontFamily: 'sans-serif',
                    }}
                  />
                </div>
              ))}

              {bankForm.bankId && bankForm.accountNumber && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fdf2f8', borderRadius: 12, padding: '10px 12px' }}>
                  <img
                    src={`https://img.vietqr.io/image/${bankForm.bankId}-${bankForm.accountNumber}-compact2.jpg?addInfo=Mung+cuoi&accountName=${encodeURIComponent(bankForm.accountName)}`}
                    alt="QR preview"
                    style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover' }}
                  />
                  <div style={{ fontSize: 13, color: '#555' }}>
                    <div style={{ fontWeight: 600 }}>{bankForm.accountName || '---'}</div>
                    <div style={{ color: '#999', fontSize: 12 }}>{bankForm.bankName} · {bankForm.accountNumber}</div>
                    <div style={{ color: OLIVE, fontSize: 11, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none"
                        stroke={OLIVE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      QR hợp lệ
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  const side = bankConfigModal!
                  onFC?.(`bankInfo.${side}.bankName`, bankForm.bankName)
                  onFC?.(`bankInfo.${side}.bankId`, bankForm.bankId)
                  onFC?.(`bankInfo.${side}.accountNumber`, bankForm.accountNumber)
                  onFC?.(`bankInfo.${side}.accountName`, bankForm.accountName)
                  setBankConfigModal(null)
                }}
                style={{
                  marginTop: 6, width: '100%', padding: '10px',
                  background: OLIVE, color: '#fff',
                  border: 'none', borderRadius: 10, fontSize: 15,
                  cursor: 'pointer', fontFamily: "Georgia, serif", letterSpacing: 1,
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
