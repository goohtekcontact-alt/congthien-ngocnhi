'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export interface RedDoorOpeningProps {
  onOpen: () => void
  hasOpened?: boolean
  groomName?: string
  brideName?: string
  skipOpening?: boolean  // khi true → ẩn hoàn toàn (dùng ở trang cấu hình)
  doorColor?: string
  textColor?: string // Thêm textColor
  sealText?: string // "囍" hoặc "Open" hoặc bất cứ chữ nào
  sealSize?: number // Kích thước của triện tròn (mặc định 140px)
  sealColor?: string // Màu sắc tùy chỉnh cho triện tròn (ví dụ chữ Hỷ)
  fallingEffect?: 'leaves' | 'snow'
}

function hexToRgbNormalized(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '')
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16) / 255
    const g = parseInt(cleanHex[1] + cleanHex[1], 16) / 255
    const b = parseInt(cleanHex[2] + cleanHex[2], 16) / 255
    return { r, g, b }
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255
    return { r, g, b }
  }
  return null
}

const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap'

// Falling petal component
function Petal({ delay, x, duration }: { delay: number; x: number; duration: number }) {
  return (
    <motion.div
      initial={{ y: -40, x, opacity: 0, rotate: 0 }}
      animate={{ y: '110vh', opacity: [0, 0.8, 0.8, 0], rotate: 360 * 2 }}
      transition={{ duration, delay, ease: 'linear', repeat: Infinity, repeatDelay: Math.random() * 3 }}
      style={{
        position: 'absolute',
        top: 0,
        left: `${x}%`,
        width: 14,
        height: 14,
        borderRadius: '70% 0 70% 0',
        backgroundColor: 'rgba(212, 175, 55, 0.6)', // Vàng kim nhạt
        pointerEvents: 'none',
        zIndex: 25,
      }}
    />
  )
}

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  delay: i * 0.7,
  x: Math.random() * 90 + 5,
  duration: 4 + Math.random() * 3,
}))

// Falling snowflake component
function Snowflake({ delay, x, duration, size }: { delay: number; x: number; duration: number; size: number }) {
  const drift = (Math.random() - 0.5) * 60
  return (
    <motion.div
      initial={{ y: -20, x: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: '110vh',
        x: [0, drift, -drift / 2, drift / 3],
        opacity: [0, 0.9, 0.9, 0],
        rotate: [0, 180, 360],
      }}
      transition={{ duration, delay, ease: 'linear', repeat: Infinity, repeatDelay: Math.random() * 4 }}
      style={{
        position: 'absolute', top: 0, left: `${x}%`,
        fontSize: size,
        color: 'rgba(255,255,255,0.85)',
        pointerEvents: 'none', zIndex: 25,
        userSelect: 'none',
        filter: 'drop-shadow(0 0 3px rgba(180,220,255,0.6))',
        lineHeight: 1,
      }}
    >
      ❄
    </motion.div>
  )
}

const SNOWFLAKES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  delay: i * 0.45,
  x: Math.random() * 95 + 2,
  duration: 5 + Math.random() * 4,
  size: 12 + Math.floor(Math.random() * 14),
}))

