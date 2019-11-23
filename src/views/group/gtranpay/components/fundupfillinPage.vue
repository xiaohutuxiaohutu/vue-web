<template>
  <div>
    <div class="fourForm tableForm mt20">
       <h3>付款信息</h3>
       <el-form ref="form" :model="form" :rules="rules" class="mb30">
          <el-row>
          <el-form-item label="转出子公司组别：" ref="" prop="acctGroup" class="fullLine">
            <el-select v-model="form.acctGroup" placeholder="请选择" @change="getGroupAccList">
              <template v-for="item in groupInfoList">
                  <el-option :label="item.groupName" :value="item.groupNo"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="转出子公司账号：" prop="payAccountNo" ref="payAccountNo" class="fullLine">
            <el-select v-model="form.payAccountNo" placeholder="请选择" @change="onChangePayAccountNo">
               <template v-for="item in payAccounts">
                  <el-option :label="item.label" :value="item.value"></el-option>
               </template> 
         <!--     <el-option v-for="item in payAccounts" :label="item.label" :value="item.value"></el-option>   -->
            </el-select>
            <span class="cOrange m15" v-if="balanceIndex==0">余额： {{$tools.utils.currencyFormat(form.balance)}}元</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="转出子公司账户名：" prop="payAccountName" class="fullLine">
             <el-input v-model="form.payAccountName" :disabled="true"></el-input>
          </el-form-item>
        </el-row>
       <!--</el-form>-->
      <h3>收款信息</h3>
      <!--<el-form ref="form" :model="form1" :rules="rules" >-->
        <el-row>
          <el-form-item label="转入母公司账号：" prop="recAccount" class="fullLine">
            <el-select v-model="form.recAccount" placeholder="请选择" @change="onChangeRecAccountNo">
              <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>  
            </el-select>
            <span class="cOrange m15" v-if="recBalanceIndex==0">余额： {{$tools.utils.currencyFormat(recBalance)}}元</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="转入母公司账户名：" prop="recName" class="fullLine">
             <el-input v-model="form.recName" :disabled="true"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="存入金额：" prop="transAmount" ref="transAmount" class="fullLine">
             <!--<el-input v-model="form.transAmount"></el-input>-->
             <currency-input ref="transAmount" v-model="form.transAmount" @currency-blur="currentBlur" :showChinese="false"></currency-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="大写："class="fullLine">
            {{$tools.utils.toChinese(form.transAmount)}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="收款方手机号：" prop="mobileNo" class="fullLine">
             <el-input v-model="form.mobileNo"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="用途：" prop="purpose" class="fullLine">
            <el-select v-model="form.purpose" placeholder="请选择"  @change="onChangePurpose">
              <el-option v-for="item in purposes" :label="item.purposeName" :value="item.purposeId+'|'+item.purposeName"></el-option>    
            </el-select>
            <span v-if="purposeIndex==0">
              <el-input v-model="form.purposeOther" placeholder="请输入用途" ></el-input>
            </span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="附言：" prop="postscript" class="fullLine">
            <el-input v-model="form.postscript" maxlength="15"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注：" prop="remark" class="fullLine">
            <el-input v-model="form.remark" maxlength="30"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
       
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="nextStep">下一步</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </div>
    </div>

    
  </div>
</template>

<script>
  import currencyInput from '@src/components/currency-input'  //金额组件
  export default {
    name:'fillinPage',
    components:{
      currencyInput
    },
    props: {
      fillinMsg:{
        type: Object
      }
    },
    data() {
      return {
        use:false,
        rules: {
          acctGroup:[{ message: '请选择子公司组别', trigger:'change', required: true}],
          payAccountNo: [{ message: '请选择付款账号', trigger:'change', required: true}],
          recAccount:[{required:true,message:'请输入收款人账号', trigger:'change'}],
          recName:[{required:true,message:'请输入收款账号户名', trigger:'change'}],
          transAmount:[{validator:this.validatorCurrency, trigger:'blur'}],
          purpose:[{ message: '请选择付款用途', trigger:'change', required: true}],
          // bespeakDate:[{ message: '请选择预约日期',type:'date', trigger:'blur', required: true}],
          // recopenNode:[{ message: '请填写收款人开户行', trigger:'change', required: true}],
          mobileNo:[{ validator:this.validatorPhoneNumber, trigger: 'blur'}],
        },
        form:{
          cstNo:'',
          acctGroup:'',
          acctGroupDesc: '',
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
          remark:'',
          bespeak:'',
          bespeakDate:'',
          bespeakDateChange:'',
          bespeakTimeType:'',
          recmobile:'',
          balance:'',
          payNode:'',//付款人开户行
          payOpenName: '',//付款行名称
          recopenNode:'',//收款人开户行
          recopenName:'',//收户行名称
          mobileNo:'',
          acNamedisabled:false,
          ZCFYHZHLX:'', //取session 数据付款账户类型
          operateFlag:'',//类型：新增0，修改：1
          oldSqno:'',//旧流水号
          ecifNo:'',
          companyFlag:'',
          userId: ''//操作员编号
        },
        recBalance:'',
        recBalanceIndex:'1',
        purposeIndex:'1',
        bespeakIndex:'1',
        balanceIndex:'1',
        recTransferBankIndex:'1',
        devIndex:'0',
        purposes:[{purposeId: "0", purposeName: "其它", desc: "其它", createTime: new Date(),modifyTime: new Date()}],
        payAccounts:[],
        options:[],
        groupSessionAccs:[],
        groupInfoList:[]

      }
    },
    methods: {
      currentBlur(val){   //金额控件失焦事件
        console.log(val)
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
      retrieveAccts(){
        let _this = this
        let list = _this.$tools.storage.get("user","save")
        let operAccInfoList = list ? list.operAccInfoList : []
        for(let i=0;i<operAccInfoList.length;i++){
          let _right = operAccInfoList[i].right
          let _type = operAccInfoList[i].type
          let _currency = operAccInfoList[i].currType
          let _groupFlag = operAccInfoList[i].groupFlag
          let _groupRight = operAccInfoList[i].groupRight
          let _auth = operAccInfoList[i].auth
          // if(_groupFlag == '1' && _currency == 'CNY' && _type == '1' && _right.substr(3,1)=='1'){
          //   let _acno = operAccInfoList[i].accNo
          //   let _name = operAccInfoList[i].accName
          //   let _lable = _this.$tools.utils.mask(_acno,{beforeIndex:3,behindIndex:4})
          //   let lable = _lable + _name
          //   let value = _acno
          //   _this.payAccounts.push({"value":value,"name":_name,"label":lable})//子公司账号列表
          //   return
          // }
          if(_type == '1' && _currency == 'CNY'){//集团转账权限的活期人民币账户
            let _acno=operAccInfoList[i].accNo
            let _name=operAccInfoList[i].accName
            let _alias=operAccInfoList[i].alias
            if(_alias=='' ||_alias==null){
              _alias=_name
            }
            let _lable=operAccInfoList[i].accNo+'['+_this.$tools.dict.currTypeDict(operAccInfoList[i].currType) +']'+'['+_alias +']'
            let lable=_lable
            // let _lable=_this.$tools.utils.mask(_acno,{beforeIndex:3,behindIndex:4})
            // let lable=_lable+_name
            let value=_acno
            if(_groupFlag == '1'){
              if(_right.substr(3,1)=='1' && _groupRight != '' && _groupRight.substr(0,1) == '1'){
                if(_auth == '2'){//操作员动账权限
                  //_this.payAccounts.push($.extend({}, operAccInfoList[i], {"value":value,"name":_name,"label":lable}))//子公司账号列表
                  _this.groupSessionAccs.push($.extend({}, operAccInfoList[i], {"value":value,"name":_name,"label":lable}))//子公司账号列表
                }  
              }
            }else{
              _this.options.push($.extend({}, operAccInfoList[i], {"value":value,"name":_name,"label":lable}))//母公司账号列表
            }
          }
        }
      },
      loadSubAcct(){
        let _this=this
        let body={}
        let userStorge=_this.$tools.storage.get("user","save")
        // body.userNo=userStorge?userStorge.eCIFID:''  //后续更改session获取_this.$tools.storage.get("user","save")
        _this.form.cstNo = body.cstNo = userStorge ? userStorge.cstNo : ''  //后续更改session获取
        _this.form.userId = userStorge ? userStorge.userNo : userStorge.eCIFID
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
                _this.payAccounts.push({"value":value,"name":_name,"label":lable})
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
        body.userNo=userStorge?userStorge.eCIFID:''  //后续更改session获取_this.$tools.storage.get("user","save")
        body.cstNo=userStorge?userStorge.cstNo:''  //后续更改session获取
        _this.form.ecifNo=userStorge?userStorge.hostNo:'' //核心客户号
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
      onChangeRecAccountNo(acctNo){ //母公司账号选择事件
        let _this = this
        for(let i=0; i<_this.options.length; i++){
          if(acctNo == _this.options[i].value){
            _this.form.recName = _this.options[i].name
            _this.form.recopenNode = _this.options[i].openBankNo || ''
            _this.form.recopenName = _this.options[i].openBankName || ''
          }
        }
        _this.loadRecBalance()
		  },
      loadRecBalance(){
        let _this = this
        let body = {}
        body.accNo = _this.form.recAccount
        if(_this.form.recAccount != ''){
          _this.$tools.request(_this,"CB040100.do",body).then(
            data=>{
              let errorCode = data.body.errorCode
              if(errorCode =='0'){
                let accNoList = data.body.accNoList
                let amt
                let sumBalance = '0'
                for(let i = 0; i < accNoList.length; i++){
                  amt = accNoList[i].AVL_BAL
                  sumBalance = Number(sumBalance) + Number(amt)
                }
                _this.recBalance = sumBalance
                _this.recBalanceIndex = 0
              }else{
                _this.recBalanceIndex = 1
              }
            }
          )
        }
      },
      onChangePayAccountNo(acctNo){ //子公司账号选择事件
        let _this = this
        for(let i=0; i<_this.payAccounts.length; i++){
          if(acctNo == _this.payAccounts[i].value){
            _this.form.payAccountName = _this.payAccounts[i].name
            _this.form.payNode = _this.payAccounts[i].openBankNo || ''
            _this.form.payOpenName = _this.payAccounts[i].openBankName || ''
          }
        }
        _this.loadPayBalance()
		  },
      loadPayBalance(){
        let _this = this
        let body = {}
        body.accNo = _this.form.payAccountNo
        if(_this.form.payAccountNo != ''){
          _this.$tools.request(_this,"CB040100.do",body).then(
            data=>{
              let errorCode = data.body.errorCode
              if(errorCode =='0'){
                let accNoList = data.body.accNoList
                let amt
                let sumBalance = '0'
                for(let i = 0; i < accNoList.length; i++){
                  amt = accNoList[i].AVL_BAL
                  sumBalance = Number(sumBalance) + Number(amt)
                }
                _this.form.balance = sumBalance
                if(!_this.form.payNode){
                  _this.form.payNode = accNoList[0].OPEN_BANK_NO
                }
                _this.balanceIndex = 0
              }else{
                _this.balanceIndex = 1
              }
            }
          )
        }
      },
      //查询集团组别信息
      groupDiviList(){
        let _this = this
        let queryData = {}
        _this.$tools.request(_this, "CB040405.do", queryData).then(
            data => {
              if(data.body.errorCode == '0'){
                _this.groupInfoList = data.body.groupInfoList
                let tempDate = {groupName:'其它',groupNo:'otherAccNo'}
               _this.groupInfoList.push(tempDate)
              }else{
              }
        })
      },
      // 查询集团组别下的账号
      getGroupAccList(groupNo){
        let _this = this

        if(groupNo){
          for(let i = 0; i < _this.groupInfoList.length; i++){
            let groupInfo = _this.groupInfoList[i]
            if(groupNo == groupInfo.groupNo){
              _this.form.acctGroupDesc = groupInfo.groupName
            }
          }
        }

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
                // _this.acctGroupList = data.body.acctGroupList
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
                 
              }else{

              }
        })
      },
     
      onChangePurpose(value){ //选择用途事件
        let _this=this
        let _purposeName=value.split('|')
        let _pName=_purposeName[1]
        // _this.form._purposeName=_pName
        _this.form.purposeName=_pName
        if(_pName=='其它'){
          _this.purposeIndex=0
        }else{
          _this.purposeIndex=1
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
      nextStep() {
        // let _this=this
        // _this.$emit("changeStep","1")
        let _this=this
        _this.$refs.form.validate((valid)  => {
          if (valid) {
            let body={}
            body.accNo=_this.form.recAccount //收款账户
            body.accountNo=_this.form.payAccountNo //付款账户
            body.transferType=_this.form.transferType//转账类型
            body.transAmount=_this.form.transAmount//转账金额
            // body.cstNo=_this.loginStorage.cstNo//企业客户号  //后续更改session获取
            _this.$tools.request(_this,"CB040201.do",body).then(
              data=>{
                let errorCode =data.body.errorCode
                let errorMsg =data.body.errorMsg
                  
                if(errorCode!=0){
                  if(_this.form.transferType=='0'){
                    if(errorMsg.indexOf('账户不存在')>=0){
                      this.$alert('输入账户有误，请输入本行账户', 'CHB', {
                        confirmButtonText: '确定'
                      });
                    } else{
                      this.$alert(errorMsg, 'CHB', {confirmButtonText: '确定'});
                    }
                  }else{
                    this.$alert('手续费计算失败,请重新再试', 'CHB', {confirmButtonText: '确定'});
                  }
                }else{
                  // _this.form.companyFlag=data.body.companyFlag //0企业1：个人
                  // _this.form.cstNo=_this.loginStorage.cstNo //后续更改session获取
                  // _this.form.userId=_this.loginStorage.eCIFID  //后续更改session获取eCIFID
                  // _this.form.userName=_this.loginStorage.userName //后续更改session获取是  
                  // //_this.form.payAccountName=_this.form.payAccountName//后续更改session获取   付款方户名
                  // //_this.form.payNode="507581000013"//后续更改session获取   付款开户行
                  // if(_this.form.transferType=='0'){
                  //   let branchName =data.body.branchName
                  //   if(branchName==''){
                  //     branchName='创兴银行'
                  //   }
                  //   _this.form.branchName=branchName
                  //   _this.form.rcvNode=data.body.OPEN_BANK_NO//收款行号 
                  // }else{
                  //   let feeWithoutDiscount=data.body.feeWithoutDiscount
                  //   let feeWithDiscount=data.body.feeWithDiscount
                  //   _this.form.feeWithoutDiscount=feeWithoutDiscount
                  //   _this.form.feeWithDiscount=feeWithDiscount
                  // }
                  _this.$emit("changeStep","1", _this.form)
                }
              }
            )
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    },
    mounted(){
  		let _this = this
      _this.form  = $.extend({}, _this.form, _this.fillinMsg)   //从父组件传来的值可能是空或对象
      let userStorge = _this.$tools.storage.get("user","save")
      _this.form.cstNo = userStorge ? userStorge.cstNo : ''
      _this.form.userId = userStorge ? userStorge.userNo || userStorge.eCIFID : "" 
      // _this.loadSubAcct()
      _this.retrieveAccts()
  		_this.loadPurpose()
      _this.groupDiviList()
      
    }
  }
</script>