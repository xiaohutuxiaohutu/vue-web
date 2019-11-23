<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <!--div class="contentTab">
        <a href="#/internationalBusiness/exportCollectionMain" class="current">出口托收</a>
        <a href="#/internationalBusiness/exportCollectionMain@exportCollectionQuery">出口托收查询</a>
      </div-->
      <div class="p20">
        <!--进度条-->
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <exportCollectionStep1 v-show="stepIndex=='0'" @changeStep="changeStep" :preData="formData"></exportCollectionStep1>
        <exportCollectionStep2 v-if="stepIndex=='1'" @changeStep="changeStep" :formData="formData" :isPrint="isPrint"></exportCollectionStep2>
        <exportCollectionStep3 v-if="stepIndex=='2'" @changeStep="changeStep" :formData="formData"></exportCollectionStep3>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import exportCollectionStep1 from './components/exportCollectionStep1'
import exportCollectionStep2 from './components/exportCollectionStep2'
import exportCollectionStep3 from './components/exportCollectionStep3'
export default {
  name:'templateName',
  components: {
    exportCollectionStep1,
    exportCollectionStep2,
    exportCollectionStep3
  },
  data() {
    return {
      stepText:["填写信息","确认信息","提交结果"],
      stepIndex:0,
      formData:{},
      isPrint:false,
    }
  },
  methods: {
    changeStep(index,formData,isPrint){
      let _this=this
      _this.stepIndex=Number(index)
      if(formData) _this.formData=formData
      _this.isPrint=isPrint
      _this.$tools.scrollTop()
    }
  },
  mounted(){ 
  }
}
</script>
