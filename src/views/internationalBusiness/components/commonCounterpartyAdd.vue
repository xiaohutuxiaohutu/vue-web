<template>
<div class="commonCounterpartyAdd" v-if="!dialogVisible&&!dialogVisible2&&!dialogVisible3">
    <!--table布局-->
    <el-form ref="popForm" :model="popForm" :rules="popRules" class="formEmbedTable">
      <table>
        <caption>录入收款人信息</caption>
        <tr>
          <td style="width:260px;"><span class="cRed">*</span>汇款类型：</td>
          <td>
            <el-form-item  prop="remitType">
              <el-radio-group v-model="popForm.remitType" @change="remitTypeRadioChange">
                <el-radio label="0">行内汇款</el-radio>
                <el-radio label="1">行外汇款</el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款人账号：</td>
          <td>
            <el-form-item  prop="acctNo">
              <el-input v-model="popForm.acctNo" placeholder="收款人账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款人常驻国家：</td>
          <td>
            <el-form-item prop="country">
              <el-input v-model="popForm.country" placeholder="收款人常驻国家"></el-input>
              <a class="cOrange" @click="dialogVisible = true">选择常驻国</a>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款人名称：</td>
          <td>
            <el-form-item  prop="acctNm">
              <el-input placeholder="收款人名称" v-model="popForm.acctNm"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款人地址：</td>
          <td>
            <el-form-item  prop="payeeAddress" class="w400">
              <el-input placeholder="收款人地址" v-model="popForm.payeeAddress"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr v-if="popForm.remitType=='1'">
          <td><span class="cRed">*</span>收款人开户银行Swift Code：</td>
          <td>
            <el-form-item  prop="swiftCode2" class="w400">
              <el-input placeholder="收款人开户银行Swift Code" :disabled="popForm.remitType=='0'" v-model="popForm.swiftCode2"></el-input>
              <el-button type="text" class="cOrange" :disabled="popForm.remitType=='0'" @click="isAgncBank = false;dialogVisible2 = true">选择开户银行</el-button>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款人开户银行名称：</td>
          <td>
            <el-form-item  prop="depositOfBankName" class="w400">
              <el-input placeholder="收款人开户银行名称" :disabled="popForm.remitType=='0'" v-model="popForm.depositOfBankName"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款人开户银行地址：</td>
          <td>
            <el-form-item  prop="depositOfBankAddress" class="w400">
              <el-input placeholder="收款人开户银行地址" v-model="popForm.depositOfBankAddress"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr v-if="popForm.remitType=='1'">
          <td>收款人开户银行在其代理行账号：</td>
          <td>
            <el-form-item  prop="depositOfAgncBankAccoun" class="w400">
              <el-input placeholder="收款人开户银行在其代理行账号" v-model="popForm.depositOfAgncBankAccoun"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr v-if="popForm.remitType=='1'">
          <td>收款银行之代理行Swift Code：</td>
          <td>
            <el-form-item  prop="swiftCode1" class="w400">
              <el-input placeholder="收款银行之代理行Swift Code" v-model="popForm.swiftCode1"></el-input>
              <el-button type="text" class="cOrange" @click="isAgncBank = true;dialogVisible2 = true">选择代理银行</el-button>
            </el-form-item>
          </td>
        </tr>
        <tr v-if="popForm.remitType=='1'">
          <td>收款银行之代理行名称：</td>
          <td>
            <el-form-item  prop="agncBankName" class="w400">
              <el-input placeholder="收款银行之代理行名称" v-model="popForm.agncBankName"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr v-if="popForm.remitType=='1'">
          <td>收款银行之代理行地址：</td>
          <td>
            <el-form-item  prop="agncBankAddress" class="w400">
              <el-input placeholder="收款银行之代理行地址" v-model="popForm.agncBankAddress"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!--table布局--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submitPopForm">提交</el-button>
      <el-button @click="backPopForm">返回</el-button>
      <el-button @click="resetPopForm">重置</el-button>
    </div>
</div>
<!-- 选择常驻国 -->
<div v-else-if="dialogVisible">
    <SelectCountry @selectCountry1="selectCountry1"></SelectCountry>
</div>
<!-- 选择常驻国end -->
<!-- 选择开户银行 -->
<div v-else-if="dialogVisible2">
    <selectSwift @selectSwift="selectSwift"></selectSwift>
</div>
<!-- 选择开户银行end -->
</template>

