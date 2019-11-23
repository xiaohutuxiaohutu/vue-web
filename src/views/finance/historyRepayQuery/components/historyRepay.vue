<template>
  <div id="historyRepay">
    <div>
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
        <table>
          <tr>
            <td>
              <span class="cRed">*</span>贷款编号：
            </td>
            <td colspan="3">
              <el-form-item prop="loanNo">
                <el-select v-model="form.loanNo" placeholder="请选择" @change="selectChange">
                  <el-option v-for="item in loanNoList" :key="item.accNo" :label="item.accNo" :value="item.accNo"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <span class="cRed">*</span>发放号：
            </td>
            <td colspan="3">
              <el-form-item prop="dstrNo">
                <el-select v-model="form.dstrNo" placeholder="请选择">
                  <el-option v-for="item in dePutNoList" :key="item.accNo" :label="item.accNo" :value="item.accNo"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <span class="cRed">*</span>起止日期：
            </td>
            <td colspan="3">
              <el-form-item prop="beginTime">
                <el-date-picker v-model="form.beginTime" @change="form.beginDate=$tools.utils.formatDate(form.beginTime)" type="date" placeholder="开始日期"></el-date-picker>
              </el-form-item>
              <span>至</span>
              <el-form-item prop="endTime">
                <el-date-picker v-model="form.endTime" @change="form.endDate=$tools.utils.formatDate(form.endTime)" type="date" placeholder="结束日期"></el-date-picker>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </div>
    </div>
    <div class="tableData mt20">
      <div class="pageBreakAfter">
        <el-table :data="tableData" class="printArea">
          <el-table-column label="贷款编号">
            <template scope="scope">
              {{loanNo}}
            </template>
          </el-table-column>
          <el-table-column label="发放号">
            <template scope="scope">
              {{dstrNo}}
            </template>
          </el-table-column>
          <el-table-column label="还款日期" prop="repyData">
            <template scope="scope">
              {{$tools.utils.formatDate(scope.row.repyData,{"symbol":"YYYY-MM-DD"})}}
            </template>
          </el-table-column>
          <!--<el-table-column label="还款期数" prop="periddTms"></el-table-column>-->
          <el-table-column label="还款金额" prop="toalAmt">
            <template scope="scope">
              {{$tools.utils.toDecimalString(scope.row.toalAmt,true,2)}}
            </template>
          </el-table-column>
          <el-table-column label="还款本金" prop="pnpAmt">
            <template scope="scope">
              {{$tools.utils.toDecimalString(scope.row.pnpAmt,true,2)}}
            </template>
          </el-table-column>
          <el-table-column label="还款利息" prop="intAmt">
            <template scope="scope">
              {{$tools.utils.toDecimalString(scope.row.intAmt,true,2)}}
            </template>
          </el-table-column>
          <!--<el-table-column label="逾期利息" prop="address"></el-table-column>
          <el-table-column label="起始日" prop="address"></el-table-column>
          <el-table-column label="到期日" prop="address"></el-table-column>-->
        </el-table>
      </div>
      <!--分页-->
      <div class="pagination tar mt20">
        <el-pagination @current-change="handleCurrentPageChange" :current-page.sync="currentPage" :page-size="turnPageShowNum" layout="total,prev, pager, next, jumper" :total="turnPageTotalNum">
        </el-pagination>
      </div>
      <!--分页--end-->
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="$tools.print()">打印</el-button>
        <el-button type="primary" @click="downLoadExcel()">下载</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'historyRepay',
  components: {

  },
  data() {
    return {
      turnPageTotalNum: 0,
      turnPageShowNum: 10,
      currentPage: 1,
      region: '',
      value6: '',
      form: {
        loanNo: '',
        dstrNo: '',
        beginDate: '',
        endDate: '',
        beginTime: '',
        endTime: '',
      },
      rules: {
        loanNo: [
          { required: true, message: '请选择贷款账号', trigger: 'change' }
        ],
        dstrNo: [
          { required: true, message: '请选择发放号', trigger: 'change' }
        ],
        beginTime: [
          { trigger: 'change', validator: this.$tools.validator.dateCompare, compareList: ['beginTime', 'endTime'], vm: this, formName: 'form' }
        ],
        endTime: [
          { trigger: 'change', validator: this.$tools.validator.dateCompare, compareList: ['beginTime', 'endTime'], vm: this, formName: 'form' }
        ],
      },
      loanNoList: [],//贷款号
      dePutNoList: [],//发放号
      tableData: [],
      branchTableVisible: false,
      loanNo: '',
      dstrNo: '',
      hisRepList: []
    }
  },
  methods: {
    downLoadExcel() {
      let _this = this
      if (_this.hisRepList.length == 0) {
        _this.$alert('暂无数据，不可下载', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
        return
      }
      let hisRepTitleList = [{ loanNo: '贷款编号', dstrNo: '发放号', repyData: '还款日期', toalAmt: '还款金额', pnpAmt: '还款本金', intAmt: '还款利息' }]
      let hisRepDownLoadList = []
      for (let item of _this.hisRepList) {
        hisRepDownLoadList.push({ 'loanNo': _this.loanNo, 'dstrNo': _this.dstrNo, 'repyData': item.repyData, 'toalAmt': item.toalAmt, 'pnpAmt': item.pnpAmt, 'intAmt': item.intAmt })
      }
      let body = []
      body.hisRepTitleList = hisRepTitleList
      body.hisRepDownLoadList = hisRepDownLoadList
      let url = "/coporbank/CB000123.do"
      // let url = "/api/CB000123.do"
      let form = $("<form></form>").attr("action", url).attr("method", "post")
      for (let i in hisRepTitleList) {
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepTitleList[" + i + '][loanNo]').attr("value", hisRepTitleList[i].loanNo))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepTitleList[" + i + '][dstrNo]').attr("value", hisRepTitleList[i].dstrNo))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepTitleList[" + i + '][repyData]').attr("value", hisRepTitleList[i].repyData))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepTitleList[" + i + '][toalAmt]').attr("value", hisRepTitleList[i].toalAmt))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepTitleList[" + i + '][pnpAmt]').attr("value", hisRepTitleList[i].pnpAmt))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepTitleList[" + i + '][intAmt]').attr("value", hisRepTitleList[i].intAmt))
      }
      for (let i in hisRepDownLoadList) {
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepDownLoadList[" + i + '][loanNo]').attr("value", hisRepDownLoadList[i].loanNo))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepDownLoadList[" + i + '][dstrNo]').attr("value", hisRepDownLoadList[i].dstrNo))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepDownLoadList[" + i + '][repyData]').attr("value", hisRepDownLoadList[i].repyData))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepDownLoadList[" + i + '][toalAmt]').attr("value", hisRepDownLoadList[i].toalAmt))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepDownLoadList[" + i + '][pnpAmt]').attr("value", hisRepDownLoadList[i].pnpAmt))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "hisRepDownLoadList[" + i + '][intAmt]').attr("value", hisRepDownLoadList[i].intAmt))
      }
      form.append($("<input></input>").attr("type", "hidden").attr("name", "bsnCode").attr("value", "CB0603"))
      form.append($("<input></input>").attr("type", "hidden").attr("name", "versionNo").attr("value", "1.0"))
      form.append($("<input></input>").attr("type", "hidden").attr("name", "iCIFID").attr("value", _this.$tools.storage.get("user", 'save').iCIFID))
      form.appendTo("body").submit().remove()
    },
    handleCurrentPageChange(val) {
      let _this = this
      _this.currentPage = val
      _this.tableData = _this.hisRepList.filter(function(element, index) {
        return ((_this.currentPage - 1) * _this.turnPageShowNum <= index && index <= _this.currentPage * _this.turnPageShowNum - 1)
      })
    },
    selectChange() {
      let body = {}
      let _this = this
      body.reqTP = 'P'
      body.loanNo = _this.form.loanNo
      _this.$tools.request(this, "CB010104.do", body).then(data => {
        let compare = function(obj1, obj2) {
          let val1 = obj1.accNo
          let val2 = obj2.accNo
          if (val1 < val2) {
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0
          }
        }
        this.dePutNoList = data.body.dePutNoList.sort(compare)
      })
    },
    query() {
      let _this = this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          let body = _this.form
          _this.loanNo = _this.form.loanNo
          _this.dstrNo = _this.form.dstrNo
          _this.$tools.request(this, "CB060400.do", body).then(data => {
            if (data.body.errorCode == '0') {
              _this.hisRepList = data.body.hisRepList
              _this.turnPageTotalNum = _this.hisRepList.length
              _this.handleCurrentPageChange(_this.currentPage)
            } else {
              _this.$alert(data.body.errorMsg, '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.tableData = []
                  _this.hisRepList = []
                  _this.turnPageTotalNum = 0
                }
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });

    },
    resetForm() {
      let _this = this
      _this.$refs['form'].resetFields()
    },
    getAcc() {
      let _this = this
      let body = {}
      body.reqTP = 'D'
      body.cstNo = this.$tools.storage.get("user", "save").hostNo
      _this.$tools.request(this, "CB010104.do", body).then(data => {
        this.loanNoList = data.body.deAccNoList
      })
    }
  },

  mounted() {
    this.getAcc()
  }
}
</script>
<style>
/*@media print {
  .pageBreakAfter {
    page-break-after: avoid !important;
  }
}*/
</style>

