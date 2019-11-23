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
          <el-form-item label="交易金额：" prop="amt" class="fullLine">
            <currency-input ref="currency" :disabled="false" v-model="form.amt" placeholder="" :showChinese="false"></currency-input>
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
          <el-form-item label="账号类型：" class="fullLine" prop="rcvAccType">
            {{form.rcvAccTypeName}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="付款凭证用途：" class="fullLine" prop="purpose">
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
  name: 'currentfillinPage',
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
        '1.保证金账户必须是本企业下挂的活期保证金账户；',
        '2.付款账户必须是本企业下挂的同名活期账户，并且开通动账权限。',
      ],
      rules: {
        payAcc: [
          { required: true, message: '请选择付款账号', trigger: 'change' }
        ],
        amt: [
          { required: true, message: '请输入交易金额', trigger: 'blur' },
          { validator: this.$tools.validator.compareNum, trigger: 'blur', vm: this, formName: 'form', max: 'balance', message: '余额不足' },
          { validator: this.$tools.validator.isTranAmount, trigger: 'blur', }
        ],
        rcvAcc: [
          { required: true, message: '请选择保证金账号', trigger: 'change' }
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
        //depTerm: this.$route.params.depTerm ? this.$route.params.depTerm + this.$route.params.depTermTp : '',//存期
        //rate: this.$route.params.rate ? this.$route.params.rate : '',//利率
        amt: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].amt ? this.$route.params.depositCashList[0].amt : ''):'',
        purpose: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].purpose ? this.$route.params.depositCashList[0].purpose : ''):'',
        remark: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].remark ? this.$route.params.depositCashList[0].remark : ''):'',
        currency: this.$route.params.depositCashList?(this.$route.params.depositCashList[0].currency ? this.$route.params.depositCashList[0].currency : ''):'',
        bsnCode: 'CB030302',
        balance: 0,
        oldSqno: this.$route.params.oldSqno ? this.$route.params.oldSqno : '',//修改时使用
        operateFlag: this.$route.params.operateFlag ? this.$route.params.operateFlag : ''
      },
      timeOptions: [
        { value: '3M', label: '三个月' },
        { value: '6M', label: '半年' },
        { value: '1Y', label: '一年' },
        { value: '2Y', label: '两年' },
        { value: '3Y', label: '三年' },
        { value: '5Y', label: '五年' }
      ],                               //存期列表
      options: [],       //活期账号列表
      termOptions: [],      //定期账号列表
      balanceIndex: 1
    }
  },
  mounted() {
    let _this = this
    this.getOperAccInfoList()
    if (this.fillinMsg.balanceIndex == '0') {
      this.laodPayCar(this.fillinMsg.payAcc)
    }
    if ('1' == _this.$route.params.operateFlag) {
      _this.selectAccChange(_this.$route.params.depositCashList[0].payAcc)
      _this.selectTermAccChange(_this.$route.params.depositCashList[0].rcvAcc)
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
      if ((option.type == '3') && (option.nrdaType == 'C') && option.currType == 'CNY') {
        return true
      }
    },
    laodPayCar(val) {
      let _this = this
      let body = {}
      body.accNo = val
      body.chooseFlag = '0'
      body.eCIFID = _this.eCIFID
      if (_this.form.payAcc != '') {
        _this.$tools.request(_this, "CB000001.do", body).then(
          data => {
            let errorCode = data.body.errorCode
            if (errorCode == '0') {
              _this.form.balance = data.body.totalAvlBal
              _this.balanceIndex = 0
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
    selectTermAccChange(val) {
      let _this = this
      if (_this.termOptions.length > 0 && val) {
        for (let i = 0; i < _this.termOptions.length; i++) {
          if (_this.termOptions[i].accNo == val) {
            _this.form.rcvAccType = _this.termOptions[i].coreType
            _this.form.rcvAccTypeName = _this.termOptions[i].attrName
            _this.form.rcvAccName = _this.termOptions[i].accName
            _this.form.rcvAccNode = _this.termOptions[i].openBankNo
            _this.form.rcvAccBank = _this.termOptions[i].openBankName
          }
        }
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
    resetForm(form) {
      this.$refs['form'].resetFields();
      this.balanceIndex = 1
      this.form = {
        payAcc: this.$route.params.depositCashList[0].payAcc ? this.$route.params.depositCashList[0].payAcc : '',
        payAccType: '',
        payAccTypeName: '',
        payAccName: '',
        payAccNode: '',
        payAccBank: '',
        rcvAcc: this.$route.params.depositCashList[0].rcvAcc ? this.$route.params.depositCashList[0].rcvAcc : '',
        rcvAccType: '',
        rcvAccTypeName: '',
        rcvAccName: '',
        rcvAccNode: '',
        rcvAccBank: '',
        //depTerm: this.$route.params.depTerm ? this.$route.params.depTerm + this.$route.params.depTermTp : '',//存期
        //rate: this.$route.params.rate ? this.$route.params.rate : '',//利率
        amt: this.$route.params.depositCashList[0].amt ? this.$route.params.depositCashList[0].amt : '',
        purpose: this.$route.params.depositCashList[0].purpose ? this.$route.params.depositCashList[0].purpose : '',
        remark: this.$route.params.depositCashList[0].remark ? this.$route.params.depositCashList[0].remark : '',
        currency: this.$route.params.depositCashList[0].currency ? this.$route.params.depositCashList[0].currency : '',
        bsnCode: 'CB030302',
        balance: 0,
        oldSqno: this.$route.params.oldSqno ? this.$route.params.oldSqno : '',//修改时使用
        operateFlag: this.$route.params.operateFlag ? this.$route.params.operateFlag : ''
      }
    }
  }
}
</script>