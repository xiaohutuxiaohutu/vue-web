<template>
  <ynet-content id="importCreditUpdateMain" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="p20">
        <importCreditQuery @changeStep="changeStep" v-if="queryPageVisiable" :isUpdate="true"></importCreditQuery>
        <!--进度条-->
        <ynet-progress-bar v-if="!queryPageVisiable&&(stepIndex=='0'||stepIndex=='1'||stepIndex=='2')" class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <importCreditUpdateStep1 v-if="!queryPageVisiable&&stepIndex=='0'" @changeStep="changeStep" :preData="formData"></importCreditUpdateStep1>
        <importCreditUpdateStep2 v-if="!queryPageVisiable&&stepIndex=='1'" @changeStep="changeStep" :formData="formData" :isPrint="isPrint"></importCreditUpdateStep2>
        <importCreditOpenStep3 v-if="!queryPageVisiable&&stepIndex=='2'" @changeStep="changeStep" :formData="formData"></importCreditOpenStep3>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import importCreditQuery from './components/importCreditQuery'
import importCreditUpdateStep1 from './components/importCreditUpdateStep1'
import importCreditUpdateStep2 from './components/importCreditUpdateStep2'
import importCreditOpenStep3 from './components/importCreditOpenStep3'
export default {
  name:'importCreditUpdateMain',
  components: {
    importCreditQuery,
    importCreditUpdateStep1,
    importCreditUpdateStep2,
    importCreditOpenStep3
  },
  data() {
    return {
      stepText:["填写汇款信息","确认转账信息","提交结果"],
      stepIndex:0,
      queryPageVisiable:true,
      formData:{},
      isPrint:false
    }
  },
  methods: {
    changeStep(queryPageVisiable,index,formData,isPrint){
      let _this=this
      _this.queryPageVisiable = queryPageVisiable
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