<template>
  <div class="fourForm tableForm mt20">
    <el-form ref="form" :model="form" :rules="rules">
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
        <el-form-item label="收款人账号：" prop="transInAccNo">
          <el-select v-model="form.transInAccNo" placeholder="请选择" @change="selectAcc">
            <el-option v-for="item in options" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>      
          </el-select>
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
        <el-form-item label="支取方式：" prop="withType">
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
          <span v-if="form.withType=='1'">{{$tools.utils.toDecimalString(form.accBalance,true,2)}}</span>
          <currency-input v-if="form.withType=='2'" :disabled="false" v-model="form.PNPAmt" :showChinese="false"></currency-input>
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
    <div  class="btnArea mt20 tac">
      <el-button type="primary" @click="nextStep">下一步</el-button>
      <el-button @click="preStep">返回</el-button>
    </div>
  </div>
</template>

<script>
  import currencyInput from '@src/components/currency-input'  //金额组件
  export default {
    name: 'withdrawFillin',
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
        options:[],       //活期账号列表
        rules:{
          transInAccNo:[
            {required: true,validator:this.validatorAccNo, trigger: 'change'}
          ],
          withType:[
            {required: true, message:'请选择支取方式', trigger:'blur'}
          ],
          PNPAmt:[
            {validator:this.validatorPNP, trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
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
              transInAccNo:_this.form.termDetailList[0].recAcc,
              transInAccName:_this.form.termDetailList[0].recAccName,
              openNode:_this.form.termDetailList[0].recOpenNode,
              openName:_this.form.termDetailList[0].recOpenName,
              accNo:_this.form.termDetailList[0].accNo,
              accName:_this.form.termDetailList[0].accName,
              termOpenNode:_this.form.termDetailList[0].termOpenNode,
              termOpenBank:_this.form.termDetailList[0].termOpenBank,
              depTerm:_this.form.termDetailList[0].depTerm,
              depNo:_this.form.termDetailList[0].depNo,
              accBalance:data.body.totalAvlBal,
              availBalance:data.body.totalAvlBal,
              PNPAmt:_this.form.termDetailList[0].transAmount,
              CRY:'CNY',
              interestRate:_this.form.termDetailList[0].interestRate,
              withType:_this.form.termDetailList[0].withType,
              autoTransDepIndex:_this.form.termDetailList[0].autoTransDepIndex,
              openAccDate:_this.form.termDetailList[0].valDt,
              expDt:_this.form.termDetailList[0].expDt,
              bsnCode:'CB030106',
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
          if(item.accNo==_this.form.transInAccNo){
            _this.form.transInAccName = item.accName
            _this.form.openNode = item.openBankNo
            _this.form.openName = item.openBankName
          }
        }
      },
      validatorAccNo(rules,value,callback){
        let _this = this
        if(_this.form.transInAccNo==""){
          callback(new Error('请选择收款账号'))
        }else{
          callback()
        }
      },
      validatorPNP(rules,value,callback){
        let _this = this
        if(_this.form.withType=='2' && Number(value)==""){
          return callback(new Error('请输入支取金额'))
        }else if(_this.form.withType=='2' && Number(_this.form.accBalance)==Number(value)){
          _this.isAllWithdraw()
        }else if(_this.form.withType=='2' && (Number(_this.form.accBalance)-Number(value))<10000){
          _this.$confirm('留存金额不足1万，确认全部支取？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.form.PNPAmt=''
            _this.form.withType='1'
          }).catch(() => {
            return callback(new Error('剩余金额小于起存金额（1万元）'))
          });
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
          _this.form.PNPAmt = ''
          _this.form.withType='1'
        }).catch(() => {
          
        });
      }
    }
  }
</script>