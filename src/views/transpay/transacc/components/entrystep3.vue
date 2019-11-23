<template>
  <div class="entryStep3">
    <!--table布局-->
    <div class="formEmbedTable mt20" v-if="success">
      <table>
        <caption>转账结果</caption>
        <tr>
          <td class="tableEvenText">
            <div class="p20">
              <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
              <span class="ml15" id="resultMsg">您的交易已成功提交！</span>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="formEmbedTable mt20" >
      <div class="fourForm tableForm mt20"  v-if="error=='1'">
        <table>
        <caption>转账结果</caption>
        <tr>
          <td class="tableEvenText">
            <div class="p20">
              <ynet-icon Type="transactionStatus" NO="0"></ynet-icon>
              <span class="ml15" id="resultMsg1">交易失败！</span>
            </div>
          </td>
        </tr>
      </table>
	      <el-form ref="form1">
	        <el-row>
	          <el-form-item label="错误码" class="fullLine" >
	          {{errorCode}}
	          </el-form-item>
	        </el-row>
	        <el-row>
	          <el-form-item label="错误信息" class="fullLine" >
	          {{errorMsg}}
	          </el-form-item>
	        </el-row>
	      </el-form>
	    </div>
    </div>
    <!--table布局--END-->
    <!--table布局-->
    <div class="formEmbedTable mt20" v-if="success">
      <table>
        <caption>汇款信息</caption>
        <tr>
          <td>网银流水号：</td>
          <td>{{patchNo}}</td>
        </tr>
        <tr>
          <td>交易状态：</td>
          <td>等待授权</td>
        </tr>
      </table>
    </div>
    <!--table布局--END-->
    <!--table布局-->
    <div class="formEmbedTable mt20" v-if="success">
      <table>
        <caption>交易状态图</caption>
        <tr>
          <td class="tableEvenText">
            <div class="p20"><ynet-transaction-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-transaction-bar></div>
          </td>
        </tr>
      </table>
    </div>
    <!--table布局--END-->
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm()">继续转账</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name:'entryStep2',
  components: {
  },
  data() {
    return {
      stepText:["交易录入","审批","提交银行处理"],
      stepIndex:1,
      patchNo:"",
      success:true,
      error:"0",
      errorCode:'',
      errorMsg:'',
      form1:{
    	  
    	  
      }
    }
  },
  props:{
    formData:{type:Object,default:{}},
  },
  methods: {
    submitForm() {
      let _this=this
      _this.$emit("changeStep","0",{})
    }
  },
  mounted(){ 
    let _this = this
    if(_this.formData.errorCode == undefined){
      _this.patchNo = _this.formData.patchNo
    }else{
      _this.success = false
      _this.error="1"
      _this.errorCode= _this.formData.errorCode
      _this.errorMsg= _this.formData.errorMsg
      _this.NO = _this.formData.errorCode
      $("#resultMsg1").html("交易失败！")
    }
  }
}
</script>
