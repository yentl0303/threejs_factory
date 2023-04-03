<template>
  <div id="bigScreen">
    <div class="header">智慧工厂</div>
    <div class="mian">
      <div class="left">
        <div
          class="cityEvent"
        >

          <h3>
            <span>切换视图模型</span>
          </h3>
          <h1 @click="showDefault()">
            <img src="../assets/bg/bar.svg" class="svg" />
            <span>工厂大楼</span>
          </h1>
          <h1 @click="showFirstFloor()">
            <img src="../assets/bg/bar.svg" class="svg" />
            <span>工厂一楼</span>
          </h1>
           <h1 @click="showSecondFloor()">
            <img src="../assets/bg/bar.svg" class="svg" />
            <span>工厂二楼</span>
          </h1>
          <h1 @click="snFloor()">
            <img src="../assets/bg/bar.svg" class="svg" />
            <span>工厂整体</span>
          </h1>
          <!-- <h1 @click="toggleCamera('default')">
            <span>切换司机视角</span>
          </h1> -->
          <div class="footerBoder"></div>
        </div>
        <!-- <div
          class="cityEvent"
          v-for="(item, key) in props.resInformation"
          :key="key"
        >
          <h3>
            <span>{{ item.name }}</span>
          </h3>
          <h1>
            <img src="../assets/bg/bar.svg" class="svg" />
            <span>{{ toFixInt(item.number) }}&nbsp;({{ item.unit }})</span>
          </h1>
          <div class="footerBoder"></div>
        </div> -->
      </div>
      <div class="right">
        <div class="cityEvent">
          <h3>无人机模型</h3>
          <ul>
            <li
              @click="toggleFly()"
            >
              <h1>
                <div>
                  <img src="../assets/bg/bar.svg" class="svg" />
                  <span>无人机零件展开</span>
                </div>
              </h1>
            </li>
            <li
              @click="recoverFly()"
            >
              <h1>
                <div>
                  <img src="../assets/bg/bar.svg" class="svg" />
                  <span>无人机复原</span>
                </div>
              </h1>
            </li>
            <li
              @click="flyPoint()"
            >
              <h1>
                <div>
                  <img src="../assets/bg/bar.svg" class="svg" />
                  <span>无人机粒子特效</span>
                </div>
              </h1>
            </li>
            <li
              @click="flyBoob()"
            >
              <h1>
                <div>
                  <img src="../assets/bg/bar.svg" class="svg" />
                  <span>无人机粒子爆炸</span>
                </div>
              </h1>
            </li>
            <li
              @click="pointRecver()"
            >
              <h1>
                <div>
                  <img src="../assets/bg/bar.svg" class="svg" />
                  <span>无人机粒子复原</span>
                </div>
              </h1>
            </li>
          </ul>
          <!-- <ul>
            <li
              v-for="(item, key) in props.resCityList"
              :key="key"
              @click="selectMesh(key)"
              :class="{ selectClass: selectIndex === key }"
            >
              <h1>
                <div>
                  <img :src="iconType[item.name]" class="svg" />
                  <span>{{ item.name }}</span>
                </div>
                <span class="time">{{ item.time }}</span>
              </h1>
              <p>{{ item.type }}</p>
            </li>
          </ul> -->
          <div class="footerBoder"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import eventBus from '@/utils/eventBus'

let flag = false
const showDefault = () => {
    flag = false
  eventBus.emit('showDefault')
}
const showFirstFloor = () => {
    flag = false
  eventBus.emit('showFirstFloor')
}
const showSecondFloor = () => {
    flag = false
  eventBus.emit('showSecondFloor')
}
const snFloor = () => {
  flag = !flag
  if(flag) {
    eventBus.emit('snFloorTrue')
  } else {
    eventBus.emit('snFloorNone')
  }
  
}
const toggleFly = () => {
  eventBus.emit('toggleFly')
}
const recoverFly = () => {
  eventBus.emit('recoverFly')
}
const flyPoint = () => {
  eventBus.emit('flyPoint')
}
const flyBoob = () => {
  eventBus.emit('flyBoob')
}
const pointRecver = () => {
  eventBus.emit('pointRecver')
}
</script>
<style lang="scss" scoped>
#bigScreen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 3;
  .header {
    width: 100vw;
    height: 6.25rem;
    background-image: url(@/assets/bg/title.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    // line-height: 6.25rem;
    align-items: center;
  }
  .mian {
    flex: 1;
    display: flex;
    justify-content: space-between;
    // pointer-events: none;
  }
  .left {
    display: flex;
    flex-direction: column;
    width: 18.75rem;
    // background-image: url(@/assets/bg/line_img.png);
    // background-size: contain;
    // background-position: right center;
    // background-repeat: no-repeat;
    padding: 1.25rem 1.25rem;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }
  .cityEvent {
    position: relative;
    // background-color: aquamarine;
    margin-bottom: 1.25rem;
    background-image: url(@/assets/bg/bg_img03.png);
    background-repeat: repeat;
    display: flex;
    flex-direction: column;
    flex: 1;
    // pointer-events: none;
    h1 {
      padding: 1.35rem;
      // flex: 1;
      display: flex;
      justify-content: space-between;
      font-size: 1.5625rem;
      align-items: center;
      pointer-events: auto;
    }
    h3 {
      padding: 1.35rem;
      // flex: 1;
      display: flex;
      align-items: center;
    }
  }

  .cityEvent::before {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    left: 0;
    top: 0;
    border-top: 0.25rem solid rgb(130, 18, 171);
    border-left: 0.25rem solid rgb(130, 18, 171);
    content: '';
    display: block;
  }
  .cityEvent::after {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    right: 0;
    top: 0;
    border-top: 0.25rem solid rgb(130, 18, 171);
    border-right: 0.25rem solid rgb(130, 18, 171);
    content: '';
    display: block;
  }
  .footerBoder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .footerBoder::before {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    left: 0;
    bottom: 0;
    border-bottom: 0.25rem solid rgb(130, 18, 171);
    border-left: 0.25rem solid rgb(130, 18, 171);
    content: '';
    display: block;
  }
  .footerBoder::after {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    right: 0;
    bottom: 0;
    border-bottom: 0.25rem solid rgb(130, 18, 171);
    border-right: 0.25rem solid rgb(130, 18, 171);
    content: '';
    display: block;
  }
  .svg {
    width: 2.8125rem;
    height: 2.8125rem;
    margin-left: .3125rem;
  }
  .right {
    // display: flex;
    // flex-direction: column;
    width: 18.75rem;
    // background-image: url(@/assets/bg/line_img.png);
    // background-size: contain;
    // background-position: left center;
    // background-repeat: no-repeat;
    padding: 1.25rem 1.25rem;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    // .cityEvent{
    //   flex: 0;
    // }
    // h3{
    //   flex: 0;
    // }
    ul > li {
      list-style: none;
      padding: 1.35rem;
      pointer-events: auto;
      // margin-bottom: 1.25rem;
    }
    ul > li > h1 {
      padding: 0;
    }
  }
  ul > li div {
    display: flex;
    justify-content: space-between;
    align-self: center;
    // vertical-align: top;
  }
  ul > li p {
    margin-left: 0.5rem;
  }

  .time {
    font-size: 1rem;
    font-weight: normal;
  }
}
.selectClass > h1 , .selectClass > p {
        color: rgb(153, 255, 204);
      }
</style>
