<template>
  <div>
    <div class="tableForm mt20">
      <h3>转账结果</h3>
      <div class="transactionStatus">
        <ynet-icon v-if="resultMsg.status=='00'" Type="transactionStatus" NO="1"></ynet-icon>
        <span v-if="resultMsg.status=='00'" class="ml15">您的交易已成功提交！</span>

        <ynet-icon v-if="resultMsg.status!='00'" Type="transactionStatus" NO="0"></ynet-icon>
        <span v-if="resultMsg.status!='00'" class="ml15">交易失败！</span>
      </div>
    </div>
    <div class="twoForm tableForm mt20">
      <h3>交易信息</h3>
      <el-form>
        <el-form-item label="网银流水号">
          {{resultMsg.sequenceNo}}
        </el-form-item>
        <el-form-item label="交易状态">
          <span v-if="resultMsg.status=='00'">等待授权</span>
          <span v-if="resultMsg.status!='00'">交易失败</span>
        </el-form-item>
        <el-form-item label="错误码" v-if="resultMsg.status!='00'">
          {{resultMsg.errorCode}}
        </el-form-item>
        <el-form-item label="错误信息" v-if="resultMsg.status!='00'">
          {{resultMsg.errorMsg}}
        </el-form-item>
      </el-form>
    </div>
    <div class="tableForm mt20" v-if="resultMsg.status=='00'">
      <h3>交易状态图</h3>
      <div class="transactionStatus">
        <ynet-transaction-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-transaction-bar>
      </div>
    </div>
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="nextStep()">继续存入</el-button>
        <el-button @click="close()">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resultPage',
  props: {
    resultMsg:{
      type: Object
    }
  },
  data(){
    return {
      stepText:["交易录入","审批","交易结果"],
      stepIndex:1,
      form:{}
    }
  },
  methods: {
    nextStep(){
      let _this = this
      _this.$emit("goStepPage",[0,_this.form])
    },
    close(){
      this.$router.push({ path: '/my/myMain' })
    }
  }
}
</script>