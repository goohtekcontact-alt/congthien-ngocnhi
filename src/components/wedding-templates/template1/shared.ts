export function shortName(fullName?: string): string {
  if (!fullName) return ''
  const parts = fullName.trim().split(/\s+/)
  return parts.slice(-2).join(' ')
}

export function getMonthNumber(m?: string): number {
  if (!m) return 12
  const map: Record<string, number> = {
    'tháng 1': 1, 'tháng 01': 1, 'tháng 2': 2, 'tháng 02': 2,
    'tháng 3': 3, 'tháng 03': 3, 'tháng 4': 4, 'tháng 04': 4,
    'tháng 5': 5, 'tháng 05': 5, 'tháng 6': 6, 'tháng 06': 6,
    'tháng 7': 7, 'tháng 07': 7, 'tháng 8': 8, 'tháng 08': 8,
    'tháng 9': 9, 'tháng 09': 9, 'tháng 10': 10, 'tháng 11': 11, 'tháng 12': 12,
  }
  return map[m.toLowerCase()] || parseInt(m.replace(/\D/g, '')) || 1
}

export const A = {
  background: '/template_1/background.webp',
  arrow: '/template_1/arrow.svg',
  gift: '/template_1/gift.webp',
  flowerwithheart: '/template_1/flowerwithheart.svg',
  heartwithline: '/template_1/heartwithline.svg',
  gotmarried: '/template_1/wegotmarried.svg',
  ringwithflower: '/template_1/ringwithflower.svg',
  twinrose: '/template_1/twinrose.svg',
  twinlaurel: '/template_1/twinlaurel.svg',
  image1: '/bride_groom/15.webp',
  image2: '/bride_groom/16.webp',
  image3: '/bride_groom/11.webp',
  image4: '/bride_groom/3.webp',
  image5: '/bride_groom/10.webp',
  image7: '/bride_groom/17.webp',
  image8: '/bride_groom/19.webp',
  image9: '/bride_groom/4.webp',
  image10: '/bride_groom/2.webp',
  image11: '/bride_groom/18.webp',
  image12: '/bride_groom/13.webp',
}

export const OLIVE = '#4A5D45'
export const OLIVE_BG = '#6B7558'
export const OLIVE_MID = '#9DA68E'
export const OLIVE_BTN = '#5C7053'
export const FONT_SCRIPT = "'Dancing Script', cursive, 'Georgia', serif"
export const FONT_SERIF = "'Playfair Display', Georgia, serif"
export const FONT_SANS = "'Plus Jakarta Sans', sans-serif"

export const fVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, 
    y: 0,
    transition: { duration: 1.5, delay, ease: 'easeOut' }
  })
}

export const fImgVariants: any = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { duration: 1.5, delay, ease: 'easeOut' }
  })
}

export const marginConfig = { once: true, margin: "0px 0px -50px 0px" } as any

export const fZoomIn: any = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (delay = 0) => ({
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 60, damping: 20, delay }
  })
}

export const fSlideLeft: any = {
  hidden: { opacity: 0, x: -50 },
  visible: (delay = 0) => ({
    opacity: 1, 
    x: 0,
    transition: { duration: 1.5, delay, ease: 'easeOut' }
  })
}

export const fSlideRight: any = {
  hidden: { opacity: 0, x: 50 },
  visible: (delay = 0) => ({
    opacity: 1, 
    x: 0,
    transition: { duration: 1.5, delay, ease: 'easeOut' }
  })
}

export const fRotateIn: any = {
  hidden: { opacity: 0, rotate: -15, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: { duration: 1.5, delay, ease: 'easeOut' }
  })
}
