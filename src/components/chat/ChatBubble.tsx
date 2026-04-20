'use client'

interface ChatBubbleProps {
  message: string
  isUser: boolean
  timestamp?: string
}

export function ChatBubble({
  message,
  isUser,
  timestamp,
}: ChatBubbleProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        gap: '4px',
      }}
    >
      <div
        style={{
          maxWidth: '85%',
          padding: '10px 14px',
          borderRadius: isUser
            ? '12px 12px 2px 12px'
            : '12px 12px 12px 2px',
          background: isUser ? '#FF6A00' : '#F4F2ED',
          color: isUser ? 'white' : '#0D0D0D',
          fontFamily: isUser
            ? 'var(--font-body, Sora, sans-serif)'
            : 'var(--font-mono, Space Mono, monospace)',
          fontSize: '13px',
          lineHeight: '1.5',
          border: isUser
            ? 'none'
            : '0.5px solid #E8E6E1',
          wordBreak: 'break-word',
        }}
      >
        {message}
      </div>
      {timestamp && (
        <span
          style={{
            fontSize: '10px',
            color: '#8A8A8A',
            fontFamily: 'Space Mono, monospace',
            letterSpacing: '0.5px',
          }}
        >
          {timestamp}
        </span>
      )}
    </div>
  )
}