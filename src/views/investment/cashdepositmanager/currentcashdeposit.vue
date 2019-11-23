<template>
  <ynet-content id="termcashdeposit" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">活期保证金存入</h3>
      <div class="p20">
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="currentItemIndex"></ynet-progress-bar>
        <currentfillinPage v-if="currentItemIndex==0" @goStepPage="changePage" :fillinMsg="form"></currentfillinPage>
        <currentconfirmPage v-if="currentItemIndex==1" @goStepPage="changePage" :confirmMsg="form"></currentconfirmPage>
        <currentresultPage v-if="currentItemIndex==2" @goStepPage="changePage"  :resultMsg="form"></currentresultPage>
      </div>
    </div>
  </ynet-content>
</template>


<script>
  import currentfillinPage from './components/currentfillinPage'    //填充存入开立信息表单
  import currentconfirmPage from './components/currentconfirmPage'    //交易确认页面
  import currentresultPage from './components/currentresultPage'    //交易完成页面

  export default {
    name:'currentcashdeposit',
    components:{
      currentfillinPage,
      currentconfirmPage,
      currentresultPage
    },
    data() {
      return {
        stepText:["填写信息","确认交易信息","提交结果"],
        currentItemIndex: 0,
        form: {}
      }
    },
    methods: {
      changePage(val){
        let _this = this
        _this.currentItemIndex=val[0]
        if(val[1]){
          _this.form=val[1]
        }
      }
    }
  }
</script>