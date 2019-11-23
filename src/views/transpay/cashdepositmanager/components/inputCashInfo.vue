<template>
  <div>
    <el-form label-width="400px">
        <el-form-item label="付款账号">
            <el-select v-model="region" placeholder="请选择">
            </el-select>
        </el-form-item>
        <el-form-item label="转入金额">
            <el-input class="input" placeholder="请输入转入金额"><template slot="prepend">￥</template></el-input>
        </el-form-item>
        <el-form-item label="金额大写">
            <span></span>
        </el-form-item>
        <el-form-item label="保证金账号">
            <el-select v-model="region2" placeholder="请选择">
            </el-select>
        </el-form-item>
        <el-form-item label="付款凭证用途">
            <el-input class="input" placeholder="请输入用途"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input class="input" placeholder="请输入备注"></el-input>
        </el-form-item>
    </el-form>
  </div>
  
</template>

<script>

export default {
  name:'InputCashInfo',
  components: {
      
  },
  data() {
    return{
        region:'',
        region2:''
    }
  },
  methods: {
    
  },
  mounted(){ 
    
  }
}
</script>
<style>
  .input{
      width:600px;
  }
</style>