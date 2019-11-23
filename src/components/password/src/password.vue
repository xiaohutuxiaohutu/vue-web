<template>
<div class="password">
  <div :id="defaultConfig.initId"  :ref="defaultConfig.initId" :class="{isError:validatorBox}" class="passwordB"></div>
  <div class="pwdStrength mt10" ref="pwdStrength" v-if="defaultConfig.pwdStrength">
    <span>弱</span>
    <span>中</span>
    <span>强</span>
  </div>
  <div class="el-form-item__error" v-if="validatorBox">{{defaultConfig.validatorText}}</div>
</div>
</template>
<script>
export default {
  name: 'password',
  componentName: 'password',
  data() {
      return {
        pgeditor_pwd:"",
        rootGetLevel:"",
        //validatorBox:false,
        //validatorText:["请输入密码","输入密码长度不够6位","请输入6-16位数字、字母、符号中的任意两种组合"],
        defaultConfig:{
          pwdStrength:false,
          //validatorText:"",
          //pwdResultSM:48,
          pgeEreg2:true,
          isLoginIncludeNum:true
        },
        srandNum:'',
        randomNum:'',
        cstMac:''
      };
  },
  props: {
    config:{type:Object}
  },
  methods:{
    initPwd(sessionKey, pgeNumY){
      let _this = this
      _this.srandNum=sessionKey
      //console.log("sessionKey="+sessionKey)
      _this.pgeditor_pwd = new $.pge({
        pgePath: "./static/ocx/", //控件文件目录
        pgeId:_this.defaultConfig.pgeId, //控件ID
        pgeEdittype: 0,
        pgeEreg1:_this.defaultConfig.pgeEreg1?"[0-9]*":"[\\S]*",
        //pgeEreg2: _this.defaultConfig.pgeEreg?"(?=.*[0-9].*)(?=.*[a-zA-z].*).{6,20}$":"[0-9]{6}",
        //pgeEreg2默认为true，登录密码允许输入纯数字则isLoginIncludeNum为true，登录密码不允许输入数字则isLoginIncludeNum为false
        pgeEreg2: _this.defaultConfig.pgeEreg2?(_this.defaultConfig.isLoginIncludeNum?"((?=.*[0-9].*)|(?=.*[0-9].*)(?=.*[a-zA-Z].*)|(?=.*[^0-9a-zA-Z].*)(?=.*[a-zA-Z].*)).{6,16}$":"((?=.*[0-9].*)(?=.*[^0-9a-zA-Z].*)|(?=.*[0-9].*)(?=.*[a-zA-Z].*)|(?=.*[^0-9a-zA-Z].*)(?=.*[a-zA-Z].*)).{6,16}$"):"[0-9]{6}",
        pgeMaxlength:_this.defaultConfig.pgeMaxlength?_this.defaultConfig.pgeMaxlength:12,
        pgeTabindex: 2,
        pgeClass: "ocx_style",
        pgeInstallClass: "ocx_style",
        //pgeWindowID: "_pwd" + new Date().getTime() + 1,
        //pgeRZRandNum: sessionKey,
		//pgeRZDataB: pgeNumY,
        //PGECert:"30818902818100C1EB05EA08582F5B2304AFA4924B10DC3C1276C3C747BAB15B3F1A380A04BB48784764C19E01EC91F9E0AFD74CC9EA17CB9A214A4D42EB9F2E31F6CEA30B9FF3AD46A5F31F456CA5B57D903D7DC0F9D0711044AFC6FED4DA99F72EF7923BFC3B4FBA00E87F3146F54D046CD36F41CACB0D91005F9EF3134C5169186BFBF125A30203010001",
        //PGECert: "30818902818100C98CFA399497304109B303BE00F01C92CA70FC0085E1068D4AD103B01F52990CF6C0C2C052E3D671C8FD34473D1F4ADBD9D286B612B89139DCB0408B94A2D9050FC0AA74A3D9360CC2330F1CBE43F4BDBE425310A54F9B38D724271DDDF8DBABE125072510E00D32C9BA9B5AAE5813D11ED9445B95266595D19DB006214FA94B0203010001",
        //PGECert: "30818902818100DCAF8B25A597E3DB7A37582D1A1F6AAD0D555BE39F6B0F9D2FAA955BCD2E72563A63D9863FA1DEF655CE50F4E9834FC4378F521B300E26BEB003FEB1E170F3F639E0B419DFBB1C119CB6E85FF9D73F5EE5D53D890429C1EBFC636B8C0166D1E6205548CAB40CB6D6CFAB232FD209E8226A1132D600BBBE062FF07795E92FE1CD0203010001",
        PGECert: "30818902818100CC885EE0EFD38D2000B917EFF1B37A1666E3D050334EC8946A4C0882AEDF6F5E67D0329B3F159BFF11DAD0AA9BA1574B4C11E4DBF6452B9FAEFDC54A7AA30ADE7DED4CF22D4AB21215277828F631932D9547BC36F56210B12C271F6CC41254CE873B5F13A90A6D4363F33784CDE6CA0454C7DCD516B334802A349647D86B7E170203010001",
        //pgeOnblur: _this.defaultConfig.initId+"()" //监控光标切出密码控件框
        pgeOnkeydown: _this.defaultConfig.initId+"()",
      })
      window[_this.defaultConfig.initId]=function(){
          //setTimeOut(function(){
            //alert("触发了enter")
            _this.$emit("enterEvent",_this.pgeditor_pwd)
          //},0)
      },
      $(_this.$refs[_this.defaultConfig.initId]).html(_this.pgeditor_pwd.load())   //初始化密码控件
      _this.pgeditor_pwd.pgInitialize()  //判断是否安装
      _this.pgeditor_pwd.pwdSetSk(_this.srandNum)
      
      _this.cstMac=_this.pgeditor_pwd.machineNetwork()//Mac地址
      //console.log(_this.cstMac)

      //_this.$emit('CBobj',_this.pgeditor_pwd)
      if(_this.defaultConfig.pwdStrength){
        _this.rootGetLevel=window.setInterval(_this.getLevel,800)
      }
    },
    
    getLevel(){
      let _this = this
      let pwdLength=_this.pgeditor_pwd.pwdLength()
      // 密码强度校验
      if(_this.defaultConfig.pwdStrength && pwdLength!=0){
        let pwdStrength=_this.pgeditor_pwd.pwdStrength()
        $(_this.$refs.pwdStrength).find("span").eq(pwdStrength-1).addClass("currentStreng").siblings("span").removeClass("currentStreng")
      }else{
         $(_this.$refs.pwdStrength).find("span").removeClass("currentStreng")
      }
    },
    getPwd(){
      let _this = this
      return _this.pgeditor_pwd
    },
  },
  created(){      
			let _this = this
      $.extend(_this.defaultConfig,_this.config)           
  },
  mounted(){
    let _this = this
    _this.$tools.request(_this, "CB000105.do").then(data => {
        //_this.srandNum = '81d7uj1ud6cv6q85ib8o5hggde2iy3kq'
    //       //_this.logining = false;
             _this.randomNum = data.body.randomNum
             //console.log("生成随机数"+_this.randomNum)
             _this.initPwd(_this.randomNum)
             //console.log(_this.randomNum)
            //  _this.initPwd("2tarmk9w8r3bd8ldzqn6cgt7zbp4jb8r")
    //       let errorCode = data.body.errorCode
    //       let errorMsg = data.body.errorMsg
    //       if (errorCode == '' || errorCode == null || errorCode == '0') {
    //         let user = data.body 
    //         if (user.resetFlag == '1') {
    //           _this.$router.push({ path: '/modify' })
    //         } else {
    //           _this.$router.push({ path: '/my/myMain' })
    //         }
    //       } else {
    //         //刷新验证码
    //         _this.verifyImage()
    //         //弹出登录失败提示
    //         _this.$alert(errorMsg, '温馨提示', {
    //           confirmButtonText: '确定'
    //         })
    //       }
    })
  },
  destroyed(){
    let _this = this
    if(_this.defaultConfig.pwdStrength) window.clearInterval(_this.rootGetLevel)
  }
}
</script>
<style  lang="scss">
@import '../../../styles/vars.scss';
.pwdStrength {line-height: 20px; height: 20px;}
.pwdStrength span{display: inline-block; background: $color-overall-three; width: 70px; text-align: center; }
.pwdStrength span.currentStreng{color:#fff}
.pwdStrength span.currentStreng:nth-child(1){background:$color-primary;}
.pwdStrength span.currentStreng:nth-child(2){background:$color-assist-yellow;}
.pwdStrength span.currentStreng:nth-child(3){background:$color-assist-green;}
.password .passwordB{ border:1px solid #bfcbd9;height:30px; padding:3px; overflow:hidden;}
.password .ocx_style{height:30px; line-height:30px;border:0px; padding:0; margin:0px; width:100%;vertical-align: top;}
.password .isError.passwordB{border-color: #ff4949;}
</style>
