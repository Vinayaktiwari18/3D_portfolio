'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { VRM } from '@pixiv/three-vrm'
import { useAvatarState } from '@/hooks/useAvatarState'
import {
  ANIMATION_MAP,
  IDLE_VARIANTS,
  type AvatarState,
} from '@/lib/animationStates'
import { loadMixamoAnimation } from '@/lib/mixamoRetarget'

interface Props { vrm: VRM }

export function AvatarScene({ vrm }: Props) {
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const currentActionRef = useRef<THREE.AnimationAction | null>(null)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loadingRef = useRef(false)
  const prevStateRef = useRef<AvatarState | null>(null)
  const mountedRef = useRef(false)
  const { currentState, setLoaded } = useAvatarState()

  const scheduleIdleVariation = useCallback(() => {
    if (!mountedRef.current) return
    const delay = 8000 + Math.random() * 4000

    idleTimerRef.current = setTimeout(async () => {
      if (!mixerRef.current || !vrm || !mountedRef.current) return
      const variant =
        IDLE_VARIANTS[Math.floor(Math.random() * IDLE_VARIANTS.length)]
      try {
        const clip = await loadMixamoAnimation(
          `/animations/${variant}`, vrm
        )
        if (!mixerRef.current || !mountedRef.current) return

        const action = mixerRef.current.clipAction(clip)
        action.loop = THREE.LoopOnce
        action.clampWhenFinished = true
        currentActionRef.current?.crossFadeTo(action, 0.5, true)
        action.reset().play()
        currentActionRef.current = action

        idleTimerRef.current = setTimeout(() => {
          if (!mountedRef.current) return
          loadingRef.current = false
          scheduleIdleVariation()
        }, 3500)
      } catch {
        if (mountedRef.current) scheduleIdleVariation()
      }
    }, delay)
  }, [vrm])

  const playAnimation = useCallback(async (
    state: AvatarState,
    fadeTime = 0.5
  ) => {
    if (!mixerRef.current || !vrm || !mountedRef.current) return
    if (loadingRef.current) return
    loadingRef.current = true

    const config = ANIMATION_MAP[state]
    const url = `/animations/${config.file}`

    try {
      const clip = await loadMixamoAnimation(url, vrm)

      if (!mixerRef.current || !mountedRef.current) {
        loadingRef.current = false
        return
      }

      const mixer = mixerRef.current
      const newAction = mixer.clipAction(clip)

      newAction.loop = config.loop
        ? THREE.LoopRepeat
        : THREE.LoopOnce
      newAction.clampWhenFinished = !config.loop
      newAction.timeScale = config.timeScale
      newAction.enabled = true
      newAction.paused = false

      if (
        currentActionRef.current &&
        currentActionRef.current !== newAction
      ) {
        currentActionRef.current.crossFadeTo(newAction, fadeTime, true)
      } else {
        newAction.reset()
      }

      newAction.play()
      currentActionRef.current = newAction
      loadingRef.current = false

      console.log(`▶️ Playing: ${state} → ${config.file}`)

      if (!config.loop && config.duration > 0) {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
        idleTimerRef.current = setTimeout(() => {
          if (!mountedRef.current) return
          prevStateRef.current = null
          loadingRef.current = false
          playAnimation('idle')
          scheduleIdleVariation()
        }, config.duration)
      }
    } catch (err) {
      console.warn(`❌ Animation failed: ${url}`, err)
      loadingRef.current = false
      if (state !== 'idle' && mountedRef.current) {
        prevStateRef.current = null
        playAnimation('idle')
      }
    }
  }, [vrm, scheduleIdleVariation])

  useEffect(() => {
    if (!vrm) return

    mountedRef.current = true
    vrm.scene.position.set(0, 0, 0)
    mixerRef.current = new THREE.AnimationMixer(vrm.scene)

    setLoaded(true)
    console.log('🎬 Mixer created, starting idle...')

    const t = setTimeout(() => {
      if (!mountedRef.current) return
      playAnimation('idle')
      setTimeout(() => scheduleIdleVariation(), 1000)
    }, 200)

    return () => {
      mountedRef.current = false
      clearTimeout(t)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      mixerRef.current?.stopAllAction()
      mixerRef.current = null
      loadingRef.current = false
      prevStateRef.current = null
      // ✅ NO deepDispose!
    }
  }, [vrm, setLoaded, playAnimation, scheduleIdleVariation])

  useEffect(() => {
    if (!mountedRef.current) return
    if (prevStateRef.current === currentState) return
    prevStateRef.current = currentState
    loadingRef.current = false
    playAnimation(currentState)
  }, [currentState, playAnimation])

  useFrame((_, delta) => {
    if (!mountedRef.current) return
    mixerRef.current?.update(delta)
    vrm?.update(delta)
  })

  return <primitive object={vrm.scene} />
}