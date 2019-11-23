<template>
  <div class="importCreditOpen">
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>标题</caption>
        <tr>
          <td><span class="cRed">*</span>文字（english）：</td>
          <td>
            <el-form-item  prop="input1">
              <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
            </el-form-item>
          </td>
          <td>文字2：</td>
          <td>
            <el-form-item>
              <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>文字1：</td>
          <td colspan="3">
            <el-form-item>
              <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>文字1：</td>
          <td colspan="3">
            <el-form-item>
              <el-radio-group v-model="form.resource" @change="radioChage">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费">
                  <el-form-item prop="name2" ref="formName2">
                    <el-input v-model="form.name2" placeholder="请输入账号" :disabled="formName2Disabled"></el-input>
                  </el-form-item>
                  <el-form-item  prop="star">
                    <el-date-picker type="date" placeholder="开始日期" :disabled="formName2Disabled" v-model="form.star"></el-date-picker>
                  </el-form-item>
                </el-radio>
                <el-radio label="线上品牌商赞助2"></el-radio>
                <el-radio label="线上品牌商赞助3"></el-radio>
                <el-radio label="线上品牌商赞助4"></el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>文字1：</td>
          <td colspan="3">
            <el-form-item>
              <el-input placeholder="请输入账号"></el-input> %more or
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入账号"></el-input> %less
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>文字1：</td>
          <td colspan="2">
            <el-form-item>
              <el-input placeholder="请输入账号"></el-input>
            </el-form-item>
          </td>
          <td rowspan="4" class="tableEvenText">内容</td>
        </tr>
        <tr>
          <td>文字1：</td>
          <td colspan="2">
            <el-form-item>
              <el-input placeholder="请输入账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>文字1：</td>
          <td colspan="2">
            <el-form-item>
              <el-input placeholder="请输入账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>文字1：</td>
          <td colspan="2">
            <el-form-item class="w400">
              <el-input placeholder="请输入账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>文字1：</td>
          <td colspan="3">
            <span>标题</span>
            <el-form-item class="w400">
              <el-input type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td rowspan="4">文字1：</td>
          <td colspan="3">
            <span>标题</span>
            <el-form-item class="w400">
              <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="tableEvenText">
            <span>标题</span>
            <el-form-item class="w400">
              <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="tableEvenText">
            <span>标题</span>
            <el-form-item class="w400">
              <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="tableEvenText">
            <span>标题</span>
            <el-form-item class="w400">
              <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <el-form-item>
              <el-radio-group v-model="form.resource" @change="radioChage">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费">
                  <el-form-item>
                    <el-input v-model="form.name2" placeholder="请输入账号" :disabled="formName2Disabled"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-date-picker type="date" placeholder="开始日期" :disabled="formName2Disabled" v-model="form.star"></el-date-picker>
                  </el-form-item>
                </el-radio>
                <el-radio label="线上品牌商赞助2"></el-radio>
                <el-radio label="线上品牌商赞助3"></el-radio>
                <el-radio label="线上品牌商赞助4"></el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>上传文件：</td>
          <td colspan="3">
            <el-form-item prop="file">
              <input type="file"  @change="fileChange" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <el-form-item>
              <el-radio-group>
                <el-radio label="线下场地免费">
                  <el-form-item>
                    <el-input v-model="form.name2" placeholder="请输入账号" :disabled="formName2Disabled"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-date-picker type="date" placeholder="开始日期" :disabled="formName2Disabled" v-model="form.star"></el-date-picker>
                  </el-form-item>
                  各种文字输入测试。各种文字输入测试。各种文字输入测试。各种文字输入测试。各种文字输入测试。各种文字输入测试。各种文字输入测试。
                  <el-form-item>
                    <el-select placeholder="请选择证件类型"  v-model="form.name">
                      <el-option label="身份证" value="身份证"></el-option>
                      <el-option label="军官证" value="军官证"></el-option>
                    </el-select>
                  </el-form-item>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
      </table>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm()">提交结果</el-button>
        <el-button type="primary" @click="$tools.print()">打印</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </div>
    </el-form>
    <!--table布局-->
  </div>
</template>

<script>
export default {
  name:'templateStep1',
  components: {
  },
  data() {
    return {
      form: {
          name:'',
          name2:'',
          input1:'',
          input2:'',
          resource:[],
          file:''
      },
      rules: {
        input1: [
          {required: true,trigger: 'blur',message:'请输入',}
        ],
        file: [
          {trigger: 'blur', validator:this.fileValidator}
        ],
        name2: [
          {trigger: 'blur', validator:this.nonempty}
        ],
        star:[
          { required: true, type:"date", message:'请输入起始日期', trigger: 'change' }
        ]
      },
      formName2Disabled:true,
    }
  },
  methods: {
    nonempty(rule, value, callback){
      let _this=this
      if(!_this.formName2Disabled && $.trim(value)=="") callback("测试")
      callback()
    },
    fileValidator(rule, value, callback){
      let _this=this
      if($.trim(_this.form.file)=="") callback("请选择")
      callback()
    },
    fileChange(e){
      let _this=this
      _this.form.file=$(e.target).val()
    },
    radioChage(val){
      let _this=this
      if(val=="线下场地免费"){
        _this.formName2Disabled=false
      }else{
        _this.formName2Disabled=true
        _this.form.name2=""
        _this.$refs['formName2'].validate("blur")
      }
    },
    submitForm() {
      let _this=this
      _this.$refs['form'].validate((valid) => {
        if (valid) {

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
