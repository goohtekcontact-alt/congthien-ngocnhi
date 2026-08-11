'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { A, OLIVE, OLIVE_BG, OLIVE_BTN, FONT_SANS, FONT_SCRIPT, FONT_SERIF, fVariants, fImgVariants, marginConfig, getMonthNumber, fSlideLeft, fSlideRight, fZoomIn, fRotateIn } from './shared'

const safeParseInt = (str: string, fallback: number) => {
  const match = String(str).match(/\d+/);
  return match ? parseInt(match[0], 10) : fallback;
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 24, marginBottom: 12, justifyContent: 'center' }}>
      {[
        { label: 'Ngày', value: timeLeft.days },
        { label: 'Giờ', value: timeLeft.hours },
        { label: 'Phút', value: timeLeft.minutes },
        { label: 'Giây', value: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 500, fontFamily: FONT_SCRIPT, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.2)', lineHeight: 1 }}>
            {String(item.value).padStart(2, '0')}
          </div>
          <span style={{ fontSize: 16, marginTop: 4, letterSpacing: '0.05em', fontWeight: 500, fontFamily: FONT_SCRIPT, color: '#fff', opacity: 0.9 }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function WeddingCard({ d }: { d: any }) {
  const photos = d.photos || {}
  const photo = (key: string, fallback: string) => photos[key] || fallback

  const weddingType = d.weddingType || 'bride'

  const day = d.date?.dayNumber || '03'
  const month = String(getMonthNumber(d.date?.month)).padStart(2, '0')
  const year = d.date?.year || '2026'

  const parsedYear = safeParseInt(d.dateYearText || year, 2026);
  const parsedMonth = safeParseInt(d.dateMonthText || month, 10);
  const parsedDay = safeParseInt(d.dateDayText || day, 3);
  const targetDate = new Date(parsedYear, parsedMonth - 1, parsedDay, 0, 0, 0);

  const locationLabel = weddingType === 'groom'
    ? 'tư gia nhà trai'
    : weddingType === 'bride'
      ? 'tư gia nhà gái'
      : 'nhà hàng trống đồng'

  const directionLabel = weddingType === 'groom'
    ? 'Đường về nhà trai'
    : weddingType === 'bride'
      ? 'Đường về nhà gái'
      : 'Địa điểm tổ chức'

  const ceremonyLabel = weddingType === 'groom'
    ? 'Tại gia đình nhà trai'
    : weddingType === 'bride'
      ? 'Tại gia đình nhà gái'
      : 'Tại nhà hàng trống đồng'

  const ceremonyTitle = d.ceremony?.title || (weddingType === 'bride'
    ? 'Lễ Vu Quy Được Tổ Chức'
    : 'Lễ Thành Hôn Được Tổ Chức')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', fontFamily: FONT_SANS, color: OLIVE }}>

      {/* WEDDING title + photo */}
      <section style={{ width: '100%', padding: '0 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 550 }}>
        <motion.h1 variants={fSlideLeft} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.1}
          style={{ fontFamily: "'Great Vibes', cursive", fontSize: 64, fontWeight: 400, color: OLIVE, marginBottom: 32 }}>Wedding</motion.h1>

        <motion.div variants={fSlideRight} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.2}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 14, letterSpacing: '0.15em', fontWeight: 300, color: OLIVE, textTransform: 'uppercase', marginBottom: 48, whiteSpace: 'nowrap' }}>
          <span>FALL IN</span><span>LOVE</span><span>WEDDING</span>
        </motion.div>

        <motion.div variants={fZoomIn} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.3}
          style={{ width: '100%', marginBottom: 12 }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'clip', borderRadius: 6, border: '1px solid #f3f4f6', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
            <img
              src={photo('image6346', d.galleryImages?.[0] || A.image1)}
              alt="Couple Portrait"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </motion.div>

        <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.4}
          style={{ position: 'relative', width: 72, height: 24 }}>
          <img src={A.heartwithline} alt="divider" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </motion.div>
      </section>

      {/* Invitation card */}
      <section style={{ width: '100%', padding: '12px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 500 }}>
        <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.1}
          style={{ textAlign: 'center', fontSize: 21, letterSpacing: '0.1em', color: OLIVE, textTransform: 'uppercase' }}>
          <p>Thiệp mời cưới của chúng mình</p>
          <p style={{ fontWeight: 300, fontStyle: 'italic', textTransform: 'none' }}>Trân trọng kính mời</p>
        </motion.div>

        {/* Guest name placeholder */}
        <motion.div variants={fImgVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.2}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 96, fontFamily: FONT_SCRIPT, fontSize: '3rem', color: OLIVE, lineHeight: 1.2, textAlign: 'center', margin: '8px 0' }}>
          {d.guestName || 'Bạn Trang và anh Nam'}
        </motion.div>

        {/* Green event detail card */}
        <motion.div variants={fImgVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.3}
          style={{ width: '100%', background: OLIVE_BG, borderRadius: 40, padding: 8, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.12)', marginBottom: 12 }}>
          <div style={{ position: 'relative', width: 200, height: 40, marginBottom: 24, opacity: 0.9 }}>
            <motion.img variants={fRotateIn} custom={0.4} src={A.flowerwithheart} alt="ornament" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          </div>

          <h2 style={{ fontSize: 13, letterSpacing: '0.1em', marginBottom: 32, textTransform: 'uppercase', padding: '0 16px', lineHeight: 1.6 }}>
            Đến dự buổi tiệc chung vui <br /> cùng gia đình chúng tôi vào lúc
          </h2>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: FONT_SERIF }}>
            <span style={{ fontSize: 14, letterSpacing: '0.2em', marginBottom: 16 }}>
              {d.dateText2 || `${d.date?.time || '11 GIỜ 00'} – ${d.date?.dayName || 'THỨ BẢY'}`}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', width: '100%', flexWrap: 'nowrap' }}>
              <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                {(() => {
                  const m = d.dateMonthText || d.date?.month || '2';
                  return m.toLowerCase().includes('tháng') ? m : `Tháng ${m}`;
                })()}
              </span>
              <div style={{ 
                border: '1.5px solid rgba(255,255,255,0.7)', 
                borderRadius: 16, 
                width: 96,
                height: 96,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                flexShrink: 0
              }}>
                <span style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {d.dateDayText || day}
                </span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                {d.dateYearText || `Năm ${year}`}
              </span>
            </div>
            <p style={{ marginTop: 32, fontStyle: 'italic', fontSize: 13, fontWeight: 300, opacity: 0.8 }}>
              {d.dateLunarText || `(Nhằm Ngày 23 THÁNG 8 NĂM BÍNH NGỌ)`}
            </p>
            
            <CountdownTimer targetDate={targetDate} />
          </div>
        </motion.div>

        {/* Location */}
        <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.4}
          style={{ width: '100%', fontSize: 21, textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontFamily: FONT_SANS, fontStyle: 'italic', color: OLIVE }}>Tại</p>
          <h3 style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: OLIVE }}>
            {d.locationVenueText || d.location?.venue || 'Tân Phong, Bình Xuyên, Vĩnh Phúc'}
          </h3>
          <p style={{ fontStyle: 'italic', color: OLIVE, lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
            {d.locationAddressText || d.location?.address || 'Số nhà 06, đường Bầu Rậm, TDP. Thích Chung, Bình Xuyên, Vĩnh Phúc'}
          </p>
        </motion.div>

        {/* Direction + Map + phone buttons */}
        <motion.div 
          variants={fImgVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={marginConfig} 
          custom={0.5}
          className="flex flex-row"
          style={{ width: '100%', alignItems: 'center', marginBottom: 64, paddingLeft: '10%' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, fontSize: 17, alignItems: 'center', gap: 12, width: '100%', zIndex: 10, marginRight: -40 }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginLeft: -40, marginBottom: -12 }}>
              <motion.img variants={fSlideLeft} custom={0.6} src={A.arrow} alt="arrow" className="w-[80px] sm:w-[120px]" style={{ maxWidth: '100%', objectFit: 'contain', transform: 'translateY(-16px)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, width: '100%', overflow: 'visible', marginLeft: -100 }}>
              <a href={d.mapUrl || d.mapLink || 'https://maps.google.com/maps?q=S%E1%BB%91+nh%C3%A0+06,+%C4%91%C6%B0%E1%BB%9Dng+B%E1%BA%A7u+R%E1%BA%ADm,+TDP.+Th%C3%ADch+Chung,+B%C3%ACnh+Xuy%C3%AAn,+V%C4%A9nh+Ph%C3%BAc'} target="_blank" style={{ fontStyle: 'italic', color: OLIVE, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                {directionLabel}
              </a>
            </div>

            {(weddingType === 'all' || weddingType === 'groom') && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <a href={`tel:${d.groomPhone || d.groomInfo?.phone || ''}`} className="text-xs sm:text-sm" style={{ display: 'inline-block', background: OLIVE_BTN, color: '#fff', padding: '6px 16px', borderRadius: 9999, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: FONT_SANS, textAlign: 'center', textDecoration: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.15)', whiteSpace: 'nowrap' }}>
                  Gọi ngay chú rể
                </a>
              </div>
            )}

            {(weddingType === 'all' || weddingType === 'bride') && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <a href={`tel:${d.bridePhone || d.brideInfo?.phone || ''}`} className="text-xs sm:text-sm" style={{ display: 'inline-block', background: OLIVE_BTN, color: '#fff', padding: '6px 16px', borderRadius: 9999, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: FONT_SANS, textAlign: 'center', textDecoration: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.15)', whiteSpace: 'nowrap' }}>
                  Gọi ngay cô dâu
                </a>
              </div>
            )}
          </div>

          <div className="w-[200px] sm:w-[260px]" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 24, overflow: 'clip', border: '2px solid #6b7280', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0, background: '#eee', zIndex: 5, marginRight: 16 }}>
            {(() => {
              const mapStr = d.mapUrl || d.mapLink || 'https://maps.google.com/maps?q=S%E1%BB%91%20nh%C3%A0%2006%2C%20%C4%91%C6%B0%E1%BB%9Dng%20B%E1%BA%A7u%20R%E1%BA%ADm%2C%20TDP%20Th%C3%ADch%20Chung%2C%20B%C3%ACnh%20Xuy%C3%AAn%2C%20V%C4%A9nh%20Ph%C3%BAc';
              const isIframe = mapStr.includes('<iframe');
              
              let mapSrc = '';
              if (isIframe) {
                const match = mapStr.match(/src="([^"]+)"/);
                mapSrc = match ? match[1] : '';
              } else if (mapStr.includes('google.com/maps')) {
                try {
                  const urlObj = new URL(mapStr.replace(/&amp;/g, '&'));
                  if (!urlObj.searchParams.has('output')) {
                    urlObj.searchParams.set('output', 'embed');
                  }
                  mapSrc = urlObj.toString();
                } catch (e) {
                  // Ignore invalid URL
                }
              }

              if (mapSrc) {
                return (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <iframe src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                  </div>
                );
              }

              const mapContent = (
                <img
                  src={d.mapImage || A.image13}
                  alt="Map Location"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              );

              if (mapStr.startsWith('http') && !isIframe) {
                return <a href={mapStr} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>{mapContent}</a>;
              }

              return mapContent;
            })()}
          </div>
        </motion.div>

        {/* Ceremony time */}
        <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.6}
          style={{ width: '100%', fontSize: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 500, color: OLIVE, marginBottom: 24 }}>
            {ceremonyTitle}
          </h4>

          <div style={{ width: '100%', maxWidth: 340, borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, fontWeight: 700, color: OLIVE, padding: '4px 0' }}>
            <span>{d.ceremony?.time || d.date?.time2 || '11:00'}</span>
            <span style={{ fontWeight: 100, color: '#1f2937' }}>|</span>
            <span>{d.ceremony?.dayName || d.date?.dayName || 'Thứ Bảy'}</span>
            <span style={{ fontWeight: 100, color: '#1f2937' }}>|</span>
            <span>{day}.{month}.{year}</span>
          </div>

          <p style={{ marginTop: 4, fontStyle: 'italic', fontSize: 20, color: OLIVE, fontFamily: FONT_SANS }}>
            {d.ceremony?.venue || ceremonyLabel}
          </p>
        </motion.div>
      </section>
    </div>
  )
}
