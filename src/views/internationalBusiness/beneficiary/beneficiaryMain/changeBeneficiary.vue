<template>
  <ynet-content id="changeBeneficiary" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div  class="p20">
            <div class="twoForm tableForm mt20">
            <h3>填写受益人信息</h3>

            <el-form ref="form" :model="form">

                <el-form-item label="受益人名称：">
                <el-input v-model="newBeneficiaryName">
                </el-input>
                </el-form-item>

                <el-form-item label="受益人地址：">
                <el-input v-model="newBeneficiaryAddress">
                </el-input>
                </el-form-item>

            </el-form>

        
            <div class="btnArea mt20 tac">
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button type="primary" @click="getBack()">返回</el-button>
            </div>

            <!--2格布局table--end-->
            </div>
        </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>

export default {
    name:'changeBeneficiary',
  components: {

  },
  data() {
    return {
        form:{
           
        },
        newBeneficiaryName:'',
        newBeneficiaryAddress:''
    }
  },
  methods: {
    submitForm(){

    },
    getBack(){

    }
  },
  mounted(){ 
    
  }
}
</script>
