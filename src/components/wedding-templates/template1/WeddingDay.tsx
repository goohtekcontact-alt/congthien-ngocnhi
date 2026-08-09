'use client'

import { motion } from 'framer-motion'
import { A, OLIVE_MID, FONT_SANS, FONT_SCRIPT, FONT_SERIF, fVariants, fImgVariants, marginConfig, fRotateIn, fZoomIn } from './shared'
import { InlineEdit } from '../../ui/InlineEdit'

export function WeddingDay({ d }: { d?: any }) {
  const em = d?.editMode
  
  // Trích xuất ngày từ chuỗi văn bản do người dùng nhập (VD: "29/11", "Ngày 29", "29-11")
  const dateStr = d?.calendarDateText || 'Thứ Bảy, 03/10/2026';
  const matchFull = dateStr.match(/\b([1-3]?[0-9])[\/\-\s]+(1[0-2]|0?[1-9])(?:[\/\-\s]+(\d{2,4}))?\b/);
  let daysInMonth = 30;
  let weddingDay = '29';

  if (matchFull) {
    weddingDay = matchFull[1];
    const month = parseInt(matchFull[2], 10);
    let year = matchFull[3] ? parseInt(matchFull[3], 10) : new Date().getFullYear();
    if (year < 100) year += 2000;
    daysInMonth = new Date(year, month, 0).getDate();
  } else {
    const matchDay = dateStr.match(/\b([1-3]?[0-9])\b/);
    if (matchDay) weddingDay = matchDay[1];
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 500, margin: '0 auto', fontFamily: FONT_SANS, padding: '48px 24px' }}>
      <motion.div variants={fImgVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.2}
        style={{ width: '100%', background: OLIVE_MID, borderRadius: '9999px 9999px 0 0', padding: '80px 32px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.12)' }}>
        
        <motion.svg variants={fVariants} custom={0.3} viewBox="0 0 400 180" style={{ width: '100%', maxWidth: 360, overflow: 'visible', marginTop: 32, marginBottom: -64 }}>
          <path id="curve-path" fill="transparent" stroke="none" d="M 30,170 A 170,160 0 0,1 370,170" />
          <text fill="#ffffff" style={{ fontFamily: FONT_SCRIPT, fontSize: '3.6rem', letterSpacing: '0.02em' }}>
            <textPath href="#curve-path" startOffset="50%" textAnchor="middle">
              Fall in Love Wedding
            </textPath>
          </text>
        </motion.svg>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, opacity: 0.9 }}>
           <span style={{ width: 32, height: 1, backgroundColor: 'currentColor' }}></span>
           <motion.svg variants={fVariants} custom={0.4} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
           </motion.svg>
           <span style={{ width: 32, height: 1, backgroundColor: 'currentColor' }}></span>
        </div>

        <p style={{ fontFamily: FONT_SERIF, fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.65, marginTop: 24, textAlign: 'center', maxWidth: 448 }}>
          Thương một, để sau mỗi năm lại thương lên mười.<br/>
          Em có anh ở trong đời, anh có em, là được rồi
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 24, marginTop: 36, width: '100%', fontFamily: FONT_SERIF, fontSize: '1.1rem', fontWeight: 600, textAlign: 'center' }}>
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
            <span key={day} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {day}
            </span>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => String(i + 1)).map((date, index) => {
            const isWeddingDay = date === weddingDay;
            return (
              <span
                key={`${date}-${index}`}
                style={{
                  margin: '0 auto',
                  display: 'flex',
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  position: 'relative'
                }}
              >
                {isWeddingDay && (
                  <svg style={{ position: 'absolute', width: '140%', height: '140%', left: '-20%', top: '-20%' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{date}</span>
              </span>
            );
          })}
        </div>

        <div style={{ marginTop: 36, fontFamily: FONT_SERIF, textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
            <InlineEdit value={d?.calendarDateText || 'Thứ Bảy, 03/10/2026'} editMode={em} onChange={v => d?.onFieldChange?.('calendarDateText', v)} /><br/>
            <InlineEdit value={d?.calendarTimeText || 'Nhằm Ngày 22 THÁNG 8 NĂM BÍNH NGỌ | 11:00 AM'} editMode={em} onChange={v => d?.onFieldChange?.('calendarTimeText', v)} />
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 24, opacity: 1, width: '100%', padding: '0 8px' }}>
          <motion.img variants={fRotateIn} custom={0.5} src="/template_1/flower1.webp" alt="decorator" style={{ height: 76, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 28, height: 1, backgroundColor: 'currentColor' }} />
            <motion.svg variants={fVariants} custom={0.6} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </motion.svg>
            <span style={{ width: 28, height: 1, backgroundColor: 'currentColor' }} />
          </div>
          <motion.img variants={fRotateIn} custom={0.7} src="/template_1/flower2.webp" alt="decorator" style={{ height: 76, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
        </div>

      </motion.div>

      <motion.div variants={fZoomIn} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.3}
        style={{ width: '100%', marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 200, height: 48, opacity: 0.8 }}>
          <img src={A.twinlaurel} alt="decoration" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </motion.div>
    </div>
  )
}
