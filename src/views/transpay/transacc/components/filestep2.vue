<template>
  <div>
     <div class="filestep2">
      <!--添加列表-->
      <div class="tableData mt5">
          <el-table :data="tableData1" stripe>
            <el-table-column label="提交日期" prop="submitDate"></el-table-column>
            <el-table-column label="制单人" prop="userName"></el-table-column>
            <el-table-column label="批量转账方式" prop="transferType">
            <template  scope="scope">
              <label v-if="!success_fail">{{scope.row.transferType}}</label>
              <label v-if="success_fail">--</label>
            </template>
            </el-table-column>
            <el-table-column label="总笔数" prop="amount"></el-table-column>
            <el-table-column label="总金额" prop="amountPrice">
            <template  scope="scope">
              <label v-if="!success_fail">{{$tools.utils.currencyFormat(scope.row.amountPrice)}}</label>
              <label v-if="success_fail">--</label>
            </template>
          </el-table-column>
           <el-table-column label="总手续费" >
           <template  scope="scope">
              <label v-if="scope.row.netFee!=''">{{$tools.utils.currencyFormat(scope.row.netFee)}}</label>
              <label v-if="scope.row.netFee==''">--</label>
              <label v-if="success_fail">--</label>
            </template>
          </el-table-column>
            <el-table-column label="文件解析状态" prop="status"></el-table-column>
          </el-table>
      </div>
      <div class="tableData mt40" v-if="!fail">
          <el-table :data="perPatchTransList" stripe>
            <el-table-column prop="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="payAccount" label="付款账号" width="180"></el-table-column>
            <el-table-column prop="recAcc" label="收款账号" width="180"></el-table-column>
            <el-table-column prop="rcvFirmName" label="收款人姓名"></el-table-column>
            <el-table-column prop="amt" label="金额"></el-table-column>
            <el-table-column label="手续费">
	            <template  scope="scope">
	              <label v-if="scope.row.netFee !=''">{{$tools.utils.currencyFormat(scope.row.netFee)}}</label>
	              <label v-if="scope.row.netFee ==''">--</label>
	            </template>
            </el-table-column>
            <el-table-column prop="purpose" label="用途"></el-table-column>
          </el-table>
      </div>
      <div class="tableData mt40" v-if="fail">
          <el-table :data="perErrList" stripe>
            <el-table-column prop="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="errMsg" label="错误信息"></el-table-column>
          </el-table>
      </div>
      <!--添加列表--END-->
      <!--pagination-->
        <div class="pagination mt30 tar"  v-if="!fail">
          <el-pagination layout="total, prev, pager, next, jumper" :total="form.total":size="form.size" @current-change="handleCurrentChange" :current-page.sync="form.currentPage"></el-pagination>
        </div>
      <!--pagination--end-->
      <!--验证码-->
      <el-row class="tac" v-if="!fail">
        <el-col :span="24"><img :src="logonImageCode" @click="getVerifyCode()"id="click-verifyImage"/></el-col>
      </el-row>
      
      <el-form ref="verifyObj" :model="verifyObj" :rules="rules" class="verifyCode formEmbedTable mt20" v-if="!fail">
        <el-form-item label="图形验证码" prop="vivCode">
          <el-input v-model="verifyObj.vivCode"></el-input>
      </el-form-item>
      </el-form>
      <!--验证码-->
      <div class="btnArea mt20 tac" >
          <el-button type="primary" @click="checkTransAmount" v-if="!success_fail">提交</el-button>
          <el-button @click="preStep">返回</el-button> 
      </div>
  </div>
  </div>
</template>

