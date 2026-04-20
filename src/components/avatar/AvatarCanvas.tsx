'use client'

import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from '@react-three/drei'
import { useAvatarState } from '@/hooks/useAvatarState'
import { VRMLoader } from './VRMLoader'
import { AnimationController } from './AnimationController'

// Avatar canvas sits fixed on screen
// pointer-events none so page scrolls normally
// Only character mesh is clickable via raycasting

export function AvatarCanvas() {
  const { openChat, setState } = useAvatarState()
  const canvasRef = useRef<HTMLDivElement>(null)

  function handleAvatarClick() {
    // Wave first then open chat
    setState('waving')
    setTimeout(() => {
      openChat()
    }, 1200)
  }

  return (
    <>
      {/* Fixed canvas — always visible */}
      <div
        ref={canvasRef}
        style={{
          position: 'fixed',
          // Bottom right of screen
          bottom: 0,
          right: 0,
          // Size of avatar viewport
          width: '280px',
          height: '520px',
          // Let scroll pass through canvas
          // but canvas itself catches clicks
          pointerEvents: 'none',
          zIndex: 50,
        }}
      >
        <Canvas
          camera={{
            position: [0, 1.2, 3.5],
            fov: 30,
            near: 0.1,
            far: 100,
          }}
          gl={{
            antialias: true,
            alpha: true,
            // Performance: limit pixel ratio
            powerPreference: 'high-performance',
          }}
          // Transparent background
          style={{
            background: 'transparent',
            pointerEvents: 'none',
          }}
          shadows
        >
          {/* Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[2, 4, 2]}
            intensity={1.2}
            castShadow
          />
          <directionalLight
            position={[-2, 2, -2]}
            intensity={0.4}
            color="#00C9C8"
          />

          {/* Environment for realistic shading */}
          <Environment preset="studio" />

          {/* Subtle shadow under character */}
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.3}
            scale={2}
            blur={2}
          />

          {/* The actual VRM character */}
          <Suspense fallback={null}>
            {/* Clickable group — only this gets
                pointer events */}
            <group onClick={handleAvatarClick}>
              <VRMLoader />
            </group>
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll watcher — no visual output */}
      <AnimationController />

      {/* Click hint bubble — shows on first load */}
      <ClickHint />
    </>
  )
}

// Small hint that fades after 5 seconds
function ClickHint() {
  const { isLoaded } = useAvatarState()

  if (!isLoaded) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '530px',
        right: '80px',
        background: 'white',
        border: '0.5px solid #E8E6E1',
        borderRadius: '12px 12px 2px 12px',
        padding: '8px 12px',
        fontSize: '12px',
        fontFamily: 'Space Mono, monospace',
        color: '#8A8A8A',
        pointerEvents: 'none',
        zIndex: 51,
        whiteSpace: 'nowrap',
        animation: 'fadeOut 1s ease 4s forwards',
      }}
    >
      Click me to chat! 👆
    </div>
  )
}