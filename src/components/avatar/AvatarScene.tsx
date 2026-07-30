'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
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

const WALK_SPEED = 0.6 // world units / second
const MIN_DWELL = 3 // seconds paused at a waypoint before moving again
const MAX_DWELL = 6
const EDGE_MARGIN_RATIO = 0.15 // keep her this fraction of viewport width away from edges
const ARRIVE_THRESHOLD = 0.08

export function AvatarScene({ vrm }: Props) {
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const currentActionRef = useRef<THREE.AnimationAction | null>(null)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loadingRef = useRef(false)
  const prevStateRef = useRef<AvatarState | null>(null)
  const mountedRef = useRef(false)
  const { currentState, setLoaded, openChat, setState } = useAvatarState()

  // --- Roaming state ---
  const moveGroupRef = useRef<THREE.Group>(null)
  const waypointsRef = useRef<THREE.Vector3[]>([])
  const targetIndexRef = useRef(0)
  const movementPhaseRef = useRef<'idle' | 'walking'>('idle')
  const dwellUntilRef = useRef(0)

  const scheduleIdleVariation = useCallback(() => {
    if (!mountedRef.current) return
    const delay = 8000 + Math.random() * 4000
    idleTimerRef.current = setTimeout(async () => {
      if (!mixerRef.current || !vrm || !mountedRef.current) return
      // Don't interrupt with an idle variant while she's mid-walk
      if (movementPhaseRef.current === 'walking') {
        scheduleIdleVariation()
        return
      }
      const variant =
        IDLE_VARIANTS[Math.floor(Math.random() * IDLE_VARIANTS.length)]
      try {
        const clip = await loadMixamoAnimation(`/animations/${variant}`, vrm)
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
      newAction.loop = config.loop ? THREE.LoopRepeat : THREE.LoopOnce
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
      console.warn(`❌ Anim failed: ${url}`, err)
      loadingRef.current = false
      if (state !== 'idle' && mountedRef.current) {
        prevStateRef.current = null
        playAnimation('idle')
      }
    }
  }, [vrm, scheduleIdleVariation])

  const { camera } = useThree()

  useEffect(() => {
    if (!vrm) return

    mountedRef.current = true

    // ✅ Reset to origin — rotateVRM0 already positioned correctly
    vrm.scene.position.set(0, 0, 0)

    mixerRef.current = new THREE.AnimationMixer(vrm.scene)

    // Auto-frame based on REAL bounding box — no hardcoded scale guesses.
    // Wait one tick so bones/skeleton are posed before measuring.
    setTimeout(() => {
      const box = new THREE.Box3().setFromObject(vrm.scene)
      const size = new THREE.Vector3()
      box.getSize(size)

      const feetY = box.min.y

      console.log('=== REAL BOUNDING BOX ===')
      console.log('Feet Y:', feetY.toFixed(3))
      console.log('Height:', size.y.toFixed(3))

      // Sit model so feet are at y=0
      vrm.scene.position.y = -feetY

      // Frame FULL BODY (feet to head), not just chest-up — she now
      // roams across the whole page so we need the whole page-height frame.
      const frameTargetY = size.y * 0.5
      const distance = size.y * 2.2

      camera.position.set(0, frameTargetY, distance)
      camera.lookAt(0, frameTargetY, 0)
      camera.updateProjectionMatrix()
    }, 100)

    setLoaded(true)

    const t = setTimeout(() => {
      if (!mountedRef.current) return
      playAnimation('idle')
      setTimeout(() => {
        if (mountedRef.current) scheduleIdleVariation()
      }, 1000)
    }, 200)

    return () => {
      mountedRef.current = false
      clearTimeout(t)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      mixerRef.current?.stopAllAction()
      mixerRef.current = null
      loadingRef.current = false
      prevStateRef.current = null
      // ✅ NO deepDispose — Strict Mode protection
    }
  }, [vrm, setLoaded, playAnimation, scheduleIdleVariation])

  useEffect(() => {
    if (!mountedRef.current) return
    if (prevStateRef.current === currentState) return
    // Don't let scroll-triggered gestures interrupt an in-progress walk —
    // they'll resume automatically once she arrives at the next waypoint.
    if (movementPhaseRef.current === 'walking') return
    prevStateRef.current = currentState
    loadingRef.current = false
    playAnimation(currentState)
  }, [currentState, playAnimation])

  const handleClick = useCallback(() => {
    setState('waving')
    openChat()
  }, [setState, openChat])

  useFrame((state, delta) => {
    if (!mountedRef.current) return
    mixerRef.current?.update(delta)
    vrm?.update(delta)

    const group = moveGroupRef.current
    if (!group) return

    // Generate waypoints once, sized to the actual visible page area.
    if (waypointsRef.current.length === 0) {
      const { viewport } = state
      const marginX = viewport.width * EDGE_MARGIN_RATIO
      const marginZ = 0.6
      const halfW = viewport.width / 2 - marginX
      const points: THREE.Vector3[] = []
      for (let i = 0; i < 5; i++) {
        points.push(new THREE.Vector3(
          (Math.random() * 2 - 1) * halfW,
          0,
          (Math.random() * 2 - 1) * marginZ
        ))
      }
      waypointsRef.current = points
    }

    const elapsed = state.clock.elapsedTime

    if (elapsed < dwellUntilRef.current) {
      // Paused at a waypoint — let scroll-driven gestures / idle play normally
      if (movementPhaseRef.current !== 'idle') {
        movementPhaseRef.current = 'idle'
        prevStateRef.current = null // force resume of current scroll-state gesture
        playAnimation(currentState)
      }
      return
    }

    const target = waypointsRef.current[targetIndexRef.current]
    const current = group.position
    const direction = new THREE.Vector3().subVectors(target, current)
    const distance = direction.length()

    if (distance < ARRIVE_THRESHOLD) {
      // Arrived — pause, then queue the next random waypoint
      dwellUntilRef.current = elapsed + MIN_DWELL + Math.random() * (MAX_DWELL - MIN_DWELL)
      targetIndexRef.current = (targetIndexRef.current + 1) % waypointsRef.current.length
      return
    }

    if (movementPhaseRef.current !== 'walking') {
      movementPhaseRef.current = 'walking'
      prevStateRef.current = 'walking'
      playAnimation('walking')
    }

    direction.normalize()
    current.addScaledVector(direction, WALK_SPEED * delta)
    group.rotation.y = Math.atan2(direction.x, direction.z)
  })

  return (
    <group ref={moveGroupRef}>
      <primitive object={vrm.scene} />
      {/* Follows her world position automatically, wherever she walks */}
      <Html
        position={[0, 1, 0.1]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'auto' }}
        zIndexRange={[60, 0]}
      >
        <div
          onClick={handleClick}
          style={{
            width: 90,
            height: 160,
            cursor: 'pointer',
          }}
        />
      </Html>
    </group>
  )
}