import * as THREE from 'three'
import { FBXLoader } from 'three-stdlib'
import type { VRM } from '@pixiv/three-vrm'
import { VRMHumanBoneName } from '@pixiv/three-vrm'

const loader = new FBXLoader()
const cache = new Map<string, THREE.AnimationClip>()

const FBX_BONE_TO_VRM: Record<string, VRMHumanBoneName> = {
  'J_Bip_C_Hips':       VRMHumanBoneName.Hips,
  'J_Bip_C_Spine':      VRMHumanBoneName.Spine,
  'J_Bip_C_Chest':      VRMHumanBoneName.Chest,
  'J_Bip_C_UpperChest': VRMHumanBoneName.UpperChest,
  'J_Bip_C_Neck':       VRMHumanBoneName.Neck,
  'J_Bip_C_Head':       VRMHumanBoneName.Head,
  'J_Bip_L_Shoulder':   VRMHumanBoneName.LeftShoulder,
  'J_Bip_L_UpperArm':   VRMHumanBoneName.LeftUpperArm,
  'J_Bip_L_LowerArm':   VRMHumanBoneName.LeftLowerArm,
  'J_Bip_L_Hand':       VRMHumanBoneName.LeftHand,
  'J_Bip_R_Shoulder':   VRMHumanBoneName.RightShoulder,
  'J_Bip_R_UpperArm':   VRMHumanBoneName.RightUpperArm,
  'J_Bip_R_LowerArm':   VRMHumanBoneName.RightLowerArm,
  'J_Bip_R_Hand':       VRMHumanBoneName.RightHand,
  'J_Bip_L_UpperLeg':   VRMHumanBoneName.LeftUpperLeg,
  'J_Bip_L_LowerLeg':   VRMHumanBoneName.LeftLowerLeg,
  'J_Bip_L_Foot':       VRMHumanBoneName.LeftFoot,
  'J_Bip_L_ToeBase':    VRMHumanBoneName.LeftToes,
  'J_Bip_R_UpperLeg':   VRMHumanBoneName.RightUpperLeg,
  'J_Bip_R_LowerLeg':   VRMHumanBoneName.RightLowerLeg,
  'J_Bip_R_Foot':       VRMHumanBoneName.RightFoot,
  'J_Bip_R_ToeBase':    VRMHumanBoneName.RightToes,
  'J_Bip_L_Thumb1':     VRMHumanBoneName.LeftThumbMetacarpal,
  'J_Bip_L_Thumb2':     VRMHumanBoneName.LeftThumbProximal,
  'J_Bip_L_Index1':     VRMHumanBoneName.LeftIndexProximal,
  'J_Bip_L_Index2':     VRMHumanBoneName.LeftIndexIntermediate,
  'J_Bip_L_Middle1':    VRMHumanBoneName.LeftMiddleProximal,
  'J_Bip_L_Middle2':    VRMHumanBoneName.LeftMiddleIntermediate,
  'J_Bip_L_Ring1':      VRMHumanBoneName.LeftRingProximal,
  'J_Bip_L_Ring2':      VRMHumanBoneName.LeftRingIntermediate,
  'J_Bip_L_Little1':    VRMHumanBoneName.LeftLittleProximal,
  'J_Bip_L_Little2':    VRMHumanBoneName.LeftLittleIntermediate,
  'J_Bip_R_Thumb1':     VRMHumanBoneName.RightThumbMetacarpal,
  'J_Bip_R_Thumb2':     VRMHumanBoneName.RightThumbProximal,
  'J_Bip_R_Index1':     VRMHumanBoneName.RightIndexProximal,
  'J_Bip_R_Index2':     VRMHumanBoneName.RightIndexIntermediate,
  'J_Bip_R_Middle1':    VRMHumanBoneName.RightMiddleProximal,
  'J_Bip_R_Middle2':    VRMHumanBoneName.RightMiddleIntermediate,
  'J_Bip_R_Ring1':      VRMHumanBoneName.RightRingProximal,
  'J_Bip_R_Ring2':      VRMHumanBoneName.RightRingIntermediate,
  'J_Bip_R_Little1':    VRMHumanBoneName.RightLittleProximal,
  'J_Bip_R_Little2':    VRMHumanBoneName.RightLittleIntermediate,
}

function extractBoneName(trackName: string): string {
  let name = trackName
  const dotIdx = name.lastIndexOf('.')
  if (dotIdx !== -1) name = name.slice(0, dotIdx)
  if (name.includes('|')) name = name.split('|').pop() ?? name
  if (name.includes(':')) name = name.split(':').pop() ?? name
  return name
}

function extractProperty(trackName: string): string {
  const dotIdx = trackName.lastIndexOf('.')
  return dotIdx !== -1 ? trackName.slice(dotIdx + 1) : ''
}

export async function loadMixamoAnimation(
  url: string,
  vrm: VRM
): Promise<THREE.AnimationClip> {
  if (cache.has(url)) return cache.get(url)!

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (fbx) => {
        const clip = fbx.animations[0]
        if (!clip) {
          reject(new Error(`No animation in: ${url}`))
          return
        }

        const tracks: THREE.KeyframeTrack[] = []
        let matched = 0

        for (const track of clip.tracks) {
          const boneName = extractBoneName(track.name)
          const prop = extractProperty(track.name)
          const vrmBoneName = FBX_BONE_TO_VRM[boneName]
          if (!vrmBoneName) continue

          // FIX: use the RAW bone node, not the normalized one.
          // These FBX files share the model's own J_Bip_* skeleton and
          // rest pose, so they map directly onto the raw hierarchy.
          // The "normalized" bone space is a synthetic T-pose that only
          // matches when animation was authored against it — using it
          // here introduced a rest-pose mismatch on top of the rotation bug.
          const node = vrm.humanoid.getRawBoneNode(vrmBoneName)
          if (!node) continue

          matched++

          if (prop === 'quaternion') {
            // FIX: no manual 180Y re-application here. VRMUtils.rotateVRM0()
            // already reorients the whole model once, at the scene root.
            // Local bone rotations are relative to their parent and are
            // completely unaffected by that scene-level flip, so re-applying
            // it per-bone was double-correcting and twisting every joint.
            // Copy the track values through unchanged.
            tracks.push(new THREE.QuaternionKeyframeTrack(
              `${node.name}.quaternion`,
              track.times,
              track.values
            ))

          } else if (prop === 'position' && boneName === 'J_Bip_C_Hips') {
            const values = new Float32Array(track.values.length)

            // Keep the unit-scale detection (cm -> m), that part was fine.
            const sampleY = Math.abs(track.values[1])
            const SCALE = sampleY > 5 ? 0.01 : 1.0

            for (let i = 0; i < track.values.length; i += 3) {
              values[i]     = track.values[i]     * SCALE
              values[i + 1] = track.values[i + 1] * SCALE
              values[i + 2] = track.values[i + 2] * SCALE
            }

            tracks.push(new THREE.VectorKeyframeTrack(
              `${node.name}.position`,
              track.times,
              values
            ))
          }
        }

        console.log(`✅ ${matched} tracks -> ${url.split('/').pop()}`)

        const retargeted = new THREE.AnimationClip(
          clip.name, clip.duration, tracks
        )
        cache.set(url, retargeted)
        resolve(retargeted)
      },
      undefined,
      reject
    )
  })
}

export function clearAnimationCache() {
  cache.clear()
}