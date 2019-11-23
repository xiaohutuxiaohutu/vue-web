<template>
  <el-form class="formEmbedTable">
    <div class="tableData p20">
      <table>
        <tr>
          <td>账号：</td>
          <td>
            <el-form-item>
              {{detailMsg.accNo}}
            </el-form-item>
          </td>
          <td>利率：</td>
          <td>
            <el-form-item>
              {{detailMsg.interestRate}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>账号名称：</td>
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
          <td>存期：</td>
          <td>
            <el-form-item>
              {{$tools.dict.getDepTerm(detailMsg.depTerm)}}
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
          <td>定期本金：</td>
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
          <td>到期日：</td>
          <td>
            <el-form-item>
              {{$tools.utils.formatDate(detailMsg.expDt,{"symbol":"YYYY-MM-DD"})}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>开户网点：</td>
          <td>
            <el-form-item>
              {{brhName}}
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
  name: 'termDepositDetail',
  props: {
    detailMsg:{
      type: Object
    }
  },
  data(){
    return {
      brhName: '' //机构名称
    }
  },
  mounted(){
    let _this = this
    _this.$tools.request(_this,"CB000111.do",{brhId:_this.detailMsg.openBankNo}).then(data =>{
      _this.brhName = data.body.branchInfoList[0].brhName
    })
  }
}
</script>