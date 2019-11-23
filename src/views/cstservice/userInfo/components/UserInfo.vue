<template>
  <div class="UserInfo   p20">

    <!--用户信息table-->
    <div class="fourForm tableForm mt20" v-if="stepIndex== '1'">
      <h3>本人基本信息</h3>
      <el-form ref="tableData" :model="tableData">
        <el-row>
          <el-form-item label="姓名：">
            {{tableData.userName}}
          </el-form-item>
          <el-form-item label="登录昵称：">
            {{tableData.alias}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="手机号：">
            {{tableData.mobile}}
          </el-form-item>
          <el-form-item label="用户状态：">
            <span v-if="tableData.stt == 0">正常</span>
            <span v-if="tableData.stt == 1">暂停</span>
            <span v-if="tableData.stt == 2">冻结</span>
            <span v-if="tableData.stt == 3">销户</span>
            <span v-if="tableData.stt == 4">维护中</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="电子邮件：">
            {{tableData.email}}
          </el-form-item>
          <el-form-item label="预留信息：">
            {{tableData.custmsg}}
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="editUserInfo()">修改</el-button>
      </div>
    </div>
    <!--用户信息table--end-->

    <!--修改用户信息-->
    <div class="fourForm tableForm mt20" v-if="stepIndex== '2'">
      <h3>本人基本信息</h3>
      <el-form ref="tableData" :model="tableData">
        <el-row>
          <el-form-item label="姓名：">
            {{tableData.userName}}
          </el-form-item>
          <el-form-item label="登录昵称：">
            {{tableData.alias}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="手机号：">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="用户状态：">
            <span v-if="tableData.stt == 0">正常</span>
            <span v-if="tableData.stt == 1">暂停</span>
            <span v-if="tableData.stt == 2">冻结</span>
            <span v-if="tableData.stt == 3">销户</span>
            <span v-if="tableData.stt == 4">维护中</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="电子邮件：">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="预留信息：">
            <el-input v-model="form.custmsg"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm('form')">完成</el-button>
        <el-button type="primary" @click="stepIndex = '1'">返回</el-button>
      </div>
    </div>
    <!--修改用户信息--end-->

    <!--成功页面-->
    <div class="success tac" v-if="stepIndex == '3'">
      <img src="../../../../images/common/success.png" />
      <p>
        <strong class="fontSize18">恭喜你，修改成功</strong>
      </p>
      <!--刷新路由倒计时-->
      <ynet-refresh-route :parentVM="this" :parentInit="this.getUserInfo"></ynet-refresh-route>
      <!--jumpOtherRoute是跳转其它路由，
                 <refreshRoute jumpOtherRoute="/login"></refreshRoute>  
                 刷新当前路由请用:parentVM="this"，parentInit属性配置是刷新后要执行的方法，可自行根据配置。
                <refreshRoute :parentVM="this" :parentInit="this.parentInit"></refreshRoute>-->
      <!--刷新路由倒计时--end-->
    </div>
    <!--成功页面--end-->
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  components: {

  },
  data() {
    return {
      stepIndex: "1",
      tableData: {
        userName: '',
        mobile: "",
        email: "",
        alias: '',
        stt: '',
        custmsg: ''
      },
      form: {
        mobile: "",
        email: "",
        custmsg: ''
      }
    };
  },// data
  methods: {
    editUserInfo() {
      let _this = this
      _this.stepIndex = "2"

    },
    submitForm(formName) {
      let _this = this
      let body = _this.form
      body.userno = _this.$tools.storage.get("user", 'save').eCIFID
      _this.$tools.request(this, "UIF03008.do", body).then(
        data => {
          if (data.body.errorCode == "0") {
            _this.stepIndex = "3"
          }
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getUserInfo() {
      let _this = this
      alert()
      _this.tableData.userName = _this.$tools.storage.get("user", 'save').userName+'000';
      alert(_this.tableData.userName )
      _this.tableData.mobile = _this.$tools.storage.get("user", 'save').mobile;
      _this.tableData.email = _this.$tools.storage.get("user", 'save').email;
      _this.tableData.alias = _this.$tools.storage.get("user", 'save').alias;
      _this.tableData.stt = _this.$tools.storage.get("user", 'save').stt;
      _this.tableData.custmsg = _this.$tools.storage.get("user", 'save').custmsg;

      _this.form.mobile = _this.$tools.storage.get("user", 'save').mobile;
      _this.form.email = _this.$tools.storage.get("user", 'save').email;
      _this.form.custmsg = _this.$tools.storage.get("user", 'save').custmsg;

      // let body = {}
      // body.userno = _this.$tools.storage.get("user", 'save').eCIFID
      // _this.$tools.request(this, "UIF03009.do", body).then(
      //   data => {
      //     _this.tableData.userName = data.body.userName;
      //     _this.tableData.mobile = data.body.mobile;
      //     _this.tableData.email = data.body.email;
      //     _this.tableData.alias = data.body.alias;
      //     _this.tableData.stt = data.body.stt;
      //     _this.tableData.custmsg = data.body.custmsg;

      //     _this.form.mobile = data.body.mobile;
      //     _this.form.email = data.body.email;
      //     _this.form.custmsg = data.body.custmsg;
      //   })
    }
  },// methods
  mounted() {
    let _this = this
    alert()
    _this.getUserInfo()
  }
}

</script>
<style lang="scss">
@import "../../../../styles/vars.scss";
</style>

