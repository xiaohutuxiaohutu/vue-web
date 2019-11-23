<template>
  <div class="main-content">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <ynet-content id="logQuery" :headerInformation="true" :headerMenu="true" class="functionalArea">
      <h3 class="functionalAreaTitle">查询操作日志</h3>
      <div class="p20">
        <!--table布局-->
        <el-form ref="form" :model="form" class="formEmbedTable" :rules="rules">
          <table>
            <caption>查询条件</caption>
            <tr>
              <td>
                <span class="cRed">*</span>操作类型：</td>
              <td colspan="3">
                <el-form-item prop="bsnCode">
                  <el-select v-model="form.bsnCode" placeholder="请选择操作类型">
                    <el-option v-for="item in bsnCodeList" :key="item.bsnCode" :label="item.bsnName" :value="item.bsnCode"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cRed">*</span>处理结果：</td>
              <td colspan="3">
                <el-form-item prop="errCode">
                  <el-select v-model="form.errCode" placeholder="请选择处理结果">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="失败" value="other"></el-option>
                    <el-option label="成功" value="00000000"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cRed">*</span>操作日期：</td>
              <td>
                <el-form-item prop="startDate">
                  <el-date-picker v-model="form.startDate" @change="form.startTime=$tools.utils.formatDate(form.startDate)" type="date" placeholder="开始日期" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
                <span>至</span>
                <el-form-item prop="endDate">
                  <el-date-picker v-model="form.endDate" @change="form.endTime=$tools.utils.formatDate(form.endDate)" type="date" placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
              </td>
            </tr>
          </table>
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="submitForm(1)">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </div>
        </el-form>
        <!--table布局-->

        <!--日志信息table-->
        <div class="tableData">
          <el-table :data="tableData" class="printArea">
            <el-table-column property="userName" label="用户名"></el-table-column>
            <el-table-column property="createTime" label="操作时间">
              <template scope="scope">
                {{$tools.utils.formatDateSymbol(scope.row.createTime,"YYYY-MM-DD HH:mm:ss")}}
              </template>
            </el-table-column>
            <el-table-column property="bsnCode" label="操作类型">
              <template scope="scope">
                {{getBsnName(scope.row.bsnCode)}}
              </template>
            </el-table-column>
            <el-table-column property="errCode" label="处理结果">
              <template scope="scope">
                <span v-if="scope.row.errCode == '0'||scope.row.errCode == ''||scope.row.errCode == '00000000'">成功</span>
                <span v-else-if="scope.row.errCode != '0'||scope.row.errCode != ''||scope.row.errCode != '00000000'">失败</span>
                <span v-else>----</span>
              </template>
            </el-table-column>
            <el-table-column property="flowNo" label="网银流水号">
              <template scope="scope">
                <span v-if="scope.row.flowNo == ''">----</span>
                <span v-else>{{scope.row.flowNo}}</span>
              </template>
            </el-table-column>
          </el-table>
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
        <!--日志信息table--end-->
      </div>
    </ynet-content>
  </div>
</template>
  
<script>

