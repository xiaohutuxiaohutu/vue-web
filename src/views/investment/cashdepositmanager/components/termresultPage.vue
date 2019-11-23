<template>
  <div>
    <div class="tableForm mt20">
      <h3>转账结果</h3>
      <div class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span v-if="resultMsg.errorCode=='0'" class="ml15">您的交易已成功提交！</span>
      </div>
    </div>
    <div class="fourForm tableForm mt20">
      <h3>交易信息</h3>
      <el-form>
        <el-row>
          <el-form-item label="网银流水号" class="fullLine">
            {{resultMsg.sequenceNo}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="交易状态" class="fullLine">
            <span>待授权</span>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="tableForm mt20">
      <h3>交易状态图</h3>
      <div class="transactionStatus">
        <ynet-transaction-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-transaction-bar>
      </div>
    </div>
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="nextStep()">继续存入</el-button>
      <el-button @click="$router.push('/my/myMain')">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'currentresultPage',
  props: {
    resultMsg: {
      type: Object
    }
  },
  data() {
    return {
      stepText: ["交易录入", "审批", "提交银行处理"],
      stepIndex: 1
    }
  },
  methods: {
    nextStep() {
      let _this = this
      _this.$emit("goStepPage", [0])
    }
  }
}
</script>