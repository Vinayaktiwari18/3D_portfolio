import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
  VRMLoaderPlugin,
  VRMUtils,
  VRM,
} from '@pixiv/three-vrm'

let vrmInstance: VRM | null = null
const gltfLoader = new GLTFLoader()
gltfLoader.register((parser) => new VRMLoaderPlugin(parser))

export async function loadVRM(url: string): Promise<VRM> {
  // Return cached instance
  if (vrmInstance) return vrmInstance

  return new Promise((resolve, reject) => {
    gltfLoader.load(
      url,
      (gltf) => {
        const vrm = gltf.userData.vrm as VRM

        if (!vrm) {
          reject(new Error('VRM not found in file'))
          return
        }

        // Optimize VRM for web performance
        VRMUtils.removeUnnecessaryVertices(gltf.scene)
        VRMUtils.combineSkeletons(gltf.scene)

        // Face camera correctly
        VRMUtils.rotateVRM0(vrm)

        vrmInstance = vrm
        resolve(vrm)
      },
      (progress) => {
        const percent = Math.round(
          (progress.loaded / progress.total) * 100
        )
        console.log(`Loading VRM: ${percent}%`)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export function getVRMInstance(): VRM | null {
  return vrmInstance
}

export function disposeVRM(): void {
  if (vrmInstance) {
    VRMUtils.deepDispose(vrmInstance.scene)
    vrmInstance = null
  }
}