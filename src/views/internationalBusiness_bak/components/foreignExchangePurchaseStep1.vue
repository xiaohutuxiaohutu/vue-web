<template>
<div class="foreignExchangePurchaseStep">
      <!--table布局-->
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20">
        <table>
          <caption>汇款信息</caption>
          <tr>
            <td><span class="cRed">*</span>转出账户：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
              </el-form-item>
              <span class="cBlue">余额：$12,000.00</span>
            </td>
          </tr>
          <tr>
            <td>币种：</td>
            <td>
              <span>人民币</span>
              <span class="cBlue">牌价查询</span>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>购汇金额：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>金额大写：</td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>转入账户：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>款项性质：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <ynet-application-guide class="mt20"></ynet-application-guide>
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
  name:'foreignExchangePurchaseStep',
  components: {
  },
  data() {
    return {
      form: {
          chineseRadio:false,
          chineseName:'',
          chineseAdd:'',
          engRadio:false,
          engName:'',
          engAdd:'',
      },
      rules: {
        chineseName: [
          {trigger: 'blur', validator:this.chineseValidator}
        ],
        chineseAdd: [
          {trigger: 'blur', validator:this.chineseValidator}
        ],
        engName: [
          {trigger: 'blur', validator:this.engValidator}
        ],
        engAdd:[
          {trigger: 'blur', validator:this.engValidator}
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
    },
    chineseRadioFN(val){
      let _this=this
      if(val){
        _this.form.engRadio=!_this.form.chineseRadio
      }else{
        _this.$refs['chineseName'].validate("blur")
        _this.$refs['chineseAdd'].validate("blur")
      }
    },
    engRadioFN(val){
      let _this=this
      if(val){
        _this.form.chineseRadio=!_this.form.engRadio
      }else{
        _this.$refs['engName'].validate("blur")
        _this.$refs['engAdd'].validate("blur")
      }
    },
    chineseValidator(rule, value, callback){
      let _this=this
      if(_this.form.chineseRadio && $.trim(value)=="") callback("请填写")
      callback()
    },
    engValidator(rule, value, callback){
      let _this=this
      if(_this.form.engRadio && $.trim(value)=="") callback("请填写")
      callback()
    }
  },
  mounted(){ 
  }
}
</script>