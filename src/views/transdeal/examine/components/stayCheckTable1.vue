<template>
  <div class="tableData">
    <el-table :data="tableData">
      <el-table-column label="交易类型">
        <template scope="scope">
          <el-button type="text" @click="handleClick(scope.row)">{{$tools.dict.funTransType(scope.row.atqBsnCode)}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="atqTotal" label="笔数">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'stayCheckTable1',
  components: {

  },
  data() {
    return {
      form: {
        eCIFID: '',
        cstNo: '',
        bsnCode: '',
        currentPage: '',
        turnPageShowNum: '',
      },
      tableData: []
    }
  },
  methods: {
    handleClick(formData) {
      let _this = this
      let form = {}
      form.currentPage = 1
      form.turnPageShowNum = 10
      form.bsnCode = formData.atqBsnCode
      form.status = '00'
      let bsnCode = formData.atqBsnCode
      if (form.bsnCode == 'CB050101') {
        form.inrOrOut = 0
      } else if (form.bsnCode == 'CB050102') {
        form.inrOrOut = 1
      }
      _this.$tools.request(_this, _this.$tools.dict.selectAction(bsnCode), form).then(data => {
        if (data.body.errorCode == '0') {
          if (form.bsnCode == 'CB050202') {
            _this.$emit("changeStep", [2, { "authList": data.body.exchangeInfoList, "turnPageTotalNum": data.body.turnPageTotalNum }, bsnCode])
          } else if (form.bsnCode == 'CB0405') {
            _this.$emit("changeStep", [2, { "authList": data.body.cashSweepAuthList, "turnPageTotalNum": data.body.turnPageTotalNum }, bsnCode])
          } else {
            _this.$emit("changeStep", [2, data.body, bsnCode])
          }
        } else {
          this.$alert(data.body.errorMsg, '提示', {
            confirmButtonText: '确定'
          });
        }
      })
    },
    getList() {
      let _this = this
      let form = {}
      _this.$tools.request(this, "CB070105.do", form).then(data => {
        let list = data.body.atqList
        for (var name in list) {
          _this.tableData.push(list[name])
        }
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>