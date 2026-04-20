'use client'

import { useState, useRef, KeyboardEvent } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Ask anything about Vinayak...',
}: ChatInputProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSend() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    inputRef.current?.focus()
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        borderTop: '0.5px solid #E8E6E1',
        background: 'white',
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          flex: 1,
          fontFamily: 'Sora, sans-serif',
          fontSize: '13px',
          color: '#0D0D0D',
          border: '0.5px solid #E8E6E1',
          borderRadius: '2px',
          padding: '8px 12px',
          background: disabled ? '#F4F2ED' : 'white',
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#FF6A00'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#E8E6E1'
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '2px',
          background: disabled || !value.trim()
            ? '#E8E6E1'
            : '#FF6A00',
          color: 'white',
          border: 'none',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled || !value.trim()
            ? 'not-allowed'
            : 'pointer',
          transition: 'background 0.2s ease',
          flexShrink: 0,
        }}
      >
        →
      </button>
    </div>
  )
}