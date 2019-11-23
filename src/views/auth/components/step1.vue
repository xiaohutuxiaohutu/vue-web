<template>
 <div class="step1">
      <!--form单个布局-->
      <div class="form mt30">
        <el-form ref="form" :model="form">
          <el-form-item label="手机号：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item class="tac formBtnArea">
            <el-button>上一步</el-button>
            <el-button type="primary" @click="nextStep">下一步</el-button>
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
    nextStep(){
      let _this=this
      _this.$emit("step","2")
      _this.$tools.storage.set("form",this.form)
    },
    CBstep(){
      let _this=this
      let form=_this.$tools.storage.get("form","save")
      if(form){
        _this.form=_this.$tools.storage.get("form","save")
      }
    }
  },
  mounted(){ 
    this.CBstep()
  }
}
</script>
