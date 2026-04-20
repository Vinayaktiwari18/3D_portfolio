// src/components/ui/WhatsAppModal.tsx
'use client';

import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WHATSAPP_OPTIONS = [
  {
    emoji: '🚀',
    label: 'I want to collaborate on a project',
    message: "Hey Vinayak! I want to collaborate on a project with you.",
  },
  {
    emoji: '🤖',
    label: 'I need help building with AI',
    message: "Hey Vinayak! I need help building something with AI.",
  },
  {
    emoji: '💼',
    label: 'I want to hire you for a project',
    message: "Hey Vinayak! I want to hire you for a project.",
  },
  {
    emoji: '👋',
    label: 'Just wanted to connect',
    message: "Hey Vinayak! Just wanted to connect.",
  },
];

const WA_NUMBER = '919639731624';

export default function WhatsAppModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOption = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encoded}`,
      '_blank',
      'noopener,noreferrer'
    );
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(13,13,13,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--card-bg)',
          borderRadius: '4px',
          padding: '40px',
          maxWidth: '480px',
          width: '100%',
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}
        >
          <span style={{ fontSize: '24px' }}>💬</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: 'var(--gray)',
              lineHeight: 1,
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <h3
          style={{
            fontFamily: 'Teko, sans-serif',
            fontSize: '28px',
            color: 'var(--black)',
            margin: '0 0 4px',
            letterSpacing: '0.02em',
          }}
        >
          Let&apos;s Talk
        </h3>
        <p
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '13px',
            color: 'var(--gray)',
            margin: '0 0 28px',
          }}
        >
          Pick a reason to reach out on WhatsApp.
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {WHATSAPP_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleOption(opt.message)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 18px',
                background: 'transparent',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--orange)';
                el.style.background = 'rgba(255,106,0,0.04)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(0,0,0,0.1)';
                el.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: '20px', flexShrink: 0 }}>{opt.emoji}</span>
              <span
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '14px',
                  color: 'var(--black)',
                }}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}