import React from 'react';

export function InlineEdit({ value, style, className }: any) {
  const renderFormatted = (text: any) => {
    if (typeof text !== 'string') return text;

    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      let isHeader = false;
      let cleanLine = line;
      if (cleanLine.startsWith('# ')) {
        isHeader = true;
        cleanLine = cleanLine.slice(2);
      } else if (cleanLine.trim().toUpperCase() === 'CÂU CHUYỆN CỦA CHÚNG MÌNH') {
        isHeader = true;
        cleanLine = cleanLine.trim();
      }

      // Convert ALL CAPS to Title Case for cursive script font headers to prevent capital letter flourishes from overlapping
      if (isHeader && typeof cleanLine === 'string' && cleanLine === cleanLine.toUpperCase()) {
        cleanLine = cleanLine.toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase());
      }

      const parts = cleanLine.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={pIdx} style={{ fontStyle: 'italic' }}>{part.slice(1, -1)}</em>;
        }
        return part;
      });

      if (isHeader) {
        return (
          <React.Fragment key={lIdx}>
            {lIdx > 0 && <br />}
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '44px', fontWeight: 400, display: 'block', marginBottom: '12px', lineHeight: 1.3 }}>
              {renderedParts}
            </span>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={lIdx}>
          {lIdx > 0 && <br />}
          {renderedParts}
        </React.Fragment>
      );
    });
  };

  return <span style={style} className={className}>{renderFormatted(value)}</span>;
}

