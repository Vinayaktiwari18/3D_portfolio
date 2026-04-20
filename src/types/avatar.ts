import type { VRM } from '@pixiv/three-vrm'
import type { AnimationMixer } from 'three'
import type { AvatarState } from '@/lib/animationStates'

export interface AvatarContext {
  vrm: VRM | null
  mixer: AnimationMixer | null
  currentState: AvatarState
  isLoaded: boolean
  isVisible: boolean
}

export interface AvatarPosition {
  x: number
  y: number
  // which side of screen
  side: 'left' | 'right'
}

export interface AnimationTransition {
  from: AvatarState
  to: AvatarState
  duration: number
}