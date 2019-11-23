<template>
  <div class="printArea">
    <el-form class="formEmbedTable">
    
      <table>
        <tr>
          <td>定期存款户名：</td>
          <td>{{list.termDetailList[0].accName}}</td>
          <td>收款人户名：</td>
          <td>{{list.termDetailList[0].recAccName}}</td>
        </tr>
        <tr>
          <td>定期存款账号：</td>
          <td>{{list.termDetailList[0].accNo}}</td>
          <td>收款人账号：</td>
          <td>{{list.termDetailList[0].recAcc}}</td>
        </tr>
        <tr>
          <td>定期存款本金：</td>
          <td>{{$tools.utils.toDecimalString(accBalance,true,2)}}</td>
          <td>币种：</td>
          <td>人民币</td>
        </tr>
        <tr>
          <td>存期：</td>
          <td>{{$tools.dict.getDepTerm(list.termDetailList[0].depTerm)}}</td>
          <td>参考利率：</td>
          <td>{{list.termDetailList[0].interestRate}}</td>
        </tr>
        <tr>
          <td>支取方式：</td>
          <td v-if="list.termDetailList[0].withType==1">全部支取</td>
          <td v-if="list.termDetailList[0].withType==2">部分支取</td>
          <td>起息日：</td>
          <td>{{$tools.utils.formatDate(list.termDetailList[0].valDt,{"symbol":"YYYY-MM-DD"})}}</td>
        </tr>
        <tr>
          <td>转出本金：</td>
          <td>{{$tools.utils.toDecimalString(list.termDetailList[0].transAmount,true,2)}}</td>
          <td>到期日：</td>
          <td>{{$tools.utils.formatDate(list.termDetailList[0].expDt,{"symbol":"YYYY-MM-DD"})}}</td>
        </tr>
        <tr>
          <td>金额大写：</td>
          <td>{{$tools.utils.toChinese(list.termDetailList[0].transAmount)}}</td>
          <td>约转方式：</td>
          <td v-if="list.termDetailList[0].autoTransDepIndex=='O'">本息转存定期</td>
          <td v-if="list.termDetailList[0].autoTransDepIndex=='W'">本金转存定期</td>
        </tr>
      </table>
    </el-form>
  </div>
  
</template>


<script>
export default {
  name: 'termDepositWithdrawDetail',
  props: {
    list:{
      type: Object
    }
  },
  data(){
    return {
      loginStorage:this.$tools.storage.get("user","save"),
      accBalance:''  //定期存款本金
    }
  },
  mounted(){
    let _this = this
    let body={}
    body.accNo = _this.list.termDetailList[0].accNo
    body.depNo = _this.list.termDetailList[0].depNo
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