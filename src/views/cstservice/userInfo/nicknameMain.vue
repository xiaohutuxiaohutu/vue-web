<template>
  <div class="main-content">
    <!--面包屑-->
    <ynet-breadcrumb v-if="isModifyPwd"></ynet-breadcrumb>
    <ynet-breadcrumb v-if="!isModifyPwd && !isForgetPwd" location="修改密码页面"></ynet-breadcrumb>
    <ynet-breadcrumb v-if="!isModifyPwd && isForgetPwd" location="忘记密码"></ynet-breadcrumb>
    <!--面包屑--end-->
    <ynet-content id="nicknameMain" :headerInformation="isModifyPwd" :headerMenu="isModifyPwd" class="functionalArea">
      <h3 class="functionalAreaTitle">修改登录密码</h3>
      <div class="p20">
        <modify></modify>
      </div>
    </ynet-content>
  </div>
</template>

<script>
  import modify from './components/modify'
  export default {
    name:'nicknameMain',
    components:{
     modify
    },
    data() {
      return {
        isModifyPwd:true,//控制是否正常修改密码
        isForgetPwd:false,//控制是强制修改密码还是忘记密码
      };
    },
    methods: {
      // getIsModifyPwd(val){
      //   let _this=this
      //   _this.isModifyPwd=val
      // }
    },
    created:function(){
    let _this=this
    let user = _this.$tools.storage.get("user","save")
    if(user){
      if(user.resetFlag=='1'){
        //密码重置后强制修改密码
        _this.isModifyPwd=false
        _this.isForgetPwd=false
      }else{
        //正常密码修改页面
        _this.isModifyPwd=true
        _this.isForgetPwd=false
      }
    }else{
      //忘记密码页面
      _this.isModifyPwd=false
      _this.isForgetPwd=true
    }
  }
  }

</script>
