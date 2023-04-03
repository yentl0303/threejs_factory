import * as THREE from 'three'
import vertex from '@/shader/lineRader/vertexShader.glsl'
import fragment from '@/shader/lineRader/fragmentShader.glsl'
import gsap from 'gsap'
export default class LineRader {
  constructor(radius = 1 ,position = {x: 0, z: 0}, color = 0x6699CC) {
    // 创建平面几何体
    this.geometry = new THREE.PlaneGeometry(radius, radius)
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0
        },
        uColor: {
          value: new THREE.Color(color)
        }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(position.x, 0.3, position.z)
    // 平面翻转
    this.mesh.rotation.x = - Math.PI / 2
    gsap.to(this.material.uniforms.uTime, {
      value: 1,
      ease: 'none',
      duration: 1,
      repeat: -1
    })
  }
  onRemove() {
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.material.dispose()
    this.mesh.geometry.dispose()
  }
}