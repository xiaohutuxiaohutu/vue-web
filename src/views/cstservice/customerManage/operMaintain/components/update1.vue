<template>
  <div class="importCreditOpen">
    <!--table布局-->
    <el-form :model="form" ref="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>操作员信息</caption>
        <tr>
          <td><span class="cRed">*</span>登录名</td>
          <td>
            <el-form-item prop="userAlias">
              <el-input v-model="form.userAlias" placeholder="请输入登录名"></el-input>
            </el-form-item>
          </td>
          <td><span class="cRed">*</span>使用者姓名</td>
          <td>
            <el-form-item prop="userName">
              <el-input v-model="form.userName" placeholder="请输入使用者姓名"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>证件类型</td>
          <td>
            {{$tools.dict.certTypeDict(form.userCertType)}}
          </td>
          <td><span class="cRed">*</span>证件号码</td>
          <td>
            {{form.userCertNo}}
          </td>
        </tr>
        <tr>
          <td>手机号码</td>
          <td>
            {{form.userMobile}}
            <!--<el-form-item prop="userMobile">
              <el-input v-model="form.userMobile" placeholder="请输入手机号码"></el-input>
            </el-form-item>-->
          </td>
          <td>电子邮箱</td>
          <td>
            <el-form-item prop="userEmail">
              <el-input v-model="form.userEmail" placeholder="请输入电子邮箱"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>操作员角色</td>
          <td>
            <el-form-item>
              <el-select v-model="form.roleNo" :disabled="form.roleNo == '04'" placeholder="请选择操作角色" @change="roleChange">
                <el-option label="查询员" value="01"></el-option>
                <el-option label="录入员" value="02"></el-option>
                <el-option label="授权员" value="03"></el-option>
                <el-option label="管理员" value="04" :disabled="form.roleNo!='04'"></el-option>
              </el-select>
            </el-form-item>
          </td>
          <td><span class="cRed">*</span>开通渠道</td>
          <td>
            <el-form-item prop="">
              <el-checkbox-group v-model="channelsList" @change="channelsChange">
                <el-checkbox label="1" disabled>网银</el-checkbox>
                <el-checkbox label="3" v-if="$tools.storage.get('user','save').cstChannelNo.substring(2,3)=='1'">手机</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td v-if="form.roleNo=='03' || form.roleNo=='04'">授权等级</td>
          <td v-if="form.roleNo=='03' || form.roleNo=='04'">
            <el-form-item prop="authLevel">
              <el-select v-model="form.authLevel" placeholder="请选择授权等级">
                <!--<el-option label="一级" :value='form.authLevel'></el-option>-->
                <el-option label="一级" value='1'></el-option>
                <el-option label="二级" value="2"></el-option>
                <el-option label="三级" value="3"></el-option>
                <el-option label="四级" value="4"></el-option>
                <el-option label="五级" value="5"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>

      </table>
      <div class="btnArea mt20 tac">
        <el-button @click="preStep">取消</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
    </el-form>
  </div>
  <!--table布局-->
</template>

<script>
export default {
  name: 'update1',
  components: {
  },
  data() {
    return {
      form: {},
      channelsList: [],
      alias: '',//原来的登录名
      roleNo:'',//原来的角色
      oldMobile:'',
      rules: {
        userAlias: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 6, max: 20, message: '用户名长度在6到20', trigger: 'blur' },
          { validator: this.isNumEng, trigger: 'blur' },
          { validator: this.validateCodeAndUserStt, trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: this.$tools.validator.isChEng, trigger: 'blur' },
          { min: 1, max: 20, message: '长度不超过20位', trigger: 'blur' },
        ],
        userCertNo: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: this.$tools.validator.isNumAndEng, trigger: 'blur' },
        ],
        userMobile: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: this.$tools.validator.isMobile, trigger: 'blur' },
          { validator: this.$tools.validator.mobileValidate, trigger: 'blur', vm: this, oldMobile: this.oldMobile }
        ],
        userEmail: [
          // { required: true, message: '请输入', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        authLevel: [
          { required: true, message: '请输入', trigger: 'blur' },
        ]
      }
    }
  },
  props: {
    formData: { type: Object, default: {} },
  },
  methods: {
    isNumEng(rule, value, callback) {
      let _this = this
      if (_this.$tools.validator.isNumEng(value)) return callback('输入类型错误，请输入数字字母')
      callback()
    },
    validateCodeAndUserStt(rule, value, callback) {
      let _this = this
      if (_this.alias != _this.formData.userInfoList[0].userAlias) {
        let body = {}
        body.alias = _this.form.userAlias
        _this.$tools.request(_this, "CB000102.do", body).then(data => {
          if (data.body.errorCode == 'CB000010200') {
            callback()
          } else {
            callback("用户已存在")
          }
        })
      } else { callback() }
    },
    channelsChange() {
      let _this = this
      _this.form.channels = '00000000'
      for (var item of _this.channelsList) {
        _this.form.channels = _this.form.channels.substring(0, item - 1) + '1' + _this.form.channels.substring(item, 9)
      }
    },
    roleChange() {
      let _this = this
      if (_this.form.roleNo == '01') {
        _this.form.right = '10000000'
        _this.form.authLevel = ''
      }
      if (_this.form.roleNo == '02') {
        _this.form.right = '11000000'
        _this.form.authLevel = ''
      }
      if (_this.form.roleNo == '03') {
        _this.form.right = '10100000'
      }
      // _this.form.authLevel = ''
    },
    preStep() {
      let _this = this
      _this.$emit("changeStep", "99")
    },
    nextStep() {
      let _this = this
      let body = _this.formData
      body.roleNo = _this.roleNo
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.$emit("changeStep", "1", body)
        }
      })
    },
    initChannels() {
      let _this = this
      _this.channelsList = []
      if (_this.formData.userInfoList[0].channels.substring(0, 1) == 1) _this.channelsList.push('1')
      if (_this.formData.userInfoList[0].channels.substring(2, 3) == 1) _this.channelsList.push('3')
    }
  },
  mounted() {
    let _this = this
    _this.form = _this.formData.userInfoList[0]
    _this.alias = _this.formData.userInfoList[0].userAlias
    _this.roleNo = _this.formData.userInfoList[0].roleNo
    _this.oldMobile = _this.formData.userInfoList[0].userMobile
  },
  created() {
    let _this = this
    _this.initChannels()
  }
}
</script>
