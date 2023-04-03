import * as THREE from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
// 初始化渲染器
const renderer = new THREE.WebGL1Renderer({
  // 抗锯齿
  antialias: true
})
// 允许在场景中使用阴影贴图
renderer.shadowMap.enabled = true
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure =1.5
// 设置画布大小
renderer.setSize(window.innerWidth, window.innerHeight)


const css3dRender = new CSS3DRenderer()
css3dRender.setSize(window.innerWidth, window.innerHeight)
document.querySelector('#object3d').appendChild(css3dRender.domElement)
export default {renderer, css3dRender}