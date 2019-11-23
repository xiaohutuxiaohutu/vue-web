<template>
  <div class="fourForm tableForm mt20">
    <el-form ref="form" :model="form">
      <el-row>
        <el-form-item label="通知存款户名：">
          {{form.enName}}
        </el-form-item>
        <el-form-item label="通知存款账号：">
          {{form.accNo}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="通知存款种类：">
          {{$tools.dict.callType(form.accTp)}}
        </el-form-item>
        <el-form-item label="币种：">
          {{$tools.dict.CRYTrans(form.CRY)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="通知存款本金：">
          {{$tools.utils.toDecimalString(form.PNPAmt,true,2)}}
        </el-form-item>
        <el-form-item label="支取日期：">
          {{$tools.utils.formatDate(form.orderDate,{"symbol":"YYYY-MM-DD"})}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="金额大写：">
          {{$tools.utils.toChinese(form.PNPAmt)}}
        </el-form-item>
        <el-form-item label="预约号：">
          {{form.orderNo}}
        </el-form-item>
      </el-row>
    </el-form>
    <div  class="btnArea mt20 tac">
      <el-button type="primary" @click="uKeySubmit">确定</el-button>
      <el-button @click="preStep">返回</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'callCancelStep1',
    components: {
    },
    props:{
      form:{
        type:Object
      },
      turnUpNums:{
        type:Number
      }
    },
    data(){
      return {
        maintainForm:this.$route.params,
        loginStorage: this.$tools.storage.get("user","save")
      }
    },
    mounted() {
      let _this = this
      _this.getTimeStamps('CB030203')
      if(JSON.stringify(_this.maintainForm)!='{}'&&_this.turnUpNums==0){
        let body={}
        body.accNo = _this.maintainForm.callDetailList[0].accNo
        body.depNo = _this.maintainForm.callDetailList[0].depNo
        body.cstNo=_this.loginStorage.hostNo
        body.eCIFID=_this.loginStorage.eCIFID
        body.chooseFlag='0'  //查询余额标识
        _this.$tools.request(_this,"CB000001.do",body).then(
          data =>{
            _this.form  = $.extend({},_this.form,{
              accNo:_this.maintainForm.callDetailList[0].accNo,
              enName:_this.maintainForm.callDetailList[0].accName,
              callOpenNode:_this.maintainForm.callDetailList[0].callOpenNode,
              callopenBank:_this.maintainForm.callDetailList[0].callopenBank,
              accTp:_this.maintainForm.callDetailList[0].accTp,
              CRY:'CNY',
              depNo:_this.maintainForm.callDetailList[0].depNo,
              PNPAmt:_this.maintainForm.callDetailList[0].transAmount,
              orderDate:_this.maintainForm.callDetailList[0].orderDate,
              orderNo:_this.maintainForm.callDetailList[0].orderNo,
              oldSqno:_this.maintainForm.oldSqno,
              operateFlag:_this.maintainForm.operateFlag,
            })
          })
      }
    },
    methods: {
      uKeySubmit(){
        let _this = this
        _this.form = $.extend({},_this.form,{
          cstNo:_this.loginStorage.cstNo,
          hostNo:_this.loginStorage.hostNo,
          eCIFID:_this.loginStorage.eCIFID,
          userName:_this.loginStorage.userName,
          bsnCode:'CB030203',
          accName:_this.form.enName
        })
        //企业客户号|用户号|交易代码|通知存款账号|币种|通知类型|存单号|金额|通知途径|操作时间|网银流水号（需求没有具体说明）
        let loginStorge = _this.$tools.storage.get("user","save")
        let currentTime = _this.$tools.utils.formatDate(new Date(),{"removeFormat":true})
        let cstNo=loginStorge.cstNo
        let eCIFID=loginStorge.eCIFID
        let newDate=[
          {key:'cstNo',value:cstNo},
          {key:'eCIFID',value:eCIFID},
          {key:'accNo',value:_this.form.accNo},
          {key:'accName',value:_this.form.accName},
          {key:'accTp',value:_this.form.accTp},
          {key:'PNPAmt',value:_this.form.PNPAmt},
          {key:'depNo',value:_this.form.depNo}
        ]
        let siDate=JSON.stringify(newDate);
        let certNo=loginStorge.serialNo
        let ukeyNo=loginStorge.uKeySn
        let siAmt=_this.form.PNPAmt
        let siAccountNo=_this.form.accNo
        let arrAcc=["通知账号:",siAccountNo]
        let arrAmt=["取消金额:",siAmt]
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
        _this.$tools.request(_this,"CB030203.do",_this.form).then(
          data =>{
            _this.$emit("goStepPage",false,true,false,2,data.body)
        })
      },
      preStep(){
        this.$emit("goStepPage",true,false,false,0)
      }
    }
  }
</script>