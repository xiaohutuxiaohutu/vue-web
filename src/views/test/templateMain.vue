<template>
  <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">一站式转账</h3>
      <div class="p20">
        <!--进度条-->
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <templateStep1 v-if="stepIndex=='0'" @changeStep="changeStep"></templateStep1>
        <templateStep2 v-if="stepIndex=='1'" @changeStep="changeStep" :formData="formData"></templateStep2>
        <templateStep3 v-if="stepIndex=='2'" @changeStep="changeStep" :formData="formData"></templateStep3>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import templateStep1 from './components/templateStep1'
import templateStep2 from './components/templateStep2'
import templateStep3 from './components/templateStep3'
export default {
  name:'templateName',
  components: {
    templateStep1,
    templateStep2,
    templateStep3
  },
  data() {
    return {
      stepText:["填写信息","确认转账信息","提交结果"],
      stepIndex:0,
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
