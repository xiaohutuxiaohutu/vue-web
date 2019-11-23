<template>
  <div class="tableData ">
    <el-form class="form p20">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light mb10"><b>收款信息</b></div></el-col>
      </el-row>

      <el-form-item label="转入母公司账号：">{{confirmMsg.parentAcct}}</el-form-item>

      <el-form-item label="收款母公司账户名：">{{confirmMsg.parentAcctName}}</el-form-item>

      <el-form-item label="转账金额：">{{confirmMsg.amount}}</el-form-item>

       <el-form-item label="收款方手机号：" v-if="confirmMsg.phoneNumber">{{confirmMsg.phoneNumber}}</el-form-item>

      <el-form-item label="用途：" v-if="confirmMsg.purpose">{{confirmMsg.purpose}}</el-form-item>

      <el-form-item label="附言：" v-if="confirmMsg.comments">{{confirmMsg.comments}}</el-form-item>

      <el-form-item label="备注：" v-if="confirmMsg.remarks">{{confirmMsg.remarks}}</el-form-item>

      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light mb10"><b>付款信息</b></div></el-col>
      </el-row>

      <el-form-item label="转出子公司组别：">{{confirmMsg.subGroup}}</el-form-item>

      <el-form-item label="转出子公司账号：">{{confirmMsg.subAcct}}</el-form-item>

      <el-form-item label="转出子公司账户名：">{{confirmMsg.subAcctName}}</el-form-item>

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
      let _this = this
      //发送请求
      _this.$tools.request(_this,"groupAction.do",{versionNo:"0.2"}).then(
        data => {
          // do something
          //下一步，交易結果页面
          alert(JSON.stringify(data));
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