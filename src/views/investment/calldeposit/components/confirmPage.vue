<template>
  <div class="fourForm tableForm mt20">
    <el-form>
      <el-row>
        <el-form-item label="付款账号：" class="fullLine">
          {{form.transOutCardNo}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="付款账户名：" class="fullLine">
          {{form.transOutAccName}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="通知存款账号：" class="fullLine">
          {{form.accNo}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="通知存款户名：" class="fullLine">
          {{form.accName}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="通知存款种类：" class="fullLine">
          {{$tools.dict.callType(form.accTp)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="币种：" class="fullLine">
          {{$tools.dict.CRYTrans(form.CRY)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="利率：" class="fullLine">
          {{form.interestRate}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="金额：" class="fullLine">
          {{$tools.utils.toDecimalString(form.PNPAmt,true,2)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="大写：" class="fullLine">
          {{$tools.utils.toChinese(form.PNPAmt)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注：" class="fullLine">
          {{form.transDesc}}
        </el-form-item>
      </el-row>
    </el-form>
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="uKeySubmit">确定</el-button>
        <el-button @click="preStep">返回</el-button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'confirmPage',
  props: {
    form:{
      type: Object
    }
  },
  data(){
    return {
    }
  },
  methods: {
    uKeySubmit(){
      let _this = this
      //企业客户号|用户号|交易代码|付款账号|通知存款账号|种类|金额|操作时间|网银流水号（需求中有“是否自动续存”字段）
      let loginStorge = _this.$tools.storage.get("user","save")
      let currentTime = _this.$tools.utils.formatDate(new Date(),{"removeFormat":true})
      let cstNo=loginStorge.cstNo
      let eCIFID=loginStorge.eCIFID
      let newDate=[
        {key:'cstNo',value:cstNo},
        {key:'eCIFID',value:eCIFID},
        {key:'transOutCardNo',value:_this.form.transOutCardNo},
        {key:'transOutAccName',value:_this.form.transOutAccName},
        {key:'accNo',value:_this.form.accNo},
        {key:'accName',value:_this.form.accName},
        {key:'accTp',value:_this.form.accTp},
        {key:'PNPAmt',value:_this.form.PNPAmt}
      ]
      let siDate=JSON.stringify(newDate);
      let certNo=loginStorge.serialNo
      let ukeyNo=loginStorge.uKeySn
      let siAmt=_this.form.PNPAmt
      let siAccountNo=_this.form.transOutCardNo
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
        _this.form.signedData=signData
      }
      _this.nextStep()
    },
    getTimeStamps(tradeCode){
      let _this = this
      let code = {"tradeCode":tradeCode}
      _this.$tools.request(this,"CB000028Action.do",code).then( data => {
          _this.form.timeStamps =  data.body.timeStamps
      })
    },
    nextStep() {
      let _this = this
      _this.$tools.request(_this,"CB030201.do",_this.form).then(
        data => {
          if(data.body){
            _this.$emit("goStepPage",[2,data.body])
          }
      })
    },
    preStep(){
      let _this = this
      _this.$emit("goStepPage",[0])
    }
  },
  mounted(){
    let _this = this
    _this.getTimeStamps('CB030201')
  }
}
</script>