<template>
<div class="exportCollectionStep exportCollectionStep2">
      <exportCollectionPrint :formData="formData" :isPrint="isPrint"></exportCollectionPrint>
      <div class="btnArea mt20 tac">
        <el-button type="primary" v-if="!isPrint" @click="uKeySubmit()">提交</el-button>
        <el-button type="primary" v-if="isPrint" @click="$tools.print()">打印</el-button>
        <el-button v-if="!isPrint" @click="preStep()">上一步</el-button>
        <el-button v-if="isPrint" @click="printGoBack()">返回</el-button>
      </div>
</div>
</template>

<script>
import exportCollectionPrint from './exportCollectionPrint'
export default {
  name:'exportCollectionStep2',
  components: {
    exportCollectionPrint
  },
  data() {
    return {
      
    }
  },
  props:{
    formData:{type:Object},
    isPrint:{type:Boolean,default:false},
  },
  methods: {
    preStep(){
      let _this=this
      _this.$emit("changeStep","0",_this.formData,false)
    },
    printGoBack(){
      let _this = this
      _this.$emit("changeStep","2",_this.formData,false)
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
        {key:'draweeName',value:_this.formData.draweeName},//付
        {key:'drawerName',value:_this.formData.drawerName},//收
        {key:'payAccNo',value:_this.formData.payAccNo},//付款账号
        {key:'amt',value:_this.formData.amt},
        {key:'CRY',value:_this.formData.CRY}
      ]
      let siDate=JSON.stringify(newDate);
      let certNo=loginStorge.serialNo
      let ukeyNo=loginStorge.uKeySn
      let siAmt=_this.formData.amt
      let siAccountNo=_this.formData.payAccNo
      let arrAcc=["付款账号:",siAccountNo]
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
      _this.getTimeStamps('CB050501')
    },
    getTimeStamps(tradeCode){
        let _this = this
        let code = {"tradeCode":tradeCode}
        _this.$tools.request(this,"CB000028Action.do",code).then( data => {
            _this.formData.timeStamps =  data.body.timeStamps
            _this.submitForm()
        })
      },
    submitForm() {
      let _this=this
      _this.$tools.request(this,"CB050501.do",_this.formData).then(data => {
        let errorCode = data.body.errorCode
        let errorMsg = data.body.errorMsg
        if (errorCode == '' || errorCode == null || errorCode == '0') {
            let formData1 = $.extend({},_this.formData,data.body)
            _this.$emit("changeStep","2",formData1,false)
        } else {
            _this.$alert(errorMsg, '温馨提示', {
                confirmButtonText: '确定'
            })
        }
      })
    }
  },
  mounted(){ 
  }
}
</script>
