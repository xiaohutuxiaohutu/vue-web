<template>
<div class="entrystep2">
    <!--确认转账列表-->
    <div class="tableData mt5">
        <el-table :data="tableList" stripe>
          <el-table-column label="序号">
            <template  scope="scope">
              {{Number(scope.$index)+(currentPage-1)*pagesize+1}}
            </template>
          </el-table-column>
          <el-table-column prop="payAccount" label="付款账号"></el-table-column>
          <el-table-column prop="recAcc" label="收款账号"></el-table-column>
          <el-table-column prop="rcvFirmName" label="收款账号户名"></el-table-column>
          <el-table-column prop="amt" label="金额">
            <template  scope="scope">
              {{$tools.utils.currencyFormat(scope.row.amt)}}元
            </template>
          </el-table-column>
          <el-table-column  prop="purpose" label="用途">       
          </el-table-column>
        </el-table>
    </div>
    <div class="mt10 tar">
          <span class="ml10">总笔数：{{formData.paginationTotal}}</span>&nbsp;&nbsp;
          <span class="ml10">总金额：￥{{$tools.utils.currencyFormat(formData.amtTotal)}}元</span>&nbsp;&nbsp;
          <span class="ml10">总金额大写：{{$tools.utils.toChinese(formData.amtTotal)}}</span>&nbsp;&nbsp;
          <span class="ml10">手续费：{{$tools.utils.currencyFormat(netFee)}}元</span>
    </div>
    <!--分页-->
    <div class="pagination tar mt20">
      <el-pagination 
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="formData.paginationTotal"
      >
      </el-pagination>
    </div>
    <!--分页--END-->
    <!--验证码-->
    <el-row class="tac">
      <el-col :span="24"><img :src="logonImageCode" @click="getVerifyCode()"id="click-verifyImage"/></el-col>
    </el-row>
    
    <el-form ref="verifyObj" :model="verifyObj" :rules="rules" class="verifyCode formEmbedTable mt20">
      <el-form-item label="图形验证码" prop="vivCode">
        <el-input v-model="verifyObj.vivCode"></el-input>
     </el-form-item>
    </el-form>
    <!--验证码-->
    <!--确认转账列表--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="checkTransAmount">提交</el-button>
      <el-button @click="preStep">上一步</el-button>
    </div>
</div>
</template>

<script>  

