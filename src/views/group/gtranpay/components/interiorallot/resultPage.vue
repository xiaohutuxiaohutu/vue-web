<template>
  <div>
    <div class="success tac mt20 mb20">
      <img src="../../../../../images/common/success.png" />
      <p><strong class="f18">您的交易已成功提交 !</strong></p>
    </div>
    <section class="mt10">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light"><b>交易信息</b></div></el-col>
      </el-row>
      <div class="tableData">
        <table>
          <tr>
            <th>网银流水号：</th>
            <td v-if="resultMsg.flowNo">{{resultMsg.flowNo}}</td>
            <td v-else="resultMsg.flowNo">221321321321</td>
          </tr>
          <tr>
            <th>交易状态：</th>
            <td>{{resultMsg.txnState}}</td>
          </tr>
        </table>
      </div>
    </section>
    <section class="mt10">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light"><b>交易状态图</b></div></el-col>
      </el-row>
      <el-steps style="margin: 20px 25%;">
        <el-step title="交易录入" icon="edit" status="finish"></el-step>
        <el-step title="审批" icon="document" status="progress"></el-step>
        <el-step title="提交银行处理" icon="upload"></el-step>
      </el-steps>
    </section>
    <section class="mt10">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light"><b>转账基本信息</b></div></el-col>
      </el-row>
      <div class="tableData">
        <table>
          <tr>
            <th>转出子公司账号户名：</th>
            <td>{{resultMsg.transFromAcctName}}</td>
            <th>转入子公司户名：</th>
            <td>{{resultMsg.transToAcctName}}</td>
          </tr>
          <tr>
            <th>转出子公司账号：</th>
            <td>{{resultMsg.transFromAcctNum}}</td>
            <th>转入子公司账号：</th>
            <td>{{resultMsg.transToAcctNum}}</td>
          </tr>
          <tr>
            <th>转出子公司开户行：</th>
            <td>{{resultMsg.transFromBranch}}</td>
            <th>转入子公司开户行：</th>
            <td>{{resultMsg.transToBranch}}</td>
          </tr>
          <tr>
            <th>转账金额：</th>
            <td>{{resultMsg.amount}}</td>
            <th>金额大写：</th>
            <td>{{$tools.utils.toChinese(resultMsg.amount)}}</td>
            <!--<td>{{resultMsg.amountInChinese}}</td>-->
          </tr>
          <tr>
            <th>手续费（参考）:</th>
            <td>{{resultMsg.transFee}}</td>
            <th>金额大写：</th>
            <td>{{$tools.utils.toChinese(resultMsg.transFee)}}</td>
            <!--<td>{{resultMsg.feeInChinese}}</td>-->
          </tr>
          <tr>
            <th>付款用途：</th>
            <td>{{resultMsg.purpose}}</td>
          </tr>
          <tr>
            <th>附言：</th>
            <td>{{resultMsg.comments}}</td>
            <th>备注：</th>
            <td>{{resultMsg.remarks}}</td>
          </tr>
        </table>
      </div>
    </section>
    <el-row class="mt20">
      <el-col :span="24" align="middle">
          <div class="mt10 mb20">
              <el-button type="primary" @click="reload">继续转账</el-button>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .tableData table th{
    background-color: white;
    font-weight: normal;
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
  name: 'resultPage',
  props: {
    resultMsg:{
      type: Object
    }
  },
  data(){
    return {
      otherRoute: ''
    }
  },
  methods: {
    reload(){
      this.$router.go(0) 
    }
  }
}
</script>