<template>
<div class="letterOfGuaranteeToOpenStep">
      <!--table布局-->
      <div class="formEmbedTable mt20">
        <table>
          <caption>保函信息</caption>
          <tr>
            <td><span class="cRed">*</span>保函种类：</td>
            <td>{{$tools.dict.gntTypeTrans(formData.gntType)}}</td>
            <td><span class="cRed">*</span>开立方式：</td>
            <td>{{$tools.dict.ESTBDTrans(formData.ESTBD)}}</td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>保函币种：</td>
            <td>{{$tools.dict.CRYTrans(formData.CRY)}}</td>
            <td><span class="cRed">*</span>保函金额：</td>
            <td>{{formData.gntAmt}}</td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>保函生效日期：</td>
            <td>{{$tools.utils.formatDate(formData.valueDate,{"symbol":"YYYY-MM-DD"})}}</td>
            <td><span class="cRed">*</span>保函到期日期：</td>
            <td>{{$tools.utils.formatDate(formData.dueDate,{"symbol":"YYYY-MM-DD"})}}</td>
          </tr>
          <tr>
            <td>申请人客户号：</td>
            <td>{{formData.cstNo}}</td>
            <td>申请人客户名称：</td>
            <td>{{formData.cstName}}</td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>申请人地址：</td>
            <td colspan="3">{{formData.appAddr}}</td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>被担保人姓名：</td>
            <td>{{formData.wrntName}}</td>
            <td><span class="cRed">*</span>被担保人地址：</td>
            <td>{{formData.wrntAddr}}</td>
          </tr>
          <tr>
            <td>受益人姓名：</td>
            <td>{{formData.befName}}</td>
            <td>受益人地址：</td>
            <td>{{formData.befAddr}}</td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>合同编号：</td>
            <td>{{formData.contraNo}}</td>
            <td><span class="cRed">*</span>合同币种：</td>
            <td>{{$tools.dict.CRYTrans(formData.contraCRY)}}</td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>合同金额：</td>
            <td>{{formData.contraAmt}}</td>
            <td><span class="cRed">*</span>保函模板：</td>
            <td>{{$tools.dict.gntTemplateTrans(formData.gntTemplate)}}</td>
          </tr>
          <tr v-if="this.formData.templateIndex=='1'">
            <td><span class="cRed">*</span>申请人模板文件：</td>
            <td colspan="3">{{formData.newFileName}}</td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>{{formData.comments}}</td>
            <td><span class="cRed">*</span>扣费账号：</td>
            <td>{{formData.wthdAccNo}}</td>
          </tr>
        </table>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="uKeySubmit()">提交</el-button>
          <el-button @click="preStep()">上一步</el-button>
        </div>
      </div>
      <!--table布局--> 
</div>
</template>

<script>
export default {
  name:'letterOfGuaranteeToOpenStep',
  components: {
  },
  data() {
    return {
      templateIndex:''
    }
  },
  props:{
    formData:{type:Object,default:{}},
  },
  methods: {
    preStep(){
      let _this=this
      if(_this.formData.newFileName!='') _this.$emit("showFileTable", true)
      else _this.$emit("showFileTable", false)
      _this.$emit("changeStep","0")
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
        {key:'befName',value:_this.formData.befName},
        {key:'wthdAccNo',value:_this.formData.wthdAccNo},
        {key:'contraAmt',value:_this.formData.contraAmt},
        {key:'contraCRY',value:_this.formData.contraCRY},
        {key:'gntAmt',value:_this.formData.gntAmt},
        {key:'CRY',value:_this.formData.CRY}
      ]
      let siDate=JSON.stringify(newDate);
      let certNo=loginStorge.serialNo
      let ukeyNo=loginStorge.uKeySn
      let siAmt=_this.formData.gntAmt
      let siAccountNo=_this.formData.wthdAccNo
      let arrAcc=["扣费账号:",siAccountNo]
      let arrAmt=["保函金额:",siAmt]
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
      _this.getTimeStamps('CB050401')
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
      let _this = this
      //console.log(_this.formData)
      _this.$tools.request(this,"CB050401.do",_this.formData).then(data => {
        let errorCode = data.body.errorCode
        let errorMsg = data.body.errorMsg
        if (errorCode == '' || errorCode == null || errorCode == '0') {
            //_this.$emit("changeStep","2",data)
            let formData1 = $.extend({},_this.formData,data.body)
            _this.$emit("changeStep","2",formData1)
        } else {
            _this.$alert(errorMsg, '温馨提示', {
                confirmButtonText: '确定'
            })
        }
      })
    }
  },
  mounted(){
    if(this.formData.gntTemplate=='1'){
      this.formData.templateIndex=='1'
    }else{
      this.formData.templateIndex=='0'
    }
  }
}
</script>
<style  lang="scss">

</style>