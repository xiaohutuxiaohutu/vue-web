<template>
<div class="letterOfGuaranteeToOpenStep">
      <!--table布局-->
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20">
        <table>
          <caption>汇款信息</caption>
          <tr>
            <td><span class="cRed">*</span>保函种类：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>开立方式：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>保函币种：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>保函金额：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>保函生效时间：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>保函到期日期：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>申请人账号：</td>
            <td>
              
            </td>
            <td><span class="cRed">*</span>申请人账户名：</td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>申请人地址：</td>
            <td colspan="3">
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>担保人姓名：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>担保人地址：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>受益人姓名：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>受益人地址：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>合同编号：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>合同币种：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>合同金额：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>保函模板：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>申请人模板文件：</td>
            <td colspan="3">
              <el-form-item  prop="chineseAdd">
                 <input type="file"  @change="fileChange" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>备注：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>扣款账号：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
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
  data() {
    return {
      form: {
          chineseName:''
      },
      rules: {
        chineseName: [
          {trigger: 'blur', validator:this.chineseValidator}
        ]
      }
    }
  },
  methods: {
    submitForm() {
      let _this=this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
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
    }
  },
  mounted(){ 
  }
}
</script>