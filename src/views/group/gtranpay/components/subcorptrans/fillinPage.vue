<template>
  <div class="form mt20">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light mb10"><b>收款信息</b></div></el-col>
      </el-row>

      <el-form-item label="收款人账户：" prop="recipientAcctNum">
        <el-select v-model="form.recipientAcctNum" placeholder="请选择">
          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
        </el-select>
        <span><i class="el-icon-search"></i><a href="javascript:;" @click="">常用收款人</a></span>
      </el-form-item>

      <el-form-item label="收款人账户名：" prop="recipientAcctName">
        <el-input v-model="form.recipientAcctName"></el-input>
      </el-form-item>

      <el-form-item label="转账金额：" prop="amount">
        <currency-input :disabled="currencyDisabled" v-model="form.amount" @currency-blur="" placeholder="" :showChinese="true"></currency-input>
        <span style="position:absolute;margin-left:2px;"><i></i><a href="javascript:;" @click="">手续费标准</a></span>
      </el-form-item>

      <el-form-item label="转账方式：" prop="transMode">
        <el-radio-group v-model="form.transMode">
          <el-radio label="次日到帐"></el-radio>
        </el-radio-group>
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

      <el-form-item style="padding-left:40%">
        <el-checkbox label="预约处理" v-model="form.isReserveHandle"></el-checkbox>
        <el-checkbox label="保存收款人" v-model="form.isSaveRecipient"></el-checkbox>
      </el-form-item>

      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light mb10"><b>付款信息</b></div></el-col>
      </el-row>

      <el-form-item label="付款子公司账户组别：" prop="draweeGroup">
        <el-select v-model="form.draweeGroup" placeholder="请选择">
          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>          
        </el-select>
      </el-form-item>

      <el-form-item label="付款子公司账户：" prop="draweeAcctNum">
        <el-select v-model="form.draweeAcctNum" placeholder="请选择转出子公司账号">
          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <span><i class="el-icon-search"></i><a href="javascript:;" @click="">查询余额</a></span>
      </el-form-item>

      <el-form-item label="付款子公司账户名：" prop="draweeAcctName">
        <el-input v-model="form.draweeAcctName"></el-input>
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
          recipientAcctNum:[
            {required: true, message:'请选择收款人账号', trigger:'blur'}
          ],
          recipientAcctName:[
            {required: true, message:'请填写收款人账户名', trigger:'blur'}
          ],
          amount:[
            {required: true, message:'请填写转账金额', trigger:'blur'}
          ],
          draweeGroup:[
            {required: true, message:'请选择组别', trigger:'blur'}
          ],
          draweeAcctNum:[
            {required: true, message:'请选择子公司账号', trigger:'blur'}
          ],
          draweeAcctName:[
            {required: true, message:'请填写子公司账户名', trigger:'blur'}
          ]
        },
        form: {
          currentItemIndex: 1,  //跳转到Step进度为 1的页面 
          recipientAcctNum: "",
          recipientAcctName: "",
          amount: "",
          transMode:"",
          phoneNumber: "",
          purpose: "",
          comments: "",
          remarks: "",
          isReserveHandle: "",
          isSaveRecipient: "",
          draweeGroup: "",
          draweeAcctNum: "",
          draweeAcctName: ""
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