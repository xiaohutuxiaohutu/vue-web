<template>
  <div class="templateStep2">
    <!--4格布局table-->
    <div class="fourForm tableForm mt20">
      <h3>付款人信息</h3>
      <el-form ref="form1">
        <el-row>
          <el-form-item label="证件类型">
            {{formData.name}}
          </el-form-item>
          <el-form-item label="账号">
            {{formData.name2}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="一行数据" class="fullLine">
            {{formData.data1}}
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="preStep()">上一步</el-button>
      </div>
    </div>
    <!--4格布局table--end-->
  </div>
</template>

<script>
export default {
  name:'templateStep2',
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
