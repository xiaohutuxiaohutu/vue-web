<template>
  <ynet-content id="termWithdraw" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">到期约转方式更改</h3>
      <div class="p20">
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="currentItemIndex"></ynet-progress-bar>
        <modeChangeFillin v-if="currentItemIndex==0" @goStepPage="changePage" :fillinMsg="form" :turnUpNums="turnUpNums"></modeChangeFillin>
        <modeChangeConfirm v-if="currentItemIndex==1" @goStepPage="changePage" :form="form"></modeChangeConfirm>
        <modeChangeResultPage v-if="currentItemIndex==2" :form="form"></modeChangeResultPage>
      </div>
    </div>
  </ynet-content>
</template>

<script>
  import modeChangeFillin from './components/modeChangeFillin'
  import modeChangeConfirm from './components/modeChangeConfirm'
  import modeChangeResultPage from './components/modeChangeResultPage'
  export default {
    name: 'termModeChange',
    components: {
      modeChangeFillin,
      modeChangeConfirm,
      modeChangeResultPage
    },
    data(){
      return{
        stepText:["填写信息","确认交易信息","提交结果"],
        currentItemIndex:0,
        form: {},
        turnUpNums:0,  //渲染次数
      }
    },
    methods:{
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