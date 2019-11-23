<template>
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
      </table>
    </el-form>
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submit">查询</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </div>

    <div class="formEmbedTable mt20">
      <table>
        <caption>贷款基本信息</caption>
        <tr>
          <td>借款人客户号</td>
          <td>{{brwId}}</td>
          <td>借款人名称</td>
          <td>{{brwNm}}</td>
        </tr>
        <tr>
          <td>可发放贷款金额</td>
          <td>{{$tools.utils.toDecimalString(dstrLoanLmt,true,2)}}</td>
          <!--{{dstrLoanLmt}}-->
          <td>币种</td>
          <td>{{crY?$tools.dict.currTypeDict(crY):''}}</td>
        </tr>
        <tr>
          <td>累积发放金额</td>
          <!--<td>{{cmltDstrAmt}}</td>-->
          <td>{{$tools.utils.toDecimalString(cmltDstrAmt,true,2)}}</td>
          <td>发放余额</td>
          <td>{{dstrAmt}}</td>
        </tr>
      </table>
    </div>

    <div class="tableForm mt40">
      <h3>还款明细</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="amtType" label="金额类型">
        </el-table-column>
        <el-table-column prop="expDate" label="到期日期">
          <template scope="scope">
            {{$tools.utils.formatDateSymbol(scope.row.expDate)}}
          </template>
        </el-table-column>
        <el-table-column prop="expdAmt" label="到期金额">
          <template scope="scope">
            {{$tools.utils.toDecimalString(scope.row.expdAmt,true,2)}}
          </template>
        </el-table-column>
        <el-table-column prop="uncldRecdAmt" label="未回收金额">
          <template scope="scope">
            {{$tools.utils.toDecimalString(scope.row.uncldRecdAmt,true,2)}}
          </template>
        </el-table-column>
        <el-table-column prop="recdAmt" label="已回收金额">
          <template scope="scope">
            {{$tools.utils.toDecimalString(scope.row.recdAmt,true,2)}}
          </template>
        </el-table-column>
        <el-table-column prop="acmAmt" label="累计金额">
          <template scope="scope">
            {{$tools.utils.toDecimalString(scope.row.acmAmt,true,2)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagination tar mt20" v-if='turnPageTotalNum>turnPageShowNum'>
      <el-pagination @current-change="handleCurrentPageChange" :current-page.sync="currentPage" :page-size="turnPageShowNum" layout="total,prev, pager, next, jumper" :total="turnPageTotalNum">
      </el-pagination>
    </div>
    <!--分页--end-->
  </div>
</template>

<script>

export default {
  name: 'table',
  components: {

  },
  data() {
    return {
      currentPage: 1,
      turnPageShowNum: 10,
      turnPageTotalNum: 1,
      form: {
        loanNo: '',
        dstrNo: '',
      },
      rules: {
        loanNo: [
          { required: true, message: '请选择贷款账号', trigger: 'change' }
        ],
        dstrNo: [
          { required: true, message: '请选择发放号', trigger: 'change' }
        ],
      },
      loanNoList: [],//贷款号
      dePutNoList: [],//发放号
      repPlnArray: [],
      tableData: [],
      branchTableVisible: false,
      brwId: "",
      brwNm: "",
      cmltDstrAmt: "",
      crY: "",
      dstrAmt: "",
      dstrLoanLmt: ""
    }
  },
  methods: {
    resetForm() {
      let _this = this
      _this.$refs['form'].resetFields()
    },
    handleCurrentPageChange(val) {
      let _this = this
      _this.currentPage = val
      _this.tableData = _this.repPlnArray.filter(function(element, index) {
        return ((_this.currentPage - 1) * _this.turnPageShowNum <= index && index <= _this.currentPage * _this.turnPageShowNum - 1)
      })
    },
    selectChange() {
      let _this = this
      let body = {}
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
    submit() {
      var _this = this;
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          let body = _this.form
          body.loanAcctNo = _this.form.loanNo
          // body.loanAcctNo = 'L01888800000004'
          // body.dstrNo = '4'
          _this.$tools.request(this, "CB060401.do", body).then(data => {
            if (data.body.errorCode == '0') {
              _this.repPlnArray = data.body.repPlnArray
              _this.brwId = data.body.brwId
              _this.brwNm = data.body.brwNm
              _this.cmltDstrAmt = data.body.cmltDstrAmt
              _this.crY = data.body.crY
              _this.dstrAmt = data.body.dstrAmt
              _this.dstrLoanLmt = data.body.dstrLoanLmt
              _this.turnPageTotalNum = _this.repPlnArray.length
              _this.handleCurrentPageChange(_this.currentPage)
            } else {
              _this.$alert(data.body.errorMsg, '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.tableData = []
                  _this.repPlnArray = []
                  _this.brwId = ''
                  _this.brwNm = ''
                  _this.cmltDstrAmt = ''
                  _this.crY = ''
                  _this.dstrAmt = ''
                  _this.dstrLoanLmt = ''
                  _this.turnPageTotalNum = 0
                }
              });
            }
          })
        } else {
          console.log("error")
        }
      })

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

