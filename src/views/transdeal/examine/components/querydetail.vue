<template>
  <el-form class="formEmbedTable">
    <div class="tableData p20">
      <table>
        <tr>
          <td>账户：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.TERMNAME}}
            </el-form-item>
          </td>
          <td>利率：</td>
          <td>
            <el-form-item>
              {{detailMsg.TERMACC}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>账户名称：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.DEPNO}}
            </el-form-item>
          </td>
          <td>状态：</td>
          <td>
            <el-form-item>
              {{detailMsg.TERMACC}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>存期：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.TERMNAME}}
            </el-form-item>
          </td>
          <td>币种：</td>
          <td>
            <el-form-item>
              {{detailMsg.TERMOPENBANK}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>定期本金：</td>
          <td>
            <el-form-item  prop="input1">
             {{detailMsg.EXPDTRANSTYPE}}
            </el-form-item>
          </td>
          <td>起息日：</td>
          <td>
            <el-form-item>
              {{detailMsg.DEPTERM}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>大写：</td>
          <td>
            <el-form-item  prop="input1">
             {{detailMsg.RATE}}
            </el-form-item>
          </td>
          <td>到期日：</td>
          <td>
            <el-form-item>
             {{detailMsg.CCY}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>开户网点：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
          <td>备注：</td>
          <td>
            <el-form-item>
            {{$tools.utils.toChinese(detailMsg.AMT)}}
            </el-form-item>
          </td>
        </tr>
         <tr>
          <td>网银流水号：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
          <td>交易状态：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>交易类型：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
          <td>预约时间：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>提交人：</td>
          <td>
            <el-form-item  prop="input1">
              {{detailMsg.AMT}}
            </el-form-item>
          </td>
          <td>提交时间：</td>
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
  name: 'querydetail',
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