export function RedDoorOpening({
  onOpen,
  hasOpened: externalHasOpened,
  groomName = 'Trung Đức',
  brideName = 'Ngọc Thảo',
  skipOpening = false,
  doorColor = '#8B0000',
  textColor,
  sealText = '囍',
  sealSize = 140, // Tăng kích thước mặc định từ 116 lên 140 cho bề thế, sang trọng hơn
  sealColor,
  fallingEffect = 'leaves',
}: RedDoorOpeningProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [internalHasOpened, setInternalHasOpened] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isFinished = skipOpening ? true : (externalHasOpened !== undefined ? externalHasOpened : internalHasOpened)

  useEffect(() => {
    if (document.querySelector(`link[href="${GOOGLE_FONTS_URL}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = GOOGLE_FONTS_URL
    document.head.appendChild(link)
  }, [])

  useEffect(() => {
    if (!isFinished && !isOpening) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isFinished, isOpening])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleOpenClick = () => {
    if (isOpening || isFinished) return
    setIsOpening(true)
    onOpen()
    timerRef.current = setTimeout(() => {
      setInternalHasOpened(true)
    }, 3000)
  }

  if (isFinished) return null

  const isCustomColor = doorColor !== '#8B0000'
  const GOLD = '#C5A059'
  const finalTextColor = textColor || (isCustomColor ? '#ffffff' : '#FFE066')

  const finalSealColor = sealColor || textColor || (isCustomColor ? GOLD : '#8B0000')
  const rgb = hexToRgbNormalized(finalSealColor)
  const filterId = rgb ? `seal-color-filter-${finalSealColor.replace(/[^a-zA-Z0-9]/g, '')}` : ''

  const brocadeStyle: React.CSSProperties = {
    backgroundColor: doorColor,
  }

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden pointer-events-auto touch-none select-none">

      {/* Falling petals or snowflakes */}
      {!isOpening && (
        fallingEffect === 'snow'
          ? SNOWFLAKES.map(s => (
              <Snowflake key={s.id} delay={s.delay} x={s.x} duration={s.duration} size={s.size} />
            ))
          : PETALS.map(p => (
              <Petal key={p.id} delay={p.delay} x={p.x} duration={p.duration} />
            ))
      )}

      {/* Dimming overlay */}
      <motion.div
        animate={{ opacity: isOpening ? 0 : 0.15 }}
        transition={{ duration: 2.5 }}
        className="absolute inset-0 bg-black pointer-events-none z-10"
      />

      {/* LEFT DOOR */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpening ? '-100%' : 0 }}
        transition={{ duration: 2.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-1/2 h-full z-20 flex flex-col items-center justify-center"
        style={{
          ...brocadeStyle,
          width: '50%',
          borderRight: `2px solid ${GOLD}`,
          boxShadow: '4px 0 16px rgba(0,0,0,0.15)',
        }}
      >
        <div 
          className="w-full flex flex-col items-center gap-2 pl-1 pr-9 sm:pl-6 sm:pr-24 md:pl-8 md:pr-32"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: 'translateY(-110px)' }}
        >
          <p className="text-2xl sm:text-3xl md:text-[2.2rem]" style={{ fontFamily: "'Dancing Script', cursive, serif", color: finalTextColor, textShadow: '0 2px 8px rgba(0,0,0,0.2)', lineHeight: 1.2, textAlign: 'center', wordBreak: 'break-word', whiteSpace: 'normal' }}>
            {groomName}
          </p>

        </div>
      </motion.div>

      {/* RIGHT DOOR */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpening ? '100%' : 0 }}
        transition={{ duration: 2.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 right-0 w-1/2 h-full z-20 flex flex-col items-center justify-center"
        style={{
          ...brocadeStyle,
          width: '50%',
          borderLeft: `2px solid ${GOLD}`,
          boxShadow: '-4px 0 16px rgba(0,0,0,0.15)',
        }}
      >
        <div 
          className="w-full flex flex-col items-center gap-2 pr-1 pl-9 sm:pr-6 sm:pl-24 md:pr-8 md:pl-32"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: 'translateY(-110px)' }}
        >
          <p className="text-2xl sm:text-3xl md:text-[2.2rem]" style={{ fontFamily: "'Dancing Script', cursive, serif", color: finalTextColor, textShadow: '0 2px 8px rgba(0,0,0,0.2)', lineHeight: 1.2, textAlign: 'center', wordBreak: 'break-word', whiteSpace: 'normal' }}>
            {brideName}
          </p>

        </div>
      </motion.div>

      {/* Center gap shadow line */}
      <motion.div
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 1, height: '100%', background: 'rgba(0,0,0,0.2)',
          zIndex: 21, pointerEvents: 'none',
        }}
      />

      {/* HAPPINESS SEAL (nút mở) */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 30 }}>
        <motion.button
          onClick={handleOpenClick}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: isOpening ? [1, 1.2, 0] : 1,
            opacity: isOpening ? [1, 1, 0] : 1,
          }}
          transition={{ duration: isOpening ? 0.6 : 0.2 }}
          className="w-[100px] h-[100px] sm:w-[var(--seal-size)] sm:h-[var(--seal-size)]"
          style={{
            '--seal-size': `${sealSize}px`,
            '--seal-fs-open': `${(sealSize / 116) * 1.75}rem`,
            '--seal-fs-joy': `${(sealSize / 116) * 3.6}rem`,
            background: '#ffffff',
            border: `2px solid ${GOLD}`,
            borderRadius: '50%',
            cursor: 'pointer',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent',
            padding: 4,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          } as React.CSSProperties}
          aria-label="Mở thiệp cưới"
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              color: GOLD,
              border: `1px solid ${GOLD}`,
            }}
          >
            {sealText && (sealText.startsWith('/') || sealText.includes('.') || sealText.includes('/')) ? (
              <img
                src={sealText}
                alt="Calligraphy Seal"
                style={{
                  width: '95%',
                  height: '95%',
                  objectFit: 'contain',
                  filter: rgb ? `url(#${filterId})` : 'none',
                }}
              />
            ) : (
              <span
                style={{
                  transform: sealText === 'Open' ? 'translateY(-1px)' : 'translateY(-2px)',
                  fontFamily: sealText === 'Open' ? "'Playfair Display', serif" : "'Dancing Script', cursive, serif",
                  fontSize: sealText === 'Open' 
                    ? 'clamp(1.2rem, 4vw, var(--seal-fs-open))' 
                    : 'clamp(2.5rem, 8vw, var(--seal-fs-joy))',
                  fontWeight: sealText === 'Open' ? '600' : '400',
                  letterSpacing: sealText === 'Open' ? '0.5px' : 'normal',
                }}
              >
                {sealText}
              </span>
            )}
          </div>
        </motion.button>

        {/* "Bấm để mở" label */}
        {!isOpening && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: 16,
              textAlign: 'center',
              color: finalTextColor,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 1px 4px rgba(0,0,0,0.1)',
              fontWeight: 500,
            }}
          >
            Bấm để mở
          </motion.p>
        )}
      </div>

      {/* Dynamic SVG Filter for colorizing transparent PNG image seals */}
      {rgb && (
        <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none', width: 0, height: 0 }}>
          <filter id={filterId}>
            <feColorMatrix
              type="matrix"
              values={`
                0 0 0 0 ${rgb.r.toFixed(4)}
                0 0 0 0 ${rgb.g.toFixed(4)}
                0 0 0 0 ${rgb.b.toFixed(4)}
                0 0 0 1 0
              `}
            />
          </filter>
        </svg>
      )}
    </div>
  )
}
