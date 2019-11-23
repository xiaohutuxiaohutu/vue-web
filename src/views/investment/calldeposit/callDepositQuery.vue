<template>
  <ynet-content id="callDepositQuery" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">通知存款查询</h3>
      <!--内容-->
      <div class="p20">
        <div class="fourForm tableForm mt20">
          <el-form ref="form" :model="form" :rules="rules">
            <el-row>
              <el-form-item label="通知存款账号：" class="fullLine" prop="accNo">
                <el-select v-model="form.accNo" placeholder="请选择" style="width:300px">
                  <el-option v-for="item in options" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </el-form>
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </div>
        </div>

        <!--列表table-->
        <div class="tableData mt20 printArea">
          <el-table :data="tableData" stripe :default-sort="{prop:'depNo',order:'descending'}">
            <el-table-column label="存单编号" width="180" prop="depNo">
              <template scope="scope">
                <span>
                  <a class="cOrange" @click="queryDetail(scope.row)">{{scope.row.depNo}}</a>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="存款金额" prop="accBalance">
              <template scope="scope">
                {{$tools.utils.toDecimalString(scope.row.accBalance,true,2)}}
              </template>
            </el-table-column>
            <el-table-column label="通知类型" prop="accTp">
              <template scope="scope">
                <span>{{$tools.dict.callType(scope.row.accTp)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="币种" prop="CRY">
              <template scope="scope">
                <span>{{$tools.dict.CRYTrans(scope.row.CRY)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="起息日" prop="openAccDate">
              <template scope="scope">
                {{$tools.utils.formatDate(scope.row.openAccDate,{"symbol":"YYYY-MM-DD"})}}
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="accState">
              <template scope="scope">
                <span v-if="scope.row.accState=='A'">正常</span>
                <span v-if="scope.row.accState!='A'">异常</span>
              </template>
            </el-table-column>
            <el-table-column label="开通渠道" prop="transChannel">
              <template scope="scope">
                <span v-if="scope.row.transChannel=='MT'">柜台</span>
                <span v-if="scope.row.transChannel!='MT'">网银</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--列表table end-->
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="$tools.print()">打印</el-button>
          <el-button type="primary" @click="download">下载</el-button>
        </div>

        <!--分页-->
        <div class="pagination tar mt20">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="Number(turnPageTotalNum)">
          </el-pagination>
        </div>
        <!--分页--END-->
      </div>
      <!--内容end-->
      <!-- 溫馨提示 -->
      <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
      <!-- 溫馨提示end -->
    </div>
    <!--弹窗-->
    <el-dialog title="通知存款存单明细" :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <callDepositDetail :detailMsg="detailData"></callDepositDetail>
      <div slot="footer" class="el-dialog__footer btnArea">
        <el-button @click="dialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
    <!--弹窗end-->

  </ynet-content>
</template>

<script>
import callDepositDetail from './components/callDepositDetail'
export default {
  name: 'callDepositQuery',
  components: {
    callDepositDetail
  },
  data() {
    return {
      warmTips: [
        '1.您可查询到您全部通知存款账号下，所有存单的详细信息；',
        '2.本模块仅受理人民币项下业务，暂不支持外币处理，不便之处，敬请见谅。',
      ],
      loginStorage: this.$tools.storage.get("user", "save"),
      form: {
        accNo: '',
        hostNo: this.$tools.storage.get("user", "save").hostNo
      },
      rules: {
        accNo: [
          { required: true, message: '请选择账号', trigger: 'change' }
        ],
      },
      options: [],      //定期账号列表
      currentPage: 1,
      pageSize: 10,
      startPage: 0,
      endPage: 9,
      turnPageTotalNum: 0,
      storageData: [],       //所有数据
      tableData: [],       //当前页数据
      dialogVisible: false,
      detailData: {}
    };
  },
  mounted() {
    let _this = this
    let _options = _this.loginStorage.operAccInfoList
    _this.options = _options.filter(_this.checkOptionsArray)
    // _this.options = [{accNo:'8900001090001701',accName:'aew2w3',currType:'CNY'}]
  },
  methods: {
    checkOptionsArray(option) {
      return option.coreType == '280' && option.cstNo == this.loginStorage.cstNo
    },
    query() {
      let _this = this
      _this.storageData = []
      _this.tableData = []
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          _this.$tools.request(_this, "CB030206.do", _this.form).then(
            data => {
              _this.storageData = data.body.acctNoList
              if (_this.storageData != '' && _this.storageData != undefined) {
                _this.turnPageTotalNum = _this.storageData.length
                _this.handleCurrentChange(1)
              }
            })
        }
      })
    },
    queryDetail(val) {
      let _this = this
      _this.detailData = val
      _this.dialogVisible = !_this.dialogVisible
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCurrentChange(val) {
      let _this = this
      _this.currentPage = val
      _this.startPage = (_this.currentPage - 1) * _this.pagesize
      _this.endPage = _this.currentPage * _this.pagesize - 1
      _this.tableData = _this.storageData.slice((_this.currentPage - 1) * _this.pageSize, _this.currentPage * _this.pageSize)
      //console.log(`当前页: ${val}`)
    },
    download() {
      let _this = this
      if (_this.tableData.length <= 0) {
        _this.$alert("暂无数据，不可下载", "温馨提示")
      } else {
        let callDepTitleList = [{ depNo: '存单编号', transAmount: '存款本金', accTp: '通知类型', CRY: '币种', valDt: '起息日', status: '状态', channel: '开通渠道' }]
        let url = "/api/CB030212.do"
        // let url = "/corporbank/CB030212.do"
        let form = $("<form></form>").attr("action", url).attr("method", "post")
        form.append($("<input></input>").attr("type", "hidden").attr("name", "versionNo").attr("value", "0.1"))
        form.append($("<input></input>").attr("type", "hidden").attr("name", "iCIFID").attr("value", _this.loginStorage.iCIFID))
        for (let i in _this.tableData) {
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDetailList[" + i + "][depNo]").attr("value", _this.tableData[i].depNo))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDetailList[" + i + "][transAmount]").attr("value", _this.$tools.utils.toDecimalString(_this.tableData[i].accBalance, true, 2)))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDetailList[" + i + "][accTp]").attr("value", _this.$tools.dict.callType(_this.tableData[i].accTp)))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDetailList[" + i + "][CRY]").attr("value", _this.$tools.dict.CRYTrans(_this.tableData[i].CRY)))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDetailList[" + i + "][valDt]").attr("value", _this.$tools.utils.formatDate(_this.tableData[i].openAccDate, { "symbol": "YYYY-MM-DD" })))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDetailList[" + i + "][status]").attr("value", _this.tableData[i].accState == 'A' ? '正常' : '冻结'))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDetailList[" + i + "][channel]").attr("value", _this.tableData[i].transChannel == 'MT' ? '柜台' : '网银'))
        }
        for (let i in callDepTitleList) {
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDepTitleList[" + i + "][depNo]").attr("value", callDepTitleList[i].depNo))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDepTitleList[" + i + "][transAmount]").attr("value", callDepTitleList[i].transAmount))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDepTitleList[" + i + "][accTp]").attr("value", callDepTitleList[i].accTp))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDepTitleList[" + i + "][CRY]").attr("value", callDepTitleList[i].CRY))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDepTitleList[" + i + "][valDt]").attr("value", callDepTitleList[i].valDt))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDepTitleList[" + i + "][status]").attr("value", callDepTitleList[i].status))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "callDepTitleList[" + i + "][channel]").attr("value", callDepTitleList[i].channel))
        }
        form.appendTo("body").submit().remove()
      }
    }
  }
}
</script>