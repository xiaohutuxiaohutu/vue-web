<template>
  <div class="fourForm tableForm mt20">
    <el-form ref="form" :model="form" :rules="rules">
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
        <el-form-item label="约转方式：" class="fullLine" prop="autoTransDepIndex">
          <el-radio-group v-model="form.autoTransDepIndex" @change="radioChange">
            <el-radio label="O">本息续存</el-radio>
            <el-radio label="W">本金续存</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row v-if="form.autoTransDepIndex=='W'">
        <el-form-item label="收款户名：">
          {{form.thirdAccName}}
        </el-form-item>
        <el-form-item label="收款账号：" prop="thirdAccNo">
          <el-select v-model="form.thirdAccNo" placeholder="第三方收款账号" @change="selectAcc">
            <el-option v-for="item in options" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
    <div  class="btnArea mt20 tac">
      <el-button type="primary" @click="nextStep">下一步</el-button>
      <el-button @click="preStep">返回</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modeChangeFillin',
    components: {
    },
    props:{
      turnUpNums:{type:Number},
      fillinMsg:{type:Object}
    },
    data(){
      return {
        form: this.$route.params,
        loginStorage:this.$tools.storage.get("user","save"),
        options:[],       //活期账号列表
        rules:{
          autoTransDepIndex: [
            { required: true, message: '请选择约转方式', trigger: 'blur' }
          ],
          thirdAccNo:[
            {required: true,validator:this.validatorAccNo, trigger: 'change'}
          ]
        }
      }
    },
    mounted(){
      let _this = this
      let _options = _this.loginStorage.operAccInfoList
      _this.options = _options.filter(_this.checkOptionsArray)
      if(JSON.stringify(_this.form)!='{}'&&_this.turnUpNums==0){
        let body={}
        body.accNo = _this.form.termDetailList[0].accNo
        body.depNo = _this.form.termDetailList[0].depNo
        body.cstNo=_this.loginStorage.hostNo
        body.eCIFID=_this.loginStorage.eCIFID
        body.chooseFlag='0'  //查询余额标识
        _this.$tools.request(_this,"CB000001.do",body).then(
          data =>{
            _this.form  = $.extend({},_this.form,{
              accNo:_this.form.termDetailList[0].accNo,
              accName:_this.form.termDetailList[0].accName,
              termOpenNode:_this.form.termDetailList[0].termOpenNode,
              termOpenBank:_this.form.termDetailList[0].termOpenBank,
              depTerm:_this.form.termDetailList[0].depTerm,
              depNo:_this.form.termDetailList[0].depNo,
              accBalance:data.body.accNoList[0].ACCT_BAL,
              availBalance:data.body.accNoList[0].ACCT_BAL,
              PNPAmt:_this.form.termDetailList[0].transAmount,
              CRY:'CNY',
              interestRate:_this.form.termDetailList[0].interestRate,
              withType:_this.form.termDetailList[0].withType,
              autoTransDepIndex:_this.form.termDetailList[0].autoTransDepIndex,
              openAccDate:_this.form.termDetailList[0].valDt,
              expDt:_this.form.termDetailList[0].expDt,
              bsnCode:'CB030109',
              cstNo:_this.loginStorage.cstNo,
              hostNo:_this.loginStorage.hostNo,
              eCIFID:_this.loginStorage.eCIFID,
              userName:_this.loginStorage.userName,
              thirdAccNo:_this.form.termDetailList[0].thirdAccNo,
              thirdAccName:_this.form.termDetailList[0].thirdAccName,
              oldSqno:_this.form.oldSqno,
              operateFlag:_this.form.operateFlag
            })
          }
        )
      }else if(JSON.stringify(_this.form)!='{}'&&_this.turnUpNums>0){
        _this.form = $.extend({},{},_this.fillinMsg)
      }
    },
    methods: {
      checkOptionsArray(option){
        return option.coreType=='201' && option.cstNo==this.loginStorage.cstNo
      },
      nextStep(){
        let _this = this
        _this.$refs.form.validate((valid) =>{
          if(valid){
            _this.$emit("goStepPage",[1,_this.form])
          }
        })
      },
      preStep(){
        this.$router.go(-1)  //若清空history，会跳转失败
      },
      selectAcc(val){
        let _this = this
        for(let index in _this.options){
          let item = _this.options[index]
          if(item.accNo==_this.form.thirdAccNo){
            _this.form.thirdAccName = item.accName
          }
        }
      },
      validatorAccNo(rules,value,callback){
        let _this = this
        if(_this.form.autoTransDepIndex=='W' && _this.form.thirdAccNo===""){
          callback(new Error('请选择收款账号'))
        }else{
          callback()
        }
      },
      radioChange(val){
        let _this = this
        if(val=='O'){
          _this.form.thirdAccNo = ''
          _this.form.thirdAccName = ''
          _this.$refs['form'].validate("blur")
        }else{
        }
      }
    }
  }
</script>