'use client'

import { useState, useEffect } from 'react'
import type { VRM } from '@pixiv/three-vrm'
import { loadVRM } from '@/lib/vrmLoader'
import { AvatarScene } from './AvatarScene'

export function VRMLoader() {
  const [vrm, setVrm] = useState<VRM | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        console.log('🔄 Starting VRM load...')
        const loaded = await loadVRM('/avatar/YAAR.vrm')
        if (!cancelled) {
          console.log('✅ VRM set to state')
          setVrm(loaded)
        }
      } catch (err) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : 'Unknown error'
          console.error('❌ VRM failed:', msg)
          setError(msg)
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  if (error) {
    console.error('VRM error state:', error)
    return null
  }

  if (!vrm) return null

  return <AvatarScene vrm={vrm} />
}