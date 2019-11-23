<template>
	<div class="fourForm tableForm mt20">
	<!-- 手续费 -->
	<el-popover ref="popover4"  placement="right"  width="400" trigger="click">
      <div class="formEmbedTable mt20 textCenter">
        <table class="textCenter tdBgWhite">
          <tr>
            <th>收费说明</th>
            <th>收费</th>
          </tr>
          <tr v-for="item in gridData">
            <td>{{item.date}}</td>
            <td>{{item.name}}</td>
          </tr>
        </table>
      </div>
		  <span>说明：具体以实际转账为准</span>
	</el-popover>
	
	<el-form ref="form"  :model="form" :rules="rules" >
   		<h3>付款人信息</h3>
		<el-row>
          <el-form-item label="转出子公司组别：" ref="" prop="acctGroup" class="fullLine">
            <el-select v-model="form.acctGroup" placeholder="请选择" @change="getGroupAccList">
              <!--<el-option label="其他" value=""></el-option>              -->
							<template v-for="item in groupInfoList">
                  <el-option :label="item.groupName" :value="item.groupNo"></el-option>
              </template> 
            </el-select>
          </el-form-item>
        </el-row>
     	<el-row>
		 	<el-form-item label="转出子公司账号：" prop="payAccountNo" ref="payAccountNo" class="fullLine">
				 <el-select v-model="form.payAccountNo" placeholder="请选择付款账号"@change="onChangePayAccountNo">
						<el-option v-for="item in payAccounts" :label="item.label" :value="item.value"></el-option>
				 </el-select>
				  <span class="cOrange m15" v-if="balanceIndex==0">余额： {{$tools.utils.currencyFormat(form.balance)}}元</span>
	        </el-form-item>
		 </el-row>
		 <el-row>
          <el-form-item label="转出子公司账户名：" prop="payAccountName" class="fullLine">
             <el-input v-model="form.payAccountName" :disabled="true"></el-input>
          </el-form-item>
        </el-row>
		  <el-row>
		 	<el-form-item label="转账类型：" prop="" class="fullLine">
		 	<el-radio-group v-model="form.transferType" @change="transferOnChange">
            		<el-radio label="0">行内转账</el-radio>
            		<el-radio label="1">行外转账</el-radio>
          		</el-radio-group>
	        </el-form-item>
		 </el-row>
 		<h3>收款人信息</h3>
		 <el-row>
		 	<el-form-item label="收款人账户：" prop="recAccount" class="fullLine" ref="recAccount">
				<el-input v-model="form.recAccount" placeholder="请输入收款人账号"  @change="recAccountChange"></el-input>
				<a class="cOrange m15" @click="payeeClick"><i class="el-icon-search"/>常用收款人</a>
	        </el-form-item>
		 </el-row>
		 <el-row>
		 	<el-form-item label="收款人账户名：" prop="recName" class="fullLine" ref="recName">
				<el-input v-model="form.recName" placeholder="请输入收款账号户名"  :disabled="form.acNamedisabled"></el-input>
	        </el-form-item>
		 </el-row>
		 <el-row>
		 	<el-form-item label="转账金额：" prop="transAmount" ref="transAmount" class="fullLine">
				<currency-input ref="transAmount"  v-model="form.transAmount" @currency-blur="currentBlur" placeholder="" :showChinese="false" ></currency-input>
				<a class="cOrange m15" v-popover:popover4 ><i class="el-icon-search"/>手续费标准</a>
			</el-form-item>
		 </el-row>	
		 <el-row>
		 	<el-form-item label="大写金额："  class="fullLine">
				<span>{{$tools.utils.toChinese(form.transAmount)}}</span>
	        </el-form-item>
		 </el-row>
		 <el-row>
		 	<el-form-item label="币种："  class="fullLine">
				<span>人民币</span>
	        </el-form-item>
		 </el-row>
		 <el-row>
		 	<el-form-item label="转账方式："  prop="transWay" class="fullLine">
		 		<el-radio-group v-model="form.transWay"  @change="transferMothodChange">
            		<el-radio label="0">普通转账</el-radio>
            		<el-radio label="1">次日到账</el-radio>
          		</el-radio-group>
	        </el-form-item>
		 </el-row>
		 <el-row v-if="recTransferBankIndex==0">
		 	<el-form-item label="收款人开户行："  prop="recopenNode" class="fullLine" >
		 		<el-input v-model="form.recopenNode" placeholder="" :disabled="true"  style="width:300px"></el-input>
		 		<a class="cOrange m15" @click="sellClick"><i class="el-icon-search"/>查询收款行</a>
	        </el-form-item>
		 </el-row>
		 <el-row>
		 	<el-form-item label="收款人手机号："  prop="mobileNo" class="fullLine">
  				<el-input v-model="form.mobileNo" placeholder="请输入收款人手机号码" ></el-input>
  				 <span class="cGray m15">免费通知其汇款信息</span>
	        </el-form-item>
		 </el-row>
		 <el-row>
			<el-form-item label="用途："  prop="purpose" class="fullLine">
				<el-select v-model="form.purpose" placeholder="请选择付款用途" @change="onChangePurpose">
					<el-option v-for="item in purposes" :label="item.purposeName" :value="item.purposeId+'|'+item.purposeName"></el-option>  
				</el-select>
				<span v-if="purposeIndex==0">
					<el-input v-model="form.purposeOther" placeholder="请输入用途" ></el-input>
				</span>
				<span class="cGray m15">用途在转账后发给收款人</span>
			</el-form-item>
		 </el-row>
		 <el-row>
		 	<el-form-item label="附言："  prop="postscript" class="fullLine">
					 <el-input v-model="form.postscript" placeholder="请输入附言"></el-input>
					 <span class="cGray m15">您所填写的附言，将发送发给收款人</span>
	        </el-form-item>
		 </el-row>
		 <div v-if="devIndex==0">
			 <el-row >
			 	<el-form-item label="预约处理："  prop="bespeak" class="fullLine" >
						<el-checkbox-group v-model="form.bespeak" @change="bespeakChange">
	    			 			<el-checkbox label=""  name="bespeak" ></el-checkbox>
	    				</el-checkbox-group>
		        </el-form-item>
			 </el-row>
			 <el-row v-if="bespeakIndex==0">
			 	<el-form-item label="预约日期："  prop="bespeakDate" class="fullLine"  >
	 					<el-date-picker v-model="form.bespeakDate" type="date"  placeholder="选择日期" @change="form.bespeakDateChange=$tools.utils.formatDate(form.bespeakDate)"></el-date-picker>
	 					<el-select v-model="form.bespeakTimeType" placeholder="请选择时间">
								<el-option v-for="item in timeOptions" :label="item.label" :value="item.value"></el-option>  
						</el-select>
		        </el-form-item>
			 </el-row>
