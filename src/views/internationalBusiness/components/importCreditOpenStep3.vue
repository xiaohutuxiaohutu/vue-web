<template>
  <div class="templateStep3">
    <!--4格布局table-->
    <div class="tableForm mt20">
      <h3>转账结果</h3>
      <div class="transactionStatus">
        <ynet-icon v-if="formData.status=='00'" Type="transactionStatus" NO="1"></ynet-icon>
        <span v-if="formData.status=='00'" class="ml15">您的交易已成功提交！</span>

        <ynet-icon v-if="formData.status!='00'" Type="transactionStatus" NO="0"></ynet-icon>
        <span v-if="formData.status!='00'" class="ml15">交易失败！</span>
      </div>
    </div>
    <!--4格布局table--end-->
    <!--table布局-->
    <div class="formEmbedTable mt20">
      <table>
        <caption>汇款信息</caption>
        <tr>
          <td>网银流水号：</td>
          <td>{{formData.sequenceNo}}</td>
        </tr>
        <tr>
          <td>交易状态：</td>
          <td v-if="formData.status=='00'">等待授权</td>
          <td v-if="formData.status!='00'">交易失败</td>
        </tr>
        <tr v-if="formData.status!='00'">
          <td>错误码：</td>
          <td>{{formData.errorCode}}</td>
        </tr>
        <tr v-if="formData.status!='00'">
          <td>错误信息：</td>
          <td>{{formData.errorMsg}}</td>
        </tr>
      </table>
    </div>
    <!--table布局--END-->
    <div class="tableForm mt20" v-if="formData.status=='00'">
      <h3>交易状态图</h3>
      <div class="transactionStatus">
        <ynet-transaction-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-transaction-bar>
      </div>
    </div>
    <div class="btnArea mt20 tac">
      <el-button type="primary" v-if="formData.status=='00'" @click="print()">打印</el-button>
      <el-button @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'templateStep3',
  components: {
  },
  data() {
    return {
      stepText:["交易录入","审批","提交银行处理"],
      stepIndex:1,
      form:{}
    }
  },
  props:{
    formData:{type:Object,default:{}},
  },
  methods: {
    print() {
      let _this = this
      _this.$emit("changeStep","1",_this.formData,true)
    },
    close(){
      this.$router.push({ path: '/my/myMain' })
    }
  },
  mounted(){ 
    
  }
}
</script>