export default {
  name: 'logQuery',
  components: {},
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      rules: {
        startDate: [
          { trigger: 'change', validator: this.$tools.validator.dateCompare, compareList: ['startDate', 'endDate'], vm: this, formName: 'form' }
        ],
        endDate: [
          { trigger: 'change', validator: this.$tools.validator.dateCompare, compareList: ['startDate', 'endDate'], vm: this, formName: 'form' }
        ]
      },
      bsnCodeList: [
        { bsnCode: "", bsnName: '全部' },
        { bsnCode: 'CB0001', bsnName: '登录' },
        { bsnCode: 'CB0002', bsnName: '退出' },
        { bsnCode: 'CB0201', bsnName: '一站式转账' },
        { bsnCode: 'CB0202', bsnName: '批量转账' },
        { bsnCode: 'CB0303', bsnName: '保证金存入' },
        { bsnCode: 'CB0301', bsnName: '定期存款' },
        { bsnCode: 'CB0302', bsnName: '通知存款' },
        { bsnCode: 'CB0501', bsnName: '行内外汇出汇款' },
        { bsnCode: 'CB040401', bsnName: '资金上划' },
        { bsnCode: 'CB040402', bsnName: '资金下拨' },
        { bsnCode: 'CB040403', bsnName: '内部调拨' },
        { bsnCode: 'CB0402', bsnName: '操作子公司账户转账' },
        { bsnCode: 'CB0502', bsnName: '结购套汇业务' },
        { bsnCode: 'CB0503', bsnName: '进口信用证' },
        { bsnCode: 'CB0505', bsnName: '出口托收' },
        { bsnCode: 'CB0504', bsnName: '保函开立' }
      ],
      form: {
        bsnCode: "",
        errCode: "",
        startDate: '',
        endDate: '',
        startTime: "",
        endTime: ""
      },
      tableData: [],
      currentPage: 1,
      turnPageShowNum: 10,
      turnPageTotalNum: 0
    };
  },
  methods: {
    downLoadExcel() {
      let _this = this
      if (_this.tableData.length == 0) {
        _this.$alert('暂无数据，不可下载', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
        return
      }
      let operLogTitleList = [{ 'userName': '用户名', 'createTime': '操作时间', 'bsnCode': '操作类型', 'errCode': '处理结果', 'flowNo': '网银流水号' }]
      let operLogList = []
      for (let item of _this.tableData) {
        operLogList.push({ 'userName': item.userName, 'createTime': _this.$tools.utils.formatDateSymbol(item.createTime,"YYYY-MM-DD HH:mm:ss"), 'bsnCode': _this.getBsnName(item.bsnCode),
         'errCode': (item.errCode == '0'||item.errCode == ''||item.errCode == '00000000')?'成功':'失败', 'flowNo': item.flowNo })
      }
      let body = []
      body.operLogTitleList = operLogTitleList
      body.operLogList = operLogList
      let url = "/coporbank/CB000123.do"
      // let url = "/api/CB000123.do"
      let form = $("<form></form>").attr("action", url).attr("method", "post")
      for (let i in operLogTitleList) {
        form.append($("<input></input>").attr("type", "hidden").attr("name", "operLogTitleList[" + i + '][userName]').attr("value", operLogTitleList[i].userName))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "operLogTitleList[" + i + '][createTime]').attr("value", operLogTitleList[i].createTime))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "operLogTitleList[" + i + '][bsnCode]').attr("value", operLogTitleList[i].bsnCode))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "operLogTitleList[" + i + '][errCode]').attr("value", operLogTitleList[i].errCode))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "operLogTitleList[" + i + '][flowNo]').attr("value", operLogTitleList[i].flowNo))
      }
      for (let i in operLogList) {
        form.append($("<input></input>").attr("type", "hidden").attr("name", "operLogList[" + i + '][userName]').attr("value", operLogList[i].userName))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "operLogList[" + i + '][createTime]').attr("value", operLogList[i].createTime))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "operLogList[" + i + '][bsnCode]').attr("value", operLogList[i].bsnCode))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "operLogList[" + i + '][errCode]').attr("value", operLogList[i].errCode))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "operLogList[" + i + '][flowNo]').attr("value", operLogList[i].flowNo))
      }
      form.append($("<input></input>").attr("type", "hidden").attr("name", "bsnCode").attr("value", "CB0804"))
      form.append($("<input></input>").attr("type", "hidden").attr("name", "versionNo").attr("value", "1.0"))
      form.append($("<input></input>").attr("type", "hidden").attr("name", "iCIFID").attr("value", _this.$tools.storage.get("user", 'save').iCIFID))
      form.appendTo("body").submit().remove()
    },
    getBsnName(val) {
      let _this = this
      for (let item of _this.bsnCodeList) {
        if (item.bsnCode == val) {
          return item.bsnName
        }
      }
    },
    resetForm() {
      let _this = this
      _this.$refs['form'].resetFields()
    },
    handleCurrentPageChange(val) {
      let _this = this;
      _this.currentPage = val
      _this.submitForm(val)
    },
    submitForm(val) {
      let _this = this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          let body = _this.form
          body.currentPage = val
          body.turnPageShowNum = _this.turnPageShowNum
          _this.$tools.request(_this, "CB080401.do", body).then(
            data => {
              if (data.body.errorCode == '0') {
                _this.turnPageTotalNum = Number(data.body.turnPageTotalNum ? data.body.turnPageTotalNum : 0)
                _this.tableData = data.body.operLogList
              } else {
                _this.turnPageTotalNum = 0
                _this.tableData = []
              }
            })
        } else {
          return false
        }
      });
    },
  },
  mounted() {
    let _this = this

  }
}
</script>