<!-- 			 <el-row v-if="form.bespeakIndex==0"> -->
<!-- 			 	<el-form-item label="预约通知手机号："  prop="recmobile" class="fullLine"> -->
<!-- 	 					<el-input v-model="form.recmobile" placeholder="请输入预约通知手机号码"  ></el-input> -->
<!-- 	 					<span class="cGray m15">用于接收预约处理结果短信</span> -->
<!-- 		        </el-form-item> -->
<!-- 			 </el-row> -->
		 </div>
	</el-form>
	<div class="btnArea mt20 tac">
		<el-button type="primary" @click="nextStep">下一步</el-button>
		<el-button @click="resetForm()">重置</el-button>
	</div>
</div>
</template>
<script>
import currencyInput from '@src/components/currency-input'  //金额组件
export default{
	name:'intelligentTransferFirst',
	components:{
		currencyInput
	},
	props: {
		fillinMsg:{
			type: Object
		}
	},
	data(){
		return{
			loginStorage:this.$tools.storage.get("user","save"),
			rcvFirmNameLength:40,
			gridData: [
				{
					date: '人民币 1万元以下（含人民币 1万元）',
					name: '人民币 2元',
				}, 
				{
					date: '人民币 1-10万元（含人民币 10万元）',
					name: '人民币 5元',
				}, 
				{
					date: '人民币10-50万元（含人民币 50万元）',
					name: '人民币 15元',
				}, 
				{
					date: '人民币50-500万元（含人民币 500万元）',
					name: '人民币 20元',
				},
					{
					date: '人民币5000-1000万元（含人民币 1000万元）',
					name: '人民币 50元',
				},
					{
					date: '人民币1000万元以上',
					name: '人民币 100元',
				}
			],
			payAccounts:[],
			groupSessionAccs:[],
			groupInfoList:[],
			options:[],
			purposes:[{purposeId: "0", purposeName: "其它", desc: "其它", createTime: new Date(),modifyTime: new Date()}],
			timeOptions:[{
				value: '1',
				label: '8:00-10:00'
			},
			{
				value: '2',
				label: '10:00-12:00'
			},{
				value: '3',
				label: '12:00-14:00'
			},{
				value: '4',
				label: '14:00-16:00'
			}],
			purposeIndex:'1',
			bespeakIndex:'1',
			balanceIndex:'1',
			recTransferBankIndex:'1',
			devIndex:'0',
			form:{
				acctGroup:'',
				payAccountNo:'',
				payAccountName:'',
				recAccount:'',
				recName:'',
				transAmount:'',
				transWay:'0',
				transferType:'0',
				purpose:'',
				purposeOther:'',
				postscript:'',
				bespeak:'',
				bespeakDate:'',
				bespeakDateChange:'',
				bespeakTimeType:'',
				recmobile:'',
				balance:'',
				recopenNode:'',//收款人开户行
				mobileNo:'',
				acNamedisabled:false,
				payNode:'',
				ZCFYHZHLX:'', //取session 数据付款账户类型
				operateFlag:'',//类型：新增0，修改：1
				oldSqno:'',//旧流水号
				ecifNo:'',
				companyFlag:'',
				signData:'',
				isOrder:'',
				tAmount:'',
				mark:''
			},
			rules:{
				acctGroup:[{ message: '请选择子公司组别', trigger:'change', required: true}],
				payAccountNo: [{validator:this.validatorPayAccountNo, trigger:'blur', required: true}],
				recAccount:[{validator:this.validatorRecAccount, trigger:'blur', required: true},{ trigger: 'change', validator: this.$tools.validator.isAccNo }],
				recName:[{validator:this.validatorName, trigger:'blur', required: true}],
				transAmount:[{validator:this.validatorCurrency, trigger:'blur', required: true}],
				purpose:[{ message: '请选择付款用途', trigger:'change', required: true}],
				bespeakDate:[{ message: '请选择预约日期',type:'date', trigger:'blur', required: true},{ validator:this.validatorDate, trigger: 'blur', required: true}],
				recopenNode:[{ message: '请输入收款人开户行', trigger:'blur', required: true}],
				mobileNo:[{ validator:this.validatorPhoneNumber, trigger: 'blur'}],
				bespeakTimeType:[{ validator:this.validatorDate, trigger: 'blur', required: true}],
				recmobile:[{ validator:this.validatorPhoneNumber, trigger: 'blur'}],
				postscript:[{ validator:this.validatorMark, trigger: 'blur'}],
				mark:[{ validator:this.validatorMark, trigger: 'blur'}],
				// payAccountNo: [{ message: '请选择付款账号', trigger:'change', required: true}],
				// recAccount:[{required:true,message:'请输入收款人账号', trigger:'change'}],
				// recName:[{required:true,message:'请输入收款账号户名', trigger:'change'}],
				// transAmount:[{validator:this.validatorCurrency, trigger:'blur'}],
				// purpose:[{ message: '请选择付款用途', trigger:'change', required: true}],
				// bespeakDate:[{ message: '请选择预约日期',type:'date', trigger:'blur', required: true}],
				// recopenNode:[{ message: '请填写收款人开户行', trigger:'change', required: true}],
				// mobileNo:[{ validator:this.validatorPhoneNumber, trigger: 'blur'}],
			}
		}
	},
	methods: {
		//校验银行卡号
		validatorPayAccountNo(rule, value, callback){
			let _this=this
			if("" == _this.form.payAccountNo) return callback("请输入付款人账号")
			if(!(/^\d{5,32}$/.test(_this.form.payAccountNo))) return callback("请选择正确格式银行卡号")
			callback()
		},
		//校验付款账号
		validatorRecAccount(rule, value, callback){
			let _this=this
			if("" == value) return callback("请输入收款人账号")
			//if(!(/^\d{5,32}$/.test(value))) return callback("请输入正确格式银行卡号")
			if(_this.form.payAccountNo == value) return callback("收款人账号与付款人账号不能相同")
				if(_this.form.status !='' && _this.form.status !=undefined ){
					if(_this.form.status =='2'){
						_this.form.status=''
						return callback("输入账户有误 ,请重新输入")	
					}
					if(_this.form.status =='1'){
						_this.form.status=''
						return callback("收款账户不支持转账")	
					}
					callback()
				}
			callback()
		},
		//校验收款人账户名
		validatorName(rule, value, callback){
			let _this=this
			if("" == value) return callback("请输入收款人账户名")
			if(!/^[A-Za-z0-9\u4e00-\u9fa5()_（）——]+$/.test(value)) return callback("收款人账户名不能含有特殊字符")
			if(_this.getRcvFirmNameLength(value) > _this.rcvFirmNameLength) return callback("收款人账户名不能大于十个中文字符或二十个英文字符")
			if(_this.form.status =='3'){
				_this.form.status=''
				return callback("输入收款人账户名有误,请重新输入")	
			}
			callback()
		},
		//附言，备注校验
		validatorMark(rule, value, callback){
			let _this=this
			if("" == value) return callback()
			if(!/^[A-Za-z0-9\u4e00-\u9fa5()_（）——]+$/.test(value)) return callback("输入信息不能含有特殊字符")
			if(_this.getRcvFirmNameLength(value) >100) return callback("输入信息不能大于50个中文字符或100个英文字符")
			callback()
		},
		//校验手机号
		validatorPhoneNumber(rule, value, callback){
			let _this=this
			if("" == value) return callback()
			if(!_this.$tools.validator.isNumber(value)) return callback("请输入数字")
			if(!_this.$tools.validator.isPhone(value)) return callback("请输入正确格式手机号码")
			callback()
		},
		//校验转账金额
		validatorCurrency(rule, value, callback){
			let _this = this
			_this.$refs['payAccountNo'].validate("blur")
			if("" == value || "0.00" == value) return callback("请输入转账金额")
			let bal=_this.form.balance
			if(parseFloat(parseFloat(value).toFixed(2))>parseFloat(parseFloat(bal).toFixed(2))) return callback("转账金额超过余额")
			// callback()
			let _payAccountNo = _this.form.payAccountNo
			if(_payAccountNo!=''){
				let body={}
				let userStorge=_this.$tools.storage.get("user","save")
				body.cstNo=userStorge.cstNo  //后续更改session获取
				body.accountNo=_payAccountNo
				body.payAmount=_this.form.transAmount
				body.currency='CNY'
				_this.$tools.request(_this,"CB020031.do",body).then(
					data=>{
						let errorCode =data.body.errorCode
						let errorMsg =data.body.errorMsg
						if(errorCode!=0){
							return callback(errorMsg)
						}else{
							callback()
						}
					}
				)
			}else{
				callback()
			}
		},
		//校验预约日期
		validatorDate(rule, value, callback){
			if(value == "") return callback("请输入预约日期")
			let _this = this
			let _date = _this.$tools.utils.formatDate(value)
			let _today = _this.$tools.utils.formatDate(new Date())
			if(_date <=_today){
				return callback("预约日期必须大于当前日期")
			}
		 	let body={}
		  body.dataTime=_date
		  _this.$tools.request(_this,"CB000030.do",body).then(
				data=>{
					let errorCode =data.body.errorCode
					let errorMsg =data.body.errorMsg
					if(errorCode!=0){
						_this.form.bespeakDate=''
						return callback("获取节假日信息失败，请稍后再试")
					}else{
						let holidayFlag=data.body.holidayFlag
						if(holidayFlag=="Y"){
							_this.form.bespeakDate=''
							return callback("节假日不能预约")
						}
						callback()
					}
				}
			)
		},
		//获取字符串字节长度
		getRcvFirmNameLength(value){
			let _byteLen = 0
			let _len = value.length
			for(let i = 0;i<_len;i++){
				if(value.charCodeAt(i)>255){
					_byteLen += 2
				}else{
					_byteLen +=1
				}
			}
			return _byteLen
		},
		retrieveAccts(){
			let _this = this
			let list = _this.$tools.storage.get("user","save")
			let operAccInfoList = list ? list.operAccInfoList : []
			for(let i = 0; i < operAccInfoList.length; i++){
				let _right = operAccInfoList[i].right
				let _type = operAccInfoList[i].type
				let _currency = operAccInfoList[i].currType
				let _groupFlag = operAccInfoList[i].groupFlag
				let _groupRight = operAccInfoList[i].groupRight
				let _auth = operAccInfoList[i].auth
				if(_groupFlag == '1' && _right.substr(3,1)=='1' && _groupRight != '' && _groupRight.substr(3,1) == '1'){//转账权限的活期人民币账户
					if(_auth == '2'){//操作员动账权限
						let _acno = operAccInfoList[i].accNo
						let _name = operAccInfoList[i].accName
						let _alias=operAccInfoList[i].alias
						if(_alias=='' ||_alias==null){
							_alias=_name
						}
						let _lable=operAccInfoList[i].accNo+'['+_this.$tools.dict.currTypeDict(operAccInfoList[i].currType) +']'+'['+_alias +']'
						let lable=_lable
						// let _lable = _this.$tools.utils.mask(_acno,{beforeIndex:3, behindIndex:4})
						// let lable = _lable + _name
						let value = _acno
						// _this.payAccounts.push($.extend({}, operAccInfoList[i], {"value":value,"name":_name,"label":lable}))//子公司账号列表
						_this.groupSessionAccs.push($.extend({}, operAccInfoList[i], {"value":value,"name":_name,"label":lable}))//子公司账号列表
					}
				}
			}
		},
		currentBlur(val){   //金额控件失焦事件
			console.log(val)
		},
		onChangePayAccountNo(){ //查询余额事件
			let _this=this
			_this.payAccountNoIndex=0
			let oAccInfoList=_this.loginStorage.operAccInfoList
			for(let k=0;k<oAccInfoList.length;k++){
				let _payAccountNo=oAccInfoList[k].accNo
				if(_this.form.payAccountNo==_payAccountNo){
			//    _this.form.payAccountName=oAccInfoList[k].accName
					_this.form.ZCFYHZHLX=oAccInfoList[k].type
					_this.form.payAccountName=oAccInfoList[k].accName
					_this.form.payNode=oAccInfoList[k].openBankNo
				}
			}
			_this.laodPayCar()
		},
		laodPayCar(){
			let _this=this
			let body={}
			body.accNo=_this.form.payAccountNo
			if(_this.form.payAccountNo!=''){
				_this.$tools.request(_this,"CB040100.do",body).then(
					data=>{
						let errorCode =data.body.errorCode
						if(errorCode =='0'){
							let accNoList = data.body.accNoList
							let amt
							let sumBalance='0'
							for(let i=0;i<accNoList.length;i++){
								amt=accNoList[i].AVL_BAL
								sumBalance=Number(sumBalance)+Number(amt)
							}
							_this.form.balance=sumBalance
							if(!_this.form.payNode){
								_this.form.payNode = accNoList[0].OPEN_BANK_NO
							}
							_this.balanceIndex=0
						}else{
							_this.balanceIndex=1
						}
					}
				)
			}
		},
		pickerOptions0: { //计算日期控件
			disabledDate(time) {
				return time.getTime() < Date.now() - 8.64e7;
			}
		},
		bespeakChange(val){ //预约处理事件
			let _this=this
			if(_this.bespeakIndex==0){
				_this.bespeakIndex=1
				
			}else{
				_this.bespeakIndex=0
			}
		},
		resetForm() {//重置事件
			let _this=this
			this.$refs.form.resetFields()
			_this.bespeakIndex='1'
			_this.balanceIndex='1'
			_this.form.balance=''
			_this.recTransferBankIndex='1'
			_this.form.transferType='0'
		},
		nextStep(){ //下一步事件
			let _this=this
			_this.$refs.form.validate((valid)  => {
				if (valid) {
					let body={}
					body.accNo=_this.form.recAccount //收款账户
					body.accountNo=_this.form.payAccountNo //付款账户
					body.transferType=_this.form.transferType//转账类型
					body.transAmount=_this.form.transAmount//转账金额
					body.cstNo=_this.loginStorage.cstNo//企业客户号  //后续更改session获取
					body.recName=_this.form.recName
					_this.$tools.request(_this,"CB040207.do",body).then(
						data=>{
							let errorCode =data.body.errorCode
							let errorMsg =data.body.errorMsg
							if(errorCode != "0"){
								if(errorMsg.indexOf('账户不存在')>=0){
									_this.form.status='2';
									this.$refs['recAccount'].validate("blur")
								} else{
									this.$alert(errorMsg, '温馨提示', {confirmButtonText: '确定'});
								}
							}else{
								_this.form.companyFlag=data.body.companyFlag //0企业1：个人
								_this.form.cstNo=_this.loginStorage.cstNo //后续更改session获取
								_this.form.userId=_this.loginStorage.eCIFID  //后续更改session获取eCIFID
								_this.form.userName=_this.loginStorage.userName //后续更改session获取是  
								_this.form.status=data.body.status
								if(_this.form.transferType=='0'){
									if(_this.form.status!='0'){
										if(_this.form.status=='3'){
												_this.form.status='3'
												this.$refs['recName'].validate("blur")
											}else{
												_this.form.status='1'
												this.$refs['recAccount'].validate("blur")
											}
										return
									}
									let branchName =data.body.branchName
									if(branchName==''){
										branchName='创兴银行'
									}
									_this.form.branchName=branchName
									_this.form.rcvNode=data.body.OPEN_BANK_NO//收款行号 
								}else{
									let feeWithoutDiscount=data.body.feeWithoutDiscount
									let feeWithDiscount=data.body.feeWithDiscount
									_this.form.feeWithoutDiscount=feeWithoutDiscount
									_this.form.feeWithDiscount=feeWithDiscount
								}
								_this.$emit("goStepPage","1",_this.form)
						}
					}
				)
			} else {
				console.log('error submit!!');
				return false;
			}
		})
	},
	loadSubAcct(){
		let _this=this
		let body={}
		let userStorge=_this.$tools.storage.get("user","save")
		// body.userNo=userStorge?userStorge.eCIFID:''  //后续更改session获取_this.$tools.storage.get("user","save")
		_this.form.cstNo = body.cstNo = userStorge ? userStorge.cstNo : ''  //后续更改session获取
		// _this.form.ecifNo=userStorge?userStorge.hostNo:'' //核心客户号
		_this.$tools.request(_this,"CB040105.do",body).then(
			data=>{
				let errorCode=data.body.errorCode
				if(errorCode =='0'){
					let subAcctNoList = data.body.subAcctNoList
					for(let i = 0; i < subAcctNoList.length; i++){
						let _acno = subAcctNoList[i].acctNo
						let _name = subAcctNoList[i].acctName
						let _lable = _this.$tools.utils.mask(_acno,{beforeIndex:3,behindIndex:4})
						let lable = _lable+_name
						let value = _acno
						_this.payAccounts.push({"value":value,"name":_name,"lable":lable})
					}
				}
			}
		)
	},
		loadPurpose(){ //初始化查询用途事件
					let _this=this
					let body={}
					body.queryFlag='1' 
					let userStorge=_this.$tools.storage.get("user","save")
					body.userNo=userStorge.eCIFID  //后续更改session获取_this.$tools.storage.get("user","save")
					body.cstNo=userStorge.cstNo  //后续更改session获取
					_this.form.ecifNo=userStorge.hostNo //核心客户号
					_this.$tools.request(_this,"CB000002.do",body).then(
							data=>{
									let errorCode=data.body.errorCode
									if(errorCode =='0'){
										let tranPurposeList = data.body.tranPurposeList
										for(let i=0;i<tranPurposeList.length;i++){
											_this.purposes.push(tranPurposeList[i])  
										}
									}
										}
									)		  
		},
		onChangePurpose(value){ //选择用途事件
				let _this=this
				let  _purposeName=value.split('|')
				let _pName=_purposeName[1]
				_this.form._purposeName=_pName
				_this.form.purposeName=_pName
				if(_pName=='其它'){
						_this.purposeIndex=0
				}else{
					_this.purposeIndex=1
				}
		},
		transferOnChange(value){ //转账类型事件
			let _this=this
			if(value=='1'){//行外
				_this.recTransferBankIndex=0
				_this.form.recvAccountOpenBankName=''
				_this.form.branchName=''
				_this.form.rcvNode=''
				_this.form.recAccount=''
				_this.form.recName=''
			}else{//行内
				_this.recTransferBankIndex=1
				_this.form.rcvNode=''
				_this.form.rcvLinkBank=''
				_this.form.recopenNode=''
				_this.form.feeWithoutDiscount=''
				_this.form.feeWithDiscount=''
				_this.form.recAccount=''
				_this.form.recName=''
			}
		},
		transferMothodChange(value){//转账方式事件
			let _this=this
			if(value=='1'){
				_this.devIndex='1'
				_this.form.bespeak=false
				_this.bespeakIndex='1'
			}else{
				_this.devIndex='0'
			}
		},
		payeeClick(){
			let _this=this
			_this.$emit("goShowPage","0",_this.form)
			
		},
		recAccountChange(val){
			let _this=this
			_this.form.acNamedisabled=false
			//_this.form.recName=''
		},
		sellClick(){
			let _this=this
			_this.$emit("goOtherBankPage","0",_this.form)
			
		},
		groupDiviList(){//查询集团组别信息
			let _this = this
			let queryData = {}
			_this.$tools.request(_this, "CB040405.do", queryData).then(
				data => {
					if(data.body.errorCode == '0'){
						_this.groupInfoList = data.body.groupInfoList
						let tempDate = {groupName:'其它',groupNo:'otherAccNo'}
						_this.groupInfoList.push(tempDate)
					}
			})
		},
		getGroupAccList(){
			let _this = this
			_this.form.payAccountNo = ''
			_this.form.balance = ''
			let queryData = {}
			if('otherAccNo' == _this.form.acctGroup){
				queryData.reqTP = 'A'
				if(_this.groupInfoList.length <= 1){
					_this.payAccounts = _this.groupSessionAccs
					return
				}
			}else {
				queryData.reqTP = 'G'
				queryData.groupNo = _this.form.acctGroup
			}
			_this.$tools.request(_this, "CB040406.do", queryData).then(
				data => {
					let payAccountsTemp = _this.groupSessionAccs
					console.log('payAccountsTemp',payAccountsTemp)
					_this.payAccounts = []
					if(data.body.errorCode == '0'){
						let acctGroupList = data.body.acctGroupList
						if('otherAccNo' == _this.form.acctGroup){
							let flag1 = false
							for(let i=0;i<payAccountsTemp.length;i++){
								for(let j=0;j<acctGroupList.length;j++){
									if(acctGroupList[j].acctNo == payAccountsTemp[i].accNo){
										flag1 = false
										break
									}else if(Number(acctGroupList.length-1) == j){ //最后一条数据
										flag1 = true
									}
								}
								if(flag1){
									_this.payAccounts.push(payAccountsTemp[i])
								}
							}
						}else {
							let temp = []
							for(let j=0;j<acctGroupList.length;j++){
								for(let i=0;i<payAccountsTemp.length;i++){
									if(acctGroupList[j].acctNo == payAccountsTemp[i].accNo){
											_this.payAccounts.push(payAccountsTemp[i])
									}
								}
							}
						}
					}
			})
		},
	},//事件方法methods_end
	mounted(){
		let _this=this
		_this.retrieveAccts()
		_this.loadPurpose()
		//_this.loadSubAcct()
		_this.form = $.extend({},_this.form,_this.fillinMsg)   //从父组件传来的值可能是空或对象
		_this.groupDiviList()
	}
}
</script>