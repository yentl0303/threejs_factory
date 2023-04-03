import { createApp } from 'vue'
import App from './App.vue'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
NProgress.configure({     
    easing: 'ease',  // 动画方式    
    speed: 500,  // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.6, // 初始化时的最小百分比
})  
createApp(App).mount('#app')
