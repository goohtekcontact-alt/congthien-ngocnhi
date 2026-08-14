'use client'

import { motion } from 'framer-motion'
import { A, OLIVE, FONT_SANS, FONT_SCRIPT, fVariants, fImgVariants, marginConfig, getMonthNumber, shortName, fSlideLeft, fSlideRight, fZoomIn, fRotateIn } from './shared'

export function Intro({ d }: { d: any }) {
  const photos = d.photos || {}
  const photo = (key: string, fallback: string) => photos[key] || fallback

  const day = d.date?.dayNumber || '03'
  const month = String(getMonthNumber(d.date?.month)).padStart(2, '0')
  const year = d.date?.year || '2026'

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 450, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px' }}>

        {/* YOU ARE / THE LOVE OF / MY LIFE */}
        <motion.div variants={fSlideLeft} initial="hidden" animate="visible" viewport={marginConfig} custom={1.6}
          className="text-[14px] sm:text-[18px]"
          style={{ width: '100%', letterSpacing: '0.15em', fontWeight: 500, fontFamily: FONT_SANS, color: OLIVE, textAlign: 'center', textWrap: 'balance', lineHeight: 1.6 }}>
          <span style={{ display: 'inline-block', margin: '0 8px' }}>{d.intro?.title1 || 'YOU ARE'}</span>
          <span style={{ display: 'inline-block', margin: '0 8px' }}>{d.intro?.title2 || 'THE LOVE OF'}</span>
          <span style={{ display: 'inline-block', margin: '0 8px' }}>{d.intro?.title3 || 'MY LIFE'}</span>
        </motion.div>

        {/* WE GOT MARRIED text image */}
        <motion.div variants={fSlideRight} initial="hidden" animate="visible" viewport={marginConfig} custom={1.7}
          style={{ position: 'relative', width: 520, maxWidth: '100%', height: 96, marginBottom: 24 }}>
          <motion.img variants={fVariants} custom={1.8} src={A.gotmarried} alt="We Got Married" style={{ objectFit: 'contain', position: 'relative', top: 40, width: '100%', height: '100%' }} />
        </motion.div>

        {/* Main hero photo (rounded top) */}
        <motion.div variants={fZoomIn} initial="hidden" animate="visible" viewport={marginConfig} custom={1.8}
          style={{ width: '100%', padding: '0 16px', marginBottom: 40 }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '4/7', overflow: 'clip', borderRadius: '9999px 9999px 0 0', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            {/* Background gradient for readability */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }} />
            
            {/* Overlay content */}
            <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', zIndex: 10, gap: 8 }}>
              <motion.img variants={fRotateIn} custom={1.9} src={A.flowerwithheart} alt="flower" style={{ width: 200, height: 200, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }} />
              <motion.p variants={fSlideLeft} custom={2.0} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, lineHeight: 1.5, color: '#fff', padding: '0 20px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                {d.intro?.description || "It's been a long time, see you at the wedding!"}
              </motion.p>
              <motion.p variants={fSlideRight} custom={2.1} style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.2em', color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                {d.dateText || `${day}.${month}.${year}`}
              </motion.p>
            </div>
            {/* Background couple photo */}
            <img
              src={photo('image6367', d.coupleImage || A.image12)}
              alt="The Happy Couple"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        </motion.div>

        {/* GROOM | BRIDE labels */}
        <motion.div variants={fSlideLeft} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.1}
          style={{ width: '100%', maxWidth: 320, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #4b5563', borderBottom: '1px solid #4b5563', padding: '12px 0', marginBottom: 24 }}>
          <span style={{ flex: 1, textAlign: 'center', fontSize: 20, letterSpacing: '0.4em', color: OLIVE }}>GROOM</span>
          <div style={{ width: 1, height: 16, background: '#4b5563', margin: '0 8px' }} />
          <span style={{ flex: 1, textAlign: 'center', fontSize: 20, letterSpacing: '0.4em', color: OLIVE }}>BRIDE</span>
        </motion.div>

        {/* Groom name */}
        <motion.div variants={fSlideRight} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.2}
          className="text-[1.8rem] sm:text-[2.5rem]"
          style={{ width: '100%', textAlign: 'center', fontFamily: FONT_SCRIPT, color: OLIVE, lineHeight: 1.2, marginTop: 16, whiteSpace: 'normal' }}>
          {d.groomName || shortName(d.groomInfo?.name) || 'Trung Đức'}
        </motion.div>

        {/* Heart divider */}
        <motion.img variants={fZoomIn} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.3}
          src={A.heartwithline} alt="divider" style={{ width: 72, objectFit: 'contain', margin: '16px 0' }} />

        {/* Bride name */}
        <motion.div variants={fSlideLeft} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.4}
          className="text-[1.8rem] sm:text-[2.5rem]"
          style={{ width: '100%', textAlign: 'center', fontFamily: FONT_SCRIPT, color: OLIVE, lineHeight: 1.2, marginBottom: 24, whiteSpace: 'normal' }}>
          {d.brideName || shortName(d.brideInfo?.name) || 'Ngọc Thảo'}
        </motion.div>
      </div>
    </div>
  )
}
