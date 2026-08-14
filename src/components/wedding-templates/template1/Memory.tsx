'use client'

import { motion } from 'framer-motion'
import { A, OLIVE, FONT_SANS, fVariants, fImgVariants, marginConfig } from './shared'
import { UploadableImage } from '@/components/ui/UploadableImage'
import { InlineEdit } from '@/components/ui/InlineEdit'

export function Memory({ d }: { d: any }) {
  const em = false;
  const photos = d.photos || {}
  const photo = (key: string, fallback: string) => photos[key] || fallback

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', fontFamily: FONT_SANS, color: OLIVE, gap: 20 }}>
      <motion.div variants={fImgVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.1} style={{ width: '100%' }}>
        <UploadableImage
          src={photo('image6349', A.image4)}
          alt="memory"
          editMode={em}
          label="Ảnh kỷ niệm"
          onUploaded={(url: any) => d?.onFieldChange?.('photos.image6349', url)}
          style={{ width: '100%' }}
        />
      </motion.div>

      <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.2}
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, lineHeight: 1.5, padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', boxSizing: 'border-box', textWrap: 'pretty' }}>
        <InlineEdit
          value={d.memoryQuote || 'Tụi mình đã cùng nhau chọn từng bông hoa, từng bộ trang phục cho ngày ấy. Mỗi chi tiết nhỏ đều mang trong đó một chút hồi hộp, một chút háo hức, và rất nhiều yêu thương'}
          editMode={em}
          multiline
          onChange={(v: any) => d?.onFieldChange?.('memoryQuote', v)}
          style={{ textAlign: 'center', width: '100%', display: 'block', whiteSpace: 'pre-line' }}
        />
      </motion.div>

      <motion.div variants={fImgVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.3} style={{ width: '100%' }}>
        <UploadableImage
          src={photo('image6354', A.image9)}
          alt="memory"
          editMode={em}
          label="Ảnh kỷ niệm"
          onUploaded={(url: any) => d?.onFieldChange?.('photos.image6354', url)}
          style={{ width: '100%' }}
        />
      </motion.div>

      <motion.img variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.4}
        src={A.flowerwithheart} alt="flower" style={{ width: 180, height: 90, objectFit: 'contain', marginTop: -32, marginBottom: 16 }} />

      <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.5}
        style={{ display: 'flex', flexDirection: 'column', width: '85%' }}>
        <div className="text-[28px] sm:text-[40px]" style={{ display: 'flex', justifyContent: 'space-around', width: '100%', fontFamily: "'Great Vibes', cursive" }}>
          <div>Sweet</div><div>Wedding</div><div>Invitation</div>
        </div>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", textAlign: 'center', fontSize: 15, lineHeight: 1.5, paddingTop: 16, width: '100%', textWrap: 'pretty' }}>
          <InlineEdit
            value={d.weddingQuote || 'Ngày mình chính thức gọi nhau là vợ chồng là ngày câu truyện nhỏ của hai đứa bước sang một chương mới. Cảm ơn vì đã tìm thấy nhau, và chọn ở lại - mãi mãi'}
            editMode={em}
            multiline
            onChange={(v: any) => d?.onFieldChange?.('weddingQuote', v)}
            style={{ textAlign: 'center', width: '100%', display: 'block', whiteSpace: 'pre-line' }}
          />
        </p>
      </motion.div>

      <motion.div variants={fImgVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.6} style={{ width: '100%', maxWidth: 500 }}>
        <UploadableImage
          src={photo('image6364', A.image10)}
          alt="photo"
          editMode={em}
          label="Ảnh kỷ niệm"
          onUploaded={(url: any) => d?.onFieldChange?.('photos.image6364', url)}
          style={{ width: '100%', objectFit: 'contain' }}
        />
      </motion.div>
    </div>
  )
}
