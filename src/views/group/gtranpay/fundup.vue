<template>
  <ynet-content id="" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">资金上划</h3>
      <div class="p20">
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <fundupfillinPage v-if="stepIndex=='0'" @changeStep="changeStep" :fillinMsg="form"></fundupfillinPage>
        <fundupconfirmPage v-if="stepIndex=='1'" @changeStep="changeStep" :confirmMsg="form"></fundupconfirmPage>
        <fundupresultPage v-if="stepIndex=='2'" @changeStep="changeStep" :resultMsg="form"></fundupresultPage>
      </div>
    </div>
  </ynet-content>
</template>

<script>
  import fundupfillinPage from './components/fundupfillinPage'    //填充存入开立信息表单
  import fundupconfirmPage from './components/fundupconfirmPage'    //交易确认页面
  import fundupresultPage from './components/fundupresultPage'    //交易完成页面

  export default {
    name:'fundup',
    components:{
      fundupfillinPage,
      fundupconfirmPage,
      fundupresultPage
    },
    data() {
      return {
        stepText:["填写信息","确认交易信息","提交结果"],
        warmTips:[
          '1.单位通知存款的最低起存金额人民币为50万元，存款人需一次性存入，可以一次或分次支取。',
          '2.通知存款种类人民币账户有一天通知和七天通知。',
          '3.通知存款存入须签订服务协议。'
        ],
        stepIndex: 0,
        form: {}
      }
    },
    methods: {
      changeStep(index,formData){
        let _this=this
        _this.stepIndex=Number(index)
        if(formData) _this.form=formData
        _this.$tools.scrollTop()
      }
    }
  }
</script>