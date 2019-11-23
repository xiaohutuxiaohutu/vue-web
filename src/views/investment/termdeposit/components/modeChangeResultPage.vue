<template>
  <div>
    <div class="tableForm mt20">
      <h3>更改结果</h3>
      <div class="transactionStatus">
        <ynet-icon v-if="form.status=='00'" Type="transactionStatus" NO="1"></ynet-icon>
        <span v-if="form.status=='00'" class="ml15">您的交易已成功提交！</span>

        <ynet-icon v-if="form.status!='00'" Type="transactionStatus" NO="0"></ynet-icon>
        <span v-if="form.status!='00'" class="ml15">交易失败！</span>
      </div>
    </div>
    <div class="twoForm tableForm mt20">
      <h3>交易信息</h3>
      <el-form>
        <el-form-item label="网银流水号">
          <span>{{form.sequenceNo}}</span>
        </el-form-item>
        <el-form-item label="交易状态">
          <span v-if="form.status=='00'">等待授权</span>
          <span v-if="form.status!='00'">交易失败</span>
        </el-form-item>
        <el-form-item label="错误码" v-if="form.status!='00'">
          {{form.errorCode}}
        </el-form-item>
        <el-form-item label="错误信息" v-if="form.status!='00'">
          {{form.errorMsg}}
        </el-form-item>
      </el-form>
    </div>
    <div class="tableForm mt20" v-if="form.status=='00'">
      <h3>交易状态图</h3>
      <div class="transactionStatus">
        <ynet-transaction-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-transaction-bar>
      </div>
    </div>
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="nextStep()">继续修改</el-button>
        <el-button @click="close()">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modeChangeResultPage',
  props: {
    form:{
      type: Object
    }
  },
  data(){
    return {
      stepText:["交易录入","审批","提交银行处理"],
      stepIndex:1
    }
  },
  mounted(){
  },
  methods: {
    nextStep(){
      this.$router.push({name: 'termModeChangeList'})  //向history栈添加一个新记录
    },
    close(){
      this.$router.push({ path: '/my/myMain' })
    }
  }
}
</script>