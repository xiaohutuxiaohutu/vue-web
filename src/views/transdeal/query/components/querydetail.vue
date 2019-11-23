<template>
  <el-form class="formEmbedTable">
    <div class="tableData p20">
      <table>
        <tr>
          <td>付款账户：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.payAccountNo}}
            </el-form-item>
          </td>
          <td>交易金额：</td>
          <td>
            <el-form-item>
              {{detailMsg.amt}}元
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>付款账户名称：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.payAccountName}}
            </el-form-item>
          </td>
          <td>状态：</td>
          <td>
            <el-form-item>
              {{$tools.dict.statusTrans(detailMsg.status)}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>币种：</td>
          <td>
            <el-form-item  prop="input1">
             {{detailMsg.CRY}}
            </el-form-item>
          </td>
          <td>制单人：</td>
          <td>
            <el-form-item>
              {{detailMsg.userName}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>提交时间：</td>
          <td>
            <el-form-item  prop="input1">
             {{detailMsg.submitTime}}
            </el-form-item>
          </td>
          <td>保证金类型</td>
          <td>
            <el-form-item>
             {{detailMsg.recvAccountType}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>保证金账号：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.payeeAcct}}
            </el-form-item>
          </td>
          <td>备注：</td>
          <td>
            <el-form-item>
            {{detailMsg.mark}}
            </el-form-item>
          </td>
        </tr>
         <tr>
          <td>网银流水号：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.flowNo}}
            </el-form-item>
          </td>
          <td>保证金账户名称：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.payee}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>交易类型：</td>
          <td>
            <el-form-item  prop="input1">
              {{$tools.dict.funTransType(detailMsg.bsnCode)}}
            </el-form-item>
          </td>
          <td>用途：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.cdUse}}
            </el-form-item>
          </td>
        </tr>
        <tr v-if="detailMsg.depTerm">
          <td>存期：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.depTerm}}
            </el-form-item>
          </td>
          <td>利率：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.interestRate}}
            </el-form-item>
          </td>
        </tr>
      </table>
    </div>
  </el-form>
  
</template>


<script>
export default {
  name: 'querydetail',
  props: {
    detailMsg:{
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