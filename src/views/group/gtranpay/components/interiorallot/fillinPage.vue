<template>
  <div class="form mt20">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light mb10"><b>收款信息</b></div></el-col>
      </el-row>

      <el-form-item label="转入子公司组别：" prop="transToGroup">
        <el-select v-model="form.transToGroup" placeholder="请选择">
          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
        </el-select>
      </el-form-item>

      <el-form-item label="转入子公司账号：" prop="transToAcctNum">
        <el-select v-model="form.transToAcctNum" placeholder="请选择">
          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
        </el-select>
        <span><i class="el-icon-search"></i><a href="javascript:;" @click="">查询余额</a></span>
      </el-form-item>

      <el-form-item label="转入子公司账户名：" prop="transToAcctName">
        <el-input v-model="form.transToAcctName"></el-input>
      </el-form-item>

      <el-form-item label="存入金额：" prop="amount">
        <currency-input :disabled="currencyDisabled" v-model="form.amount" @currency-blur="" placeholder="超过100000.00元" :showChinese="true"></currency-input>
        <span style="position:absolute;margin-left:2px;"><i></i><a href="javascript:;" @click="">手续费标准</a></span>
      </el-form-item>

       <el-form-item label="收款方手机号：" prop="">
        <el-input v-model="form.phoneNumber" placeholder=""></el-input>
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

      <el-form-item label="转出子公司组别：" prop="transFromGroup">
        <el-select v-model="form.transFromGroup" placeholder="请选择">
          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
        </el-select>
      </el-form-item>

      <el-form-item label="转出子公司账号：" prop="transFromAcctNum">
        <el-select v-model="form.transFromAcctNum" placeholder="请选择转出子公司账号">
          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
        </el-select>
        <span><i class="el-icon-search"></i><a href="javascript:;" @click="">查询余额</a></span>
      </el-form-item>

      <el-form-item label="转出子公司账户名：" prop="transFromAcctName">
        <el-input v-model="form.transFromAcctName"></el-input>
      </el-form-item>

      <el-form-item  class="tac formBtnArea">
        <el-button type="primary" @click="nextStep">下一步</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
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
        purposes: [
          {label: '转账', value: '1'},
          {label: '其他', value: '0'}
        ],
        rules: {
          transToGroup:[
            {required: true, message:'请选择转入子公司组别', trigger:'blur'}
          ],
          transToAcctNum:[
            {required: true, message:'请选择转入子公司账号', trigger:'blur'}
          ],
          transToAcctName:[
            {required: true, message:'请选择转入子公司账户名', trigger:'blur'}
          ],
          amount:[
            {required: true, message:'请填写存入金额', trigger:'blur'}
          ],
          transFromGroup:[
            {required: true, message:'请选择转出子公司组别', trigger:'blur'}
          ],
          transFromAcctNum:[
            {required: true, message:'请选择转出子公司账号', trigger:'blur'}
          ],
          transFromAcctName:[
            {required: true, message:'请选择转出子公司账户名', trigger:'blur'}
          ]
        },
        form: {
          currentItemIndex: 1,  //跳转到Step进度为 1的页面 
          transToGroup: "",
          transToAcctNum: "",
          transToAcctName: "",
          amount: "",
          phoneNumber: "",
          purpose: "",
          comments: "",
          remarks: "",
          transFromGroup: "",
          transFromAcctNum: "",
          transFromAcctName: ""
        },
        options:[{
          value: 'account账号2',
          label: '账号2'
        },{
          value: 'account账号3',
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