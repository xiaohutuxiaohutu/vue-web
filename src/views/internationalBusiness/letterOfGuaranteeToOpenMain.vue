<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <!--div class="contentTab">
        <a href="#/internationalBusiness/letterOfGuaranteeToOpenMain" class="current">保函开立</a>
        <a href="#/internationalBusiness/letterOfGuaranteeToOpenMain@letterOfGuaranteeToOpenQuery">保函开立查询</a>
      </div-->
      <div class="p20">
        <!--进度条-->
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <letterOfGuaranteeToOpenStep1 v-show="stepIndex=='0'" @changeStep="changeStep" @showFileTable="showFileTable" :isShowFileTable="isShowFileTable"></letterOfGuaranteeToOpenStep1>
        <letterOfGuaranteeToOpenStep2 v-if="stepIndex=='1'" @changeStep="changeStep" :formData="formData" @showFileTable="showFileTable"></letterOfGuaranteeToOpenStep2>
        <letterOfGuaranteeToOpenStep3 v-if="stepIndex=='2'" @changeStep="changeStep" :formData="formData" @showFileTable="showFileTable"></letterOfGuaranteeToOpenStep3>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import letterOfGuaranteeToOpenStep1 from './components/letterOfGuaranteeToOpenStep1'
import letterOfGuaranteeToOpenStep2 from './components/letterOfGuaranteeToOpenStep2'
import letterOfGuaranteeToOpenStep3 from './components/letterOfGuaranteeToOpenStep3'
export default {
  name:'templateName',
  components: {
    letterOfGuaranteeToOpenStep1,
    letterOfGuaranteeToOpenStep2,
    letterOfGuaranteeToOpenStep3
  },
  data() {
    return {
      stepText:["填写信息","确认信息","提交结果"],
      stepIndex:0,
      formData:{},
      isShowFileTable:false  //是否显示上传文件列表
    }
  },
  methods: {
    changeStep(index,formData){
      let _this=this
      //console.log(formData)
      _this.stepIndex=Number(index)
      if(formData) _this.formData=formData
      _this.$tools.scrollTop()
    },
    showFileTable(value){
      let _this = this
      _this.isShowFileTable = value
    }
  },
  mounted(){ 
  }
}
</script>
