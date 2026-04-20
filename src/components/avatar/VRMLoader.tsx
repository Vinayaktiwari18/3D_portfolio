'use client'

import { useState, useEffect } from 'react'
import type { VRM } from '@pixiv/three-vrm'
import { loadVRM } from '@/lib/vrmLoader'
import { AvatarScene } from './AvatarScene'

export function VRMLoader() {
  const [vrm, setVrm] = useState<VRM | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const loaded = await loadVRM('/avatar/YAAR.vrm')
        if (!cancelled) setVrm(loaded)
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load avatar')
          console.error(err)
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  if (error) {
    console.warn('VRM load error:', error)
    return null
  }

  if (!vrm) return null

  return <AvatarScene vrm={vrm} />
}