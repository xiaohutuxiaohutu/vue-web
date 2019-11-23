<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <!--<div class="contentTab">
        <a href="#/internationalBusiness/remittanceManagementMain">行内汇款</a>
        <a href="#/internationalBusiness/remittanceManagementMain@outLineRemittance" class="current">行外汇款</a>
        <a href="#/internationalBusiness/remittanceManagementMain@remittanceQuery">汇款查询</a>
      </div>-->
      <div class="p20">
        <!--进度条-->
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <outLineRemittanceStep1 v-if="stepIndex=='0'" @changeStep="changeStep" @showFileTable="showFileTable" :formData1="formData1" :turnUpNums="turnUpNums" :isShowFileTable="isShowFileTable"></outLineRemittanceStep1>
        <intraBankRemittanceStep2 v-if="stepIndex=='1' && formData.countryNameAndCode=='中华人民共和国/China-CHN'" @changeStep1="changeStep1" @showFileTable="showFileTable" :formData="formData" :formData1="formData1" :isVisiable="isVisiable" remitType='1'></intraBankRemittanceStep2>
        <outLineRemittanceStep2 v-if="stepIndex=='1' && formData.countryNameAndCode!='中华人民共和国/China-CHN'" @changeStep1="changeStep1" @showFileTable="showFileTable" :formData="formData" :formData1="formData1" :isVisiable="isVisiable" remitType='1'></outLineRemittanceStep2>
        <outLineRemittanceStep3 v-if="stepIndex=='2'" @changeStep1="changeStep1" :formData="formData1"></outLineRemittanceStep3>
      </div>
      <div class="warm-tips mt20">
        <h3 class="fs16">业务说明</h3>
        <ul class="mt10">
          <li><span>1.带 “*” 的输入项为必输项；</span></li> 
          <li><span>2.服务收费标准：<a href="http://www.chbank.com.cn/sc/download/service-charges/index.shtml" target="_blank">http://www.chbank.com.cn/sc/download/service-charges/index.shtml</a>。</span></li> 
        </ul>
      </div>
      <!--<ynet-warm-tips v-if="stepIndex=='0'" :items="warmTips" NO="1"></ynet-warm-tips>-->
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import outLineRemittanceStep1 from './components/outLineRemittanceStep1'
import intraBankRemittanceStep2 from './components/intraBankRemittanceStep2'
import outLineRemittanceStep2 from './components/outLineRemittanceStep2'
import outLineRemittanceStep3 from './components/outLineRemittanceStep3'
export default {
  name:'outLineRemittanceMain',
  components: {
    outLineRemittanceStep1,
    intraBankRemittanceStep2,
    outLineRemittanceStep2,
    outLineRemittanceStep3,
  },
  data() {
    return {
      stepText:["填写汇款信息","确认转账信息","提交结果"],
      // warmTips:[
      //   '1.带 “*” 的输入项为必输项；',
      //   '2.服务收费标准：http://www.chbank.com.cn/sc/download/service-charges/index.shtml。',
      // ],
      stepIndex:0,
      formData:{},
      formData1:{},
      isVisiable:true,  //是否显示图形验证码
      turnUpNums:0,  //渲染次数
      isShowFileTable:false  //是否显示上传文件列表
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
    changeStep1(index,formData,isVisiable){
      let _this=this
      _this.stepIndex=Number(index)
      if(formData) _this.formData1=formData
      _this.isVisiable = isVisiable
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
