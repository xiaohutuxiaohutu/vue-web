<template>
 <div class="Banner-Login">
   <!--banner-->
   <div class="LoginBanner">
     <el-carousel height="380px" :interval="5000">
      <el-carousel-item v-for="item in itemImgList">
           <div class="itemImg" :class="item.className"></div>
      </el-carousel-item>
    </el-carousel>
   </div>
   <!--banner--End-->
   <!--登录-->
   <div class="LoginBox">
     <el-tabs v-model="activeName" @tab-click="handleClick">
       <!--账号登录-->
       <el-tab-pane label="账号登录" name="first">
         <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="loginForm">
           <el-form-item prop="UserId">
             <el-input class="loginIcon" type="text" v-model="loginForm.UserId" auto-complete="off" placeholder="昵称／身份证／卡折号／手机号"></el-input>
           </el-form-item>
           <el-form-item prop="logonPW">
             <el-input class="checkPassIcon" type="password" v-model="loginForm.logonPW" auto-complete="off" placeholder="请输入密码"></el-input>
           </el-form-item>
            <el-form-item prop="verificationCode">
             <el-col :span="15">
               <el-input class="codeIcon" type="text" v-model="loginForm.verificationCode" auto-complete="off" placeholder="请输入验证码"></el-input>
             </el-col>
             <el-col :span="9" class="tar">
               <img src="../../../images/common/verificationCode.jpg" height="36" class="vab" /> 
             </el-col>
           </el-form-item>      
           <el-form-item style="width:100%;">
             <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
           </el-form-item>
           <el-form-item prop="remember">
             <el-col :span="10">
               <el-checkbox v-model="loginForm.remember" class="remember">记住账号</el-checkbox>
             </el-col>
             <el-col :span="14" class="tar">
               <router-link to="/register">在线注册</router-link> | 
               <router-link to="/forgot">忘记密码</router-link>
             </el-col>
           </el-form-item>
          </el-form>
       </el-tab-pane>
       <!--账号登录--END-->
       <!--二维码登录-->
       <el-tab-pane label="扫码登录" name="second">
         <div class="tac mt30"><img src="../../../images/login/loginEwm.jpg" /></div>
         <div class="tar mt20 fontSize14">
           <router-link to="/register">在线注册</router-link> |
           <router-link to="/template">下载手机银行</router-link>
         </div>
         <div class="tar mt10 fontSize14">
           <router-link to="/test/templateMain" class="colorBlue">下载网银助手</router-link>
         </div>
       </el-tab-pane>
       <!--二维码登录--End-->
     </el-tabs>
   </div>
   <!--登录--End-->
   <!--Icon--通过v-if隐藏，此代码不会渲染，需要用时则把v-if去掉-->
   <div class="operationIcon mtb30" v-if="false">
     <div class="Iframe">
     <el-row>
       <el-col :span="8" :offset="1">
         <router-link to="/">
           <div class="circleIcon circleIconBgRed vam inline-block iconBg1 mr20"></div>
           <div class="inline-block vam">
             <h3 class="mb10">认识创兴个人网银</h3>
             <span>个人网银操作帮助</span>
           </div>
         </router-link>
       </el-col>
       <el-col :span="8">
         <router-link to="/">
           <div class="circleIcon circleIconBgOrage vam inline-block iconBg2 mr20"></div>
           <div class="inline-block vam">
             <h3 class="mb10">网银助手</h3>
             <span>助手下载安装</span>
           </div>
         </router-link>
       </el-col>
       <el-col :span="7">
         <router-link to="/">
           <div class="circleIcon circleIconBgBlue vam inline-block iconBg3 mr20"></div>
           <div class="inline-block vam">
             <h3 class="mb10">在线演示</h3>
             <span>在线操作演示</span>
           </div>
         </router-link>
       </el-col>
     </el-row>
     </div>
   </div>
   <!--Icon--End-->
 </div> 
</template>

<script>
  
  export default {
    name:'LoginBanner',
    mounted() {
    },
    created: function () {
      this.renderUI()    //进入页面初始化方法
      this
    },
    data () {
      return {
        itemImgList:[
          {className:'bannerImg1'},
          {className:'bannerImg2'}
          ],
        activeName:'second',
        logining: false,
        loginForm: {
          UserId: '',
          logonPW: '660F71256CD1C662EB706016AD3981DEB1110CCDF6CB4181AD11A86649F6622E943D99AE02D84FD7EB58A6C3AE14BD4C0E6259C34C8532E73ADE7CD4C9999D162022F4B228EDF2C4955692161F0D46C28805A6E6F5089CE37B6F94FBF7A212C6C8D32FD7B182F5DCE396D83854BF66B307B788F67922B40F4F9CBC8A471BA268',
          remember:false,
          verificationCode:'11',
          systemID:'EBK',
          srcSystemID:'EBK',
          loginType:"01"
        },
        loginRules: {   //登录页面输入框规则校验
          UserId: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          logonPW: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          verificationCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
        }
      }
    },// data
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event)
      },
      renderUI() {    //进入页面初始化方法
        let _this=this
        let storage=window.localStorage
        _this.loginForm.UserId=storage.getItem('UserId');

      },
      handleSubmit2(ev) {   //登录请求
        var _this = this
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true
            _this.$tools.request(this,"ATS11003.do",_this.loginForm).then(data => {
              _this.logining = false
              let user=data.body
              _this.$tools.storage.set("user",user)   //储存登录数据信息 
              _this.$router.push({ path:'/my/myMain'})
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }// methods
  }

</script>
<style lang="scss">
.Banner-Login{position: relative;}
.LoginBanner .bannerImg1{background: url(../../../images/common/LoginBanner1.jpg) no-repeat;}
.LoginBanner .bannerImg2{background: url(../../../images/common/LoginBanner1.jpg) no-repeat;}
.LoginBanner .itemImg{height:380px; background-position:top center;}
.LoginBanner .el-carousel .el-carousel__button{opacity:1; height: 4px}
.LoginBanner .el-carousel .is-active .el-carousel__button{background:#e02a3a;}
.LoginBox{border-radius:5px; background:#fff;width: 290px;height:340px; padding: 10px 20px; position:absolute; top: 10px; left: 50%;margin-left: 170px;z-index:10;}
.LoginBox .el-tabs__header{border: 0px;}
.LoginBox .el-tabs__active-bar{display: none;}
.LoginBox .el-tabs__nav{width:100%;}
.LoginBox .el-tabs__item{font-size:18px; color:#333; padding:0px; width:50%; text-align:center; border-right:1px solid #ebebeb;line-height: 30px;height: 30px;}
.LoginBox .el-tabs__item:last-child{border-right:0;}
.LoginBox .is-active{color:#e02a3a;}
.loginForm input{background: url(../../../images/common/loginIcon.png) no-repeat; padding-left: 30px}
.loginForm .loginIcon input{background-position: 6px 9px}
.loginForm .checkPassIcon input{background-position: 6px -36px}
.loginForm .codeIcon input{background-position: 6px -84px}

.operationIcon h3{font-size:20px; color:#333;}
.circleIcon{border-radius:50%; width: 90px; height: 90px;background: url(../../../images/common/operationIcon.png) no-repeat;}
.circleIcon.circleIconBgRed{background-color:#e02a3a;}
.circleIcon.circleIconBgOrage{background-color:#fe7921;}
.circleIcon.circleIconBgBlue{background-color:#1b86d8;}
.iconBg1{background-position:16px 22px}
.iconBg2{background-position:16px -87px}
.iconBg3{background-position:16px -199px}
</style>