<template>
  <div class="fourForm tableForm mt20">
    <h3>定期存款存入信息</h3>
    <el-form>
      <el-row>
        <el-form-item label="付款账号：" class="fullLine">
          {{confirmMsg.transOutCardNo}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="付款账户名：" class="fullLine">
          {{confirmMsg.transOutAccName}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="定期存款账号：" class="fullLine">
          {{confirmMsg.accNo}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="定期存款户名：" class="fullLine">
          {{confirmMsg.accName}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="存期：" class="fullLine">
          <span v-if="confirmMsg.depTermLink=='3M'">三个月</span>
          <span v-if="confirmMsg.depTermLink=='6M'">半年</span>
          <span v-if="confirmMsg.depTermLink=='1Y'">一年</span>
          <span v-if="confirmMsg.depTermLink=='2Y'">两年</span>
          <span v-if="confirmMsg.depTermLink=='3Y'">三年</span>
          <span v-if="confirmMsg.depTermLink=='5Y'">五年</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="利率：" class="fullLine">
          {{confirmMsg.interestRate}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转入金额：" class="fullLine">
          {{$tools.utils.toDecimalString(confirmMsg.PNPAmt,true,2)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="大写：" class="fullLine">
          {{$tools.utils.toChinese(confirmMsg.PNPAmt)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="到期约转方式：" class="fullLine">
          <span v-if="confirmMsg.autoTransDepIndex=='O'">本息转存定期</span>
          <span v-if="confirmMsg.autoTransDepIndex=='W'">本金转存定期</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注：" class="fullLine">
          {{confirmMsg.transDesc}}
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
    confirmMsg:{
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
      _this.confirmMsg.depTermTp = _this.confirmMsg.depTermLink.substring(1,2)
      _this.confirmMsg.depTerm = _this.confirmMsg.depTermLink.substring(0,1)
      //企业客户号|用户号|交易代码|付款账号|定期存款账号|存期|金额|约转方式|操作时间|网银流水号
      let loginStorge = _this.$tools.storage.get("user","save")
      let currentTime = _this.$tools.utils.formatDate(new Date(),{"removeFormat":true})
      let cstNo=loginStorge.cstNo
      let eCIFID=loginStorge.eCIFID
      let newDate=[
        {key:'cstNo',value:cstNo},
        {key:'eCIFID',value:eCIFID},
        {key:'transOutCardNo',value:_this.confirmMsg.transOutCardNo},
        {key:'transOutAccName',value:_this.confirmMsg.transOutAccName},
        {key:'accNo',value:_this.confirmMsg.accNo},
        {key:'accName',value:_this.confirmMsg.accName},
        {key:'depTerm',value:_this.confirmMsg.depTerm},
        {key:'depTermTp',value:_this.confirmMsg.depTermTp},
        {key:'PNPAmt',value:_this.confirmMsg.PNPAmt},
        {key:'autoTransDepIndex',value:_this.confirmMsg.autoTransDepIndex}
      ]
      let siDate=JSON.stringify(newDate);
      let certNo=loginStorge.serialNo
      let ukeyNo=loginStorge.uKeySn
      let siAmt=_this.confirmMsg.PNPAmt
      let siAccountNo=_this.confirmMsg.transOutCardNo
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
        _this.confirmMsg.signedData=signData
      }
      _this.nextStep()
    },
    getTimeStamps(tradeCode){
      let _this = this
      let code = {"tradeCode":tradeCode}
      _this.$tools.request(this,"CB000028Action.do",code).then( data => {
          _this.confirmMsg.timeStamps =  data.body.timeStamps
      })
    },
    nextStep() {
      let _this = this
      _this.$tools.request(_this,"CB030102.do",_this.confirmMsg).then(
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
    _this.getTimeStamps('CB030102')
  }
}
</script>