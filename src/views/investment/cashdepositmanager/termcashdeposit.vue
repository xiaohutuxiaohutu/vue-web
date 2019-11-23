<template>
  <ynet-content id="termcashdeposit" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">定期保证金存入</h3>
      <div class="p20">
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="currentItemIndex"></ynet-progress-bar>
        <termfillinPage v-if="currentItemIndex==0" @goStepPage="changePage" :fillinMsg="form"></termfillinPage>
        <termconfirmPage v-if="currentItemIndex==1" @goStepPage="changePage" :confirmMsg="form"></termconfirmPage>
        <termresultPage v-if="currentItemIndex==2" :resultMsg="form" @goStepPage="changePage"></termresultPage>
      </div>
    </div>
  </ynet-content>
</template>


<script>
  import termfillinPage from './components/termfillinPage'    //填充存入开立信息表单
  import termconfirmPage from './components/termconfirmPage'    //交易确认页面
  import termresultPage from './components/termresultPage'    //交易完成页面

  export default {
    name:'termcashdeposit',
    components:{
      termfillinPage,
      termconfirmPage,
      termresultPage
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