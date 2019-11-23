<template>
  <div class="importCreditUpdate">
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>信用证修改</caption>
        <tr>
          <td>
            <p>原流水号</p>
          </td>
          <td colspan="3">
            <p>{{form.sequenceNo}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Applicant</p>
            <p>申请人</p>
          </td>
          <td colspan="3">
            <p>{{form.appName}}</p>
            <p>{{form.appAddr}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Advising bank</p>
            <p>通知行</p>
          </td>
          <td colspan="3">
            {{form.advisingBank}}
          </td>
        </tr>
        <tr>
          <td>
            <p>Beneficiary</p>
            <p>受益人</p>
          </td>
          <td colspan="3">
            <p>{{form.beneficiary}}</p>
            <p>{{form.beneficiaryAddr}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Original DC Amount</p>
            <p>原来金额</p>
          </td>
          <td colspan="3">
            {{form.AMTFigures}}
          </td>
        </tr>
        <tr>
          <td>
            <p>Please amend the DC as follows</p>
            <p>请将上述信用证修改如下</p>
          </td>
          <td colspan="3">
            <el-form-item prop="amendMsg">
              <el-input type="textarea" v-model="form.amendMsg"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>Increase amount by</p>
            <p>增加金额</p>
          </td>
          <td colspan="3">
            <el-form-item prop="amendIncreaseAmount">
              <ynet-currency-input name="amendIncreaseAmount" ref="amendIncreaseAmount" v-model="form.amendIncreaseAmount" :showChinese="false"></ynet-currency-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>Decrease amount by</p>
            <p>减低金额</p>
          </td>
          <td colspan="3">
            <el-form-item prop="amendDecreaseAmount">
              <ynet-currency-input name="amendDecreaseAmount" ref="amendDecreaseAmount" v-model="form.amendDecreaseAmount" :showChinese="false"></ynet-currency-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>DC amount after amendment</p>
            <p>更改后的金额为</p>
          </td>
          <td colspan="3">
            <el-form-item prop="amendAfterAmount">
              <ynet-currency-input name="amendAfterAmount" ref="amendAfterAmount" v-model="form.amendAfterAmount" :showChinese="false"></ynet-currency-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>New shipment date</p>
            <p>新的发运日期</p>
          </td>
          <td colspan="3">
            <el-form-item prop="shipDate1">
              <el-date-picker type="date" placeholder="选择发运日期" :picker-options="pickerOptions" formate="yyyyMMdd" v-model="form.shipDate1" @change="selectDate"></el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>New expiry date</p>
            <p>新的到期日</p>
          </td>
          <td colspan="3">
            <el-form-item prop="expDt1">
              <el-date-picker type="date" placeholder="选择到期日" :picker-options="pickerOptions" formate="yyyyMMdd" v-model="form.expDt1" @change="selectExpDt"></el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>Others</p>
            <p>其他</p>
          </td>
          <td colspan="3">
            <el-form-item prop="otherMsg">
              <el-input type="textarea" v-model="form.otherMsg"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submitForm()">下一步</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'importCreditUpdateStep1',
  components: {
  },
  props:{
    preData:{ type: Object }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      loginStorage:this.$tools.storage.get("user","save"),
      form:{
        oprType:'2',   //信用证修改
        LCNO:'',
        oriFlowNo:'',  //主流水号
        authFlowNo:'',  //授权流水号
        appName:'',
        appAddr:'',
        advisingBank:'',
        beneficiary:'',
        beneficiaryAddr:'',
        AMTFigures:'',
        amendMsg:'',
        amendIncreaseAmount:'',
        amendDecreaseAmount:'',
        amendAfterAmount:'',
        shipDate:'',
        expDt:'',
        otherMsg:'',
        shipDate1:'',  //中间变量
        expDt1:''  //中间变量
      },
      cstNo:this.$tools.storage.get("user","save").cstNo,
      shipDate:'',
      expDt:'',
      rules:{
        amendMsg:[
          {trigger: 'blur', validator:this.isNeedValidator}
        ],
        amendAfterAmount:[
          {trigger: 'blur', validator:this.amendAfterAmountValidator},
          {trigger: 'blur', validator:this.isNeedValidator}
        ],
        shipDate1:[
          {trigger: 'blur', validator:this.isNeedValidator}
        ],
        expDt1:[
          {trigger: 'blur', validator:this.isNeedValidator}
        ],
        otherMsg:[
          {trigger: 'blur', validator:this.isNeedValidator}
        ]
      }
    }
  },
  mounted(){
    let _this = this
    _this.form = $.extend({},_this.form,_this.preData)
    _this.form.oriFlowNo = _this.preData.sequenceNo  //原流水号
  },
  methods:{
    submitForm(){
      let _this = this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          _this.$emit("changeStep",false,"1",_this.form,false)
        }else{
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm(){
      let _this=this
      _this.$refs['form'].resetFields()
    },
    selectDate(val){
      this.form.shipDate = this.$tools.utils.formatDate(val,{"removeFormat":true})
    },
    selectExpDt(val){
      this.form.expDt = this.$tools.utils.formatDate(val,{"removeFormat":true})
    },
    amendAfterAmountValidator(rule,value,callback){
      let _this = this
      if(Number(_this.form.AMTFigures)+Number(_this.form.amendIncreaseAmount)-Number(_this.form.amendDecreaseAmount)!=Number(value)){
        callback('原金额增减后与更改后金额不平等')
      }
      callback()
    },
    isNeedValidator(rule,value,callback){
      let _this = this
      if(_this.form.amendMsg==''&&_this.form.amendAfterAmount==''&&_this.form.shipDate==''&&_this.form.expDt==''&&_this.form.otherMsg==''){
        callback('无修改内容')
      }
      callback()
    }
  }
}
</script>