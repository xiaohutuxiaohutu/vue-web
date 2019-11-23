<template>
  <div class="templateStep3">
    <!--4格布局table-->
    <div class="tableForm mt20">
      <h3>转账结果</h3>
      <div class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15">您的交易已成功提交！</span>
      </div>
    </div>
    <!--4格布局table--end-->
    <!--table布局-->
    <div class="formEmbedTable mt20">
      <table>
        <caption>汇款信息</caption>
        <tr>
          <td>网银流水号：</td>
          <td></td>
        </tr>
        <tr>
          <td>交易状态：</td>
          <td></td>
        </tr>
      </table>
    </div>
    <!--table布局--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submitForm()">打印</el-button>
      <el-button>关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'templateStep2',
  components: {
  },
  data() {
    return {
      stepText:["交易录入","审批","提交银行处理"],
      stepIndex:1,
    }
  },
  props:{
    formData:{type:Object,default:{}},
  },
  methods: {
    submitForm() {
      let _this=this
      _this.$emit("changeStep","0",{})
    }
  },
  mounted(){ 
    
  }
}
</script>
