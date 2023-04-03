import * as THREE from 'three'
import gsap from 'gsap'
// 飞线就是曲线
export default class FlyLine {
  constructor() {
    let linePoints = [
      new THREE.Vector3(0.2, 1, 0),
      new THREE.Vector3(-1, 2, 0),
      new THREE.Vector3(-4, 0, 0),
    ]
    // 创建平滑的三维曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints)
    // 根据曲线生成管道几何
    this.geomentry = new THREE.TubeGeometry(this.lineCurve, 30, 0.2, 2, false)
    // 创建飞线材质
    const lineLoad = new THREE.TextureLoader()
    this.lineTexture = lineLoad.load('./texture/z1.png')
    this.lineTexture.repeat.set(1, 2)
    // 重复
    // x轴重复
    this.lineTexture.wrapS = THREE.RepeatWrapping
    // 镜像重复
    this.lineTexture.wrapT = THREE.MirroredRepeatWrapping
    this.material = new THREE.MeshBasicMaterial(
      {
        map: this.lineTexture,
        transparent: true
      }
      )

    // 创建飞线物体
    this.mesh = new THREE.Mesh(this.geomentry, this.material)

    gsap.to(this.lineTexture.offset, {
      x: -1,
      repeat: -1,
      duration: 2,
      ease: 'none'
    })
  }
}