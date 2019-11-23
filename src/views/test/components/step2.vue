<template>
 <div class="step1">
      <!--form单个布局-->
      <div class="form mt30">
        <el-form ref="form" :model="form">
          <el-form-item label="手机号2：">
            {{form.name}}
          </el-form-item>
          <el-form-item class="tac formBtnArea">
            <el-button  @click="preStep">上一步</el-button>
            <el-button type="primary">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--form单个布局--end-->
 </div>
</template>

<script>
export default {
  name:'templateName',
  components: {
  },
  data() {
    return {
        form: {
          name: ''
        }
    }
  },
  methods: {
    preStep(){
      this.$emit("step","1")
    }
  },
  mounted(){ 
    let _this=this
    _this.form=_this.$tools.storage.get("form","save")
  }
}
</script>
