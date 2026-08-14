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
          <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: 68, fontWeight: 400, color: OLIVE, marginTop: 40, marginBottom: 8 }}>My Lover</h1>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, color: OLIVE, lineHeight: 1.5, maxWidth: 500, width: '100%', padding: '0 24px', boxSizing: 'border-box', textAlign: 'center', textWrap: 'pretty' }}>
            {d.message || (<>
              Gửi đến bạn tấm thiệp cưới đầy yêu thương.<br />
              Bởi những ai nhận được lời mời này đều là những người đặc biệt và quan trọng với bọn mình.<br />
              <br />
              Ngày vui của chúng mình sẽ trọn vẹn hơn khi có bạn và gia đình cùng hiện diện, cùng chia sẻ niềm vui trong khoảnh khắc thật ý nghĩa này.<br />
              <br />
              Tụi mình rất mong được gặp bạn, cùng nâng ly, cùng cười thật nhiều và lưu lại những khoảnh khắc thật đẹp bên nhau.<br />
              <br />
              Hẹn gặp bạn trong ngày chúng mình về chung một nhà! 🤍
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
          {/* Names + Parents */}
          <div style={{ width: 'calc(100% + 40px)', marginLeft: -20, marginRight: -20, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 6, padding: '0', marginBottom: 32 }}>
            <motion.div variants={fSlideLeft} custom={0.7} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', textAlign: 'center', minWidth: 0, overflow: 'hidden', height: '100%' }}>
              <div style={{ width: '100%', marginBottom: 4, fontFamily: FONT_SCRIPT, fontSize: '1.6rem', color: OLIVE, lineHeight: 1.2, wordWrap: 'break-word' }}>
                <InlineEdit value={d.brideName || shortName(d.brideInfo?.name) || 'Ngọc Thảo'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('brideName', v)} />
              </div>
              <div className="text-[11px] sm:text-[12px]" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: OLIVE_BG, color: '#fff', width: '100%', borderRadius: 9999, textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.12)', padding: '8px 4px', whiteSpace: 'normal', lineHeight: 1.4, letterSpacing: '-0.2px' }}>
                <p style={{ marginBottom: 4 }}>Bố: <InlineEdit value={d.brideInfo?.fatherName || 'Nguyễn Văn Thuẫn'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('brideInfo.fatherName', v)} /></p>
                <p>Mẹ: <InlineEdit value={d.brideInfo?.motherName || 'Nguyễn Thị Phượng'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('brideInfo.motherName', v)} /></p>
              </div>
              <p style={{ fontSize: 14, color: OLIVE, marginTop: 8 }}>(<InlineEdit value={d.brideInfo?.city || d.brideInfo?.hometown || 'TP. Hà Nội'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('brideInfo.city', v)} />)</p>
            </motion.div>

            <motion.div variants={fSlideRight} custom={0.6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', textAlign: 'center', minWidth: 0, overflow: 'hidden', height: '100%' }}>
              <div style={{ width: '100%', marginBottom: 4, fontFamily: FONT_SCRIPT, fontSize: '1.6rem', color: OLIVE, lineHeight: 1.2, wordWrap: 'break-word' }}>
                <InlineEdit value={d.groomName || shortName(d.groomInfo?.name) || 'Trung Đức'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('groomName', v)} />
              </div>
              <div className="text-[11px] sm:text-[12px]" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: OLIVE_BG, color: '#fff', width: '100%', borderRadius: 9999, textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.12)', padding: '8px 4px', whiteSpace: 'normal', lineHeight: 1.4, letterSpacing: '-0.2px' }}>
                <p style={{ marginBottom: 4 }}>Bố: <InlineEdit value={d.groomInfo?.fatherName || 'Đặng Văn Đạt'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('groomInfo.fatherName', v)} /></p>
                <p>Mẹ: <InlineEdit value={d.groomInfo?.motherName || 'Phạm Thị Luyến'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('groomInfo.motherName', v)} /></p>
              </div>
              <p style={{ fontSize: 14, color: OLIVE, marginTop: 8 }}>(<InlineEdit value={d.groomInfo?.city || d.groomInfo?.hometown || 'TP. Hải Phòng'} editMode={em} onChange={(v: any) => d?.onFieldChange?.('groomInfo.city', v)} />)</p>
            </motion.div>
          </div>

          {/* First love story */}
          <div style={{ width: '100%', textAlign: 'center', padding: '0 24px' }}>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, color: OLIVE, lineHeight: 1.5, textAlign: 'center', textWrap: 'pretty' }}>
              <InlineEdit
                value={d.story1 || 'Tháng 8 — tháng của những cơn mưa, cũng là tháng mở đầu cho câu chuyện tình yêu của chúng mình.\n\nChúng mình gặp nhau lần đầu tiên ở một nơi thật đặc biệt — nhà thờ, sau một Thánh lễ Chúa nhật.\n\nChẳng ai biết rằng, giữa biết bao người qua lại, cuộc gặp gỡ rất đỗi bình thường ấy lại là khởi đầu cho một hành trình thật đẹp.\n\nRồi những buổi hẹn đầu tiên cứ thế nối tiếp nhau. Và thật lạ, hầu như cuộc hẹn nào cũng có mưa.'}
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
          className="text-[32px] sm:text-[48px]"
          style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 32px 40px', width: '100%', fontFamily: "'Great Vibes', cursive" }}>
          <h2>Welcome</h2><h2>to</h2><h2>Wedding</h2>
        </motion.div>

        <motion.div variants={fVariants} initial="hidden" whileInView="visible" viewport={marginConfig} custom={0.3}
          style={{ width: '100%', textAlign: 'center', padding: '0 24px' }}>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, color: OLIVE, lineHeight: 1.5, textAlign: 'center', textWrap: 'pretty' }}>
            <InlineEdit
              value={d.story2 || 'Có lẽ ông trời đã vô tình viết thêm một chút lãng mạn cho câu chuyện của chúng mình — để những ngày đầu bên nhau luôn có tiếng mưa rơi, có những đoạn đường cùng đi, và có hai người dần trở nên thân thuộc.\n\nSau hai tháng tìm hiểu, chúng mình chính thức gọi tên mối quan hệ ấy là tình yêu.\n\nTừ những buổi hẹn dưới mưa, những cuộc trò chuyện chẳng biết bao giờ mới hết, đến những ngày cùng nhau chia sẻ niềm vui, nỗi buồn và cả những điều rất nhỏ trong cuộc sống…\n\nChúng mình nhận ra rằng, điều đẹp nhất không phải là tìm được một người hoàn hảo, mà là tìm được một người muốn cùng mình bước tiếp.\n\nVà rồi, thật trùng hợp cũng thật nhiệm màu…'}
              editMode={em}
              multiline
              onChange={(v: any) => d?.onFieldChange?.('story2', v)}
              style={{ textAlign: 'center', width: '100%', display: 'block', whiteSpace: 'pre-line' }}
            />
          </p>
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
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: 16, width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '80px 24px', boxSizing: 'border-box', textWrap: 'pretty' }}>
          <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: 68, fontWeight: 400, color: OLIVE }}>I Love You</h1>
          <motion.img variants={fRotateIn} custom={0.6} src={A.heartwithline} alt="heart" style={{ width: 75, height: 75, objectFit: 'contain' }} />
          <div style={{ width: '100%', textAlign: 'center', padding: '0 24px' }}>
            <InlineEdit
              value={d.loveQuote || 'Sau hai tháng tìm hiểu, chúng mình chính thức gọi tên mối quan hệ ấy là tình yêu.\n\nTừ những buổi hẹn dưới mưa, những cuộc trò chuyện chẳng biết bao giờ mới hết, đến những ngày cùng nhau chia sẻ niềm vui, nỗi buồn và cả những điều rất nhỏ trong cuộc sống…\n\nChúng mình nhận ra rằng, điều đẹp nhất không phải là tìm được một người hoàn hảo, mà là tìm được một người muốn cùng mình bước tiếp.'}
              editMode={em}
              multiline
              onChange={(v: any) => d?.onFieldChange?.('loveQuote', v)}
              style={{ textAlign: 'center', width: '100%', display: 'block', whiteSpace: 'pre-line' }}
            />
          </div>
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
