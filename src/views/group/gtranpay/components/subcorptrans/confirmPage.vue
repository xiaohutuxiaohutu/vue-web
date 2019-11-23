<template>
  <div class="tableData ">
    <el-form class="form p20">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light mb10"><b>收款信息</b></div></el-col>
      </el-row>
      <el-form-item label="收款人账户：">{{confirmMsg.recipientAcctNum}}</el-form-item>

      <el-form-item label="收款人账户名：">{{confirmMsg.recipientAcctName}}</el-form-item>

      <el-form-item label="转账金额：">{{confirmMsg.amount}}</el-form-item>

      <el-form-item label="转账方式：" v-if="confirmMsg.transMode">次日到帐</el-form-item>

       <el-form-item label="收款方手机号：" v-if="confirmMsg.phoneNumber">{{confirmMsg.phoneNumber}}</el-form-item>

      <el-form-item label="用途：" v-if="confirmMsg.purpose">{{confirmMsg.purpose}}</el-form-item>

      <el-form-item label="附言：" v-if="confirmMsg.comments">{{confirmMsg.comments}}</el-form-item>

      <el-form-item label="备注：" v-if="confirmMsg.remarks">{{confirmMsg.remarks}}</el-form-item>

      <!--<el-form-item style="padding-left:35%">
        <el-checkbox label="预约处理" checked=confirmMsg.isReserveHandle disabled></el-checkbox>
        <el-checkbox label="保存收款人" checked=confirmMsg.isSaveRecipient disabled></el-checkbox>
      </el-form-item>-->
      
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light mb10"><b>付款信息</b></div></el-col>
      </el-row>

      <el-form-item label="付款子帐号组别：">{{confirmMsg.draweeGroup}}</el-form-item>

      <el-form-item label="付款账号：">{{confirmMsg.draweeAcctNum}}</el-form-item>

      <el-form-item label="付款账号户名：">{{confirmMsg.draweeAcctName}}</el-form-item>

      <el-form-item  class="tac formBtnArea mt20" align="middle">
        <el-button type="primary" @click="nextStep">提交</el-button>
        <el-button @click="preStep">上一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
  .el-form-item {
    margin-bottom: 10px;
  }
  .grid-content {
    min-height: 36px;
    line-height: 36px;
    padding-left: 10px;
    /*border: solid 1px #eef1f6;*/
  }
  .grid-content b{
    font-size: 14px;
  }
  .bg-purple-light {
    background: #aca2a0;
    color: white;
  }
</style>

<script>
export default {
  name: 'confirmPage',
  props: {
    confirmMsg:{
      type: Object
    }
  },
  data(){
    return {

    }
  },
  methods: {
    nextStep() {
      debugger
      console.log(this.confirmMsg);
      let _this = this
      //发送请求
      _this.$tools.request(_this,".do",_this.form).then(
        data => {
          // do something
          //下一步，交易結果页面
          _this.$emit("goStepPage",[2])
      })
    },
    preStep(){
      let _this = this
      _this.$emit("goStepPage",[0])
    }
  }
}
</script>