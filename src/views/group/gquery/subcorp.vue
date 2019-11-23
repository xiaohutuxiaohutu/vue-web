<template>
  <ynet-content id="" :headerInformation="true" :headerMenu="true" class="main-content">
    <ynet-breadcrumb></ynet-breadcrumb>
    <div class="functionalArea">
      <div class="p20">
         <el-row>
          <el-col :span="24"><div class="grid-content bg-purple-light"><b>活期结算账户信息</b></div></el-col>
        </el-row>

      <el-table
        :data="normalizedAcctList"
        border
        style="width: 100%" class="mb30">
        <el-table-column
          align="center"
          label="账号"
          prop="acctNum">
          <template scope="scope">
            <span><a href="javascript:;" @click="acctDetail(scope.$index, scope.row)">{{ scope.row.acctNum }}</a></span>
          </template>
        </el-table-column>
         <el-table-column
          align="center"
          label="账户名称"
          prop="acctName">
        </el-table-column>
         <el-table-column
          align="center"
          label="账户组别"
          prop="acctGroup">
        </el-table-column>
         <el-table-column
          align="center"
          label="币种"
          prop="currency">
        </el-table-column>
        <el-table-column
          align="center"
          label="可用余额"
          prop="balance">
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          prop="state">
        </el-table-column>
        <el-table-column
          align="center"
          label="明细"
          prop="">
          <template scope="scope">
            <el-button type="text"
              size="small"
              @click="transDetail(scope.$index, scope.row)">明细</el-button>
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
    </div>
  </ynet-content>
</template>
<style scoped>
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
    name:'subcorp',
    components:{
    },
    data() {
      return {
        acctList:[],
        requestData:{
          // subcorpID: this.$route.params.subcorpID,
          currentPage: 1,
          pageSize: 10
        }
      };
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      acctDetail: function(index, obj){
        console.log(index, obj);
      },
      transDetail: function(index, obj){
        console.log(index, obj);
        this.$router.push({name:'subcorpTxnDtl', params:{'acctNo': obj.acctNo || ''}})
      }
    },
    computed:{
      normalizedAcctList: function(){
        return this.acctList
      }
    },
    mounted(){
      let _this = this
      _this.$tools.request(this, 'CB040103Action.do',_this.requestData).then(
        data => {
          if(data.body){
            _this.acctList = data.body.acctList
          }
        }
      )
    }
  }
</script>