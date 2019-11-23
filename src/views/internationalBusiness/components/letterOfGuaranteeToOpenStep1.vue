<template>
<div class="letterOfGuaranteeToOpenStep">
      <!--table布局-->
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20" enctype="multipart/form-data">
        <table>
          <caption>保函开立</caption>
          <tr>
            <td><span class="cRed">*</span>保函种类：</td>
            <td>
              <el-form-item  prop="gntType">
                <el-select placeholder="请选择" clearable v-model="form.gntType">
                  <el-option v-for="item in gntTypeOptions" :label="item.label" :value="item.value"></el-option>    
                </el-select>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>开立方式：</td>
            <td>
              <el-form-item  prop="ESTBD">
                <el-select placeholder="请选择" v-model="form.ESTBD">
                  <el-option v-for="item in ESTBDOptions" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>保函币种：</td>
            <td>
              <el-form-item  prop="CRY">
                <el-select placeholder="请选择" clearable v-model="form.CRY">
                  <el-option v-for="item in CRYOptions" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>保函金额：</td>
            <td>
              <el-form-item  prop="gntAmt">
                <ynet-currency-input v-model="form.gntAmt" name="amount" placeholder="保函金额" :showChinese="false"></ynet-currency-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>保函生效日：</td>
            <td>
              <el-form-item  prop="valueDateObj">
                <el-date-picker v-model="form.valueDateObj" :picker-options="pickerOptions0" @change="form.valueDate = $tools.utils.formatDate(form.valueDateObj,{'symbol':'YYYY-MM-DD'})" type="date" placeholder="保函生效时间"></el-date-picker>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>保函到期日：</td>
            <td>
              <el-form-item  prop="dueDateObj">
                <el-date-picker v-model="form.dueDateObj" :picker-options="pickerOptions1" @change="form.dueDate=$tools.utils.formatDate(form.dueDateObj,{'symbol':'YYYY-MM-DD'})" type="date" placeholder="保函到期日期"></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>申请人客户号：</td>
            <td>{{form.cstNo}}</td>
            <td>申请人客户名称：</td>
            <td>{{form.cstName}}</td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>申请人地址：</td>
            <td colspan="3">
              <el-form-item  prop="appAddr">
                <el-input v-model="form.appAddr" placeholder="申请人地址"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>被担保人姓名：</td>
            <td>
              <el-form-item  prop="wrntName">
                <el-input v-model="form.wrntName" placeholder="被担保人姓名"></el-input>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>被担保人地址：</td>
            <td>
              <el-form-item  prop="wrntAddr">
                <el-input v-model="form.wrntAddr" placeholder="被担保人地址"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>受益人姓名：</td>
            <td>
              <el-form-item  prop="befName">
                <el-input v-model="form.befName" placeholder="受益人姓名"></el-input>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>受益人地址：</td>
            <td>
              <el-form-item  prop="befAddr">
                <el-input v-model="form.befAddr" placeholder="受益人地址"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>合同编号：</td>
            <td>
              <el-form-item  prop="contraNo">
                <el-input v-model="form.contraNo" placeholder="合同编号"></el-input>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>合同币种：</td>
            <td>
              <el-form-item  prop="contraCRY">
                <el-select placeholder="请选择" clearable v-model="form.contraCRY">
                  <el-option v-for="item in CRYOptions" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>合同金额：</td>
            <td>
              <el-form-item  prop="contraAmt">
                <ynet-currency-input v-model="form.contraAmt" name="amount" placeholder="合同金额" :showChinese="false"></ynet-currency-input>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>保函模板：</td>
            <td>
              <el-form-item  prop="gntTemplate">
                <el-select placeholder="请选择"  v-model="form.gntTemplate" @change="gntTemplateChange">
                  <el-option v-for="item in gntTemplateOptions" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr v-if="form.templateIndex=='1' && isShowFileTable">
            <td><span class="cRed">*</span>请上传模板文件：</td>
            <td class="tableEvenText">
              <span>{{form.newFileName}}</span>
              <a class="cBlue"  v-if="form.newFileName!=''" @click="delAmountRange">删除</a>
            </td>
          </tr>
          <tr v-if="form.templateIndex=='1' && !isShowFileTable">
            <td><span class="cRed">*</span>请上传模板文件：</td>
            <td colspan="3"><span>支持zip压缩包格式,压缩包不要超过5M</span><br/>
              <el-form-item prop="fileName">
                <ynet-upload 
                  name="filePath"
                  configName="uploadConfig"
                  action="/api/CB000019.do?versionNo=1.0"
                  ref="upload"
                  v-model="form.fileName"
                  :vm="this"
                  @uploadSuccess="uploadSuccess"
                  @input="uploadInput" 
                  :isShowBtnUoload="uploadConfig.isShowBtnUoload"
                  class="inline-block">
                  </ynet-upload>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>
              <el-form-item  prop="comments">
                <el-input v-model="form.comments" placeholder="备注"></el-input>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>扣费账号：</td>
            <td>
              <el-form-item  prop="wthdAccNo">
                <el-select placeholder="请选择" clearable v-model="form.wthdAccNo">
                  <el-option value="" label="-----请选择-----"></el-option>
                  <el-option v-for="item in options" :label="item.accNo +' ['+ $tools.dict.CRYTrans(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
        </table>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="submitForm()">下一步</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </div>
      </el-form>
      <!--table布局-->
