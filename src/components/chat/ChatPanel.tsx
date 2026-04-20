'use client'

import { useState, useRef, useEffect } from 'react'
import { useAvatarState } from '@/hooks/useAvatarState'
import { ChatBubble } from './ChatBubble'
import { ChatInput } from './ChatInput'
import { sendMessage, type ChatMessage } from '@/lib/groqClient'

const OPENING_MESSAGE =
  "Hey! 👋 I'm YAAR — Vinayak's AI. Ask me anything about him, his projects, or whether you should work with him 😄"

export function ChatPanel() {
  const { isChatOpen, closeChat, setState } = useAvatarState()

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages, isTyping])

  async function handleSend(userMessage: string) {
    // Add user message
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: userMessage },
    ]
    setMessages(newMessages)

    // Avatar talks while responding
    setState('talking')
    setIsTyping(true)

    try {
      const reply = await sendMessage(newMessages)

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Oops, something went wrong. Try again!',
        },
      ])
    } finally {
      setIsTyping(false)
      // Return to floating after response
      setTimeout(() => setState('floating'), 2000)
    }
  }

  function handleClose() {
    closeChat()
    setMessages([])
  }

  if (!isChatOpen) return null

  return (
    <>
      {/* Backdrop — click to close */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 48,
          background: 'transparent',
        }}
      />

      {/* Chat panel */}
      <div
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '300px',
          width: '340px',
          height: '480px',
          background: 'white',
          borderRadius: '12px',
          borderTop: '3px solid #FF6A00',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          zIndex: 49,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.4s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 20px',
            borderBottom: '0.5px solid #E8E6E1',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'Teko, sans-serif',
              fontSize: '22px',
              letterSpacing: '2px',
              color: '#0D0D0D',
              flex: 1,
              lineHeight: 1,
            }}
          >
            YAAR<span style={{ color: '#FF6A00' }}>.</span>ai
          </span>

          {/* Online indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              color: '#8A8A8A',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#22c55e',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            online
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              fontSize: '20px',
              color: '#8A8A8A',
              background: 'none',
              border: 'none',
              lineHeight: 1,
              cursor: 'pointer',
              padding: '0 4px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0D0D0D'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#8A8A8A'
            }}
          >
            ×
          </button>
        </div>

        {/* Messages area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Opening message always first */}
          <ChatBubble
            message={OPENING_MESSAGE}
            isUser={false}
          />

          {/* Conversation messages */}
          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              message={msg.content}
              isUser={msg.role === 'user'}
            />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '10px 14px',
                background: '#F4F2ED',
                borderRadius: '12px 12px 12px 2px',
                width: 'fit-content',
                border: '0.5px solid #E8E6E1',
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#FF6A00',
                    animation: `typingDot 1s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput
          onSend={handleSend}
          disabled={isTyping}
        />
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes typingDot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </>
  )
}