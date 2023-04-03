import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import CameraModule from '@/threeModal/camera'
import rendererModule from '@/threeModal/renderer'
import eventBus from '@/utils/eventBus'
class ControlsModule {
  constructor () {
    this.setOrbitControls()
    eventBus.on('toggleControls', name => {
      console.log(`set${name}Controls`);
      this[`set${name}Controls`]()
    })
  }
  setOrbitControls() {
    // 1.创建轨道控制器
    this.controls = new OrbitControls(
      CameraModule.activeCamera,
      rendererModule.renderer.domElement
    )

    // 2.设置控制阻尼
    this.controls.enableDamping = true
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minPolarAngle = 0
  }
  setFlyControls() {
    // 1.创建轨道控制器
    this.controls = new FlyControls(
      CameraModule.activeCamera,
      rendererModule.renderer.domElement
    )
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minPolarAngle = 0
  }
  setFirstPersonControls() {
    // 1.创建轨道控制器
    this.controls = new FirstPersonControls(
      CameraModule.activeCamera,
      rendererModule.renderer.domElement
    )
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minPolarAngle = 0
  }
}
export default new ControlsModule()
