'use client'

import { motion } from 'framer-motion'
import { A, OLIVE, FONT_SANS, fVariants, fImgVariants, marginConfig } from './shared'
import { UploadableImage } from '@/components/ui/UploadableImage'

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
        style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {d.memoryQuote || (<>
          Tụi mình đã cùng nhau chọn từng bông hoa, từng bộ trang phục<br />
          cho ngày ấy. Mỗi chi tiết nhỏ đều mang trong đó một chút hồi<br />
          hộp, một chút háo hức, và rất nhiều yêu thương
        </>)}
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
        src={A.flowerwithheart} alt="flower" style={{ width: 200, height: 200, objectFit: 'contain' }} />

      <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.5}
        style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', fontSize: 24 }}>
          <div>SWEET</div><div>WEDDING</div><div>INVITATION</div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 17, paddingTop: 16, width: '100%' }}>
          {d.weddingQuote || (<>
            Ngày mình chính thức gọi nhau là vợ chồng là ngày câu truyện<br />
            nhỏ của hai đứa bước sang một chương mới. Cảm ơn vì đã tìm<br />
            thấy nhau, và chọn ở lại - mãi mãi
          </>)}
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
