import * as THREE from 'three'
import vertex from '@/shader/lineWall/vertexShader.glsl'
import fragment from '@/shader/lineWall/fragmentShader.glsl'
import gsap from 'gsap'
export default class LineWall{
  constructor(radius = 2, scale = 2, position = {x: 0, z: 0}, color = 0xCC0033) {
    // 创建圆柱几何体
    this.geometry = new THREE.CylinderGeometry(radius, radius, 1, 32, 1, true)
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(position.x, 0.5, position.z)
    // 计算模型的边距
    this.mesh.geometry.computeBoundingBox()
    let {max, min} = this.mesh.geometry.boundingBox
    const uHeight = max.y - min.y
    this.material.uniforms.uHeight = {
      value: uHeight
    }
    this.material.uniforms.uColor = {
      value: new THREE.Color(color)
    }
    gsap.to(this.mesh.scale, {
      x: scale,
      z: scale,
      duration: 2,
      ease: 'none',
      repeat: -1,
      yoyo: true
    })
  }
  onRemove() {
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.material.dispose()
    this.mesh.geometry.dispose()
  }
}