<template>
  <div class="fourForm tableForm mt20">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-form-item label="通知存款户名：">
          {{form.accName}}
        </el-form-item>
        <el-form-item label="通知收款户名：">
         {{form.transInAccName}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="通知存款账号：">
           {{form.accNo}}
        </el-form-item>
        <el-form-item label="通知收款账号：" prop="transInAccNo">
          <el-select v-model="form.transInAccNo" placeholder="请选择收款账号" @change="selectAcc">
            <el-option v-for="item in options" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>
          </el-select>
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
          {{$tools.utils.toDecimalString(form.accBalance,true,2)}}
        </el-form-item>
        <el-form-item label="参考利率：">
          {{form.interestRate}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="通知方式：" prop="withType">
          <el-radio-group  v-model="form.withType"  @change="radioChange">
            <el-radio label="1">全部支取</el-radio>
            <el-radio label="2">部分支取</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="起息日：">
          {{$tools.utils.formatDate(form.openAccDate,{"symbol":"YYYY-MM-DD"})}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转出本金：" ref="PNPAmt" prop="PNPAmt">
          <span v-if="form.withType==1">{{$tools.utils.toDecimalString(form.accBalance,true,2)}}</span>
          <currency-input v-if="form.withType==2" :disabled="false" v-model="form.PNPAmt" :showChinese="false"></currency-input>
        </el-form-item>
        <el-form-item label="支取时间：" ref="date" prop="date">
          <el-date-picker v-model="form.date" type="date" format="yyyy-MM-dd" placeholder="选择日期" @change="selectDate" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="金额大写：">
          <span v-if="form.withType==1">{{$tools.utils.toChinese(form.accBalance)}}</span>
          <span v-if="form.withType==2">{{$tools.utils.toChinese(form.PNPAmt)}}</span>
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
  import currencyInput from '@src/components/currency-input'  //金额组件
  export default {
    name: 'calldrawFillin',
    components: {
      currencyInput
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
        loginStorage:this.$tools.storage.get("user","save"),
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        options:[],       //活期账号列表
        date: '',
        rules:{
          transInAccNo:[
            {required: true,validator:this.validatorAccNo, trigger: 'change'}
          ],
          withType:[
            {required: true,trigger:'blur'}
          ],
          PNPAmt: [
            {validator:this.validatorPNP, trigger: 'blur'}
          ],
          date:[
            {required: true,validator:this.validateDate, trigger:'blur'}
          ]
        }
      }
    },
    mounted() {
      let _this = this
      let _options = _this.loginStorage.operAccInfoList
      _this.options = _options.filter(_this.checkOptionsArray)
      if(JSON.stringify(_this.maintainForm)!='{}'&&_this.turnUpNums==0){
        if(undefined==_this.maintainForm.callDetailList){
          return
        }
        let body={}
        body.accNo = _this.maintainForm.callDetailList[0].accNo
        body.depNo = _this.maintainForm.callDetailList[0].depNo
        body.cstNo=_this.loginStorage.hostNo
        body.eCIFID=_this.loginStorage.eCIFID
        body.chooseFlag='0'  //查询余额标识
        _this.$tools.request(_this,"CB000001.do",body).then(
          data =>{
            _this.form  = $.extend({},_this.form,{
              transInAccNo:_this.maintainForm.callDetailList[0].recAcc,
              transInAccName:_this.maintainForm.callDetailList[0].recAccName,
              openNode:_this.maintainForm.callDetailList[0].recOpenNode,
              openName:_this.maintainForm.callDetailList[0].recOpenName,
              accNo:_this.maintainForm.callDetailList[0].accNo,
              accName:_this.maintainForm.callDetailList[0].accName,
              callOpenNode:_this.maintainForm.callDetailList[0].callOpenNode,
              callOpenBank:_this.maintainForm.callDetailList[0].callOpenBank,
              depNo:_this.maintainForm.callDetailList[0].depNo,
              accBalance:data.body.totalAvlBal,
              availBalance:data.body.totalAvlBal,
              PNPAmt:_this.maintainForm.callDetailList[0].transAmount,
              accTp:_this.maintainForm.callDetailList[0].accTp,
              CRY:'CNY',
              interestRate:_this.maintainForm.callDetailList[0].interestRate,
              withType:_this.maintainForm.callDetailList[0].withType,
              openAccDate:_this.maintainForm.callDetailList[0].valDt,
              orderDate:_this.maintainForm.callDetailList[0].orderDate,
              date:_this.$tools.utils.formatDate(_this.maintainForm.callDetailList[0].orderDate,{"symbol":"YYYY-MM-DD"}),
              bsnCode:'CB030204',
              cstNo:_this.loginStorage.cstNo,
              hostNo:_this.loginStorage.hostNo,
              eCIFID:_this.loginStorage.eCIFID,
              userName:_this.loginStorage.userName,
              oldSqno:_this.maintainForm.oldSqno,
              operateFlag:_this.maintainForm.operateFlag,
            })
          })
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
            _this.$emit("goStepPage",false,1,_this.form)
          }
        })
      },
      preStep(){
        this.$emit("goStepPage",true,0)
      },
      selectDate(val){
        let _this = this
        _this.form.orderDate = _this.$tools.utils.formatDate(val,{"removeFormat":true})
        _this.$refs['date'].validate("blur")
      },
      selectAcc(val){
        let _this = this
        for(let index in _this.options){
          let item = _this.options[index]
          if(item.accNo==_this.form.transInAccNo){
            _this.form.transInAccName = item.accName
            _this.form.openNode = item.openBankNo
            _this.form.openName = item.openBankName
          }
        }
      },
      validateDate(rules,value,callback){
        let _this = this
        if(_this.form.date===''||_this.form.date===undefined||_this.form.date===null){
          callback(new Error('请选择支取日期'))
        }else{
          callback()
        }
      },
      validatorPNP(rules,value,callback){
        let _this = this
        if(_this.form.withType=='2' && Number(value)===""){
          callback(new Error('请输入支取金额'))
        }else if(_this.form.withType=='2' && Number(value)<100000){
          callback(new Error('通知金额不能小于最小支取金额（10万）'))
        }else if(_this.form.withType=='2' && Number(_this.form.accBalance)===Number(value)){
          _this.isAllWithdraw()
        }else if(_this.form.withType=='2' && (Number(_this.form.accBalance)-Number(value))<500000&&(Number(_this.form.accBalance)-Number(value))>0){
          _this.$confirm('留存金额不足50万，确认全部支取？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.form.withType='1'
          }).catch(() => {
            return callback(new Error('剩余金额小于起存金额（50万元）'))
          });
        }else if(_this.form.withType=='2' && (Number(_this.form.accBalance)-Number(value))<0){
          callback(new Error('转出金额不得超于本金金额'))
        }else{
          callback()
        }
      },
      validatorAccNo(rules,value,callback){
        let _this = this
        if(_this.form.transInAccNo===""){
          callback(new Error('请选择收款账号'))
        }else{
          callback()
        }
      },
      radioChange(val){
        let _this = this
        if(val=='1'){
          _this.form.PNPAmt = ''
          _this.$refs['PNPAmt'].validate("blur")
        }else{
        }
      },
      isAllWithdraw(){
        let _this = this
        _this.$confirm('确认全部支取', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.form.withType='1'
          _this.form.PNPAmt = ''
        }).catch(() => {
          
        });
      }
    }
  }
</script>