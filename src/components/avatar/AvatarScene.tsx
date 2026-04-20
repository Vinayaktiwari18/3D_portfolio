'use client'

import { useRef, useEffect, Suspense } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { VRM, VRMUtils } from '@pixiv/three-vrm'
import { useAvatarState } from '@/hooks/useAvatarState'
import {
  ANIMATION_MAP,
  IDLE_VARIANTS,
  type AvatarState,
} from '@/lib/animationStates'
import { loadMixamoAnimation } from '@/lib/mixamoRetarget'

interface AvatarSceneProps {
  vrm: VRM
}

export function AvatarScene({ vrm }: AvatarSceneProps) {
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const currentActionRef = useRef<THREE.AnimationAction | null>(null)
  const clockRef = useRef(new THREE.Clock())
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)

  const { currentState, setLoaded } = useAvatarState()
  const { scene } = useThree()

  // Init mixer on mount
  useEffect(() => {
    if (!vrm) return

    // Add VRM scene to Three.js scene
    scene.add(vrm.scene)
    mixerRef.current = new THREE.AnimationMixer(vrm.scene)

    // Mark as loaded
    setLoaded(true)

    // Start with floating animation
    playAnimation('floating')

    // Random idle variation every 8-12 seconds
    scheduleIdleVariation()

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
      mixerRef.current?.stopAllAction()
      scene.remove(vrm.scene)
      VRMUtils.deepDispose(vrm.scene)
    }
  }, [vrm])

  // React to state changes from outside
  useEffect(() => {
    playAnimation(currentState)
  }, [currentState])

  // Animation frame update
  useFrame(() => {
    const delta = clockRef.current.getDelta()
    mixerRef.current?.update(delta)
    vrm?.update(delta)
  })

  async function playAnimation(
    state: AvatarState,
    fadeTime = 0.5
  ) {
    const mixer = mixerRef.current
    if (!mixer || !vrm) return

    const config = ANIMATION_MAP[state]
    const url = `/animations/${config.file}`

    try {
      const clip = await loadMixamoAnimation(url, vrm)
      const newAction = mixer.clipAction(clip)

      // Configure action
      newAction.loop = config.loop
        ? THREE.LoopRepeat
        : THREE.LoopOnce
      newAction.clampWhenFinished = !config.loop
      newAction.timeScale = config.timeScale

      // Crossfade from current
      if (currentActionRef.current) {
        currentActionRef.current
          .crossFadeTo(newAction, fadeTime, true)
      }

      newAction.reset().play()
      currentActionRef.current = newAction

      // Auto return to floating after one-shot anims
      if (!config.loop && config.duration > 0) {
        if (idleTimerRef.current) {
          clearTimeout(idleTimerRef.current)
        }
        idleTimerRef.current = setTimeout(() => {
          playAnimation('floating')
          scheduleIdleVariation()
        }, config.duration)
      }
    } catch (err) {
      console.warn(`Failed to load animation: ${url}`, err)
      // Fallback to idle
      if (state !== 'idle') playAnimation('idle')
    }
  }

  function scheduleIdleVariation() {
    const delay = 8000 + Math.random() * 4000
    idleTimerRef.current = setTimeout(async () => {
      const mixer = mixerRef.current
      if (!mixer || !vrm) return

      // Pick random idle variant
      const variant = IDLE_VARIANTS[
        Math.floor(Math.random() * IDLE_VARIANTS.length)
      ]
      const clip = await loadMixamoAnimation(
        `/animations/${variant}`,
        vrm
      )
      const action = mixer.clipAction(clip)
      action.loop = THREE.LoopOnce
      action.clampWhenFinished = true
      action.reset().play()
      currentActionRef.current = action

      // Return to floating after variant
      setTimeout(() => {
        playAnimation('floating')
        scheduleIdleVariation()
      }, 4000)
    }, delay)
  }

  // Avatar is added to scene via useEffect
  // nothing to render here directly
  return null
}