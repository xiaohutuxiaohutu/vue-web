<template>
  <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <div class="contentTab">
        <a href="#/accmanager/accquery/balancequeryMain">活期存款</a>
        <a href="#/accmanager/accquery/fixed">定期存款</a>
        <a href="javascript:;" class="current">保证金</a>
      </div>
      <div class="p20">
        <!--列表table-->
        <div class="tableData mt20">
          <el-table :data="perTableData" stripe>
            <el-table-column label="账号" prop="accNo" width="180">
              <template scope="scope">
                <span>
                  <a class="cOrange" @click="queryDetail(Number(scope.$index)+(currentPage-1)*pageSize)">{{scope.row.accNo}}</a>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="账户名称" prop="accName"></el-table-column>
            <el-table-column label="账户别名" prop="alias"></el-table-column>
            <!--    <el-table-column  label="账面余额" prop="stmtBal"></el-table-column> -->
            <el-table-column label="账户余额" prop="stmtBal"></el-table-column>
            <el-table-column label="存期" prop="depTerm"></el-table-column>
            <el-table-column label="利率" prop="accRate"></el-table-column>
            <el-table-column label="币种" prop="moneyTp"></el-table-column>
            <el-table-column label="到期日期" prop="expDate"></el-table-column>
            <el-table-column label="状态" prop="accState"></el-table-column>
          </el-table>
          <div class="tar mt10" v-if='totalsize > 0'>
            <span style="color:#f18e00;">汇总&nbsp&nbsp&nbsp&nbsp</span>
            <span style="color:#f18e00;" v-if="this.cny_balance != 0.00">人民币：{{cny_balance}}</span>
            <span style="color:#f18e00;" v-if="this.hkd_balance != 0.00">港币：{{hkd_balance}}</span>
            <span style="color:#f18e00;" v-if="this.usd_balance != 0.00">美元：{{usd_balance}}</span>
            <span style="color:#f18e00;" v-if="this.eur_balance != 0.00">欧元：{{eur_balance}}</span>
            <span style="color:#f18e00;" v-if="this.gbp_balance != 0.00">英镑：{{gbp_balance}}</span>
            <span style="color:#f18e00;" v-if="this.jpy_balance != 0.00">日元：{{jpy_balance}}</span>
            <span style="color:#f18e00;" v-if="this.sgd_balance != 0.00">新币：{{sgd_balance}}</span>
          </div>
          <!--分页-->
          <div class="block mt30 tar" v-if="page_change">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="prev, pager, next, jumper" :total="totalsize">
            </el-pagination>
          </div>
          <!--分页end-->
          <!--弹窗-->
          <el-dialog title="存单详细信息" :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form class="formEmbedTable" id="detail_dialog">
              <div class="tableData p20">
                <table>
                  <tr>
                    <td>账户：</td>
                    <td>
                      <el-form-item>
                        {{detailData.accNo}}
                      </el-form-item>
                    </td>
                    <td>账户类型：</td>
                    <td>
                      <el-form-item>
                        {{detailData.accTypeDesc}}
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>账户名称：</td>
                    <td>
                      <el-form-item>
                        {{detailData.accName}}
                      </el-form-item>
                    </td>
                    <td>账户性质：</td>
                    <td>
                      <el-form-item>
                        {{$tools.dict.accNoAttrType(detailData.accAttr)}}
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>账户余额：</td>
                    <td>
                      <el-form-item>
                        {{detailData.stmtBal}}
                      </el-form-item>
                    </td>
                    <td>币种：</td>
                    <td>
                      <el-form-item>
                        {{detailData.moneyTp}}
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>可用余额：</td>
                    <td>
                      <el-form-item>
                        {{detailData.avlBal}}
                      </el-form-item>
                    </td>
                    <td>开户日期：</td>
                    <td>
                      <el-form-item>
                        {{detailData.openAccDate}}
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>冻结金额：</td>
                    <td>
                      <el-form-item>
                        {{detailData.freezeBal}}
                      </el-form-item>
                    </td>
                    <td>到期日：</td>
                    <td>
                      <el-form-item>
                        {{detailData.expDate}}
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>状态：</td>
                    <td>
                      <el-form-item>
                        {{detailData.accState}}
                      </el-form-item>
                    </td>
                    <td>开户网点：</td>
                    <td>
                      <el-form-item>
                        {{detailData.openAccOrg}}
                      </el-form-item>
                    </td>
                  </tr>
                     <tr>
                    <td>利率：</td>
                    <td>
                      <el-form-item>
                        {{detailData.accRate}}
                      </el-form-item>
                    </td>
                    <td></td>
                    <td>
                      <el-form-item>
                      </el-form-item>
                    </td>
                  </tr>
                </table>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer btnArea tac">
              <el-button @click="dialogVisible=false">关闭</el-button>
            </div>
          </el-dialog>
          <!--弹窗end-->
        </div>
        <!--列表table end-->
        <!-- 溫馨提示 -->
        <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
        <!-- 溫馨提示end -->
      </div>
    </div>
  </ynet-content>
