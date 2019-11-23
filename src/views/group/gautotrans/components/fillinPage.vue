<template>
  <div class="importCreditOpen ">
    <!--table1布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mb20">
      <table>
        <caption>选择归集账户</caption>
        <tr>
          <td><span class="cRed">*</span>归集计划主题</td> 
          <td>
            <el-form-item prop="taskTheme">
              <el-input v-model="form.taskTheme" ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>转入账号（母公司）：</td>
          <td colspan="3">
            <el-form-item prop="recAccount">
              <el-select v-model="form.recAccount" placeholder="请选择" @change="onChangeRecAccountNo">
                <el-option v-for="item in recAccounts" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </td>
          <td>账户名：</td>
            <td>
              <el-form-item prop="recAccountName">
                <el-input v-model="form.recAccountName" :disabled="true"></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>转出子公司账号组别：</td> 
          <td colspan="3">
            <el-form-item prop="payAccountGroup">
              <el-select v-model="form.payAccountGroup" placeholder="请选择" @change="getGroupAccList">
                <template v-for="item in groupInfoList">
                  <el-option :label="item.groupName" :value="item.groupNo"></el-option>
                </template> 
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>转出账户（子公司）：</td>
          <td colspan="3">
            <el-form-item prop="payAccountNo">
              <el-select v-model="form.payAccountNo" placeholder="请选择" @change="onChangePayAccountNo">
                <el-option v-for="item in payAccounts" :label="item.label" :value="item.value"></el-option>
              </el-select> 
            </el-form-item>
          </td>
          <td>账户名：</td>
          <td>
            <el-form-item prop="payAccountName">
              <el-input v-model="form.payAccountName" :disabled="true"></el-input> 
            </el-form-item>
          </td>
        </tr>
      </table>
    <!--</el-form>-->
    <!--table1布局-->
     <!--table2布局-->
    <!--<el-form ref="form2" :model="form2" class="formEmbedTable mb20">-->
      <table>
        <caption>上存规则</caption>
        <tr v-if="form.balanceIndex==0">
          <td>余额：</td>
          <td>
            <span class="cOrange">{{$tools.utils.currencyFormat(form.balance)}}元</span>
            <!--<el-form-item prop="balance">
              <template scope='scope'>
                <span class="cOrange">{{$tools.utils.currencyFormat(form.balance)}}元</span>
              </template>
            </el-form-item>-->
          </td>
        </tr>   
        <tr>
          <td><span class="cRed">*</span>上存方式：</td>
          <td colspan="3">
            <el-form-item prop="upWay">
              <el-select v-model="form.upWay" placeholder="请选择">
                <el-option label="比例上存" value="0"></el-option>
                <el-option label="保底上存" value="1"></el-option>
                <el-option label="全额上存" value="2"></el-option>
                <el-option label="定额上存" value="3"></el-option>
              </el-select> 
            </el-form-item>
          </td>
        </tr>
        <tr v-if="form.upWay=='0'">
          <td><span class="cRed">*</span>上存比例：</td>
          <td colspan="3">
            <el-form-item prop="upPercentage">
              <el-input v-model="form.upPercentage" placeholder="0.00"></el-input><span class="ml5">%</span>
            </el-form-item>
          </td>
        </tr>
        <tr v-if="form.upWay=='1'">
          <td><span class="cRed">*</span>留存余额：</td>
          <td colspan="3">
            <el-form-item prop="restBalance">
              <ynet-currency-input v-model="form.restBalance" name="restBalance" placeholder="留存余额" :showChinese="false"></ynet-currency-input>
                  <template>
                      <span>{{$tools.dict.CRYTrans(form.CRY)}}</span>
                  </template>
            </el-form-item>
          </td>
        </tr>
        <tr v-if="form.upWay=='3'">
          <td><span class="cRed">*</span>定额额度：</td>
          <td colspan="3">
            <el-form-item prop="quotaLimit">
              <ynet-currency-input v-model="form.quotaLimit" name="quotaLimit" placeholder="定额额度" :showChinese="false"></ynet-currency-input>
                  <template>
                      <span>{{$tools.dict.CRYTrans(form.CRY)}}</span>
                  </template>
            </el-form-item>
          </td>
        </tr>
      </table>
    <!--</el-form>-->
    <!--table2布局-->
    <!--table3布局-->
    <!--<el-form ref="form3" :model="form3" class="formEmbedTable">-->
      <table>
        <caption>设置资金自动归集计划</caption>
        <tr>
          <td><span class="cRed">*</span>归集方式：</td>
          <td colspan="3">
            <el-form-item prop="mode">
              <el-select v-model="form.mode" placeholder="请选择">
                <el-option label="即时生效" value="0"></el-option>
                <el-option label="周期性归集" value="1"></el-option>
              </el-select> 
            </el-form-item>
          </td>
        </tr>
        <tr v-if="form.mode=='1'">
          <td><span class="cRed">*</span>周期类型：</td>
          <td colspan="3">
            <el-form-item prop="cycleType">
              <el-select v-model="form.cycleType" placeholder="请选择">
                <el-option label="日" value="0"></el-option>
                <el-option label="周" value="1"></el-option>
                <el-option label="月" value="2"></el-option>
              </el-select> 
            </el-form-item>
          </td>
        </tr>
        <tr v-if="form.mode=='1' && form.cycleType!='0'">
          <td><span class="cRed">*</span>周期内执行日：</td>
          <td colspan="3">
            <el-form-item v-if="form.cycleType=='1'" prop="cycleByWeek">
              <el-select v-model="form.cycleByWeek" placeholder="请选择">
                <el-option label="星期一" value="1"></el-option>
                <el-option label="星期二" value="2"></el-option>
                <el-option label="星期三" value="3"></el-option>
                <el-option label="星期四" value="4"></el-option>
                <el-option label="星期五" value="5"></el-option>
                <el-option label="星期六" value="6"></el-option>
                <el-option label="星期日" value="0"></el-option>
              </el-select> 
            </el-form-item>
            <el-form-item v-if="form.cycleType=='2'" prop="cycleByMonth">
              <el-select v-model="form.cycleByMonth" placeholder="请选择">
                <el-option label="1日" value="01"></el-option>
                <el-option label="2日" value="02"></el-option>
                <el-option label="3日" value="03"></el-option>
                <el-option label="4日" value="04"></el-option>
                <el-option label="5日" value="05"></el-option>
                <el-option label="6日" value="06"></el-option>
                <el-option label="7日" value="07"></el-option>
                <el-option label="8日" value="08"></el-option>
                <el-option label="9日" value="09"></el-option>
                <el-option label="10日" value="10"></el-option>
                <el-option label="11日" value="11"></el-option>
                <el-option label="12日" value="12"></el-option>
                <el-option label="13日" value="13"></el-option>
                <el-option label="14日" value="14"></el-option>
                <el-option label="15日" value="15"></el-option>
                <el-option label="16日" value="16"></el-option>
                <el-option label="17日" value="17"></el-option>
                <el-option label="18日" value="18"></el-option>
                <el-option label="19日" value="19"></el-option>
                <el-option label="20日" value="20"></el-option>
                <el-option label="21日" value="21"></el-option>
                <el-option label="22日" value="22"></el-option>
                <el-option label="23日" value="23"></el-option>
                <el-option label="24日" value="24"></el-option>
                <el-option label="25日" value="25"></el-option>
                <el-option label="26日" value="26"></el-option>
                <el-option label="27日" value="27"></el-option>
                <el-option label="28日" value="28"></el-option>
                <el-option label="29日" value="29"></el-option>
                <el-option label="30日" value="30"></el-option>
                <el-option label="31日" value="31"></el-option>
              </el-select> 
            </el-form-item>
          </td>
        </tr>
        <tr v-if="form.mode=='1'">
          <td><span class="cRed">*</span>生效日期：</td>
          <td colspan="3">
            <el-form-item prop="effectDate">
              <el-date-picker v-model="form.effectDate" type="date"  placeholder="选择日期" :editable="false" :picker-options="pickerOptions0" 
                @change="">
              </el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr v-if="form.mode=='1'">
          <td><span class="cRed">*</span>执行时间：</td>
          <td colspan="3">
            <el-form-item prop="actionTime">
              <el-select v-model="form.actionTime" placeholder="请选择">
                <el-option label="日初" value="0"></el-option>
                <el-option label="日终" value="1"></el-option>
              </el-select> 
            </el-form-item>
          </td>
        </tr>
        <tr v-if="form.mode=='1'">
          <td><span class="cRed">*</span>终止条件：</td>
          <td colspan="3">
            <el-form-item prop="endCondition">
              <el-select v-model="form.endCondition" placeholder="请选择">
                <el-option label="永久有效" value="0"></el-option>
                <el-option label="按日期" value="1"></el-option>
                <el-option label="按次数" value="2"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr v-if="form.mode=='1' && form.endCondition=='1'">
          <td><span class="cRed">*</span>归集终止日期：</td>
          <td colspan="3">
            <el-form-item prop="endByDate">
              <el-date-picker v-model="form.endByDate" type="date"  placeholder="选择日期" :editable="false" :picker-options="pickerOptions1" 
                @change="">
              </el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr v-if="form.mode=='1' && form.endCondition=='2'">
          <td><span class="cRed">*</span>归集终止次数：</td>
          <td colspan="3">
            <el-form-item prop="endByTimes">
              <el-input v-model="form.endByTimes"></el-input>
              <span>最低必须设置1次（包含），最多设置10000次</span>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!--table1布局-->
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="nextStep">下一步</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
        <el-button @click="preStep">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'fillinPage',
  components: {
  },
  props: {
    fillinMsg:{
      type: Object
    }
  },
  data() {
    return {
      form:{
        cstNo: "",
        taskTheme: "",
        recAccount: "",
        recAccountName: "",
        payAccountGroup:"",
        payAccountGroupDesc:"",
        payAccountNo: "",
        payAccountName: "",
        balance: "",//账户余额
        upWay: "",//上存方式
        upPercentage: "",//上存比例
        restBalance: "",//留存余额
        quotaLimit: "",//定额额度
        mode: "1",//归集方式
        cycleType: "0",//0-按日, 1-按周, 2-按月
        cycleByWeek: "1",//周期执行日-按周，默认周一
        cycleByMonth: "1",//周期执行日-按月，默认一号
        effectDate: "",//生效日期
        actionTime: "0",//执行时间, 0-日初，1-日终
        endCondition: "0",//终止条件, 0-永久有效，1-按日期，2-按次数
        endByDate: "",//归集终止日期
        endByTimes: "",//归集终止次数

        transferType: '0',//行内转账
        payNode:'',//付款人开户行
        payopenName: '',//付款行名称
        recopenNode:'',//收款人开户行
        recopenName:'',//收户行名称
        userId: '',//操作员编号
        userName: '',//操作员名称
        balanceIndex: 1,
      },
      rules:{
        taskTheme:[
          {trigger:'blur', required: true, validator: this.isEmpty},
          {message: '主题长度在1-40位', trigger:'blur', required: true, min:1, max:40}
        ],
        payAccountNo: [{ message: '请选择', trigger:'change', required: true}],
        recAccount: [{required:true,message:'请选择', trigger:'change'}],
        upWay: [{required:true,message:'请选择', trigger:'change'}],
        payAccountGroup: [{required:true,message:'请选择', trigger:'change'}],
        upPercentage:[
          {message: '请输入', trigger:'change', required: true},
          { validator:this.valiUpPercentage, trigger: 'change' }
        ],
        restBalance:[{message: '请输入', trigger:'change', required: true}],
        quotaLimit:[{message: '请输入', trigger:'change', required: true}],
        effectDate: [
          {trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['effectDate','endByDate'],vm:this,formName:'form'}
        ],
        endByDate: [
          {trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['effectDate','endByDate'],vm:this,formName:'form'}
        ],
        endByTimes: [
          {message: '请输入', trigger:'change', required: true},
          { validator:this.valiEndByTimes, trigger: 'change' }
        ]
      },
      recAccounts:[],
      payAccounts:[],
      groupSessionAccs:[],
      groupInfoList: [],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
    }
  },
  mounted(){
    let _this = this
    _this.form  = $.extend({},_this.form,_this.fillinMsg)   //从父组件传来的值可能是空或对象
    let userStorge = _this.$tools.storage.get("user","save")
    _this.form.cstNo = userStorge ? userStorge.cstNo : ''
    _this.form.userId = userStorge ? userStorge.userNo || userStorge.eCIFID : "" 
    _this.form.userName = userStorge ? userStorge.alias : "" 
    _this.retrieveAccts()
    _this.groupDiviList()
  },
  methods: {
    isEmpty(rule, value, callback){
      if ($.trim(value) == "") callback('内容不能为空')
      callback()
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
              _this.form.payAccountGroupDesc = groupInfo.groupName
            }
          }
        }

        _this.form.payAccountNo = ''
        _this.form.balance = ''
        let queryData = {}
        if('otherAccNo' == _this.form.payAccountGroup){
          queryData.reqTP = 'A'
          if(_this.groupInfoList.length <= 1){
            _this.payAccounts = _this.groupSessionAccs
            return
          }
        }else {
          queryData.reqTP = 'G'
          queryData.groupNo = _this.form.payAccountGroup
        }
        _this.$tools.request(_this, "CB040406.do", queryData).then(
            data => {
              
              let payAccountsTemp = _this.groupSessionAccs
              console.log('payAccountsTemp',payAccountsTemp)
              _this.payAccounts = []
              if(data.body.errorCode == '0'){
                // _this.acctGroupList = data.body.acctGroupList
                let acctGroupList = data.body.acctGroupList
   
                if('otherAccNo' == _this.form.payAccountGroup){
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
        if(_type == '1' && _currency == 'CNY'){//集团转账权限的活期人民币账户
          let _acno = operAccInfoList[i].accNo
          let _name = operAccInfoList[i].accName
          let _alias=operAccInfoList[i].alias
					if(_alias=='' ||_alias==null){
						_alias=_name
					}
					let _lable=operAccInfoList[i].accNo+'['+_this.$tools.dict.currTypeDict(operAccInfoList[i].currType) +']'+'['+_alias +']'
					let lable=_lable
          // let _lable = _this.$tools.utils.mask(_acno,{beforeIndex:3,behindIndex:4})
          // let lable = _lable+_name
          let value = _acno
          if(_groupFlag == '1'){//加挂集团的子公司账户
            // if(_right.substr(3,1)=='1' && _groupRight != '' && _groupRight.substr(0,1) == '1')
            if(_right.substr(3,1)=='1' && _groupRight != '' && _groupRight.substr(4,1) == '1'){
              if(_auth == '2'){//操作员动账权限
                // _this.payAccounts.push($.extend({}, operAccInfoList[i], {"value":value,"name":_name,"label":lable}))//子公司账号列表
                _this.groupSessionAccs.push($.extend({}, operAccInfoList[i], {"value":value,"name":_name,"label":lable}))//子公司账号列表
              }
            }
          }else{
            _this.recAccounts.push($.extend({}, operAccInfoList[i], {"value":value,"name":_name,"label":lable}))//母公司账号列表
          }
        }
      }
    },
    effectDateChanged(e){
      console.log(e)
      let _this = this
      _this.form.effectDate = e.replace(/-/g, '')
    },
    onChangeRecAccountNo(acctNo){ //母公司账号选择事件
      let _this = this
      for(let i=0; i<_this.recAccounts.length; i++){
        if(acctNo == _this.recAccounts[i].value){
          _this.form.recAccountName = _this.recAccounts[i].name
          _this.form.recopenNode = _this.recAccounts[i].openBankNo || ''
          _this.form.recopenName = _this.recAccounts[i].openBankName || ''
        }
      }
    },
    onChangePayAccountNo(acctNo){ //子公司账号选择事件
      let _this = this
      for(let i=0; i<_this.payAccounts.length; i++){
        if(acctNo == _this.payAccounts[i].value){
          _this.form.payAccountName = _this.payAccounts[i].name
          _this.form.payNode = _this.payAccounts[i].openBankNo || ''
          _this.form.payopenName = _this.payAccounts[i].openBankName || ''
        }
      }
      _this.laodAcctBalance()
    },
    laodAcctBalance(){
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
              _this.form.balanceIndex=0
            }else{
              _this.form.balanceIndex=1
            }
          }
        )
      }
    },
    resetForm(formName) {//重置事件
      let _this = this
      _this.$refs[formName].resetFields()
      _this.form.balanceIndex=1
    },
    //验证上存比例
    valiUpPercentage(rule, value, callback){
        let _this=this
        if(!(/^[1-9][0-9]?$|^[1-9][0-9]?\.\d{1,2}$|^100$|^100\.\d{1,2}$/.test(value))) {
                return callback("请输入正确格式的上存比例")
            }
        callback()
    },
    //验证归集终止次数
    valiEndByTimes(rule, value, callback){
        let _this=this
        if(!(/^[1-9][0-9]{0,3}$|^10000$/.test(value))) {
                return callback("输入次数在1到10000之间")
        }
        callback()
    },
    preStep(){
      let _this = this
      _this.$emit("preStep")
    },
    nextStep(){
      let _this = this
      let body = {}
      body.payAccountNo = _this.form.payAccountNo
      _this.$refs.form.validate((valid) =>{
        if(valid){
          _this.$tools.request(_this,"CB040302.do",body).then(
            data=>{
              let errorCode = data.body.errorCode
              let errorMsg = data.body.errorMsg
              if(errorCode =='0'){
                _this.$emit("changeStep","1", _this.form)
              }else{
                _this.$alert(errorMsg, errorCode, {confirmButtonText: '确定'});
              }
            }
          )
        }
      })
    }
  }
}
</script>
