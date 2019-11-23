<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">本人信息维护</h3>
      <div class="p20">
        <templateStep1 v-if="stepIndex=='0'" @changeStep="changeStep"></templateStep1>
        <templateStep2 v-if="stepIndex=='1'" @changeStep="changeStep" :tableData="tableData"></templateStep2>
        <templateStep3 v-if="stepIndex=='2'" @changeStep="changeStep" :resultData="tableData"></templateStep3>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import templateStep1 from './components/step1'
import templateStep2 from './components/step2'
import templateStep3 from './components/step3'
export default {
  name:'templateName',
  components: {
    templateStep1,
    templateStep2,
    templateStep3
  },
  data() {
    return {
      stepIndex:0,
      tableData:{}
    }
  },
  methods: {
    changeStep(index,tableData){
      let _this=this
      _this.stepIndex=Number(index)
      if(tableData) _this.tableData=tableData
      _this.$tools.scrollTop()
    }
  },
  mounted(){ 
    
  }
}
</script>
