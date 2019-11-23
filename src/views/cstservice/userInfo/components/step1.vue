<template>
  <div class="UserInfo   ">

    <!--用户信息table-->
    <div class="fourForm tableForm">
      <h3>本人基本信息</h3>
      <el-form :model="tableData">
        <el-row>
          <el-form-item label="姓名：">
            {{tableData.userName}}
          </el-form-item>
          <el-form-item label="登录昵称：">
            {{tableData.loginName}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="手机号：">
            {{tableData.mobileNo}}
          </el-form-item>
          <el-form-item label="用户状态：">
            <span v-if="tableData.operStt == 0">正常</span>
            <span v-if="tableData.operStt == 1">暂停</span>
            <span v-if="tableData.operStt == 2">冻结</span>
            <span v-if="tableData.operStt == 3">销户</span>
            <span v-if="tableData.operStt == 4">维护中</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="电子邮件：">
            {{tableData.userEmail}}
          </el-form-item>
          <el-form-item label="预留信息：">
            {{tableData.cstmsg}}
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="editUserInfo()">修改</el-button>
      </div>
    </div>
    <!--用户信息table--end-->
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  components: {
  },
  data() {
    return {
      tableData: {
        userName: '',
        loginName: '',
        mobileNo: '',
        userEmail: '',
        cstMsg: '',
        operStt:9
      }
    };
  },// data
  methods: {
    editUserInfo() {
      let _this = this
      _this.$emit("changeStep", "1", _this.tableData)
    },
    initData() {
      let _this = this
      _this.tableData.userName = _this.$tools.storage.get("user", 'save').userName
      _this.tableData.mobileNo = _this.$tools.storage.get("user", 'save').mobile
      _this.tableData.userEmail = _this.$tools.storage.get("user", 'save').email
      _this.tableData.loginName = _this.$tools.storage.get("user", 'save').alias
      _this.tableData.operStt = _this.$tools.storage.get("user", 'save').operStt
      _this.tableData.cstmsg = _this.$tools.storage.get("user", 'save').custmsg

      // _this.form.mobile = _this.$tools.storage.get("user", 'save').mobile;
      // _this.form.email = _this.$tools.storage.get("user", 'save').email;
      // _this.form.custmsg = _this.$tools.storage.get("user", 'save').custmsg;


      // let body = {}
      // body.cstNo = _this.$tools.storage.get('user', 'save').cstNo
      // body.eCIFID = _this.$tools.storage.get('user', 'save').eCIFID
      // body.queryType = 'query'
      // _this.$tools.request(this, "CB080101.do", body).then(
      //   data => {
      //     if (data.body.errorCode == '0') {
      //       _this.tableData.userName = data.body.userName
      //       _this.tableData.mobileNo = data.body.mobile
      //       _this.tableData.userEmail = data.body.email
      //       _this.tableData.loginName = data.body.alias
      //       _this.tableData.operStt = data.body.operStt
      //       _this.tableData.cstmsg = data.body.custmsg
      //     } else {
      //       _this.$alert(data.body.errorMsg, '温馨提示', {
      //         confirmButtonText: '确定',
      //         callback: action => {
      //         }
      //       })
      //     }
      //   })
    }
  },// methods
  mounted() {
    let _this = this;
    _this.initData()
  }
}

</script>
<style lang="scss">
@import "../../../../styles/vars.scss";
</style>

