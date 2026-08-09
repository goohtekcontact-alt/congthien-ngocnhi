import React from 'react';

export function UploadableImage({ src, alt, style, wrapperStyle, overlayStyle, className }: any) {
  return (
    <div style={{ position: 'relative', ...wrapperStyle }} className={className}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }} />
    </div>
  );
}
