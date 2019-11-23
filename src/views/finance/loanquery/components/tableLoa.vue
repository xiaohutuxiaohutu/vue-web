<template>
  <div class="tableData printArea">
    <el-table :data="this.formData.tableData" style="width: 100%">
      <el-table-column label="网银流水号" width="180">
        <template scope="scope">
          <a class="cOrange" @click="submitClick(scope.row)">{{ scope.row.sequenceNo }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="cstName" label="企业名称" width="180">
      </el-table-column>
      <el-table-column prop="loanAmount" label="申请贷款金额">
        <template scope="scope">
          {{$tools.utils.toDecimalString(scope.row.loanAmount,true,2)}}
        </template>
      </el-table-column>
      <el-table-column prop="loanDate" label="申请贷款期限">
      </el-table-column>
      <el-table-column prop="loanUsed" label="贷款用途">
      </el-table-column>
      <el-table-column prop="assuseMeans" label="可提供担保方式">
      </el-table-column>
      <el-table-column prop="stt" label="状态">
        <template scope="scope">
          <span style="margin-left: 10px">{{ $tools.dict.statusTrans(scope.row.stt)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pagination tar mt20">
      <el-pagination @current-change="handleCurrentChange" :current-page="form.currentPage" :page-size="form.turnPageShowNum" layout="total, prev, pager, next, jumper" :total="Number(this.formData.turnPageTotalNum)">
      </el-pagination>
    </div>
    <!--分页end-->
  </div>
</template>

<script>
export default {
  name: 'tableLoa',
  components: {

  },
  data() {
    return {
      tableData: [],
      form: {
        turnPageShowNum: 10,
        startPage: 0,
        endPage: 9,
        currentPage: 1,
        cstNo: this.$tools.storage.get("user", "save").cstNo,
        lapFlowNo: '',
        lapAuthStt: '',
      },
      turnPageTotalNum: 0,
    }
  },
  props: {
    formData: { type: Object, default: {} },
    subform: { type: Object, default: {} },
  },
  methods: {
    submitClick(val) {
      let _this = this
      console.log(val, 'val')
      _this.$emit("CBstep", "2", val)
    },
    submitForm(changePage) {
      let _this = this
      if (changePage) {
        _this.form.currentPage = changePage
        _this.form.pagesize = 10
        _this.form.startPage = (_this.form.currentPage - 1) * _this.form.turnPageShowNum
        _this.form.endPage = _this.form.currentPage * _this.form.turnPageShowNum - 1
      } else {
        _this.form.currentPage = 1
        _this.form.startPage = 0
        _this.form.endPage = 9
      }
      _this.requestTableList()
    },
    handleCurrentChange(currentPage) {
      let _this = this
      _this.submitForm(currentPage)
    },
    requestTableList() {
      let _this = this
      _this.form.lapFlowNo = _this.subform.lapFlowNo
      _this.form.lapAuthStt = _this.subform.lapAuthStt
      _this.$tools.request(this, "CB060201.do", _this.form).then(data => {
        if (data.body.errorCode == '0') {
          _this.formData.tableData = data.body.loanApplyAuditList
        } else {
          _this.$alert(data.body.errorMsg, '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
              _this.formData.tableData = []
            }
          })
        }
      })

    },
  },
  mounted() {

  }
}
</script>