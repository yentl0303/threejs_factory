// 1.导入threejs
import * as THREE from 'three'
import eventBus from '@/utils/eventBus'
// 2.初始化透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
// 4.设置相机位置
// camera.aspect = window.innerWidth / window.innerHeight
// camera.updateProjectionMatrix() // 更新投影矩阵
camera.position.set(0, 100, 350)

class CameraModule {
  constructor() {
    this.activeCamera = camera
    this.collection = {
      default: camera
    }
    eventBus.on('toggleCameraEvent', name => {
      this.setCamera(name)
    })
  }
  addCamera(name, camera) {
    this.collection[name] = camera
  }
  setCamera(name) {
    this.activeCamera = this.collection[name]
  }
}
export default new CameraModule()