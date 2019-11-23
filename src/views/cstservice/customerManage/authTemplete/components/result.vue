<template>
  <div class="templateStep3">
    <!--4格布局table-->
    <div class="tableForm mt20">
      <h3>处理结果</h3>
      <div class="transactionStatus">
        <ynet-icon Type="transactionStatus" :NO="resultData.No"></ynet-icon>
        <span class="ml15">{{resultData.message}}</span>
      </div>
    </div>
    <!--4格布局table--end-->
    <div class="btnArea mt20 tac">
          <el-button type="primary" @click="submitForm">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'deleteSuccess',
  components: {
  },
  data() {
    return {
    }
  },
  props: {
    resultData: { type: Object, default: {} },
  },
  methods: {
    submitForm() {
      let _this=this
      _this.$emit("changeStep", "0")
    }
  },
  mounted(){ 
    
  }
}
</script>



