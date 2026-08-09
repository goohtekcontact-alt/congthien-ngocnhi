'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react'

interface InlineEditProps {
  value: string
  onChange?: (val: string) => void
  editMode?: boolean
  style?: React.CSSProperties
  className?: string
  multiline?: boolean
  placeholder?: string
}

/**
 * InlineEdit — hiển thị text bình thường, khi hover hiện icon bút,
 * click vào thì chuyển thành input để sửa.
 */
export function InlineEdit({
  value, onChange, editMode = false,
  style, className, multiline = false,
  placeholder = 'Nhấn để nhập...',
}: InlineEditProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)

  // Sync draft khi value bên ngoài thay đổi
  useEffect(() => { setDraft(value) }, [value])

  const commit = useCallback(() => {
    setEditing(false)
    if (draft !== value) onChange?.(draft)
  }, [draft, value, onChange])

  const startEdit = useCallback((e: React.MouseEvent) => {
    if (!editMode) return
    e.stopPropagation()
    setDraft(value)
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 30)
  }, [editMode, value])

  // Shared input style — kế thừa font từ parent, trông như text bình thường
  const inputStyle: React.CSSProperties = {
    ...style,
    display: 'inline-block',
    background: 'rgba(255,255,255,0.25)',
    border: '1.5px dashed rgba(236,72,153,0.7)',
    borderRadius: 4,
    outline: 'none',
    width: '100%',
    minWidth: 40,
    padding: '1px 4px',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    letterSpacing: 'inherit',
    lineHeight: 'inherit',
    textAlign: (style?.textAlign as any) || 'inherit',
    resize: 'none',
    boxSizing: 'border-box',
    boxShadow: '0 0 0 3px rgba(236,72,153,0.15)',
  }

  /* ── Đang editing ─────────────────────────────────────────────── */
  if (editing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => { if (e.key === 'Escape') { setEditing(false); setDraft(value) } }}
          rows={3}
          style={inputStyle}
          onClick={e => e.stopPropagation()}
        />
      )
    }
    return (
      <input
        ref={inputRef as React.Ref<HTMLInputElement>}
        type="text"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => {
          if (e.key === 'Enter') commit()
          if (e.key === 'Escape') { setEditing(false); setDraft(value) }
        }}
        style={inputStyle}
        onClick={e => e.stopPropagation()}
      />
    )
  }

  /* ── Không editMode — render thuần ────────────────────────────── */
  if (!editMode) {
    return (
      <span style={style} className={className}>
        {value || <span style={{ opacity: 0.3 }}>{placeholder}</span>}
      </span>
    )
  }

  /* ── editMode nhưng chưa click ─────────────────────────────────── */
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'text', gap: 3, maxWidth: '100%', overflow: 'hidden' }}
      className={className}
      onClick={startEdit}
      title="Nhấn để chỉnh sửa"
    >
      <span style={{ display: 'block', ...style, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: style?.whiteSpace || 'inherit' }}>
        {value || <span style={{ opacity: 0.35, ...style }}>{placeholder}</span>}
      </span>

      {/* Icon bút chì — luôn hiển thị khi editMode */}
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 18, height: 18,
          background: 'rgba(236,72,153,0.15)',
          borderRadius: '50%',
          flexShrink: 0,
          cursor: 'pointer',
          verticalAlign: 'middle',
        }}
        title="Chỉnh sửa"
      >
        {/* Pencil SVG */}
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none"
          stroke="#db2777" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </span>
    </span>
  )
}
