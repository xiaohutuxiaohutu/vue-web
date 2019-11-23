<template>
  <div class="fourForm tableForm mt20">
    <el-form ref="form" :model="form">
      <el-row>
        <el-form-item label="定期存款客户：">
          {{form.cstNo}}
        </el-form-item>
        <el-form-item label="定期存款账户：">
          {{form.accNo}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="币种：">
          {{$tools.dict.CRYTrans(form.CRY)}}
        </el-form-item>
        <el-form-item label="定期存款金额：">
          {{$tools.utils.toDecimalString(form.availBalance,true,2)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="存期：">
          {{$tools.dict.getDepTerm(form.depTerm)}}
        </el-form-item>
        <el-form-item label="利率：">
          {{form.interestRate}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="起息日：">
          {{$tools.utils.formatDate(form.openAccDate,{"symbol":"YYYY-MM-DD"})}}
        </el-form-item>
        <el-form-item label="到期日：">
          {{$tools.utils.formatDate(form.expDt,{"symbol":"YYYY-MM-DD"})}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="约转方式：" class="fullLine">
            <span v-if="form.autoTransDepIndex=='O'">本息续存</span> <!--0是生产时删除-->
            <span v-if="form.autoTransDepIndex=='W'">本金续存</span>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row v-if="form.autoTransDepIndex=='W'">
        <el-form-item label="收款户名：" >
            {{form.thirdAccName}}
          </el-radio-group>
        </el-form-item>
        <el-form-item label="收款账号：">
            {{form.thirdAccNo}}
          </el-radio-group>
        </el-form-item>
      </el-row>
    </el-form>
    <div  class="btnArea mt20 tac">
      <el-button type="primary" @click="uKeySubmit">确认</el-button>
      <el-button @click="preStep">上一步</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modeChangeConfirm',
    components: {
    },
    props:{
      form:{
        type: Object
      },
      autoTrans:''  //约转方式 中文
    },
    data(){
      return {
      }
    },
    methods: {
      uKeySubmit(){
        let _this = this
        //本息续存: 企业客户号|用户号|交易代码|定期存款账号|币种|约转方式|操作时间|网银流水号(需求没具体说明)
        //本金续存: 企业客户号|用户号|交易代码|定期存款账号|币种|约转方式|收款账号|操作时间|网银流水号(需求没具体说明)
        let loginStorge = _this.$tools.storage.get("user","save")
        let currentTime = _this.$tools.utils.formatDate(new Date(),{"removeFormat":true})
        let cstNo=loginStorge.cstNo
        let eCIFID=loginStorge.eCIFID
        let newDate=[]
        if(_this.form.autoTransDepIndex=='O'){
          _this.autoTrans = '本息续存'
          newDate=[
            {key:'cstNo',value:cstNo},
            {key:'eCIFID',value:eCIFID},
            {key:'accNo',value:_this.form.accNo},
            {key:'accName',value:_this.form.accName},
            {key:'autoTransDepIndex',value:_this.form.autoTransDepIndex},
            {key:'autoTrans',value:_this.autoTrans}
          ]
        }else{
          _this.autoTrans = '本金续存'
          newDate=[
            {key:'cstNo',value:cstNo},
            {key:'eCIFID',value:eCIFID},
            {key:'accNo',value:_this.form.accNo},
            {key:'accName',value:_this.form.accName},
            {key:'autoTransDepIndex',value:_this.form.autoTransDepIndex},
            {key:'autoTrans',value:_this.autoTrans},
            {key:'thirdAccNo',value:_this.form.thirdAccNo},
            {key:'thirdAccName',value:_this.form.thirdAccName}
          ]
        }
        let siDate=JSON.stringify(newDate);
        let certNo=loginStorge.serialNo
        let ukeyNo=loginStorge.uKeySn
        let siAmt=_this.autoTrans
        let siAccountNo=_this.form.accNo
        let arrAcc=["定期账号:",siAccountNo]
        let arrAmt=["约转方式:",siAmt]
        let keyFlag=_this.$ukey
        if(keyFlag==true||keyFlag=='true'){
          let flag=getSignData(arrAcc,arrAmt,siDate,certNo,ukeyNo)
          if(flag==false||flag=='false'){
            //this.$alert('UKey签名失败,请重新再试', '温馨提示')
            return
          }
          let signData=document.getElementById("signData").value.toString()
          _this.form = $.extend({},_this.form,{"signedData":signData,"autoTrans":_this.autoTrans})
        }
        _this.nextStep()
      },
      getTimeStamps(tradeCode){
        let _this = this
        let code = {"tradeCode":tradeCode}
        _this.$tools.request(this,"CB000028Action.do",code).then( data => {
            _this.form = $.extend({},_this.form,{"timeStamps":data.body.timeStamps})
        })
      },
      nextStep(){
        let _this = this
        _this.$tools.request(_this,"CB030109.do",_this.form).then(
          data => {
            if(data.body){
              _this.$emit("goStepPage",[2,data.body])
            }
          })
      },
      preStep(){
        this.$emit("goStepPage",[0])
      }
    },
    mounted(){
      let _this = this
      _this.getTimeStamps('CB030109')
    },
  }
</script>