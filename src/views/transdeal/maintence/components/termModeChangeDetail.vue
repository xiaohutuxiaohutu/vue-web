<template>
  <div class="printArea">
    <el-form class="formEmbedTable">
      <table>
        <tr>
          <td>定期存款客户：</td>
          <td>{{loginStorage.cstNo}}</td>
          <td>定期存款账户：</td>
          <td>{{list.termDetailList[0].accNo}}</td>
        </tr>
        <tr>
          <td>币种：</td>
          <td>人民币</td>
          <td>定期存款金额：</td>
          <td>{{$tools.utils.toDecimalString(accBalance,true,2)}}</td>
        </tr>
        <tr>
          <td>存期：</td>
          <td>{{$tools.dict.getDepTerm(list.termDetailList[0].depTerm)}}</td>
          <td>利率：</td>
          <td>{{list.termDetailList[0].interestRate}}</td>
        </tr>
        <tr>
          <td>起息日：</td>
          <td>{{$tools.utils.formatDate(list.termDetailList[0].valDt,{"symbol":"YYYY-MM-DD"})}}</td>
          <td>到期日：</td>
          <td>{{$tools.utils.formatDate(list.termDetailList[0].expDt,{"symbol":"YYYY-MM-DD"})}}</td>
        </tr>
        <tr>
          <td>约转方式：</td>
          <td colspan="3" v-if="list.termDetailList[0].autoTransDepIndex=='O'">本息续存</td>
          <td v-if="list.termDetailList[0].autoTransDepIndex=='W'">本金续存</td>
          <td v-if="list.termDetailList[0].autoTransDepIndex=='W'"></td>
          <td v-if="list.termDetailList[0].autoTransDepIndex=='W'"></td>
        </tr>
        <tr v-if="list.termDetailList[0].autoTransDepIndex=='W'">
          <td>收款户名：</td>
          <td>{{list.termDetailList[0].thirdAccName}}</td>
          <td>收款账号：</td>
          <td>{{list.termDetailList[0].thirdAccNo}}</td>
        </tr>
      </table>
    </el-form>
  </div>
</template>


<script>
export default {
  name: 'termModeChangeDetail',
  props: {
    list:{
      type: Object
    }
  },
  data(){
    return {
      loginStorage:this.$tools.storage.get("user","save"),
      accBalance:'',  //定期存款本金
    }
  },
  created(){
    let _this = this
    let body={}
    body.accNo = _this.list.termDetailList[0].accNo
    body.depNo =_this.list.termDetailList[0].depNo
    body.cstNo=_this.loginStorage.hostNo
    body.eCIFID=_this.loginStorage.eCIFID
    body.chooseFlag='0'  //查询余额标识
    _this.$tools.request(_this,"CB000001.do",body).then(
      data =>{
        _this.accBalance = data.body.totalAvlBal
      })
  },
  methods:{
  }
}
</script>