<template>
  <div class="templateStep1 ">
    <!--4格布局table-->
    <div class="fourForm tableForm mt20">
      <h3>付款信息</h3>
      <el-form ref="payerForm" :model="form" :rules="rules">
        <el-row>
          <el-form-item label="转出母公司账号：" prop="parentAcct" class="fullLine">
            <el-select v-model="form.parentAcct" placeholder="请选择转出子公司账号" :change="checkBalance(form.parentAcct)">
              <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
            </el-select>
            <span v-if="form.parentAcctBal"><a href="javascript:;">余额：{{form.parentAcctBal}}</a></span>
            <!--<span><i class="el-icon-search"></i><a href="javascript:;" @click="">查询余额</a></span>-->
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="转出母公司账户名：" prop="parentAcctName" class="fullLine">
            <el-input v-model="form.parentAcctName"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!--4格布局table--end-->
    <!--2格布局table-->
    <div class="fourForm tableForm mt20">
      <h3>收款信息</h3>
      <el-form ref="payeeForm" :model="form" :rules="rules">
        <el-row>
          <el-form-item label="转入子公司组别：" prop="subGroup"  class="fullLine">
            <el-select v-model="form.subGroup" placeholder="请选择">
              <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="转入子公司账号：" prop="subAcct" class="fullLine">
            <el-select v-model="form.subAcct" placeholder="请选择">
              <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
            </el-select>
            <span><i class="el-icon-search"></i><a href="javascript:;" @click="">查询余额</a></span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="转入子公司账户名：" prop="subAcctName" class="fullLine">
            <el-input v-model="form.subAcctName"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="转账金额：" prop="amount" class="fullLine">
            <currency-input :disabled="currencyDisabled" v-model="form.amount" @currency-blur="" placeholder="" :showChinese="true"></currency-input>
            <span style="position:absolute;margin-left:2px;"><i></i><a href="javascript:;" @click="">手续费标准</a></span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="收款方手机号：" prop="" class="fullLine">
            <el-input v-model="form.phoneNumber" placeholder="" icon="edit"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="用途：" prop="" class="fullLine">
            <el-select v-model="form.purpose">
              <el-option v-for="item in purposes" :label="item.label" :value="item.value"></el-option>          
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="附言：" class="fullLine">
            <el-input v-model="form.comments"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注：" class="fullLine">
            <el-input v-model="form.remarks"></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="nextStep">下一步</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </div>
      
    </div>
    <!--2格布局table--end-->
  </div>
  <!--<div class="form mt20">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light mb10"><b>收款信息</b></div></el-col>
      </el-row>

      <el-form-item label="转入子公司组别：" prop="subGroup">
        <el-select v-model="form.subGroup" placeholder="请选择">
          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
        </el-select>
      </el-form-item>

      <el-form-item label="转入子公司账号：" prop="subAcct">
        <el-select v-model="form.subAcct" placeholder="请选择">
          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
        </el-select>
        <span><i class="el-icon-search"></i><a href="javascript:;" @click="">查询余额</a></span>
      </el-form-item>

      <el-form-item label="转入子公司账户名：" prop="subAcctName">
        <el-input v-model="form.subAcctName"></el-input>
      </el-form-item>

      <el-form-item label="转账金额：" prop="amount">
        <currency-input :disabled="currencyDisabled" v-model="form.amount" @currency-blur="" placeholder="" :showChinese="true"></currency-input>
        <span style="position:absolute;margin-left:2px;"><i></i><a href="javascript:;" @click="">手续费标准</a></span>
      </el-form-item>

       <el-form-item label="收款方手机号：" prop="">
        <el-input v-model="form.phoneNumber" placeholder="" maxlength="11" icon="edit"></el-input>
      </el-form-item>

      <el-form-item label="用途：" prop="">
        <el-select v-model="form.purpose">
          <el-option v-for="item in purposes" :label="item.label" :value="item.value"></el-option>          
        </el-select>
      </el-form-item>

      <el-form-item label="附言：">
        <el-input v-model="form.comments"></el-input>
      </el-form-item>

      <el-form-item label="备注：">
        <el-input v-model="form.remarks"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light mb10"><b>付款信息</b></div></el-col>
      </el-row>

      <el-form-item label="转出母公司账号：" prop="parentAcct">
        <el-select v-model="form.parentAcct" placeholder="请选择转出子公司账号">
          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
        </el-select>
        <span><i class="el-icon-search"></i><a href="javascript:;" @click="">查询余额</a></span>
      </el-form-item>

      <el-form-item label="转出母公司账户名：" prop="parentAcctName">
        <el-input v-model="form.parentAcctName"></el-input>
      </el-form-item>

      <el-form-item  class="tac formBtnArea">
        <el-button type="primary" @click="nextStep">下一步</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>-->
</template>

<style scoped>
  .grid-content {
    min-height: 36px;
    line-height: 36px;
    padding-left: 10px;
    /*border: solid 1px #eef1f6;*/
  }
  .grid-content b{
    font-size: 14px;
  }
  .bg-purple-light {
    background: #aca2a0;
    color: white;
  }
</style>

<script>
  import currencyInput from '@src/components/currency-input'  //金额组件

  export default {
    name:'fillinPage',
    components:{
      currencyInput
    },
    props: {
      fillinMsg:{
        type: Object
      }
    },
    data() {
      return {
        payerFormValidate: false,
        purposes: [
          {label: '转账', value: '1'},
          {label: '其他', value: '0'}
        ],
        rules: {
          parentAcct:[
            {required: true, message:'请选择母公司账号', trigger:'blur'}
          ],
          parentAcctName:[
            {required: true, message:'请填写母公司账号名', trigger:'blur'}
          ],
          amount:[
            {required: true, message:'请填写转账金额', trigger:'blur'}
          ],
          subGroup:[
            {required: true, message:'请选择组别', trigger:'blur'}
          ],
          subAcct:[
            {required: true, message:'请选择子公司账号', trigger:'blur'}
          ],
          subAcctName:[
            {required: true, message:'请填写子公司账户名', trigger:'blur'}
          ]
        },
        form: {
          currentItemIndex: 1,  //跳转到Step进度为 1的页面 
          parentAcct: "",
          parentAcctName: "",
          parentAcctBal: "",
          amount: "",
          phoneNumber: "",
          purpose: "",
          comments: "",
          remarks: "",
          subGroup: "",
          subAcct: "",
          subAcctName: ""
        },
        options:[{
          value: '80010101010000031',
          label: '账号2'
        },{
          value: '80010101010000054',
          label: '账号3'
        }],
        currencyDisabled: false
      }
    },
    mounted(){
      let _this = this
      _this.form  = $.extend({}, _this.form, _this.fillinMsg)   //从父组件传来的值可能是空或对象
    },
    methods: {
      checkBalance(account){
        console.log(account);
        var _this = this
        if(account != undefined && account != ""){
          _this.$tools.request(_this,"CB010101Action.do",{"acctNo":account,"versionNo":"0.1"}).then(
            data => {
              console.log(data);
              if(data.body.errorCode == "0"){
                _this.parentAcctBal = data.body.balance
              }
            }
          )
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        debugger
        this.$refs[formName].resetFields();
      },
      nextStep() {
        let _this = this
        // _this.currencyDisabled=!_this.currencyDisabled
        //若有文件，先提交上传文件
        _this.$refs.form.validate((valid) =>{
          if(valid){
            //下一步，确认页面
            _this.$emit("goStepPage",[1,_this.form])
          }else{

          }
        })
      }
    }
  }
</script>