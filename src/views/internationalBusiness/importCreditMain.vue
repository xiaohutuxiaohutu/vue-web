<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="p20">
        <!--进度条-->
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <importCreditOpenStep1 v-if="stepIndex=='0'" @changeStep="changeStep" :preData="formData" :preDisabledForm="disabledForm" :turnUpNums="turnUpNums"></importCreditOpenStep1>
        <importCreditOpenStep2 v-if="stepIndex=='1'" @changeStep="changeStep" :formData="formData" :isPrint="isPrint"></importCreditOpenStep2>
        <importCreditOpenStep3 v-if="stepIndex=='2'" @changeStep="changeStep" :formData="formData"></importCreditOpenStep3>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import importCreditOpenStep1 from './components/importCreditOpenStep1'
import importCreditOpenStep2 from './components/importCreditOpenStep2'
import importCreditOpenStep3 from './components/importCreditOpenStep3'
export default {
  name:'templateName',
  components: {
    importCreditOpenStep1,
    importCreditOpenStep2,
    importCreditOpenStep3
  },
  data() {
    return {
      stepText:["填写信用证信息","确认信用证信息","提交结果"],
      stepIndex:0,
      formData:{},
      isPrint:'',
      disabledForm:{},
      turnUpNums:0,  //渲染次数
    }
  },
  methods: {
    changeStep(index,formData,isPrint,disabledForm){
      let _this=this
      _this.turnUpNums = _this.turnUpNums+1
      _this.stepIndex=Number(index)
      if(formData) _this.formData=formData
      _this.isPrint=isPrint
      if(disabledForm) _this.disabledForm=disabledForm
      _this.$tools.scrollTop()
    }
  },
  mounted(){ 
    
  }
}
</script>
