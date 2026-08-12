'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export interface EnvelopeOpeningProps {
  onOpen: () => void
  skipOpening?: boolean
  groomName?: string
  brideName?: string
  d?: any
}

export function EnvelopeOpening({
  onOpen,
  skipOpening = false,
  groomName = 'MỸ TIÊN',
  brideName = 'QUỐC LỘC',
  d = {},
}: EnvelopeOpeningProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [isFinished, setIsFinished] = useState(skipOpening)

  useEffect(() => {
    if (skipOpening) setIsFinished(true)
  }, [skipOpening])

  useEffect(() => {
    if (!isFinished) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isFinished])

  if (isFinished) return null

  const handleOpenClick = () => {
    if (isOpening || isFinished) return
    setIsOpening(true)
    onOpen()
    setTimeout(() => {
      setIsFinished(true)
    }, 1200)
  }

  // Extract photo & names
  const photos = d.photos || {}
  const couplePhoto = d.coupleImage || '/bride_groom/19.webp'

  const groomShort = (d.groomShort || 'CÔNG THIỆN').toUpperCase()
  const brideShort = (d.brideShort || 'NGỌC NHI').toUpperCase()

  // Format dates or fallback
  const brideDateText = d.brideDateText || 'NHÀ GÁI: 03.10.2026'
  const groomDateText = d.groomDateText || 'NHÀ TRAI: 04.10.2026'

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 1.03 : 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-between py-8 px-4 overflow-hidden pointer-events-auto touch-none overscroll-none select-none"
      style={{
        backgroundImage: "url('/IMAGE_BACKGROUND_OPEN.png')",
        backgroundColor: '#E6F0E3',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      {/* TOP HEADER */}
      <div className="w-full flex flex-col items-center text-center mt-2 z-10">
        <p style={{ fontFamily: "'Great Vibes', cursive" }} className="text-3xl sm:text-4xl text-[#3A4D3B] mb-1">
          Save the date
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-lg sm:text-2xl font-medium text-[#263C2B] tracking-[0.12em] uppercase whitespace-nowrap">
          {brideShort} & {groomShort}
        </h1>
      </div>

      {/* MAIN ENVELOPE ASSEMBLY WITH REALISTIC 3D PERSPECTIVE */}
      <div
        className="relative w-[300px] sm:w-[360px] h-[340px] sm:h-[400px] my-auto flex items-center justify-center z-20"
        style={{ perspective: '1200px' }}
      >

        {/* 3D Envelope Flap (Starts CLOSED pointing down, flips 180deg UP to open) */}
        <motion.div
          initial={{ rotateX: 0, zIndex: 30, filter: 'brightness(1) drop-shadow(0 8px 16px rgba(0,0,0,0.35))' }}
          animate={{ rotateX: 180, zIndex: 0, filter: 'brightness(0.92) drop-shadow(0 -4px 10px rgba(0,0,0,0.15))' }}
          transition={{
            rotateX: { duration: 1.25, delay: 0.4, ease: [0.25, 1, 0.5, 1] },
            filter: { duration: 1.25, delay: 0.4 },
            zIndex: { delay: 1.0 }, // Moves behind photo slot midway through 180° flip
          }}
          style={{
            position: 'absolute',
            bottom: '85px',
            left: '50%',
            x: '-50%',
            width: '280px',
            height: '145px',
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
            backgroundColor: '#387853',
          }}
          className="sm:w-[340px] sm:h-[170px] sm:bottom-[100px]"
        />

        {/* Envelope Back Pocket Interior & Shadow Depth */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[340px] h-[230px] sm:h-[270px] bg-[#234A33] rounded-b-xl z-0 shadow-2xl overflow-hidden">
          {/* Inner Pocket Top Shadow Gradient */}
          <div className="w-full h-16 bg-gradient-to-b from-black/40 via-black/10 to-transparent pointer-events-none" />
        </div>

        {/* SLIDING PHOTO (Pulls up smoothly AFTER flap opens at 1.4s) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[340px] h-[230px] sm:h-[270px] z-10 flex items-center justify-center pointer-events-none"
          style={{ clipPath: 'polygon(-50% -500px, 150% -500px, 150% 100%, -50% 100%)' }}
        >
          <motion.div
            initial={{ y: 160, rotate: -0.5, scale: 0.98 }}
            animate={{ y: -65, rotate: 0, scale: 1 }}
            transition={{
              duration: 1.6,
              delay: 1.4, // Starts smoothly right after flap finishes flipping open
              ease: [0.16, 1, 0.3, 1], // Luxurious smooth inertia ease
            }}
            className="w-[220px] sm:w-[265px] bg-white p-1.5 sm:p-2 shadow-[0_20px_45px_rgba(0,0,0,0.35)] rounded-sm border border-gray-100 pointer-events-auto"
            style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-xs bg-gray-100" style={{ transform: 'translateZ(0)' }}>
              <img
                src={couplePhoto}
                alt="Couple"
                className="w-full h-full object-cover"
                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Envelope Front V-Pocket Overlay (Covers bottom half of photo) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[340px] h-[230px] sm:h-[270px] bg-[#387853] rounded-b-xl z-20"
          style={{
            clipPath: 'polygon(0% 15%, 50% 55%, 100% 15%, 100% 100%, 0% 100%)',
            filter: 'drop-shadow(0 -6px 12px rgba(0,0,0,0.3))',
          }}
        />

        {/* Envelope Front Bottom Triangles Highlight Lines */}
        <svg
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[340px] h-[230px] sm:h-[270px] z-25 pointer-events-none"
          viewBox="0 0 340 270"
          fill="none"
        >
          <path d="M0,67.5 L170,156.6 L340,67.5" stroke="#56A275" strokeWidth="2" opacity="0.6" />
        </svg>

        {/* GOLD WAX SEAL & CLICK HAND PROMPT */}
        <div className="absolute top-[74%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
          <motion.button
            onClick={handleOpenClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full focus:outline-none cursor-pointer drop-shadow-xl"
            aria-label="Mở thiệp cưới"
          >
            <img
              src="/template_1/gold_wax_seal.png"
              alt="Gold Wax Seal"
              className="w-full h-full object-cover rounded-full"
              style={{
                clipPath: 'circle(42% at 50% 50%)',
                transform: 'scale(1.18)',
              }}
            />
          </motion.button>

          {/* Animated Tapping Hand Icon */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.85, 1, 0.85],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-[-16px] right-[-18px] pointer-events-none"
          >
            <img
              src="/IMAGE_NGON_TAY.png"
              alt="Tap hand"
              className="w-12 h-12 sm:w-15 sm:h-15 object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
        </div>
      </div>

      {/* FOOTER DATES */}
      <div className="w-full flex flex-col items-center text-center mb-2 z-10">
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-sm sm:text-base text-[#2C4430] tracking-[0.18em] uppercase font-normal">
          {brideDateText}
        </p>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-sm sm:text-base text-[#2C4430] tracking-[0.18em] uppercase font-normal mt-1">
          {groomDateText}
        </p>
      </div>
    </motion.div>
  )
}
