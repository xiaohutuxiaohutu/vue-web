<template>
  <el-form class="formEmbedTable">
    <div class="tableData p20">
      <table>
        <tr>
          <td>账户：</td>
          <td>
            <el-form-item>
              {{detailMsg.accNo}}
            </el-form-item>
          </td>
          <td>参考利率：</td>
          <td>
            <el-form-item>
              {{detailMsg.interestRate}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>通知存款户名：</td>
          <td>
            <el-form-item>
              {{detailMsg.accName}}
            </el-form-item>
          </td>
          <td>状态：</td>
          <td>
            <el-form-item>
              <span v-if="detailMsg.accState=='A'">正常</span>
              <span v-if="detailMsg.accState!='A'">冻结</span>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>通知存款类型：</td>
          <td>
            <el-form-item>
              {{$tools.dict.callType(detailMsg.accTp)}}
            </el-form-item>
          </td>
          <td>币种：</td>
          <td>
            <el-form-item>
              {{$tools.dict.CRYTrans(detailMsg.CRY)}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>通知存款本金：</td>
          <td>
            <el-form-item>
              {{$tools.utils.toDecimalString(detailMsg.accBalance,true,2)}}
            </el-form-item>
          </td>
          <td>起息日：</td>
          <td>
            <el-form-item>
              {{$tools.utils.formatDate(detailMsg.openAccDate,{"symbol":"YYYY-MM-DD"})}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>大写：</td>
          <td>
            <el-form-item>
              {{$tools.utils.toChinese(detailMsg.accBalance)}}
            </el-form-item>
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </el-form>
  
</template>


<script>
export default {
  name: 'callDepositDetail',
  props: {
    detailMsg:{
      type: Object
    }
  },
  data(){
    return {

    }
  }
}
</script>