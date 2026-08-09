import React from 'react';

export function InlineEdit({ value, multiline, style, className }: any) {
  if (multiline) {
    return <span style={style} className={className}>{value}</span>;
  }
  return <span style={style} className={className}>{value}</span>;
}
