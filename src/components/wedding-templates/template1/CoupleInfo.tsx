'use client'

import { motion } from 'framer-motion'
import { A, OLIVE, OLIVE_BG, FONT_SANS, FONT_SCRIPT, fVariants, fImgVariants, marginConfig, shortName, fSlideLeft, fSlideRight, fZoomIn, fRotateIn } from './shared'
import { UploadableImage } from '@/components/ui/UploadableImage'
import { InlineEdit } from '@/components/ui/InlineEdit'

export function CoupleInfo({ d }: { d: any }) {
  const em = false;
  const photos = d.photos || {}
  const photo = (key: string, fallback: string) => photos[key] || fallback

  const groomShort = shortName(d.groomInfo?.name || d.groomName) || 'Trung Đức'
  const brideShort = shortName(d.brideInfo?.name || d.brideName) || 'Ngọc Thảo'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: FONT_SANS, color: OLIVE }}>
      <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* MY LOVER heading */}
        <motion.div variants={fSlideRight} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.1}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20, textAlign: 'center' }}>
          <h1 style={{ fontSize: 60, fontWeight: 200, letterSpacing: '0.2em', color: OLIVE, marginTop: 40, marginBottom: 8 }}>MY LOVER</h1>
          <p style={{ fontSize: 16, letterSpacing: '0.1em', color: OLIVE, fontWeight: 600, lineHeight: 1.4, fontStyle: 'italic', maxWidth: 500, width: '100%', padding: '0 24px', boxSizing: 'border-box', textAlign: 'center' }}>
            {d.message || (<>
              Gửi đến bạn tấm thiệp cưới đầy yêu thương.<br />
              Những ai nhận được lời mời này đều là những người đặc biệt<br />
              với bọn mình.<br />
              Mong bạn và gia đình sẽ đến chung vui,<br />
              Cùng chứng kiến khoảnh khắc hạnh phúc nhất của hai đứa.<br />
              Cảm ơn vì luôn bên cạnh và yêu thương.<br />
              Bọn mình rất mong được gặp bạn trong ngày vui này!
            </>)}
          </p>
        </motion.div>

        {/* Couple portrait */}
        <motion.div variants={fZoomIn} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.2}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 64, padding: '0 32px', boxSizing: 'border-box' }}>
          <UploadableImage
            src={photo('image6347', d.galleryImages?.[1] || A.image2)}
            alt="Couple"
            editMode={em}
            label="Ảnh cặp đôi"
            onUploaded={(url: any) => d?.onFieldChange?.('photos.image6347', url)}
            style={{ borderRadius: '9999px 9999px 0 0', width: '100%', objectFit: 'cover' }}
            wrapperStyle={{ width: '100%', maxWidth: 320, aspectRatio: '3/4' }}
          />
          <motion.img variants={fRotateIn} custom={0.3} src={A.twinlaurel} alt="laurel" style={{ marginTop: 20, width: 200, objectFit: 'contain' }} />

          {/* Individual photos */}
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '20px 0' }}>
            <motion.div variants={fSlideRight} custom={0.4} style={{ position: 'relative', width: '100%', aspectRatio: '4/6', overflow: 'clip', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <UploadableImage
                src={photo('image6350', d.groomImage || A.image5)}
                alt="Groom"
                editMode={em}
                label="Ảnh chú rể"
                onUploaded={(url: any) => d?.onFieldChange?.('photos.image6350', url)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                wrapperStyle={{ width: '100%', height: '100%' }}
              />
            </motion.div>
            <motion.div variants={fSlideLeft} custom={0.5} style={{ position: 'relative', width: '100%', aspectRatio: '4/6', overflow: 'clip', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <UploadableImage
                src={photo('image6352', d.brideImage || A.image7)}
                alt="Bride"
                editMode={em}
                label="Ảnh cô dâu"
                onUploaded={(url: any) => d?.onFieldChange?.('photos.image6352', url)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                wrapperStyle={{ width: '100%', height: '100%' }}
              />
            </motion.div>
          </div>

          {/* Names + Parents */}
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 12, padding: '0', marginBottom: 32 }}>
            <motion.div variants={fSlideRight} custom={0.6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: 0, overflow: 'hidden' }}>
              <div style={{ width: '100%', marginBottom: 4, fontFamily: FONT_SCRIPT, fontSize: '1.6rem', color: OLIVE, lineHeight: 1.2, wordWrap: 'break-word' }}>
                <InlineEdit value={d.groomName || shortName(d.groomInfo?.name) || 'Trung Đức'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('groomName', v)} />
              </div>
              <div style={{ background: OLIVE_BG, color: '#fff', fontSize: 12, width: '100%', borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.12)', padding: '6px 4px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                <p style={{ marginBottom: 4 }}>Bố: <InlineEdit value={d.groomInfo?.fatherName || 'Đặng Văn Đạt'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('groomInfo.fatherName', v)} /></p>
                <p>Mẹ: <InlineEdit value={d.groomInfo?.motherName || 'Phạm Thị Luyến'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('groomInfo.motherName', v)} /></p>
              </div>
              <p style={{ fontStyle: 'italic', fontSize: 14, color: OLIVE, marginTop: 8 }}>(<InlineEdit value={d.groomInfo?.city || d.groomInfo?.hometown || 'TP. Hải Phòng'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('groomInfo.city', v)} />)</p>
            </motion.div>

            <motion.div variants={fSlideLeft} custom={0.7} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: 0, overflow: 'hidden' }}>
              <div style={{ width: '100%', marginBottom: 4, fontFamily: FONT_SCRIPT, fontSize: '1.6rem', color: OLIVE, lineHeight: 1.2, wordWrap: 'break-word' }}>
                <InlineEdit value={d.brideName || shortName(d.brideInfo?.name) || 'Ngọc Thảo'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('brideName', v)} />
              </div>
              <div style={{ background: OLIVE_BG, color: '#fff', fontSize: 12, width: '100%', borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.12)', padding: '6px 4px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                <p style={{ marginBottom: 4 }}>Bố: <InlineEdit value={d.brideInfo?.fatherName || 'Nguyễn Văn Thuẫn'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('brideInfo.fatherName', v)} /></p>
                <p>Mẹ: <InlineEdit value={d.brideInfo?.motherName || 'Nguyễn Thị Phượng'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('brideInfo.motherName', v)} /></p>
              </div>
              <p style={{ fontStyle: 'italic', fontSize: 14, color: OLIVE, marginTop: 8 }}>(<InlineEdit value={d.brideInfo?.city || d.brideInfo?.hometown || 'TP. Hà Nội'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('brideInfo.city', v)} />)</p>
            </motion.div>
          </div>

          {/* First love story */}
          <div style={{ width: '100%', textAlign: 'center', padding: '0 24px' }}>
            <p style={{ fontSize: 13, letterSpacing: '0.1em', color: OLIVE, lineHeight: 1.6, textAlign: 'center' }}>
              <InlineEdit
                value={d.story1 || 'Mình gặp nhau vào mùa nắng đẹp nhất của năm. Ngày 30\ntháng 3 - bình yên như bao ngày khác,\nChỉ là từ hôm đó, thế giới của hai đứa bỗng có thêm một\nngười để chờ, để nhớ, để thương.'}
                editMode={em}
                multiline
                onChange={(v: any) => d?.onFieldChange?.('story1', v)}
                style={{ textAlign: 'center', width: '100%', display: 'block', whiteSpace: 'pre-line' }}
              />
            </p>
          </div>
        </motion.div>

        {/* Floral divider */}
        <motion.div variants={fSlideLeft} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.1}
          style={{ width: '100%', marginTop: 32 }}>
          <div style={{ position: 'relative', display: 'flex', width: '100%', height: 40, justifyContent: 'center' }}>
            <img src={A.ringwithflower} alt="divider" style={{ width: '100%', maxWidth: 1000, height: '100%', objectFit: 'contain' }} />
          </div>
        </motion.div>

        {/* WELCOME TO WEDDING */}
        <motion.div variants={fZoomIn} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.2}
          style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 32px 40px', width: '100%', fontSize: 25 }}>
          <h2>WELCOME</h2><h2>TO</h2><h2>WEDDING</h2>
        </motion.div>

        <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.3}
          style={{ lineHeight: 1.4, textAlign: 'center' }}>
          <InlineEdit
            value={d.story2 || 'Ba tháng sau, chúng mình chẳng cần lí do gì lớn lao.\nChỉ biết là muốn cùng nhau đi hết đoạn đường còn lại. Và thế là,\nmột đám cưới ra đời - tròn tám tháng kể từ ngày bắt đầu yêu'}
            editMode={em}
            multiline
            onChange={(v: any) => d?.onFieldChange?.('story2', v)}
            style={{ textAlign: 'center', width: '100%', display: 'block', whiteSpace: 'pre-line' }}
          />
        </motion.div>

        <motion.div variants={fImgVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.4} style={{ marginTop: 60, padding: 40, width: '100%' }}>
          <UploadableImage
            src={photo('image6348', d.galleryImages?.[2] || A.image3)}
            alt="couple"
            editMode={em}
            label="Ảnh cặp đôi"
            onUploaded={(url: any) => d?.onFieldChange?.('photos.image6348', url)}
            style={{ borderRadius: '9999px 9999px 0 0', width: '100%', objectFit: 'contain' }}
          />
        </motion.div>

        {/* I LOVE YOU section */}
        <motion.div variants={fSlideLeft} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.5}
           style={{ lineHeight: 1.4, display: 'flex', flexDirection: 'column', gap: 16, width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '80px 24px', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: 60, fontFamily: FONT_SCRIPT }}>I LOVE YOU</h1>
          <motion.img variants={fRotateIn} custom={0.6} src={A.heartwithline} alt="heart" style={{ width: 75, height: 75, objectFit: 'contain' }} />
          {d.loveQuote || (<>
            Mình chẳng có những buổi hẹn hò cầu kì chỉ là cùng nhau ăn<br />
            một bữa cơm, đi dạo quanh phố, kể chuyện linh tinh đến<br />
            khuya. Nhưng hóa ra, hạnh phúc đôi khi chỉ cần giản dị vậy thôi
          </>)}
        </motion.div>

        <motion.div variants={fSlideRight} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.6} style={{ width: '100%' }}>
          <UploadableImage
            src={photo('image6353', d.galleryImages?.[3] || A.image8)}
            alt="photo"
            editMode={em}
            label="Ảnh kỷ niệm"
            onUploaded={(url: any) => d?.onFieldChange?.('photos.image6353', url)}
            style={{ width: '100%' }}
          />
        </motion.div>
        <motion.div variants={fSlideLeft} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.7} style={{ width: '100%', marginTop: 20 }}>
          <UploadableImage
            src={photo('image6366', d.galleryImages?.[4] || A.image11)}
            alt="photo"
            editMode={em}
            label="Ảnh kỷ niệm"
            onUploaded={(url: any) => d?.onFieldChange?.('photos.image6366', url)}
            style={{ width: '100%' }}
          />
        </motion.div>
      </div>
    </div>
  )
}
