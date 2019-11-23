<template>
  <div class="fourForm tableForm mt20">
    <el-form ref="form" :model="form">
      <el-row>
        <el-form-item label="定期存款户名：">
          {{form.accName}}
        </el-form-item>
        <el-form-item label="收款人户名：">
          {{form.transInAccName}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="定期存款账号：">
          {{form.accNo}}
        </el-form-item>
        <el-form-item label="收款人账号：">
          {{form.transInAccNo}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="定期存款本金：">
          {{$tools.utils.toDecimalString(form.accBalance,true,2)}}
        </el-form-item>
        <el-form-item label="币种：">
          {{$tools.dict.CRYTrans(form.CRY)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="存期：">
          {{$tools.dict.getDepTerm(form.depTerm)}}
        </el-form-item>
        <el-form-item label="参考利率：">
          {{form.interestRate}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="支取方式：">
          <span v-if="form.withType=='1'">全部支取</span>
          <span v-if="form.withType=='2'">部分支取</span>
        </el-form-item>
        <el-form-item label="起息日：">
          {{$tools.utils.formatDate(form.openAccDate,{"symbol":"YYYY-MM-DD"})}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转出本金：">
          <span v-if="form.withType=='1'">{{$tools.utils.toDecimalString(form.accBalance,true,2)}}</span>
          <span v-if="form.withType=='2'">{{form.PNPAmt}}</span>
        </el-form-item>
        <el-form-item label="到期日：">
          {{$tools.utils.formatDate(form.expDt,{"symbol":"YYYY-MM-DD"})}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="金额大写：">
          <span v-if="form.withType=='1'">{{$tools.utils.toChinese(form.accBalance)}}</span>
          <span v-if="form.withType=='2'">{{$tools.utils.toChinese(form.PNPAmt)}}</span>
        </el-form-item>
        <el-form-item label="约转方式：">
          <span v-if="form.autoTransDepIndex=='O'">本息续存</span>  <!--0生产时删除-->
          <span v-if="form.autoTransDepIndex=='W'">本金续存</span>
        </el-form-item>
      </el-row>
    </el-form>
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="uKeySubmit">确认</el-button>
      <el-button @click="preStep">上一步</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'withdrawConfirm',
    components: {
    },
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
        if(_this.form.PNPAmt == ""){
          _this.form.PNPAmt = _this.form.accBalance
        }
        //企业客户号|用户号|交易代码|定期存款账号|收款账号|存期|金额|支取方式|操作时间|网银流水号
        let loginStorge = _this.$tools.storage.get("user","save")
        let currentTime = _this.$tools.utils.formatDate(new Date(),{"removeFormat":true})
        let cstNo=loginStorge.cstNo
        let eCIFID=loginStorge.eCIFID
        let newDate=[
          {key:'cstNo',value:cstNo},
          {key:'eCIFID',value:eCIFID},
          {key:'accNo',value:_this.form.accNo},
          {key:'accName',value:_this.form.accName},
          {key:'transInAccNo',value:_this.form.transInAccNo},
          {key:'transInAccName',value:_this.form.transInAccName},
          {key:'depTerm',value:_this.form.depTerm},
          {key:'PNPAmt',value:_this.form.PNPAmt},
          {key:'withType',value:_this.form.withType}
        ]
        let siDate=JSON.stringify(newDate);
        let certNo=loginStorge.serialNo
        let ukeyNo=loginStorge.uKeySn
        let siAmt=_this.form.PNPAmt
        let siAccountNo=_this.form.accNo
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
          _this.form = $.extend({},_this.form,{"signedData":signData})
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
        _this.$tools.request(_this,"CB030106.do",_this.form).then(
          data => {
            if(data.body){
              _this.$emit("goStepPage",[2,data.body])
            }
          }
        )
      },
      preStep(){
        let _this = this
        _this.$emit("goStepPage",[0,_this.form])
      }
    },
    mounted(){
      let _this = this
      _this.getTimeStamps('CB030106')
    }
  }
</script>