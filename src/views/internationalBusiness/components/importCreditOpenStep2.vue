<template>
<div class="importCreditOpenStep2">
  <importCreditOpenPrint :formData="formData" :isPrint="isPrint"></importCreditOpenPrint>
  <div class="btnArea mt20 tac">
      <el-button type="primary" v-if="!isPrint" @click="uKeySubmit()">提交</el-button>
      <el-button type="primary" v-if="isPrint" @click="$tools.print()">打印</el-button>
      <el-button v-if="!isPrint" @click="preStep()">上一步</el-button>
      <el-button v-if="isPrint" @click="printGoBack()">返回</el-button>
  </div> 
</div>
</template>

<script>
import importCreditOpenPrint from './importCreditOpenPrint'
export default {
  name:'importCreditOpenStep2',
  components: {
    importCreditOpenPrint
  },
  data() {
    return {
      loginStorage:this.$tools.storage.get("user","save")
    }
  },
  props:{
    formData:{type:Object},
    isPrint:{type:Boolean,default:false},
  },
  methods: {
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
        {key:'otherInstDebitAccNo1',value:_this.formData.otherInstDebitAccNo1},
        {key:'beneficiary',value:_this.formData.beneficiary},
        {key:'AMTFigures',value:_this.formData.AMTFigures},
        {key:'CRYFigures',value:_this.formData.CRYFigures}
      ]
      let siDate=JSON.stringify(newDate);
      let certNo=loginStorge.serialNo
      let ukeyNo=loginStorge.uKeySn
      let siAmt=_this.formData.AMTFigures
      let siAccountNo=_this.formData.beneficiary
      let arrAcc=["受益人姓名:",siAccountNo]
      let arrAmt=["交易金额:",siAmt]
      let keyFlag=_this.$ukey
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
      _this.formData.chargeLCOpen = String(_this.formData.chargeLCOpen)
      _this.formData.chargeAccept = String(_this.formData.chargeAccept)
      _this.formData.chargeUsanceInt = String(_this.formData.chargeUsanceInt)
      _this.formData.chargeOutsideBank = String(_this.formData.chargeOutsideBank)
      _this.formData.backToBackCloseOrNot = String(_this.formData.backToBackCloseOrNot)
      // let fileList = []
      // for(let i=0;i<_this.formData.upLoadList.length;i++){
      //   if(!_this.formData.upLoadList[i].isDel){
      //     fileList.push(_this.formData.upLoadList[i])
      //   }
      // }
      // let body = $.extend({},_this.formData,{cstNo:_this.loginStorage.cstNo,cstName:_this.loginStorage.cstCN,oprNo:_this.loginStorage.eCIFID,userName:_this.loginStorage.userName,bsnCode:'CB050301',fileList:fileList})
      let body = $.extend({},_this.formData,{cstNo:_this.loginStorage.cstNo,cstName:_this.loginStorage.cstCN,oprNo:_this.loginStorage.eCIFID,userName:_this.loginStorage.userName,bsnCode:'CB050301'})
      _this.$tools.request(this,"CB050301.do",body).then(
        data => {
          let formData1 = $.extend({},_this.formData,data.body)
        _this.$emit("changeStep","2",formData1,false)
      })
    },
    preStep(){
      let _this = this
      // if(_this.formData.docBillIndicat='1') _this.formData.docBillIndicat=true
      // if(_this.formData.docAirWaybillIndicat='1') _this.formData.docAirWaybillIndicat=true
      // if(_this.formData.docTransSportIndicat='1') _this.formData.docTransSportIndicat=true
      _this.formData.docItems = _this.formData.docItems.split(",")
      _this.formData.otherInst = _this.formData.otherInst.split(",")
      //(二期)_this.formData.otherDoc = _this.formData.otherDoc.replace(new RegExp('/space/','gm'),' ').replace(new RegExp('/br/','gm'),'\n')
      _this.$emit("changeStep","0",_this.formData,false)
    },
    printGoBack(){
      let _this = this
      _this.$emit("changeStep","2",_this.formData,false)
    }
  },
  mounted(){
    let _this = this
    _this.getTimeStamps('CB050301')
    // if(_this.formData.docBillIndicat) _this.formData.docBillIndicat='1'
    // if(_this.formData.docAirWaybillIndicat) _this.formData.docAirWaybillIndicat='1'
    // if(_this.formData.docTransSportIndicat) _this.formData.docTransSportIndicat='1'
  }
}
</script>
<style  lang="scss">

</style>