<template>
  <div>
    <HomeView></HomeView>
  </div>
</template>
<script setup>
import HomeView from '@/views/HomeView'
import Nprogress from 'nprogress'
import {onBeforeMount} from 'vue'
onBeforeMount(() => {
  Nprogress.start()
})
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#nprogress{
  z-index: 666;
}
#nprogress .bar {
background: rgb(240, 244, 242) !important;
height: 0.5rem;
}
#nprogress .peg {
  box-shadow: 0 0 10px rgb(203, 11, 113), 0 0 5px rgb(203, 11, 113) !important;
}
// html {
//   font-size: 16px;
//   color: #ffffff;
//   user-select: none;
// }
#object3d {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  pointer-events: none;
  z-index: 10;
  .tagDiv {
    position: relative;
  }
  .objContent {
    padding: 0.2rem;
    background-color: rgba(148, 67, 214, 0.5);
    // position: absolute;
    font-size: 0.2rem;
    pointer-events: none;
    box-shadow: 0 0 0.3rem 0.01rem rgba(148,67,214, 50%);
    text-shadow: 0 0 0.3rem rgba(42, 64, 160, 0.5);
    p {
      font-size: 0.2rem;
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      right: -3.5rem;
      bottom: 0;
      height: 0.0063rem;
      width: 3.5rem;
      transform-origin: 0 0;
      transform: rotate(30deg) scale(0.3);
      background-color: rgba(148, 67, 214, 0.5);
    }
    &::after {
      content: '';
      display: block;
      width: 0.3125rem;
      height: 0.3125rem;
      position: absolute;
      border-radius: 50%;
      right: -1.15rem;
      bottom: -0.8rem;
      background-color: rgba(148, 67, 214, 0.5);
    }
  }
}
</style>
