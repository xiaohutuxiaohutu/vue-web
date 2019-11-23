<template>
  <div class="UserInfo  ">

    <!--修改用户信息-->
    <div class="fourForm tableForm" v-if="form!={}||form!=undefined">
      <h3>本人基本信息</h3>
      <el-form ref="form" :model="form" :rules="rules1">
        <el-row>
          <el-form-item label="姓名：">
            {{form.userName}}
          </el-form-item>
          <el-form-item label="登录昵称：" prop="loginName">
            <el-input v-model="form.loginName"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="手机号：" prop="mobileNo">
            {{form.mobileNo}}
          </el-form-item>
          <el-form-item label="用户状态：">
            <span v-if="form.operStt == 0">正常</span>
            <span v-if="form.operStt == 1">暂停</span>
            <span v-if="form.operStt == 2">冻结</span>
            <span v-if="form.operStt == 3">销户</span>
            <span v-if="form.operStt == 4">维护中</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="电子邮件：" prop="userEmail">
            <el-input v-model="form.userEmail"></el-input>
          </el-form-item>
          <el-form-item label="预留信息：" prop="cstMsg">
            <el-input v-model="form.cstMsg"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="验证码：" prop="checkAuth" class="fullLine">
            <el-input v-model="form.checkAuth"></el-input>
            <ynet-btn-verification :config="messageCofig" @click="messageCode"></ynet-btn-verification>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="uKeySubmit('form')">确定</el-button>
        <el-button type="primary" @click="preStep()">返回</el-button>
      </div>
    </div>
    <!--修改用户信息--end-->
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  components: {

  },
  data() {
    return {
      form: {},
      signData: '',
      timeStamps: '',
      messageCofig: {
        //发送手机验证码需要参数
        params: {
          tempType: 'CXINF',
          transCode: 'CB0801'
        }
      },
      getMsg: false,
      rules1: {
        loginName: [
          { message: '请输入登录昵称', trigger: 'blur', required: true },
          { validator: this.$tools.validator.isNumAndEng, trigger: 'blur' },
          { min: 6, max: 20, message: '长度为6到20位字符', trigger: 'blur,change' },
          { validator: this.validateCodeAndUserStt, trigger: 'blur' }
        ],
        mobileNo: [
          { message: '请输入手机号码', trigger: 'blur', required: true },
          { validator: this.validatorPhone, trigger: 'blur' }
        ],
        userEmail: [
          // { message: '请输入电子邮箱', trigger: 'blur', required: true },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        cstMsg: [
          // { message: '请输入预留信息', trigger: 'blur', required: true }
        ],
        checkAuth: [
          { message: '请输入验证码', trigger: 'blur', required: true }
        ]
      }
    };
  },// data
  props: {
    tableData: { type: Object, default: {} },
  },
  methods: {
    validateCodeAndUserStt(rule, value, callback) {
      let _this = this
      if (_this.form.alias != _this.tableData.alias) {
        let body = {}
        body.alias = _this.form.loginName
        _this.$tools.request(_this, "CB000102.do", body).then(data => {
          if (data.body.errorCode == 'CB000010200') {
            callback()
          } else {
            callback("用户已存在")
          }
        })
      } else { callback() }
    },
    validatorPhone(rule, value, callback) {
      let _this = this
      if (!_this.$tools.validator.isNumber(value)) return callback("请输入数字")
      if (!_this.$tools.validator.isPhone(value)) return callack("请输入正确格式手机号码")
      callback()
    },
    preStep() {
      let _this = this
      _this.$emit("changeStep", "0")
    },
    messageCode(data) {
      let _this = this
      if (data.body.errorCode == '0') {
        _this.getMsg = true
      } else {
        this.$alert(data.body.errorMsg, '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      }
    },
    getTimeStamps(val) { //获取防重复提交timeStamps
      let _this = this
      _this.$tools.request(_this, "CB000028Action.do", { tradeCode: val }).then(data => {
        _this.timeStamps = data.body.timeStamps
      })
    },
    uKeySubmit() {
      let _this = this
      let keyFlag = _this.$ukey
      if (keyFlag == true || keyFlag == 'true') {
        let userStorge = _this.$tools.storage.get("user", "save")
        let cstNo = userStorge.cstNo
        let userNo = userStorge.eCIFID
        let newDate = [
          { key: 'cstNo', value: cstNo },
          { key: 'userNo', value: userNo },
          { key: 'mobileNo', value: _this.form.mobileNo },
          { key: 'loginName', value: _this.form.loginName },
          // { key: 'userEmail', value: _this.form.userEmail },
          // { key: 'cstMsg', value: _this.form.cstMsg }
        ]
        let siDate = JSON.stringify(newDate);
        let certNo = userStorge.serialNo
        let ukeyNo = userStorge.uKeySn
        let arrAcc = ["姓名:", _this.form.userName]
        let arrAmt = ["手机号码:", _this.form.mobileNo]
        let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
        if (flag == false || flag == 'false') {
          return
        }
        let signData = document.getElementById("signData").value.toString()
        _this.signData = signData
      }
      _this.submitForm()
    },
    submitForm() {
      let _this = this
      if (_this.getMsg) {
        _this.$refs.form.validate((valid) => {
          if (valid) {
            let body = _this.form
            body.signedData = _this.signData
            body.tempType = 'CXINF'
            body.queryType = 'update'
            body.timeStamps = _this.timeStamps
            _this.$tools.request(this, "CB080101.do", body).then(
              data => {
                if (data.body.errorCode == "0") {
                  let _userStorage = _this.$tools.storage.get("user", 'save')
                  _userStorage.alias = _this.form.loginName
                  _userStorage.email = _this.form.userEmail
                  _userStorage.custmsg = _this.form.cstMsg
                  this.$tools.storage.set('user', _userStorage)
                  let _result = { No: '1', message: "本人信息修改成功" }
                  _this.$emit("changeStep", "2", _result)
                } else if (data.body.errorCode == "CPLN0003" || data.body.errorCode == 'CPLN0002') {
                  _this.$alert(data.body.errorMsg, '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                  });
                } else {
                  let _result = { No: '0', message: "本人信息修改失败" }
                  _this.$emit("changeStep", "2", _result)
                }
              })
          } else {
          }
        });
      } else {
        _this.$alert('请先获取验证码', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      }
    }
  },// methods
  mounted() {
    let _this = this
    _this.form = $.extend({}, _this.form, _this.tableData)
    _this.getTimeStamps('CB080101')
  }
}

</script>
<style lang="scss">
@import "../../../../styles/vars.scss";
</style>

