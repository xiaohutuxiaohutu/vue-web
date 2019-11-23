<template>
  <div class="foreignExchangePurchaseStep">
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20">
      <table>
        <caption>汇款信息</caption>
        <tr>
          <td><span class="cRed">*</span>交易类型：</td>
          <td>
            <el-form-item prop="type1">
              <el-select class="w300" placeholder="----请选择----" v-model="form.type1" @change="changeType">
                <el-option label="结汇" value="0"></el-option>
                <el-option label="购汇" value="1"></el-option>
                <el-option label="套汇" value="2"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>{{exchangeType(form.type1)}}币种：</td>
          <td>
            <el-form-item prop="currency">
              <el-select class="lh28 w300" placeholder="----请选择----" v-model="form.currency" @change="changeCRY">
                <el-option label="CNY-人民币" value="CNY" disabled></el-option>
                <el-option label="HKD-港元" value="HKD"></el-option>
                <el-option label="USD-美元" value="USD"></el-option>
                <el-option label="EUR-欧元" value="EUR"></el-option>
                <el-option label="GBP-英镑" value="GBP"></el-option>
                <el-option label="JPY-日元" value="JPY"></el-option>
                <el-option label="SGD-新加坡币" value="SGD"></el-option>
              </el-select>
            </el-form-item>
            <a class="cOrange" @click="dialogVisible = true">牌价查询</a>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>转出账户：</td>
          <td>
            <el-form-item prop="payAccount">
              <el-select class="lh28 w300" placeholder="----请选择----" v-model="form.payAccount" @change="changePayAccount">
                <el-option v-for="items in payAccountList" :label="items.accNo+' ['+ $tools.dict.currTypeDict(items.currType) +']'+' ['+(items.alias==''?items.accName:items.alias)+']'" :value="items.accNo">
                </el-option>
              </el-select>
            </el-form-item>
            <a class="cOrange" @click="search1">查询余额</a>
            <span>&nbsp;{{$tools.dict.currencyType(payAccCRY)+$tools.utils.toDecimalString(payAccBalance,true,2)}}</span>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>转入账户：</td>
          <td>
            <el-form-item prop="recAccount">
              <el-select class="lh28 w300" placeholder="----请选择----" v-model="form.recAccount" @change="changeRecAccount">
                <el-option v-for="items in recAccountList" :label="items.accNo+' ['+ $tools.dict.currTypeDict(items.currType) +']'+' ['+(items.alias==''?items.accName:items.alias)+']'" :value="items.accNo"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>{{exchangeCRY(form.type1)}}金额：</td>
          <td>
            <el-form-item prop="transAmount" ref="transAmount" class="w300">
              <ynet-currency-input v-model="form.transAmount" name="transAmount" :placeholder="exchangeCRY(form.type1)+'金额'" @blur="inputBlur1" :showChinese="false"></ynet-currency-input>
            </el-form-item>
            <span class="cOrange" v-if="form.type1=='0'||form.type1=='2'">{{$tools.dict.CRYTrans(form.currency)}}</span>
            <span class="cOrange" v-if="form.type1=='1'">{{$tools.dict.CRYTrans(form.payCurrency)}}</span>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>金额大写：</td>
          <td>{{$tools.utils.toChinese(form.transAmount)}}</td>
        </tr>
        <tr>
          <td><span class="cRed ">*</span>{{exchangeCRY1(form.type1)}}金额：</td>
          <td>
            <el-form-item prop="recAmount" ref="recAmount" class="w300">
              <ynet-currency-input v-model="form.recAmount" name="recAmount" :placeholder="exchangeCRY1(form.type1)+'金额'" @blur="inputBlur2" :showChinese="false"></ynet-currency-input>
              <span class="cOrange" v-if="form.type1=='0'||form.type1=='2'">{{$tools.dict.CRYTrans(form.recCurrency)}}</span>
              <span class="cOrange" v-if="form.type1=='1'">{{$tools.dict.CRYTrans(form.currency)}}</span>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>备注：</td>
          <td>
            <el-form-item class="w300">
              <el-input v-model="form.RMK"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
      <!--<ynet-application-guide class="mt20 "></ynet-application-guide>-->
      <div class="btnArea mt20 tac ">
        <el-button type="primary " @click="submitForm() ">下一步</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </div>
    </el-form>
    <!--table布局-->
    <!--牌价查询-->
    <div>
      <el-dialog title="人民币兑外汇牌价" :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
        <selectPriceTag></selectPriceTag>
        <span slot="footer" class="el-dialog__footer btnArea">
          <el-button @click="dialogVisible=false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
    <!--牌价查询end-->
  </div>
</template>

