import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin, VRMUtils, VRM } from '@pixiv/three-vrm'

const gltfLoader = new GLTFLoader()
gltfLoader.register((parser) => new VRMLoaderPlugin(parser))

export async function loadVRM(url: string): Promise<VRM> {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      url,
      (gltf) => {
        const vrm = gltf.userData.vrm as VRM
        if (!vrm) {
          reject(new Error('VRM not found'))
          return
        }
        VRMUtils.removeUnnecessaryVertices(gltf.scene)
        VRMUtils.combineSkeletons(gltf.scene)
        // ✅ PUT BACK — VRM0 needs this to stand upright
        VRMUtils.rotateVRM0(vrm)
        console.log('✅ VRM loaded')
        resolve(vrm)
      },
      (progress) => {
        const pct = Math.round(
          (progress.loaded / (progress.total || 1)) * 100
        )
        console.log(`VRM loading: ${pct}%`)
      },
      (error) => {
        console.error('❌ VRM error:', error)
        reject(error)
      }
    )
  })
}

export function disposeVRM(): void {}