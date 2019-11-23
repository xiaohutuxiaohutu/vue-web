<template>
  <div class="entryStep3">
    <!--4格布局table-->
    <div class="tableForm mt20">
      <h3>转账结果</h3>
      <div class="transactionStatus" v-if="NO=='1' ">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15" id="resultMsg">您的交易已成功提交！</span>
      </div>
	<div class="formEmbedTable mt20" >
      <div class="fourForm tableForm mt20"  v-if="NO=='0'">
        <table>
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
    </div>
    <!--4格布局table--end-->
    <div v-if="success">
      <!--4格布局table-->
      <div class="fourForm tableForm mt20">
        <h3>交易信息</h3>
        <el-form ref="form1">
          <el-row>
            <el-form-item label="网易流水号" class="fullLine">
              {{patchNo}}
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="交易状态" class="fullLine">
                                等待授权
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <!--4格布局table--end-->
      <!--4格布局table-->
      <div class="tableForm mt20">
        <h3>交易状态图</h3>
        <div class="transactionStatus">
          <ynet-transaction-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-transaction-bar>
        </div>
      </div>
    </div>
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submitForm()">继续转账</el-button>
    </div>
    <!--4格布局table--end-->
    
  </div>
</template>

<script>
export default {
  name:'entryStep2',
  components: {
  },
  data() {
    return {
      patchNo:"",
      stepText:["交易录入","审批","提交银行处理"],
      stepIndex:1,
      success:true,
      NO:"1",
      errorCode:'',
      errorMsg:''
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
    //console.log("_this.formData.patchNo",_this.formData.patchNo)
    if(_this.formData.errorCode == undefined){
      _this.patchNo = _this.formData.patchNo
      _this.NO='1'
    }else{
    _this.errorCode=_this.formData.errorCode
    _this.errorMsg=_this.formData.errorMsg
      _this.success = false
      _this.NO='0'
      $("#resultMsg").html("交易失败！")
    }
  }
}
</script>
