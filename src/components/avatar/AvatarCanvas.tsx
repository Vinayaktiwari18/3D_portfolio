'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { VRMLoader } from './VRMLoader'
import { AnimationController } from './AnimationController'

export function AvatarCanvas() {
  return (
    <>
      <div style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // page underneath stays fully clickable/scrollable
        zIndex: 51,
      }}>
        <Canvas
          camera={{
            position: [0, 1, 2], // placeholder — AvatarScene overwrites this on load
            fov: 40,
            near: 0.01,
            far: 100,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{
            background: 'transparent',
            width: '100%',
            height: '100%',
            pointerEvents: 'none', // canvas itself must not block the page either
          }}
        >
          <ambientLight intensity={3} />
          <directionalLight position={[0, 2, 2]} intensity={3} />
          <directionalLight position={[-1, 1, 1]} intensity={1} color="#FF6A00" />

          <Environment preset="studio" />

          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.3}
            scale={3}
            blur={1.5}
          />

          <Suspense fallback={null}>
            <VRMLoader />
          </Suspense>
        </Canvas>
      </div>

      <AnimationController />
    </>
  )
}