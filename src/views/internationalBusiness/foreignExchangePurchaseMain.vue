<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <!--<div class="contentTab">
        <a href="#/internationalBusiness/foreignExchangePurchaseMain" class="current">结购汇业务</a>
        <a href="#/internationalBusiness/foreignExchangePurchaseMain@foreignExchangePurchaseQuery">结购汇查询</a>
      </div>-->
      <div class="p20">
        <!--进度条-->
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <foreignExchangePurchaseStep1 v-if="stepIndex=='0'" @changeStep="changeStep" :formData1="formData1" :turnUpNums="turnUpNums"></foreignExchangePurchaseStep1>
        <foreignExchangePurchaseStep2 v-if="stepIndex=='1'" @changeStep1="changeStep1" :formData="formData"></foreignExchangePurchaseStep2>
        <foreignExchangePurchaseStep3 v-if="stepIndex=='2'" @changeStep="changeStep" :formData="formData1"></foreignExchangePurchaseStep3>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import foreignExchangePurchaseStep1 from './components/foreignExchangePurchaseStep1'
import foreignExchangePurchaseStep2 from './components/foreignExchangePurchaseStep2'
import foreignExchangePurchaseStep3 from './components/foreignExchangePurchaseStep3'
export default {
  name:'templateName',
  components: {
    foreignExchangePurchaseStep1,
    foreignExchangePurchaseStep2,
    foreignExchangePurchaseStep3
  },
  data() {
    return {
      stepText:["填写信息","确认信息","提交结果"],
      stepIndex:0,
      formData:{},
      formData1:{},
      turnUpNums:0  //渲染次数
    }
  },
  methods: {
    changeStep(index,formData){
      let _this=this
      _this.turnUpNums = _this.turnUpNums+1
      _this.stepIndex=Number(index)
      if(formData) _this.formData=formData
      _this.$tools.scrollTop()
    },
    changeStep1(index,formData){
      let _this=this
      _this.stepIndex=Number(index)
      if(formData) _this.formData1=formData
      _this.$tools.scrollTop()
    }
  },
  mounted(){ 
  }
}
</script>
