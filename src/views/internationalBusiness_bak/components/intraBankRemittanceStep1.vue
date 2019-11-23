<template>
<div class="intraBankRemittanceStep1">
      <!--table布局-->
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20">
        <table>
          <caption>汇款信息</caption>
          <tr>
            <td rowspan="2"><span class="cRed">*</span>汇款人名称及地址：</td>
            <td colspan="3">
              <el-radio-group v-model="form.chineseRadio" @change="chineseRadioFN">
                <el-radio :label="true"></el-radio>
              </el-radio-group>
              <span>中文名称：</span>
              <el-form-item prop="chineseName" ref="chineseName">
                <el-input v-model="form.chineseName" placeholder="中文名称" :disabled="!form.chineseRadio"></el-input>
              </el-form-item>
              <span>中文地址：</span>
              <el-form-item  prop="chineseAdd" ref="chineseAdd">
                <el-input v-model="form.chineseAdd" placeholder="中文地址" :disabled="!form.chineseRadio"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="tableEvenText">
              <el-radio-group v-model="form.engRadio" @change="engRadioFN">
                <el-radio :label="true"></el-radio>
              </el-radio-group>
              <span>英文名称：</span>
              <el-form-item prop="engName" ref="engName">
                <el-input v-model="form.engName" placeholder="英文名称" :disabled="!form.engRadio"></el-input>
              </el-form-item>
              <span>英文地址：</span>
              <el-form-item  prop="engAdd" ref="engAdd">
                  <el-input v-model="form.engAdd" placeholder="英文地址" :disabled="!form.engRadio"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>收款人常驻国家（地区）名称及代码：</td>
            <td>
              <el-form-item prop="chineseName">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
                <span class="cBlue">选择</span>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>汇款币种：</td>
            <td>
              <el-form-item>
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
                <span class="cBlue">牌价查询</span>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>汇款金额：</td>
            <td>
              <el-form-item prop="chineseName" >
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
                <span>USD美元</span>
              </el-form-item>
            </td>
            <td>金额大写：</td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>现汇金额：</td>
            <td>
              <el-form-item prop="chineseName">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
                <span>USD美元</span>
              </el-form-item>
            </td>
            <td>现汇账号：</td>
            <td>
              <el-form-item>
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
                <span class="cBlue">查询余额</span>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>购汇金额：</td>
            <td>
              <el-form-item prop="chineseName">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
                <span>USD美元</span>
              </el-form-item>
            </td>
            <td>购汇账号：</td>
            <td>
              <el-form-item>
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
                <span class="cBlue">查询余额</span>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>其他金额：</td>
            <td>
              <el-form-item prop="chineseName">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
                <span>USD美元</span>
              </el-form-item>
            </td>
            <td>其他账号：</td>
            <td>
              <el-form-item>
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
                <span class="cBlue">查询余额</span>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>国内外费用承担方式：</td>
            <td colspan="3">
              <el-form-item>
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
                <span class="cBlue">查询余额</span>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>合同号：</td>
            <td>
              <el-form-item prop="chineseName">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
                <span>USD美元</span>
              </el-form-item>
            </td>
            <td>发票号：</td>
            <td>
              <el-form-item prop="chineseName">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>款项性质：</td>
            <td>
              <el-form-item>
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td><span class="cRed">*</span>付款性质</td>
            <td>
              <el-form-item>
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>本笔款项是否为保税货物项下付款：</td>
            <td>
              <el-form-item>
                <el-select placeholder="请选择"  v-model="form.chineseName">
                  <el-option :label="1" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td>外汇局批号件/备案表号/业务编号</td>
            <td>
              <el-form-item>
                 <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>交易编码1：</td>
            <td>
              <el-form-item>
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
                <span class="cBlue">选择</span>
              </el-form-item>
            </td>
            <td>相应金额</td>
            <td>
              <el-form-item>
                 <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>交易附言1：</td>
            <td colspan="3">
              <el-form-item>
                 <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr><tr>
            <td>交易编码2：</td>
            <td>
              <el-form-item>
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
                <span class="cBlue">选择</span>
              </el-form-item>
            </td>
            <td>相应金额</td>
            <td>
              <el-form-item>
                 <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>交易附言2：</td>
            <td colspan="3">
              <el-form-item>
                 <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>汇款附言：</td>
            <td colspan="3">
              <el-form-item>
                 <el-input type="textarea"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>汇款备注：</td>
            <td colspan="3">
              <el-form-item>
                 <el-input type="textarea"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table>
          <caption>收款人信息</caption>
          <tr>
            <td><span class="cRed">*</span>收款人账号：</td>
            <td colspan="3">
              <el-form-item  prop="chineseAdd">
                <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
                <span class="cBlue">选择</span>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td><span class="cRed">*</span>收款人名称及地址：</td>
            <td colspan="3">
              <el-form-item  prop="chineseAdd">
                <el-input type="textarea"></el-input>
                <span class="cBlue">？</span>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>保存收款人：</td>
            <td colspan="3">
              <el-form-item  prop="chineseAdd">
                <el-checkbox v-model="checked"></el-checkbox>
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
  name:'intraBankRemittanceStep1',
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