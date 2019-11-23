<template>
  <div class="printArea">
    <el-form class="formEmbedTable">
      <table>
        <tr>
          <td>付款账号：</td>
          <td>{{list.termDetailList[0].payAcc}}</td>
        </tr>
        <tr>
          <td>付款账户名：</td>
          <td>{{list.termDetailList[0].payAccName}}</td>
        </tr>
        <tr>
          <td>定期存款账号：</td>
          <td>{{list.termDetailList[0].accNo}}</td>
        </tr>
        <tr>
          <td>定期存款户名：</td>
          <td>{{list.termDetailList[0].accName}}</td>
        </tr>
        <tr>
          <td>存期：</td>
          <td>{{$tools.dict.getDepTerm(list.termDetailList[0].depTerm+'-'+list.termDetailList[0].depTermTp)}}</td>
        </tr>
        <tr>
          <td>利率：</td>
          <td>{{list.termDetailList[0].interestRate}}</td>
        </tr>
        <tr>
          <td>转入金额：</td>
          <td>{{$tools.utils.toDecimalString(list.termDetailList[0].transAmount,true,2)}}</td>
        </tr>
        <tr>
          <td>大写：</td>
          <td>{{$tools.utils.toChinese(list.termDetailList[0].transAmount)}}</td>
        </tr>
        <tr>
          <td>到期约转方式：</td>
          <td v-if="list.termDetailList[0].autoTransDepIndex=='O'">本息转存定期</td>
          <td v-if="list.termDetailList[0].autoTransDepIndex=='W'">本金转存定期</td>
        </tr>
        <tr>
          <td>备注：</td>
          <td>{{list.termDetailList[0].transDesc}}</td>
        </tr>
      </table>
    </el-form>
  </div>
</template>


<script>
export default {
  name: 'termDepositInDetail',
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