<template>
  <ynet-content id="" :headerInformation="true" :headerMenu="true">
    <div class="mt10 main-container">
      <el-row>
        <el-col :span="24" align="middle" class="mt10 mb10">
            <span>子公司账户组别：</span>
            <el-select v-model="acctNum" placeholder="请选择" style="width:32%">
              <el-option
                v-for="item in acctList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" align="middle">
            <div class="mt10 mb20">
                <el-button type="primary" @click="query()">查询</el-button>
                <el-button type="primary" @click="addGroup()">新增</el-button>
            </div>
        </el-col>
      </el-row>
      
      <el-table :data="normalizedGroupList" border>
        <el-table-column align="center" label="组别" prop="name"></el-table-column>
        <el-table-column align="center" label="组别描述" prop="desc"></el-table-column>
        <el-table-column align="center" label="操作" prop="opt">
          <template scope="scope">
            <el-button @click="alterGroup(scope.$index, scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteGroup(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="requestData.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="requestData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>

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
.grid-content b{
  font-size: 14px;
}
.bg-purple-dark {
  background: #99a9bf;
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
        acctNum: this.$route.params.acctNum,
        acctList: [{label: "G1", value: "6222003602114152265"}],
        groupList:[],
        requestData:{
          acctNum: this.acctNum,
          dateFrom: "",
          dateTo: "",
          currentPage: 1,
          pageSize: 10
        },
      };
    },
    methods: {
      query(){
        
      },
      addGroup(){
        this.$router.push({name:'addGroup', params:{}})
      },
      alterGroup(index, obj){
        console.log(index, obj);
      },
      deleteGroup(index, obj){
        console.log(index, obj);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
      }
    },
    computed:{
      normalizedGroupList: function(){
        return this.groupList
      }
    },
    mounted(){
      let _this = this
      _this.$tools.request(this, 'CB040104Action.do',_this.requestData).then(
        data => {
          if(data.body){
            _this.groupList = data.body.groupList
          }
        }
      )
    }
  }
</script>