</div>
</template>

<script>
export default {
  name:'letterOfGuaranteeToOpenStep',
  components: {
  },
  props: {
    formData: { type: Object },
    isShowFileTable: {type:Boolean, default:false}
  },
  data() {
    return {
      form: {
        gntType:'',
        ESTBD:'0',
        CRY:'',
        gntAmt:'',
        valueDate:'',
        valueDateObj:'',
        dueDate:'',
        dueDateObj:'',
        appAddr:'',
        wrntName:'',
        wrntAddr:'',
        befName:'',
        befAddr:'',
        contraNo:'',
        contraCRY:'',
        contraAmt:'',
        gntTemplate:'0',
        filePath:'',
        fileName:'',
        newFileName:'',
        serviceFilePath:'',
        comments:'',
        wthdAccNo:'',
        status:'',
        createDate:'',
        channel:'',
        rsgBank:'',
        callBank:'',
        bsnCode:'',
        sequenceNo:'',
        templateIndex:'0',
        oprName:this.$tools.storage.get("user","save").alias,
        cstName:this.$tools.storage.get("user","save").cstCN,
        cstNo:this.$tools.storage.get("user","save").cstNo,
        eCIFID:this.$tools.storage.get("user","save").eCIFID,
        signedData:'',  //签名要素
        timeStamps:''
      },
      pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
      },
      pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
      },
      uploadConfig:{
        isUploading:false,
        isClickUpload:false,
        isShowBtnUoload:true,
        isSuccess:false,
        fileSize:5
      },
      rules: {
        gntType: [
          { required: true, message: '请选择保函种类', trigger: 'change' }
        ],
        ESTBD: [
          { required: true, message: '请选择开立方式', trigger: 'change' }
        ],
        CRY: [
          { required: true, message: '请选择保函币种', trigger: 'change' }
        ],
        gntAmt: [
          { required: true, message: '请输入保函金额', trigger: 'blur' },
          { trigger: 'blur', validator:this.$tools.validator.isTranAmount }
        ],
        valueDateObj: [
          {trigger: 'change', validator:this.dateCompare,compareList:['valueDateObj','dueDateObj'],vm:this,formName:'form'},
          { type: 'date', required: true, message: '请选择保函生效日期', trigger: 'change' }
          //{validator:this.dateValidator,vm:this,formName:'form'}
        ],
        dueDateObj: [
          {trigger: 'change', validator:this.dateCompare,compareList:['valueDateObj','dueDateObj'],vm:this,formName:'form'},
          { type: 'date', required: true, message: '请选择保函到期日期', trigger: 'change' }
          //{validator:this.dateValidator,vm:this,formName:'form'}
        ],
        appAddr: [
          { required: true, message: '请输入申请人地址', trigger: 'blur' }
        ],
        wrntName: [
          { required: true, message: '请输入被担保人名称', trigger: 'blur' }
        ],
        wrntAddr: [
          { required: true, message: '请输入被担保人地址', trigger: 'blur' }
        ],
        befName: [
          { required: true, message: '请输入受益人名称', trigger: 'blur' }
        ],
        befAddr: [
          { required: true, message: '请输入受益人地址', trigger: 'blur' }
        ],
        contraNo: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          //{trigger: 'blur', validator:this.isInteger,vm:this,formName:'form'}
        ],
        contraCRY: [
          { required: true, message: '请选择合同币种', trigger: 'change' }
        ],
        contraAmt: [
          { required: true, message: '请输入合同金额', trigger: 'blur' },
          { trigger: 'blur', validator:this.$tools.validator.isTranAmount }
        ],
        gntTemplate: [
          { required: true, message: '请选择保函模板', trigger: 'change' }
        ],
        wthdAccNo: [
          { required: true, message: '请选择扣款账号', trigger: 'change' }
        ],
        fileName: [
            { trigger: 'change', validator: this.$tools.validator.fileValidator, fileType: ['zip'], configName: 'uploadConfig', vm: this, requested: false }
        ],
      },
      gntTypeOptions:[
        {value: '',label: '-----请选择-----'},
        {value: '01',label: '投标'},
        {value: '02',label: '履约'},
        {value: '03',label: '质量'},
        {value: '04',label: '预留金(滞留金)'},
        {value: '05',label: '备付金'},
        {value: '06',label: '租赁'},
        {value: '07',label: '即期付款'},
        {value: '08',label: '延期付款'},
        {value: '09',label: '诉讼'},
        {value: '10',label: '融资'},
        {value: '11',label: '转开'},
        {value: '12',label: '关税保付'},
        {value: '13',label: '借款'},
        {value: '14',label: '其他非融资性保函'},
        {value: '15',label: '其他融资性保函'},
        {value: '16',label: '预付款保函'},
        {value: '17',label: '其他'}
      ],
      ESTBDOptions:[
        {value: '',label: '-----请选择-----'},
        {value:'0',label:'电开'},
        {value:'1',label:'信开'}
      ],
      CRYOptions:[
        {value: '',label: '-----请选择-----'},
        {value: 'CNY',label: 'CNY人民币'},
        {value: 'HKD',label: 'HKD港元'},
        {value: 'USD',label: 'USD美元'},
        {value: 'EUR',label: 'EUR欧元'},
        {value: 'GBP',label: 'GBP英镑'},
        {value: 'JPY',label: 'JPY日元'},
        {value: 'SGD',label: 'SGD新加坡币'}
      ],
      options:[],
      gntTemplateOptions:[
        {value:'0',label:'银行提供'},
        {value:'1',label:'申请人提供'}
      ],
    }
  },
  
  methods: {
    submitForm() {
      let _this=this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          _this.form.valueDate=_this.form.valueDate.split("-").join("")
          _this.form.dueDate=_this.form.dueDate.split("-").join("")
          _this.$emit("changeStep","1",_this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm() {
      let _this=this
      _this.$refs['form'].resetFields()
    },
    gntTemplateChange(val) {
      let _this = this
      if(val=='1') {
        _this.form.templateIndex = 1
      }else {
        _this.form.templateIndex = 0
      }
    },
    delAmountRange(){
      let _this = this
      _this.$confirm("确定删除已上传的文件，重新上传文件？","温馨提示",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:'warning'
      }).then(() =>{
        _this.form.newFileName = ''
        _this.form.serviceFilePath = ''
        _this.$emit("showFileTable",false)
      }).catch(() =>{

      })
    },
    uploadInput(value){
      let _this = this
      if(!_this.uploadConfig.isSuccess) _this.form.newFileName = value.substring(value.lastIndexOf('\\')+1)
    },
    uploadSuccess(data) {
      let _this = this
      if(data.body.status=='S'){
        _this.form.serviceFilePath = data.body.saveFilePath
        _this.form.fileName = ''
      }
    },
    // uploadSuccess(data){
    //   let _this = this
    //   _this.form.newFileName=data.body.newFileName
    //   _this.form.serviceFilePath=data.body.saveFilePath
    // },
    dateCompare(rule, value, callback){
        let _form=rule.vm[rule.formName]
        let compareValue1=_form[rule.compareList[0]]
        let compareValue2=_form[rule.compareList[1]]
        if(!this.isEmpty(compareValue1) && !this.isEmpty(compareValue2)){
            if(compareValue1.getTime()>=compareValue2.getTime()){
                callback("保函到期日要大于保函生效日")
            }else{
                callback()
            }
        }else{
            if(this.isEmpty(_form[rule.field])){
                for(let index in rule.compareList){
                    if(rule.field != rule.compareList[index]){
                        if(!this.isEmpty(_form[rule.compareList[index]])){
                            callback("请选择日期")
                        }
                        callback()
                    }
                }
            }
            callback()
        }
    },
    isInteger(rule, value, callback) {
        let valueReg = /^[0-9]+$/.test(value)
        if (this.isEmpty(value) || !valueReg) {
            callback("请填写数字类型")
        } else {
            callback()
        }
    },
    isEmpty(value) {
        if ($.trim(value) == "") return true
        return false
    },
    checkOptionsArray(option){
      if((option.right.substr(0,1)=='1') && (option.coreType=='201'||option.type=='1')){
        return true
      }
    },
  },
  mounted(){
    let _this = this
    // console.log("交易维护参数start")
    // console.log(this.$route.params.oldSqno)
    // console.log(JSON.stringify(this.$route.params))
    // console.log("交易维护参数end")
    if(!(this.$route.params.oldSqno==''||this.$route.params.oldSqno == undefined)){
        _this.form  = $.extend({},_this.form,{
          oldSqno:this.$route.params.oldSqno,
          operateFlag:this.$route.params.operateFlag,
          gntType:this.$route.params.guaranteeList[0].gntType,
          ESTBD:this.$route.params.guaranteeList[0].ESTBD,
          CRY:this.$route.params.guaranteeList[0].CRY,
          gntAmt:this.$route.params.guaranteeList[0].gntAmt,
          valueDate:this.$route.params.guaranteeList[0].valueDate,
          dueDate:this.$route.params.guaranteeList[0].dueDate,
          appAddr:this.$route.params.guaranteeList[0].appAddr,
          wrntName:this.$route.params.guaranteeList[0].wrntName,
          wrntAddr:this.$route.params.guaranteeList[0].wrntAddr,
          befName:this.$route.params.guaranteeList[0].befName,
          befAddr:this.$route.params.guaranteeList[0].befAddr,
          contraNo:this.$route.params.guaranteeList[0].contraNo,
          contraCRY:this.$route.params.guaranteeList[0].contraCRY,
          contraAmt:this.$route.params.guaranteeList[0].contraAmt,
          gntTemplate:this.$route.params.guaranteeList[0].gntTemplate,
          newFileName:this.$route.params.guaranteeList[0].newFileName,
          serviceFilePath:this.$route.params.guaranteeList[0].serviceFilePath,
          comments:this.$route.params.guaranteeList[0].comments,
          wthdAccNo:this.$route.params.guaranteeList[0].wthdAccNo
        })
        _this.form.valueDateObj = new Date(this.$tools.utils.formatDate(_this.form.valueDate,{"symbol":"YYYY-MM-DD HH:mm:ss"}).replace(/-/g,"/"))
        _this.form.dueDateObj = new Date(this.$tools.utils.formatDate(_this.form.dueDate,{"symbol":"YYYY-MM-DD HH:mm:ss"}).replace(/-/g,"/"))
        // console.log(_this.form.valueDateObj)
        // console.log(_this.form.dueDateObj)
        _this.form.templateIndex =  (_this.form.gntTemplate=='1')?'1':'0'
        if(_this.form.newFileName!='' && _this.form.serviceFilePath!='') _this.$emit("showFileTable",true)
    }else{
      _this.form  = $.extend({},_this.form,_this.formData)   //从父组件传来的值可能是空或对象
    }
    let _options = _this.$tools.storage.get("user","save").operAccInfoList
    _this.options = _options.filter(_this.checkOptionsArray)
    //console.log(_options)
  },
}
</script>