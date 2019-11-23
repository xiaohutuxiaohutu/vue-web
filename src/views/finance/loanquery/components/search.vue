<template>
  <div class="fourForm tableForm mt20">
    <el-form ref="form" :model="form">
      <el-row>
        <el-form-item label="网银流水号：" class="fullLine" prop="lapFlowNo">
          <el-input v-model="form.lapFlowNo" placeholder="请输入网银流水号"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="审核状态：" class="fullLine" prop="lapAuthStt">
          <el-select v-model="form.lapAuthStt" placeholder="请选择">
            <!--<el-option  label="全部" value=""></el-option>-->
            <el-option v-for="item in $tools.dict.statusTransList" v-if="item.key!='92'" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  components: {
  },
  data() {
    return {
      form: {
        lapFlowNo: '',
        lapAuthStt: '',
        turnPageShowNum: 10,
        startPage: 0,
        endPage: 9,
        currentPage: 1,
      },
    }
  },
  methods: {
    submitForm() {
      let _this = this
      let body = {
        tableData: [],
        turnPageTotalNum: ''
      }
      _this.$tools.request(this, "CB060201.do", _this.form).then(data => {
        if (data.body.errorCode == '0') {
          body.tableData = data.body.loanApplyAuditList
          body.turnPageTotalNum = Number(data.body.turnPageTotalNum)
          _this.$emit("changeStep", "1", $.extend({}, body), _this.form)
        } else {
          _this.$alert(data.body.errorMsg, '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        }

      })
    },
    resetForm() {
      let _this = this
      _this.$refs['form'].resetFields()
    }
  },
  mounted() {
    this.submitForm()
  }
}
</script>
