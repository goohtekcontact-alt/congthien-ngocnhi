'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { MusicPlayer } from '@/components/ui/MusicPlayer'
import { Intro } from './template1/Intro'
import { WeddingCard } from './template1/WeddingCard'
import { CoupleInfo } from './template1/CoupleInfo'
import { WeddingDay } from './template1/WeddingDay'
import { Memory } from './template1/Memory'
import { WeddingForm } from './template1/WeddingForm'
import { RedDoorOpening } from './RedDoorOpening'
import { A, OLIVE, OLIVE_BG, FONT_SANS } from './template1/shared'

type InviteType = 'chung' | 'nhaTrai' | 'nhaGai'

const inviteToWedding = (t: InviteType) =>
  t === 'nhaTrai' ? 'groom' : t === 'nhaGai' ? 'bride' : 'all'

export default function Template1({ weddingData }: { weddingData: any }) {
  const d0 = weddingData || {}
  const inviteType: InviteType = d0.inviteType === 'nhaTrai' ? 'nhaTrai' : d0.inviteType === 'nhaGai' ? 'nhaGai' : 'chung'

  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  const d = { ...d0, weddingType: inviteToWedding(inviteType) }

  // Khi người dùng bấm Mở Thiệp
  const handleOpen = () => {
    setIsAutoScrolling(true)

    // Lách Chrome: Có thao tác click thật rồi, ta chỉ việc "gọi" nút bật nhạc bên góc là loa sẽ kêu
    const playBtn = document.querySelector('button[aria-label="Bật nhạc"]') as HTMLButtonElement
    if (playBtn) {
      playBtn.click()
    }
  }

  // Khi Component Unmount (thoát template) -> Tự động ấn nút Tắt nhạc 
  useEffect(() => {
    return () => {
      const pauseBtn = document.querySelector('button[aria-label="Tắt nhạc"]') as HTMLButtonElement
      if (pauseBtn) {
        pauseBtn.click()
      }
    }
  }, [])

  // Xử lý hiệu ứng cuộn bằng cách tác động trực tiếp lên DOM để tránh bị "Freeze" do xung đột
  useEffect(() => {
    if (!isAutoScrolling) return
    
    let animationFrameId: number;

    const scrollStep = () => {
      document.documentElement.scrollTop += 2;
      document.body.scrollTop += 2;
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    // Nếu người dùng chủ động chạm/cuộn thì dừng auto-scroll ngay tắp lự
    const stopScroll = () => {
      setIsAutoScrolling(false)
    }
    
    window.addEventListener('touchstart', stopScroll, { passive: true })
    window.addEventListener('wheel', stopScroll, { passive: true })
    window.addEventListener('mousedown', stopScroll, { passive: true })
    
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('touchstart', stopScroll)
      window.removeEventListener('wheel', stopScroll)
      window.removeEventListener('mousedown', stopScroll)
    }
  }, [isAutoScrolling])

  return (
    <>
      {/* Overlay cửa mở — luôn render trên cùng, tự xóa sau khi animation xong */}
      <RedDoorOpening
        onOpen={handleOpen}
        skipOpening={!!d.previewMode}
        groomName={d.groomInfo?.name || d.groomName || 'Trung Đức'}
        brideName={d.brideInfo?.name || d.brideName || 'Ngọc Thảo'}
        doorColor="#E6F0E3"
        textColor={OLIVE}
        sealText="/template_1/hy_calligraphy.webp"
        sealSize={135}
      />

      <div style={{ width: '100%', background: 'transparent', display: 'flex', justifyContent: 'center', border: 'none', overflowX: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: 'none',
          width: 600,
          maxWidth: '100%',
          backgroundImage: `url(${A.background})`,
          backgroundColor: '#fff',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          overflowX: 'hidden',
        }}
      >


        <Intro d={d} />
        <WeddingCard d={d} />
        <CoupleInfo d={d} />
        <WeddingDay d={d} />
        <Memory d={d} />
        <WeddingForm d={d} />
      </div>
    </div>
      <MusicPlayer src="/Ta_la_cua_nhau.mp3" />
    </>
  )
}
