<template>
<div class="entrystep1 mt20">
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>批次明细表</caption>
        <tr>
          <td><span class="cRed">*</span>付款账号：</td>
          <td >
            <el-form-item prop="payAccountObj" style="width:300px" class="g">
              <el-select  placeholder="请选择付款账号" v-model="form.payAccountObj" :disabled="patchTransList.length != 0" @change="getBalance" >
                <template v-for="item in cardList">
                  <el-option :label="item.lable" :value="item.value"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <span class="cOrange m15"  v-if="balanceIndex==0">人民币余额：{{$tools.utils.currencyFormat(form.balance)}}元</span>
          </td>
        </tr>
        <tr>
         <td>转账方式：</td>
              <td>
                <el-radio-group v-model="form.symbolType" :disabled="patchTransList.length != 0">
                  <el-radio label="0">普通转账</el-radio>
                  <el-radio label="1">次日到账</el-radio>
                </el-radio-group>
              </td>
           </tr>
      </table>
    </el-form>
    <!--table布局-->
    <!--手工添加列表-->
    <div class="mt20">
       <a href="javascript:;" @click="deleteData">删除</a>
       <a href="javascript:;" class="ml10" @click="add">+手工新增</a>
    </div>
    <div class="tableData mt5">
        <el-table :data="tableList" stripe @select="selectCheckBox" @select-all="selectCheckBox">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column  width="40" label="序号">
            <template  scope="scope">
              {{Number(scope.$index)+(currentPage-1)*pagesize+1}}
            </template>
          </el-table-column>
          <el-table-column width="150" prop="payAccount" label="付款账号"></el-table-column>
          <el-table-column width="150" prop="recAcc" label="收款账号"></el-table-column>
          <el-table-column prop="rcvFirmName" label="收款人姓名"></el-table-column>
          <el-table-column prop="recBankName" label="收款账号开户行"></el-table-column>
          <el-table-column prop="amt" label="金额">
            <template  scope="scope">
              {{$tools.utils.currencyFormat(scope.row.amt)}}元
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template  scope="scope">
              <a class="cOrange" @click="check(Number(scope.$index)+(currentPage-1)*pagesize)">查看</a>
              <a class="cOrange ml5" @click="modifyData(Number(scope.$index)+(currentPage-1)*pagesize)">修改</a>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="mt10 tar">
      总笔数：{{patchTransList.length}}
      总金额：￥{{$tools.utils.currencyFormat(amtTotal)}}元
    </div>
    <!--手工添加列表--END-->
    <!--分页-->
    <div class="pagination tar mt20">
      <el-pagination 
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="paginationTotal"
      >
      </el-pagination>
    </div>
    <!--分页--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="nextStep" :disabled="patchTransList.length == 0">下一步</el-button>
    </div>
    <!--弹窗1-->
    <el-dialog title="常用收款人" :visible.sync="dialogVisible" size="small" :before-close="preeClose">
      <selTransferPayee  v-if="dialogVisible" @goShowPage="showDialogVisible" :selTransferPayeeMsg="formAdd"></selTransferPayee>
    </el-dialog>
    <!--弹窗2-->
    <el-dialog title="查询收款行" :visible.sync="otherBankDialogVisible" size="small" >
      <selectOtherBankName v-if="otherBankDialogVisible"  @goOtherBankPage="otherBankPageName" :selankPageNameMsg="formData1">
      </selectOtherBankName>
    </el-dialog>
    <!--手工录入弹窗-->
    <el-dialog :visible.sync="dialogTableVisible" @close="closeAdd" v-if="dialogTableVisible" >
        <!-- 手续费弹窗 -->
        <el-popover ref="popover1"  placement="right"  width="400" trigger="click">
          <el-table :data="gridData">
            <el-table-column  property="data" label="收费说明"></el-table-column>
            <el-table-column  property="name" label="收费"></el-table-column>
          </el-table>
          <span>说明：具体以实际转账为准</span>
        </el-popover>
        <!--table布局-->
        <el-form ref="formAdd" :model="formAdd" :rules="rulesAdd" class="formEmbedTable">
          <table>
            <caption>付款人信息</caption>
            <tr>
              <td><span class="cRed">*</span>转账类型</td>
              <td>
                <el-radio-group v-model="formAdd.bankFlag" prop="bankFlag"  @change="transferOnChange">
                  <el-radio label="0">行内转账</el-radio>
                  <el-radio label="1">他行转账</el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td><span class="cRed">*</span>付款账号：</td>
              <td>
                <el-form-item prop="payAccount">
                  <el-input v-model="formAdd.payAccount" :disabled="true"></el-input>
                </el-form-item>
                <span class="cOrange m15" >余额：{{$tools.utils.currencyFormat(form.balance)}}元</span>
              </td>
            </tr>
             <tr>
         	<td>转账方式：</td>
              <td>
                <el-radio-group v-model="formAdd.symbolType" :disabled="true">
                  <el-radio label="0">普通转账</el-radio>
                  <el-radio label="1">次日到账</el-radio>
                </el-radio-group>
              </td>
           </tr>
          </table>
        </el-form>
        <!--table布局-->
        <!--table布局-->
        <el-form ref="formAdd1" :model="formAdd1" :rules="rulesAdd1" class="formEmbedTable mt20">
          <table>
            <caption>收款人信息</caption>
            <tr>
              <td><span class="cRed">*</span>收款账号：</td>
              <td>
                <el-form-item prop="recAcc" ref="recAcc"><!--:rules="{type:'number',required:true,pattern:/^\d{16|19}$/,message:'请输入正确收款人账号'}"-->
                  <el-input v-model="formAdd1.recAcc" placeholder="收款账号"></el-input>
                </el-form-item>
                <a class="cOrange m15" @click="searchPayee"><i class="el-icon-search"/>常用收款人</a>
              </td>
           </tr>
           <tr>
              <td><span class="cRed">*</span>收款账号户名：</td>
              <td>
                <el-form-item  prop="rcvFirmName" ref="rcvFirmName"> 
                  <el-input v-model="formAdd1.rcvFirmName" placeholder="收款账号户名"></el-input>
                </el-form-item>
              </td>
           </tr>
           <tr>
              <td><span class="cRed">*</span>转账金额：</td>
              <td>
                <el-form-item prop="amt">
                  <ynet-currency-input v-model="formAdd1.amt" name="amount" placeholder="转账金额" :showChinese="false"></ynet-currency-input>
                </el-form-item>
                <a  class="cOrange m15" v-popover:popover1 ><i class="el-icon-search"/>手续费标准</a>
              </td>
           </tr>
           <tr>
              <td>金额大写：</td>
              <td>{{$tools.utils.toChinese(Number(formAdd1.amt))}}</td>
           </tr>
           <tr v-if="recTransferBankIndex==0">
              <td><span class="cRed">*</span>收款账号开户行：</td>
              <td>     
                <el-form-item prop="recBankName" class="fullLine" >
                  <el-input v-model="formAdd1.recBankName" placeholder="收款账号开户行" :disabled="true"  style="width:300px"></el-input>
                  <a class="cOrange m15" @click="sellClick"><i class="el-icon-search"/>查询收款行</a>
                </el-form-item>
              </td>
          </tr>
           <tr>
              <td>收款人手机号：</td>
              <td>
                <el-form-item prop="mobilePhone">
                  <el-input v-model="formAdd1.mobilePhone" placeholder="收款人手机号"  @change="mobilePhoneChange"></el-input>
                </el-form-item>
                <span class="cGray m15">免费通知其汇款信息</span>
              </td>
           </tr>
           <tr>
              <td><span class="cRed">*</span>用途：</td>
              <td>
                <el-form-item prop="purpose">
                    <el-select v-model="formAdd1.purpose" placeholder="用途" @change="onChangePurpose">
                        <template v-for="item in POSTSCRIPTList">
                          <el-option :label="item.label" :value="item.value"></el-option>
                        </template> 
                    </el-select>
                            <span v-if="formAdd1.purposeIndex=='0'" >
					 		<el-input v-model="formAdd1.purposeOther" placeholder="请输入用途"  style="width:300px"></el-input>
				 		</span>   
                  </el-form-item>
