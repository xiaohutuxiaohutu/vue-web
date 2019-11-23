<template>
    <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
     <!--面包屑-->
      <ynet-breadcrumb></ynet-breadcrumb>
      <!--面包屑--end-->
      <div class="functionalArea">
        <div class="contentTab">
          <a href="javascript:;" class="current">手工录入</a>
          <a href="#/transpay/transacc/file">文件录入</a>
        </div>
        <div class="p20">
          <!--进度条-->
          <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
          <!--进度条--end-->   
          <entrystep1 v-if="stepIndex=='0'" @changeStep="changeStep" :formData="formData"></entrystep1>
          <entrystep2 v-if="stepIndex=='1'" @changeStep="changeStep" :formData="formData"></entrystep2>
          <entrystep3 v-if="stepIndex=='2'" @changeStep="changeStep" :formData="formData"></entrystep3>        
        <!-- 溫馨提示 -->
        <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
        <!-- 溫馨提示end -->   
        </div>       
      </div>
        
    </ynet-content>
</template>

<script>  
import entrystep1 from './components/entrystep1';
import entrystep2 from './components/entrystep2';
import entrystep3 from './components/entrystep3';
  export default {
    name:'batchtrans',
    components:{
      entrystep1,
      entrystep2,
      entrystep3,
    },
    data(){
      return{
      warmTips: [
        '1.您可通过该功能手工导入多条转账记录，进行转账操作；',
        '2.带“*”的输入项为必输项；',
        '3.本模块仅受理人民币项下业务，暂不支持外币处理，不便之处，敬请见谅；',
        '4.如果您选择的是行内转账汇款“次日转账”方式，则您的交易将于第2天上午转出；',
        '5.如果您选择的是跨行转账汇款“次日转账”方式，则您提交的交易将于第2个工作日上午转出。'
      ],
       stepText:["填写信息","确认转账信息","提交结果"],
       stepIndex:0,
       formData:{},
       form:{},
      }
    },
     methods: {
     changeStep(index,formData){
      let _this=this
      _this.stepIndex=Number(index)
      if(formData) _this.formData=formData
      _this.$tools.scrollTop()
     },
     
  },
  
}

</script>