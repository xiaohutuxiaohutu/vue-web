<template>
  <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <div class="main-container container-border mt20">

      <!--content--end-->
      <div class="main-container pt30">       
        <!--进度条-->
        <ynet-progress-bar class="mt20" :items="Global.BUSINESS_TEXT.registerStep" :itemIndex="0"></ynet-progress-bar>
        <!--进度条--end-->
        <br><br>
        <div class="content-title tac"><h3>页面的标题名称</h3></div>
        <!--tab-->
        <div class="MytabLine"  v-if="!success">
           <el-tabs v-model="activeName">
             <el-tab-pane label="单个" name="financing">
               <!--form单个布局-->
               <div class="form mt30">
                 <el-form ref="form" :model="form" :rules="rules">
                   <el-form-item label="交易密码：" prop="pw1">
                     <ynet-password v-model="form.pw1" :config="pwConfig1" ref="pw1"></ynet-password>
                   </el-form-item>
                   <el-form-item label="登录密码：" prop="pw2">
                     <ynet-password v-model="form.pw2" :config="pwConfig2" ref="pw2"></ynet-password>
                   </el-form-item>
                   <el-form-item label="手机号：" prop="name">
                     <el-input name="name" v-model="form.name"></el-input>
                     <ynet-btn-verification v-model="form.name" :config="messageCofig" @click="messageCode"></ynet-btn-verification>
                   </el-form-item>
                   <el-form-item label="证件类型：">
                     <el-select v-model="form.certificateType" placeholder="请选择活动区域">
                       <el-option label="身份证" value="shanghai"></el-option>
                       <el-option label="军官证" value="beijing"></el-option>
                     </el-select>
                   </el-form-item>
                   <el-form-item label="帐号4位加空格：">
                     {{$tools.utils.accountFormat(form.acconut)}}
                   </el-form-item>
                   <el-form-item label="截取后4位：">
                     {{$tools.utils.lastIndexOf(form.acconut)}}
                   </el-form-item>
                   <el-form-item label="数字打码：">
                     {{$tools.utils.mask(form.acconut,{beforeIndex:3,behindIndex:4})}}
                     {{$tools.utils.accNoMask(form.acconut,{beforeIndex:7,behindIndex:11})}}
                   </el-form-item>      
                   <el-form-item label="封装人民币：" prop="currency">
                     <ynet-currency-input name="currency" ref="currency" v-model="form.currency" @currency-blur="currentBlur" placeholder="不能超过10000.00元"></ynet-currency-input>
                   </el-form-item>
                   <el-form-item label="人民币转换：" >
                     {{$tools.utils.currencyFormat(form.currency2)}}
                     {{this.$tools.utils.toChinese(form.currency2)}}
                   </el-form-item>
                   <el-form-item label="日期转换添加符号">
                     {{$tools.utils.formatDate(date,{"symbol":"YYYY-MM-DD HH:mm:ss"})}}
                   </el-form-item>
                   <el-form-item label="日期转换去符号">
                     {{$tools.utils.formatDate(date2,{"removeFormat":true})}}
                   </el-form-item>
                   <el-form-item label="获取当前时间">
                     {{$tools.utils.formatDate(new Date(),{"todayAll":true})}}
                     <br>
                     {{$tools.utils.formatDate(new Date(),{"today":true})}}
                     <br>
                     {{$tools.utils.formatDate(new Date(),{"todayAllCN":true,"todayAllTextCN":"分"})}}
                     <br>
                     {{$tools.utils.formatDate(new Date(),{"todayAllCN":true})}}
                   </el-form-item>
                   <el-form-item label="相差天数">
                     （2017-06-06或20170606）和（今天）相差{{ $tools.utils.apartDays("20170606",new Date()) }}
                   </el-form-item>
                   <el-form-item label="日期范围校验：" prop="date2">
                     <el-date-picker
                        v-model="form.date2"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1">
                     </el-date-picker>
                   </el-form-item>
                   <el-form-item label="日期范围校验：" prop="date">
                     <el-date-picker v-model="form.date" type="daterange" placeholder="选择日期范围"></el-date-picker>
                   </el-form-item>

                   <el-form-item class="tac formBtnArea">
                     <el-button>上一步</el-button>
                     <el-button type="primary" @click="nextStep">下一步</el-button>
                   </el-form-item>
                 </el-form>
               </div>
               <!--form单个布局--end-->
             </el-tab-pane>
             <el-tab-pane label="双个" name="fund">
               <!--form双个布局-->
               <div class="both-sides-form mt30">                
                 <el-form ref="form2" :model="form2" :rules="rules2">
                   <h3>短信验证码转账限额</h3>
                   <el-row>
                     <el-col :span="12"><el-form-item label="转账最高限额设置：">单笔99,999.00</el-form-item></el-col>
                     <el-col :span="12"><el-form-item label="日累计：">99,999.00</el-form-item></el-col>
                   </el-row>
                   <el-row class="border-bottom">
                     <el-col :span="12">
                       <el-form-item label="请设置转账功能：" prop="name2">
                         <el-input  v-model="form2.name2">
                           <template slot="prepend">年累计笔数</template>
                         </el-input>
                       </el-form-item>
                     </el-col>
                     <el-col :span="12">
                       <el-form-item label="日累计：">
                         <el-input></el-input>
                         <span>当日已使用0.00元</span>
                       </el-form-item>
                     </el-col>
                   </el-row>
                   <h3 class="mt20">短信验证码转账限额</h3>
                   <el-row>
                     <el-col :span="12"><el-form-item label="转账最高限额设置：">单笔99,999.00</el-form-item></el-col>
                     <el-col :span="12"><el-form-item label="日累计：">99,999.00</el-form-item></el-col>
                   </el-row>
                   <el-row class="border-bottom">
                     <el-col :span="12">
                       <el-form-item label="请设置转账功能：" prop="name2">
                         <el-input  v-model="form2.name2">
                           <template slot="prepend">单笔</template>
                         </el-input>
                       </el-form-item>
                     </el-col>
                     <el-col :span="12">
                       <el-form-item label="日累计：">
                         <el-input></el-input>
                         <span>当日已使用0.00元</span>
                       </el-form-item>
                     </el-col>
                   </el-row>
                   <el-form-item class="tac formBtnArea mt30">
                     <el-button type="primary">查询</el-button>
                   </el-form-item>
                 </el-form>
               </div>
               <!--form双个布局--end-->
             </el-tab-pane>
           </el-tabs>
         </div>
         <!--tab--end-->


         <br><br><br><br><br><br>
         <!--成功页面-->
         <div class="success tac" v-if="success">
           <img src="../../images/common/success.png" />
           <p><strong class="fontSize18">恭喜你，注册成功</strong></p>
            <!--刷新路由倒计时-->
            <ynet-refresh-route :parentVM="this" :parentInit="this.parentInit"></ynet-refresh-route>
               <!--jumpOtherRoute是跳转其它路由，
               <refreshRoute jumpOtherRoute="/login"></refreshRoute>  
               刷新当前路由请用:parentVM="this"，parentInit属性配置是刷新后要执行的方法，可自行根据配置。
              <refreshRoute :parentVM="this" :parentInit="this.parentInit"></refreshRoute>-->
            <!--刷新路由倒计时--end-->
         </div>
         <!--成功页面--end-->
         <el-form :model="form4" :rules="rules4"  ref="form4"  action="a.do"  method="post" target="iframe" enctype="multipart/form-data">
                    <el-form-item label="表单流的方式上传1：" prop="name1">
                         <el-input name="name1" v-model="form4.name1"></el-input>
                   </el-form-item>
                   <el-form-item label="表单流的方式上传2：" prop="name2">
                         <el-input name="name2"  v-model="form4.name2"></el-input>
                   </el-form-item>
                   <el-form-item label="上传文件：" prop="newFileName">
                      <ynet-upload 
                        name="filePath"
                        configName="uploadConfig"
                        action="CB000008.do"
                        ref="upload"
                        v-model="form4.newFileName"
                        :vm="this"
                        @uploadSuccess="uploadSuccess"
                        :isShowBtnUoload="uploadConfig.isShowBtnUoload"
                       >
                       </ynet-upload>
                   </el-form-item>
                   <el-form-item label="上传文件2：" prop="newFileName2">
                      <ynet-upload 
                        name="filePath2"
                        configName="uploadConfig2"
                        action="CB000008.do"
                        ref="upload2"
                        v-model="form4.newFileName2"
                        :vm="this"
                        @uploadSuccess="uploadSuccess"
                        :isShowBtnUoload="uploadConfig.isShowBtnUoload"
                       >
                       </ynet-upload>
                   </el-form-item>
                   <template v-for = "(item,index) in form4.upLoadList">
                      <el-form-item
                          :prop="'upLoadList.' + index + '.fileName'"
                          :rules="uploadRules(index,'uploadListConfig')"                
                      >
                          <ynet-upload 
                            name="filePath2"
                            :configName="'uploadListConfig'+index"
                            action="CB000008.do"
                            :ref="'upLoadList'+index"
                            v-model="form4.upLoadList[index].fileName" 
                            :vm="returnVm()"
                            @uploadSuccess="uploadSuccess"
                            :isShowBtnUoload="uploadConfig.isShowBtnUoload"
                            class="inline-block"
                          >
                          </ynet-upload>
                          <a @click="addUpLoadList(index+1,'uploadListConfig')" v-if="isShowAdd(index)">添加</a>
                          <a @click="delAmountRange(index)" v-if="isShowDel(index)">删除</a>
                      </el-form-item>
                   </template>
                   <button type="submit" class="el-button el-button--info"><span>提交1</span></button>
                   <el-button type="primary" @click="submitForm">提交2</el-button>
        </el-form>
         <br><br><br><br><br><br>
         <!--pagination-->
         <div class="pagination mt30 tac">
           <el-pagination layout="prev, pager, next" :total="1000" @current-change="handleCurrentChange"></el-pagination>
         </div>
         <!--pagination--end-->
      </div>
      <!--content--end-->

    </div>
  </ynet-content>
