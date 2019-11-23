import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import ElementUI from 'element-ui'
import store from './vuex/store'
import Vuex from 'vuex'
import router from './routes/router'
import tools from './lib/tools'
import PassGuardCtrl from './lib/PassGuardCtrl'
import myPlugin from './components/myPlugin'
import 'element-ui/lib/theme-default/index.css'
// import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './styles/common.scss'
import './styles/reset.scss'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.$tools=tools
Vue.prototype.$ukey=true //true 打开 false 关闭

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