<!--                 <span class="cBlue">你说填写的附言，将发送给收款人</span> -->
              </td>
           </tr>
           <tr>
              <td>附言：</td>
              <td>
                <el-form-item prop="POSTSCRIPT">
                  <el-input v-model="formAdd1.POSTSCRIPT" placeholder="附言"></el-input>
                </el-form-item>
                <span class="cGray m15">您所填写的附言，将发送发给收款人</span>
              </td>
           </tr>
           <tr>
              <td>备注：</td>
              <td>
                <el-form-item prop="bak">
                  <el-input v-model="formAdd1.bak" placeholder="备注"></el-input>
                </el-form-item>
                <span class="cGray m15">填写备注有助于你备忘，该信息不会发给收款人</span>
              </td>
           </tr>
           <!--<tr v-if="devIndex==0">
              <td>预约处理：</td>
                <td>
                <el-form-item prop="isOrder">
                  <el-checkbox-group v-model="formAdd1.isOrder" @change="isOrderChange">
                      <el-checkbox label=""  name="isOrder" ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </td>
          </tr>
          <tr v-if="isOrderIndex==0 && devIndex==0">
            <td><span class="cRed">*</span>预约日期：</td>
              <td>
                <el-form-item prop="orderDate">
                  <el-date-picker v-model="formAdd1.orderDate" type="date"  placeholder="选择日期" @change="formAdd1.isOrderDateChange=$tools.utils.formatDate(form.orderDate)"></el-date-picker>
                  <el-select v-model="formAdd1.orderTimeType" placeholder="请选择时间"   >
                    <el-option v-for="item in timeOptions" :label="item.label" :value="item.value"></el-option>  
                  </el-select>
                </el-form-item>
              </td>
          </tr>
          <tr v-if="isOrderIndex==0 && devIndex==0">
            <td>预约通知手机号：</td>
              <td>
                <el-form-item prop="recmobile">
                  <el-input v-model="formAdd1.recmobile" placeholder="请输入预约通知手机号码" ></el-input>
                  <span class="cBlue">用于接收预约处理结果短信</span>
                </el-form-item>
              </td>
          </tr>-->
          </table>
        </el-form>
        <!--table布局-->
        <div slot="footer" class="dialog-footer btnArea tac">
          <el-button type="primary"  @click="submitPopForm"><template v-if="isAdd">添加</template><template v-if="!isAdd">修改</template></el-button>
          <el-button  @click="dialogTableVisible=false">取 消</el-button>
        </div>
    </el-dialog>
    <!--手工录入弹窗--END-->

    <!--查看弹窗---->
    <el-dialog :visible.sync="dialogChaVisible">
      <!--table布局-->
        <div class="formEmbedTable">
          <table>
            <caption>转账基本信息</caption>
              <tr>
                <td>付款账号账户名：</td>
                <td>{{checkData.payName}}</td>
                <td>收款账号账户名：</td>
                <td>{{checkData.rcvFirmName}}</td>
            </tr>
            <tr>
                <td>付款账号：</td>
                <td>{{form.payAccount}}</td>
                <td>收款账号：</td>
                <td>{{checkData.recAcc}}</td>
            </tr>
            <tr>
                <td>付款账号开户行：</td>
                <td>{{formAdd1.payBankName}}</td>
                <td>收款账号开户行：</td>
                <td>{{checkData.recBankName}}</td>
            </tr>
            <tr>
                <td>转账金额：</td>
                <td>{{checkData.amt}}元</td>
                <td>金额大写：</td>
                <td>{{$tools.utils.toChinese(Number(checkData.amt))}}</td>
            </tr>
            <tr>
                <td>手续费（参考）：</td>
                <td v-if="checkData.bankFlag=='1'">{{$tools.utils.currencyFormat(checkData.netFee)}}元</td>
                <td v-if="checkData.bankFlag=='0'">免手续费</td>
                <td>金额大写：</td>
                 <td v-if="checkData.bankFlag=='0'">免手续费</td>
                <td v-if="checkData.bankFlag=='1'">{{$tools.utils.toChinese(Number(checkData.netFee))}}</td>
            </tr>
            <tr>
                <td>付款用途：</td>
                <td>{{checkData.purpose}}</td>
                <td>备注：</td>
                <td>{{checkData.bak}}</td>
            </tr>
          </table>
        </div>
        <!--table布局-->
        <div slot="footer" class="dialog-footer btnArea tac">
          <el-button @click="dialogChaVisible=false">关闭</el-button>
        </div>
   </el-dialog>
    <!--查看弹窗--END-->

