<template>
  <div class="fourForm tableForm mt20">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-form-item label="付款账号：" prop="transOutCardNo" class="fullLine">
          <el-select v-model="form.transOutCardNo" placeholder="请选择" @change="selectAccChange">
            <el-option v-for="item in options" :label="item.accNo + item.accName" :value="item.accNo"></el-option>      
          </el-select>
          <span class="cBlue">余额：{{form.GGG}}</span>    
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="存期：" prop="depTerm" class="fullLine">
          <el-select v-model="form.depTerm"  placeholder="请选择">
            <el-option v-for="item in timeOptions" :label="item.label" :value="item.value"></el-option>          
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="利率：" class="fullLine">
          <el-input v-model="form.interestRate" disabled></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转入金额：" prop="accNo" class="fullLine">
            <el-input v-model="form.PNPAmt"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="大写：" class="fullLine">
          {{$tools.utils.toChinese(form.PNPAmt)}}
        </el-form-item>
      </el-row>
       <el-row>
        <el-form-item label="保证金账号：" prop="CardNo" class="fullLine">
          <el-select v-model="form.CardNo" placeholder="请选择" @change="selectTermAccChange">
            <el-option v-for="item in termOptions" :label="item.accNo + item.accName" :value="item.accNo"></el-option>      
          </el-select>   
        </el-form-item>
      </el-row>    
      <el-row>
        <el-form-item label="付款凭证用途：" prop="transDesc" class="fullLine">
          <el-input v-model="form.transDesc"  placeholder="请输入用途"></el-input>
        </el-form-item>
     </el-row>
      <el-row>
        <el-form-item label="备注：" prop="transDesc" class="fullLine" >
          <el-input v-model="form.transDesc" placeholder="请输入备注信息"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="nextStep">下一步</el-button>
        <el-button  @click="resetForm('form')">重置</el-button>
    </div>
  </div>
</template>

<script>
  import currencyInput from '@src/components/currency-input'  //金额组件

  export default {
    name:'termfillinPage',
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
        rules: {
          CardNo:[
            {required: true, message:'请选择付款账号', trigger:'blur'}
          ],
          transOutCardNo:[
            {required: true, message:'请选择付款账号', trigger:'blur'}
          ],
          accNo:[
            {required:true, validator:this.validatorAccNo, trigger: 'blur'}
          ],
          depTerm:[
            {required: true, message:'请选择存期', trigger:'blur'}
          ],
          PNPAmt:[
            {required: true, validator:this.validatorPNP, trigger: 'blur'}
          ],
          autoTransDepIndex:[
            {required: true, message:'请选择约转方式'}
          ]
        },
        form: {
          transOutCardNo: '',
          transOutAccName: '',
          openNode: '',
          openName: '',
          accNo: '',
          accName: '',
          depTerm: '',
          depTermTp: '',
          PNPAmt: '',
          interestRate: '',
          autoTransDepIndex: '0',   //0本息转存定期  W本金转存定期
          transDesc: '',
          CRY: 'CNY',
          cstNo: '01',
          productTp: '01',
          accAttr: '2',
          bsnCode: 'CB030102',
          eCIFID: '00001'
        },
        options:[],       //活期账号列表
        termOptions:[],   //定期账号列表
        timeOptions:[
          {value: '3M',label: '三个月'},
          {value: '6M',label: '半年'},
          {value: '1Y',label: '一年'},
          {value: '2Y',label: '两年'},
          {value: '3Y',label: '三年'},
          {value: '5Y',label: '五年'}
        ],                               //存期列表
        currencyDisabled: false
      }
    },
    mounted(){
      let _this = this
      _this.form  = $.extend({},_this.form,_this.fillinMsg)   //从父组件传来的值可能是空或对象
      
      let body={}
      body.cstNo='01'
      _this.$tools.request(_this,"CB030101.do",body).then(
        data =>{
          let _options = data.body.acctList   //可操作的所有账号
          if(_options){
            for(let i=0;i<_options.length;i++){
              if(_options[i].type=='12'){
                _this.termOptions.push(_options[i])   //可操作的定期存款账号
              }else{
                _this.options.push(_options[i])     //可操作的活期账号
              }
            }
          }
        }
      )
    },
    methods: {
      validatorAccNo(rules,value,callback){
        let _this = this
        if(_this.termOptions.length==0){
          callback(new Error('请在付款账号网点开立定期账号'))
        }else if(_this.accNo===""){
          callback(new Error('请选择定期存款账号'))
        }else{
          callback()
        }
      },
      validatorPNP(rules,value,callback){
        let _this = this
        let currencyParse=_this.$tools.utils.currencyParse(value)
        if(currencyParse===""){
          callback(new Error('请输入存款金额'))
        }else if(currencyParse<10000){
          callback(new Error('起存金额1万元'))
        }else{
          callback()
        }
      },
      selectAccChange(val){
        let _this = this
        if(_this.options.length>0&&val){
          for(let i=0;i<_this.options.length;i++){
            if(_this.options[i].accNo==val){
              let transOutAccObject = _this.options[i]
              _this.form.transOutAccName = transOutAccObject.accName
              _this.form.openNode = transOutAccObject.openNode
              _this.form.openName = transOutAccObject.openName
            }
          }
        }
      },
      selectTermAccChange(val){
        let _this = this
        if(_this.termOptions.length>0&&val){
          for(let i=0;i<_this.termOptions.length;i++){
            if(_this.termOptions[i].accNo==val){
              _this.form.accName = _this.termOptions[i].accName
            }
          }
        }
      },
      nextStep(){
        let _this = this
        _this.currencyDisabled=!_this.currencyDisabled
        //若有文件，先提交上传文件 
        _this.$refs.form.validate((valid) =>{
          if(valid){
            //下一步，确认页面
            _this.$emit("goStepPage",[1,_this.form])
          }else{
            
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>