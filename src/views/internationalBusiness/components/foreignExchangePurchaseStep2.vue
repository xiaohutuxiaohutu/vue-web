<template>
<div class="foreignExchangePurchaseStep">
     <!--table布局-->
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20">
        <table>
          <caption>汇款信息</caption>
          <tr>
            <td>交易类型：</td>
            <td>{{$tools.dict.transactionType(formData.type1)}}</td>
          </tr>
          <tr>
            <td>{{exchangeType(formData.type1)}}币种：</td>
            <td>{{$tools.dict.CRYTrans(formData.currency)}}</td>
          </tr>
          <tr>
            <td>转出账号：</td>
            <td>{{formData.payAccount}}</td>
          </tr>
          <tr>
            <td>转入账号：</td>
            <td>{{formData.recAccount}}</td>
          </tr>
          <tr>
            <td>{{exchangeCRY(formData.type1)}}金额：</td>
            <td>{{$tools.utils.toDecimalString(formData.transAmount,true,2)}}</td>
          </tr>
          <tr>
            <td>{{exchangeCRY1(formData.type1)}}金额：</td>
            <td>{{$tools.utils.toDecimalString(formData.recAmount,true,2)}}</td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>{{formData.RMK}}</td>
          </tr>
        </table>
        <div class="btnArea mt20 tac">
            <el-button type="primary" @click="uKeySubmit()">提交</el-button>
            <el-button @click="preStep()">上一步</el-button>
        </div>
      </el-form>
      <!--table布局-->
</div>
</template>

<script>
export default {
  name:'foreignExchangePurchaseStep2',
  components: {
  },
  data() {
    return {
    }
  },
  props:{
    formData:{type:Object,default:{}},
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
    uKeySubmit(){
      let _this = this
      //企业客户号|用户号|交易代码|付款账号|收款账号|种类|金额|操作时间|网银流水号（需求中有“是否自动续存”字段）
      let loginStorge = _this.$tools.storage.get("user","save")
      let currentTime = _this.$tools.utils.formatDate(new Date(),{"removeFormat":true})
      let cstNo=loginStorge.cstNo
      let eCIFID=loginStorge.eCIFID
      let newDate=[
        {key:'cstNo',value:cstNo},
        {key:'eCIFID',value:eCIFID},
        {key:'payAccount',value:_this.formData.payAccount},
        {key:'recAccount',value:_this.formData.recAccount},
        {key:'transAmount',value:_this.formData.transAmount},
        {key:'recAmount',value:_this.formData.recAmount},
        {key:'payCurrency',value:_this.formData.payCurrency},
        {key:'recCurrency',value:_this.formData.recCurrency}
      ]
      let siDate=JSON.stringify(newDate);
      let certNo=loginStorge.serialNo
      let ukeyNo=loginStorge.uKeySn
      let siAmt=_this.formData.recAmount
      let siAccountNo=_this.formData.payAccount
      let arrAcc=["付款账号:",siAccountNo]
      let arrAmtName = _this.exchangeCRY1(_this.formData.type1)+"金额:"
      let arrAmt=[arrAmtName,siAmt]
      let keyFlag=_this.$ukey
      // let keyFlag=false
      if(keyFlag==true||keyFlag=='true'){
        let flag=getSignData(arrAcc,arrAmt,siDate,certNo,ukeyNo)
        if(flag==false||flag=='false'){
          //this.$alert('UKey签名失败,请重新再试', '温馨提示')
          return
        } 
        let signData=document.getElementById("signData").value.toString()
        _this.formData.signedData=signData
      }
      _this.submitForm()
    },
    getTimeStamps(tradeCode){
      let _this = this
      let code = {"tradeCode":tradeCode}
      _this.$tools.request(this,"CB000028Action.do",code).then( data => {
          _this.formData.timeStamps =  data.body.timeStamps
      })
    },
    submitForm() {
      let _this=this
      _this.$tools.request(this,"CB050110.do",_this.formData).then(data => {
        _this.$emit("changeStep1","2",data.body)
      })
    },
    preStep(){
      let _this=this
      _this.$emit("changeStep1", "0",_this.formData)
    }
  },
  mounted(){
    let _this = this
    _this.getTimeStamps('CB050110')
  }
}
</script>