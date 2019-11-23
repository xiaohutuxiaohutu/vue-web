<template>
  <div class="printArea">
    <el-form class="formEmbedTable">
      <table>
        <tr>
          <td>通知存款户名：</td>
          <td>{{list.callDetailList[0].accName}}</td>
          <td>通知存款账号：</td>
          <td>{{list.callDetailList[0].accNo}}</td>
        </tr>
        <tr>
          <td>通知存款种类：</td>
          <td>{{$tools.dict.callType(list.callDetailList[0].accTp)}}</td>
          <td>币种：</td>
          <td>人民币</td>
        </tr>
        <tr>
          <td>通知存款本金：</td>
          <td>{{$tools.utils.toDecimalString(accBalance,true,2)}}</td>
          <td>支取日期：</td>
          <td>{{$tools.utils.formatDate(list.callDetailList[0].orderDate,{"symbol":"YYYY-MM-DD"})}}</td>
        </tr>
        <tr>
          <td>金额大写：</td>
          <td>{{$tools.utils.toChinese(accBalance)}}</td>
          <td>预约号：</td>
          <td>{{list.callDetailList[0].orderNo}}</td>
        </tr>
      </table>
    </el-form>
  </div>
</template>


<script>
export default {
  name: 'callDepositCancelDetail',
  props: {
    list:{
      type: Object
    }
  },
  data(){
    return {
      loginStorage:this.$tools.storage.get("user","save"),
      accBalance:''  //通知存款本金
    }
  },
  mounted(){
    let _this = this
    let body={}
    body.accNo = _this.list.callDetailList[0].accNo
    body.depNo = _this.list.callDetailList[0].depNo
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