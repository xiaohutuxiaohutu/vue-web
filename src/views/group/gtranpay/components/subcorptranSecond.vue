<template>
  <div class="fourForm tableForm mt20">
    <h3>转账基本信息</h3>
      <el-form >
	    <el-row>
          <el-form-item label="付款账号户名：">
            {{confirmMsg.payAccountName}}
          </el-form-item>
          <el-form-item label="收款款账号户名：">
           {{confirmMsg.recName}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="付款账号：">
           {{confirmMsg.payAccountNo}}
          </el-form-item>
          <el-form-item label="收款账号：">
            {{confirmMsg.recAccount}}
          </el-form-item>
        </el-row>
		<el-row>
          <el-form-item label="付款账号开户行：">
           	创兴银行
          </el-form-item>
          <el-form-item label="收款账号开户行：">
           <span v-if="confirmMsg.transferType =='0' ">{{confirmMsg.branchName}}</span>
            <span v-if="confirmMsg.transferType =='1' ">{{confirmMsg.recopenNode}}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="转账金额：">
            {{confirmMsg.transAmount}}<span>(元)</span>
          </el-form-item>
          <el-form-item label="大写金额：">
            {{$tools.utils.toChinese(confirmMsg.transAmount)}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="手续费（参考）：">
           <span v-if="confirmMsg.transferType =='0' ">免手续费</span>
           <span v-if="confirmMsg.transferType =='1' ">{{confirmMsg.feeWithDiscount}}元</span>
          </el-form-item>
          <el-form-item label="大写金额：">
            <span v-if="confirmMsg.transferType =='0' ">免手续费</span>
             <span v-if="confirmMsg.transferType =='1' "> {{$tools.utils.toChinese(confirmMsg.feeWithDiscount)}}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="付款用途：">
             <span v-if="confirmMsg.purposeName!='其它'">{{confirmMsg.purposeName}}</span>
             <span v-else>{{confirmMsg.purposeOther}}</span>
          </el-form-item>
          <el-form-item label="预约处理日期：">
            <span v-if="confirmMsg.bespeakDateChange !='' "> {{$tools.utils.formatDate(confirmMsg.bespeakDateChange,{"symbol":"YYYY-MM-DD"})}}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="附言：">
           {{confirmMsg.postscript}}
          </el-form-item>
          <el-form-item label="备注：">
           
          </el-form-item>
        </el-row>
    </el-form>
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="preStep()">上一步</el-button>
      </div>
  </div>
</template>
<script>
 export default{
	 name:'intelligentTransferThird',
	 components:{
		 
	 },
	  props: {
		    confirmMsg:{
		      type: Object
		    }
		  },
	 data() {
		 return{
			 currentItemIndex:2
			
		 }
	 },
	 methods:{
		   preStep(){
			      let _this=this
			      _this.$emit("goStepPage","0")
		   },
		   endSublmit(){
			   	let _this = this
					let userStorge = _this.$tools.storage.get("user","save")
					let cstNo = userStorge.cstNo
					let userId = userStorge.eCIFID
					let newDate = [
						{key:'cstNo', value:cstNo},
						{key:'userId', value:userId},
						{key:'payAccountNo', value:_this.confirmMsg.payAccountNo},
						{key:'payAccountName', value:_this.confirmMsg.payAccountName},
						{key:'recAccount', value:_this.confirmMsg.recAccount},
						{key:'recName', value:_this.confirmMsg.recName},
						{key:'transAmount', value:_this.confirmMsg.transAmount}
					]
					let siDate = JSON.stringify(newDate);
					let certNo = userStorge.serialNo
					let ukeyNo = userStorge.uKeySn
					let siAmt = _this.confirmMsg.transAmount
					let siAccountNo = _this.confirmMsg.payAccountNo
					let arrAcc = ["付款账号:",siAccountNo]
					let arrAmt = ["交易金额:",siAmt]
					let keyFlag = _this.$ukey
					if(keyFlag == true || keyFlag == 'true'){
						let flag = getSignData(arrAcc,arrAmt,siDate,certNo,ukeyNo)
						if(flag == false || flag == 'false'){
							//this.$alert('UKey签名失败,请重新再试', '温馨提示')
							return
						} 
						let signData = document.getElementById("signData").value.toString()
						_this.confirmMsg.signedData = signData
					}
					_this.$tools.request(_this,"CB040208.do",_this.confirmMsg).then( data => {
								//下一步，交易结果页面
								let errorCode=data.body.errorCode
								let errorMsg=data.body.errorMsg
										if(errorCode=='0'){
											_this.confirmMsg.sequenceNo=data.body.sequenceNo
											_this.confirmMsg.status="成功"
											_this.$emit("goStepPage","2",_this.form)
										}else{
											_this.$alert(errorMsg, errorCode, {confirmButtonText: '确定'});
											// this.confirmMsg.sequenceNo="无"
											// _this.confirmMsg.status="失败"
											// _this.$emit("goStepPage","2",_this.form)
										}
									
						})
		   },
	       submitForm(){
			   let _this=this
			   let body={}
			   body.accountNo=_this.confirmMsg.payAccountNo
			   _this.$tools.request(_this,"CB000012.do",body).then(
				    		data=>{
				    				let errorCode=data.body.errorCode
					    			if(errorCode =='0'){
					    				let daySumCorpor = data.body.daySumCorpor
					    				let daySumPerson = data.body.daySumPerson
					    				let corpor='1000000';//对公100万
					    				let person='300000';//对私30万
 										if(_this.confirmMsg.companyFlag=='0'){
 											if(Number(daySumCorpor)>Number(corpor)){
 												        this.$confirm('你当日对公累计交易金额已经达到100万, 请确认是否继续转账?', '温馨提示', {
 												          confirmButtonText: '确定',
 												          cancelButtonText: '取消',
 												          type: 'warning'
 												        }).then(() => {
 												        	_this.endSublmit()
 												        }).catch(() => {
 												              
 												        });
 											}else{
 												 _this.endSublmit()
 											}
 										}else{
 											if(Number(daySumPerson)>Number(person)){
 										       this.$confirm('你当日对私累计交易金额已经达到30万, 请确认是否继续转账?', '温馨提示', {
											          confirmButtonText: '确定',
											          cancelButtonText: '取消',
											          type: 'warning'
											        }).then(() => {
											        	_this.endSublmit()
											        }).catch(() => {
											              
											        });
 											}else{
 												_this.endSublmit()
 											}
 										}
					    			}
				    		     }
				    	     )	
		   }
	 },
	 created(){
		 let _this=this
		// _this.confirmMsg.payAccountName='阿里巴巴'
		 //console.log(this.confirmMsg)
	 }
 }
</script>
