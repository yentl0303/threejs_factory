// 导入相机配置
import CameraModule from '@/threeModal/camera'
// 导入渲染器
import rendererModule from '@/threeModal/renderer'
// 设置屏幕大小改变画布自适应
window.addEventListener('resize', () => {
  // 更新摄像头
  CameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight
  // 更新投影矩阵
  CameraModule.activeCamera.updateProjectionMatrix()
  // 更新渲染器
  rendererModule.renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器像素比例
  rendererModule.renderer.setPixelRatio(window.devicePixelRatio)
  // 更新渲染器
  rendererModule.css3dRender.setSize(window.innerWidth, window.innerHeight)
})