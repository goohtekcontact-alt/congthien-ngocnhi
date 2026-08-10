'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export function MusicPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented
          })
        }
      }
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
      <audio ref={audioRef} src={src} loop preload="auto" />
      
      {/* Hidden buttons for external control from RedDoorOpening callback */}
      <button 
        aria-label="Bật nhạc" 
        onClick={() => {
           if (audioRef.current) {
             audioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e));
           }
        }} 
        style={{ display: 'none' }}
      />
      <button 
        aria-label="Tắt nhạc" 
        onClick={() => audioRef.current?.pause()} 
        style={{ display: 'none' }}
      />

      <motion.button 
        onClick={togglePlay}
        animate={isPlaying ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 48, 
          height: 48, 
          borderRadius: '50%', 
          backgroundColor: '#fff', 
          color: '#556b2f',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" fill="currentColor" />
            <circle cx="18" cy="16" r="3" fill="currentColor" />
          </svg>
        )}
      </motion.button>
    </div>
  )
}
