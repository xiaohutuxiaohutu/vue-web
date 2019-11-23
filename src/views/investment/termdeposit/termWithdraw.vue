<template>
  <ynet-content id="termWithdraw" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">定期存款支取</h3>
      <div class="p20">
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="currentItemIndex"></ynet-progress-bar>
        <withdrawFillin v-if="currentItemIndex==0" @goStepPage="changePage" :fillinMsg="form" :turnUpNums="turnUpNums"></withdrawFillin>
        <withdrawConfirm v-if="currentItemIndex==1" @goStepPage="changePage" :form="form"></withdrawConfirm>
        <withdrawResultPage v-if="currentItemIndex==2" :form="form"></withdrawResultPage>
      </div>
    </div>
  </ynet-content>
</template>

<script>
  import withdrawFillin from './components/withdrawFillin'  //填充支取开立信息表单
  import withdrawConfirm from './components/withdrawConfirm'  //填充支取开立信息表单
  import withdrawResultPage from './components/withdrawResultPage'  //填充支取开立信息表单

  export default {
    name: 'termWithdraw',
    components: {
      withdrawFillin,
      withdrawConfirm,
      withdrawResultPage
    },
    data(){
      return {
        stepText:["填写信息","确认交易信息","提交结果"],
        currentItemIndex: 0,
        form: {},
        turnUpNums:0,  //渲染次数
      }
    },
    mounted() {
    },
    methods: {
      changePage(val){
        let _this = this
        _this.turnUpNums = _this.turnUpNums+1
        _this.currentItemIndex=val[0]
        if(val[1]){
          _this.form = val[1]
        }
      }
    }
  }
</script>