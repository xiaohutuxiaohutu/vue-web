<template>
  <el-form class="formEmbedTable">
    <div class="tableData p20">
      <table>
        <tr>
          <td>账号：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.TERMNAME}}
            </el-form-item>
          </td>
          <td>转账类型：</td>
          <td>
            <el-form-item>
              {{detailMsg.TERMACC}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>制单人：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.DEPNO}}
            </el-form-item>
          </td>
          <td>制单时间：</td>
          <td>
            <el-form-item>
              {{detailMsg.TERMACC}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>交易时间：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.TERMNAME}}
            </el-form-item>
          </td>
          <td>指令状态：</td>
          <td>
            <el-form-item>
              {{detailMsg.TERMOPENBANK}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>备注：</td>
          <td>
            <el-form-item  prop="input1">
             {{detailMsg.EXPDTRANSTYPE}}
            </el-form-item>
          </td>
          <td>银行反馈信息：</td>
          <td>
            <el-form-item>
              {{detailMsg.DEPTERM}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>付款账号户名：</td>
          <td>
            <el-form-item  prop="input1">
             {{detailMsg.RATE}}
            </el-form-item>
          </td>
          <td>收款账号户名：</td>
          <td>
            <el-form-item>
             {{detailMsg.CCY}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>付款账号：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
          <td>收款账号：</td>
          <td>
            <el-form-item>
            {{$tools.utils.toChinese(detailMsg.AMT)}}
            </el-form-item>
          </td>
        </tr>
         <tr>
          <td>付款账号开户行：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
          <td>收款账号开户行：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>转账金额：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
          <td>金额大写：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>手续费：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
          <td>金额大写：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>付款用途：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
          <td>金额大写：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
        </tr>
      </table>
    </div>
  </el-form>
  
</template>


<script>
export default {
  name: 'detail',
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