<template>
  <div class="main-content">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <ynet-content id="mobileBankManage" :headerInformation="true" :headerMenu="true" class="functionalArea">
      <h3 class="functionalAreaTitle">用户启停</h3>
      <div class="p20">
        <!--未签约企业手机银行服务页面-->
        <h2 v-if="mobileChannel == 0">尊敬的用户，您尚未签约企业手机银行服务，请先签约该功能。</h2>
        <!--未签约企业手机银行服务页面--end-->

        <div v-if="mobileChannel == 1">
          <!--用户开通信息table-->
          <div class="fourForm tableForm">
            <div class="tableData">
              <el-table ref="tableData" :data="tableData">
                <el-table-column prop="userNo" label="操作员ID">
                </el-table-column>
                <el-table-column prop="userAlias" label="网银用户名">
                </el-table-column>
                <el-table-column prop="userName" label="使用者姓名">
                </el-table-column>
                <el-table-column prop="roleName" label="操作角色">
                </el-table-column>
                <el-table-column prop="userMobile" label="手机号码">
                </el-table-column>
                <el-table-column label="开通手机银行">
                  <template scope="scope">
                    <span v-if="scope.row.channels.charAt(2)==1">是</span>
                    <span v-if="scope.row.channels.charAt(2)==0">否</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template scope="scope">
                    <a class="cOrange" v-if="scope.row.channels.charAt(2)==0" @click="uKeySubmit(0,scope.row)">启用</a>
                    <a class="cOrange" v-if="scope.row.channels.charAt(2)==1" @click="uKeySubmit(2,scope.row)">停用</a>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <div class="pagination tar mt20">
                <el-pagination @current-change="handleCurrentPageChange" :current-page.sync="currentPage" :page-size="turnPageShowNum" layout="total,prev, pager, next, jumper" :total="turnPageTotalNum">
                </el-pagination>
              </div>
              <!--分页--end-->
            </div>
            <!--用户开通信息table--end-->
          </div>
        </div>
      </div>
    </ynet-content>
  </div>
</template>
  
<script>
//import LoginHeader from '@src/views/common/Header';
//import HbFooter from '@src/views/common/Footer';

export default {
  name: 'mobileBankManage',
  components: {},
  data() {
    return {
      mobileChannel: this.$tools.storage.get('user', 'save').cstChannelNo.charAt(2),
      currentPage: 1,
      turnPageShowNum: 10,
      turnPageTotalNum: 0,
      tableData: [],
      signData: ''
    };
  },
  methods: {
    handleCurrentPageChange(val) {
      let _this = this
      _this.currentPage = val
      _this.initData()
    },
    uKeySubmit(val, row) {
      let _this = this
      let _Msg = ''
      if (val == '0') {
        _Msg = '请确认是否启用该用户的手机银行业务?'
      }
      if (val == '2') {
        _Msg = '请确认是否停用该用户的手机银行业务?'
      }
      this.$confirm(_Msg, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let userStorge = _this.$tools.storage.get("user", "save")
        let cstNo = userStorge.cstNo
        let userNo = userStorge.eCIFID
        let newDate = [{ key: 'cstNo', value: cstNo },
        { key: 'userNo', value: userNo },
        { key: 'userAlias', value: row.userAlias },]
        let siDate = JSON.stringify(newDate);
        let certNo = userStorge.serialNo
        let ukeyNo = userStorge.uKeySn
        let arrAcc = ["操作类型:", val == '0' ? "启用" : "停用"]
        let arrAmt = ["启停操作员登录名:", row.userAlias]
        let keyFlag = _this.$ukey
        if (keyFlag == true || keyFlag == 'true') {
          let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
          if (flag == false || flag == 'false') {
            //this.$alert('UKey签名失败,请重新再试', '温馨提示')
            return
          }
          let signData = document.getElementById("signData").value.toString()
          _this.signData = signData
        }
        if (val == '0') {
          _this.openMobileBank(row)
        }
        if (val == '2') {
          _this.closeMobileBank(row)
        }
      }).catch(() => {
      });
    },
    openMobileBank(row) {
      let _this = this
      let body = {}
      body.userAlias = row.userAlias
      body.signedData = _this.signData
      body.userInfoList = [row]
      body.queryType = "open"
      _this.$tools.request(_this, "CB080702.do", body).then(
        data => {
          if (data.body.errorCode == 0) {
            _this.$alert('启用成功', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.initData()
              }
            });
          } else {
            _this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.initData()
              }
            });
          }
        })
    },
    closeMobileBank(row) {
      let _this = this
      let body = {}
      body.userAlias = row.userAlias
      body.signedData = _this.signData
      body.userInfoList = [row]
      body.queryType = "close"
      _this.$tools.request(_this, "CB080702.do", body).then(
        data => {
          if (data.body.errorCode == 0) {
            _this.$alert('停用成功', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.initData()
              }
            });
          } else {
            _this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.initData()
              }
            });
          }
        })
    },
    initData() {
      let _this = this
      if (this.$tools.storage.get('user', 'save').cstChannelNo.charAt(2) == '1') {
        let body = {}
        body.keyWord = 'CCBALL'
        body.currentPage = _this.currentPage
        body.turnPageShowNum = _this.turnPageShowNum
        _this.$tools.request(_this, "CB08080301.do", body).then(
          data => {
            _this.tableData = []
            if (data.body.errorCode == '0') {
              _this.turnPageTotalNum = Number(data.body.turnPageTotalNum)
              _this.tableData = data.body.userInfoList?data.body.userInfoList:[]
            } else {
              this.$alert(data.body.errorMsg, '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                  return
                }
              });
            }
          })
      }
    }
  },
  mounted() {
    let _this = this
    _this.initData()
  }
}
</script>

