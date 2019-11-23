<template>
  <div class="templateStep3">
    <!--4格布局table-->
    <div class="tableForm mt20">
      <h3>转账结果</h3>
      <div class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15">您的交易已成功提交！</span>
      </div>
    </div>
    <!--4格布局table--end-->
    <div class="fourForm tableForm mt20">
      <h3>交易信息</h3>
      <el-form ref="">
        <el-row>
          <el-form-item label="交易编号：" class="fullLine">
              {{resultMsg.taskNo}}
          </el-form-item>
            </el-row>
            <el-row>
          <el-form-item label="交易状态：" class="fullLine" >
            <span v-if="resultMsg.state=='5'">待审批</span>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!--4格布局table-->
    <div class="tableForm mt20">
      <h3>交易状态图</h3>
      <div class="transactionStatus">
        <ynet-transaction-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-transaction-bar>
      </div>
    </div>
    <!--4格布局table--end-->
    <!--4格布局table-->
    <div class="fourForm tableForm mt20">
      <!--table1布局-->
    <el-form class="formEmbedTable mb20">
      <table>
        <caption>基本信息</caption>
        <tr>
          <td>归集计划主题</td> 
          <td colspan="3">
            <el-form-item>
              {{resultMsg.taskTheme}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>付款账号：</td>
          <td colspan="3">
            <el-form-item>
              {{resultMsg.payAccountNo}}
            </el-form-item>      
          </td>
          <td>用途：</td>
            <td>
              <el-form-item>
                资金归集
              </el-form-item>
            </td>
        </tr>
         <tr>
          <td>归集方式：</td>
          <td colspan="3">
            <el-form-item v-if="resultMsg.mode=='0'">即时生效</el-form-item>
            <el-form-item v-if="resultMsg.mode=='1'">周期性归集</el-form-item>
          </td>
          <td>归集类型：</td>
            <td>
              <el-form-item v-if="resultMsg.cycleType=='0' && resultMsg.mode=='1'">按日</el-form-item>
              <el-form-item v-if="resultMsg.cycleType=='1' && resultMsg.mode=='1'">按周</el-form-item>
              <el-form-item v-if="resultMsg.cycleType=='2' && resultMsg.mode=='1'">按月</el-form-item>
            </td> 
        </tr>
        <tr>
          <td>生效日期：</td>
          <td colspan="3">
            <el-form-item>
              {{$tools.utils.formatDateSymbol(resultMsg.effectDate)}}
            </el-form-item>
          </td>
          <td>终止条件：</td>
          <td>
            <el-form-item v-if="resultMsg.endCondition=='0' && resultMsg.mode=='1'">永久有效</el-form-item>
            <el-form-item v-if="resultMsg.endCondition=='1' && resultMsg.mode=='1'">按日期</el-form-item>
            <el-form-item v-if="resultMsg.endCondition=='2' && resultMsg.mode=='1'">按次数</el-form-item>
          </td>
        </tr>
        <!--<tr>
          <td>手续费（参考）：</td>
          <td colspan="3">
            <el-form-item>
              
            </el-form-item>
          </td>
          <td>金额大写：</td>
          <td>
            <el-form-item>
              
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>付款用途：</td>
          <td colspan="3">
            <el-form-item>
              
            </el-form-item>
          </td>
          <td>预约处理日期：</td>
          <td>
            <el-form-item>
              
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>附言：</td>
          <td colspan="3">
            <el-form-item>
              
            </el-form-item>
          </td>
          <td>备注：</td>
          <td>
            <el-form-item>
              
            </el-form-item>
          </td>
        </tr>-->
      </table>
    </el-form>
    <!--table1布局-->
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="preStep()">返回</el-button>
      </div>
    </div>
    <!--4格布局table--end-->
  </div>
</template>

<script>
export default {
  name:'resultPage',
  components: {
  },
  props:{
    resultMsg:{
      type:Object,default:{}
    }
  },
  data() {
    return {
      stepText:["交易录入","审批","提交银行处理"],
      stepIndex:1,
    }
  },
  
  methods: {
    preStep() {
      let _this=this
      _this.$emit("changeStep","0",{})
    }
  },
  mounted(){ 
    let _this = this
  }
}
</script>
