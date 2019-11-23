<template>
  <ynet-content id="" :headerInformation="true" :headerMenu="true" class="main-content">
    <ynet-breadcrumb></ynet-breadcrumb>
    <div class="mt10 main-container">
      <el-table class="mb20 no-header"
        :data="normalizedParentInfo"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="col1">
        </el-table-column>
        <el-table-column
          align="center"
          prop="col2">
        </el-table-column>
      </el-table>

      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light"><b>子公司授权列表</b></div></el-col>
      </el-row>

      <el-table
        :data="normalizedAuthList"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          label="子公司授权账号"
          prop="acctNo">
        </el-table-column>
         <el-table-column
          align="center"
          label="单笔限额"
          prop="singleLimit">
        </el-table-column>
         <el-table-column
          align="center"
          label="日累计限额"
          prop="dayLimit">
        </el-table-column>
         <el-table-column
          align="center"
          label="日累计笔数"
          prop="dayNumLimit">
        </el-table-column>
        <el-table-column
          align="center"
          label="授权类型"
          prop="authType">
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="requestData.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="requestData.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="this.childInfo.length">
      </el-pagination>

      <el-row>
        <el-col :span="24" align="middle"><div class="mt10 mb10"><el-button @click="backToPrev()">关闭</el-button></div></el-col>
      </el-row>
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
  import childView from './components/groupInfo_child';
  import parentView from './components/groupInfo_parent';

  export default {
    name:'groupInfo',
    components:{
      childView,
      parentView
    },
    data() {
      return {
        parentInfo: this.$route.params.subObj,
        childInfo: [],
        subcorpInfo: this.$route.params.subObj,
        requestData:{
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
      normalizedTableData: function(){
        return this.childInfo
      },
      backToPrev: function(){
        this.$router.go(-1);
      }
    },
    computed:{
      normalizedParentInfo: function(){
        return [
          {
            col1: '子公司网银客户号：' + this.parentInfo.cstNo,
            col2: '子公司客户名称：' + this.parentInfo.cnName
          },
          {
            col1: '子公司证件类型：' + this.$tools.dict.certTypeDict(this.parentInfo.certType).certType,
            col2: '子公司证件号码：' + this.parentInfo.certNo
          },
          {
            col1: '开户机构：' + this.parentInfo.openBranch
          }
        ]
      },
      normalizedAuthList: function(){
        for(var i in this.childInfo){
          this.childInfo[i].authType = this.$tools.dict.acctAuthType(this.childInfo[i].right.substr(0,1))
        }
        return this.childInfo
        // return [
        //   {
        //     cstId: '21382483297',
        //     oneLimit: '3423,000.00',
        //     dailyLimit: '5000,000.00',
        //     dailyCount: 100,
        //     authType: '付款'
        //   }
        // ]
      }
    },
    mounted(){
      let _this = this
      _this.$tools.request(this, 'CB040102Action.do',{'cstNo': _this.subcorpInfo.cstNo}).then(
        // function(data){
        data => {
          if(data.body && data.body.errorCode == '0'){
            // debugger
            // _this.parentInfo = data.body.group
            //Object.assign(_this.parentInfo, data.body.group)
            _this.childInfo.push(...data.body.subAcctList)
          }
        }
      )
    }
  }
</script>

