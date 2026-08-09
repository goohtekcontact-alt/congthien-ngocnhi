'use client'

import { useRef, useState } from 'react'
import api from '@/lib/axios'

interface UploadableImageProps {
  /** Ảnh đang hiển thị (URL từ server hoặc path local) */
  src: string
  alt?: string
  style?: React.CSSProperties
  className?: string
  /** Có hiển thị nút upload không (chỉ true khi editMode) */
  editMode?: boolean
  /** Gọi khi upload xong, trả về URL mới */
  onUploaded?: (url: string) => void
  /** Label hiển thị trên nút upload (vd: "Ảnh 1") */
  label?: string
  wrapperStyle?: React.CSSProperties
  wrapperClassName?: string
  overlayStyle?: React.CSSProperties
}

// Helper to format image URLs from backend dynamically
const formatImageUrl = (src: string) => {
  if (!src) return '';
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const backendHost = apiUrl.replace(/\/api\/?$/, '');
  const uploadsBaseUrl = `${backendHost}/uploads`;

  if (src.startsWith('wedding-cards/')) {
    return `${uploadsBaseUrl}/${src}`;
  }
  
  if (src.startsWith('public/wedding-cards/')) {
    const relative = src.substring(7);
    return `${uploadsBaseUrl}/${relative}`;
  }

  if (src.startsWith('api/public/wedding-cards/')) {
    const relative = src.substring(11);
    return `${uploadsBaseUrl}/${relative}`;
  }

  if (src.startsWith('uploads/wedding-cards/')) {
    return `${backendHost}/${src}`;
  }
  
  if (src.includes('/wedding-cards/')) {
    const match = src.match(/wedding-cards\/.+$/);
    if (match) {
      const relative = match[0];
      return `${uploadsBaseUrl}/${relative}`;
    }
  }

  return src;
};

export function UploadableImage({
  src,
  alt = '',
  style,
  className,
  editMode,
  onUploaded,
  label,
  wrapperStyle,
  wrapperClassName,
  overlayStyle,
}: UploadableImageProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [hovered, setHovered] = useState(false)
  // uploadedSrc: URL sau khi user upload thành công (ưu tiên hơn src prop)
  const [uploadedSrc, setUploadedSrc] = useState<string | null>(null)
 
  // Nếu user đã upload thì dùng URL mới, ngược lại dùng src từ weddingData
  const displaySrc = formatImageUrl(uploadedSrc || src)

  const handleFile = async (file: File) => {
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data?.url) {
        const savedUrl = data.relativePath || data.url
        setUploadedSrc(savedUrl)
        onUploaded?.(savedUrl)
      }
    } catch (e) {
      console.error('Upload failed', e)
    } finally {
      setUploading(false)
    }
  }

  if (!editMode) {
    return <img src={displaySrc} alt={alt} style={style} className={className} />
  }

  // Trích xuất các class kích thước để áp dụng cho thẻ div bọc ngoài, giúp tránh vỡ layout khi ở chế độ editMode
  const classes = className ? className.split(/\s+/) : []
  const sizeClasses = classes.filter(
    c => c.startsWith('w-') || c.startsWith('h-') || c.startsWith('max-w-') || c.startsWith('max-h-')
  )
  const finalWrapperClassName = [
    sizeClasses.join(' '),
    wrapperClassName || ''
  ].filter(Boolean).join(' ')

  const hasWidthClass = sizeClasses.some(c => c.startsWith('w-'))

  // Phân tách style để đưa các thuộc tính định dạng box/position lên wrapper div, tránh vỡ layout absolute/flex
  const {
    position,
    top,
    left,
    right,
    bottom,
    zIndex,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    aspectRatio,
    margin,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    flex,
    flexShrink,
    flexGrow,
    alignSelf,
    justifySelf,
    borderRadius,
    transform,
    rotate,
    scale,
    overflow,
    ...imgSpecificStyle
  } = style || {}

  const finalWrapperStyle: React.CSSProperties = {
    position: position || 'relative',
    top,
    left,
    right,
    bottom,
    zIndex,
    display: (position === 'absolute' || position === 'fixed') ? undefined : 'inline-block',
    width: width || (hasWidthClass ? undefined : '100%'),
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    aspectRatio,
    margin,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    flex,
    flexShrink,
    flexGrow,
    alignSelf,
    justifySelf,
    borderRadius,
    transform,
    rotate,
    scale,
    overflow: overflow || (borderRadius ? 'hidden' : undefined),
    ...wrapperStyle,
  }

  const hasFixedSize = height || aspectRatio;

  const finalImgStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: hasFixedSize ? '100%' : undefined,
    minHeight: hasFixedSize ? undefined : '100%',
    objectFit: imgSpecificStyle.objectFit || 'cover',
    borderRadius: 'inherit',
    aspectRatio,
    transition: 'filter 0.2s',
    filter: hovered ? 'brightness(0.7)' : 'none',
    cursor: 'pointer',
    ...imgSpecificStyle,
  }

  return (
    <div
      style={finalWrapperStyle}
      className={finalWrapperClassName}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={displaySrc}
        alt={alt}
        style={finalImgStyle}
        className={className}
        onClick={() => inputRef.current?.click()}
      />

      {/* Overlay nút upload */}
      <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            pointerEvents: 'none',
            zIndex: 10,
            ...overlayStyle,
          }}
        >
          {uploading ? (
            <>
              <div
                style={{
                  width: 28,
                  height: 28,
                  border: '3px solid rgba(255,255,255,0.4)',
                  borderTop: '3px solid #fff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>
                Đang tải...
              </span>
            </>
          ) : (
            <>
              <div
                style={{
                  background: 'rgba(0,0,0,0.55)',
                  borderRadius: 999,
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {label ? `Đổi ${label}` : 'Đổi ảnh'}
                </span>
              </div>
            </>
          )}
        </div>

      {/* Input file ẩn */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = '' // reset để có thể chọn lại cùng file
        }}
      />

      {/* CSS animation spin */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
