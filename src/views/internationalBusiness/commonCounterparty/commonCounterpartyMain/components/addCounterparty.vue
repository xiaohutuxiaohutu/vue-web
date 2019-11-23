<template>

  <div class="addCounterpar ">

    <div class="twoForm tableForm mt20">
      <h3>录入收款人信息</h3>

      <el-form ref="form1" :model="form1" :rules="rules1">
      
         <el-form-item label="汇款类型" prop="name1">
          <el-radio-group v-model="form1.name" >
              <el-radio label="行内汇款" name="type"></el-radio>
              <el-radio label="行外汇款" name="type"></el-radio>
            </el-radio-group>
          </el-form-item>
    

    
         <el-form-item label="收款人账号" prop="name2" class="is-required" >
          <el-input v-model="form1.name2">
          </el-input>
        </el-form-item>



         <el-form-item label="收款人常驻国" prop="name3" class="is-required">
          <el-input v-model="form1.name3">
          </el-input>
           <el-button type="text" @click="dialogTableVisible1 = true">
                                <span class="accoColor">选择常驻国</span> 
                            </el-button>
            <div class="fourForm tableForm mt20" >  
                                <el-dialog :visible.sync="dialogTableVisible1">
                                  <span>请输入查询条件:</span><el-input>hello</el-input>

                                </el-dialog>  
                            </div>
        </el-form-item>
  

  
         <el-form-item label="收款人名称及地址"  prop="name4" class="is-required">
          <el-input v-model="form1.name4">
          </el-input>
        </el-form-item>
   


         <el-form-item label="收款人开户行代理行所号">
          <el-input >
          </el-input>
        </el-form-item>

      

         <el-form-item label="收款银行之代理名称及地址">
          <el-input>
          </el-input>
        </el-form-item>

    </el-form>

  
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button type="primary" @click="getBack()">返回</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </div>

     </div>
  </div>
</template>

<script>
export default {
  name:'addCounterparty',
  components: {
  },
  data() {
    return {
      dialogTableVisible1:false,
      form1: {
          name:''
      },
      rules1: {
        name1: [
          { message: '请选择汇款类型', trigger: 'change', required: true}
        ],
        name2: [
          { message: '请输入收款人账号', trigger: 'blur', required: true}
        ],
        name3: [
          { message: '请输入收款人常驻国', trigger: 'blur', required: true}
        ],
        name4: [
          { message: '请输入收款人名称及地址', trigger: 'blur', required: true}
        ]
      },
      form1Validate:false
    }
  },
  methods: {
    submitForm() {
      let _this=this
      _this.$refs['form1'].validate((valid) => {
        if (valid) {
          _this.form1Validate=true
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm() {
      let _this=this
      _this.$refs['form1'].resetFields()
    }
  },
  mounted(){ 

  }
}
</script>
