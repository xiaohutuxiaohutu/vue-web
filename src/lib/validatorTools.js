let self = {
    isPhone(value) { //校验手机格式
        if (!this.isNumber(value)) return false
        let clientRegex = /^(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[0-9])[0-9]{8}$/
        return clientRegex.test(value)
    },
    isNumber(value) { //校验手机格式
        return !isNaN(value)
    },
    isIllegalr(value) { //校验非法字符
        //return /[!@#\$%\^&\*]+/g.test(value)
        //return /^[A-Za-z0-9(). \-\u2E80-\uFE4F\u3400-\u4DBF\uF900-\uFAD9\u3000-\u303F\u2000-\u206F\uFF00-\uFFEF]{1,60}$+/g.test(value)
        return /^[A-Za-z0-9(). \-\u2E80-\uFE4F\u3400-\u4DBF\uF900-\uFAD9\u3000-\u303F\u2000-\u206F\uFF00-\uFFEF\_\·]{1,60}$/.test(value)
    },
    isUnion(value) { //数字字母汉字
        return !/^([\u4e00-\u9fa5\a-zA-Z0-9]+)$/.test(value)
    },
    isNumEng(rule, value, callback) { //数字字母
        return !/^([a-zA-Z0-9]+)$/.test(value)
    },
    isNumAndEng(rule, value, callback) { //数字字母
        if (self.isEmpty(value) || !/^([a-zA-Z0-9]+)$/.test(value)) {
            callback("请输入数字或字母")
        } else {
            callback()
        }
        // return !/^([a-zA-Z0-9]+)$/.test(value)
    },
    isInteger(rule, value, callback) {
        let valueReg = /(^[0])|(\.0*)$/.test(value)
        if (self.isEmpty(value) || valueReg || !Number.isInteger(Number(value))) {
            callback("请填写数字类型")
        } else {
            callback()
        }
    },
    numberRange(rule, value, callback) {
        if (rule.rangeVal[0] <= value && value <= rule.rangeVal[1]) callback()
        else callback("请输入" + rule.rangeVal[0] + "至" + rule.rangeVal[1] + "之间的数字")
    },
    isEmpty(value) {
        if ($.trim(value) == "") return true
        return false
    },
    isLongNumber(value) { //数字
        return /^([0-9]+)$/.test(value)
    },
    isShowMenu(vm) { //菜单展示
        let CurrentHash = vm.$route.path
        const loginReg = /login|register|forgot|addLoginModule/ //addLoginModule用来扩展登录页面的模块。
        const loginModule = loginReg.test(CurrentHash)
        return !loginModule
    },
    isRequestRouter(vm) { //判断是否请求的路由模块年
        let CurrentHash = vm.$route.path
        const rquestRouterReg = /headerNav|setShortMenu|modifyPwd|forgetPwd|addLoginModule/ //addLoginModule用来扩展模块。
        const rquestRouterModule = rquestRouterReg.test(CurrentHash)
        return !rquestRouterModule
    },
    isShowEye(vm) { //账号眼睛按钮
        let user = vm.$tools.storage.get("user", "save")
        if (user && user.protect == "Y") {
            return "btnEye"
        } else {
            return "btnEye showEye"
        }
    },
    fieldsCollection(rule, value, callback) {
        let _this = rule.vm
        let fieldVal = _this.form[rule.field].replace(/\n/g, '/').split("/")
        if (fieldVal.length == rule.fieldList.length) {
            for (let i = 0; i < rule.fieldList.length; i++) {
                _this.form[rule.fieldList[i]] = fieldVal[i]
            }
            callback()
                // } else if (fieldVal.length >= rule.fieldList.length) {
                //     for (let i = 0; i < rule.fieldList.length-1; i++) {
                //         _this.form[rule.fieldList[i]] = fieldVal[i]
                //     }
                //     callback()
        } else {
            callback("格式错误")
        }
    },
    amountCompare(rule, value, callback) {
        let _form = rule.vm[rule.formName]
        let compareValue1 = _form[rule.compareList[0]]
        let compareValue2 = _form[rule.compareList[1]]
        if (!self.isEmpty(compareValue1) && !self.isEmpty(compareValue2)) {
            if (Number(compareValue1) > Number(compareValue2)) {
                callback("起始金额不能大于结束金额")
            } else {
                callback()
            }
        } else {
            if (self.isEmpty(_form[rule.field])) {
                for (let index in rule.compareList) {
                    if (rule.field != rule.compareList[index]) {
                        if (!self.isEmpty(_form[rule.compareList[index]])) {
                            callback("请填写金额")
                        }
                        callback()
                    }
                }
            }
            callback()
        }
    },
    amountCompareList(rule, value, callback) {
        let _formNode = rule.vm[rule.formName][
            [rule.formNode]
        ]
        let compareValue1 = _formNode[rule.compareIndex[0]][rule.compareName]
        let compareValue2 = _formNode[rule.compareIndex[1]][rule.compareName]
        if (Number(compareValue1) >= Number(compareValue2)) {
            callback("结束金额不能小于或等于起始金额")
        } else {
            callback()
        }
    },
    dateCompare(rule, value, callback) {
        let _form = rule.vm[rule.formName]
        let compareValue1 = _form[rule.compareList[0]]
        let compareValue2 = _form[rule.compareList[1]]
        if (undefined != rule.requested && !rule.requested && null != rule.requested && self.isEmpty(compareValue1) && self.isEmpty(compareValue2)) {
            return callback()
        }
        if (self.isEmpty(value)) callback("请选择日期")
        if (!self.isEmpty(compareValue1) && !self.isEmpty(compareValue2)) {
            if (compareValue1.getTime() > compareValue2.getTime()) {
                callback("起始日期不能大于结束日期")
            } else {
                callback()
            }
        } else {
            if (self.isEmpty(_form[rule.field])) {
                for (let index in rule.compareList) {
                    if (rule.field != rule.compareList[index]) {
                        if (!self.isEmpty(_form[rule.compareList[index]])) {
                            callback("请选择日期")
                        }
                        callback()
                    }
                }
            }
            callback()
        }
    },
    fileValidator(rule, value, callback) {
        if (value == "reset") return callback()
        let fileType = rule.fileType
            //let _form=rule.vm[rule.formName]
        if (!rule.requested && self.isEmpty(value)) {
            return callback()
        }
        let _uploadConfig = rule.vm[rule.configName]
        if (_uploadConfig.isShowBtnUoload && _uploadConfig.isSuccess) {
            if (value == "F") callback("上传文件失败，请重新点击上传按钮。")
            else callback()
        } else {
            if (self.isEmpty(value)) callback("请选择上传文件。")
            else if (value == "sizeIsBig") callback("上传文件大于" + (_uploadConfig.fileSize ? _uploadConfig.fileSize : 20) + "M。")
            else {
                let currentType = value.substring(value.lastIndexOf(".") + 1)
                let isFileType = false
                for (let i = 0; i < fileType.length; i++) {
                    if (currentType.toLowerCase() == fileType[i].toLowerCase()) {
                        isFileType = true
                    }
                }
                if (_uploadConfig.isShowBtnUoload && isFileType) {
                    _uploadConfig.isClickUpload = true
                    if (_uploadConfig.isClickUpload && !_uploadConfig.isUploading) callback("文件准备就绪，请点击按钮上传。")
                    else if (_uploadConfig.isUploading) callback("文件上传中，请稍等...")
                    else callback()
                } else if (isFileType) callback()
                else callback("请选择" + fileType + "格式。")
            }
        }
    },
    pwdValidator(rule, value, callback) {
        let _form = rule.vm[rule.formName]
        let _pwdObj = rule.vm.$refs[rule.field].getPwd()
        if (!_pwdObj.isInstalled) {
            callback()
        } else {
            let pwdLength = _pwdObj.pwdLength()
            if (pwdLength == 0) callback("请输入密码")
            else if (pwdLength < 8) callback("密码长度不能小于8位")
            else if (rule.isPgeEreg2) {
                let isValid = _pwdObj.pwdValid() //校验pgeEreg2正则表达式(1:表示不匹配正则二,即不符合要求；0:表示匹配正则二,即符合要求)
                if (isValid == 1) {
                    callback("请输入8-16位数字、字母、符号中的至少两种组合")
                } else {
                    _form[rule.field] = _pwdObj.pwdResult28()
                    callback()
                }
            } else {
                _form[rule.field] = _pwdObj.pwdResult28()
                callback()
            }
        }
    },
    loginPwdValidator(rule, value, callback) {  //登录密码校验(6位)
        let _form = rule.vm[rule.formName]
        let _pwdObj = rule.vm.$refs[rule.field].getPwd()
        if (!_pwdObj.isInstalled) {
            callback()
        } else {
            let pwdLength = _pwdObj.pwdLength()
            if (pwdLength == 0) callback("请输入密码")
            else if (pwdLength < 6) callback("密码长度不能小于6位")
            else if (rule.isPgeEreg2) {
                let isValid = _pwdObj.pwdValid() //校验pgeEreg2正则表达式(1:表示不匹配正则二,即不符合要求；0:表示匹配正则二,即符合要求)
                if (isValid == 1) {
                    callback("请输入6-16位数字、字母、符号中的至少两种组合")
                } else {
                    _form[rule.field] = _pwdObj.pwdResult28()
                    callback()
                }
            } else {
                _form[rule.field] = _pwdObj.pwdResult28()
                callback()
            }
        }
    },
    disabledNonemptyValidator(rule, value, callback) {
        let _this = this
        if (!rule.vm[rule.form][rule.disabled] && $.trim(value) == "") return callback("不能为空")
        callback()
    },
    isEmail(rule, value, callback) {
        //alert(!/^\S+@\w(.\w)+$/.test(value) && !$.trim(value)=="")
        // ^\S+@\S+(.\w)+$
        // ^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value) && $.trim(value) != "") {
            callback("邮箱格式不正确")
        } else {
            callback()
        }
    },
    isMobile(rule, value, callback) {
        if (!/^(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[0-9])[0-9]{8}$/.test(value) && $.trim(value) != "") {
            callback("手机格式不正确")
        } else {
            callback()
        }
    },
    isZipCode(rule, value, callback) {
        if (value.length != 6 && $.trim(value) != "") {
            callback("邮编格式不正确")
        } else if (!/^[0-9]{6}$/.test(value) && $.trim(value) != "") {
            callback("邮编格式不正确")
        } else {
            callback()
        }
    },
    isNum(rule, value, callback) { //电弧\手机 数字类型
        if (isNaN(value) && $.trim(value) != "") {
            callback("请输入数字")
        } else {
            callback()
        }
    },
    isAccNo(rule, value, callback) { //银行账号  数字 字母
        if (!/^[a-zA-Z]*[0-9]+$/.test(value) && $.trim(value) != "") {
            callback("账号格式不正确")
        }
        callback()
    },
    isChEng(rule, value, callback) { //字母汉字
        // return !/^([\u4e00-\u9fa5\a-zA-Z]+)$/.test(value)
        if (!/^([\u4e00-\u9fa5\a-zA-Z]+)$/.test(value)) {
            callback("请输入汉字或字母")
        }
        callback()
    },
    isInt(rule, value, callback) { //正整数（不包括0）
        let valueReg = /^[1-9][0-9]*$/.test(value)
        if (!value) {
            callback()
        } else if (!valueReg) {
            callback("请输入正整数")
        } else {
            callback()
        }
    },
    compareNum(rule, value, callback) { //比较大小，入参：formName（form表单,为空时mix，max为实际值），mix（应该比当前数小的值），max(应该比当前数大的值)，message（callback的值）,
        let _message = [rule.message]
        let _formName = rule.formName
        if (_formName) {
            if (rule.mix) {
                let _mix = rule.vm[rule.formName][rule.mix]
                if (isNaN(value) || isNaN(_mix)) {
                    callback('请输入数字')
                } else if (Number(value) < Number(_mix)) {
                    callback(_message)
                }
                callback()
            }
            if (rule.max) {
                let _max = rule.vm[rule.formName][rule.max]
                if (isNaN(value) || isNaN(_max)) {
                    callback('请输入数字')
                } else if (Number(value) > Number(_max)) {
                    callback(_message)
                }
                callback()
            }
        } else {
            if (rule.mix) {
                let _mix = rule.mix
                if (isNaN(value) || isNaN(_mix)) {
                    callback('请输入数字')
                } else if (Number(value) < Number(_mix)) {
                    callback(_message)
                }
                callback()
            }
            if (rule.max) {
                let _max = rule.max
                if (isNaN(value) || isNaN(_max)) {
                    callback('请输入数字')
                } else if (Number(value) > Number(_max)) {
                    callback(_message)
                }
                callback()
            }
        }
    },
    isCnEngNum(rule, value, callback) { //数字字母汉字
        if (!/^([\u4e00-\u9fa5\a-zA-Z0-9]+)$/.test(value) && $.trim(value) != "") {
            callback("请输入汉字、字母或者数字")
        }
        callback()
    },
    isTranAmount(rule, value, callback) { //交易金额，大于0
        if (!/^([0-9]+.?[0-9]+)$/.test(value) && $.trim(value) != "") {
            callback("请输入正确金额")
        } else if (Number(value) <= 0) {
            callback("交易金额不能小于等于0")
        }
        callback()
    },
    notChineseValidator(rule, value, callback) {
        if (/([\u4e00-\u9fa5]+)/.test(value)) {
            callback("不可输入中文，请重新输入!")
        }
        callback()
    },
    mobileValidate(rule, value, callback) { //手机号唯一性校验
        let _this = rule.vm
        let oldMobile = _this.oldMobile //旧手机号，修改用户信息使用
        if (value == oldMobile) {
            callback()
        } else {
            let body = {}
            body.userMobile = value
            _this.$tools.request(_this, "CB000107.do", body).then(data => {
                let temp = data.body.temp
                if (temp == '0') {
                    callback()
                } else {
                    callback('手机号已存在')
                }
            })
        }
    },
    unescapeHTML(value){
      return value.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&apos;/g,'\'').replace(/&#x27;/g,'\'')
    },
    formatHTML(value){
      return value.replace(/\n/g,'/br;/').replace(/\s/g,'/nbsp;/')
    },
    unformatHTML(value,config){
        if(config){
            if(config.textarea){
                return value.replace(new RegExp('/nbsp;/','gm'),' ').replace(new RegExp('&nbsp;','gm'),' ').replace(new RegExp('/br;/','gm'),'\n').replace(new RegExp('<br/>','gm'),'\n')
            }
        }
        if(value){
            return value.replace(new RegExp('/nbsp;/','gm'),'&nbsp;').replace(new RegExp('/br;/','gm'),'<br/>')
        }
    }
}

export default self