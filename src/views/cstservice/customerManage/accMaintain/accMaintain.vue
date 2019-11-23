<template>
  <div class="main-content">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <ynet-content id="accMaintain" :headerInformation="true" :headerMenu="true" class="functionalArea">
      <h3 class="functionalAreaTitle">账户维护</h3>
      <!--下挂账户信息table-->
      <div class="fourForm tableForm p20" v-if="stepIndex == 1">
        <h3>账户列表</h3>
        <div class="tableData">
          <el-table :data="tableData" stripe>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column property="accNo" label="账号" width="220"></el-table-column>
            <el-table-column property="accName" label="账号名称"></el-table-column>
            <el-table-column property="accAlias" label="别名">
              <template scope="scope">
                <span v-if="scope.row.accAlias==''||scope.row.accAlias==undefined">----</span>
                <span v-else>{{scope.row.accAlias}}</span>
              </template>
            </el-table-column>
            <el-table-column property="limitSingle" label="单笔限额">
              <template scope="scope">
                <span v-if="scope.row.limitSingle==''">----</span>
                <span v-else>{{$tools.utils.toDecimalString(scope.row.limitSingle,true,2)}}</span>
              </template>
            </el-table-column>
            <el-table-column property="limitDay" label="日累计限额">
              <template scope="scope">
                <span v-if="scope.row.limitDay==''">----</span>
                <span v-else>{{$tools.utils.toDecimalString(scope.row.limitDay,true,2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作权限">
              <template scope="scope">
                <span v-if="scope.row.accRight.substring(0,1) == 0">查询</span>
                <span v-else-if="scope.row.accRight.substring(0,1) == 1">查询/转账</span>
                <span v-else>----</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <a class="cOrange" v-if="scope.row.accStt==1" @click="accountAdd(scope.row)">加挂</a>
                <a class="cOrange" v-if="scope.row.accStt==0" @click="accountEdit(scope.row)">修改</a>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="pagination tar mt20" v-if='turnPageTotalNum>turnPageShowNum'>
            <el-pagination @current-change="handleCurrentPageChange" :current-page.sync="currentPage" :page-size="turnPageShowNum" layout="total,prev, pager, next, jumper" :total="turnPageTotalNum">
            </el-pagination>
          </div>
          <!--分页--end-->
        </div>
      </div>
      <!--下挂账户信息table--end-->

      <!--修改页面-->
      <accMaintainEdit v-if="stepIndex==2" @changeStep="changeStep" :stepData="stepData"></accMaintainEdit>

      <!--新增页面-->
      <accMaintainAdd v-if="stepIndex==3" @changeStep="changeStep" :stepData="stepData"></accMaintainAdd>
      
      <!-- 溫馨提示 -->
      <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
      <!-- 溫馨提示end -->
    </ynet-content>
  </div>
</template>
  
<script>
import accMaintainAdd from './components/accMaintainAdd';
import accMaintainEdit from './components/accMaintainEdit';

export default {
  name: 'accMaintain',
  components: {
    accMaintainAdd,
    accMaintainEdit
  },
  data() {
    return {
        warmTips:[
          '1.可查看企业的所有账户信息。',
          '2.管理员可修改账户的别名、限额等信息。',
        ],
      stepIndex: 1,
      tableData: [],
      currentPage: 1,
      turnPageShowNum: 10,
      turnPageTotalNum: 1,
      rowData: {},
      accInfoList: [],
      stepData: {},
    };
  },
  methods: {
    changeStep(index, stepData) {
      let _this = this
      _this.stepIndex = Number(index)
      if (Number(index) == 1) {
        _this.initData()
      }
      if (stepData) _this.stepData = stepData
      _this.$tools.scrollTop()
    },
    accountAdd(row) {
      let _this = this
      _this.stepData = row
      _this.stepIndex = 3
    },
    accountEdit(row) {
      let _this = this
      _this.stepData = row
      _this.stepIndex = 2
    },
    handleCurrentPageChange(val) {
      let _this = this
      _this.currentPage = val
      _this.tableData = _this.accInfoList.filter(function(element, index) {
        return ((_this.currentPage - 1) * _this.turnPageShowNum <= index && index <= _this.currentPage * _this.turnPageShowNum - 1)
      })
    },
    initData() {
      let _this = this
      _this.accInfoList = []
      let ccbAccList = []
      let esbAccList = []
      let cstNo = _this.$tools.storage.get('user', 'save').cstNo
      _this.$tools.request(this, "CB080803.do", {}).then(data => {//根据客户号从核心查所有账户列表
        esbAccList = data.body.accInfoList;
        _this.$tools.request(this, "CB08080303.do", {}).then(data => {//根据客户号查询客户已下挂账户信息
          ccbAccList = data.body.accInfoList
          //整合两个账户集合
          for (var esb of esbAccList) {
            let ccbEqualsEsb = true
            for (var ccb of ccbAccList) {
              if (ccb.accNo == esb.accNo) {
                ccbEqualsEsb = false
                _this.accInfoList.push(ccb)
              }
            }
            let _accType = ''
            let _boundType = ''
            let _boundTypeName = ''
            if ((_this.$tools.dict.accTypeDict(esb.coreType).indexOf('保证金') >= 0)) {
              _accType = 3
              if (esb.nrdaType == 'C') {
                _boundType = ''
                _boundTypeName = ''
              }
            } else if (esb.nrdaType == 'T') {
              _accType = 2
            } else if (esb.nrdaType == 'C') {
              _accType = 1
            } else if (esb.nrdaType == 'S') {
              _accType = 4
            } else if (esb.nrdaType == 'A') {
              _accType = 5
            }
            let _coreTypeName = _this.$tools.dict.accTypeDict(esb.coreType)
            if (ccbEqualsEsb == true) {
              _this.accInfoList.push({ "accAttr": esb.accAttr, "nrdaType": esb.nrdaType, "limitDayNum": "", "limitYear": "", "cstNo": cstNo, "currType": esb.currType, "limitDay": "", "openBranchName": "", "accType": _accType, "limitSingleLand": "", "accNo": esb.accNo, "openBranchNo": esb.openBranchNo, "pubToPri": "", "unionBankNo": "", "accStt": "1", "accName": esb.accName, "accRight": "22222", "limitSingle": "", "openDate": esb.openDate, 'coreType': esb.coreType, 'coreTypeName': _coreTypeName, 'boundType': _boundType, 'boundTypeName': _boundTypeName })
            }
          }
          _this.turnPageTotalNum = _this.accInfoList.length
          _this.handleCurrentPageChange(_this.currentPage)
        })
      })
    },
  },
  mounted() {
    let _this = this
    _this.initData()
  }
}
</script>