export default {
  name:'entrystep2',
  components:{
      
  },
  data(){
    return{
      pagesize:10,
      currentPage:1,
      tableList:[],
      netFee:0,
      receivableFee:0,
      logonImageCode:'',
      verifyObj:{
          vivCode:"",
          timeStamps:'',
          tyType:'1'
        },
      rules:{  
        vivCode:[{ message: '请输入验证码', required: true},{min:1,max:4,message:'请输入4位验证码'}],
      },
    }
  },
  props:{
    formData:{},
  },
  methods: {
    submit(){
       let _this=this
       let requestData ={}
       requestData.vivCode = _this.verifyObj.vivCode
       requestData.timeStamps=_this.verifyObj.timeStamps
       requestData.cstNo = _this.$tools.storage.get("user","save").cstNo
       requestData.bsnCode = ""
       requestData.userId = _this.$tools.storage.get("user","save").eCIFID
       requestData.userName = _this.$tools.storage.get("user","save").userName
       requestData.payAccount = _this.formData.patchTransList[0].payAccount
       requestData.totalAmount = _this.formData.amtTotal
       requestData.ecifNo = _this.$tools.storage.get("user","save").hostNo
       requestData.bak = ""//有可能不一致
       requestData.nextDayFlag = _this.formData.patchTransList[0].symbolType//有可能不一致---------waitting for page(nextDayFlay),change to common
       requestData.bespeakTimeType = ""//有可能不一致
       requestData.payName = _this.formData.patchTransList[0].payName
       requestData.recvCurrencyType = 'CNY'
       requestData.FEEDISCOUNTED = _this.netFee//总是实收手续费
       requestData.FEEREGION = _this.receivableFee//总是应收手续费
       requestData.totalNum = _this.formData.paginationTotal
       requestData.patchInType = '0'
       requestData.patchTransList = _this.formData.patchTransList
       requestData.sumPersionAmt = ""
       requestData.sumBusinessAmt = ""
       requestData.DEALTIME = ""
       requestData.MACAddress = ""
       requestData.IPAddress = ""
       requestData.isOrder = ""//有可能不一致
       requestData.bsnCode="CB020108"
       
       console.log("requestData",requestData)
       
       let userStorge=_this.$tools.storage.get("user","save")
	   let newDate=[{key:'cstNo',value:userStorge.cstNo},{key:'userId',value:userStorge.eCIFID},{key:'payAccount',value:_this.formData.patchTransList[0].payAccount},{key:'payName',value:_this.formData.patchTransList[0].payName},{key:'totalAmount',value: _this.formData.amtTotal},{key:'totalNum',value: _this.formData.paginationTotal}]
	   let siDate=JSON.stringify(newDate);
       //alert(siDate)
	   let certNo=userStorge.serialNo
	   let ukeyNo=userStorge.uKeySn
	   let siAmt=_this.$tools.utils.currencyFormat(_this.formData.amtTotal)
	   let siAccountNo=_this.formData.patchTransList[0].payAccount
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
            _this.$emit("changeStep","2",{patchNo:_this.patchNo})
            _this.verifyObj.tyType='0'
          }else{
            if(data.body.errorCode=='CB02000099'){
            	  _this.getVerifyCode()
            	  if(_this.verifyObj.tyType=='1'){
            		  _this.getTimeStamps('CB020108')  
            	  }
                  _this.$alert('验证码校验失败，请重新输入', '温馨提示', {
                    });
              return
            }
            console.log("CB020108.do","失败")
            _this.verifyObj.tyType='0'
            _this.errorCode = data.body.errorCode
            _this.errorMsg = data.body.errorMsg
            _this.$emit("changeStep","2",{errorCode:_this.errorCode,errorMsg:_this.errorMsg})
          }
        }
      )
    },
    //获取验证码
    getVerifyCode(){
      let _this = this
      let keyWord = Math.random()
      let payAcc = _this.formData.patchTransList[0].payAccount
      let payeeName = _this.formData.patchTransList[0].payName
      let transAmount = _this.$tools.utils.currencyFormat(_this.formData.amtTotal)
      let userId = _this.$tools.storage.get("user","save").eCIFID
      let iCIFID=_this.$tools.storage.get("user","save").iCIFID
      let _bsnCode='CB020108'
      _this.logonImageCode="/api/CB000027.do?versionNo=1.0&keyWord="+keyWord+"&payAcc="+payAcc+"&payeeName="+encodeURI(encodeURI(payeeName))+"&transAmount="+transAmount+"&userId="+userId+"&bsnCode="+_bsnCode+"&iCIFID="+iCIFID  //build后
      _this.$tools.storage.set("keyWord", keyWord)
      console.log('_this.logonImageCode',_this.logonImageCode)
    },
     preStep(){
      let _this=this
      _this.$emit("changeStep","0",_this.formData)
    },
    handleCurrentChange(currentPage){
      let _this=this
      _this.currentPage=currentPage
      let startPage=(currentPage-1)*_this.pagesize
      let endPage=currentPage*_this.pagesize-1
      _this.tableList=_this.$tools.array.intercept(_this.formData.patchTransList,startPage,endPage)
    },
    getTimeStamps(tradeCode){ //获取时间戳
	      let _this = this
	      let code = {"tradeCode":tradeCode}
	      _this.$tools.request(this,"CB000028Action.do",code).then( data => {
	          _this.verifyObj.timeStamps =  data.body.timeStamps
	          //_this.nextStep()
	      })
	    },
    checkTransAmount(){
         let _this=this
         _this.$refs.verifyObj.validate((valid)  => {
        	  if (valid) {
			   let body={}
			   body.accountNo = _this.formData.patchTransList[0].payAccount
			   _this.$tools.request(_this,"CB000012.do",body).then(
               data=>{
                  let errorCode=data.body.errorCode
                  if(errorCode =='0'){
                    let daySum = data.body.daySum
                    let corpor='1000000';//对公100万
                    let person='300000';//对私30万
                      if(Number(daySum)>Number(corpor)){
                          _this.$confirm('你当日累计交易金额已经达到100万, 请确认是否继续转账?', '温馨提示', {
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
            })
         }
         }) 
    },
  },
  mounted(){
    let _this=this
    _this.getVerifyCode()
    _this.handleCurrentChange(1)
    let _receivableFee = 0
    let _netFee = 0
    for(let i = 0;i<_this.formData.paginationTotal;i++){
      _receivableFee += Number(_this.formData.patchTransList[i].receivableFee)
      _netFee += Number(_this.formData.patchTransList[i].netFee)
    }
      _this.receivableFee = _receivableFee
      _this.netFee = _netFee
      
      _this.getTimeStamps('CB020108')
  }
}

</script>
<style>
.verifyCode{width:100%;text-align: center;}
.verifyCode .el-form-item__content{float:right;}
</style>