<template>
  <ynet-content id="callDepositOrderWithdrawMain" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="contentTab">
        <a href="#/investment/calldeposit/callDepositOrderWithdrawMain" class="current">支取预约</a>
        <a href="#/investment/calldeposit/callDepositOrderWithdrawMain@callDepositCancelMain">取消预约</a>
      </div>
      <div class="p20">
        <callOrderListQuery v-if="listVisiable" @goStepPage="changePage"></callOrderListQuery>
        <!--进度条-->
        <ynet-progress-bar v-if="!listVisiable && (currentItemIndex=='0'||currentItemIndex=='1'||currentItemIndex=='2')" class="mt10" :items="stepText" :itemIndex="currentItemIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <callOrderdrawStep1 v-if="!listVisiable && currentItemIndex=='0'" @goStepPage="changePage" :form="form" :turnUpNums="turnUpNums"></callOrderdrawStep1>
        <callOrderdrawStep2 v-if="!listVisiable && currentItemIndex=='1'" @goStepPage="changePage" :form="form"></callOrderdrawStep2>
        <callOrderdrawResultPage v-if="!listVisiable && currentItemIndex=='2'" @goStepPage="changePage" :form="form"></callOrderdrawResultPage>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
  import callOrderListQuery from './components/callOrderListQuery'
  import callOrderdrawStep1 from './components/callOrderdrawStep1'  //填充通知开立信息表单
  import callOrderdrawStep2 from './components/callOrderdrawStep2'  //确认通知开立信息表单
  import callOrderdrawResultPage from './components/callOrderdrawResultPage'  //成功通知开立信息表单
  export default {
    name:'callDepositOrderWithdrawMain',
    components:{
      callOrderListQuery,
      callOrderdrawStep1,
      callOrderdrawStep2,
      callOrderdrawResultPage
    },
    data() {
      return {
        stepText:["填写信息","确认交易信息","提交结果"],
        currentItemIndex: '0',
        form: {},
        listVisiable: true,
        maintainForm:this.$route.params,
        turnUpNums:0,  //渲染次数
      }
    },
    mounted(){
      let _this = this
      if(JSON.stringify(_this.maintainForm)!='{}'){
        _this.listVisiable = false
        _this.currentItemIndex = '0'
      }
    },
    methods: {
      changePage(listVisiable,currentItemIndex,formData){
        let _this = this
        _this.turnUpNums = _this.turnUpNums+1
        _this.listVisiable=listVisiable
        _this.currentItemIndex=currentItemIndex
        if(formData){
          _this.form = formData
        }
        _this.$tools.scrollTop()
      }
    }
  }
</script>