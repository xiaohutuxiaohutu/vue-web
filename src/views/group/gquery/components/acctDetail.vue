<template>
  <el-form class="formEmbedTable">
    <div class="tableData p20">
      <table>
        <tr>
          <td>账号：</td>
          <td>
            <el-form-item  prop="">
              {{detailMsg.accNo}}
            </el-form-item>
          </td>
          <td>账户类型：</td>
          <td>
            <el-form-item>
              {{detailMsg.accTypeDesc}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>账号名称：</td>
          <td>
            <el-form-item  prop="">
              {{detailMsg.acctName}}
            </el-form-item>
          </td>
          <td>账户性质：</td>
          <td>
            <el-form-item>
              {{$tools.dict.accNoAttrType(detailMsg.accAttr)}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>账户余额：</td>
          <td>
            <el-form-item  prop="">
              {{$tools.utils.currencyFormat(detailMsg.stmtBal)}}
            </el-form-item>
          </td>
          <td>币种：</td>
          <td>
            <el-form-item>
              {{$tools.dict.currTypeDict(detailMsg.moneyTp)}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>可用余额：</td>
          <td>
            <el-form-item  prop="">
              {{$tools.utils.currencyFormat(detailMsg.avlBal)}}
            </el-form-item>
          </td>
          <td>状态：</td>
          <td>
            <el-form-item>
              <template scope="scope">
                <span v-if="detailMsg.acctState=='0'">正常</span>
                <span v-if="detailMsg.acctState=='1'">解挂</span>
              </template>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>冻结金额：</td>
          <td>
            <el-form-item  prop="">
              {{$tools.utils.currencyFormat(detailMsg.freezeBal)}}
            </el-form-item>
          </td>
          <td>开户日期：</td>
          <td>
            <el-form-item>
             {{$tools.utils.formatDateSymbol(detailMsg.openAccDate,'YYYY-MM-DD')}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>开户网点：</td>
          <td colspan="3">
            <el-form-item  prop="">
              {{detailMsg.openAccOrg}}
            </el-form-item>
          </td>
        </tr>
      </table>
    </div>
  </el-form>
  
</template>


<script>
export default {
  name: 'acctDetail',
  props: {
    detailMsg:{
      type: Object
    }
  },
  mounted(){
      let _this = this
      let queryData = {}
      queryData.brhId = _this.detailMsg.openAccOrg
      console.log("queryData.brhId",queryData.brhId)
      _this.$tools.request(_this, "CB060107.do", queryData).then(
        data => {
          if ('0' == data.body.errorCode) {
            _this.detailMsg.openAccOrg = data.body.brhName
          } else {
            _this.detailMsg.openAccOrg = '--'
          }
        }
      )
    },
  data(){
    return {

    }
  }
}
</script>