<template>
  <div class="printArea">
    <el-form class="formEmbedTable">
      <table>
        <tr>
          <td>付款账号：</td>
          <td>{{list.callDetailList[0].payAcc}}</td>
        </tr>
        <tr>
          <td>付款账户名：</td>
          <td>{{list.callDetailList[0].payAccName}}</td>
        </tr>
        <tr>
          <td>通知存款账号：</td>
          <td>{{list.callDetailList[0].accNo}}</td>
        </tr>
        <tr>
          <td>通知存款户名：</td>
          <td>{{list.callDetailList[0].accName}}</td>
        </tr>
        <tr>
          <td>通知存款种类：</td>
          <td>{{$tools.dict.callType(list.callDetailList[0].accTp)}}</td>
        </tr>
        <tr>
          <td>币种：</td>
          <td>人民币</td>
        </tr>
        <tr>
          <td>利率：</td>
          <td>{{list.callDetailList[0].interestRate}}</td>
        </tr>
        <tr>
          <td>金额：</td>
          <td>{{$tools.utils.toDecimalString(list.callDetailList[0].transAmount,true,2)}}</td>
        </tr>
        <tr>
          <td>大写：</td>
          <td>{{$tools.utils.toChinese(list.callDetailList[0].transAmount)}}</td>
        </tr>
        <tr>
          <td>备注：</td>
          <td>{{list.callDetailList[0].transDesc}}</td>
        </tr>
      </table>
    </el-form>
  </div>
</template>


<script>
export default {
  name: 'callDepositInDetail',
  props: {
    list:{
      type: Object
    }
  },
  data(){
    return {
    }
  },
  mounted(){
  },
  methods:{
  }
}
</script>