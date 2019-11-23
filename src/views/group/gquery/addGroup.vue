<template>
  <ynet-content id="" :headerInformation="true" :headerMenu="true">
    <div class="mt10 main-container">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light"><b>填写查询信息</b></div></el-col>
      </el-row>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" style="padding:20px 30% 0">
          <el-form-item label="组别名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="组别描述">
            <el-input></el-input>
          </el-form-item>
        </el-form>

      <el-row class="">
        <el-col :span="24"><div class="grid-content bg-purple-light"><b>子公司账户信息</b></div></el-col>
      </el-row>

      <el-table ref="sourceTable" :data="sourceData" border tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column align="center" type="selection" width="50"></el-table-column>
        <el-table-column align="center" prop="acctNum" label="收款账号" width=""></el-table-column>
        <el-table-column align="center" prop="acctName" label="账户名称" width=""></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="requestData.currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="requestData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>

      <el-row class="mt48">
        <el-col :span="24" align="middle">
            <div class="mt10 mb20">
                <el-button type="primary" @click="addToList()">加入组别列表</el-button>
            </div>
        </el-col>
      </el-row>

      <el-row class="">
        <el-col :span="24"><div class="grid-content bg-purple-light"><b>组别账户列表</b></div></el-col>
      </el-row>
      <el-table ref="resultTable" :data="resultData" border tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column align="center" prop="acctNum" label="收款账号" width=""></el-table-column>
        <el-table-column align="center" prop="acctName" label="账户名称" width=""></el-table-column>
      </el-table>
      
      <el-row>
        <el-col :span="24" align="middle">
            <div class="mt20 mb20">
                <el-button type="primary" @click="submit()">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button @click="goBack()">返回</el-button>
            </div>
        </el-col>
      </el-row>
    </div>
  </ynet-content>
</template>
<style scoped>
.mt48{
  margin-top: 48px;
}
.ph20{
  padding: 0 20%;
}
.padding5 {
  padding: 5px;
}
.grid-content {
  min-height: 36px;
  line-height: 36px;
  padding-left: 10px;
  /*border: solid 1px #eef1f6;*/
}
.bg-purple-light {
  background: #aca2a0;
  color: white;
}
.el-pagination{
  padding: 10px 5px 10px 0;
  float: right;
}
</style>

<script>

  export default {
    name:'groupInfo',
    components:{
    },
    data() {
      return {
        sourceData: [{
          acctNum: '2132432432432',
          acctName: '王小虎1'
        }, {
          acctNum: '2132432432431',
          acctName: '王小虎2'
        }, {
          acctNum: '2132432432435',
          acctName: '王小虎3'
        },{
          acctNum: '2132432432432',
          acctName: '王小虎1'
        }, {
          acctNum: '2132432432431',
          acctName: '王小虎2'
        }],
        resultData: [],
        requestData: {
          pageSize: 5
        },
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入组别名称', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      addToList(){

      },
      submit(){

      },
      reset(){

      },
      goBack(){
        this.$router.go(-1);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$refs.sourceTable.clearSelection();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    computed:{
      
    },
    mounted(){
      let _this = this
      _this.$tools.request(this, 'subcorpAcctList.do',_this.requestData).then(
        data => {
          if(data.body){
            _this.groupList = data.body.groupList
          }
        }
      )
    }
  }
</script>