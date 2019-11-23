<template>
  <ynet-content id="termDepositQuery" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea p20">
      <h3 class="functionalAreaTitle">交易维护</h3>
      <!--内容-->
      <div v-if="first">
        <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
          <table>
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
          <el-button type="primary" @click="submitForm()">查询</el-button>
          <!-- 此处绑定点击事件必须用submitForm()不能用只写submitFoem否则会传入一个值为mouseEvent的参数 -->
          <el-button @click="resetForm('form')">重置</el-button>
        </div>

        <!--列表table-->
        <div class="tableData mt20">
          <el-table :data="tableData">
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
            <el-table-column prop="amt" label="交易金额">
              <template scope="scope">
                <span v-if="scope.row.amt==''">----</span>
                <span v-else>{{$tools.utils.currencyFormat(scope.row.amt)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="交易状态">
              <template scope="scope">
                {{$tools.dict.statusTrans(scope.row.status)}}
              </template>
            </el-table-column>

            <!--<el-table-column prop="recName" label="收款账号名称"></el-table-column>-->

            <el-table-column label="操作">
              <template scope="scope">
                <div v-if="$tools.storage.get('user', 'save').right.charAt(1)=='1'">
                  <div v-show="scope.row.status=='00'">
                    <a class="cOrange" @click="change(scope.row)" v-if="scope.row.type!='CB020108'">修改</a>
                    <a class="cOrange" @click="uKeySubmit('delete',scope.row)">删除</a>
                  </div>
                  <div v-show="scope.row.status!='00'">
                    <span>---</span>
                  </div>
                </div>
                <div v-if="$tools.storage.get('user', 'save').right.charAt(2)=='1'">
                  <a class="cOrange" @click="uKeySubmit('cancel',scope.row)" v-show="scope.row.status=='04'">取消</a>
                  <span v-show="scope.row.status!='04'">---</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="pagination tar mt20" v-if="Number(total)>form.turnPageShowNum">
            <el-pagination @current-change="submitForm" :current-page.sync="currentPage" :page-size="10" layout="total,prev, pager, next, jumper" :total="Number(total)">
            </el-pagination>
          </div>
          <!--分页end-->
        </div>
        <!--列表table end-->
      </div>
      <!--内容 end-->
      <!--转页面-->
      <div v-if="!first">
        <patchTransferDetail v-if="code=='CB020108'" :list="detailData" @close2="close2"></patchTransferDetail>
      </div>
      <!--转页面-->

      <!-- 溫馨提示 -->
      <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
      <!-- 溫馨提示end -->
    </div>

    <!--弹窗-->
    <el-dialog title="交易详情" :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <intelligentTransferDetail v-if="code=='CB020102'" :list="detailData" @close1="close1"></intelligentTransferDetail>
      <detail :detailMsg="detailData" v-if="code=='CB030301'||code=='CB030302'" @close="close"></detail>
      <guaranteeDetail v-if="code=='CB050401'" :detailMsg="detailData" @close="close"></guaranteeDetail>
      <exportCollectionPrint ref="exportCollectionPrint" v-if="code=='CB050501'" :detailMsg="detailData" @close="close" :isPrint="isPrint"></exportCollectionPrint>
      <termDepositInDetail v-if="code=='CB030102'" :list="detailData" @close="close"></termDepositInDetail>
      <termDepositWithdrawDetail v-if="code=='CB030106'" :list="detailData" @close="close"></termDepositWithdrawDetail>
      <termModeChangeDetail v-if="code=='CB030109'" :list="detailData" @close="close"></termModeChangeDetail>
      <callDepositInDetail v-if="code=='CB030201'" :list="detailData" @close="close"></callDepositInDetail>
      <callDepositOrderDetail v-if="code=='CB030204'" :list="detailData" @close="close"></callDepositOrderDetail>
      <callDepositCancelDetail v-if="code=='CB030203'" :list="detailData" @close="close"></callDepositCancelDetail>
      <callDepositWithdrawDetail v-if="code=='CB030202'" :list="detailData" @close="close"></callDepositWithdrawDetail>
      <importCreditOpenPrint v-if="code=='CB050301'" :formData="detailData" @close="close" :isPrint="false"></importCreditOpenPrint>
      <remittanceManagementDetail v-if="code=='CB050101'" :list="detailData" @close="close"></remittanceManagementDetail>
      <outLineRemittanceDetail v-if="code=='CB050102'" :list="detailData" @close="close"></outLineRemittanceDetail>
      <foreignExchangePurchaseDetail v-if="code=='CB050202'" :list="detailData" @close="close"></foreignExchangePurchaseDetail>
      <div class="btnArea mt20 tac">
        <el-button @click="close()">关闭</el-button>
      </div>
    </el-dialog>
    <!--弹窗end-->
  </ynet-content>
</template>


<script>
import detail from './components/detail'
import guaranteeDetail from './components/guaranteeDetail'
import exportCollectionPrint from './components/exportCollectionPrint'
import termDepositInDetail from './components/termDepositInDetail'
import termDepositWithdrawDetail from './components/termDepositWithdrawDetail'
import termModeChangeDetail from './components/termModeChangeDetail'
import callDepositInDetail from './components/callDepositInDetail'
import callDepositOrderDetail from './components/callDepositOrderDetail'
import callDepositCancelDetail from './components/callDepositCancelDetail'
import callDepositWithdrawDetail from './components/callDepositWithdrawDetail'
import importCreditOpenPrint from './components/importCreditOpenPrint'
import intelligentTransferDetail from '../maintence/components/intelligentTransferDetail'
import patchTransferDetail from '../examine/detail/patchTransferDetail'
import remittanceManagementDetail from './components/remittanceManagementDetail'
import outLineRemittanceDetail from './components/outLineRemittanceDetail'
import foreignExchangePurchaseDetail from './components/foreignExchangePurchaseDetail'
export default {
  name: 'maintence',
  components: {
    detail,
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
    intelligentTransferDetail,
    patchTransferDetail,
    remittanceManagementDetail,
    outLineRemittanceDetail,
    foreignExchangePurchaseDetail
  },
  data() {
    return {
      warmTips: [
        '1.录入员可修改或删除待审批交易，授权员可取消预约交易；',
      ],
      first: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      bsnCode: '',//保存交易码
      startTime: '',//保存查询信息
      endTime: '',//保存查询信息
      form: {
        bsnCode: 'CB020102',
        data: '',
        status: '',
        currentPage: 1,
        turnPageShowNum: 10,
        startPage: 0,
        endPage: 9,
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        chooseFlag: ''
      },
      rules: {
        bsnCode: [
          { required: true, message: '请选择交易类型', trigger: 'change' }
        ],
        startDate: [
          { trigger: 'change', validator: this.$tools.validator.dateCompare, compareList: ['startDate', 'endDate'], vm: this, formName: 'form' }
        ],
        endDate: [
          { trigger: 'change', validator: this.$tools.validator.dateCompare, compareList: ['startDate', 'endDate'], vm: this, formName: 'form' }
        ],
      },
      total: 0,
      tableData: [],            //当前页数据
      dialogVisible: false,
      detailData: {            //存单详细信息
      }
    };
  },
  mounted() {
  },
  methods: {
    uKeySubmit(actionFlag, val) {
      let _this = this
      let _msg = ''
      if (actionFlag == 'delete') {
        _msg = '确定删除该交易？'
      }
      if (actionFlag == 'cancel') {
        _msg = '确定取消该交易？'
      }
      _this.$confirm(_msg, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let userStorge = _this.$tools.storage.get("user", "save")
        let cstNo = userStorge.cstNo
        let eCIFID = userStorge.eCIFID
        let transType = val.type
        let newDate = [{ key: 'cstNo', value: cstNo },
        { key: 'eCIFID', value: eCIFID },
        { key: 'flowNo', value: val.flowNo },
        { key: 'bsnCode', value: transType }]
        let siDate = JSON.stringify(newDate);
        let certNo = userStorge.serialNo
        let ukeyNo = userStorge.uKeySn
        let arrAcc = ["交易流水号:", val.flowNo]
        let arrAmt = ["交易类型:", val.type != 'CB050202' ? _this.$tools.dict.funTransType(val.type) : (val.reserve == '0' ? '结汇业务' : (val.reserve == '1' ? '购汇业务' : '套汇业务'))]
        let keyFlag = _this.$ukey
        if (keyFlag == true || keyFlag == 'true') {
          let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
          if (flag == false || flag == 'false') {
            return
          }
          let signData = document.getElementById("signData").value.toString()
          _this.signData = signData
        }
        if (actionFlag == 'delete') {
          _this.deleteChange(val)
        }
        if (actionFlag == 'cancel') {
          _this.canncelTrans(val)
        }
      }).catch(() => {
      });
    },
    canncelTrans(val) {
      let _this = this
      let body = {}
      body.transFlowNo = val.flowNo
      body.flowNo = val.flowNo
      body.bsnCode = val.type
      body.transType = (val.type == 'CB020102' ? '1' : '0')
      body.signedData = _this.signData
      _this.$tools.request(this, this.$tools.dict.canncelTransDict(val.type), body).then(
        data => {
          if (data.body.errorCode == '0' && data.body.status == '0') {
            this.$alert('交易取消成功！', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.form.bsnCode = _this.bsnCode
                _this.form.startTime = _this.startTime
                _this.form.endTime = _this.endTime
                _this.query()
              }
            });
          } else {
            this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        }
      )
    },
    query() {
      let _this = this
      if (this.$tools.storage.get("user", "save").right.charAt(1) == '1') {
        _this.form.status = '00'
      } else if (this.$tools.storage.get("user", "save").right.charAt(2) == '1') {
        _this.form.status = '04'
        _this.form.chooseFlag = '2'
      } else {
        _this.form.status = '99999'
      }
      _this.$tools.request(this, "CB070305.do", _this.form).then(
        data => {
          if (data.body.errorCode == '0') {
            _this.bsnCode = _this.form.bsnCode
            _this.startTime = _this.form.startTime
            _this.endTime = _this.form.endTime
            _this.tableData = data.body.transQueryList
            _this.currentPage = _this.form.currentPage
            _this.total = data.body.turnPageTotalNum
          } else {
            this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        }
      )
    },
    submitForm(changePage) {
      let _this = this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          if (changePage) {
            _this.form.currentPage = changePage
            _this.form.startPage = (_this.form.currentPage - 1) * _this.form.turnPageShowNum
            _this.form.endPage = _this.form.currentPage * _this.form.turnPageShowNum - 1
          } else {
            _this.form.currentPage = 1
            _this.form.startPage = 0
            _this.form.endPage = 9
          }
          _this.query()
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    queryDetail(val) {
      let _this = this
      _this.code = val.type
      let body = {}
      body.flowNo = val.flowNo
      body.transdeal = '1' //结售套汇查询、行内行外汇出汇款查询
      if (_this.code != 'CB020102' && _this.code != 'CB020108') {
        _this.$tools.request(_this, this.$tools.dict.selectQueryDataildo(_this.bsnCode), body).then(
          data => {
            _this.detailData = data.body
            _this.dialogVisible = !_this.dialogVisible
          }
        )
      } else {
        if (_this.code == 'CB020102') {
          _this.detailData.bsnCode = _this.code
          _this.detailData.flowNo = val.flowNo
          _this.dialogVisible = !_this.dialogVisible
        } else if (_this.code == 'CB020108') {
          _this.first = false
          _this.detailData.flowNo = val.flowNo
          _this.detailData.queryFlag = '3'
        }
      }

    },
    change(val) {
      let _this = this
      let body = {}
      let path = ''
      let operateFlag = '1'
      body.flowNo = val.flowNo
      body.transFlowNo = val.flowNo
      body.transdeal = '1' //结售套汇查询、行内行外汇出汇款查询
      body.cstNo = _this.$tools.storage.get("user", "save").cstNo
      switch (val.type) {
        case "CB020102":
          path = "intelligentTransferMain"//路由的name
          break
        case "CB030302":
          path = "currentcashdeposit"
          break
        case "CB030301":
          path = "termcashdeposit"
          break
        case "CB050301":  //进口信用证
          path = "importCreditMain"
          break
        case "CB030102":  //定期存入
          path = "termDepositIn"
          break
        case "CB030106":  //定期支取
          path = "termWithdraw"
          break
        case "CB030109":  //定期约转更改
          path = "termModeChange"
          break
        case "CB030201":  //通知存入
          path = "callDepositIn"
          break
        case "CB030202":  //通知立即支取
          path = "callWithdraw"
          break
        case "CB030203":  //通知通知取消
          path = "callDepositCancelMain"
          break
        case "CB030204":  //通知通知
          path = "callDepositOrderWithdrawMain"
          break
        case "CB050401":
          path = "letterOfGuaranteeToOpenMain"
          break
        case "CB050501":
          path = "exportCollectionMain"
          break
        case "CB050202":  //结购套
          path = "foreignExchangePurchaseMain"
          break
        case "CB050101":  //行内汇出汇款
          path = 'remittanceManagementMain'
          break
        case "CB050102":  //行外汇出汇款
          path = 'outLineRemittanceMain'
          break
      }
      _this.$tools.request(_this, _this.$tools.dict.selectQueryDataildo(_this.bsnCode), body).then(
        data => {
          let form = data.body
          form.oldSqno = val.flowNo
          form.operateFlag = '1'
          _this.$router.push({ name: path, params: form })
        })
    },
    deleteChange(val) {
      let _this = this
      let body = {}
      body.operateFlag = '2'  //交易撤销
      body.oldSqno = val.flowNo
      body.flowNo = val.flowNo
      body.bsnCode = val.type
      body.signedData = _this.signData
      _this.$tools.request(_this, "CB070201.do", body).then(
        data => {
          if (data.body.errorCode == '0') {
            this.$alert('删除成功', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.form.bsnCode = _this.bsnCode
                _this.form.startTime = _this.startTime
                _this.form.endTime = _this.endTime
                _this.query()
              }
            });
          } else {
            this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.form.bsnCode = _this.bsnCode
                _this.form.startTime = _this.startTime
                _this.form.endTime = _this.endTime
                _this.query()
              }
            });
          }
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    close(body) {
      let _this = this
      _this.dialogVisible = !_this.dialogVisible
      if (body === null || body === undefined || body === '') {
        return
      }
    },
    close1() {
      let _this = this
      _this.dialogVisible = false
    },
    close2(body) {
      let _this = this
      _this.first = true
    }

  }
}
</script>