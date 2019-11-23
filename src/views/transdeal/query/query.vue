<template>
  <ynet-content id="termDepositQuery" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">交易查询</h3>
      <!--内容-->
      <div class="p20" v-if="first">
        <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
          <table>
            <tr>
              <td>
                <span class="cRed">*</span>交易状态：</td>
              <td>
                <el-form-item prop="status">
                  <el-select v-model="form.status" placeholder="请选择">
                    <el-option v-for="item in $tools.dict.statusTransList" :key="item.key" :label="item.value" :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cRed">*</span>业务类型：</td>
              <td>
                <el-form-item prop="bsnCode">
                  <el-select v-model="form.bsnCode" placeholder="请选择">
                    <el-option v-for="item in $tools.dict.transTypeOptions()" :key="item.bsnCode" :label="item.bsnName" :value="item.bsnCode"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cRed">*</span>提交日期：</td>
              <td>
                <el-form-item prop="startDate">
                  <el-date-picker v-model="form.startDate" @change="form.beginTime=$tools.utils.formatDate(form.startDate)" type="date" placeholder="开始日期" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
                <span>至</span>
                <el-form-item prop="endDate">
                  <el-date-picker v-model="form.endDate" @change="form.endTime=$tools.utils.formatDate(form.endDate)" type="date" placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="form.currentPage=1,query()">查询</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </div>

        <!--列表table-->
        <div class="tableData">
          <el-table :data="formdata.transQueryList">
            <el-table-column label="网银流水号" prop="flowNo">
              <template scope="scope">
                <span>
                  <a class="cOrange" @click="queryDetail(scope.row)">{{scope.row.flowNo}}</a>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="userId" label="制单人"></el-table-column>
            <el-table-column prop="type" label="交易类型">
              <template scope='scope'>
                <span v-if="scope.row.type!='CB050202'">
                  {{$tools.dict.funTransType(scope.row.type)}}
                </span>
                <span v-else>
                  <span v-show="scope.row.reserve=='0'">结汇业务</span>
                  <span v-show="scope.row.reserve=='1'">购汇业务</span>
                  <span v-show="scope.row.reserve=='2'">套汇业务</span>
                </span>
              </template>
              <!--<template scope="scope">
                        <span>{{$tools.dict.funTransType(scope.row.type)}}</span>
                      </template>-->
            </el-table-column>
            <el-table-column prop="submitTime" label="提交日期">
              <template scope="scope">
                {{$tools.utils.formatDate(scope.row.submitTime,{"symbol":"YYYY-MM-DD"})}}
              </template>
            </el-table-column>
            <el-table-column prop="payAcc" label="付款账号">
              <template scope="scope">
                <span v-if="scope.row.payAcc==''">----</span>
                <span v-else>{{scope.row.payAcc}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="recAcc" label="收款账号">
              <template scope="scope">
                <span v-if="scope.row.recAcc==''">----</span>
                <span v-else>{{scope.row.recAcc}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column prop="recName" label="收款账号名称"></el-table-column>-->
            <el-table-column prop="amt" label="交易金额">
              <template scope="scope">
                <span v-if="scope.row.amt==''">----</span>
                <span v-else>{{$tools.utils.toDecimalString(scope.row.amt,true,2)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="交易状态">
              <template scope="scope">
                <span>{{$tools.dict.statusTrans(scope.row.status)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="pagination tar mt20">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="form.currentPage" :page-size="form.turnPageShowNum" layout="total,prev, pager, next, jumper" :total="Number(total)">
            </el-pagination>
          </div>
          <!--分页end-->
        </div>
        <!--列表table end-->
      </div>

      <!--转页面-->
      <div class="p20" v-if="!first">
        <patchTransferDetail v-if="code=='CB020108'" :list="detailData" @close2="close2"></patchTransferDetail>
        <div class="tableForm mt20">
          <h3>交易状态图</h3>
          <div class="transactionStatus">
            <ynet-transaction-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-transaction-bar>
          </div>
        </div>
        <div class="fourForm tableForm mt20" v-if="authInfoHistoryList.length>0">
          <h3>网银审核信息</h3>
          <el-table :data="authInfoHistoryList">
            <el-table-column prop="sequenceNo" label="交易流水号" width="200"></el-table-column>
            <el-table-column prop="authUserName" label="授权员"></el-table-column>
            <el-table-column prop="authTime" label="授权日期">
              <template scope="scope">
                {{$tools.utils.formatDate(scope.row.authTime,{"symbol":"YYYY-MM-DD"})}}
              </template>
            </el-table-column>
            <el-table-column prop="authFlag" label="审核状态">
              <template scope="scope">
                <span v-if="scope.row.authFlag=='0'">通过</span>
                <span v-if="scope.row.authFlag=='1'">拒绝</span>
              </template>
            </el-table-column>
            <el-table-column prop="rejReason" label="拒绝原因">
              <template scope="scope">
                <span v-if="!scope.row.rejReason">----</span>
                <span v-else>{{scope.row.rejReason}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="fourForm tableForm mt20" v-if="imAuthInfoList.length>0">
          <h3>银行审核信息</h3>
          <el-table :data="imAuthInfoList">
            <el-table-column prop="sequenceNo" label="交易流水号" width="200"></el-table-column>
            <el-table-column prop="authUserName" label="操作员"></el-table-column>
            <el-table-column prop="authTime" label="审核日期">
              <template scope="scope">
                {{$tools.utils.formatDate(scope.row.authTime,{"symbol":"YYYY-MM-DD"})}}
              </template>
            </el-table-column>
            <el-table-column prop="authFlag" label="审核状态">
              <template scope="scope">
                <span v-if="scope.row.authFlag=='0'">拒绝</span>
                <span v-if="scope.row.authFlag=='1'">通过</span>
              </template>
            </el-table-column>
            <el-table-column prop="rejReason" label="拒绝原因">
              <template scope="scope">
                <span v-if="!scope.row.rejReason">----</span>
                <span v-else>{{scope.row.rejReason}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="$tools.print()">打印</el-button>
          <el-button type="primary" @click="close2()">关闭</el-button>
        </div>
      </div>

      <!--转页面-->
    </div>
    <!--内容 end-->

    </div>

    <!--弹窗-->
    <el-dialog title="交易详情" :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="close">
      <!--<querydetail :detailMsg="detailData"></querydetail>-->
      <guaranteeDetail v-if="code=='CB050401'" :detailMsg="detailData" @close="close"></guaranteeDetail>
      <exportCollectionPrint ref="exportCollectionPrint" v-if="code=='CB050501'" :detailMsg="detailData" @close="close" :isPrint="isPrint"></exportCollectionPrint>
      <termDepositInDetail v-if="code=='CB030102'" :list="detailData" @close="close"></termDepositInDetail>
      <termDepositWithdrawDetail v-if="code=='CB030106'" :list="detailData" @close="close"></termDepositWithdrawDetail>
      <termModeChangeDetail v-if="code=='CB030109'" :list="detailData" @close="close"></termModeChangeDetail>
      <callDepositInDetail v-if="code=='CB030201'" :list="detailData" @close="close"></callDepositInDetail>
      <callDepositOrderDetail v-if="code=='CB030204'" :list="detailData" @close="close"></callDepositOrderDetail>
      <callDepositCancelDetail v-if="code=='CB030203'" :list="detailData" @close="close"></callDepositCancelDetail>
      <callDepositWithdrawDetail v-if="code=='CB030202'" :list="detailData" @close="close"></callDepositWithdrawDetail>
      <importCreditOpenPrint ref="importCreditOpenPrint" v-if="code=='CB050301'" :formData="detailData" @close="close" :isPrint="isPrint"></importCreditOpenPrint>
      <currCashDetail v-if="code=='CB030302' || code=='CB030301'" :list="detailData" @close="close"></currCashDetail>
      <intelligentTransferDetail v-if="code=='CB020102'" :list="detailData" @close="close"></intelligentTransferDetail>
      <fundUpDetail v-if="code=='CB040401'" :list="detailData" @close="close"></fundUpDetail>
      <fundDownDetail v-if="code=='CB040402'" :list="detailData" @close="close"></fundDownDetail>
      <insideDetail v-if="code=='CB040403'" :list="detailData" @close="close"></insideDetail>
      <subcorpDetail v-if="code=='CB0402'" :list="detailData" @close="close"></subcorpDetail>
      <remittanceManagementDetail v-if="code=='CB050101'" :list="detailData" :oprName="oprName" :authName="authName" @close="close" :isPrint="isPrint" :printType="printType"></remittanceManagementDetail>
      <remittanceManagementDetail v-if="code=='CB050102'" :list="detailData" :oprName="oprName" :authName="authName" @close="close" :isPrint="isPrint" :printType="printType"></remittanceManagementDetail>
      <foreignExchangePurchaseDetail v-if="code=='CB050202'" :list="detailData" @close="close"></foreignExchangePurchaseDetail>
      <div class="tableForm mt20">
        <h3>交易状态图</h3>
        <div class="transactionStatus">
          <ynet-transaction-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-transaction-bar>
        </div>
      </div>
      <div class="fourForm tableForm mt20" v-if="authInfoHistoryList.length>0">
        <h3>网银审核信息</h3>
        <el-table :data="authInfoHistoryList">
          <el-table-column prop="sequenceNo" label="交易流水号" width="200"></el-table-column>
          <el-table-column prop="authUserName" label="授权员"></el-table-column>
          <el-table-column prop="authTime" label="授权日期">
            <template scope="scope">
              {{$tools.utils.formatDate(scope.row.authTime,{"symbol":"YYYY-MM-DD"})}}
            </template>
          </el-table-column>
          <el-table-column prop="authFlag" label="审核状态">
            <template scope="scope">
              <span v-if="scope.row.authFlag=='0'">通过</span>
              <span v-if="scope.row.authFlag=='1'">拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="rejReason" label="拒绝原因">
            <template scope="scope">
              <span v-if="!scope.row.rejReason">----</span>
              <span v-else>{{scope.row.rejReason}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="fourForm tableForm mt20" v-if="imAuthInfoList.length>0">
        <h3>银行审核信息</h3>
        <el-table :data="imAuthInfoList">
          <el-table-column prop="sequenceNo" label="交易流水号" width="200"></el-table-column>
          <el-table-column prop="authUserName" label="操作员"></el-table-column>
          <el-table-column prop="authTime" label="审核日期">
            <template scope="scope">
              {{$tools.utils.formatDate(scope.row.authTime,{"symbol":"YYYY-MM-DD"})}}
            </template>
          </el-table-column>
          <el-table-column prop="authFlag" label="审核状态">
            <template scope="scope">
              <span v-if="scope.row.authFlag=='0'">拒绝</span>
              <span v-if="scope.row.authFlag=='1'">通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="rejReason" label="拒绝原因">
            <template scope="scope">
              <span v-if="!scope.row.rejReason">----</span>
              <span v-else>{{scope.row.rejReason}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="btnArea mt20 tac">
        <el-button v-if="code=='CB050301'||code=='CB050501'" type="primary" @click="printPage()">打印</el-button>
        <el-button v-if="code=='CB050101'||code=='CB050102'" type="primary" @click="printPage('A4')">A4纸打印</el-button>
        <el-button v-if="code=='CB050101'||code=='CB050102'" type="primary" @click="printPage('TD')">套打</el-button>
        <el-button v-if="code!='CB050301'&&code!='CB050501'&&code!='CB050101'&&code!='CB050102'" type="primary" @click="$tools.print()">打印</el-button>
        <el-button @click="close()">关闭</el-button>
      </div>
    </el-dialog>
    <!--弹窗end-->
  </ynet-content>
</template>

<script>
//import querydetail from './components/querydetail'
import guaranteeDetail from '../maintence/components/guaranteeDetail'
import exportCollectionPrint from '../maintence/components/exportCollectionPrint'
import termDepositInDetail from '../maintence/components/termDepositInDetail'
import termDepositWithdrawDetail from '../maintence/components/termDepositWithdrawDetail'
import termModeChangeDetail from '../maintence/components/termModeChangeDetail'
import callDepositInDetail from '../maintence/components/callDepositInDetail'
import callDepositOrderDetail from '../maintence/components/callDepositOrderDetail'
import callDepositCancelDetail from '../maintence/components/callDepositCancelDetail'
import callDepositWithdrawDetail from '../maintence/components/callDepositWithdrawDetail'
import importCreditOpenPrint from '../maintence/components/importCreditOpenPrint'
import currCashDetail from '../maintence/components/currCashDetail'
import intelligentTransferDetail from '../maintence/components/intelligentTransferDetail'
import patchTransferDetail from '../examine/detail/patchTransferDetail'
import remittanceManagementDetail from '../maintence/components/remittanceManagementDetail'
import outLineRemittanceDetail from '../maintence/components/outLineRemittanceDetail'
import foreignExchangePurchaseDetail from '../maintence/components/foreignExchangePurchaseDetail'
import fundUpDetail from '../maintence/components/fundUpDetail'
import fundDownDetail from '../maintence/components/fundDownDetail'
import insideDetail from '../maintence/components/insideDetail'
import subcorpDetail from '../maintence/components/subcorpDetail'
export default {
  name: 'query',
  components: {
    //querydetail,
    guaranteeDetail,
    exportCollectionPrint,
    termDepositInDetail,
    termDepositWithdrawDetail,
    termModeChangeDetail,
    callDepositInDetail,
    callDepositOrderDetail,
    callDepositCancelDetail,
    callDepositWithdrawDetail,
    importCreditOpenPrint,
    currCashDetail,
    intelligentTransferDetail,
    patchTransferDetail,
    remittanceManagementDetail,
    outLineRemittanceDetail,
    foreignExchangePurchaseDetail,
    fundUpDetail,
    fundDownDetail,
    insideDetail,
    subcorpDetail,
  },
  data() {
    return {
      first: true,
      showExType: false,
      showStaType: false,
      isPrint: false,
      printType: '',  //A4是A4打印； TD是套打
      stepText: ['提交', '审核', '审核结果'],
      stepIndex: 1,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value: '',
      code: '',
      form: {
        bsnCode: 'CB020102',
        status: '',
        currentPage: 1,
        turnPageShowNum: 10,
        startDate: '',
        endDate: ''
      },
      rules: {
        status: [
          // { required: true, message: '请选择交易状态', trigger: 'change' }
        ],
        bsnCode: [
          { required: true, message: '请选择业务类型', trigger: 'change' }
        ],
        startDate: [
          { trigger: 'change', validator: this.$tools.validator.dateCompare, compareList: ['startDate', 'endDate'], vm: this, formName: 'form' }
        ],
        endDate: [
          { trigger: 'change', validator: this.$tools.validator.dateCompare, compareList: ['startDate', 'endDate'], vm: this, formName: 'form' }
        ],
      },
      Options: [{
        label: "全部",
        value: ""
      }, {
        label: "等待授权",
        value: "00"
      }, {
        label: "授权中",
        value: "01"
      }, {
        label: "授权拒绝",
        value: "02"
      }, {
        label: "银行处理中",
        value: "03"
      }, {
        label: "预约待处理",
        value: "04"
      }, {
        label: "银行拒绝",
        value: "05"
      }, {
        label: "银行审核通过",
        value: "06"
      }, {
        label: "交易成功",
        value: "90"
      }, {
        label: "交易失败",
        value: "91"
      }, {
        label: "交易撤销",
        value: "95"
      }, {
        label: "部分成功",
        value: "96"
      }],
      //从session获取的账号列表
      currentPage: 1,
      pageSize: 5,
      total: 0,
      formdata: [],            //当前页数据
      dialogVisible: false,
      detailData: {},          //存单详细信息
      authInfoHistoryList: [],
      imAuthInfoList: [],
      imAuthHistoryList: [],
      oprName: '',  //经办员
      authName: '',  //授权员
    };
  },

  methods: {
    query() {
      let _this = this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          _this.$tools.request(_this, "CB070305.do", _this.form).then(
            data => {
              if (data.body.errorCode == '0') {
                _this.total = Number(data.body.turnPageTotalNum)
                _this.formdata = data.body
              } else {
                _this.$alert(data.body.errorMsg, '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  }
                });
              }
            }
          )
        } else {
          return
        }
      });
    },
    queryDetail(val) {
      this.authInfoHistoryList = []
      this.imAuthInfoList = []
      this.imAuthHistoryList = []
      let _this = this
      let body = {}
      _this.code = val.type
      body.flowNo = val.flowNo
      body.transdeal = '1' //结售套汇查询、行内行外汇出汇款查询
      body.status = _this.form.status
      if (_this.code != 'CB020102' && _this.code != 'CB020108' && _this.code != 'CB040401' && _this.code != 'CB040402' && _this.code != 'CB040403' && _this.code != 'CB0402') {
        _this.$tools.request(_this, this.$tools.dict.selectQueryDataildo(val.type), body).then(
          data => {
            if (data.body.errorCode == '0') {
              _this.detailData = data.body
              // _this.dialogVisible = !_this.dialogVisible
              _this.queryAuthHistory(val.flowNo, val.status)
            } else {
              _this.$alert(data.body.errorMsg, '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            }
          })
      } else if (_this.code == 'CB020108') {
        _this.first = false
        _this.detailData.flowNo = val.flowNo

      } else {
        _this.detailData.queryType = '1'
        _this.detailData.bsnCode = _this.code
        _this.detailData.flowNo = val.flowNo
        // _this.dialogVisible = !_this.dialogVisible
        _this.queryAuthHistory(val.flowNo, val.status)
      }
      //查询授权历史表
    },
    queryAuthHistory(flowNo, status) {
      let _this = this
      let body = {}
      body.sequenceNo = flowNo
      //alert(val.flowNo)
      let _status = status
      body.status = _status
      if (_status == '00' || _status == '01' || _status == '03' || _status == '61' || _status == '92' || _status == '95') {
        if (_status == '92') {
          _this.stepText = ['提交', '交易作废']
        } else if (_status == '95') {
          _this.stepText = ['提交', '交易撤销']
        } else { _this.stepText = ['提交', '审核', '审核结果'] }
        _this.stepIndex = 1
      } else {
        _this.stepText = ['提交', '审核', '审核结果']
        _this.stepIndex = 2
      }
      _this.$tools.request(_this, 'CB000034.do', body).then(
        data => {
          if (data.body.errorCode == '0') {
            _this.authInfoHistoryList = data.body.authInfoHistoryList?data.body.authInfoHistoryList:[]
            _this.imAuthInfoList = data.body.imAuthInfoList?data.body.imAuthInfoList:[]
            _this.imAuthHistoryList = data.body.imAuthHistoryList?data.body.imAuthHistoryList:[]
            if(_this.imAuthInfoList.length>0) _this.oprName = _this.imAuthInfoList[0].authUserName
            if(_this.imAuthHistoryList.length>0) _this.authName = _this.imAuthHistoryList[0].authUserName
          } else {
            _this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.authInfoHistoryList = []
                _this.imAuthInfoList = []
                _this.imAuthHistoryList = []
              }
            });
          }
          _this.dialogVisible = !_this.dialogVisible
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 分页方法
    handleSizeChange(val) {
      let _this = this
      _this.pageSize = val
      _this.query()
      //console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      let _this = this
      if (val) {
        _this.form.currentPage = val
      }
      _this.query()
      //console.log(`当前页: ${val}`)
    },
    // 分页方法end
    close(body) {
      let _this = this
      _this.dialogVisible = !_this.dialogVisible
      _this.isPrint = false
      _this.authInfoHistoryList = []
      _this.imAuthInfoList = []
      _this.imAuthHistoryList = []
    },
    close2(body) {
      let _this = this
      _this.first = true
    },
    printPage(val) {
      let _this = this
      _this.isPrint = true
      _this.printType = val
      setTimeout(function() {
        _this.$tools.print()
        _this.printTypeChange()
      }, 0)
    },
    printTypeChange(){
      let _this = this
      _this.printType = ''
    }
  },
  mounted() {
    let _this = this
    if (!(this.$route.params.startDate == '' || this.$route.params.startDate == undefined)) {
      _this.form.startDate = this.$route.params.startDate
      _this.form.endDate = this.$route.params.endDate
    }
  },
}
</script>
