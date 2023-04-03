// 渲染器渲染场景
import * as THREE from 'three'
// 导入(初始化)场景
import scene from '@/threeModal/scene'
// 导入相机配置
import CameraModule from '@/threeModal/camera'
// 导入渲染器
import rendererModule from '@/threeModal/renderer'
// 导入控制器
import ControlsModule from '@/threeModal/controls'
// 渲染声明
const clock = new THREE.Clock()
export default function animate () {
  const dateTime = clock.getDelta()
  // 控制器不起效果的原因是控制轨道每一帧都要更新
  // console.log(ControlsModule);
  ControlsModule.controls.update(dateTime)
  rendererModule.renderer.render(scene, CameraModule.activeCamera)
  rendererModule.css3dRender.render(scene, CameraModule.activeCamera)
  requestAnimationFrame(animate)
}