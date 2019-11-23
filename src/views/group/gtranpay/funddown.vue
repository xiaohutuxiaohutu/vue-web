<template>
  <ynet-content id="" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">资金下拨</h3>
      <div class="p20">
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <fundDownfillinPage v-if="stepIndex=='0'" @changeStep="changeStep" :fillinMsg="form"></fundDownfillinPage>
        <fundDownconfirmPage v-if="stepIndex=='1'" @changeStep="changeStep" :confirmMsg="form"></fundDownconfirmPage>
        <fundDownresultPage v-if="stepIndex=='2'" @changeStep="changeStep" :resultMsg="form"></fundDownresultPage>
      </div>
    </div>
  </ynet-content>
</template>

<script>
  import fundDownfillinPage from './components/fundDownfillinPage'    //填充存入开立信息表单
  import fundDownconfirmPage from './components/fundDownconfirmPage'    //交易确认页面
  import fundDownresultPage from './components/fundDownresultPage'    //交易完成页面

  export default {
    name:'fundDown',
    components:{
     fundDownfillinPage,
     fundDownconfirmPage,
     fundDownresultPage
    },
    data() {
      return {
        stepText:["填写信息","确认交易信息","提交结果"],
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