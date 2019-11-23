<template>
  <ynet-content id="callDepositCancelMain" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="contentTab">
        <a href="#/investment/calldeposit/callDepositOrderWithdrawMain">支取预约</a>
        <a href="#/investment/calldeposit/callDepositOrderWithdrawMain@callDepositCancelMain" class="current">取消预约</a>
      </div>
      <div class="p20">
        <callCancelListQuery v-if="listVisiable" @goStepPage="changePage"></callCancelListQuery>
        <!--进度条-->
        <ynet-progress-bar v-if="!listVisiable && progressVisiable1 && (currentItemIndex=='0'||currentItemIndex=='1')" class="mt10" :items="stepText1" :itemIndex="currentItemIndex"></ynet-progress-bar>
        <ynet-progress-bar v-if="!listVisiable && progressVisiable2 && (currentItemIndex=='0'||currentItemIndex=='1'||currentItemIndex=='2')" class="mt10" :items="stepText2" :itemIndex="currentItemIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <callCancelStep1 v-if="!listVisiable && progressVisiable1 && currentItemIndex=='0'" @goStepPage="changePage" :form="form" :turnUpNums="turnUpNums"></callCancelStep1>
        
        <callUpdateStep1 v-if="!listVisiable && progressVisiable2 && currentItemIndex=='0'" @goStepPage="changePage" :form="form"></callUpdateStep1>
        <callUpdateStep2 v-if="!listVisiable && progressVisiable2 && currentItemIndex=='1'" @goStepPage="changePage" :form="form"></callUpdateStep2>

        <callOrderdrawResultPage v-if="!listVisiable && currentItemIndex=='2'" @goStepPage="changePage" :form="form"></callOrderdrawResultPage>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
  import callCancelListQuery from './components/callCancelListQuery'
  import callCancelStep1 from './components/callCancelStep1'
  import callOrderdrawResultPage from './components/callOrderdrawResultPage'
  import callUpdateStep1 from './components/callUpdateStep1'
  import callUpdateStep2 from './components/callUpdateStep2'
  export default {
    name:'callDepositCancelMain',
    components:{
      callCancelListQuery,
      callCancelStep1,
      callOrderdrawResultPage,
      callUpdateStep1,
      callUpdateStep2
    },
    data() {
      return {
        stepText1:["确认提交信息","提交结果"],
        stepText2:["填写交易信息","确认提交信息","提交结果"],
        currentItemIndex: '0',
        form: {},
        listVisiable: true,
        progressVisiable1: false,
        progressVisiable2: false,
        maintainForm:this.$route.params,
        turnUpNums:0,  //渲染次数
      };
    },
    mounted(){
      let _this = this
      if(JSON.stringify(_this.maintainForm)!='{}'){
        _this.listVisiable = false
        _this.progressVisiable1 = true
        _this.progressVisiable2 = false
        _this.currentItemIndex = '0'
      }
    },
    methods: {
      changePage(listVisiable,progressVisiable1,progressVisiable2,currentItemIndex,formData){
        let _this = this
        _this.turnUpNums = _this.turnUpNums+1
        _this.listVisiable=listVisiable
        _this.progressVisiable1 = progressVisiable1
        _this.progressVisiable2 = progressVisiable2
        _this.currentItemIndex=currentItemIndex
        if(formData){
          _this.form = formData
        }
        _this.$tools.scrollTop()
      }
    }
  }
</script>