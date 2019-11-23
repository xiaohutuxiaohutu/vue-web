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
      <el-button type="primary" @click="submitForm()">查询</el-button>
      <el-button @click="resetForm(form)">重置</el-button>
    </div>

    <div class="tableData">
      <el-table :data="tableData">
        <el-table-column prop="loanNo" label="贷款号"></el-table-column>
        <el-table-column prop="dstrNo" label="发放号"></el-table-column>
        <el-table-column prop="CRY" label="币种"></el-table-column>
        <el-table-column prop="loanPnpExpdAmt" label="逾期本金"></el-table-column>
        <el-table-column prop="loanIntExpdAmt" label="逾期利息"></el-table-column>
        <el-table-column prop="unbilledInt" label="未出单利息"></el-table-column>
        <el-table-column prop="unbilledAmtTotal" label="未出单总额"></el-table-column>
        <el-table-column prop="cstNo" label="借款客户号"></el-table-column>
        <el-table-column prop="cstNm" label="借款客户名称"></el-table-column>
      </el-table>
      <div class="btnArea mt5 tac">
        <!--<el-button type="primary" @click="dialogTotalVisible = true">贷款欠款总额</el-button>-->
        <el-button type="primary" @click="dialogDetailVisible = true" v-if="detailTableData.length>0">贷款欠款明细</el-button>
      </div>
    </div>

    <el-dialog title="欠款贷款总额" :visible.sync="dialogTotalVisible">
      <el-form ref="form" :model="formTotal" :rules="rules" class="formEmbedTable">
        <table>
          <tr>
            <td>贷款编号：</td>
            <td>
              <el-form-item prop="input1"></el-form-item>
            </td>
            <td>币种：</td>
            <td>
              <el-form-item prop="input1">{{$tools.dict.CRYTrans()}}</el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20">
        <table>
          <tr>
            <td colspan='2' class="tac">
              <el-form-item prop="input1">逾期情况</el-form-item>
            </td>
            <td colspan='2' class="tac">
              <el-form-item prop="input1">应还情况</el-form-item>
            </td>
          </tr>
          <tr>
            <td>本金：</td>
            <td>
              <el-form-item prop="input1"></el-form-item>
            </td>
            <td>本金：</td>
            <td>
              <el-form-item prop="input1"></el-form-item>
            </td>
          </tr>
          <tr>
            <td>利息：</td>
            <td>
              <el-form-item prop="input1"></el-form-item>
            </td>
            <td>利息：</td>
            <td>
              <el-form-item prop="input1"></el-form-item>
            </td>
          </tr>
          <tr>
            <td>费用：</td>
            <td>
              <el-form-item prop="input1"></el-form-item>
            </td>
            <td>费用：</td>
            <td>
              <el-form-item prop="input1"></el-form-item>
            </td>
          </tr>
          <tr>
            <td>币合计：</td>
            <td>
              <el-form-item prop="input1"></el-form-item>
            </td>
            <td>币合计：</td>
            <td>
              <el-form-item prop="input1"></el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTotalVisible = false">返 回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="欠款贷款明细" :visible.sync="dialogDetailVisible">
      <div class="tableData">
        <el-table :data="detailTableData">
          <el-table-column property="dstrNo" label="发放号"></el-table-column>
          <!--<el-table-column property="peeNo" label="费用编号"></el-table-column>-->
          <el-table-column property="invTo" label="单据类型">
            <template scope="scope">
              <span v-if="scope.row.invTo=='PRI'">本金</span>
              <span v-if="scope.row.invTo=='INT'">利息</span>
              <span v-if="scope.row.invTo=='ODI'">复利</span>
              <span v-if="scope.row.invTo=='ODP'">罚息</span>
              <span v-if="scope.row.invTo=='FEE'">费用</span>
            </template>
          </el-table-column>
          <el-table-column property="CRY" label="币种"></el-table-column>
          <el-table-column property="invAmt" label="出单金额">
            <template scope="scope">
              {{$tools.utils.toDecimalString(scope.row.invAmt,true,2)}}
            </template>
          </el-table-column>
          <el-table-column property="tranDate" label="出单日期">
            <template scope="scope">
              {{$tools.utils.formatDateSymbol(scope.row.tranDate)}}
            </template>
          </el-table-column>
          <el-table-column property="outstandingAmt" label="应收未收金额">
            <template scope="scope">
              {{$tools.utils.toDecimalString(scope.row.outstandingAmt,true,2)}}
            </template>
          </el-table-column>
          <!--<el-table-column property="debitNote" label="借款方凭证"></el-table-column>-->
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailVisible = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'overdue',
  components: {

  },
  data() {
    return {
      tableData: [],
      detailTableData: [],
      branchTableVisible: false,
      dialogTotalVisible: false,
      dialogDetailVisible: false,
      form: {
        loanNo: '',
        dstrNo: '',
      },
      formTotal: {},
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
    }
  },
  methods: {
    selectChange() {
      let _this = this
      if (_this.form.loanNo) {
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
      }
    },
    submitForm() {
      let _this = this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          let body = _this.form
          _this.$tools.request(this, "CB060501.do", body).then(data => {
            if (data.body.errorCode == '0') {
              _this.tableData = data.body.loanAbsInfoList
            } else {
              _this.tableData = []
            }
            _this.$tools.request(this, "CB060502.do", body).then(data => {
              if (data.body.errorCode == '0') {
                _this.detailTableData = data.body.loanAbsDtl
              }
              // else {
              //   _this.$alert(data.body.errorMsg, '温馨提示', {
              //     confirmButtonText: '确定',
              //     callback: action => {
              //       _this.detailTableData = []
              //     }
              //   })
              // }
            })
          })
        } else {
          console.log("error")
        }
      })
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
