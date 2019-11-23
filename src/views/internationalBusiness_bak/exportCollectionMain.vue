<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="contentTab">
        <a href="#/internationalBusiness/letterOfGuaranteeToOpenMain" class="current">出口托收</a>
        <a href="#/internationalBusiness/letterOfGuaranteeToOpenMain@outLineRemittance">出口托收查询</a>
      </div>
      <div class="p20">
        <!--进度条-->
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <exportCollectionStep1 v-if="stepIndex=='0'" @changeStep="changeStep"></exportCollectionStep1>
        <exportCollectionStep2 v-if="stepIndex=='1'" @changeStep="changeStep" :formData="formData"></exportCollectionStep2>
        <letterOfGuaranteeToOpenStep3 v-if="stepIndex=='2'" @changeStep="changeStep" :formData="formData"></letterOfGuaranteeToOpenStep3>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import exportCollectionStep1 from './components/exportCollectionStep1'
import exportCollectionStep2 from './components/exportCollectionStep2'
import letterOfGuaranteeToOpenStep3 from './components/letterOfGuaranteeToOpenStep3'
export default {
  name:'templateName',
  components: {
    exportCollectionStep1,
    exportCollectionStep2,
    letterOfGuaranteeToOpenStep3
  },
  data() {
    return {
      stepText:["填写信息","确认信息","提交结果"],
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