</template>

<script>
import Global from '@src/components/global'   //温馨提示和进度条的文字说明

export default {
  name:'templateName',
  components: {
  },
  data() {
    return {
        Global,
        pickerOptions1: {
          disabledDate(time) {
            console.log(time.getDay())
            if(time.getDay()==0 || time.getDay() == 6) return true
            else return false
            //return time.getTime() > Date.now();
          }
         },
        parentVM:this,
        success:false,
        pwObj1:"",               //密码控件对象
        pwObj2:"",
        CBvalidator1:true,       //返回校验,true表示校验通过
        CBvalidator2:true,
        date:"20170608145510",
        date2:"2017-06-08 14:55:10",
        fileList:[],
        pwConfig1:{
          pgeId:"pgeId1",
          initId:"initId1"
        },
        pwConfig2:{
          pwdStrength:true,     //开启密码强度,默认关闭
          pgeMaxlength:20,      //密码长度,默认6
          pgeEreg:"login",      //切换登录正则
          pgeId:"pgeId2",
          initId:"initId2"
        },
        messageCofig:{
          params:{
            time:"20170619",
            NO:"20170619193430"
          }
        },
        form: {
          name: '',
          pw1:"",
          pw2:"",
          certificateType:'',
          currency:'',
          currency2:'654321.00',
          currency3:'',
          date:this.$tools.utils.differDate(7),
          date2:"",
          acconut:"15915116161614151416851",
          firstPage:0,
          lastPage:9,
          size:1,
          pagesize:10
        },
        form2: {
          name2: '' 
        },
        form4: {
          name1: '',
          name2: '',
          newFileName:'',
          newFileName2:'',
          upLoadList:[
            {
              fileName:""
            }
          ]
        },
        uploadConfig:{
          isUploading:false,
          isClickUpload:false,
          isShowBtnUoload:true,
          isSuccess:false,
          fileSize:5
        },
        uploadConfig2:{
          isUploading:false,
          isClickUpload:false,
          isShowBtnUoload:true,
          isSuccess:false,
          fileSize:5
        },
        uploadListConfig0:{
          isUploading:false,
          isClickUpload:false,
          isShowBtnUoload:true,
          isSuccess:false,
          fileSize:5
        },
        rules4: {
          name1: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          name2: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          newFileName: [
            { trigger: 'change',validator:this.$tools.validator.fileValidator,fileType:['xlsx','rar'],vm:this,configName:"uploadConfig"},
          ],
          newFileName2: [
            { trigger: 'change',validator:this.$tools.validator.fileValidator,fileType:['xlsx','rar'],vm:this,configName:"uploadConfig2"},
          ]
        },
        activeName:"financing",
        rules: {
          name: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在11个字符',trigger: 'blur'},
            { validator:this.validatorNumber, trigger: 'blur'}
          ],
          date: [
            { validator:this.validatorDate, trigger: 'blur', required: true}
          ],
          currency:[
            { required: true, message:'请输入金额', trigger: 'blur' },
            { validator:this.validatorCurrency, trigger: 'blur'}
          ],
          pw1:[
            {validator:this.$tools.validator.pwdValidator,vm:this,formName:"form"},
          ],
          pw2:[
            {validator:this.$tools.validator.pwdValidator,vm:this,formName:"form",isPgeEreg2:true},
          ],
        },
        rules2: {
          name2: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ]
        },
        safeLimit: {
          msgCode:'',
          validation:'短信验证',
          TRANPW:'',
          seen:'true',
          msgTransfer: '' ,
          msgDayTransfer:'',
          faceTransfer: '' ,
          faceDayTransfer:'',
          UshieldTransfer:'',
          UshieldDayTransfer:'',
          limitType1:'',
          limitType2:''
        },
        tableData:[],
        signData:'',
        getDN:'',
    }
  },
  methods: {
    addUpLoadList(index,configName){
      let _this=this
      _this[configName + index] = {
          isUploading:false,
          isClickUpload:false,
          isShowBtnUoload:true,
          isSuccess:false
      }
      _this.form4.upLoadList.push({fileName:""})
    },
    isShowAdd(index){
      let _this=this
      if(index != _this.form4.upLoadList.length-1) return false
      return true
    },
    delAmountRange(index){
      let _this=this
      if(index != (_this.form4.upLoadList.length -1)) _this.$refs[('upLoadList'+index)][0].reset()
      _this.form4.upLoadList.splice(index, 1)
    },
    isShowDel(index){
      let _this=this
      if(index == 0) return false
      return true
    },
    uploadRules(index,configName){
      let _this = this
      return [
        { trigger: 'change',validator:this.$tools.validator.fileValidator,fileType:['xlsx','rar'],vm:this,configName:configName + index}
      ]
    },
    returnVm(){
      return this
    },
    submitForm(){
      let _this=this
      console.log(_this.form4)
      _this.$refs['form4'].validate((valid) => {
          if (valid) {
            console.log(_this.form4)
            _this.$refs.upload.submitForm()
          }else{
          }
       })
    },
    uploadSuccess(data){
      //console.log(data)
    },
    CBobj1(pwObj,CBvalidator){
      if(CBvalidator!=undefined) return this.CBvalidator1=CBvalidator
      this.pwObj1=pwObj
    },
    CBobj2(pwObj,CBvalidator){
      if(CBvalidator!=undefined) return this.CBvalidator2=CBvalidator
      this.pwObj2=pwObj
    },
    nextStep(){
      //this.$router.replace({ path:'/template'})
       let _this=this  
       //_this.success=true  
       //_this.$refs.currency.nonempty(_this.form.currency)
       //_this.$refs.currency.showErrBox("输入提示字段")
       //console.log(_this.$refs.form4.$el.submit())   //自定义提交用表单流的方式
       //_this.$refs.form4.$el.submit()
       //_this.$refs.upload.submit()     //自定义提交上传控件用表单流的方式
       _this.$refs.form.validate((valid) => {
          if (valid) {
              //_this.$refs.parentValidator1.blurValidator()    //密码控件校验
              //_this.$refs.parentValidator2.blurValidator()
              //if(!_this.CBvalidator1 || !_this.CBvalidator2) return
              _this.$tools.request(_this,"MyTransaction.do").then(
                data => {
                  _this.tableData=data.body.tableData
              })
          }else{
             console.log(_this.form)
              //_this.$refs.parentValidator1.blurValidator()
              //_this.$refs.parentValidator2.blurValidator()
          }
       })
       //let reg=/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
       //alert(reg.test(this.form.name))   
    },
    messageCode(data){
      console.log(data)
    },
    currentBlur(val){   //金额控件失焦事件
      console.log(val)
    },
    handleCurrentChange(size){
      this.form.firstPage=(size-1)*10
      this.form.lastPage=size*10-1
      this.form.size=size
      this.nextStep()
    },
    validatorDate(rule, value, callback){
      if(value=="") return callback("请输入日期")
      let _this=this
      let startDate=_this.$tools.utils.formatDate(value[0])
      let endDate=_this.$tools.utils.formatDate(value[1])
      if(!_this.$tools.utils.compareDate(startDate,endDate,"1")){
        return callback("日期不能超过1个月")
      }
      callback()
    },
    validatorNumber(rule, value, callback){
      let _this=this
      if(!_this.$tools.validator.isNumber(value)) return callback("请输入数字")
      if(!_this.$tools.validator.isPhone(value)) return callback("请输入正确格式手机号码")
      callback()
    },
    validatorCurrency(rule, value, callback){
      if(value=="1.00"){
        callback()
      }
      callback("测试")
    },
    handlePreview(){
      this.$refs.upload.clearFiles()
    },
    handleProgress(file, fileList){
      //this.$refs.upload.uploadFiles=this.$refs.upload.uploadFiles.slice(-1)
    },
    handleClick(tab, event){
        _this.tips=false
        _this.randomNo=''
      },
    //U盾
    diaplay1(value){
      if(value === 'U盾验证'){
        this.safeLimit.seen=false
        this.ukeyInit()
      }else{
        this.safeLimit.seen=true
      }
    },
    //第一页-ukey控件检测
		ukeyInit(){
			var _this=this;
			_this.ukeyInitResult = _this.$tools.Ukey.init();
			if(_this.ukeyInitResult!="success"){
			_this.$message({
          message:'请下载签名控件',
          type:'error'
          })
			}else{
			}
		},
   //第二页--ukey成功按钮
		ukeySuccessFunction(){
      let _this=this
			let ukeyNum = _this.$tools.Ukey.getUkeyNum();//检查U盾是否插入
      console.log(ukeyNum)
			if(ukeyNum==0){
        _this.$message({
          message:'请插入U盾',
          type:'error'
          })
				return;
			}
			if(ukeyNum>1){
        	_this.$message({
          message:'选择正确U盾，并拔出其他U盾',
          type:'error'
          })
				return;
			}
      //显示在Ukey上面的信息，这些信息作为原文上送校验
      let UkeyMsg = {
            _PrdName:"服务名称"+":"+"资金转出",
						_Amt:"金额"+":"+_this.amount,
						_ACCTNO:"E账号"+":"+_this.accountNo,
						_userName:"用户名"+":"+_this.userName
          }
         //perBank_cl 接口.do相应的配置 
      //<cl:interceptors>
			//<cl:interceptor name="SignCheckInterceptor" desc="二维码校验">
			//	<cl:attribute name="signFields" value="_PrdName#服务名称#资金转出||_Amt#金额#amount||_ACCTNO#E账号#ACCTNO||_userName#用户名#userName" />
      //_Amt#金额#amount Amt U盾上显示的字段,金额 U盾显示的文字 amount 上送的字段
			//</cl:interceptor>
	    //</cl:interceptors>    
			let signType = 1;
			_this.signData = _this.$tools.Ukey.signJSON(UkeyMsg,2);//签名密文
      _this.getDN=_this.$tools.Ukey.getDN() //U盾证书
			if(_this.signData=="errorSign"){
				let lastErrorDesc =  _this.$tools.Ukey.getLastErrorDesc() //返现最后一次报错信息
				if(lastErrorDesc!=""){
          _this.$message({
          message:lastErrorDesc,
          type:'error'
          })
				}
				return;
			}	
      _this.sureSubmit()
		},
    sureSubmit(){
      let _this=this
      let temp={
      "securityType":"1", //安全工具类型 1:U盾 不传报错
      "signType":"1",//签名类型 1
      "secType":"0",//证书状态 0
      "signData":_this.signData,//签名密文
      "subjectDN":_this.getDN//U盾证书号
     };
      temp.sessionKey=_this.sessionKey
      temp.pgeNumY =_this.pgeNumY
      temp.processType='3'
      _this.$tools.request(_this,"TPS08009.do",temp).then(
        data =>{
          let { errorMsg, errorCode } = data.header
          if (errorCode != 0) {
           _this.$message({
           message: errorMsg,
            type: 'error'
            })
        } else {

        }
        })
    },
    parentInit(){
      console.log("parentInit")
    }
  },
  mounted(){ 
    
  }
}
</script>
