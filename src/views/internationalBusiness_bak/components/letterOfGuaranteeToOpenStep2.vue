<template>
<div class="letterOfGuaranteeToOpenStep">
      <!--table布局-->
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20">
        <table>
          <caption>汇款信息</caption>
          <tr>
            <td><span class="cRed">*</span>保函种类：</td>
            <td></td>
            <td><span class="cRed">*</span>开立方式：</td>
            <td></td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>保函币种：</td>
            <td></td>
            <td><span class="cRed">*</span>保函金额：</td>
            <td></td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>保函生效时间：</td>
            <td></td>
            <td><span class="cRed">*</span>保函到期日期：</td>
            <td></td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>申请人账号：</td>
            <td></td>
            <td><span class="cRed">*</span>申请人账户名：</td>
            <td></td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>申请人地址：</td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>担保人姓名：</td>
            <td></td>
            <td><span class="cRed">*</span>担保人地址：</td>
            <td></td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>受益人姓名：</td>
            <td></td>
            <td><span class="cRed">*</span>受益人地址：</td>
            <td></td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>合同编号：</td>
            <td></td>
            <td><span class="cRed">*</span>合同币种：</td>
            <td></td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>合同金额：</td>
            <td></td>
            <td><span class="cRed">*</span>保函模板：</td>
            <td></td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>申请人模板文件：</td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>备注：</td>
            <td></td>
            <td><span class="cRed">*</span>扣款账号：</td>
            <td></td>
          </tr>
        </table>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="preStep()">上一步</el-button>
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
  data() {
    return {

    }
  },
  props:{
    formData:{type:Object,default:{}},
  },
  methods: {
    preStep(){
      let _this=this
      _this.$emit("changeStep","0")
    },
    submitForm() {
      let _this=this
      _this.$tools.request(this,"MyTransaction.do",_this.formData).then(data => {
        _this.$emit("changeStep","2",data)
      })
    }
  },
  mounted(){ 
  }
}
</script>
<style  lang="scss">

</style>