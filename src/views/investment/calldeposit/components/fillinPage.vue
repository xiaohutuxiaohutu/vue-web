<template>
  <div>
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
          <el-form-item label="通知存款账号：" ref="accNo" prop="accNo" class="fullLine">
            <el-select v-model="form.accNo" placeholder="请选择" no-data-text="请在付款账号网点开立通知账号" @change="selectCallAccChange" style="width:300px">
              <el-option v-for="item in callOptions" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>          
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="通知存款种类：" ref="accTp" prop="accTp" class="fullLine">
            <el-select v-model="form.accTp"  placeholder="请选择" @change="queryRate" style="width:300px">
              <el-option v-for="item in timeOptions" :label="item.label" :value="item.value"></el-option>          
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="利率：" class="fullLine">
            <el-input v-model="form.interestRate" style="width:300px" disabled></el-input>
            <span>本利率仅供参考，最终利率以银行结算利率为准</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="金额：" prop="PNPAmt" class="fullLine">
            <currency-input style="width:300px" ref="currency" :disabled="false" v-model="form.PNPAmt" placeholder="请输入金额" :showChinese="false"></currency-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="大写："class="fullLine">
            {{$tools.utils.toChinese(form.PNPAmt)}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="币种：" class="fullLine">人民币</el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注：" prop="transDesc" class="fullLine">
            <el-input v-model="form.transDesc" placeholder="备注" style="width:300px"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="dialogVisible = true">下一步</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <!--弹窗-->
    <el-dialog title="温馨提示" :visible.sync="dialogVisible"  size="tiny">
      <span>
        1.单位通知存款的最低起存金额人民币为50万元，存款人需一次性存入，可以一次或分次支取。<br/>
        2.通知存款种类人民币账户有一天通知和七天通知。<br/>
      </span>
      <span slot="footer" class="ghb-integration-dialog-footer">
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="nextStep">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </span>
    </el-dialog>
    <!--弹窗end-->
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
      fillinMsg:{type: Object},
      turnUpNums:{type:Number}
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
          accTp:[
            {required: true, message:'请选择通知存款类型', trigger:'change'}
          ],
          PNPAmt:[
            {required: true, validator:this.validatorPNP, trigger: 'blur'}
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
          callOpenNode:'',
          callOpenBank:'',
          PNPAmt: '',
          accTp: '',
          transDesc: '',
          interestRate: '',
          CRY: 'CNY',
          cstNo: this.$tools.storage.get("user","save").cstNo,
          accAttr: '15',
          bsnCode: 'CB030201',
          eCIFID: this.$tools.storage.get("user","save").eCIFID,
          hostNo: this.$tools.storage.get("user","save").hostNo,
          userName: this.$tools.storage.get("user","save").userName,
          availBalance: '',  //余额
          signedData:'',  //签名要素
          timeStamps:''
        },
        options:[],       //活期账号列表
        callOptions:[],      //通知账号列表
        timeOptions:[
          {value: '253',label: '单位一天通知存款'},
          {value: '254',label: '单位七天通知存款'},
          // {value: '241',label: '单位七天通知存款-自动续存'},
        ],                               //通知存款种类列表
        dialogVisible: false
      }
    },
    mounted(){
      let _this = this
      if(JSON.stringify(_this.maintainForm)!='{}'&&_this.turnUpNums==0){
        _this.form  = $.extend({},_this.form,{
          transOutCardNo:_this.maintainForm.callDetailList[0].payAcc,
          transOutAccName:_this.maintainForm.callDetailList[0].payAccName,
          openNode:_this.maintainForm.callDetailList[0].openNode,
          openName:_this.maintainForm.callDetailList[0].openName,
          accNo:_this.maintainForm.callDetailList[0].accNo,
          accName:_this.maintainForm.callDetailList[0].accName,
          callOpenNode:_this.maintainForm.callDetailList[0].callOpenNode,
          callOpenBank:_this.maintainForm.callDetailList[0].callOpenBank,
          PNPAmt:_this.maintainForm.callDetailList[0].transAmount,
          accTp:_this.maintainForm.callDetailList[0].accTp,
          oldSqno:_this.maintainForm.oldSqno,
          operateFlag:_this.maintainForm.operateFlag,
          transDesc:_this.maintainForm.callDetailList[0].transDesc
        })
      }else{
        _this.form  = $.extend({},_this.form,_this.fillinMsg)   //从父组件传来的值可能是空或对象
      }

      let _options = _this.loginStorage.operAccInfoList
      _this.options = _options.filter(_this.checkOptionsArray)
      _this.callOptions = _options.filter(_this.checkCallOptionsArray)
      // _this.callOptions = [{accNo:'8900001090001701',accName:'aew2w3',currType:'CNY'}]
    },
    methods: {
      checkOptionsArray(option){
        return option.right.substr(0,1)=='1' && option.coreType=='201' && option.cstNo==this.loginStorage.cstNo && option.auth=='2'
      },
      checkCallOptionsArray(option){
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
        if(_this.callOptions.length==0){
          callback(new Error('请在付款账号网点开立通知账号'))
        }else if(_this.form.accNo===""){
          callback(new Error('请选择通知存款账号'))
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
        }else if(Number(value)<500000){
          callback(new Error('起存金额50万元'))
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
        _this.changeSelect('transOutCardNo')
      },
      selectCallAccChange(val){
        let _this = this
        for(let index in _this.callOptions){
          let item = _this.callOptions[index]
          if(item.accNo==_this.form.accNo){
            _this.form.accName = item.accName
            _this.form.callOpenNode = item.openBankNo
            _this.form.callOpenBank = item.openBankName
          }
        }
        _this.changeSelect('accNo')
      },
      queryRate(){
        let _this = this
        if(_this.form.accNo==''){
          _this.$alert("请选择通知存款账号","温馨提示",{
            confirmButtonText:"确定",
          }).then(() =>{
            _this.form.accTp = ''
          })
          return
        }
        let isQuery = false
        let rateType = ''
        let depTermTp = ''
        let depTerm = ''
        if(_this.form.accTp!=''){
          if(_this.form.accTp=='253'){
            depTermTp = 'D'
            depTerm = '1'
            rateType = 'DT1'
          }else if(_this.form.accTp=='254'||_this.form.accTp=='241'){
            depTermTp = 'D'
            depTerm = '7'
            rateType = 'DT7'
          }
          _this.$tools.request(_this,"CB000001.do",{accNo:_this.form.accNo}).then(data =>{
            if(data.body.errorCode=='0'){
              for(let item of data.body.accNoList){
                if(_this.form.accTp==item.ACCT_TP){
                  _this.form.interestRate = item.INT_RATE
                  isQuery = true
                  break
                }
              }
            }
            if(!isQuery){
              let body = {}
              body.branchId = _this.form.callOpenNode
              body.rateType = rateType
              body.PNP = 0  //金额可以任意 但不能为空
              body.depTerm = depTerm
              body.depTermTp = depTermTp
              body.currencyType = 'CNY'
              _this.$tools.request(_this,"CB030112.do",body).then(data =>{
                _this.form.interestRate = data.body.interestRate
              })
            }
          })
        }
      },
      nextStep(){
        let _this = this
        _this.dialogVisible=false
        //若有文件，先提交上传文件 
        _this.$refs.form.validate((valid) =>{
          if(valid){
            //下一步，确认页面
            _this.$emit("goStepPage",[1,_this.form])
          }
        })
      },
      reset(){
        this.form.interestRate = ''
        this.$refs.form.resetFields()
      }
    }
  }
</script>