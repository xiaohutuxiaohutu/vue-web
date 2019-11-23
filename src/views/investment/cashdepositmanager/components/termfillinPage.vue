<template>
  <div>
    <div class="fourForm tableForm mt20">
      <el-form ref="form" :model="form" :rules="rules">
        <el-row>
          <el-form-item label="付款账号：" prop="payAcc" class="fullLine">
            <el-select v-model="form.payAcc" placeholder="请选择" @change="selectAccChange">
              <el-option v-for="item in options" :key="item.value" :label="item.lable" :value="item.value"></el-option>
            </el-select>
            <span class="cOrange m15" v-if="balanceIndex==0">余额： {{$tools.utils.currencyFormat(form.balance)}}元</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="存期：" prop="depTerm" class="fullLine">
            <el-select v-model="form.depTerm" placeholder="请选择" @change="getDepTerm">
              <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="利率：" class="fullLine">
            <el-input v-model="form.rate" disabled></el-input>
            <span>本利率仅供参考，最终利率以银行结算利率为准</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="转入金额：" class="fullLine" prop="amt">
            <currency-input ref="currency" v-model="form.amt" placeholder="" :showChinese="false" @blur="getDepTerm"></currency-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="大写：" class="fullLine">
            {{$tools.utils.toChinese(form.amt)}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="保证金账号：" prop="rcvAcc" class="fullLine">
            <el-select v-model="form.rcvAcc" placeholder="请选择" @change="selectTermAccChange">
              <el-option v-for="item in termOptions" :key="item.value" :label="item.lable" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="保证金存入类型：" class="fullLine" prop="rcvAccType">
            {{form.rcvAccTypeName}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="付款凭证用途：" prop="purpose" class="fullLine">
            <el-input v-model="form.purpose" placeholder="请输入用途"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注：" prop="remark" class="fullLine">
            <el-input v-model="form.remark" placeholder="请输入备注信息"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="nextStep">下一步</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </div>
    </div>
    <!-- 溫馨提示 -->
    <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
    <!-- 溫馨提示end -->
  </div>
</template>

<script>
import currencyInput from '@src/components/currency-input'  //金额组件

export default {
  name: 'termfillinPage',
  components: {
    currencyInput
  },
  props: {
    fillinMsg: {
      type: Object
    }
  },
  data() {
    return {
      warmTips: [
        '1.保证金账户必须是本企业下挂的定期保证金账户；',
        '2.转出账户必须是本企业下挂的同名活期账户，并且开通动账权限;',
        '3.定期保证金存入最低转存金额为人民币10万元。'
      ],
      rules: {
        rcvAcc: [
          { required: true, message: '请选择保证金账号', trigger: 'blur' }
        ],
        payAcc: [
          { required: true, message: '请选择付款账号', trigger: 'blur' }
        ],
        depTerm: [
          { required: true, message: '请选择存期', trigger: 'blur' }
        ],
        amt: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { validator: this.$tools.validator.compareNum, trigger: 'blur', mix: '100000', message: '起存金额不能低于10万' },
          { validator: this.$tools.validator.compareNum, trigger: 'blur', vm: this, formName: 'form', max: 'balance', message: '余额不足' },
          { validator: this.$tools.validator.isTranAmount, trigger: 'blur', }
        ],
        purpose: [
          { validator: this.$tools.validator.isCnEngNum, trigger: 'blur', }
        ],
        remark: [
          { validator: this.$tools.validator.isCnEngNum, trigger: 'blur', }
        ],
      },
      form: {
        payAcc: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].payAcc ? this.$route.params.depositCashList[0].payAcc : ''):'',
        payAccType: '',
        payAccTypeName: '',
        payAccName: '',
        payAccNode: '',
        payAccBank: '',
        rcvAcc: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].rcvAcc ? this.$route.params.depositCashList[0].rcvAcc : ''):'',
        rcvAccType: '',
        rcvAccTypeName: '',
        rcvAccName: '',
        rcvAccNode: '',
        rcvAccBank: '',
        depTerm: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].depTerm ? this.$route.params.depositCashList[0].depTerm + this.$route.params.depositCashList[0].depTermTp : ''):'',//存期
        rate: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].rate ? this.$route.params.depositCashList[0].rate : ''):'',//利率
        amt: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].amt ? this.$route.params.depositCashList[0].amt : ''):'',
        purpose: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].purpose ? this.$route.params.depositCashList[0].purpose : ''):'',
        remark: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].remark ? this.$route.params.depositCashList[0].remark : ''):'',
        currency: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].currency ? this.$route.params.depositCashList[0].currency : ''):'',
        bsnCode: 'CB030302',
        balance: 0,
        oldSqno: this.$route.params.oldSqno ? this.$route.params.oldSqno : '',//修改时使用
        operateFlag: this.$route.params.operateFlag ? this.$route.params.operateFlag : ''
      },
      options: [],       //活期账号列表
      termOptions: [],   //定期账号列表
      timeOptions: [
        { value: '3M', label: '三个月' },
        { value: '6M', label: '半年' },
        { value: '1Y', label: '一年' },
        { value: '2Y', label: '两年' },
        { value: '3Y', label: '三年' },
        { value: '5Y', label: '五年' }
      ],
      balanceIndex: 1,
      selectedAcc: ''
    }
  },
  mounted() {
    let _this = this
    _this.getOperAccInfoList()
    if (this.fillinMsg.balanceIndex == '0') {
      this.laodPayCar(this.fillinMsg.payAcc)
    }
    if ('1' == _this.$route.params.operateFlag) {
      _this.selectAccChange(_this.$route.params.depositCashList[0].payAcc)
      _this.selectTermAccChange(_this.$route.params.depositCashList[0].rcvAcc)
      // this.laodPayCar(this.$route.params.depositCashList[0].payAcc)
    }
  },
  methods: {
    getOperAccInfoList() {//获取下挂活期账号
      let _this = this
      _this.form = $.extend({}, _this.form, _this.fillinMsg)   //从父组件传来的值可能是空或对象
      this.operAccInfoList = _this.$tools.storage.get("user", "save").operAccInfoList
      let _options = this.operAccInfoList.filter(_this.checkOptionsArray)//筛选活期账号
      _this.options = _this.getShowAccList(_options)
      let _termOptions = this.operAccInfoList.filter(_this.checkTermOptionsArray)
      _this.termOptions = _this.getShowAccList(_termOptions)
    },
    getShowAccList(accList) {
      let _this = this
      let _options = []
      for (let i = 0; i < accList.length; i++) {
        let _alias = accList[i].alias
        if (_alias == '' || _alias == null) {
          _alias = accList[i].accName
        }
        let _lable = accList[i].accNo + '[' + _this.$tools.dict.currTypeDict(accList[i].currType) + ']' + '[' + _alias + ']'
        let lable = _lable
        let value = accList[i].accNo
        let _item = $.extend({}, accList[i], { "value": value, "lable": lable })
        _options.push(_item)
      }
      return _options
    },
    checkOptionsArray(option) {
      if ((option.right.substr(0, 1) == '1') && option.auth == '2' && option.currType == 'CNY' && option.cstNo == this.$tools.storage.get("user", "save").cstNo && option.type == '1') {
        return true
      }
    },
    checkTermOptionsArray(option) {
      if ((option.type == '3') && (option.nrdaType == 'T') && option.currType == 'CNY') {
        return true
      }
    },
    laodPayCar(val) {
      let _this = this
      let body = {}
      body.accNo = val
      body.chooseFlag = '0'
      body.eCIFID = _this.eCIFID
      if (_this.form.payAccountNo != '') {
        _this.$tools.request(_this, "CB000001.do", body).then(
          data => {
            let errorCode = data.body.errorCode
            if (errorCode == '0') {
              _this.form.balance = data.body.totalAvlBal
              _this.balanceIndex = 0
              let amt
              let sumBalance = '0'
            } else {
              _this.$alert(data.body.errorMsg, '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.balanceIndex = 1
                }
              });
            }
          }
        )
      }
    },
    validatorAccNo(rules, value, callback) {
      let _this = this
      if (_this.termOptions.length == 0) {
        callback(new Error('请在付款账号网点开立定期账号'))
      } else if (_this.accNo === "") {
        callback(new Error('请选择定期存款账号'))
      } else {
        callback()
      }
    },
    validatorPNP(rules, value, callback) {
      let _this = this
      let currencyParse = _this.$tools.utils.currencyParse(value)
      if (currencyParse === "") {
        callback(new Error('请输入存款金额'))
      } else if (currencyParse < 10000) {
        callback(new Error('起存金额1万元'))
      } else {
        callback()
      }
    },
    selectAccChange(val) {
      let _this = this
      if (_this.options.length > 0 && val) {
        for (let i = 0; i < _this.options.length; i++) {
          if (_this.options[i].accNo == val) {
            let transOutAccObject = _this.options[i]
            _this.form.payAccType = transOutAccObject.coreType
            _this.form.payAccTypeName = transOutAccObject.coreTypeName
            _this.form.payAccName = transOutAccObject.accName
            _this.form.payAccNode = transOutAccObject.openBankNo
            _this.form.payAccBank = transOutAccObject.openBankName
            _this.form.currency = transOutAccObject.currType
          }
        }
      }
      _this.laodPayCar(val)
    },
    getDepTerm() {
      let _this = this
      if (_this.form.depTerm && _this.form.rcvAcc != '' && _this.form.amt) {
        let isQuery = false
        _this.$tools.request(_this, "CB000001.do", { accNo: _this.form.rcvAcc }).then(data => {
          if (data.body.errorCode == '0') {
            for (let item of data.body.accNoList) {
              if (item.ACCT_TP == '251') {
                let depTerm = item.DEP_TERM.substring(0, 1)
                let depTermTp = item.DEP_TERM.substring(2)
                if (depTerm + depTermTp == _this.form.depTermLink) {
                  _this.form.rate = item.INT_RATE
                  isQuery = true
                  break
                }
              }
            }
          }
          if (!isQuery) {
            let body = {}
            body.branchId = _this.form.payNode
            body.rateType = 'DGD'
            body.PNP = 0   //金额可以任意 但不能为空
            body.depTerm = _this.form.depTerm.charAt('0')
            body.depTermTp = _this.form.depTerm.charAt('1')
            body.currencyType = 'CNY'
            _this.$tools.request(_this, "CB030112.do", body).then(data => {
              _this.form.rate = data.body.interestRate
            })
          }
        })
      }
    },
    selectTermAccChange(val) {
      let _this = this
      if (_this.termOptions.length > 0 && val) {
        for (let i = 0; i < _this.termOptions.length; i++) {
          if (_this.termOptions[i].accNo == val) {
            _this.form.rcvAccType = _this.termOptions[i].boundType
            _this.form.rcvAccTypeName = _this.termOptions[i].boundTypeName
            _this.form.rcvAccName = _this.termOptions[i].accName
            _this.form.rcvAccNode = _this.termOptions[i].openBankNo
            _this.form.rcvAccBank = _this.termOptions[i].openBankName
          }
        }
        _this.getDepTerm()
      }
    },
    nextStep() {
      let _this = this
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.$emit("goStepPage", [1, _this.form])
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.balanceIndex = 1
      this.form = {
        payAcc: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].payAcc ? this.$route.params.depositCashList[0].payAcc : ''):'',
        payAccType: '',
        payAccTypeName: '',
        payAccName: '',
        payAccNode: '',
        payAccBank: '',
        rcvAcc: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].rcvAcc ? this.$route.params.depositCashList[0].rcvAcc : ''):'',
        rcvAccType: '',
        rcvAccTypeName: '',
        rcvAccName: '',
        rcvAccNode: '',
        rcvAccBank: '',
        depTerm: this.$route.params.depositCashList?(this.$route.params.depTerm ? this.$route.params.depTerm + this.$route.params.depTermTp : ''):'',//存期
        rate: this.$route.params.depositCashList?(this.$route.params.rate ? this.$route.params.rate : ''):'',//利率
        amt: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].amt ? this.$route.params.depositCashList[0].amt : ''):'',
        purpose: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].purpose ? this.$route.params.depositCashList[0].purpose : ''):'',
        remark: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].remark ? this.$route.params.depositCashList[0].remark : ''):'',
        currency: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].currency ? this.$route.params.depositCashList[0].currency : ''):'',
        bsnCode: 'CB030302',
        balance: 0,
        oldSqno: this.$route.params.oldSqno ? this.$route.params.oldSqno : '',//修改时使用
        operateFlag: this.$route.params.operateFlag ? this.$route.params.operateFlag : ''
      }
    }
  }
}
</script>