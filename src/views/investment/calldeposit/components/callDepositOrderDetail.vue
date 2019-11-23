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
          <td>预约号：</td>
          <td>
            <el-form-item>
              {{detailMsg.orderNo}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>通知存款户名：</td>
          <td>
            <el-form-item>
              {{detailMsg.enName}}
            </el-form-item>
          </td>
          <td>状态：</td>
          <td>
            <el-form-item>
              <span v-if="detailMsg.recordStt=='N'">未取消通知</span>
              <span v-if="detailMsg.recordStt=='Y'">已取消通知</span>
              <span v-if="detailMsg.recordStt=='D'">已删除</span>
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
              {{$tools.utils.toDecimalString(detailMsg.PNPAmt,true,2)}}
            </el-form-item>
          </td>
          <td>登记日期：</td>
          <td>
            <el-form-item>
              {{$tools.utils.formatDate(detailMsg.rgstDate,{"symbol":"YYYY-MM-DD"})}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>大写：</td>
          <td>
            <el-form-item>
              {{$tools.utils.toChinese(detailMsg.PNPAmt)}}
            </el-form-item>
          </td>
          <td>预约日期：</td>
          <td>
            <el-form-item>
              {{$tools.utils.formatDate(detailMsg.orderDate,{"symbol":"YYYY-MM-DD"})}}
            </el-form-item>
          </td>
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