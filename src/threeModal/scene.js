// 1.导入threejs
import * as THREE from 'three'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
// 2.初始化场景
const scene = new THREE.Scene()

// 场景天空
const textureLoader = new RGBELoader()
textureLoader.loadAsync('./texture/nocturne.hdr').then(texture => {
  scene.background = texture
  scene.environment = texture
  scene.environment.mapping = THREE.EquirectangularReflectionMapping
  // texture.dispose()
})
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 100, 50)
scene.add(light)
// texture.encoding = THREE.sRGBEncoding
// scene.background = texture
// scene.environment = texture

// 3.导出场景供其他组件使用
export default scene