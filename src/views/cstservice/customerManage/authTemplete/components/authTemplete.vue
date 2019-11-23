<template>
  <div>
    <div v-if="stepIndex == 0">
      <div class="tableData">
        <el-table :data="tableData">
          <el-table-column label="审批模板">
            <template scope="scope">
              <a class="cOrange" @click="toDetail(scope.row)">{{scope.row.alias}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="areaType" label="审批类型">
            <template scope="scope">
              <span v-if="scope.row.areaType=='0'">无金额式</span>
              <span v-if="scope.row.areaType=='1'">有金额式</span>
            </template>
          </el-table-column>
          <el-table-column prop="level" label="审批级别">
            <template scope="scope">
              <span v-if="scope.row.level=='1'">一级</span>
              <span v-if="scope.row.level=='2'">二级</span>
              <span v-if="scope.row.level=='3'">三级</span>
              <span v-if="scope.row.level=='4'">四级</span>
              <span v-if="scope.row.level=='5'">五级</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <div v-if="scope.row.ifDefaut!='0'">
                  <a class="cOrange" @click="update(scope.row)">修改</a>
                  <a class="cOrange" @click="uKeySubmit(scope.row)">删除</a>
              </div>
              <div v-if="scope.row.ifDefaut=='0'">
                <span>----</span>
                <span>----</span>
              </div>
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
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="add">新增</el-button>
      </div>
    </div>

    <detail v-if="stepIndex == 1" @changeStep="changeStep" :stepData="stepData"></detail>
  </div>
</template>

<script>
import detail from './detail'

export default {
  name: 'cstmanager',
  components: {
    detail
  },
  data() {
    return {
      stepIndex: 0,
      tableData: [],
      templeteAreaList: [],
      currentPage: 1,
      turnPageShowNum: 10,
      turnPageTotalNum: 1,
      stepData: '',
      signData:''
    };
  },
  methods: {
    changeStep(index, stepData) {
      let _this = this
      _this.stepIndex = Number(index)
      if (stepData) _this.stepData = stepData
      _this.$tools.scrollTop()
    },
    toDetail(row) {
      let _this = this
      let body = {}
      body.templete = row
      body.templeteArea = []
      for (var value of _this.templeteAreaList) {
        if (value.authId == row.authId) {
          body.templeteArea.push(value)
        }
      }
      _this.stepData = body
      _this.stepIndex = 1

    },
    handleCurrentPageChange(val) {
      let _this = this;
      _this.currentPage = val
      _this.initData()
    },
    add() {
      let _this = this
      _this.$emit("changeStep", "1")
    },
    update(row) {
      let _this = this
      let body = {}
      body.templete = row
      body.templeteArea = []
      for (var value of _this.templeteAreaList) {
        if (value.authId == row.authId) {
          body.templeteArea.push(value)
        }
      }
      _this.$emit("changeStep", "2", body)
    },
    uKeySubmit(row) {
      let _this = this
      _this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let userStorge = _this.$tools.storage.get("user", "save")
        let cstNo = userStorge.cstNo
        let userNo = userStorge.eCIFID
        let newDate = [{ key: 'cstNo', value: cstNo },
        { key: 'userNo', value: userNo },
        { key: 'authAlias', value: row.alias },]
        let siDate = JSON.stringify(newDate);
        let certNo = userStorge.serialNo
        let ukeyNo = userStorge.uKeySn
        let arrAcc = ["操作类型:", "审批模板维护"]
        let arrAmt = ["模板名称:", row.alias]
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
        _this.deleteTemplete(row)
      }).catch(() => {
      });
    },
    deleteTemplete(row) {
      let _this = this
      let body = {}
      body.signedData = _this.signData
      let _authTempleteList = [row]
      body = $.extend(body, { 'authTempleteList': _authTempleteList })
      body.authId = row.authId
      body.authAlias = row.alias
      body.queryType = '2'
      _this.$tools.request(_this, "CB08080402.do", body).then(
        data => {
          if (data.body.errorCode == 0) {
            this.$alert('删除模板成功', '成功提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.initData()
              }
            });
          } else {
            this.$alert(data.body.errorMsg, '失败提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.initData()
              }
            });
          }
        })
    },
    initData() {
      let _this = this
      let body = {}
      body.queryType = '3'
      body.currentPage = _this.currentPage
      body.turnPageShowNum = _this.turnPageShowNum
      _this.$tools.request(_this, "CB08080401.do", body).then(
        data => {
          _this.turnPageTotalNum = parseInt(data.body.turnPageTotalNum)
          _this.tableData = data.body.authTempleteList
          _this.templeteAreaList = data.body.templeteAreaList
        })
    }

  },
  mounted() {
    let _this = this
    _this.initData()
  }
}
</script>

<style lang="scss">
.cstmnagerAdd .money .el-input {
  width: 70%
}

.cstmnagerAdd .level .el-input {
  width: 35%;
}

.cstmnagerAdd .level .el-input__inner {
  height: 95%;
}

.cstbdl {
  border-left: 1px solid #f1f1f1
}

.cstbdt {
  border-bottom: 1px solid #f1f1f1
}
</style>




