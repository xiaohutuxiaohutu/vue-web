<template>
  <el-form class="formEmbedTable">
    <h3 class="functionalAreaTitle">所属企业</h3>
    <div class="tableData p20">
      <table>
        <tr>
          <td>操作员编号</td>
          <td>
            <el-form-item>
              {{formData.userNo}}
            </el-form-item>
          </td>
          <td>登录名</td>
          <td>
            <el-form-item>
              {{formData.userAlias}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>使用者姓名</td>
          <td>
            <el-form-item>
              {{formData.userName}}
            </el-form-item>
          </td>
          <td>操作员角色</td>
          <td>
            <el-form-item>
              {{formData.roleName}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>创建时间</td>
          <td>
            <el-form-item>
              {{$tools.utils.formatDateSymbol(formData.userOpenDate)}}
            </el-form-item>
          </td>
          <td>状态</td>
          <td>
            <el-form-item>
              <template>
                <span v-if="formData.userStt==0">正常</span>
                <span v-if="formData.userStt==1">暂停</span>
                <span v-if="formData.userStt==2">临时冻结</span>
                <span v-if="formData.userStt==3">销户</span>
                <span v-if="formData.userStt==4">维护中</span>
                <span v-if="formData.userStt==5">永久冻结</span>
              </template>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>手机号码</td>
          <td>
            <el-form-item>
              {{formData.userMobile}}
            </el-form-item>
          </td>
          <td>电子邮箱</td>
          <td>
            <el-form-item>
              {{formData.userEmail}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>证件类型</td>
          <td>
            <el-form-item>
              {{$tools.dict.certTypeDict(formData.userCertType)}}
            </el-form-item>
          </td>
          <td>证件号码</td>
          <td>
            <el-form-item>
              {{formData.userCertNo}}
            </el-form-item>
          </td>
        </tr>
        <tr v-if="formData.roleNo=='03'">
          <td>审批级别</td>
          <td>
            <el-form-item>
              {{formData.authLevel}}
            </el-form-item>
          </td>
        </tr>
      </table>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="preStep">返回</el-button>
      </div>
    </div>
  </el-form>
</template>


<script>
export default {
  name: 'userDetail',
  props: {
    formData: {
      type: Object
    }
  },
  data() {
    return {

    }
  },
  methods: {
    preStep() {
      let _this = this
      this.$emit("changeStep", "0")
    }
  }
}
</script>