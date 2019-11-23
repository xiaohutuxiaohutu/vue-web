<template>
  <div class="commonCounterpartyAdd">
    <!--table布局-->
    <el-form ref="popForm" :model="popForm" :rules="popRules" class="formEmbedTable">
      <table>
        <caption>填写受益人信息</caption>
        <tr>
          <td><span class="cRed">*</span>受益人名称：</td>
          <td>
            <el-form-item prop="beneficiaryName">
              <el-input v-model="popForm.beneficiaryName" placeholder="受益人名称"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>受益人地址：</td>
          <td>
            <el-form-item prop="beneficiaryAddress">
              <el-input v-model="popForm.beneficiaryAddress" placeholder="受益人地址"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!--table布局--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submitPopForm">提交</el-button>
      <el-button @click="backPopForm">返回</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'addBeneficiary',
  components: {
  },
  data() {
    return {
      loginStorage: this.$tools.storage.get("user", "save"),
      popForm:{
        beneficiaryName:"",
        beneficiaryAddress:"",
        proNo:this.$tools.storage.get("user", "save").eCIFID,
        cstNo:this.$tools.storage.get("user", "save").cstNo
      },
      popRules:{
        beneficiaryName: [
          {required: true,trigger: 'blur',message:'请输入'},
          {trigger:'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        beneficiaryAddress: [
          {required: true,trigger: 'blur',message:'请输入'},
          {trigger:'blur', validator:this.$tools.validator.notChineseValidator}
        ]
      }
    }
  },
  props:{
    formData:{type:Object,default:{}},
  },
  methods: {
    submitPopForm() {
      let _this=this
      _this.$refs['popForm'].validate((valid) => {
        if (valid) {
          _this.$tools.request(_this,"CB05060205.do",_this.popForm).then(
            data => {
              if(data.body.count!=null && data.body.count!=undefined && data.body.count!=""){
                if(Number(data.body.count)>=1){
                  _this.$confirm('该收款账号在系统中已经存在，是否覆盖？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    _this.sendPopData()
                  }).catch(() => {
                  })
                }else{
                  _this.sendPopData()
                }
              }
            })
        }else{
          console.log('error submit!!')
          return false
        }
      });
    },
    sendPopData(){
      let _this = this
      _this.$tools.request(_this,"CB05060201.do",_this.popForm).then(
          data =>{
            if(data.body.errorCode==0){
              _this.$alert("添加成功","提醒",{
                confirmButtonText: '确定',
                callback: action => {
                  _this.$emit("changePage","0")
                }
              })
            }else{
              _this.$alert("添加失败！","提醒",{
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            }
          })
    },
    backPopForm(){
      let _this=this
      _this.$emit("changePage","0")
    }
  },
  mounted() {
    let _this=this
    if(_this.formData) $.extend(_this.popForm,_this.formData)
  }
}
</script>
