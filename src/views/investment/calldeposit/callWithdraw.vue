<template>
  <ynet-content id="termWithdraw" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">通知存款立即支取</h3>
      <div class="p20">
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="currentItemIndex"></ynet-progress-bar>
        <calldrawFillin v-if="currentItemIndex==0" @goStepPage="changePage" :fillinMsg="form" :turnUpNums="turnUpNums"></calldrawFillin>
        <calldrawConfirm v-if="currentItemIndex==1" @goStepPage="changePage" :form="form"></calldrawConfirm>
        <calldrawResultPage v-if="currentItemIndex==2" :form="form"></calldrawResultPage>
      </div>
    </div>
  </ynet-content>
</template>

<script>
  import calldrawFillin from './components/calldrawFillin'  //填充通知开立信息表单
  import calldrawConfirm from './components/calldrawConfirm'  //确认通知开立信息表单
  import calldrawResultPage from './components/calldrawResultPage'  //成功通知开立信息表单

  export default {
    name: 'callWithdraw',
    components: {
      calldrawFillin,
      calldrawConfirm,
      calldrawResultPage
    },
    data(){
      return {
        stepText:["填写信息","确认交易信息","提交结果"],
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
          _this.form = val[1]
        }
      }
    }
  }
</script>