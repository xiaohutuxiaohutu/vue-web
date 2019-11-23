<template>
  <div class="check">
    <el-table :data="tableData1" class="mb40">
      <el-table-column label="网银批次号" prop="num"></el-table-column>
      <el-table-column label="交易总笔数" prop="total"></el-table-column>
      <el-table-column label="总金额" prop="money"></el-table-column>
      <el-table-column label="交易类型" prop="type"></el-table-column>
      <el-table-column label="提交日期" prop="date"></el-table-column>
    </el-table>
    <el-table :data="tableData2" class="mb40">
      <el-table-column label="序列号" prop="num"></el-table-column>
      <el-table-column label="付款账号" prop="total"></el-table-column>
      <el-table-column label="收款账号" prop="money"></el-table-column>
      <el-table-column label="收款户名" prop="type"></el-table-column>
      <el-table-column label="金额" prop="date"></el-table-column>
      <el-table-column label="用途" prop="use"></el-table-column>
    </el-table>
    <div class="block tar">
      <el-pagination layout="prev, pager, next" :total="50">
      </el-pagination>
    </div>
    <div class="btnArea mt20 tac">
      <el-button type="primary">同意</el-button>
      <el-button type="primary" @click="rejectdialogVisible=true">拒绝</el-button>
      <el-button @click="lastStep">返回</el-button>
    </div>
    <!--拒绝弹窗-->
    <el-dialog title="拒绝原因" :visible.sync="rejectdialogVisible" v-if="rejectdialogVisible" size=tiny :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="form" :model="form">
        <el-form-item label="">
          <el-input type="textarea" v-model="form.desc" style="100px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer btnArea tac">
        <el-button type="primary" @click="rejectdialogVisible=false">确认</el-button>
        <el-button @click="rejectdialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
    <!--拒绝end弹窗-->
  </div>
</template>
<script>
export default {
  name: 'stayCheckTable3',
  components: {

  },
  data() {
    return {
      tableData2: [
        {
          num: '1',
          total: "555555",
          money: "8888888888888",
          type: '交易类型',
          date: "提交日期",
          use: "3"
        }
      ],
      tableData1: [
        {
          num: '123456',
          total: 20,
          money: 12345,
          type: '转账',
          date: "2017-23-10"
        }
      ],
      rejectdialogVisible: false,
      form: {
        desc: ""
      }
    }
  },
  methods: {
    handleClick(a) {
      let _this = this
      let index = "ATS11003"
      let inde = ".do"
      let act = a.code + inde
      console.log(act)
      _this.$tools.request(this, act).then(data => {
        _this.$emit("goStepPage", [1, _this.form])
      })

    },
    getList() {
      let _this = this
      _this.$tools.request(this, "BUS")
    },
    lastStep() {
      let _this = this
      _this.$emit("changeStep", [2])
    }
  },
  mounted() {

  }
}
</script>
