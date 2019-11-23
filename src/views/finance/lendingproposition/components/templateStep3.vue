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
    <!--4格布局table-->
    <div class="tableForm mt20">
      <h3>交易状态图</h3>
      <div class="transactionStatus">
        <ynet-transaction-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-transaction-bar>
      </div>
    </div>
    <!--4格布局table--end-->
    <!--4格布局table-->
    <div class="twoForm tableForm mt20">
      <h3>交易信息</h3>
      <el-form ref="form1">
          <el-form-item label="网银流水号">
           {{formData.body.lapFlowNo}}
          </el-form-item>
          <el-form-item label="交易状态">
            待审核
          </el-form-item>
      </el-form>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm()">继续录入</el-button>
      </div>
    </div>
    <!--4格布局table--end-->
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
      let body = {}
      body.clear = true
      _this.$emit("changeStep","0",body)
    }
  },
  mounted(){ 
    
  }
}
</script>
