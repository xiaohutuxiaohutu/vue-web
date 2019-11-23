<template>
  <ynet-content id="termDepositIn" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">定期存款存入</h3>
      <div class="p20">
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="currentItemIndex"></ynet-progress-bar>
        <fillinPage v-if="currentItemIndex==0" @goStepPage="changePage" :fillinMsg="form" :turnUpNums="turnUpNums"></fillinPage>
        <confirmPage v-if="currentItemIndex==1" @goStepPage="changePage" :confirmMsg="form"></confirmPage>
        <resultPage v-if="currentItemIndex==2"  @goStepPage="changePage" :resultMsg="form"></resultPage>
      </div>
      <ynet-warm-tips v-if="currentItemIndex==0" :items="warmTips"></ynet-warm-tips>
    </div>
  </ynet-content>
</template>


<script>
  import fillinPage from './components/fillinPage'    //填充存入开立信息表单
  import confirmPage from './components/confirmPage'    //交易确认页面
  import resultPage from './components/resultPage'    //交易完成页面

  export default {
    name:'termDepositIn',
    components:{
      fillinPage,
      confirmPage,
      resultPage
    },
    data() {
      return {
        stepText:["填写信息","确认交易信息","提交结果"],
        warmTips:[
          '1.人民币单位活期转定期存款最低起存金额、最低留存金额均为1万元；',
          '2.企业定、活期账号必须为相同开户名，且该两个账号均已加挂至网上银行；',
          '3.本模块仅受理人民币项下业务，暂不支持外币处理，不便之处，敬请见谅。'
        ],
        currentItemIndex: 0,
        form: {},
        turnUpNums:0,  //渲染次数
      }
    },
    methods: {
      changePage(val){
        let _this = this
        _this.turnUpNums = _this.turnUpNums+1
        _this.currentItemIndex=val[0]
        if(val[1]){
          _this.form=val[1]
        }
      }
    }
  }
</script>