</div>
</template>

<script>  
import selTransferPayee from './selectTransferPayee';
import selectOtherBankName from './selectOtherBankName';
export default {
  name:'entry',
  components:{
      selTransferPayee,
      selectOtherBankName
  },
  data(){
    return{
      user:this.$tools.storage.get("user","save"),
      cardList:[],
      form:{
        balance:0,
        symbolType:"0",
      },
      rules:{
    	  payAccountObj: [{ message: '请选择付款账号', required: true}]
      },
      formAdd:{
        bankFlag:"0",
        payAccount:"",
        symbolType:"0",
        payName:"",
      },
      formAdd1:{
    	rcvNode:'',
        recAcc:"",
        rcvFirmName:"",
        amt:"",
        mobilePhone:"",
        POSTSCRIPT:"",
        bak:"",
	    payName:'',
		recmobile:'',
        receivableFee:0,
        netFee:0,
        recBankName:'创兴银行',
        recBankId:'',
        accName:'',//付款账户名
        recopenbankNo:'',
        purpose:'',
        purposeIndex:'1',
        purposeOther:'',
        tempPurpose:''

      },
      rulesAdd:{  
        bankFlag:[{ message: '请选择转账类型', required: true}],
        payAccount: [{ message: '请选择付款账号', trigger:'change', required: true}],
      },
      rulesAdd1:{
        recAcc:[{ validator:this.validatorCardNumber, trigger: 'blur'},{ trigger: 'change', validator: this.$tools.validator.isAccNo }],
        rcvFirmName:[{ validator:this.validatorRcvFirmName, trigger: 'blur'}],
        amt:[{ validator:this.validatorTransAmount, trigger: 'blur'}],
        recBankName:[{ message: '请填写收款人开户行', trigger:'blur', required: true}],
        //orderDate:[{ validator:this.validatorDate, trigger: 'blur', required: true}],
        mobilePhone:[{ validator:this.validatorPhoneNumber, trigger: 'blur'}],
        //recmobile:[{ validator:this.validatorPhoneNumber, trigger: 'blur'}],
        bak:[{ validator:this.validatorBak, trigger: 'blur'}],
        purpose:[{validator:this.validatorPurpose, trigger:'change', required: true}],//validatorPurpose
        POSTSCRIPT:[{ validator:this.validatorBak, trigger: 'blur'}],
      },
      gridData: [
					    {
				          data: '人民币 1万元以下（含人民币 1万元）',
				          name: '人民币 2元',
				        }, 
				        {
				          data: '人民币 1-10万元（含人民币 10万元）',
				          name: '人民币 5元',
				        }, 
				        {
				          data: '人民币10-50万元（含人民币 50万元）',
				          name: '人民币 15元',
				        }, 
				        {
				          data: '人民币50-500万元（含人民币 500万元）',
				          name: '人民币 20元',
				        },
			            {
				          data: '人民币500-1000万元（含人民币 1000万元）',
				          name: '人民币 50元',
				        },
			            {
				          data: '人民币1000万元以上',
				          name: '人民币 100元',
				        }
		        ],
      POSTSCRIPTList: [],
      tableList:[],
      recordDelList:[],
      patchTransList:[],
      trIndex:"",
      paginationTotal:0,
      pagesize:10,
      currentPage:1,
      isAdd:true,
      isPopSure:false,
      amtTotal:0,
      dialogTableVisible:false,
      dialogChaVisible:false,
      checkData:{},
      balanceIndex:'1',
      recTransferBankIndex:'1',
      devIndex:"0",
      dialogVisible: false,
      otherBankDialogVisible:false,
      formData1:{},
      daySumCorpor:0,
      daySumPerson:0,
      rcvFirmNameLength:40,
      bakLength:120,
    }
  },
  props:{
    formData:{},
  },
  methods: {
	  
	  preeClose(){
		  let _this = this
		  _this.dialogTableVisible=true
	  },
    //获取用户卡列表
    getCardList(){
      let _this = this
      let _list = _this.$tools.storage.get("user","save")
      let _operAccInfoList = _list.operAccInfoList
      let customerID=_list.cstNo
      if(_operAccInfoList == undefined){
        this.$alert('查询卡列表失败', '提示')
        return
      }
  		for(let i=0;i<_operAccInfoList.length;i++){
        let _right=_operAccInfoList[i].right
        let auth=_operAccInfoList[i].auth
        let type=_operAccInfoList[i].type
		let groupFlag=_operAccInfoList[i].groupFlag
		let currType=_operAccInfoList[i].currType
		let _cstNo=_operAccInfoList[i].cstNo
		
        if((_right.substr(0,1)=='1') && auth=='2' &&type=='1' &&groupFlag !='1'&&currType=='CNY' &&customerID==_cstNo){
          let _acno=_operAccInfoList[i].accNo
          let _name = _operAccInfoList[i].accName
          let _alias = _operAccInfoList[i].alias
          if(_alias=='' ||_alias==null){
  		    	_alias=_name
  		    }
          let _lable=_operAccInfoList[i].accNo+'['+_this.$tools.dict.currTypeDict(_operAccInfoList[i].currType) +']'+'['+_alias +']'
          let cardNO = _lable //+_name
  		  _this.cardList.push({"value":_acno,"lable":_lable})
          }
  		}
    },
    //查询卡余额
    getBalance(){
      let _this=this
      _this.form.payAccount = _this.form.payAccountObj
      let oAccInfoList=_this.user.operAccInfoList
      for(let k=0;k<oAccInfoList.length;k++){
   	   let _payAccountNo=oAccInfoList[k].accNo
   	   if(_this.form.payAccount==_payAccountNo){
   		   _this.formAdd1.payName=oAccInfoList[k].accName
   		   //alert(oAccInfoList[k].openBankName)
   		   _this.formAdd1.payBankName=oAccInfoList[k].openBankName
   	   }
      }
      if(_this.formAdd1.payBankName==''||_this.formAdd1.payBankName==undefined){
    	  _this.formAdd1.payBankName='创兴银行'
      }
      
      let body={}
      body.accNo=_this.form.payAccount
      if(_this.form.payAccount !=''){
        _this.$tools.request(_this,"CB000001.do",body).then(
      data=>{
          let errorCode =data.body.errorCode
          if(errorCode =='0'){
            let accNoList = data.body.accNoList
            let sumBalance = 0
            for(let i=0;i<accNoList.length;i++){
              if(accNoList[i].CRY == "CNY"){
                sumBalance += Number(accNoList[i].AVL_BAL)
              }
            }
            _this.form.balance = sumBalance
            _this.balanceIndex=0
          }else{
            _this.balanceIndex=1
          }
            }
          )
      }
    },
    add(){
      let _this = this
      _this.recTransferBankIndex='1'
      _this.formAdd1.purposeIndex='1'
      _this.formAdd1.purposeOther=''
      _this.formAdd1.purpose=''
       if(_this.patchTransList.length>999){
        	  this.$alert("已达到最大笔数", '温馨提示');
        	  return
          }
      if(undefined != _this.$refs.formAdd){
        _this.$refs.formAdd.resetFields()
        _this.$refs.formAdd1.resetFields()
      }
      _this.formAdd.bankFlag='0'
      _this.formAdd1.recAcc=''
      _this.formAdd1.rcvFirmName=''
	  _this.formAdd1.amt=''
      _this.formAdd1.recBankName=''
      _this.formAdd1.mobilePhone=''
      _this.formAdd1.POSTSCRIPT=''
      _this.formAdd1.bak='' 
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.dialogTableVisible=true
          _this.isAdd=true
          _this.formAdd.payAccount=_this.form.payAccount
          _this.formAdd.symbolType=_this.form.symbolType
        }
      })
      
    },
    
	onChangePurpose(value){ //选择用途事件
		 let _this=this
		 if(value.indexOf("其它")>=0||value.indexOf("其他")>=0){
			  _this.formAdd1.purposeIndex='0'
		 }else{
			 _this.formAdd1.purposeIndex='1'
		 }
	},
    //转账类型
    transferOnChange(value){ 
			let _this=this
		if(value=='1'){//行外
			_this.recTransferBankIndex=0
	        _this.formAdd1.recBankName=''
		}else{//行内
			_this.recTransferBankIndex=1
	       // _this.formAdd1.recBankName = "创兴银行"
	        _this.formAdd1.receivableFee = 0//他行应收手续费
	        _this.formAdd1.netFee = 0 //他行实收手续费
	        _this.formAdd1.rcvNode = "" //本行收款行清算行号
	        console.log("formAdd",_this.formAdd)
	        console.log("formAdd1",_this.formAdd1)
			}
		},
    searchPayee(){
			let _this=this
			_this.dialogVisible=true
			_this.dialogTableVisible=false
		},
    
    sellClick(){
			let _this=this
			_this.otherBankDialogVisible=true
			_this.dialogTableVisible=false
		},
    modifyData(index){
      let _this=this
      _this.isAdd=false
      _this.trIndex=index
      _this.formAdd =_this.patchTransList[index]
      _this.formAdd1 = $.extend({},_this.patchTransList[index])
      if( _this.formAdd1.purpose==_this.formAdd1.purposeOther){
     	 _this.formAdd1.purpose='其他'//_this.formAdd1.tempPurpose
      }
      _this.dialogTableVisible=true
    },
    submitPopForm(){
      let _this=this
      _this.formAdd1.purpose=_this.formAdd1.purpose
      _this.$refs.formAdd.validate((valid) => {
        _this.$refs.formAdd1.validate((valid1) => {
          if (valid && valid1) {
            let body = {}
            body.accNo = _this.formAdd1.recAcc
            body.transferType = _this.formAdd.bankFlag
            body.cstNo = _this.user.cstNo
            body.accountNo = _this.formAdd.payAccount
            body.transAmount = _this.formAdd1.amt
            body.recName=_this.formAdd1.rcvFirmName
            console.log("body",body)
            //查询手续费
            _this.$tools.request(_this,"CB020101.do",body).then(
              data=>{
                      let errorCode = data.body.errorCode
                      let errorMsg =data.body.errorMsg
                      if(errorCode =='0'){
                    	  _this.formAdd1.status= data.body.status
                          if(_this.formAdd.bankFlag=='0'){
                          	if(_this.formAdd1.status!='0'){
       					    	 if(_this.formAdd1.status=='3'){
       					    		_this.formAdd1.status='3'
     			    				this.$refs['rcvFirmName'].validate("blur")
       					    	 }else{
       					    		_this.formAdd1.status='1'
       					    		 this.$refs['recAcc'].validate("blur")
       					    	 }
       					     return
       					    }
                          	_this.formAdd1.recBankId=data.body.OPEN_BANK_NO
                            _this.formAdd1.rcvNode = data.body.OPEN_BANK_NO//本行收款行清算行号
                            _this.formAdd1.recBankName = data.body.branchName
                          }
                        _this.formAdd1.receivableFee = data.body.feeWithoutDiscount//他行应收手续费
                        _this.formAdd1.netFee = data.body.feeWithDiscount//他行实收手续费

                        console.log("_this.formAdd1",_this.formAdd1)
                        if(_this.formAdd1.purpose.indexOf('其他')>=0||_this.formAdd1.purpose.indexOf('其它')>=0){
                      	 // _this.formAdd1.tempPurpose=_this.formAdd1.purpose
                      	  _this.formAdd1.purpose=_this.formAdd1.purposeOther
                        }
                        _this.sendPopData()
                      }else{
                    	  if(errorMsg.indexOf('账户不存在')>=0){
	    			              _this.formAdd1.status='2';
	    			              this.$refs['recAcc'].validate("blur")
	    			           
		                   } else{
		            	    this.$alert(errorMsg, '温馨提示');
   			            }
                        return
                        //_this.balanceIndex=1
                      }
                    })
          } else {
            return false
          }
        });
      });
    },
    sendPopData(){
      let _this = this
      console.log("_this.formAdd",_this.formAdd)
      console.log("_this.formAdd1",_this.formAdd1)
      let obj = $.extend({},_this.formAdd,_this.formAdd1)
      console.log("obj",obj)
      if(_this.isAdd){
        _this.patchTransList.unshift(obj)
        _this.handleCurrentChange(1)
      }else{
        _this.patchTransList[_this.trIndex]=obj
        _this.handleCurrentChange(_this.currentPage)
      }
      _this.isPopSure=true
      _this.amtSum()
      _this.resetPatchTransListIndex()
      _this.dialogTableVisible=false
      _this.paginationTotal=_this.patchTransList.length
    },
    closeAdd(){
      let _this=this
      _this.isPopSure=false
    },
    resetPatchTransListIndex(){
      let _this=this
      for(let i=0;i<_this.patchTransList.length;i++){
        _this.patchTransList[i].trIndex=i
      }
    },
    amtSum(){

      let _this=this
      _this.amtTotal=0
      for(let i=0;i<_this.patchTransList.length;i++){

        _this.amtTotal+=Number(_this.patchTransList[i].amt)
      }
      _this.amtTotal=parseFloat(_this.amtTotal).toFixed(2)
//       if(toString(_this.amtTotal).indexOf('.')<0){
//         _this.amtTotal+=".00"
//       }
      
    },
    selectCheckBox(selection,row){
      let _this=this
      _this.recordDelList = selection
    },
    deleteData(){
      let _this=this
      if(!_this.recordDelList.length) _this.$alert('请选择要删除的转账名单', '温馨提示')
      else{
        _this.$alert('确定删除选中的转账名单？', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
                    let removeIndexArray=[]
                    for(let i=0;i<_this.recordDelList.length;i++){
                      let trIndex=_this.recordDelList[i].trIndex
                      removeIndexArray.push(trIndex)
                    }
                    _this.patchTransList=_this.$tools.array.removeArray(_this.patchTransList,removeIndexArray)
                    _this.handleCurrentChange(_this.currentPage)
                    _this.resetPatchTransListIndex()
                    _this.amtSum()
                    _this.paginationTotal=_this.patchTransList.length
                    _this.recordDelList=[]
            }
        })
      }
    },
    check(index){
      let _this=this
      _this.dialogChaVisible=true
      _this.checkData=_this.patchTransList[index]
    },
    handleCurrentChange(currentPage){
      let _this=this
      _this.currentPage=currentPage
      let startPage=(currentPage-1)*_this.pagesize
      let endPage=currentPage*_this.pagesize-1
      _this.tableList=_this.$tools.array.intercept(_this.patchTransList,startPage,endPage)
    },
    showDialogVisible(index,formData1){
				let _this=this
        if(formData1 != undefined){
          _this.formData1 = formData1
          _this.formAdd1.recAcc = formData1.recAccount
          _this.formAdd1.rcvFirmName = formData1.accountName
          _this.formAdd1.recBankName = formData1.recBankName
          _this.formAdd1.recopenbankNo = formData1.rcvLinkBank //联行号
          _this.formAdd1.recBankId = formData1.rcvNode
          _this.formAdd1.mobilePhone = formData1.mobilePhone
          _this.dialogVisible = false
          _this.dialogTableVisible=true
        }else{
          _this.dialogVisible = false
          _this.dialogTableVisible=true
        }
		},
    otherBankPageName(index,formData1){
			//alert(formData1.rcvNode+","+formData1.rcvLinkBank)
      let _this=this
      if(formData1 != undefined){
	      _this.formAdd1.recBankName = formData1.recopenNode
	      _this.formAdd1.recBankId = formData1.rcvNode  
	      _this.formAdd1.recopenbankNo = formData1.rcvLinkBank  //联行号
	      _this.otherBankDialogVisible = false
	      _this.dialogTableVisible=true
      }else{
          _this.otherBankDialogVisible = false
          _this.dialogTableVisible=true
        }
    },
    nextStep(){
      let _this=this
      let formData={patchTransList:_this.patchTransList,
                    amtTotal:_this.amtTotal,
                    paginationTotal:_this.paginationTotal,
                    payObj:_this.form.payAccountObj,
                    balIndex:_this.balanceIndex,
                    bal:_this.form.balance,
                    sType:_this.form.symbolType,
                    pName:_this.formAdd1.payName
                   }
                   console.log("formData",formData)
      _this.$emit("changeStep","1",formData)
    },
    preData(){
      let _this=this
      _this.patchTransList = _this.formData.patchTransList
      _this.amtTotal = _this.formData.amtTotal
      _this.paginationTotal = _this.formData.paginationTotal
      _this.form.payAccount = _this.formData.patchTransList[0].payAccount
      _this.handleCurrentChange(1)
    },
    //校验银行卡号
    validatorCardNumber(rule, value, callback){
      let _this=this
      if("" == value) return callback("请输入收款人账号")
      //if(!(/^\d{5,32}$/.test(value))) return callback("请输入正确格式银行卡号")
      if(_this.formAdd.payAccount == value) return callback("收款人账号与付款人账号不能相同")
      
      if(_this.formAdd.payAccountNo == value) return callback("收款人账号与付款人账号不能相同")
		if(_this.formAdd1.status !='' && _this.formAdd1.status !=undefined ){
			if(_this.formAdd1.status =='2'){
				_this.formAdd1.status=''
				return callback("输入账户有误 ,请重新输入")	
			}
			if(_this.formAdd1.status =='1'){
				_this.formAdd1.status=''
				return callback("收款账户不支持转账")	
			}
			callback()
		}
      
      
      
      callback()
    },
    //校验转账金额
    validatorTransAmount(rule, value, callback){
      let _this=this
      if("" == value || "0.00" == value) return callback("请输入转账金额")
      if(!(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value))) return callback("请输入正确金额格式")
      let bal=_this.form.balance
	  if(parseFloat(parseFloat(value).toFixed(2))>parseFloat(parseFloat(bal).toFixed(2))) return callback("转账金额超过余额")
      let _payAccountNo = _this.formAdd.payAccount
		if(_payAccountNo!=''){
			 let body={}
			 let userStorge=_this.$tools.storage.get("user","save")
	    	  body.cstNo=userStorge.cstNo  //后续更改session获取
			  body.accountNo=_payAccountNo
			  body.payAmount=value
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
      if(value == "") return callback("请输入日期")
      let _this = this
      let _date = _this.$tools.utils.formatDate(value)
      let _today = _this.$tools.utils.formatDate(new Date())
      if(_date < _today){
        return callback("日期不能小于当前日期")
      }
      // if(!_this.$tools.utils.compareDate(startDate,endDate,"1")){
      //   return callback("日期不能超过1个月")
      // }
      callback()
    },
    //校验手机号
    validatorPhoneNumber(rule, value, callback){
      let _this=this
      if("" == _this.formAdd1.mobilePhone) return callback()
      if(!_this.$tools.validator.isNumber(_this.formAdd1.mobilePhone)) return callback("请输入数字")
      if(!_this.$tools.validator.isPhone(_this.formAdd1.mobilePhone)) return callback("请输入正确格式手机号码")
      callback()
    },
    
    mobilePhoneChange(value){
		let _this=this
		_this.formAdd1.mobilePhone=value
	},
    //校验收款人账户名
    validatorRcvFirmName(rule, value, callback){
      let _this=this
      if("" == value) return callback("请输入收款人账户名")
      if(!/^[A-Za-z0-9\u4e00-\u9fa5()_（）——]+$/.test(value)) return callback("收款人账户名不能含有特殊字符")
      if(_this.getRcvFirmNameLength(value) > _this.rcvFirmNameLength) return callback("收款人账户名不能大于十个中文字符或二十个英文字符")
	  	if(_this.formAdd1.status =='3'){
			_this.formAdd1.status=''
			return callback("输入收款人账户名有误,请重新输入")	
		}
      callback()
    },
	//校验用途
	validatorPurpose(rule, value, callback){
	let _this=this
    if(""==value) {
    	return callback("请选择付款用途")
    }else if(value.indexOf("其他")>=0||value.indexOf("其它")>=0){
    	if(""==_this.formAdd1.purposeOther||_this.formAdd1.purposeOther==undefined||_this.formAdd1.purposeOther=='undefined'){
    		return callback("请输入付款用途")
    	}else if(!/^[A-Za-z0-9\u4e00-\u9fa5()_（）——]+$/.test(_this.formAdd1.purposeOther)) {
    		return callback("付款用途不能含有特殊字符")
    	}else if(_this.getRcvFirmNameLength(_this.formAdd1.purposeOther) > 20) {
    		return callback("付款用途不能大于十个中文字符或二十个英文字符")
    	}
    }
	callback()
	},
    //校验备注
    validatorBak(rule, value, callback){
      let _this=this
      if("" == value) return callback()
      if(!/^[A-Za-z0-9\u4e00-\u9fa5()_,.; （）——，。； ]+$/.test(value)) return callback("录入信息不能含有特殊字符")
      if(_this.getRcvFirmNameLength(value) > _this.bakLength) return callback("录入信息不能大于五十个中文字符或一百个英文字符")
      callback()
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
			    					let _purposeName=tranPurposeList[i].purposeName
			    					 _this.POSTSCRIPTList.push({"value":_purposeName,"lable":_purposeName})
			    				}
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
  },
  mounted(){
    let _this=this
    if(_this.formData && _this.formData.patchTransList){
      _this.preData()
    }
    _this.getCardList()
    _this.loadPurpose();
    _this.form.payAccountObj = _this.formData.payObj
    _this.balanceIndex=_this.formData.balIndex
    _this.form.balance=_this.formData.bal
    
    _this.form.symbolType=_this.formData.sType
    if(_this.form.symbolType==undefined){
    	_this.form.symbolType='0'
    }
    _this.formAdd1.payName=_this.formData.pName
    //alert(JSON.stringify(_this.form))
  }
}

</script>
<style>
 .g .el-input{width:300px;}
</style>