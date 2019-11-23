<template>
  <el-form class="formEmbedTable">
    <div class="tableData printArea">
      <table>
        <tr>
          <td>付款账户：</td>
          <td>
            <el-form-item prop="input1">
              {{list.depositCashList[0].payAcc}}
            </el-form-item>
          </td>
          <td>交易金额：</td>
          <td>
            <el-form-item>
              {{$tools.utils.toDecimalString(list.depositCashList[0].amt,true,2)}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>付款账户名称：</td>
          <td>
            <el-form-item prop="input1">
              {{list.depositCashList[0].payAccName}}
            </el-form-item>
          </td>
          <td>状态：</td>
          <td>
            <el-form-item>
              {{$tools.dict.statusTrans(list.depositCashList[0].stt)}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>币种：</td>
          <td>
            <el-form-item prop="input1">
             {{$tools.dict.currTypeDict(list.depositCashList[0].currency)}}
            </el-form-item>
          </td>
          <td>制单人：</td>
          <td>
            <el-form-item>
              {{list.depositCashList[0].userName}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>提交时间：</td>
          <td>
            <el-form-item prop="input1">
              {{list.depositCashList[0].submitTime}}
            </el-form-item>
          </td>
          <td>保证金类型</td>
          <td>
            <el-form-item>
              {{list.depositCashList[0].rcvAccTypeName}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>保证金账号：</td>
          <td>
            <el-form-item prop="input1">
              {{list.depositCashList[0].rcvAcc}}
            </el-form-item>
          </td>
          <td>备注：</td>
          <td>
            <el-form-item>
              {{list.depositCashList[0].remark}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>网银流水号：</td>
          <td>
            <el-form-item prop="input1">
              {{list.depositCashList[0].flowNo}}
            </el-form-item>
          </td>
          <td>保证金账户名称：</td>
          <td>
            <el-form-item prop="input1">
              {{list.depositCashList[0].rcvAccName}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>交易类型：</td>
          <td>
            <el-form-item prop="input1">
              {{$tools.dict.funTransType(list.depositCashList[0].bsnCode)}}
            </el-form-item>
          </td>
          <td>用途：</td>
          <td>
            <el-form-item prop="input1">
              {{list.depositCashList[0].purpose}}
            </el-form-item>
          </td>
        </tr>
        <tr v-if="list.depositCashList[0].depTerm">
          <td>存期：</td>
          <td>
            <el-form-item prop="input1">
              {{$tools.dict.getDepTerm(list.depositCashList[0].depTerm+'-'+list.depositCashList[0].depTermTp)}}
            </el-form-item>
          </td>
          <td>利率：</td>
          <td>
            <el-form-item prop="input1">
              {{list.depositCashList[0].rate}}
            </el-form-item>
          </td>
        </tr>
      </table>
    </div>
  </el-form>
</template>


<script>
export default {
  name: 'currCashDetail',
  props: {
    list: {
      type: Object
    }
  },
  data() {
    return {
      rejectdialogVisible: false,
      authflag: '0',
      rejReason: '',
      authFlag: '',
      rules: {
        rejReason: [{ message: '请填写拒绝原因', trigger: 'change', required: true }]
      }
    }
  },
  mounted() {
  },
  methods: {
    close(body) {
      if (body === null || body === undefined || body === '') {
        this.$emit("close")
      } else {
        this.$emit("close", [body])
      }
    },
  }
}
</script>