<script>
import SelectCountry from '../components/selectCountry' //国家选择组件
import selectSwift from '../components/selectSwift' //开户银行选择组件
export default {
  name:'commonCounterpartyAdd',
  components: {
    SelectCountry,
    selectSwift
  },
  props:{
    formData:{type:Object,default:{}},
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      isAgncBank: "",  //false是选择开户银行， true是选择代理银行
      popForm:{
        remitType:"0",
        acctNo:'',
        newAcctNo:'',  //更新新收款人账号
        country:"",
        acctNm:"",
        payeeAddress:"",
        swiftCode2:"",
        depositOfBankName:"LCHBHKHHXXX",
        depositOfBankAddress:"",
        depositOfAgncBankAccoun:"",
        swiftCode1:"",
        agncBankName:"",
        agncBankAddress:"",
        proNo:"",
        cstNo:"",
        bsnCode:"CB05060101"
      },
      popRules:{
        acctNo: [
          {required: true,trigger: 'blur',message:'请输入'},
          { trigger: 'change', validator: this.$tools.validator.isAccNo }
        ],
        country: [
          {required: true,trigger: 'blur',message:'请输入'}
        ],
        acctNm: [
          {required: true,trigger: 'blur',message:'请输入'}
        ],
        payeeAddress: [
          {required: true,trigger: 'blur',message:'请输入'}
        ],
        depositOfBankName: [
          {required: true,trigger: 'blur',message:'请输入'}
        ],
        depositOfBankAddress: [
          {required: true,trigger: 'blur',message:'请输入'}
        ],
        depositOfAgncBankAccoun: [
          { trigger: 'change', validator: this.$tools.validator.isAccNo }
        ]
      }
    }
  },
  methods: {
    remitTypeRadioChange(val){
      let _this = this
      if(val=='0'){
        _this.popForm.depositOfBankName = "LCHBHKHHXXX"
      }else{
        _this.popForm.depositOfBankName = ""
      }
    },
    backPopForm(){
      let _this=this
      _this.$emit("changePage","0")
    },
    submitPopForm(){
      let _this=this
      _this.$refs['popForm'].validate((valid) => {
        if (valid) {
          let body = {}
          if(JSON.stringify(_this.formData)!='{}'){
            console.log('1')
            body.acctNo = _this.formData.acctNo  //旧收款人账号
          }else{
            body.acctNo = _this.popForm.acctNo  //新收款人账号
          }
          _this.$tools.request(_this,"CB05060105.do",body).then(
            data => {
              if(data.body.count!=null && data.body.count!=undefined && data.body.count!=""){
                if(Number(data.body.count)>=1){
                  _this.$confirm('是否覆盖该常用收款人信息？','温馨提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    _this.popForm.newAcctNo = _this.popForm.acctNo  //新收款人账号
                    _this.popForm.acctNo = _this.formData.acctNo  //旧收款人账号
                    _this.sendPopData()
                  }).catch(() => {
                  })
                }else{
                  _this.sendPopData()
                }
              }
            })
        }else {
          console.log('error submit!!')
          return false
        }
      })
    },
    sendPopData(){
      let _this = this
      _this.$tools.request(_this,"CB05060101.do",_this.popForm).then(
          data =>{
            if(data.body.errorCode==0){
              _this.$alert("添加成功","提醒",{
                confirmButtonText: '确定',
                callback: action => {
                  _this.$emit("changePage","0")
                }
              })
            }else{
              _this.$alert("添加失败！","提醒",{
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            }
          }
      )
    },
    resetPopForm(){
      let _this=this
      _this.$refs['popForm'].resetFields()
    },
    selectCountry1(val){
        let _this = this
        if (val != null && val != undefined && JSON.stringify(val)!='{}') {
          _this.popForm.country = val.countryName
        }
        _this.dialogVisible = false
    },
    selectSwift(val){
      let _this = this
      if (val != null && val != undefined && JSON.stringify(val)!='{}') {
        if(!_this.isAgncBank){
          _this.popForm.swiftCode2 = val.swiftNo
          _this.popForm.depositOfBankName = val.bankName
          _this.popForm.depositOfBankAddress = val.addre1+', '+val.addre2
        }else{
          _this.popForm.swiftCode1 = val.swiftNo
          _this.popForm.agncBankName = val.bankName
          _this.popForm.agncBankAddress = val.addre1+', '+val.addre2
        }
      }
      _this.dialogVisible2 = false
    }
  },
  mounted(){
    let _this=this
    _this.popForm = $.extend({},_this.popForm,_this.formData)
    _this.popForm.payeeAddress = _this.formData.address
  }
}
</script>