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
          <el-form-item label="网银流水号：" class="fullLine">
              {{resultMsg.sequenceNo}}
          </el-form-item>
            </el-row>
            <el-row>
          <el-form-item label="交易状态：" class="fullLine" >
            {{resultMsg.status}}
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
     <el-form class="formEmbedTable">
       <table>
         <caption>标题</caption>
          <tr>
            <td>转出母公司账号户名</td>
            <td>
              <el-form-item>
                {{resultMsg.payAccountName}}
              </el-form-item>
            </td>
            <td>转入子公司户名</td>
            <td>
              <el-form-item>
                {{resultMsg.recName}}
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>转出母公司账号</td>
            <td>
              <el-form-item>
                {{resultMsg.payAccountNo}}
              </el-form-item>
            </td>
            <td>转入子公司账号</td>
            <td>
              <el-form-item>
                {{resultMsg.recAccount}}
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>转出母公司开户行</td>
            <td>
              <el-form-item>
                {{resultMsg.payOpenName}}
              </el-form-item>
            </td>
            <td>转入子公司开户行</td>
            <td>
              <el-form-item>
                {{resultMsg.recopenName}}
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>转账金额</td>
            <td>
              <el-form-item>
                {{resultMsg.transAmount}}
              </el-form-item>
            </td>
            <td>金额大写</td>
            <td>
              <el-form-item>
                {{$tools.utils.toChinese(resultMsg.transAmount)}}
              </el-form-item>
            </td>
          </tr>
          <!--<tr>
            <td>手续费</td>
            <td>
              <el-form-item  prop="input1">
                
              </el-form-item>
            </td>
            <td>金额大写</td>
            <td>
              <el-form-item>
                
              </el-form-item>
            </td>
          </tr>-->
          <tr>
            <td>付款用途</td>
            <td colspan="3">
              <el-form-item v-if="resultMsg.purposeOther==''">
                {{resultMsg.purposeName}}
              </el-form-item>
              <el-form-item v-if="resultMsg.purposeOther!=''">
                {{resultMsg.purposeOther}}
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>附言</td>
            <td>
              <el-form-item>
                {{resultMsg.postscript}}
              </el-form-item>
            </td>
            <td>备注</td>
            <td>
              <el-form-item>
                {{resultMsg.remark}}
              </el-form-item>
            </td>
          </tr>
       </table>
     </el-form>
    <!--4格布局table--end-->
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm">继续转账</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  components: {
  },
  props: {
		resultMsg:{
      type: Object
    }
  },
  data() {
    return {
      stepText:["交易录入","审批","提交银行处理"],
      
      stepIndex:1,
    }
  },
  methods: {
    submitForm() {
      let _this = this
      _this.$emit("changeStep",0,{})
    }
  },
}
</script>
