<template>
<div class="foreignExchangePurchaseStep">
     <!--table布局-->
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20">
        <table>
          <caption>汇款信息</caption>
          <tr>
            <td>转出账户：</td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>币种：</td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>购汇金额：</td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>金额大写：</td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>转入账户：</td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>款项性质：</td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>
              
            </td>
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
  name:'foreignExchangePurchaseStep2',
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