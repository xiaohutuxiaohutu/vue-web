<template>
   <!--4格布局table-->
	  <div class="tableForm mt20">
      <h3>转账结果</h3>
      <div class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15" >您的交易已成功提交！</span>
      </div>
     <!--4格布局table--end-->
	     <div class="fourForm tableForm mt20">
	      <h3>交易信息</h3>
	      <el-form ref="form1">
	        <el-row>
	          <el-form-item label="网银流水号：" class="fullLine">
	              {{resultMsg.sequenceNo}}
	          </el-form-item>
	           </el-row>
	           <el-row>
	          <el-form-item label="交易状态" class="fullLine" >
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
    	<div class="fourForm tableForm mt20">
		    <h3>转账基本信息</h3>
		      <el-form ref="form">
			    <el-row>
		          <el-form-item label="付款账号户名：">
		              {{resultMsg.payAccountName}}
		          </el-form-item>
		          <el-form-item label="收款款账号户名：">
		            {{resultMsg.recName}}
		          </el-form-item>
		        </el-row>
		        <el-row>
		          <el-form-item label="付款账号：">
		            {{resultMsg.payAccountNo}}
		          </el-form-item>
		          <el-form-item label="收款账号：">
		            {{resultMsg.recAccount}}
		          </el-form-item>
		        </el-row>
				<el-row>
		          <el-form-item label="付款账号开户行：">
		           	创兴银行
		          </el-form-item>
		          <el-form-item label="收款账号开户行：">
		            <span v-if="resultMsg.transferType =='0' ">{{resultMsg.branchName}}</span>
            		<span v-if="resultMsg.transferType =='1' ">{{resultMsg.recopenNode}}</span>
		          </el-form-item>
		        </el-row>
		        <el-row>
		          <el-form-item label="转账金额：">
		           {{resultMsg.transAmount}}<span>(元)</span>
		          </el-form-item>
		          <el-form-item label="大写金额：">
		            {{$tools.utils.toChinese(resultMsg.transAmount)}}
		          </el-form-item>
		        </el-row>
		        <el-row>
		          <el-form-item label="手续费（参考）：">
		            <span v-if="resultMsg.transferType =='0' ">免手续费</span>
           			<span v-if="resultMsg.transferType =='1' ">{{resultMsg.feeWithDiscount}}元</span>
		          </el-form-item>
		          <el-form-item label="大写金额：">
             	  	<span v-if="resultMsg.transferType =='1' "> {{$tools.utils.toChinese(resultMsg.feeWithDiscount)}}</span>
		          </el-form-item>
		        </el-row>
		        <el-row>
		          <el-form-item label="付款用途：">
		             {{resultMsg._purposeName}}
		          </el-form-item>
		          <el-form-item label="预约处理日期：">
		             <span v-if="resultMsg.bespeakDateChange !='' "> {{$tools.utils.formatDate(resultMsg.bespeakDateChange,{"symbol":"YYYY-MM-DD"})}}</span>
		          </el-form-item>
		        </el-row>
		        <el-row>
		          <el-form-item label="附言：">
		             {{resultMsg.postscript}}
		          </el-form-item>
		          <el-form-item label="备注：">
		          </el-form-item>
		        </el-row>
		    </el-form>
  		</div>
	  	<div class="btnArea mt20 tac">
	        <el-button type="primary" @click="submitForm()">继续转账</el-button>
	    </div>
    </div>
         
</template>
<script>
export default{
	name:'intelligentTransferThird',
	components:{
		
	},
	props: {
		resultMsg:{
	      type: Object
	    }
	  },
	data(){
		return{
			 stepText:["交易录入","审批","提交银行处理"],
		     stepIndex:1,
		     form:{
		    	 seqno:'',
		    	 payAccountNo:''
		     }
		}
	},
	methods:{
		submitForm() {
		      let _this=this
		      _this.$emit("goStepPage","0",{})
		    }
	}
}
</script>