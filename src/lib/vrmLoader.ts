import * as THREE from 'three'
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

        // Log meta version so we know what we're dealing with
        const metaVersion = (vrm.meta as any)?.metaVersion
        console.log('VRM meta version:', metaVersion)
        console.log('VRM scene rotation before:', vrm.scene.rotation.y)

        // rotateVRM0 only fires if metaVersion === "0"
        VRMUtils.rotateVRM0(vrm)

        console.log('VRM scene rotation after rotateVRM0:', vrm.scene.rotation.y)

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