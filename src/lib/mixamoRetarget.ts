import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import type { VRM } from '@pixiv/three-vrm'

// Mixamo bone name → VRM humanoid bone name mapping
const MIXAMO_TO_VRM: Record<string, string> = {
  mixamorigHips:           'hips',
  mixamorigSpine:          'spine',
  mixamorigSpine1:         'chest',
  mixamorigSpine2:         'upperChest',
  mixamorigNeck:           'neck',
  mixamorigHead:           'head',
  mixamorigLeftShoulder:   'leftShoulder',
  mixamorigLeftArm:        'leftUpperArm',
  mixamorigLeftForeArm:    'leftLowerArm',
  mixamorigLeftHand:       'leftHand',
  mixamorigRightShoulder:  'rightShoulder',
  mixamorigRightArm:       'rightUpperArm',
  mixamorigRightForeArm:   'rightLowerArm',
  mixamorigRightHand:      'rightHand',
  mixamorigLeftUpLeg:      'leftUpperLeg',
  mixamorigLeftLeg:        'leftLowerLeg',
  mixamorigLeftFoot:       'leftFoot',
  mixamorigLeftToeBase:    'leftToes',
  mixamorigRightUpLeg:     'rightUpperLeg',
  mixamorigRightLeg:       'rightLowerLeg',
  mixamorigRightFoot:      'rightFoot',
  mixamorigRightToeBase:   'rightToes',
}

const fbxLoader = new FBXLoader()
// Cache loaded clips so we don't reload same file
const clipCache = new Map<string, THREE.AnimationClip>()

export async function loadMixamoAnimation(
  url: string,
  vrm: VRM
): Promise<THREE.AnimationClip> {
  // Return cached if already loaded
  if (clipCache.has(url)) {
    return clipCache.get(url)!
  }

  return new Promise((resolve, reject) => {
    fbxLoader.load(
      url,
      (fbx) => {
        const clip = THREE.AnimationClip.findByName(
          fbx.animations,
          fbx.animations[0]?.name ?? 'mixamo.com'
        ) ?? fbx.animations[0]

        if (!clip) {
          reject(new Error(`No animation found in ${url}`))
          return
        }

        const retargeted = retargetClip(clip, vrm)
        clipCache.set(url, retargeted)
        resolve(retargeted)
      },
      undefined,
      (error) => reject(error)
    )
  })
}

function retargetClip(
  clip: THREE.AnimationClip,
  vrm: VRM
): THREE.AnimationClip {
  const tracks: THREE.KeyframeTrack[] = []
  const humanoid = vrm.humanoid

  clip.tracks.forEach((track) => {
    // track.name format: "mixamorigHips.quaternion"
    const parts = track.name.split('.')
    const mixamoBone = parts[0]
    const property = parts[1]

    const vrmBoneName = MIXAMO_TO_VRM[mixamoBone]
    if (!vrmBoneName) return

    const vrmNode = humanoid.getNormalizedBoneNode(
    vrmBoneName as Parameters<typeof humanoid.getNormalizedBoneNode>[0]
    )
    if (!vrmNode) return

    const newTrackName = `${vrmNode.name}.${property}`

    let newTrack: THREE.KeyframeTrack

    if (track instanceof THREE.QuaternionKeyframeTrack) {
      // Convert Mixamo coordinate system to VRM
      const values = convertQuaternions(
        track.values as Float32Array,
        mixamoBone === 'mixamorigHips'
      )
      newTrack = new THREE.QuaternionKeyframeTrack(
        newTrackName,
        track.times,
        values
      )
    } else if (track instanceof THREE.VectorKeyframeTrack) {
      // Only retarget hips position
      if (mixamoBone !== 'mixamorigHips') return
      const values = convertPositions(
        track.values as Float32Array
      )
      newTrack = new THREE.VectorKeyframeTrack(
        newTrackName,
        track.times,
        values
      )
    } else {
      return
    }

    tracks.push(newTrack)
  })

  return new THREE.AnimationClip(clip.name, clip.duration, tracks)
}

function convertQuaternions(
  values: Float32Array,
  isHips: boolean
): Float32Array {
  const result = new Float32Array(values.length)
  const q = new THREE.Quaternion()
  // Rotation to convert Mixamo → VRM axes
  const correction = new THREE.Quaternion()
    .setFromEuler(new THREE.Euler(0, Math.PI, 0))

  for (let i = 0; i < values.length; i += 4) {
    q.set(values[i], values[i+1], values[i+2], values[i+3])
    if (isHips) q.premultiply(correction)
    result[i]   = q.x
    result[i+1] = q.y
    result[i+2] = q.z
    result[i+3] = q.w
  }
  return result
}

function convertPositions(values: Float32Array): Float32Array {
  const result = new Float32Array(values.length)
  // Scale factor: Mixamo uses cm, VRM uses m
  const scale = 0.01
  for (let i = 0; i < values.length; i += 3) {
    result[i]   =  values[i]   * scale
    result[i+1] =  values[i+1] * scale
    result[i+2] = -values[i+2] * scale
  }
  return result
}