import * as THREE from 'three'
import vertex from '@/shader/flyLine/vertexShader.glsl'
import fragment from '@/shader/flyLine/fragmentShader.glsl'
import gsap from 'gsap'
export default class FlyLineShader {
  constructor(position = {x: 0, z: 0}, color = 0xFFFFFF) {
    // 根据点生成曲线
    let linePoints = [
      new THREE.Vector3(0.2, 1, 0),
      new THREE.Vector3(position.x / 2, 1.5, position.z / 2),
      new THREE.Vector3(position.x, 0, position.z)
    ]
    // 创建三维平滑曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints)
    // 获取点
    const points = this.lineCurve.getPoints(1000)
    // 根据点创建几何
    this.geometry = new THREE.BufferGeometry().setFromPoints(points)


    // 给每个顶点设置属性
    const aSizeArray = new Float32Array(points.length)
    for (let i = 0; i < aSizeArray.length; i++) {
      aSizeArray[i] = i
    }
    // 设置几何体顶点属性
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(aSizeArray, 1))

    // 设置着色器材质
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0
        },
        uColor: {
          value: new THREE.Color(color)
        },
        uLenght: {
          value: points.length
        }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    this.mesh = new THREE.Points(this.geometry, this.shaderMaterial)

    gsap.to(this.shaderMaterial.uniforms.uTime, {
      value: 1000,
      duration: 1,
      ease: 'none',
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