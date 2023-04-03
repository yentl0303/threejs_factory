import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import scene from '@/threeModal/scene'
import eventBus from '@/utils/eventBus'
import gsap from 'gsap'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import CameraModule from '@/threeModal/camera'
import flyFragmentShader from '@/shader/fly/flyFragmentShader.glsl'
import flyVertexShader from '@/shader/fly/flyVertexShader.glsl'
import Nprogress from 'nprogress'
export default class CreateCity {
  constructor() {
    let daoLoader = new DRACOLoader()
    let loader = new GLTFLoader()
    daoLoader.setDecoderPath('/glb/')
    daoLoader.setDecoderConfig({ type: 'js' })
    daoLoader.preload()
    loader.setDRACOLoader(daoLoader)
    // 储存模型
    this.modelArray = []
    this.firstFloor // 一楼
    this.secondFloor // 二楼
    this.default // 大楼
    this.flyModel // 飞机
    const objArrName = [
      '科技展台',
      '员工办公室',
      '接待室',
      '会议室',
      '设计总监办公室',
      '总经理办公室'
    ]
    this.obj3dArray = []
    loader.load('/glb/工厂一楼.glb', gltf => {
      this.firstFloor = gltf.scene
      this.firstFloor.traverse(mesh => {
        if (mesh.isMesh) {
          mesh.material.emissiveIntensity = 15
        }
      })
      // this.firstFloorNone()
      this.firstFloorTrue()
      this.modelArray.push({ name: 'firstFloor', mesh: this.firstFloor })
      scene.add(this.firstFloor)
    })
    loader.load('/glb/工厂二楼.glb', gltf => {
      this.secondFloor = gltf.scene
      this.secondFloor.traverse(mesh => {
        if (mesh.isMesh) {
          mesh.material.emissiveIntensity = 15
        }
        if (objArrName.indexOf(mesh.name) !== -1) {
          const objMesh = this.cerateTag(mesh)
          this.secondFloor.add(objMesh)
          this.obj3dArray.push(objMesh)
        }
      })

      this.secondFloor.position.setY(30)
      this.secondFloorTrue()
      this.modelArray.push({ name: 'secondFloor', mesh: this.secondFloor })
      scene.add(this.secondFloor)
      this.obj3dArray.forEach(tag => (tag.visible = false))
      // 加载飞机模型
      loader.load('/glb/fly.glb', gltf => {
        this.flyModel = gltf.scene.children[0]
        this.flyModel.scale.set(0.2, 0.2, 0.2)
        this.flyModel.position.set(18, 35, 43)
        this.flyModel.traverse(mesh => {
          mesh.position2 = mesh.position.clone()
        })
        scene.add(this.flyModel)
        this.clickFly()
      })
      Nprogress.done()
    })
    // 加载大楼模型
    loader.load('/glb/工厂大楼.glb', gltf => {
      this.default = gltf.scene
      // this.defaultNone()
      this.defaultTrue()
      this.modelArray.push({ name: 'default', mesh: this.default })
      scene.add(this.default)
    })



    this.init()
  }
  // 点击飞机后分解  使用射线碰撞
  clickFly() {
    const raycaster = new THREE.Raycaster()
    // 鼠标二维对象
    const mouse = new THREE.Vector2()

    // 监听点击飞机物体
    window.addEventListener('click', e => {
      const event = e
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)
      raycaster.setFromCamera(mouse, CameraModule.activeCamera)
      console.log(this.flyModel)
      let result = raycaster.intersectObject(this.flyModel)
      console.log(result);
      if (result.length > 0) {
        this.allNone()
      }
    })
  }
  // 创建标签
  cerateTag(mesh) {
    const tag = document.createElement('div')
    tag.className = 'tagDiv'
    tag.innerHTML = `
    <div class='objContent'>
      <h4>${mesh.name}</h4>
      <p>湿度：86%</p>
      <p>温度：23℃</p>
    </div> 
    `
    const object3d = new CSS3DObject(tag)
    object3d.position.copy(mesh.position)
    object3d.scale.set(0.2, 0.2, 0.2)
    return object3d
  }
  flyNone() {
    this.flyModel.visible = false
  }
  flyTrue() {
    this.flyModel.visible = true
  }
  // 一楼隐藏
  firstFloorNone() {
    this.firstFloor.visible = false
  }
  // 二楼隐藏
  secondFloorNone() {
    // this.flyNone()
    this.secondFloor.visible = false
    this.obj3dArray.forEach(tag => (tag.visible = false))
  }
  // 大楼隐藏
  defaultNone() {
    this.default.visible = false
  }
  // 一楼显示
  firstFloorTrue() {
    this.firstFloor.visible = true
  }
  // 二楼显示
  secondFloorTrue() {
    // this.flyTrue()
    this.secondFloor.visible = true
    this.obj3dArray.forEach(tag => (tag.visible = true))
  }
  // 大楼显示
  defaultTrue() {
    this.default.visible = true
  }
  // 全部显示
  allTrue() {
    // 一楼显示
    this.firstFloorTrue()
    // 二楼显示
    this.secondFloorTrue()
    // 大楼显示
    this.defaultTrue()
  }
  // 全部隐藏
  allNone() {
    // 一楼隐藏
    this.firstFloorNone()
    // 二楼隐藏
    this.secondFloorNone()
    // 大楼隐藏
    this.defaultNone()
  }
  // 初始化
  initFloor() {
    this.secondFloor.position.setY(30)
    this.flyModel.position.setY(35)
    this.firstFloor.position.setY(0)
    this.default.position.setY(0)
  }
  init() {
    eventBus.on('showDefault', () => {
      this.initFloor()
      this.allNone()
      this.flyNone()
      this.defaultTrue()
    })
    eventBus.on('showFirstFloor', () => {
      this.initFloor()
      this.allNone()
      this.flyNone()
      this.firstFloor.position.setY(0)
      this.firstFloorTrue()
    })
    eventBus.on('showSecondFloor', () => {
      this.initFloor()
      this.allNone()
      this.flyNone()
      this.secondFloor.position.setY(30)
      this.flyModel.position.setY(35)
      this.secondFloorTrue()
      this.flyTrue()
    })
    eventBus.on('snFloorTrue', () => {
      this.allTrue()
      this.flyTrue()
      gsap.to(this.default.position, {
        y: 140,
        duration: 1
      })
      gsap.to(this.flyModel.position, {
        y: 75,
        duration: 1,
        delay: 1
      })
      gsap.to(this.secondFloor.position, {
        y: 70,
        duration: 1,
        delay: 1
      })
    })
    eventBus.on('snFloorNone', () => {
      gsap.to(this.default.position, {
        y: 0,
        duration: 1,
        delay: 1,
        onComplete: () => {
          this.flyNone()
          this.secondFloorNone()
        }
      })
      gsap.to(this.flyModel.position, {
        y: 35,
        duration: 1
      })
      gsap.to(this.secondFloor.position, {
        y: 30,
        duration: 1
      })
    })
    let positionCube = []
    eventBus.on('toggleFly', () => {
      // 
      // 获取立方体点的位置
      if (positionCube.length > 0) return
      this.allNone()
      this.flyTrue()
      this.flyModel.position.setY(35)
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          positionCube.push(new THREE.Vector3(i * 2 - 2, j * 2 - 2, 0))
        }
      }
      let n = 0
      // 循环飞机子元素赋予位置
      console.log(this.flyModel)
      this.flyModel.traverse(mesh => {
        positionCube[n].multiplyScalar(10)
        gsap.to(mesh.position, {
          x: '+=' + positionCube[n].x,
          y: '+=' + positionCube[n].y,
          z: '+=' + positionCube[n].z,
          duration: 1
        })
        n++
      })


    })

    eventBus.on('recoverFly', () => {
      positionCube = []
      this.flyModel.traverse(mesh => {
        gsap.to(mesh.position, {
          x: mesh.position2.x,
          y: mesh.position2.y,
          z: mesh.position2.z,
          duration: 1
        })
      })
    })

    eventBus.on('flyPoint', () => {
      this.ceratePoint(this.flyModel)
    })

    eventBus.on('flyBoob', () => {
      this.boob()
    })

    eventBus.on('pointRecver', () => {
      this.back()
    })
  }
  back() {
    if (this.flyPontGroup) {
      this.flyPontGroup.traverse(child => {
        if (child.isPoints) {
          gsap.to(child.material.uniforms.uTime, {
            value: 0,
            duration: 3
          })
        }
      })
    }
  }
  boob() {
    if (this.flyPontGroup) {
      this.flyPontGroup.traverse(child => {
        if (child.isPoints) {
          let positionArray = new Float32Array(child.geometry.attributes.position.count * 3)
          for (let index = 0; index < child.geometry.attributes.position.count; index++) {
            positionArray[index * 3 + 0] = (Math.random() * 2 - 1) * 10
            positionArray[index * 3 + 1] = (Math.random() * 2 - 1) * 10
            positionArray[index * 3 + 2] = (Math.random() * 2 - 1) * 10

          }
          child.geometry.setAttribute('aPosition', new THREE.BufferAttribute(positionArray, 3))
          gsap.to(child.material.uniforms.uTime, {
            value: 10,
            duration: 3
          })
        }
      })
    }

  }
  ceratePoint(flyMesh) {
    if (!this.flyPontGroup) {
      this.flyPontGroup = this.transforms(flyMesh)
      scene.add(this.flyPontGroup)
    } else {
      scene.remove(this.flyPontGroup)
      this.flyPontGroup = null
      // scene.flyPontGroup.remove()
    }
  }

  transforms(flyMesh) {
    const loaders = new THREE.TextureLoader()
    const texture = loaders.load('./particles/3.png')
    const group = new THREE.Group()

    function initPoints(flyMesh, newFlyMesh) {
      if (flyMesh.children.length > 0) {
        flyMesh.children.forEach(child => {
          // if(child.isMesh) {
          console.log(child)
          const color = new THREE.Color(Math.random(), Math.random(), Math.random())

          const material = new THREE.ShaderMaterial({
            uniforms: {
              uColor: { value: color },
              uTexture: { value: texture },
              uTime: {
                value: 0
              }
            },
            vertexShader: flyVertexShader,
            fragmentShader: flyFragmentShader,
            depthWrite: true,
            transparent: true,
            depthTest: false
          })
          const point = new THREE.Points(child.geometry, material)
          point.position.copy(child.position)
          // point.rotation.copy(child.rotation)
          // point.scale.copy(child.scale)
          newFlyMesh.add(point)
          initPoints(child, point)
          // }
        })
      }

    }
    initPoints(flyMesh, group)
    return group
  }
}
