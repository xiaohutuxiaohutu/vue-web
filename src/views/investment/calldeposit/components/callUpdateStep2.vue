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
            <el-option v-for="item in form.options" :label="item.accNo" :value="item"></el-option>
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
          {{form.accBalance}}
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
          {{form.openAccDate}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转出本金：" ref="PNPAmt" prop="PNPAmt">
          <span v-if="form.withType==1">{{form.accBalance}}</span>
          <currency-input v-if="form.withType==2" :disabled="false" v-model="form.PNPAmt" :showChinese="false"></currency-input>
        </el-form-item>
        <el-form-item label="支取时间：">
          <el-date-picker v-model="date" v-if="form.oprType=='0'" type="date" format="yyyyMMdd" placeholder="选择日期" @change="selectDate" :picker-options="pickerOptions"></el-date-picker>
          <span v-model="date" v-if="form.oprType=='1'"></span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="金额大写：">
          <span v-if="form.withType==1">{{$tools.utils.toChinese(form.accBalance)}}</span>
          <span v-if="form.withType==2">{{$tools.utils.toChinese(form.PNPAmt)}}</span>
        </el-form-item>
        <el-form-item label="预约号：" v-if="form.oprType=='1'" ref="orderNo" prop="orderNo">
          <el-input v-model="form.orderNo"></el-input>
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
      }
    },
    data(){
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
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
          ]
        }
      }
    },
    mounted() {
    },
    methods: {
      nextStep(){
        let _this = this
        _this.$refs.form.validate((valid) =>{
          if(valid){
            _this.$emit("goStepPage",false,false,true,1,_this.form)
          }
        })
      },
      preStep(){
        this.$emit("goStepPage",true,false,false,0)
      },
      selectDate(val){
        this.form.orderDate = val
      },
      selectAcc(val){
        this.form.transInAccName = val.accName
      },
      validatorPNP(rules,value,callback){
        let _this = this
        let _value=_this.$tools.utils.currencyParse(value)
        let _accBalance=_this.$tools.utils.currencyParse(_this.form.accBalance)
        if(_this.form.withType=='2'&&_value===""){
          callback(new Error('请输入支取金额'))
        }else if(_this.form.withType=='2'&&_value<10000){
          callback(new Error('通知金额不能小于最小支取金额'))
        }else if(_this.form.withType=='2'&&_accBalance===_value){
          _this.isAllWithdraw()
        }else if(_this.form.withType=='2'&&(_accBalance-_value)<500000&&(_accBalance-_value)>0){
          callback(new Error('剩余金额小于起存金额（50万元）'))
        }else if(_this.form.withType=='2'&&(_accBalance-_value)<0){
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
        this.$confirm('确认全部支取', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.withType=1
        }).catch(() => {
          
        });
      }
    }
  }
</script>