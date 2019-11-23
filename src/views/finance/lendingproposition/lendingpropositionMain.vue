<template>
  <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">贷款申请</h3>
      <div class="p20">
        <!--进度条-->
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <loanBasicInfo v-if="stepIndex=='0'" @changeStep="changeStep" :formData="formData"></loanBasicInfo>
        <affLoanInfo v-if="stepIndex=='1'" @changeStep="changeStep" :formData="formData"></affLoanInfo>
        <templateStep3 v-if="stepIndex=='2'" @changeStep="changeStep" :formData="formData"></templateStep3>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
  
</template>

<script>
import loanBasicInfo from './components/loanBasicInfo';
import affLoanInfo from './components/affLoanInfo';
import templateStep3 from './components/templateStep3'
export default {
  name:'lendingpropositionMain',
  components: {
      loanBasicInfo,
      affLoanInfo,
      templateStep3
  },
  data() {
    return {
        stepText:["填写信息","确认贷款信息","提交结果"],
        stepIndex:0,
        formData:{},
        hostNo : this.$tools.storage.get("user","save").hostNo,
    }
  },
  methods: {
    nextStep(){
      let _this=this
      _this.$emit("step","2")
      _this.$tools.storage.set("form",this.form)
    },
    CBstep(){
      let _this=this
      let form=_this.$tools.storage.get("form","save")
      if(form){
        _this.form=_this.$tools.storage.get("form","save")
      }
    },
    changeStep(index,formData){
      let _this=this
      _this.stepIndex=Number(index)
      if(formData) _this.formData=formData
      _this.$tools.scrollTop()
    } 
  },
  mounted(){ 
    
  }
}
</script>
