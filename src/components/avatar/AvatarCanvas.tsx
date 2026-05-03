'use client'

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { useAvatarState } from '@/hooks/useAvatarState'
import { VRMLoader } from './VRMLoader'
import { AnimationController } from './AnimationController'

export function AvatarCanvas() {
  const { openChat, setState, isLoaded } = useAvatarState()
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowHint(true), 2000)
    const t2 = setTimeout(() => setShowHint(false), 7000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (isLoaded) {
      setShowHint(true)
      const t = setTimeout(() => setShowHint(false), 5000)
      return () => clearTimeout(t)
    }
  }, [isLoaded])

  function handleClick() {
    setState('waving')
    setTimeout(() => openChat(), 1200)
  }

  return (
    <>
      {showHint && (
        <div style={{
          position: 'fixed',
          bottom: '320px',
          right: '12px',
          background: 'white',
          border: '1px solid #E8E6E1',
          borderRadius: '10px 10px 2px 10px',
          padding: '6px 10px',
          fontSize: '11px',
          fontFamily: 'Space Mono, monospace',
          color: '#8A8A8A',
          pointerEvents: 'none',
          zIndex: 60,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          animation: 'fadeOut 0.5s ease 4s forwards',
        }}>
          tap me! 👆
        </div>
      )}

      <div
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '200px',
          height: '380px',
          zIndex: 52,
          cursor: 'pointer',
        }}
      />

      <div style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '200px',
        height: '380px',
        pointerEvents: 'none',
        zIndex: 51,
      }}>
        <Canvas
          camera={{
            position: [0, 0.9, 4.0],
            fov: 38,
            near: 0.1,
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
          }}
        >
          <ambientLight intensity={2.5} />
          <directionalLight
            position={[0, 3, 5]}
            intensity={3}
          />
          <directionalLight
            position={[-2, 2, 2]}
            intensity={1}
            color="#FF6A00"
          />

          <Environment preset="studio" />

          {/* Shift down so upper body centers in view */}
          <group position={[0, -0.9, 0]}>
            <ContactShadows
              position={[0, 0, 0]}
              opacity={0.2}
              scale={2}
              blur={1.5}
            />
            <Suspense fallback={null}>
              <VRMLoader />
            </Suspense>
          </group>
        </Canvas>
      </div>

      <AnimationController />
    </>
  )
}