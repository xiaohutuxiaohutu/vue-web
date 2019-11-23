<template>
<div class="importCreditUpdateStep2">
  <importCreditUpdatePrint :formData="formData" :isPrint="isPrint"></importCreditUpdatePrint>
  <div class="btnArea mt20 tac">
    <el-button type="primary" @click="submitForm()">提交</el-button>
    <el-button @click="preStep()">上一步</el-button>
  </div> 
</div>
</template>

<script>
import importCreditUpdatePrint from './importCreditUpdatePrint'
export default {
  name:'importCreditUpdateStep2',
  components: {
    importCreditUpdatePrint
  },
  data() {
    return {
      loginStorage:this.$tools.storage.get("user","save")
    }
  },
  props:{
    formData:{type:Object},
    isPrint:{type:Boolean,default:false},
  },
  methods: {
    preStep(){
      let _this=this
      _this.$emit("changeStep",false,"0",_this.formData,false)
    },
    submitForm() {
      let _this=this
      let body = $.extend({},_this.formData,{cstNo:_this.loginStorage.cstNo,oprNo:_this.loginStorage.eCIFID,bsnCode:'CB050301'})
      _this.$tools.request(this,"CB050301.do",body).then(
        data => {
        _this.$emit("changeStep",false,"2",data.body,false)
      })
    }
  },
  mounted(){
  }
}
</script>
<style  lang="scss">

</style>