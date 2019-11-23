import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes'
import storage from '@src/lib/storage';

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    const loginReg = /login|forgetPwd|addLoginModule/ //addLoginModule用来扩展登录页面的模块。
    const loginModule = loginReg.test(to.path)
    if (loginModule) {
        sessionStorage.clear()
    }
    let user = storage.get("user", "save")
    if ((!user && !loginModule) || to.fullPath == "/") {
        next("/login/loginMain")
            //next()
    } else {
        if (user && to.path != "/modifyPwd" && user.resetFlag == '1') {
            //next()
            next("/modifyPwd")
        } else {
            next()
        }
    }
    let bd = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    bd.animate({ scrollTop: 0 }, 200);
})


export default router;