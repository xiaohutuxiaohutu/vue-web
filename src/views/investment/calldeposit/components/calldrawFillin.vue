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
        <el-form-item label="预约号：" prop="orderNo">
          <el-input v-model="form.orderNo" @blur="orderNoChange"></el-input>
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
      turnUpNums:{type:Number},
      fillinMsg:{type:Object}
    },
    data(){
      return {
        form: this.$route.params,
        loginStorage:this.$tools.storage.get("user","save"),
        dialogVisible: false,
        options:[],  //活期账号列表
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
        }
      }
    },
    mounted(){
      let _this = this
      let _options = _this.loginStorage.operAccInfoList
      _this.options = _options.filter(_this.checkOptionsArray)
      if(JSON.stringify(_this.form)!='{}'&&_this.turnUpNums==0){
        if(undefined==_this.form.callDetailList){
          return
        }
        let body={}
        body.accNo = _this.form.callDetailList[0].accNo
        body.depNo = _this.form.callDetailList[0].depNo
        body.cstNo=_this.loginStorage.hostNo
        body.eCIFID=_this.loginStorage.eCIFID
        body.chooseFlag='0'  //查询余额标识
        _this.$tools.request(_this,"CB000001.do",body).then(
          data =>{
            _this.form  = $.extend({},_this.form,{
              transInAccNo:_this.form.callDetailList[0].recAcc,
              transInAccName:_this.form.callDetailList[0].recAccName,
              openNode:_this.form.callDetailList[0].recOpenNode,
              openName:_this.form.callDetailList[0].recOpenName,
              accNo:_this.form.callDetailList[0].accNo,
              accName:_this.form.callDetailList[0].accName,
              callOpenNode:_this.form.callDetailList[0].callOpenNode,
              callOpenBank:_this.form.callDetailList[0].callOpenBank,
              depNo:_this.form.callDetailList[0].depNo,
              accBalance:data.body.totalAvlBal,
              availBalance:data.body.totalAvlBal,
              PNPAmt:_this.form.callDetailList[0].transAmount,
              accTp:_this.form.callDetailList[0].accTp,
              CRY:'CNY',
              interestRate:_this.form.callDetailList[0].interestRate,
              withType:_this.form.callDetailList[0].withType,
              openAccDate:_this.form.callDetailList[0].valDt,
              orderNo:_this.form.callDetailList[0].orderNo,
              bsnCode:'CB030202',
              cstNo:_this.loginStorage.cstNo,
              hostNo:_this.loginStorage.hostNo,
              eCIFID:_this.loginStorage.eCIFID,
              userName:_this.loginStorage.userName,
              oldSqno:_this.form.oldSqno,
              operateFlag:_this.form.operateFlag,
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
            if(_this.form.orderNo==""){
              _this.$confirm('您没有填写预约号，是否要进行下一步？','温馨提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: '取消',
                type: 'warning',
              }).then(() =>{
                _this.$emit("goStepPage",[1,_this.form])
              }).catch(() =>{
              })
            }else{
              _this.$emit("goStepPage",[1,_this.form])
            }
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
          if(item.accNo==_this.form.transInAccNo){
            _this.form.transInAccName = item.accName
            _this.form.openNode = item.openBankNo
            _this.form.openName = item.openBankName
          }
        }
      },
      validatorPNP(rules,value,callback){
        let _this = this
        if(_this.form.withType=='2' && value==""){
          callback(new Error('请输入支取金额'))
        }else if(_this.form.withType=='2' && Number(value)<100000){
          callback(new Error('通知金额不能小于最小支取金额（10万）'))
        }else if(_this.form.withType=='2' && Number(_this.form.accBalance) === Number(value)){
          _this.isAllWithdraw()
        }else if(_this.form.withType=='2' && (Number(_this.form.accBalance)-Number(value))<500000&&(Number(_this.form.accBalance)-Number(value))>0){
          _this.$confirm('留存金额不足50万，确认全部支取？', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: '取消',
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
      orderNoChange(){
        let _this = this
        if(_this.form.orderNo!=''){
          let body = $.extend({},_this.form,{"status":'90',"oprType":"0"})
          _this.$tools.request(_this,"CB030210.do",body).then(
            data => {
              if(data.body.callDepositAuditList!=''){
                let today = _this.$tools.utils.formatDate(new Date(),{"today":true})
                let todayRemove = _this.$tools.utils.formatDate(today,{"removeFormat":true})
                if(data.body.callDepositAuditList[0].sureAppoDate!=todayRemove){
                  this.$confirm('今日非预约支取日，是否立即支取？', '温馨提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      beforeClose: '取消',
                      type: 'warning'
                    }).then(() => {
                      
                    }).catch(() => {
                      _this.form.orderNo = ''
                    });
                }
              }else{
                this.$confirm('无该预约号，是否立即支取？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: '取消',
                    type: 'warning'
                  }).then(() => {
                    _this.form.orderNo = ''
                  }).catch(() => {
                    _this.form.orderNo = ''
                  });
              }
            })
        }
      },
      isAllWithdraw(){
        let _this = this
        this.$confirm('确认全部支取', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: '取消',
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