</template>

<script>  

export default {
  name: 'bond',
  components: {

  },
  data() {
    return {
      warmTips: [
        '1.活期账户：显示本企业加挂在网银的全部活期账户；',
        '2.定期/通知存款账户：显示本企业加挂在网银的全部定期、通知存款账户；',
        '3.保证金账户：显示本企业加挂在网银的人民币活期、定期保证金账户。',
      ],
      user: this.$tools.storage.get("user", "save"),
      stepIndex: 0,
      formData: {},
      cny_balance: '',
      hkd_balance: '',
      usd_balance: '',
      eur_balance: '',
      gbp_balance: '',
      jpy_balance: '',
      sgd_balance: '',
      tableData: [{}],
      perTableData: [{}],
      detailData: {},
      dialogVisible: false,
      page_change: false,
      currentPage: 1,
      pageSize: 10,
      totalsize: 0,
    }
  },
  methods: {
    queryBalance() {
      let _this = this
      let _list = _this.user
      let _operAccInfoList = _list.operAccInfoList
      _this.$tools.request(_this, "CB0101013.do").then(
        data => {
          if ('0' == data.body.errorCode) {
            _this.cny_balance = _this.$tools.utils.currencyFormat(data.body.cny_balance)	//		人民币金额汇总
            _this.hkd_balance = _this.$tools.utils.currencyFormat(data.body.hkd_balance)	//		港元金额汇总
            _this.usd_balance = _this.$tools.utils.currencyFormat(data.body.usd_balance)	//		美元金额汇总
            _this.eur_balance = _this.$tools.utils.currencyFormat(data.body.eur_balance)	//		欧元金额汇总
            _this.gbp_balance = _this.$tools.utils.currencyFormat(data.body.gbp_balance)	//		英镑金额汇总
            _this.jpy_balance = _this.$tools.utils.currencyFormat(data.body.jpy_balance)	//		日元金额汇总
            _this.sgd_balance = _this.$tools.utils.currencyFormat(data.body.sgd_balance)	//		新加坡币金额汇总
            _this.tableData = data.body.accNoInfoList
            _this.totalsize = _this.tableData.length
            for (let i = 0; i < _this.totalsize; i++) {
              for (let j = 0; j < _operAccInfoList.length; j++) {
                if (_operAccInfoList[j].accNo == _this.tableData[i].accNo) {
                  if ('' == _operAccInfoList[j].alias) {
                    _this.tableData[i].alias = _this.tableData[i].accName
                  } else {
                    _this.tableData[i].alias = _operAccInfoList[j].alias
                  }
                }
              }
              _this.tableData[i].openAccDate = _this.$tools.utils.formatDateSymbol(_this.tableData[i].openAccDate, "YYYY-MM-DD")
              _this.tableData[i].expDate = _this.$tools.utils.formatDateSymbol(_this.tableData[i].expDate, "YYYY-MM-DD")
              _this.tableData[i].moneyTp = _this.formatCurrency(_this.tableData[i].moneyTp)
              _this.tableData[i].accState = _this.formatAccState(_this.tableData[i].accState)
              _this.tableData[i].avlBal = _this.$tools.utils.currencyFormat(_this.tableData[i].avlBal)
              _this.tableData[i].stmtBal = _this.$tools.utils.currencyFormat(_this.tableData[i].stmtBal)
              if ('C' == _this.tableData[i].depositType) {   //是活期保证金
                _this.tableData[i].depTerm = "--"
                _this.tableData[i].expDate = "--"
                _this.tableData[i].accRate = "--"
              }
              if ('T' == _this.tableData[i].depositType) {   //是定期保证金
                _this.tableData[i].avlBal = "--"
                _this.tableData[i].depTerm = _this.formatNumToChar(_this.tableData[i].depTerm) + _this.formatDepTermType(_this.tableData[i].depTermType)
              }
            }
            if (_this.totalsize > _this.pageSize) {
              _this.page_change = true
              _this.handleCurrentChange(1)
            } else {
              _this.perTableData = _this.tableData
            }
          } else {

          }
        }
      )
    },
    changeStep(index, formData) {
      let _this = this
      _this.stepIndex = Number(index)
      if (formData) _this.formData = formData
      _this.$tools.scrollTop()
    },
    withdraw() {
      let _this = this
      _this.$router.push('./accdetail')
    },
    queryDetail(index) {
      console.log("index", index)
      let _this = this
      _this.dialogVisible = !_this.dialogVisible
      _this.detailData = _this.tableData[index]
      let queryData = {}
      queryData.brhId = _this.detailData.openAccOrg
      _this.$tools.request(_this, "CB060107.do", queryData).then(
        data => {
          if ('0' == data.body.errorCode) {
            _this.detailData.openAccOrg = data.body.brhName
          } else {

          }
        }
      )
      _this.detailData.freezeBal = _this.$tools.utils.currencyFormat(_this.detailData.freezeBal)
    },
    //翻页
    handleCurrentChange(currentPage) {
      let _this = this
      let _firstIndex = (currentPage - 1) * _this.pageSize
      let _lastIndex = currentPage * _this.pageSize
      _this.perTableData = _this.tableData.slice(_firstIndex, _lastIndex)
      _this.currentPage = currentPage
    },
    //账户状态
    formatAccState(value) {
      if ('A' == value) return '正常'
      if ('C' == value) return '已销户'
      if ('D' == value) return '不动户'
      if ('H' == value) return '预开户'
      if ('N' == value) return '新开户'
      if ('P' == value) return '待激活'
      if ('S' == value) return '久悬户'
    },
    //币种
    formatCurrency(value) {
      if ('CNY' == value) return '人民币'
      if ('HKD' == value) return '港元'
      if ('USD' == value) return '美元'
      if ('EUR' == value) return '欧元'
      if ('GBP' == value) return '英镑'
      if ('JPY' == value) return '日元'
      if ('SGD' == value) return '新加坡币'
    },
    //存期类型
    formatDepTermType(value) {
      if ('Y' == value) return '年'
      if ('M' == value) return '个月'
      if ('D' == value) return '日'
    },
    formatNumToChar(value) {
      if ('0' == value) return '零'
      if ('1' == value) return '一'
      if ('2' == value) return '两'
      if ('3' == value) return '三'
      if ('4' == value) return '四'
      if ('5' == value) return '五'
      if ('6' == value) return '六'
      if ('7' == value) return '七'
      if ('8' == value) return '八'
      if ('9' == value) return '九'
    },

  },
  mounted() {
    let _this = this
    _this.queryBalance()
  },

}

</script>
<style>
.reminder {
  text-align: left;
  margin-top: 20px
}

.remiContent {
  text-indent: 35px
}

#detail_dialog td:nth-child(odd) {
  width: 135px;
}
</style>