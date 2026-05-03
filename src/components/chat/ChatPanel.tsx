'use client'

import { useState, useRef, useEffect } from 'react'
import { useAvatarState } from '@/hooks/useAvatarState'
import { ChatBubble } from './ChatBubble'
import { ChatInput } from './ChatInput'
import { sendMessage, type ChatMessage } from '@/lib/groqClient'

const OPENING_MESSAGE =
  "Hey! 👋 I'm YAAR — Vinayak's AI. Ask me anything about him, his projects, or whether you should hire him 😄"

export function ChatPanel() {
  const { isChatOpen, closeChat, setState } = useAvatarState()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Reset messages when closed
  useEffect(() => {
    if (!isChatOpen) setMessages([])
  }, [isChatOpen])

  async function handleSend(userMessage: string) {
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: userMessage },
    ]
    setMessages(newMessages)
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
        { role: 'assistant', content: 'Oops! Something went wrong. Try again!' },
      ])
    } finally {
      setIsTyping(false)
      setTimeout(() => setState('floating'), 2000)
    }
  }

  if (!isChatOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeChat}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 55,
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Chat panel — LEFT of avatar */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '340px',
        width: '360px',
        height: '500px',
        background: '#FAFAF8',
        borderRadius: '16px',
        borderTop: '3px solid #FF6A00',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        zIndex: 56,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideUp 0.4s cubic-bezier(0.23,1,0.32,1)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '16px 20px',
          borderBottom: '1px solid #E8E6E1',
          background: 'white',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'Teko, sans-serif',
            fontSize: '24px',
            letterSpacing: '2px',
            color: '#0D0D0D',
            flex: 1,
            lineHeight: 1,
          }}>
            YAAR<span style={{ color: '#FF6A00' }}>.</span>ai
          </span>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            color: '#8A8A8A',
          }}>
            <div style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: '#22c55e',
              animation: 'pulse 2s ease infinite',
            }} />
            online
          </div>

          <button
            onClick={closeChat}
            style={{
              fontSize: '22px',
              color: '#8A8A8A',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0 4px',
              lineHeight: 1,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#0D0D0D'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8A8A8A'}
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <ChatBubble message={OPENING_MESSAGE} isUser={false} />

          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              message={msg.content}
              isUser={msg.role === 'user'}
            />
          ))}

          {isTyping && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '10px 14px',
              background: '#F4F2ED',
              borderRadius: '12px 12px 12px 2px',
              width: 'fit-content',
              border: '1px solid #E8E6E1',
            }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: '#FF6A00',
                  animation: `typingDot 1s ease ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  )
}