<script>
import selectPriceTag from '../components/selectPriceTag' //牌价查询组件
export default {
  name: 'foreignExchangePurchaseStep1',
  components: {
    selectPriceTag
  },
  props: {
    formData1: {type: Object, default:{}},
    turnUpNums:{type:Number}
  },
  data() {
    return {
      maintainForm:this.$route.params,
      user:this.$tools.storage.get("user", "save"),
      dialogVisible:false,  //牌价查询弹窗
      form: {
        flowNo:'',
        type1: '0',  //交易类型
        currency: '',  //选择的币种

        payAccount:'',  //转出账号
        payAccName:'',  //转出账户名称
        payAccOpenNode:'',//转出账号开户网点
        payerBank: '',  //转出账户开户支行
        payCurrency:'',  //转出账号币种
        transAmount: '',  //转出金额
        payAccTp:'',  //转出账号类型
        payBalanceTp:'',  //转出账号余额类型

        recAccount:'',  //转入账号
        recAccName:'',  //转入账户名称
        recAccOpenNode:'',  //转入账户开户网点
        payeeBank: '',  //收款人开户银行
        recCurrency: '',  //转入币种
        recAmount: '',  //转入金额
        recAccTp:'',  //转入账号类型
        recBalanceTp:'',  //转入账号余额类型

        bsnCode: '',
        cstNo: '',
        namecn: '',
        hostNo: '',
        sysCode: 'CCB',
        RMK: '',  //备注
        signedData:'',  //签名要素
        timeStamps:''
      },
      payAccBalance: '',  //转出账号余额
      payAccCRY: '',  //转出账号币种
      transAmountBlur: '',  //出账金额blur
      recAmountBlur: '',  //入账金额blur
      accInfoList: [],
      payAccountList: [],
      recAccountList: [],
      rules: {
        type1: [
          { trigger: 'change', message:'请选择', required:true }
        ],
        currency: [
          { trigger: 'change', message:'请选择', required:true }
        ],
        payAccount: [
          { trigger: 'change', message:'请选择', required:true }
        ],
        recAccount: [
          { trigger: 'change', message:'请选择', required:true }
        ],
        transAmount: [
          { trigger: 'blur', validator: this.transAmountValidator },
          // { trigger: 'blur', message:'请输入', required:true }
        ],
        recAmount: [
          { trigger: 'blur', validator: this.recAmountValidator },
          // { trigger: 'blur', message:'请输入', required:true }
        ],
      }
    }
  },
  methods: {
    exchangeType(type){
      switch(type){
        case '0':
          return '原币'
          break;
        case '1':
          return '购汇'
          break;
        case '2':
          return '原币'
          break;
      }
    },
    exchangeCRY(type){
      switch(type){
        case '0':
          return '原币'
          break;
        case '1':
          return '转出'
          break;
        case '2':
          return '原币'
          break;
      }
    },
    exchangeCRY1(type){
      switch(type){
        case '0':
          return '结汇'
          break;
        case '1':
          return '购汇'
          break;
        case '2':
          return '套汇'
          break;
      }
    },
    submitForm() {
      let _this = this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          _this.$emit("changeStep", "1", _this.form)
        } else {
          // console.log('error submit!!')
          return false
        }
      });
    },
    resetForm() {
      let _this = this
      _this.$refs['form'].resetFields()
      _this.changeType()
      _this.form.RMK = ''
    },
    changeType() {
      let _this = this
      _this.form.currency = ''
      _this.form.payAccount = ''
      _this.form.recAccount = ''
      _this.payAccountList = []
      _this.recAccountList = []
      _this.form.transAmount = ''
      _this.form.recAmount = ''
      _this.form.payCurrency = ''
      _this.form.recCurrency = ''
      _this.form.payBalanceTp = ''
      _this.form.recBalanceTp = ''
      _this.payAccBalance = ''
      _this.payAccCRY = ''
    },
    search1() {
      let _this = this
      if(_this.form.payAccount==""){
        _this.$alert('请选择查询账号','温馨提示')
      }else{
        let form = {}
        form.accNo = _this.form.payAccount
        _this.$tools.request(_this, "CB000001.do", form).then(
          data => {
            _this.payAccBalance = data.body.accNoList[0].ACCT_BAL
            _this.payAccCRY = data.body.accNoList[0].CRY
          }
        )
      }
    },
    changeCRY(currency) {
      let _this = this
      _this.payAccBalance = ''
      _this.payAccCRY = ''
      _this.form.payAccount = ''
      _this.form.recAccount = ''
      _this.payAccountList = []
      _this.recAccountList = []
      for (let index in _this.accInfoList) {
		    if (_this.accInfoList[index].type=='1' && _this.accInfoList[index].right.substr(0,1)=='1' && _this.accInfoList[index].cstNo==_this.user.cstNo && _this.accInfoList[index].auth=='2') {
          if (_this.form.type1 == '0') {//结汇
            if(_this.accInfoList[index].currType == "CNY"){
              _this.recAccountList.push(_this.accInfoList[index])
            }else{
              if(_this.accInfoList[index].currType == currency){   //转出账号的币种 和 选择的币种 相同
                _this.payAccountList.push(_this.accInfoList[index])
              }
            }
          } else if (_this.form.type1 == '1') {//购汇
            if (_this.accInfoList[index].currType == "CNY") {
              _this.payAccountList.push(_this.accInfoList[index])
            } else if (_this.accInfoList[index].currType == currency){  //转入账号的币种 和 选择的币种 相同
              _this.recAccountList.push(_this.accInfoList[index])
            }
          } else if (_this.form.type1 == '2') {//套汇
            if(_this.accInfoList[index].currType !="CNY"){
              if(_this.accInfoList[index].currType != currency){   //转入账号的币种 和 选择的币种 不同
                _this.recAccountList.push(_this.accInfoList[index])
              }
            }
            if(_this.accInfoList[index].currType == currency){   //转出账号的币种 和 选择的币种 相同
              _this.payAccountList.push(_this.accInfoList[index])
            }
          }
        }
      }
    },
    changePayAccount() {
      let _this = this
      _this.payAccBalance = ''
      _this.payAccCRY = ''
      for (let index in _this.accInfoList) {
        if (_this.accInfoList[index].accNo == _this.form.payAccount) {
          _this.form.payAccName = _this.accInfoList[index].accName
          _this.form.payAccOpenNode = _this.accInfoList[index].openBankNo
          _this.form.payerBank = _this.accInfoList[index].openBankName
          _this.form.payCurrency = _this.accInfoList[index].currType
          break
        }
      }
      let form = {}
      form.accNo = _this.form.payAccount
      _this.$tools.request(_this, "CB000001.do", form).then(
        data => {
          if(data.body.errorCode=='0'){
            _this.form.payAccTp = data.body.accNoList[0].ACCT_TP
            _this.form.payBalanceTp = data.body.accNoList[0].BAL_TP
          }else{
            _this.$alert(data.body.errorMsg,"温馨提示",{
              confirmButtonText:"确定"
            }).then(() =>{
              _this.form.payAccount = ''
            })
          }
        }
      )
    },
    changeRecAccount() {
      let _this = this
      for (let index in _this.accInfoList) {
        if (_this.accInfoList[index].accNo == _this.form.recAccount) {
          _this.form.recAccName = _this.accInfoList[index].accName
          _this.form.recAccOpenNode = _this.accInfoList[index].openBankNo
          _this.form.payeeBank = _this.accInfoList[index].openBankName
          _this.form.recCurrency = _this.accInfoList[index].currType
          break
        }
      }
      let form = {}
      form.accNo = _this.form.recAccount
      _this.$tools.request(_this, "CB000001.do", form).then(
        data => {
          if(data.body.errorCode=='0'){
            _this.form.recAccTp = data.body.accNoList[0].ACCT_TP
            _this.form.recBalanceTp = data.body.accNoList[0].BAL_TP
          }else{
            _this.$alert(data.body.errorMsg,"温馨提示",{
              confirmButtonText:"确定"
            }).then(() =>{
              _this.form.recAccount = ''
            })
          }
        }
      )
    },
    inputBlur1(){
      let _this = this
      _this.transAmountBlur = true
    },
    inputBlur2(){
      let _this = this
      _this.recAmountBlur = true
    },
    changeTransAmount() {
      let _this = this
      let form = {}
      form.cstNo = _this.form.hostNo
      if(_this.form.type1=='0' || _this.form.type1=='2'){
        form.tranIp = 'B'
        form.sellBuyInd = 'B'
        form.buyAmt = _this.form.transAmount
        form.sellCry = _this.form.recCurrency
        form.buyCry = _this.form.payCurrency
        form.sellAmt = 0
        form.wthdwBalTp = _this.form.payBalanceTp
        form.depBalTp = _this.form.recBalanceTp
      }else if(_this.form.type1=='1'){
        form.tranIp = 'S'
        form.sellBuyInd = 'S'
        form.buyAmt = 0
        form.sellCry = _this.form.payCurrency
        form.buyCry = _this.form.recCurrency
        form.sellAmt = _this.form.transAmount
        form.wthdwBalTp = _this.form.payBalanceTp
        form.depBalTp = _this.form.recBalanceTp
      }
      return form
    },
    changeRecAmount() {
      let _this = this
      let form = {}
      form.cstNo = _this.form.hostNo
      if(_this.form.type1=='0' || _this.form.type1=='2'){
        form.tranIp = 'S'
        form.sellBuyInd = 'S'
        form.buyAmt = 0
        form.sellCry = _this.form.recCurrency
        form.buyCry = _this.form.payCurrency
        form.sellAmt = _this.form.recAmount
        form.wthdwBalTp = _this.form.payBalanceTp
        form.depBalTp = _this.form.recBalanceTp
      }else if(_this.form.type1=='1'){
        form.tranIp = 'B'
        form.sellBuyInd = 'B'
        form.buyAmt = _this.form.recAmount
        form.sellCry = _this.form.payCurrency
        form.buyCry = _this.form.recCurrency
        form.sellAmt = 0
        form.wthdwBalTp = _this.form.payBalanceTp
        form.depBalTp = _this.form.recBalanceTp
      }
      return form
    },
    transAmountValidator(rule, value, callback) {
      let _this = this
      if(_this.form.transAmount=='' && _this.form.recAmount==''){
        return callback("请输入")
      }else if(_this.form.payCurrency=='' || _this.form.recCurrency=='' || _this.form.recBalanceTp=='' || _this.form.payBalanceTp==''){
        _this.$alert("请选择币种和账号","温馨提示",{
          confirmButtonText:"确定"
        }).then(() =>{
          _this.form.transAmount = ''
        })
        return callback()
      }else if ((_this.form.transAmount!='' && _this.form.recAmount=='') || _this.transAmountBlur) {
        let form = _this.changeTransAmount()
        _this.$tools.request(_this, "CB050113.do", form).then(
          data => {
            if(data.body.errorCode=='0'){
              if(_this.form.type1=='0' || _this.form.type1=='2'){
                _this.form.recAmount = data.body.sellAmt
                return callback()
              }else if(_this.form.type1=='1'){
                _this.form.recAmount = data.body.buyAmt
                return callback()
              }
            }else{
              _this.$alert(data.body.errorMsg,"温馨提示")
              return callback()
            }
            _this.transAmountBlur = false
        })
      }
      callback()
    },
    recAmountValidator(rule, value, callback) {
      let _this = this
      if(_this.form.transAmount=='' && _this.form.recAmount==''){
        return callback("请输入")
      }else if(_this.form.payCurrency=='' || _this.form.recCurrency=='' || _this.form.recBalanceTp=='' || _this.form.payBalanceTp==''){
        _this.$alert("请选择币种和账号","温馨提示",{
          confirmButtonText:"确定"
        }).then(() =>{
          _this.form.recAmount = ''
        })
        return callback()
      }else if((_this.form.transAmount=='' && _this.form.recAmount!='') || _this.recAmountBlur){
        let form = _this.changeRecAmount()
        _this.$tools.request(_this, "CB050113.do", form).then(
          data => {
            if(data.body.errorCode=='0'){
              if(_this.form.type1=='0' || _this.form.type1=='2'){
                _this.form.transAmount = data.body.buyAmt
                return callback()
              }else if(_this.form.type1=='1'){
                _this.form.transAmount = data.body.sellAmt
                return callback()
              }
            }else{
              _this.$alert(data.body.errorMsg,"温馨提示")
              return callback()
            }
            _this.recAmountBlur = false
        })
      }
      callback()
    },
  },
  mounted() {
    let _this = this
    _this.accInfoList = _this.user.operAccInfoList
    if(JSON.stringify(_this.maintainForm)!='{}' && _this.turnUpNums==0){
      let _list = _this.maintainForm.exchangeInfoList[0]
      let _currency = ''
      if(_list.type1=='0'||_list.type1=='2'){
        _currency = _list.currency
      }else if(_list.type1=='1'){
        _currency = _list.orignalCurrency
      }
      _this.form = $.extend({},_this.form,{
        currency:_currency,
        payAccount:_list.payAccount,
        payCurrency:_list.currency,
        transAmount:_list.transAmount,
        recAccount:_list.recAccount,
        recCurrency:_list.orignalCurrency,
        recAmount:_list.originalAmount,
        RMK:_list.RMK,
        oldSqno:_this.maintainForm.oldSqno,
        operateFlag:_this.maintainForm.operateFlag
      })
      _this.changeCRY(_currency)
      _this.changeRecAccount()
      _this.changePayAccount()
    }else{
      _this.form = $.extend({}, _this.form, _this.formData1)   //从父组件传来的值可能是空或对象
    }
    _this.form.userNo = _this.user.eCIFID //操作员编号
    _this.form.prepare = _this.user.userName //操作员姓名
    _this.form.bsnCode = "CB050202"
    _this.form.cstNo = _this.user.cstNo //客户号
    _this.form.hostNo = _this.user.hostNo//核心客户号
    _this.form.namecn = _this.user.cstCN//客户中文名称
  }
}
</script>
<style>
.lh28 .el-input__inner{height:28px !important;}
</style>