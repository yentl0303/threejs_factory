import * as THREE from 'three'
import camera from '../camera'
export default class ALarm {
  constructor (name = '治安', position = {x: 0, z: 0}) {
    const typeName = {
      火警: "./texture/alarm/fire.png",
      治安: "./texture/alarm/jingcha.png",
      电力: "./texture/alarm/e.png",
    }
    const textureLoad = new THREE.TextureLoader()
    const texture =  textureLoad.load(typeName[name])
    this.material = new THREE.SpriteMaterial({ map: texture })

    this.mesh = new THREE.Sprite(this.material)

    this.mesh.position.set(position.x, 1, position.z)
    this.mesh.scale.set(0.3, 0.3, 0.3)

    // 封装点击事件
    this.fns = []

    // 只有射线射到警告这里，点击事件才能执行, 设置物体碰撞
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    // 事件监听
    window.addEventListener('click', event => {
      // -1到1
      this.mouse.x = (event.clientX / window.innerWidth) * 2 -1
      this.mouse.y = - ((event.clientY / window.innerHeight) * 2 -1)

      // 设置相机
      this.raycaster.setFromCamera(this.mouse, camera)
      event.mesh = this.mesh
      // 射线有没有碰撞到警告图标
      const intersects = this.raycaster.intersectObject(this.mesh)
      if (intersects.length > 0) {
        this.fns.forEach(item => {
          item(event);
        })
      }
    })
  }
  onClick(fn) {
    this.fns.push(fn)
  }
  onRemove() {
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.material.dispose()
    this.mesh.geometry.dispose()
  }
}
