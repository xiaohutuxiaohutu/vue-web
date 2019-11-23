<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="contentTab">
        <a href="#/internationalBusiness/remittanceManagementMain" class="current">行内汇款</a>
        <a href="#/internationalBusiness/remittanceManagementMain@outLineRemittance">行外汇款</a>
        <a href="#/internationalBusiness/remittanceManagementMain@remittanceEnquiry">汇款查询</a>
      </div>
      <div class="p20">
        <!--进度条-->
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <intraBankRemittanceStep1 v-if="stepIndex=='0'" @changeStep="changeStep"></intraBankRemittanceStep1>
        <intraBankRemittanceStep2 v-if="stepIndex=='1'" @changeStep="changeStep" :formData="formData"></intraBankRemittanceStep2>
        <intraBankRemittanceStep3 v-if="stepIndex=='2'" @changeStep="changeStep" :formData="formData"></intraBankRemittanceStep3>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import intraBankRemittanceStep1 from './components/intraBankRemittanceStep1'
import intraBankRemittanceStep2 from './components/intraBankRemittanceStep2'
import intraBankRemittanceStep3 from './components/intraBankRemittanceStep3'
export default {
  name:'templateName',
  components: {
    intraBankRemittanceStep1,
    intraBankRemittanceStep2,
    intraBankRemittanceStep3
  },
  data() {
    return {
      stepText:["填写汇款信息","确认转账信息","提交结果"],
      stepIndex:1,
      formData:{}
    }
  },
  methods: {
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
