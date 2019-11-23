<template>
  <div>
    <div class="tableData mt5" v-if="first">
      <el-table :data="formdata.authList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" v-if="code!='CB020108'"></el-table-column>
        <el-table-column prop="flowNo" label="网银流水号">
          <template scope="scope">
            <a class="cOrange" @click="queryDetail(scope.row.flowNo)">{{scope.row.flowNo}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="prepare" label="制单人"></el-table-column>
        <el-table-column prop="transType" label="交易类型">
          <template scope='scope'>
            <span v-if="code!='CB050202'">
              {{$tools.dict.funTransType(code)}}
            </span>
            <span v-else>
              <span v-show="scope.row.type1=='0'">结汇业务</span>
              <span v-show="scope.row.type1=='1'">购汇业务</span>
              <span v-show="scope.row.type1=='2'">套汇业务</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="transTime" label="提交日期">
          <template scope="scope">
            {{$tools.utils.formatDate(scope.row.transTime,{"symbol":"YYYY-MM-DD"})}}
          </template>
        </el-table-column>
        <el-table-column prop="payAccount" label="付款账号">
          <template scope="scope">
            <span v-if="scope.row.payAccount==''||scope.row.payAccount==undefined">----</span>
            <span v-else>{{scope.row.payAccount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="recAccount" label="收款账号">
          <template scope="scope">
            <span v-if="scope.row.recAccount==''||scope.row.recAccount==undefined">----</span>
            <span v-else>{{scope.row.recAccount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="recName" label="收款账号户名">
          <template scope="scope">
            <span v-if="scope.row.recName==''||scope.row.recName==undefined">----</span>
            <span v-else>{{scope.row.recName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="transAmount" label="交易金额">
          <template scope="scope">
            <span v-if="scope.row.transAmount==''||scope.row.transAmount==undefined">----</span>
            <span v-else-if="code=='CB050202'">{{$tools.utils.toDecimalString(scope.row.originalAmount,true,2)}}</span>
            <span v-else>{{$tools.utils.toDecimalString(scope.row.transAmount,true,2)}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column prop="purposeName" label="用途"></el-table-column>-->
      </el-table>
      <div class="pagination tar mt20">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="form.currentPage" :page-size="form.pagesize" layout="total, prev, pager, next, jumper" :total="Number(this.formdata.turnPageTotalNum)">
        </el-pagination>
      </div>
      <div class="btnArea mt20 tac">
        <el-button v-if="code!='CB020108'" type="primary" @click="uKeySubmit(0)">同意</el-button>
        <el-button v-if="code!='CB020108'" type="primary" @click="reject()">拒绝</el-button>
        <el-button type="primary" @click="handleCurrentChange(form.currentPage)">刷新</el-button>
        <el-button @click="lastSteo">返回</el-button>
      </div>
    </div>
    <!--转页面-->
    <div v-if="!first">
      <patchTransferDetail v-if="code=='CB020108'" :list="detailData" @close2="close2" @close="close"></patchTransferDetail>
    </div>

    <!--转页面-->
    <!--详细信息弹窗-->
    <el-dialog title="详细信息" :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <intelligentTransferDetail v-if="code=='CB020102'" :list="detailData" @close="close"></intelligentTransferDetail>
      <termDepositInDetail v-if="code=='CB030102'" :list="detailData" @close="close"></termDepositInDetail>
      <termDepositWithdrawDetail v-if="code=='CB030106'" :list="detailData" @close="close"></termDepositWithdrawDetail>
      <termModeChangeDetail v-if="code=='CB030109'" :list="detailData" @close="close"></termModeChangeDetail>
      <callDepositInDetail v-if="code=='CB030201'" :list="detailData" @close="close"></callDepositInDetail>
      <callDepositOrderDetail v-if="code=='CB030204'" :list="detailData" @close="close"></callDepositOrderDetail>
      <callDepositCancelDetail v-if="code=='CB030203'" :list="detailData" @close="close"></callDepositCancelDetail>
      <callDepositWithdrawDetail v-if="code=='CB030202'" :list="detailData" @close="close"></callDepositWithdrawDetail>
      <guaranteeDetail v-if="code=='CB050401'" :list="detailData" @close="close"></guaranteeDetail>
      <collectionDetail v-if="code=='CB050501'" :list="detailData" @close="close"></collectionDetail>
      <foreignExchangePurchaseDetail v-if="code=='CB050202'" :list="detailData" @close="close"></foreignExchangePurchaseDetail>
      <remittanceManagementDetail v-if="code=='CB050101'" :list="detailData" @close="close"></remittanceManagementDetail>
      <outLineRemittanceDetail v-if="code=='CB050102'" :list="detailData" @close="close"></outLineRemittanceDetail>
      <currCashDetail v-if="code=='CB030302' || code=='CB030301'" :list="detailData" @close="close"></currCashDetail>
      <importCreditOpenPrint v-if="code=='CB050301'" :formData="detailData" @close="close" :isPrint="false"></importCreditOpenPrint>
      <fundUpDetail v-if="code=='CB040401'" :list="detailData" @close="close"></fundUpDetail>
      <fundDownDetail v-if="code=='CB040402'" :list="detailData" @close="close"></fundDownDetail>
      <insideDetail v-if="code=='CB040403'" :list="detailData" @close="close"></insideDetail>
      <subcorpDetail v-if="code=='CB0402'" :list="detailData" @close="close"></subcorpDetail>
      <cashSweepDetail v-if="code=='CB0405'" :list="detailData" @close="close"></cashSweepDetail>
    </el-dialog>
    <!--详细信息弹窗-->
    <!--拒绝弹窗-->
    <el-dialog title="拒绝原因" :visible.sync="rejectdialogVisible" v-if="rejectdialogVisible" size=tiny :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="form2" :model="form2" :rules="rules">
        <el-form-item prop="rejReason">
          <el-input v-model="form2.rejReason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer btnArea tac">
        <el-button type="primary" @click="uKeySubmit(1)">确认</el-button>
        <el-button @click="rejectdialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
    <!--拒绝end弹窗-->
  </div>
</template>
<script>
import detail from './detail'
import intelligentTransferDetail from '../detail/intelligentTransferDetail'
import patchTransferDetail from '../detail/patchTransferDetail'
import termDepositInDetail from '../detail/termDepositInDetail'
import termDepositWithdrawDetail from '../detail/termDepositWithdrawDetail'
import termModeChangeDetail from '../detail/termModeChangeDetail'
import callDepositInDetail from '../detail/callDepositInDetail'
import callDepositOrderDetail from '../detail/callDepositOrderDetail'
import callDepositCancelDetail from '../detail/callDepositCancelDetail'
import callDepositWithdrawDetail from '../detail/callDepositWithdrawDetail'
import guaranteeDetail from '../detail/guaranteeDetail'
import collectionDetail from '../detail/collectionDetail'
import foreignExchangePurchaseDetail from '../detail/foreignExchangePurchaseDetail'
import remittanceManagementDetail from '../detail/remittanceManagementDetail'
import outLineRemittanceDetail from '../detail/outLineRemittanceDetail'
import currCashDetail from '../detail/currCashDetail'
import importCreditOpenPrint from '../detail/importCreditOpenPrint'
import fundUpDetail from '../detail/fundUpDetail'
import fundDownDetail from '../detail/fundDownDetail'
import insideDetail from '../detail/insideDetail'
import subcorpDetail from '../detail/subcorpDetail'
import cashSweepDetail from '../detail/cashSweepDetail'
export default {
  name: 'stayCheckTable2',
  components: {
    detail,
    intelligentTransferDetail,
    patchTransferDetail,
    termDepositInDetail,
    termDepositWithdrawDetail,
    termModeChangeDetail,
    callDepositInDetail,
    callDepositOrderDetail,
    callDepositCancelDetail,
    callDepositWithdrawDetail,
    guaranteeDetail,
    collectionDetail,
    foreignExchangePurchaseDetail,
    remittanceManagementDetail,
    outLineRemittanceDetail,
    currCashDetail,
    importCreditOpenPrint,
    fundUpDetail,
    fundDownDetail,
    insideDetail,
    subcorpDetail,
    cashSweepDetail
  },
  data() {
    return {
      timeStamps: '',
      first: true,
      desc: '',
      rejectdialogVisible: false,
      dialogVisible: false,
      detailData: {},
      signData: '',
      form: {
        pagesize: 10,
        startPage: 0,
        endPage: 9,
        currentPage: 1,
      },
      tableData: [],
      form2: {
        rejReason: '',
      },
      transFlowNoList: [],
      rules: {
        rejReason: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    formdata: {},
    code: '',
  },
  methods: {
    queryDetail(val) {
      let _this = this
      _this.first = false
      let action = ''
      let body = {}
      body.flowNo = val
      if (_this.code == 'CB050202' || _this.code == 'CB050101' || _this.code == 'CB050102') {
        body.transdeal = '1'
      }
      _this.detailData.bsnCode = _this.code
      _this.detailData.flowNo = val
      _this.$emit("list", [{ "transFlowNo": val }])  //最后回调授权结果，需要流水号
      // let transFlowNoList=[{transFlowNo:val}]//封装传入参数
      if (_this.code != 'CB020102' && _this.code != 'CB020108' && _this.code != 'CB040401' && _this.code != 'CB040402' && _this.code != 'CB040403' && _this.code != 'CB0402' && _this.code != 'CB0405') {
        _this.$tools.request(_this, _this.$tools.dict.selectQueryDataildo(_this.code), body).then(//请求后台详情
          data => {
            _this.detailData = data.body
            _this.dialogVisible = !_this.dialogVisible
          }
        )
      } else {
        if (_this.code != 'CB020108') {
          _this.dialogVisible = !_this.dialogVisible
        } else {
          _this.detailData.queryFlag = '2'
        }

      }
    },
    lastSteo() {
      let _this = this
      _this.$emit("changeStep", [1])
    },
    reject() {
      let _this = this
      if (_this.transFlowNoList.length == 0) {//授权非空验证
        this.$alert('请勾选选授权对象', '提示', {
          confirmButtonText: '确定'
        });
        return
      }
      _this.rejectdialogVisible = true
    },
    uKeySubmit(authFlag) {
      let _this = this
      if (_this.transFlowNoList.length == 0) {//授权非空验证
        this.$alert('请勾选选授权对象', '提示', {
          confirmButtonText: '确定'
        });
        return
      }
      let _flag = true
      if (authFlag == '1') {
        _this.$refs.form2.validate((valid) => {
          if (valid) {
            _flag = true
          } else {
            _flag = false
          }
        })
      }
      if (_flag) {
        let userStorge = _this.$tools.storage.get("user", "save")
        let cstNo = userStorge.cstNo
        let eCIFID = userStorge.eCIFID
        let totalNum = _this.transFlowNoList.length
        let transType = _this.$tools.dict.funTransType(_this.code)
        let newDate = [{ key: 'cstNo', value: cstNo },
        { key: 'eCIFID', value: eCIFID },
        { key: 'totalNum', value: totalNum },
        { key: 'transType', value: transType }]
        let siDate = JSON.stringify(newDate);
        let certNo = userStorge.serialNo
        let ukeyNo = userStorge.uKeySn
        let arrAcc = ["交易类型:", transType]
        let arrAmt = ["总笔数:", totalNum]
        let keyFlag = _this.$ukey
        if (keyFlag == true || keyFlag == 'true') {
          let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
          if (flag == false || flag == 'false') {
            //this.$alert('UKey签名失败,请重新再试', '温馨提示')
            return
          }
          let signData = document.getElementById("signData").value.toString()
          _this.signData = signData
        }
        _this.submit(authFlag, totalNum, transType)
      }
    },
    submit(authFlag, totalNum, transType) {
      let _this = this
      let body = {}
      body.totalNum = totalNum
      body.transType = transType
      body.timeStamps = _this.timeStamps
      body.transFlowNoList = _this.transFlowNoList
      body.bsnCode = _this.code
      body.authFlag = authFlag
      if (authFlag == '0') {
        _this.form2.rejReason = ''
      }
      body.rejReason = _this.form2.rejReason
      body.signedData = _this.signData


      _this.$tools.request(_this, _this.$tools.dict.getAuthdo(_this.code), body).then(data => {
        // if (data.body.errorCode == '0' || data.body.status == '01' || data.body.status == '02' || data.body.status == '03' || data.body.status == '04' || data.body.status == '90') {

        if (data.body.errorCode == '0') {
          let body = data.body
          _this.$emit("changeStep", [4, body])
        } else {
          _this.$alert(data.body.errorMsg, '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
              _this.getTimeStamps(_this.$tools.dict.getAuthdo(_this.code).split('.')[0])
            }
          });
        }
      })
    },
    handleSelectionChange(val) {
      let _this = this
      let transFlowNoList = []
      let _totalAmt = 0
      for (let i in val) {
        transFlowNoList.push({ "transFlowNo": val[i].flowNo })
      }
      _this.$emit("list", transFlowNoList)
      _this.transFlowNoList = transFlowNoList
    },
    handleCurrentChange(changePage) {
      let _this = this

      let form = {}
      form.bsnCode = _this.code
      form.currentPage = changePage
      form.turnPageShowNum = 10
      form.status = '00'
      let bsnCode = _this.code
      if (form.bsnCode == 'CB050101') {
        form.inrOrOut = 0
      } else if (form.bsnCode == 'CB050102') {
        form.inrOrOut = 1
      }
      _this.$tools.request(_this, _this.$tools.dict.selectAction(bsnCode), form).then(data => {
        if (data.body.errorCode = '0') {
          if (form.bsnCode == 'CB050202') {
            _this.$emit("changeStep", [2, { "authList": data.body.exchangeInfoList, "turnPageTotalNum": Number(data.body.turnPageTotalNum) }, bsnCode])
          } else if (form.bsnCode == 'CB0405') {
            _this.$emit("changeStep", [2, { "authList": data.body.cashSweepAuthList, "turnPageTotalNum": Number(data.body.turnPageTotalNum) }, bsnCode])
          } else {
            _this.$emit("changeStep", [2, data.body, bsnCode])
          }
        } else {
          this.$alert(data.body.errorMsg, '温馨提示', {
            confirmButtonText: '确定'
          });
        }
      })
    },
    close(body) {
      let _this = this
      _this.dialogVisible = !_this.dialogVisible
      _this.getTimeStamps(_this.$tools.dict.getAuthdo(_this.code).split('.')[0])
      _this.first = true
      if (body === null || body === undefined || body === '') {
        return
      } else if (body[1].errorCode == '0' || body[1].status == '01') {
        _this.$emit("changeStep", [4, body[1]])
      } else {
        _this.$emit("changeStep", [4])
      }
    },
    close2(body) {
      let _this = this
      _this.getTimeStamps(_this.$tools.dict.getAuthdo(_this.code).split('.')[0])
      _this.first = true
    },
    getTimeStamps(val) { //获取防重复提交timeStamps
      let _this = this
      _this.$tools.request(_this, "CB000028Action.do", { tradeCode: val }).then(data => {
        _this.timeStamps = data.body.timeStamps
      })
    },
  },
  mounted() {
    let _this = this
    _this.getTimeStamps(_this.$tools.dict.getAuthdo(_this.code).split('.')[0])
  }
}
</script>