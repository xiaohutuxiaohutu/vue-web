<template>
  <div class="fourForm tableForm mt20">
    <el-form class="mb30">
      <h3>付款信息</h3>
      <el-row>
        <el-form-item label="转出子公司组别：" class="fullLine">
          {{confirmMsg.acctGroupDesc}}
        </el-form-item>
      </el-row>
      <el-row>
          <el-form-item label="转出子公司账号：" class="fullLine">
            {{confirmMsg.payAccountNo}}
          </el-form-item>
      </el-row>
      <el-row>
          <el-form-item label="转出子公司账户名：" class="fullLine">
            {{confirmMsg.payAccountName}}
          </el-form-item>
      </el-row>
    <!--</el-form>-->
      <h3>收款信息</h3>
    <!--<el-form >-->
      <el-row >
        <el-form-item label="转入母公司账号：" class="fullLine">
          {{confirmMsg.recAccount}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转入母公司账户名：" class="fullLine">
          {{confirmMsg.recName}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="存入金额：" class="fullLine">
          {{confirmMsg.transAmount}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="大写：" class="fullLine">
          {{$tools.utils.toChinese(confirmMsg.transAmount)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="收款方手机号：" class="fullLine">
          {{confirmMsg.mobileNo}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="用途：" class="fullLine" v-if="confirmMsg.purposeOther==''">
          {{confirmMsg.purposeName}}
        </el-form-item>
        <el-form-item label="用途：" class="fullLine" v-if="confirmMsg.purposeOther!=''">
          {{confirmMsg.purposeOther}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="附言：" class="fullLine">
          {{confirmMsg.postscript}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注：" class="fullLine">
          {{confirmMsg.remark}}
        </el-form-item>
      </el-row>
    </el-form>
    
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="preStep">上一步</el-button>
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
    nextStep() {
      let _this = this
      _this.$emit("changeStep",2)
      
    },
    preStep(){
      let _this = this
      console.log(_this.confirmMsg)
      _this.$emit("changeStep",0)
    },
    endSublmit(){
      let _this = this
      let userStorge = _this.$tools.storage.get("user","save")
      let cstNo = userStorge.cstNo
      let userId = userStorge.eCIFID
      let newDate = [
        {key:'cstNo',value:cstNo},
        {key:'userId',value:userId},
        {key:'payAccountNo',value:_this.confirmMsg.payAccountNo},
        {key:'payAccountName',value:_this.confirmMsg.payAccountName},
        {key:'recAccount',value:_this.confirmMsg.recAccount},
        {key:'recName',value:_this.confirmMsg.recName},
        {key:'transAmount',value:_this.confirmMsg.transAmount}
      ]
      let siDate = JSON.stringify(newDate);
      let certNo = userStorge.serialNo
      let ukeyNo = userStorge.uKeySn
      let siAmt = _this.confirmMsg.transAmount
      let siAccountNo = _this.confirmMsg.payAccountNo
      let arrAcc = ["付款账号:",siAccountNo]
      let arrAmt = ["交易金额:",siAmt]
      let keyFlag = _this.$ukey
      if(keyFlag == true || keyFlag == 'true'){
        let flag = getSignData(arrAcc,arrAmt,siDate,certNo,ukeyNo)
        if(flag == false || flag == 'false'){
          //this.$alert('UKey签名失败,请重新再试', '温馨提示')
          return
        } 
        let signData = document.getElementById("signData").value.toString()
        _this.confirmMsg.signedData = signData
      }
      _this.$tools.request(_this,"CB040202.do",_this.confirmMsg).then( data => {
        //下一步，交易结果页面
        let errorCode=data.body.errorCode
        let errorMsg=data.body.errorMsg
        if(errorCode=='0'){
          _this.confirmMsg.sequenceNo=data.body.sequenceNo
          _this.confirmMsg.status="成功"
          _this.$emit("changeStep","2",_this.confirmMsg)
        }else{
          this.$alert(errorMsg, errorCode, {
            confirmButtonText: '确定'
          })
          // this.confirmMsg.sequenceNo="无"
          // _this.confirmMsg.status="失败"
          // _this.$emit("changeStep","2",_this.confirmMsg)
        }
      })
    },
    submitForm(){
        let _this=this
        let body={}
        body.accountNo=_this.confirmMsg.payAccountNo
        _this.$tools.request(_this,"CB000012.do",body).then(
          data=>{
            let errorCode=data.body.errorCode
            if(errorCode =='0'){
              let daySumCorpor = data.body.daySumCorpor
              let daySumPerson = data.body.daySumPerson
              let corpor='1000000';//对公100万
              let person='300000';//对私30万
              if(_this.confirmMsg.companyFlag=='0'){
                if(Number(daySumCorpor)>Number(corpor)){
                  this.$confirm('你当日对公累计交易金额已经达到100万, 请确认是否继续转账?', '温馨提示', {confirmButtonText: '确定', cancelButtonText: '取消',type: 'warning'
                  }).then(() => {
                    _this.endSublmit()
                  }).catch(() => {
                        
                  });
                }else{
                  _this.endSublmit()
                }
              }else{
              if(Number(daySumPerson)>Number(person)){
                this.$confirm('你当日对私累计交易金额已经达到30万, 请确认是否继续转账?', '温馨提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  _this.endSublmit()
                }).catch(() => {
                      
                });
              }else{
                _this.endSublmit()
              }
            }
          }
        }
      )
    },
    mounted(){
      
    }
  }
}
</script>