<script>  

  export default {
    name:'filestep2',
    components:{
        
    },
    data(){
      return{
        user:this.$tools.storage.get("user","save"),
        success:true,
        fail:false,
        success_fail:false,
        patchNo:"",
        form:{
          size:10,
          total:0,
          currentPage:1,
        },
        logonImageCode:'',
        verifyObj:{
          vivCode:"",
          timeStamps:'',
          tyType:'1'
        },
        rules:{  
          vivCode:[{ message: '请输入验证码', required: true},{min:1,max:4,message:'请输入4位验证码'}],
        },
        page_change:false,
        tableData1:[],
        patchTransList:[],
        perPatchTransList:[],
        errorCode:"",
        errList:[],
      }
    },
     props:{
        formData:{},
     },
     methods: {
      handleCurrentChange(currentPage){
        let _this = this
        let _firstIndex = (currentPage-1)*10
        let _lastIndex = currentPage*10
        if(_this.fail){
          _this.perErrList = _this.errList.slice(_firstIndex,_lastIndex)
        }else{
          _this.perPatchTransList = _this.patchTransList.slice(_firstIndex,_lastIndex)
        }
        _this.form.currentPage = currentPage
     },
     submit(){
       let _this=this
       let requestData ={}
       requestData.timeStamps=_this.verifyObj.timeStamps
       requestData.vivCode = _this.verifyObj.vivCode
       requestData.cstNo = _this.user.cstNo
       requestData.bsnCode = ""
       requestData.userId = _this.user.eCIFID
       requestData.userName = _this.user.userName
       requestData.ecifNo = _this.user.hostNo
       requestData.payAccount = _this.tableData1[0].payAccount
       requestData.totalAmount = _this.tableData1[0].amountPrice
       requestData.bak = ""
       requestData.nextDayFlag = _this.patchTransList[0].symbolType
       requestData.bespeakTimeType = '0'
       requestData.payName = _this.tableData1[0].payName
       requestData.recvCurrencyType = 'CNY'
       requestData.FEEDISCOUNTED = _this.tableData1[0].netFee//实收手续费
       requestData.FEEREGION = _this.tableData1[0].receivableFee//应收手续费
       requestData.totalNum = _this.tableData1[0].amount
       requestData.patchInType = '1'
       requestData.patchTransList = _this.patchTransList
       requestData.sumPersionAmt = ""
       requestData.sumBusinessAmt = ""
       requestData.DEALTIME = ""
       requestData.MACAddress = ""
       requestData.IPAddress = ""
       requestData.isOrder = "0"
       requestData.bsnCode="CB020108"
       console.log("requestData",requestData)
       let userStorge=_this.$tools.storage.get("user","save")
	   let newDate=[{key:'cstNo',value:userStorge.cstNo},{key:'userId',value:userStorge.eCIFID},
	                {key:'payAccount',value:_this.tableData1[0].payAccount},
	                {key:'payName',value:_this.tableData1[0].payName},
	                {key:'totalAmount',value: _this.tableData1[0].amountPrice},
	                {key:'totalNum',value: _this.tableData1[0].amount}]
	   let siDate=JSON.stringify(newDate);
     // alert(siDate)
	   let certNo=userStorge.serialNo
	   let ukeyNo=userStorge.uKeySn
	   let siAmt=_this.$tools.utils.currencyFormat(_this.tableData1[0].amountPrice)
	   let siAccountNo=_this.tableData1[0].payAccount
	   let arrAcc=["付款账号:",siAccountNo]
	   let arrAmt=["交易金额:",siAmt]
	   let keyFlag=_this.$ukey
	   if(keyFlag==true||keyFlag=='true'){
		   let flag=getSignData(arrAcc,arrAmt,siDate,certNo,ukeyNo)
		   //alert("flag"+flag)
		   if(flag==false||flag=='false'){
			   return
		   } 
		  let signData=document.getElementById("signData").value.toString()
		  // alert(signData)
	     requestData.signedData= ""
	     requestData.signedData=signData
	   }
       
       
       _this.$tools.request(_this, "CB020108.do", requestData).then(
        data => {
          if(data.body.errorCode == "0"){
            console.log("CB020108.do","成功")
            _this.patchNo = data.body.patchNo
            _this.verifyObj.tyType='0'
            _this.$emit("changeStep","2",{patchNo:_this.patchNo})
          }else{
            if(data.body.errorCode=='CB02000099'){
            	_this.getVerifyCode()
            	if(_this.verifyObj.tyType=='1'){
          		  _this.getTimeStamps('CB020108')  
          	  }
              _this.$alert('验证码校验失败，请重新输入');
              return
            }
            _this.verifyObj.tyType='0'
            console.log("CB020108.do","失败")
            _this.errorCode = data.body.errorCode
            _this.errorMsg = data.body.errorMsg
            _this.$emit("changeStep","2",{errorCode:_this.errorCode,errorMsg:_this.errorMsg})
          }
        }
      )
     },
     getTimeStamps(tradeCode){ //获取时间戳
	      let _this = this
	      let code = {"tradeCode":tradeCode}
	      _this.$tools.request(this,"CB000028Action.do",code).then( data => {
	          _this.verifyObj.timeStamps =  data.body.timeStamps
	          //_this.nextStep()
	      })
	    },
	    
     //获取验证码
    getVerifyCode(){
      let _this = this
      let keyWord = Math.random()
      let payAcc = _this.formData.patchTransList[0].payAccount
      let payeeName = _this.formData.patchTransList[0].payName
      let transAmount =_this.$tools.utils.currencyFormat(_this.formData.tableData1[0].amountPrice) 
      let userId = _this.$tools.storage.get("user","save").eCIFID
      let iCIFID=_this.$tools.storage.get("user","save").iCIFID
      let _bsnCode='CB020108'
      _this.logonImageCode="/api/CB000027.do?versionNo=1.0&keyWord="+keyWord+"&payAcc="+payAcc+"&payeeName="+encodeURI(encodeURI(payeeName))+"&transAmount="+transAmount+"&userId="+userId+"&bsnCode="+_bsnCode+"&iCIFID="+iCIFID  //build后
      _this.$tools.storage.set("keyWord", keyWord)
      console.log('_this.logonImageCode',_this.logonImageCode)
    },
     checkTransAmount(){
			   let _this=this
			   
			   _this.$refs.verifyObj.validate((valid)  => {
				   if (valid) {
			   let body={}
			   body.accountNo = _this.tableData1[0].payAccount
			   _this.$tools.request(_this,"CB000012.do",body).then(
            data=>{
                  let errorCode=data.body.errorCode
                  if(errorCode =='0'){
 					let daySum = data.body.daySum
                    let corpor='1000000';//100万
                      if(Number(daySum)>Number(corpor)){
                          _this.$confirm('你当日计交易金额已经达到100万, 请确认是否继续转账?', '温馨提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                            _this.submit()
                          }).catch(() => {
                                
                          });
                      }else{
                            _this.submit()
                      }
                }
            }
      )	
				   }
			   }) 
    },
      preStep(){
      let _this=this
      console.log("formData",_this.formData)
      _this.$emit("changeStep","0",_this.formData)
    },
  },
   mounted(){ 
      let _this = this
      _this.getTimeStamps('CB020108')
      _this.tableData1 = _this.formData.tableData1
      _this.patchTransList = _this.formData.patchTransList
      
      if(_this.patchTransList.length>0){
   	   _this.getVerifyCode()  
      }
      _this.errList = _this.formData.errList
      console.log("_this.errList",_this.errList)
      if(_this.errList.length > 0){
    	
        _this.success_fail = true
        _this.fail = true
        _this.form.total = _this.errList.length
        for(let i = 0;i<_this.form.total;i++){
          _this.errList[i].index = i+1
        }
        if(_this.form.total > _this.form.size){
        _this.page_change = true
        _this.handleCurrentChange(1)
        }else{
          _this.perErrList = _this.errList
        }
      }else{
        _this.form.total = _this.patchTransList.length
        for(let i = 0;i<_this.form.total;i++){
          _this.patchTransList[i].index = i+1
        }
        if(_this.form.total > _this.form.size){
          _this.page_change = true
          _this.handleCurrentChange(1)
        }else{
          _this.perPatchTransList = _this.patchTransList
        }
        console.log("_this.patchTransList",_this.patchTransList)
      }
  } 
}

</script>
<style>
.verifyCode{width:100%;text-align: center;}
.verifyCode .el-form-item__content{float:right;}
</style>