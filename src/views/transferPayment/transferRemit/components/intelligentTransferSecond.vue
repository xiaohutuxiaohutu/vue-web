<template>
  <div class="fourForm tableForm mt20">
    <h3>转账基本信息</h3>
      <el-form ref="confirmMsg" :model="confirmMsg" :rules="rules">
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
          {{confirmMsg.recBankName}}
          </el-form-item>
          <el-form-item label="收款账号开户行：">
            <span v-if="confirmMsg.transferType =='0' ">{{confirmMsg.branchName}}</span>
            <span v-if="confirmMsg.transferType =='1' ">{{confirmMsg.recopenNode}}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="转账金额：">
             {{$tools.utils.currencyFormat(confirmMsg.transAmount)}}<span>元</span>
          </el-form-item>
          <el-form-item label="大写金额：">
            {{$tools.utils.toChinese(confirmMsg.transAmount)}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="手续费（参考）：">
           <span v-if="confirmMsg.transferType =='0' ">免手续费</span>
           <span v-if="confirmMsg.transferType =='1' "> {{$tools.utils.currencyFormat(confirmMsg.feeWithDiscount)}}元</span>
          </el-form-item>
          <el-form-item label="大写金额：">
            <span v-if="confirmMsg.transferType =='0' ">免手续费</span>
             <span v-if="confirmMsg.transferType =='1' "> {{$tools.utils.toChinese(confirmMsg.feeWithDiscount)}}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="付款用途：">
             {{confirmMsg._purposeName}}
          </el-form-item>
          <el-form-item label="预约处理日期：">
            <span v-if="confirmMsg.bespeakDateChange !='' "> {{$tools.utils.formatDate(confirmMsg.bespeakDateChange,{"symbol":"YYYY-MM-DD"})}} &nbsp;{{confirmMsg.time}}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="附言：">
           {{confirmMsg.postscript}}
          </el-form-item>
          <el-form-item label="备注：">
           {{confirmMsg.mark}}
          </el-form-item>
        </el-row>
         <el-row>
          <el-form-item label="图形验证码：" class="el-form-item fullLine ">
           <img :src="logonImageCode" @click="verifyImage" id="click-verifyImage"  />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="验证码：" class="el-form-item fullLine is-required" prop="vivCode" >
           		<el-input v-model="confirmMsg.vivCode" placeholder="请输入验证码" ></el-input>
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
			 logonImageCode:'',
			 currentItemIndex:2,
			 flagType:'1',
			 rules:{
				 vivCode: [
				           { message: '请输入验证码', trigger:'change', required: true},{min:1,max:4,message:'请输入4位验证码'}
				 ],
			 }
			
		 }
	 },
	 methods:{
		   preStep(){
			      let _this=this
			      _this.$emit("goStepPage","0")
		   },
// 		   //验证码图片
		    verifyImage() {
		      var _this = this
		      let keyWord = Math.random()
		      let payAcc=_this.confirmMsg.payAccountNo
		      let payeeName=_this.confirmMsg.payAccountName
		      let transAmount=_this.$tools.utils.currencyFormat(_this.confirmMsg.transAmount)//_this.confirmMsg.transAmount
		      let userId=_this.confirmMsg.userId
		      let iCIFID=_this.$tools.storage.get("user","save").iCIFID
		      let _bsnCode='CB020102'
		      _this.logonImageCode="/api/CB000027.do?versionNo=1.0&keyWord="+keyWord+"&payAcc="+payAcc+"&payeeName="+encodeURI(encodeURI(payeeName))+"&transAmount="+transAmount+"&userId="+userId+"&bsnCode="+_bsnCode+"&iCIFID="+iCIFID  //build后
		     // _this.$tools.storage.set("keyWord", keyWord)
		    },
			 endSublmit(){
			   let _this=this
			   let userStorge=_this.$tools.storage.get("user","save")
			   let cstNo=userStorge.cstNo
			   let userId=userStorge.eCIFID
			   let newDate=[{key:'cstNo',value:cstNo},{key:'userId',value:userId},{key:'payAccountNo',value:_this.confirmMsg.payAccountNo},{key:'payAccountName',value:_this.confirmMsg.payAccountName},{key:'recAccount',value:_this.confirmMsg.recAccount},{key:'recName',value:_this.confirmMsg.recName},{key:'transAmount',value:_this.confirmMsg.transAmount}]
			   let siDate=JSON.stringify(newDate);
			   let certNo=userStorge.serialNo
			   let ukeyNo=userStorge.uKeySn
			   let siAmt=_this.$tools.utils.currencyFormat(_this.confirmMsg.transAmount)
			   let siAccountNo=_this.confirmMsg.payAccountNo
			   let arrAcc=["付款账号:",siAccountNo]
			   let arrAmt=["交易金额:",siAmt]
			   let keyFlag=_this.$ukey
			   if(keyFlag==true||keyFlag=='true'){
				   let flag=getSignData(arrAcc,arrAmt,siDate,certNo,ukeyNo)
				   if(flag==false||flag=='false'){
					   //this.$alert('UKey签名失败,请重新再试', '温馨提示')
					   return
				   } 
				   let signData=document.getElementById("signData").value.toString()
			       _this.confirmMsg.signedData=signData
			   }
			   
			   _this.$tools.request(_this,"CB020102.do",_this.confirmMsg).then( data => {
				       //下一步，交易结果页面
				       let errorCode=data.body.errorCode
				       let errorMsg=data.body.errorMsg
				           if(errorCode=='0'){
				        	   _this.confirmMsg.sequenceNo=data.body.sequenceNo
				        	   _this.confirmMsg.status="等待授权"
				        	   _this.confirmMsg.stt="00"
				        	   _this.flagType='0'
				        	   _this.$emit("goStepPage","2",_this.form)
				           }else{
				        	   if(errorCode=='CB02000099'){
				        		   _this.verifyImage();
				        		   if(_this.flagType=='1'){
				        			   _this.getTimeStamps('CB020102')
				        		   }
				        		   this.$alert('验证码校验失败，请重新输入', '温馨提示');
				        		   return
				        		  
				        	   }
				        	   _this.flagType='0'
				        	   _this.confirmMsg.stt="01"
				        	   _this.confirmMsg.sequenceNo="无"
				        	   _this.confirmMsg.status="失败"
				        	   _this.confirmMsg.errCode=errorCode
				        	   _this.confirmMsg.errMessage=errorMsg
				        	_this.$emit("goStepPage","2",_this.form)
				           }
				          
				    })
				   
		   },
		    getTimeStamps(tradeCode){ //获取时间戳
			      let _this = this
			      let code = {"tradeCode":tradeCode}
			      _this.$tools.request(this,"CB000028Action.do",code).then( data => {
			          _this.confirmMsg.timeStamps =  data.body.timeStamps
			          //_this.nextStep()
			      })
			    },
	       submitForm(){
			   let _this=this
			   _this.$refs.confirmMsg.validate((valid)  => {
				   if (valid) {
					   let body={}
					   body.accountNo=_this.confirmMsg.payAccountNo
					   _this.$tools.request(_this,"CB000012.do",body).then(
					    		data=>{
					    				let errorCode=data.body.errorCode
						    			if(errorCode =='0'){
						    				let daySum = data.body.daySum
						    				let corpor='1000000';//100万
	 										if(Number(daySum)>=Number(corpor)){
	 												        this.$confirm('你当日累计交易金额已经达到100万, 请确认是否继续转账?', '温馨提示', {
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
					    )
				   }else{
					   return false;
				   }
	       }) 
		   }
	 },
	 created(){
		 let _this=this
		 _this.verifyImage();
		 
		 if( _this.confirmMsg.bespeakIndex=='1'){
   		  _this.confirmMsg.bespeakDate=''
   		  _this.confirmMsg.bespeakDateChange=''
   	  }
		 if(_this.confirmMsg.bespeakTimeType=='1'){
			 _this.confirmMsg.time='8:00-10:00'
		 }else if (_this.confirmMsg.bespeakTimeType=='2'){
			 _this.confirmMsg.time='10:00-12:00'
		 }else if (_this.confirmMsg.bespeakTimeType=='3'){
			 _this.confirmMsg.time='12:00-14:00'
		 }else if (_this.confirmMsg.bespeakTimeType=='4'){
			 _this.confirmMsg.time='14:00-16:00'
		 }
		 
		 _this.getTimeStamps('CB020102')
		 
		// _this.confirmMsg.payAccountName='阿里巴巴'
		 //console.log(this.confirmMsg)
	 }
 }
</script>
