import axios from 'axios';
import storage from './storage'
let qs = require('qs');
let headers = { // 自定义发送，和params一起
    headers: {
        'versionNo': '1.0',
        'systemID': 'CCB',
        'srcSystemID': 'CCB',
        'transFlow': '09876543210987654321098765432109',
        'transGlobalFlow': '12345678901234567890123',
        'cstMac': '' //客户端MAC地址
    }
}
let requestDemo = false // 设置请求本地报文
let jqXhrRegistry = [] // 记录发送请求的个数
let requestTimmer = undefined // 最后一次发送请求倒计时
let logoutTimmer = undefined // 无操作倒计时
let countdown = 5
let requestCallBackDone = (vm, resultData, url) => { // 请求回调做一些公共的事情
    //console.log("调用公共方法" + "errorCode" + JSON.stringify(resultData.data.body.errorCode) + "url   " + url)
    if (!vm.closeLoading) {
        jqXhrRegistry.splice(0, 1)
        if (!jqXhrRegistry.length) {
            vm.$loading().close()
            if (resultData.data && resultData.data.body && (resultData.data.body.errorCode == 'MB00000001' || resultData.data.body.errorCode == 'MB00000002') && (url != 'CB000108.do')) {
                if(url == 'CB000107.do'||url == 'CB100003.do'){

                }else{
                    vm.$alert("用户已在别处登录，请重新登录再进行操作", "温馨提示", {
                        confirmButtonText: "确定",
                        customClass: "requestTimmer",
                        callback: action => {
                            vm.$router.push('/login/loginMain')
                        }
                    })
                }
            }
        }
    }
    if (requestTimmer) clearTimeout(requestTimmer)
    requestTimmer = setTimeout(function() { // 记录19分钟有没有发送.do请求
        let currentRouter = location.hash
        const loginReg = /login|register|forgot|test|template|addLoginModule/ //addLoginModule用来扩展登录页面的模块。
        const loginModule = loginReg.test(currentRouter)
        if (loginModule) return '登录模块，不用计时器'
        $(".el-message-box__close").trigger("click")
        vm.$alert(" ", "登录超时提醒", { //倒计时提醒弹窗 
            confirmButtonText: "继续操作",
            customClass: "requestTimmer",
            callback: action => {
                if (countdown == 0) { //操作超时
                    request(vm, "CB000108.do")
                    vm.$alert("登录超时，请重新登录", "登录超时提醒")
                    countdown = 60
                } else if (countdown > 0) { //继续操作
                    request(vm, "CB000109.do")
                }
                clearInterval(logoutTimmer)
                $(".requestTimmer .el-message-box__message .countdownWarn").remove()
                countdown = 60
            }
        })
        setTimeout(function() { //因为弹窗用了CSS3特效
            $(".requestTimmer .el-message-box__message").append("<div class='countdownWarn'>您已有30分钟没有操作，<span class='countdown'>" + countdown + "</span>秒后将退出登录</div>")
            countdown -= 1;
        }, 0)
        logoutTimmer = setInterval(function() { // 60秒倒计时
            if (countdown <= 0) {
                clearInterval(logoutTimmer)
                vm.$router.push('/login/loginMain')
                $(".requestTimmer .el-message-box__close").trigger("click")
            } else {
                $(".requestTimmer .el-message-box__message .countdownWarn .countdown").html(countdown)
                countdown -= 1;
            }
        }, 1000);
    }, 29 * 60 * 1000)
}
let defaultConfig = { "closeLoading": false }
export const
    request = (vm, url, params) => {
        // vm参数是VUE的实例
        if (params && params.closeLoading) vm.closeLoading = params.closeLoading
        else vm.closeLoading = defaultConfig.closeLoading
            //vm=$.extend({},vm,defaultConfig,params)
        if (!vm.closeLoading) {
            jqXhrRegistry.push(url)
            vm.$loading()
        }
        let currentHash = vm.$route.path.substr(1)
        let menuGround = vm.$tools.storage.get("menuGround", "save")
        if (menuGround && menuGround[currentHash]) {
            //console.log("id", menuGround[currentHash].id)
        }
        if (requestDemo) { //demo
            let demoUrl = "/mock/" + url + ".json"
            return axios.get(demoUrl).then(
                res => { // 成功回调方法
                    requestCallBackDone(vm, res)
                    return res.data
                }).catch(
                error => {
                    requestCallBackDone(vm, error)
                    return error
                }
            )
        } else { //生产
            let user = storage.get("user", "save")
            if (user && user.iCIFID) {
                params = $.extend({}, params, { "iCIFID": user.iCIFID });
                headers.headers.cstMac = user.cstMac
            }
            return axios.post('/api/' + url, qs.stringify(params), headers).then(
                res => { // 成功回调方法
                    requestCallBackDone(vm, res, url)
                    return res.data
                }).catch(
                error => {
                    requestCallBackDone(vm, error)
                    return error
                }
            )
        }
    }