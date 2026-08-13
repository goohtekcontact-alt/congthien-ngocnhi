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
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, lineHeight: 1.5, padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
        <InlineEdit
          value={d.memoryQuote || 'Và rồi, thật trùng hợp cũng thật nhiệm màu…\n\nNgày kỷ niệm một năm chúng mình quen nhau\nlại chính là ngày chúng mình về chung một nhà.\n\nMột năm không quá dài, nhưng đủ để chúng mình hiểu rằng:\ngiữa rất nhiều người trên thế giới này, chúng mình đã gặp được nhau, yêu thương nhau và chọn nhau.'}
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
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", textAlign: 'center', fontSize: 18, lineHeight: 1.5, paddingTop: 16, width: '100%' }}>
          <InlineEdit
            value={d.weddingQuote || 'Từ một cuộc gặp sau Thánh lễ Chúa nhật,\nqua những ngày hẹn hò dưới mưa,\nchúng mình đã đi đến ngày hôm nay —\nngày bắt đầu một hành trình mới, cùng nhau trong tình yêu và trong Chúa.\n\nCảm ơn vì tháng 8 năm ấy đã mang chúng mình đến gần nhau.\nCảm ơn những cơn mưa đã trở thành ký ức thật đẹp.\nVà trên hết, chúng mình biết ơn Chúa vì đã cho hai trái tim gặp được nhau đúng lúc.\n\nTừ hôm nay, chúng mình không còn chỉ là hai người yêu nhau.\nChúng mình là gia đình.\n\nNgọc Nhi & Công Thiện\n03-04.10.2026'}
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
