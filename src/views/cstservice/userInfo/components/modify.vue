<template>
  <div class="importCreditOpen modify" >
    <div>
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable" v-if="!success">
      <table>
        <tr style="height:60px;">
          <td>网银用户名</td>
          <td colspan="3">
            <el-form-item>
              {{uName}}
            </el-form-item>
          </td>
        </tr>
        <tr style="height:120px;">
          <td>设置新网银密码</td>
          <td colspan="3" style="position:relative">
            <el-form-item prop="password">
              <ynet-password v-model="form.password" :config="pwConfig" ref="password" style="width:300px"></ynet-password>
              
            </el-form-item>
            <el-form-item style="width:355px;"><span class="cRed">网银登录密码为8至12位的字符（必须同时包含字母、数字、特殊字符中两种或以上的类型组合，字母区分大小写)</span></el-form-item>
            <!--<el-tag type="success" class="cRed">网银登录密码为8至12位的字符（必须同时包含字母、数字、特殊字符中两种或以上的类型组合，字母区分大小写)</el-tag>-->
          </td>
        </tr>
        <tr style="height:60px;">
          <td>确认新网银密码</td>
          <td colspan="3">
            <el-form-item prop="password2">
              <ynet-password v-model="form.password2" :config="pwConfig2" ref="password2"  style="width:300px"></ynet-password>
            </el-form-item>
          </td>
        </tr>
        <tr style="height:60px;" v-if="isForget==false">
          <td>手机号码</td>
          <td colspan="3">
            <el-form-item prop="mobileNo">
              {{form.mobileNo}}
            </el-form-item>
          </td>
        </tr>
        <tr style="height:60px;" v-if="isForget==true">
          <td>手机号码</td>
          <td colspan="3">
            <el-form-item prop="mobileNo">
              <el-input v-model="form.mobileNo" @input="InputInput" placeholder="请输入手机号"  style="width:300px"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr style="height:60px;">
          <td>短信验证码</td>
          <td colspan="3">
            <el-form-item prop="checkAuth">
              <el-input v-model="form.checkAuth" placeholder="请输入短信验证码"  style="width:300px"></el-input>
            </el-form-item>
            <!--<el-button type="primary" class="ml20" @click="getMobileCode()">获取验证码</el-button>-->
            <ynet-btn-verification type="primary" class="ml20" :mobileNo="mobileNoFg" :config="message" @click="dataBack"></ynet-btn-verification>
          </td>
        </tr>
      </table>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
        <el-button @click="returnLogin()" v-if="isLogin">返回</el-button>
      </div>
    </el-form>
        <!-- 溫馨提示 -->
        <ynet-warm-tips :items="warmTips" v-if="!success"></ynet-warm-tips>
        <!-- 溫馨提示end -->
    <!--table布局-->
    </div>
    <div class="tableForm mt20" v-if="success">
      <div class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15">您的密码已成功修改！</span>
      </div>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="returnLogin()">返回重新登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'modify',
  components: {
  },
  data() {
    return {
      warmTips: [
        '1.网银登录密码为8至12位的字符（必须同时包含字母、数字、特殊字符中两种或以上的类型组合，字母区分大小写)；',
        '2.密码修改后，企业手机银行密码同步修改。',
      ],
      right:'',
      data: '',
      success: false,
      uName: '',
      serialNo:'',
      mobileNo:'',
      mobileNoFg:'',
      isLogin:false,
      isForget:false,
      message: {
        //发送手机验证码需要参数
        params: {
          uKeySn: '',
          mobileNo: '',
          tempType: '',
          phoneLen: '',
          transCode: 'CB0802'
        }
      },
      form: {
        uKeySn: '',
        userNo: '',//用户号
        uName:'',//用户别名
        cstNo:'',//客户号
        password: '',//密码
        password2: '',
        mobileNo: '',//手机号
        checkAuth: '',//短信验证码
        tempType: '',  //密码修改类型
        transCode: '',
        randomNum: '',
        randomNum2: '',
        signedData:''
      },
      pwConfig: {
        pwdStrength: true,     //开启密码强度,默认关闭
        //pgeMaxlength:20,      //密码长度,默认6
        isLoginIncludeNum: false,
        pgeId: "pgeId1",
        initId: "initId1",
      },
      pwConfig2: {
        //pwdStrength: true,     //开启密码强度,默认关闭
        //pgeMaxlength:20,      //密码长度,默认6
        isLoginIncludeNum: false,
        pgeId: "pgeId2",
        initId: "initId2"
      },
      rules: {
        password: [
          { validator: this.$tools.validator.pwdValidator, vm: this, formName: "form", isPgeEreg2: true }
        ],
        password2: [
          { validator: this.$tools.validator.pwdValidator, vm: this, formName: "form", isPgeEreg2: true }
        ],
        checkAuth: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ],
        mobileNo: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { trigger: 'blur',validator: this.$tools.validator.isMobile }
        ]
      },
    }
  },
  methods: {
    InputInput(val){
      let _this = this
      if(val!='' || val!=null){
        _this.mobileNoFg = val
      }else{
        alert('请输入手机号码')
      }
    },
    dataBack(data) {
      let _this = this
      if(_this.form.mobileNo==''||_this.form.mobileNo == null){
        alert('手机号错误，请重新输入')
      }else{
        //alert("查出:"+data.body.mobile)
        //alert("输入:"+data.body.mobileNo)
        _this.form.tempType = data.body.tempType
        _this.form.transCode = data.body.transCode
        let status = data.body.status
        let errorCode = data.body.errorCode
        let errorMsg = data.body.errorMsg
        if (status != 'S' || errorCode != '0') {
          // _this.$alert(errorMsg, '温馨提示', {
          //   confirmButtonText: '确定'
          // })
          alert(errorMsg)
        }
      }
    },
    submitForm(form) {
      let _this = this
      let user = _this.$tools.storage.get("user", "save")
      //提交表单前校验
      _this.$refs[form].validate((valid) => {
        if (valid) {
          if(user == null && _this.form.tempType == 'FGPWD'){
              _this.uKeySubmitFGPWD()
          }else{
            if(_this.right=='10000000'){//判断查询员
                _this.modifyPassword()
            }else{
                _this.uKeySubmit()
            }
          }
        } else {
            // _this.$alert("请完善输入信息", '温馨提示', {
            //   confirmButtonText: '确定'
            // })
            alert("请完善输入信息")
        }
      })
    },
    
    uKeySubmitFGPWD(){//忘记密码验签
      let _this = this
      //let loginStorge = _this.$tools.storage.get("user","save")
      let currentTime = _this.$tools.utils.formatDate(new Date(),{"removeFormat":true})
      let cstNo=_this.form.cstNo
      let newDate=[
        {key:'cstNo',value:cstNo},
        {key:'uKeySn',value:_this.form.uKeySn},
        {key:'userNo',value:_this.form.userNo},
        {key:'uName',value:_this.form.uName},
        {key:'password',value:_this.form.password},
        {key:'password2',value:_this.form.password2},
        {key:'mobileNo',value:_this.form.mobileNo},//用户输入的手机号
        {key:'checkAuth',value:_this.form.checkAuth},
        {key:'tempType',value:_this.form.tempType}
      ]
      let siDate=JSON.stringify(newDate);
      let certNo=_this.serialNo
      let ukeyNo=_this.form.uKeySn
      let siAmt=_this.form.mobileNo
      let siAccountNo=_this.form.uName
      let arrAcc=["用户名:",siAccountNo]
      let arrAmt=["手机号:",siAmt]
      let keyFlag=_this.$ukey
      if(keyFlag==true||keyFlag=='true'){
        let flag=getSignData(arrAcc,arrAmt,siDate,certNo,ukeyNo)
        if(flag==false||flag=='false'){
          return
        }
        let signData=document.getElementById("signData").value.toString()
        _this.form.signedData=signData
      }
      _this.modifyPassword()
    },
    
    uKeySubmit(){//修改密码验签
      let _this = this
      let loginStorge = _this.$tools.storage.get("user","save")
      let currentTime = _this.$tools.utils.formatDate(new Date(),{"removeFormat":true})
      let cstNo=loginStorge.cstNo
      let eCIFID=loginStorge.eCIFID
      let newDate=[
        {key:'cstNo',value:cstNo},
        {key:'eCIFID',value:eCIFID},
        {key:'uKeySn',value:_this.form.uKeySn},
        {key:'userNo',value:_this.form.userNo},
        {key:'uName',value:_this.form.uName},
        {key:'password',value:_this.form.password},
        {key:'password2',value:_this.form.password2},
        {key:'mobileNo',value:_this.form.mobileNo},
        {key:'checkAuth',value:_this.form.checkAuth},
        {key:'tempType',value:_this.form.tempType}
      ]
      let siDate=JSON.stringify(newDate);
      let certNo=loginStorge.serialNo
      let ukeyNo=loginStorge.uKeySn
      let siAmt=_this.form.mobileNo
      let siAccountNo=_this.form.uName
      let arrAcc=["用户名:",siAccountNo]
      let arrAmt=["手机号:",siAmt]
      let keyFlag=_this.$ukey
      if(keyFlag==true||keyFlag=='true'){
        let flag=getSignData(arrAcc,arrAmt,siDate,certNo,ukeyNo)
        if(flag==false||flag=='false'){
          //this.$alert('UKey签名失败,请重新再试', '温馨提示')
          return
        } 
        let signData=document.getElementById("signData").value.toString()
        _this.form.signedData=signData
      }
      _this.modifyPassword()
    },

    modifyPassword() {//密码修改
      let _this = this
      if (_this.form.userNo == '' || _this.form.userNo == null || _this.form.mobileNo == '' || _this.form.mobileNo == null) {
        // _this.$alert("请完善提交信息", '温馨提示', {
        //   confirmButtonText: '确定'
        // })
        alert("请完善提交信息")
      } else {
        _this.form.randomNum = _this.$refs['password'].srandNum
        _this.form.randomNum2 = _this.$refs['password2'].srandNum
        let user = _this.$tools.storage.get("user", "save")
        if (user != null && _this.form.tempType == 'CXPWD') {
            if(_this.right=='10000000'){//查询员修改密码
                _this.$tools.request(_this, "CB080301.do", _this.form).then(data => {
                let errorCode = data.body.errorCode
                let errorMsg = data.body.errorMsg
                if (errorCode == '' || errorCode == null || errorCode == '0') {
                  _this.$tools.request(_this,"CB000108.do").then(data =>{
                    if(data.body.errorCode == '' || data.body.errorCode == null || data.body.errorCode == '0'){
                      _this.success=true
                      _this.$refs['form'].resetFields()
                      _this.$tools.storage.get("user")
                    }
                  })
                } else {
                  // _this.$alert(errorMsg, '温馨提示', {
                  //   confirmButtonText: '确定'
                  // })
                  alert(errorMsg)
                }
              })
            }else{
            //修改密码
            _this.$tools.request(_this, "CB080300.do", _this.form).then(data => {
              let errorCode = data.body.errorCode
              let errorMsg = data.body.errorMsg
              if (errorCode == '' || errorCode == null || errorCode == '0') {
                _this.$tools.request(_this,"CB000108.do").then(data =>{
                  if(data.body.errorCode == '' || data.body.errorCode == null || data.body.errorCode == '0'){
                    _this.success=true
                    _this.$refs['form'].resetFields()
                    _this.$tools.storage.get("user")
                  }
                })
              } else {
                // _this.$alert(errorMsg, '温馨提示', {
                //   confirmButtonText: '确定'
                // })
                alert(errorMsg)
              }
            })
          }
        } else if (user == null && _this.form.tempType == 'FGPWD') {
            //忘记密码
            if (_this.form.uKeySn == null || _this.form.uKeySn == '') {
              // _this.$alert("请插入USBKey", '温馨提示', {
              //   confirmButtonText: '确定'
              // })
              alert("请插入USBKey")
              return
            }
            if(_this.mobileNo == _this.form.mobileNo && _this.mobileNo != '' &&  _this.mobileNo != null){
                _this.$tools.request(_this, "CB000107.do", _this.form).then(data => {
                    let errorCode = data.body.errorCode
                    let errorMsg = data.body.errorMsg
                    if (errorCode == '' || errorCode == null || errorCode == '0') {
                      _this.success=true
                      _this.$refs['form'].resetFields()
                    } else {
                      // _this.$alert(errorMsg, '温馨提示', {
                      //   confirmButtonText: '确定'
                      // })
                      alert(errorMsg)
                    }
                })
            }else{
              // _this.$alert("请确认手机号码是否正确", '温馨提示', {
              //   confirmButtonText: '确定'
              // })
              alert("请确认手机号码是否正确")
            }
        }
      }
    },
    
    //修改成功返回重新登录
    returnLogin(){
      let _this = this
      _this.$router.push({path: "/login/loginMain"})
    },
    resetForm() {
      let _this = this
      _this.form.checkAuth = ''
      let pwd = _this.$refs['password'].getPwd()
      let pwd2 = _this.$refs['password2'].getPwd()
      pwd.pwdclear()
      pwd2.pwdclear()
    },

    getUKSn() {//获取ukeysn
      let _this = this
      try{
          let listNum = checkUK();
          if( 1 == listNum ){
            return getUKeySn();
          }else{
            return false;
          }
      }catch (e) {
      }
    },
    
    getInfoByUKeySn() {
      let _this = this
      let body = {}
      _this.form.uKeySn = _this.getUKSn()
      body.uKeySn = _this.form.uKeySn
      _this.message.params.uKeySn = body.uKeySn
      if(body.uKeySn!=null || body.uKeySn!=''){
        _this.$tools.request(_this, "CB000101.do", body).then(data => {
            _this.uName = data.body.alias
            _this.form.uName = data.body.alias
            _this.mobileNo = data.body.mobile    //手动输入,验签后再后台校验,此字段仅做前端校验
            _this.serialNo = data.body.serialNo
            _this.form.userNo = data.body.userNo
            _this.form.cstNo = data.body.cstNo
        })
      }else{
        alert("未检测到USBKey,请插入USBKey")
      }
    },

  },

  // created: function() {
  //   //检测ukey
  //   let _this = this
  //   _this.getUKSn()
  // },

  mounted() {
    let _this = this
    let user = _this.$tools.storage.get("user", "save")
    if (user) {
      _this.isForget = false
      _this.right = user.right
      if(user.resetFlag=='1'){
        //首次登录强制修改密码
        _this.form.uKeySn = user.uKeySn
        _this.form.userNo = user.eCIFID
        _this.form.cstNo = user.cstNo
        _this.uName = user.alias
        _this.form.uName = user.alias
        _this.form.mobileNo = user.mobile
        _this.message.params.phoneLen = _this.form.mobileNo.length
        _this.message.params.tempType = 'CXPWD'
        _this.form.tempType = 'CXPWD'
        _this.isLogin = true
      }else{
        //修改密码
        _this.form.uKeySn = user.uKeySn
        _this.form.userNo = user.eCIFID
        _this.form.cstNo = user.cstNo
        _this.uName = user.alias
        _this.form.uName = user.alias
        _this.form.mobileNo = user.mobile
        _this.message.params.phoneLen = _this.form.mobileNo.length
        _this.message.params.tempType = 'CXPWD'
        _this.form.tempType = 'CXPWD'
        _this.isLogin = false
      }
    } else {
      //忘记密码
      _this.getInfoByUKeySn()
      _this.isLogin = true
      _this.isForget = true
      if (_this.form.uKeySn != '' && _this.form.uKeySn != null) {//插入ukey执行
        _this.message.params.tempType = 'FGPWD'
        _this.form.tempType = 'FGPWD'
      } else {
        // _this.$alert("未检测到USBKey,请插入USBKey", '温馨提示', {
        //   confirmButtonText: '确定'
        // })
        _this.message.params.tempType = 'FGPWD'
        _this.form.tempType = 'FGPWD'
        alert("未检测到USBKey,请插入USBKey")
      }
    }
  },
}
</script>
<style>
.modify .el-tag--success{
  position: absolute;
  top: 28px;
  right: 168px;
}
</style>
