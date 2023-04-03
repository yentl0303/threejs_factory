<template>
  <div class="sceneCanvas" ref="sceneDiv">
    <!-- 画布元素追加 -->
  </div>
</template>
<!-- 场景 -->
<script setup>
// 1.导入threejs
// import * as THREE from 'three'
// 2.导入(初始化)场景
import scene from '@/threeModal/scene'
// 3.1导入相机配置
import CameraModule from '@/threeModal/camera'
// 4.导入渲染器
import rendererModule from '@/threeModal/renderer'
// // 导入控制器
// import controls from '@/threeModal/controls'
// 导入创建物体文件
import createMesh from '@/threeModal/createMesh'
// 导入渲染更新
import animate from '@/threeModal/animate'
// 导入初始化监听屏幕大小
import '@/threeModal/init'
// import gsap from 'gsap'
// 5.1导入坐标轴
// import axse from '@/threeModal/axseHelp'
import {onMounted, ref} from 'vue'
// 7.1获取场景div
let sceneDiv = ref(null)

// 3.2.将相机添加进场景
scene.add(CameraModule.activeCamera)

// 5.2 创建坐标轴
// scene.add(axse)

// 6.创建物体
createMesh()

// vue挂载成功之后再去追加dom
onMounted(() => {
  // 7.2将渲染器加入dom
  sceneDiv.value.appendChild(rendererModule.renderer.domElement)
  // 8.2渲染执行
  animate()
})
</script>

<style scoped lang="scss">
// 画布全屏
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
}
</style>
