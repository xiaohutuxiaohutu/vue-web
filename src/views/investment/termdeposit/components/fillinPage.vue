<template>
  <div class="fourForm tableForm mt20">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-form-item label="付款账号：" ref="transOutCardNo" prop="transOutCardNo" class="fullLine">
          <el-select v-model="form.transOutCardNo" placeholder="请选择" @change="selectAccChange" style="width:300px">
            <el-option v-for="item in options" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>   
          </el-select>
          <span class="cOrange m15" v-if="(form.availBalance!=null)&&(form.availBalance!=undefined)&&(form.availBalance!='')">余额： {{$tools.utils.currencyFormat(form.availBalance)}}元</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="定期存款账号：" ref="accNo" prop="accNo" class="fullLine">
          <el-select v-model="form.accNo" placeholder="请选择" no-data-text="请在付款账号网点开立定期账号" @change="selectTermAccChange" style="width:300px">
            <el-option v-for="item in termOptions" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>          
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="存期：" ref="depTermLink" prop="depTermLink" class="fullLine">
          <el-select v-model="form.depTermLink"  placeholder="请选择" @change="queryRate" style="width:300px">
            <el-option v-for="item in timeOptions" :label="item.label" :value="item.value"></el-option>          
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="利率：" class="fullLine">
          <el-input v-model="form.interestRate" disabled style="width:300px"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="存入金额：" prop="PNPAmt" class="fullLine">
          <currency-input style="width:300px" ref="currency" :disabled="false" v-model="form.PNPAmt" placeholder="请输入金额" :showChinese="false"></currency-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="大写：" class="fullLine">
          {{$tools.utils.toChinese(form.PNPAmt)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="币种：" class="fullLine">人民币</el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="到期约转方式：" ref="autoTransDepIndex" prop="autoTransDepIndex" class="fullLine">
          <el-radio-group v-model="form.autoTransDepIndex" @change="changeSelect('autoTransDepIndex')"> 
            <el-radio label="O">本息转存定期</el-radio>
            <el-radio label="W">本金转存定期</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注：" prop="transDesc" class="fullLine">
          <el-input v-model="form.transDesc" placeholder="备注" style="width:300px"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="nextStep">下一步</el-button>
      <el-button  @click="resetForm">重置</el-button>
    </div>
  </div>
</template>

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
      },
      turnUpNums:{
        type: Number
      }
    },
    data() {
      return {
        maintainForm:this.$route.params,
        loginStorage:this.$tools.storage.get("user","save"),
        rules: {
          transOutCardNo:[
            {required: true, validator:this.validatorTransOutAccNo, trigger:'change'}
          ],
          accNo:[
            {required:true, validator:this.validatorAccNo, trigger: 'change'}
          ],
          depTermLink:[
            {required: true, message:'请选择存期', trigger:'change'}
          ],
          PNPAmt:[
            {required: true, validator:this.validatorPNP, trigger: 'blur'}
          ],
          autoTransDepIndex:[
            {required: true, message:'请选择约转方式', trigger:'blur'}
          ],
          transDesc:[
            {min:0, max:10, message:'请输入10个字以内', trigger:'blur'}
          ]
        },
        form: {
          transOutCardNo: '',
          transOutAccName: '',
          openNode: '',
          openName: '',
          accNo: '',
          accName: '',
          termOpenNode:'',
          termOpenBank:'',
          depTerm: '',
          depTermTp: '',
          PNPAmt: '',
          interestRate: '',
          autoTransDepIndex: 'O',   //O本息转存定期  W本金转存定期
          transDesc: '',
          CRY: 'CNY',
          cstNo: this.$tools.storage.get("user","save").cstNo,
          productTp: '251',
          accAttr: '15',
          bsnCode: 'CB030102',
          eCIFID: this.$tools.storage.get("user","save").eCIFID,
          hostNo: this.$tools.storage.get("user","save").hostNo,
          userName: this.$tools.storage.get("user","save").userName,
          availBalance: '',  //余额
          depTermLink:'',  //存期3M、6M……
          signedData:'',  //签名要素
          timeStamps:'',  //时间戳
        },
        options:[],       //活期账号列表
        termOptions:[],      //定期账号列表
        timeOptions:[
          {value: '3M',label: '三个月'},
          {value: '6M',label: '半年'},
          {value: '1Y',label: '一年'},
          {value: '2Y',label: '两年'},
          {value: '3Y',label: '三年'},
          {value: '5Y',label: '五年'}
        ],     //存期列表
      }
    },
    mounted(){
      let _this = this
      let _options = _this.loginStorage.operAccInfoList
      _this.options = _options.filter(_this.checkOptionsArray)
      _this.termOptions = _options.filter(_this.checkTermOptionsArray)
      if(JSON.stringify(_this.maintainForm)!='{}'&&_this.turnUpNums==0){
        _this.form  = $.extend({},_this.form,{
          transOutCardNo:_this.maintainForm.termDetailList[0].payAcc,
          transOutAccName:_this.maintainForm.termDetailList[0].payAccName,
          openNode:_this.maintainForm.termDetailList[0].openNode,
          openName:_this.maintainForm.termDetailList[0].openName,
          accNo:_this.maintainForm.termDetailList[0].accNo,
          accName:_this.maintainForm.termDetailList[0].accName,
          termOpenNode:_this.maintainForm.termDetailList[0].termOpenNode,
          termOpenBank:_this.maintainForm.termDetailList[0].termOpenBank,
          depTerm:_this.maintainForm.termDetailList[0].depTerm,
          depTermTp:_this.maintainForm.termDetailList[0].depTermTp,
          depTermLink:_this.maintainForm.termDetailList[0].depTerm+_this.maintainForm.termDetailList[0].depTermTp,
          PNPAmt:_this.maintainForm.termDetailList[0].transAmount,
          interestRate:_this.maintainForm.termDetailList[0].interestRate,
          autoTransDepIndex:_this.maintainForm.termDetailList[0].autoTransDepIndex,
          transDesc:_this.maintainForm.termDetailList[0].transDesc,
          oldSqno:_this.maintainForm.oldSqno,
          operateFlag:_this.maintainForm.operateFlag
        })
      }else{
        _this.form  = $.extend({},_this.form,_this.fillinMsg)   //从父组件传来的值可能是空或对象
      }
    },
    methods: {
      checkOptionsArray(option){  //isGroup(0表示非集团,1表示集团) groupFlag(0表示本公司，1表示子公司)
        return option.right.substr(0,1)=='1' && option.coreType=='201' && option.cstNo==this.loginStorage.cstNo && option.auth=='2'
      },
      checkTermOptionsArray(option){
        return option.coreType=='280' && option.cstNo==this.loginStorage.cstNo
      },
      changeSelect(val){
        this.$refs[val].validate('blur')
      },
      validatorTransOutAccNo(rules,value,callback){
        let _this = this
        if(_this.options.length==0){
          callback(new Error('无下挂活期账号'))
        }else if(_this.form.transOutCardNo===""){
          callback(new Error('请选择付款账号'))
        }else{
          callback()
        }
      },
      validatorAccNo(rules,value,callback){
        let _this = this
        if(_this.termOptions.length==0){
          callback(new Error('请在付款账号网点开立定期账号'))
        }else if(_this.form.accNo===""){
          callback(new Error('请选择定期存款账号'))
        }else{
          callback()
        }
      },
      validatorPNP(rules,value,callback){
        let _this = this
        if(Number(value)===""){
          callback(new Error('请输入存款金额'))
        }else if(Number(value)>Number(_this.form.availBalance)){
          callback(new Error('存入金额不得大于付款账号余额'))
        }else if(Number(value)<10000){
          callback(new Error('起存金额1万元'))
        }else{
          callback()
        }
      },
      selectAccChange(val){
        let _this = this
        let body={}
        body.cstNo=_this.loginStorage.hostNo
        body.eCIFID=_this.loginStorage.eCIFID
        body.chooseFlag='0'  //查询余额标识
        body.accNo = _this.form.transOutCardNo
        for(let index in _this.options){
          let item = _this.options[index]
          if(item.accNo==_this.form.transOutCardNo){
            _this.form.transOutAccName = item.accName
            _this.form.openNode = item.openBankNo
            _this.form.openName = item.openBankName
          }
        }
        _this.$tools.request(_this,"CB000001.do",body).then(
          data =>{
            if(data.body.errorCode=='0'){
              _this.form.availBalance = data.body.totalAvlBal
            }else{
              _this.$alert(data.body.errorMsg,"温馨提示")
            }
            
          }
        )
      },
      selectTermAccChange(val){
        let _this = this
        for(let index in _this.termOptions){
          let item = _this.termOptions[index]
          if(item.accNo==_this.form.accNo){
            _this.form.accName = item.accName
            _this.form.termOpenNode = item.openBankNo
            _this.form.termOpenBank = item.openBankName
          }
        }
      },
      queryRate(){
        let _this = this
        if(_this.form.accNo==''){
          _this.$alert("请选择定期存款账号","温馨提示",{
            confirmButtonText:"确定",
          }).then(() =>{
            _this.form.depTermLink = ''
          })
          return
        }
        let isQuery = false
        _this.$tools.request(_this,"CB000001.do",{accNo:_this.form.accNo}).then(data =>{
          if(data.body.errorCode=='0'){
            for(let item of data.body.accNoList){
              if(item.ACCT_TP=='251'){
                let depTerm = item.DEP_TERM.substring(0,1)
                let depTermTp = item.DEP_TERM.substring(2)
                if(depTerm+depTermTp==_this.form.depTermLink){
                  _this.form.interestRate = item.INT_RATE
                  isQuery = true
                  break
                }
              }
            }
          }
          if(!isQuery){
            if(_this.form.depTermLink!=''){
              _this.form.depTermTp = _this.form.depTermLink.substring(1,2)
              _this.form.depTerm = _this.form.depTermLink.substring(0,1)
              let body = {}
              body.branchId = _this.form.termOpenNode
              body.rateType = 'DGD'
              body.PNP = 0   //金额可以任意 但不能为空
              body.depTerm = _this.form.depTerm
              body.depTermTp = _this.form.depTermTp
              body.currencyType = 'CNY'
              body.cstNo = _this.loginStorage.hostNo
              _this.$tools.request(_this,"CB030112.do",body).then(data =>{
                _this.form.interestRate = data.body.interestRate
              })
            }
          }
        })
      },
      nextStep(){
        let _this = this
        //若有文件，先提交上传文件 
        _this.$refs.form.validate((valid) =>{
          if(valid){
            //下一步，确认页面
            _this.$emit("goStepPage",[1,_this.form])
          }else{
            
          }
        })
      },
      resetForm() {
        this.form.availBalance = ''
        this.form.interestRate = ''
        this.$refs['form'].resetFields();
      }
    }
  }
</script>