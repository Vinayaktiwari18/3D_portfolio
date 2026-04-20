// Animation state definitions
// Maps logical states to actual FBX filenames

export type AvatarState =
  | 'idle'
  | 'walking'
  | 'talking'
  | 'waving'
  | 'pointing'
  | 'thinking'
  | 'happy'
  | 'floating'
  | 'running'
  | 'looking'

export interface AnimationConfig {
  file: string
  loop: boolean
  timeScale: number
  // how long before auto-returning to idle (ms)
  // 0 = never auto-return
  duration: number
}

export const ANIMATION_MAP: Record<AvatarState, AnimationConfig> = {
  idle: {
    file: 'idle.fbx',
    loop: true,
    timeScale: 1,
    duration: 0,
  },
  walking: {
    file: 'Female Start Walking.fbx',
    loop: true,
    timeScale: 1,
    duration: 0,
  },
  talking: {
    file: 'Talking.fbx',
    loop: true,
    timeScale: 1,
    duration: 0,
  },
  waving: {
    file: 'Waving.fbx',
    loop: false,
    timeScale: 1,
    duration: 2500,
  },
  pointing: {
    file: 'happy hand gesture.fbx',
    loop: false,
    timeScale: 1,
    duration: 3000,
  },
  thinking: {
    file: 'thoughtful head shake.fbx',
    loop: false,
    timeScale: 1,
    duration: 3000,
  },
  happy: {
    file: 'happy hand gesture.fbx',
    loop: false,
    timeScale: 1,
    duration: 2500,
  },
  floating: {
    file: 'Floating.fbx',
    loop: true,
    timeScale: 0.8,
    duration: 0,
  },
  running: {
    file: 'running.fbx',
    loop: true,
    timeScale: 1,
    duration: 0,
  },
  looking: {
    file: 'Look Around.fbx',
    loop: false,
    timeScale: 1,
    duration: 4000,
  },
}

// Which animations trigger when user
// interacts with different sections
export const SECTION_ANIMATIONS: Record<string, AvatarState> = {
  hero:      'floating',
  projects:  'pointing',
  skills:    'thinking',
  about:     'talking',
  status:    'looking',
  stats:     'happy',
  hire:      'waving',
  contact:   'talking',
  footer:    'waving',
}

// Random idle variations to keep
// character feeling alive
export const IDLE_VARIANTS = [
  'idle.fbx',
  'idle (2).fbx',
  'idle (3).fbx',
  'idle (4).fbx',
  'idle (5).fbx',
  'weight shift.fbx',
  'Look Around.fbx',
]