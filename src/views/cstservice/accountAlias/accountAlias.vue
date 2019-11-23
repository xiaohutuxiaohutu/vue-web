<template>
  <div class="main-content">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <ynet-content id="accountAlias" :headerInformation="true" :headerMenu="true" class="functionalArea">

      <!--下挂账户信息table-->
      <div class="fourForm tableForm mt20 p20">
        <h3>网银下挂账户列表</h3>
        <div class="tableData">
          <el-table :data="tableData" stripe>
            <el-table-column property="accNo" label="下挂账户"></el-table-column>
            <el-table-column property="accName" label="账户名称"></el-table-column>
            <el-table-column property="cateGory" label="账户类别">
              <template scope="scope">
                <span v-if="scope.row.cateGory==0">借记卡</span>
                <span v-if="scope.row.cateGory==1">信用卡</span>
              </template>
            </el-table-column>
            <el-table-column property="alias" label="账户别名">
              <template scope="scope">
                <el-input v-model="scope.row.alias"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block mt20" v-if='turnPageTotalNum>turnPageShowNum'>
            <el-pagination @current-change="handleCurrentPageChange" :current-page.sync="currentPage" :page-size="turnPageShowNum" layout="total,prev, pager, next, jumper" :total="turnPageTotalNum">
            </el-pagination>
          </div>
          <!--分页--end-->
        </div>
      </div>
      <div class="btnArea mt10 tac">
        <el-button type="primary" @click="updateAlias()">修改</el-button>
      </div>
      <!--下挂账户信息table--end-->

    </ynet-content>
  </div>
</template>
  
<script>

export default {
  name: 'accountAlias',
  components: {},
  data() {
    return {
      tableData: [],
      currentPage: 1,
      turnPageShowNum: 10,
      turnPageTotalNum: 1
    };
  },
  methods: {
    updateAlias() {
      let _this = this;
      let body = {}
      body.cstNo = "01"
      body.eCIFID = "01"
      body.queryType = 'update'
      body.operAccInfoList = _this.tableData
      _this.$tools.request(this, "CB080701.do", body).then(
        data => {
          _this.$alert('修改成功', '成功提示', {
            confirmButtonText: '确定',
            callback: action => {
              _this.initData()
            }
          });
        })
    },
    handleCurrentPageChange(val) {
      let _this = this;
      _this.currentPage = val
      _this.getAccInfoList()
    },
    initData() {
      let _this = this;
      let body = {}
      body.cstNo = "01"
      body.eCIFID = "01"
      body.queryType = 'query'
      body.currentPage = _this.currentPage
      body.turnPageShowNum = _this.turnPageShowNum
      _this.$tools.request(this, "CB080701.do", body).then(
        data => {
          _this.tableData = data.body.operAccInfoList;
          _this.turnPageTotalNum = parseInt(data.body.turnPageTotalNum)
          //  _this.radio = ''
        })
    },
  },
  mounted() {
    let _this = this
    _this.initData()
  }
}
</script>
