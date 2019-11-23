<template>
  <div class="Query">
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>填写查询信息</caption>
        <tr>
          <td>收款人：</td>
          <td>
            <el-form-item prop="searchPayee">
              <el-input v-model="form.searchPayee" placeholder="收款人"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>收款行：</td>
          <td>
            <el-form-item prop="searchBank">
              <el-input v-model="form.searchBank" placeholder="收款行"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>币种：</td>
          <td>
            <el-form-item prop="searchCRY">
              <el-select clearable placeholder="----请选择----" v-model="form.searchCRY">
                <el-option label="CNY人民币" value="CNY"></el-option>
                <el-option label="EUR欧元" value="EUR"></el-option>
                <el-option label="GBP英镑" value="GBP"></el-option>
                <el-option label="HKD港币" value="HKD"></el-option>
                <el-option label="JPY日元" value="JPY"></el-option>
                <el-option label="USD美元" value="USD"></el-option>
                <el-option label="SGD新加坡元" value="SGD"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>金额范围：</td>
          <td>
            <el-form-item prop="amtMin">
              <ynet-currency-input v-model="form.amtMin" name="amtMin" placeholder="最小金额" :showChinese="false"></ynet-currency-input>
            </el-form-item>
            <span>至</span>
            <el-form-item prop="amtMax">
              <ynet-currency-input v-model="form.amtMax" name="amtMax" placeholder="最大金额" :showChinese="false"></ynet-currency-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>入账日期范围：</td>
          <td>
            <el-form-item prop="startDateObj">
              <el-date-picker v-model="form.startDateObj" @change="form.startDate=$tools.utils.formatDate(form.startDateObj)" type="date" placeholder="开始日期"></el-date-picker>
            </el-form-item>
            <span>至</span>
            <el-form-item prop="endDateObj">
              <el-date-picker v-model="form.endDateObj" @change="form.endDate=$tools.utils.formatDate(form.endDateObj)" type="date" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!--table布局--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submitForm()">查询</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </div>
    <!--查询表格-->
    <div class="tableData mt20 printArea">
      <el-table :data="tableData" stripe>
        <el-table-column label="网银流水号" prop="flowNo">
          <template scope="scope">
            <a class="cOrange" @click="popWindow(scope.$index)">{{scope.row.flowNo}}</a>
          </template>
        </el-table-column>
        <el-table-column label="收款人" prop="recName"></el-table-column>
        <el-table-column label="汇出金额" prop="transAmount">
          <template scope="scope">
            {{$tools.utils.currencyFormat(scope.row.transAmount)}}
          </template>
        </el-table-column>
        <el-table-column label="汇出日期">
          <template scope="scope">
            {{$tools.utils.formatDate(scope.row.transTime,{'symbol':'YYYY-MM-DD'})}}
          </template>
        </el-table-column>
        <el-table-column label="币种" prop="currencyType">
          <template scope="scope">
            {{$tools.dict.CRYTrans(scope.row.currencyType)}}
          </template>
        </el-table-column>
        <el-table-column label="是否代付" prop="flag">
          <template scope="scope">
            <span v-if="scope.row.flag=='0'">是</span>
            <span v-if="scope.row.flag=='1'">否</span>
          </template>
        </el-table-column>
        <el-table-column label="交易类型" prop="inrOrOut">
          <template scope="scope">
            <span v-if="scope.row.inrOrOut=='0'">行内汇款</span>
            <span v-if="scope.row.inrOrOut=='1'">行外汇款</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="btiStatus">
          <template scope="scope">
            {{$tools.dict.statusTrans(scope.row.btiStatus)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--查询表格--END-->
    <!--分页-->
    <div class="pagination tar mt20">
      <el-pagination @current-change="handleCurrentChange" :current-page="form.currentPage" :page-size="form.turnPageShowNum" layout="total, prev, pager, next, jumper" :total="Number(turnPageTotalNum)">
      </el-pagination>
    </div>
    <!--分页--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="$tools.print()">打印</el-button>
      <el-button type="primary" @click="download">下载</el-button>
    </div>
    <!--弹窗-->
    <el-dialog title="详情" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <remittanceManagementDetail v-if="inrOrOut=='0'" :list="popTableData" :oprName="oprName" :authName="authName"></remittanceManagementDetail>
      <outLineRemittanceDetail v-if="inrOrOut=='1'" :list="popTableData" :oprName="oprName" :authName="authName"></outLineRemittanceDetail>
      <div slot="footer" class="el-dialog__footer btnArea">
        <el-button @click="dialogTableVisible = false">返回</el-button>
      </div>
    </el-dialog>
    <!--弹窗--END-->
  </div>
</template>

<script>
import remittanceManagementDetail from '../../transdeal/maintence/components/remittanceManagementDetail'
import outLineRemittanceDetail from '../../transdeal/maintence/components/outLineRemittanceDetail'
export default {
  name: 'remitQuery',
  components: {
    remittanceManagementDetail,
    outLineRemittanceDetail
  },
  data() {
    return {
      form: {
        searchPayee: '',
        searchBank: '',
        searchCRY: '',
        amtMin: '',
        amtMax: '',
        startDate: '',
        startDateObj: '',
        endDate: '',
        endDateObj: '',
        currentPage: 1,
        turnPageShowNum: 10,
      },
      turnPageTotalNum: 0,
      rules: {
        amtMin: [
          { trigger: 'blur', validator: this.$tools.validator.amountCompare, compareList: ['amtMin', 'amtMax'], vm: this, formName: 'form' }
        ],
        amtMax: [
          { trigger: 'blur', validator: this.$tools.validator.amountCompare, compareList: ['amtMin', 'amtMax'], vm: this, formName: 'form' }
        ],
        startDateObj: [
          { trigger: 'blur', validator: this.$tools.validator.dateCompare, compareList: ['startDateObj', 'endDateObj'], vm: this, formName: 'form', requested:false }
        ],
        endDateObj: [
          { trigger: 'blur', validator: this.$tools.validator.dateCompare, compareList: ['startDateObj', 'endDateObj'], vm: this, formName: 'form', requested:false }
        ],
      },
      tableData: [],
      dialogTableVisible: false,
      popTableData: {},
      inrOrOut:'',
      oprName:'',
      authName:''
    }
  },
  methods: {
    submitForm(changePage) {
      let _this = this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          if (changePage) {
            _this.form.currentPage = changePage
          } else {
            _this.form.currentPage = 1
          }
          _this.requestTableList()
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm() {
      let _this = this
      _this.$refs['form'].resetFields()
      _this.form.startDate = ''
      _this.form.endDate = ''
    },
    handleCurrentChange(currentPage) {
      let _this = this
      _this.submitForm(currentPage)
    },
    requestTableList() {
      let _this = this
      _this.tableData = []
      _this.$tools.request(this, "CB050108.do", _this.form).then(data => {
        if(data.body.errorCode=='0'){
          _this.tableData = data.body.remitInfoList
          _this.turnPageTotalNum = data.body.turnPageTotalNum
        }else{
          _this.$alert(data.body.errorMsg,"温馨提示")
        }
      })
    },
    popWindow(index) {
      let _this = this
      _this.popTableData.remitInfoList = []
      _this.popTableData.remitInfoList.push(_this.tableData[index])
      _this.inrOrOut = _this.tableData[index].inrOrOut
      let body = {}
      body.sequenceNo = _this.tableData[index].flowNo
      _this.$tools.request(_this, 'CB000034.do', body).then(
        data => {
          if (data.body.errorCode == '0') {
            let imAuthInfoList = []
            let imAuthHistoryList = []
            imAuthInfoList = data.body.imAuthInfoList?data.body.imAuthInfoList:[]
            imAuthHistoryList = data.body.imAuthHistoryList?data.body.imAuthHistoryList:[]
            if(imAuthInfoList.length>0) _this.oprName = imAuthInfoList[0].authUserName
            if(imAuthHistoryList.length>0) _this.authName = imAuthHistoryList[0].authUserName
          } else {
            _this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
          _this.dialogTableVisible = true
        })
    },
    download(){
      let _this = this
      if(_this.tableData.length<=0){
        _this.$alert("暂无数据，不可下载","温馨提示")
      }else{
        let remitDownloadTitleList = [{flowNo:'网银流水号',recName:'收款人',transAmount:'汇出金额',transTime:'汇出日期',currencyType:'币种',flag:'是否代付',inrOrOut:'交易类型',btiStatus:'状态'}]
        let url = "/api/CB050114.do"
        // let url = "/corporbank/CB050114.do"
        let form = $("<form></form>").attr("action",url).attr("method","post")
        form.append($("<input></input>").attr("type","hidden").attr("name","versionNo").attr("value","0.1"))
        form.append($("<input></input>").attr("type","hidden").attr("name","iCIFID").attr("value",_this.$tools.storage.get("user","save").iCIFID))
        for(let i in _this.tableData){
          form.append($("<input></input>").attr("type","hidden").attr("name","remitInfoList["+i+"][flowNo]").attr("value",_this.tableData[i].flowNo))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitInfoList["+i+"][recName]").attr("value",_this.tableData[i].recName))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitInfoList["+i+"][transAmount]").attr("value",_this.$tools.utils.toDecimalString(_this.tableData[i].transAmount,true,2)))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitInfoList["+i+"][transTime]").attr("value",_this.$tools.utils.formatDate(_this.tableData[i].transTime,{"symbol":"YYYY-MM-DD"})))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitInfoList["+i+"][currencyType]").attr("value",_this.$tools.dict.CRYTrans(_this.tableData[i].currencyType)))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitInfoList["+i+"][flag]").attr("value",_this.tableData[i].flag=='0'?'是':'否'))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitInfoList["+i+"][inrOrOut]").attr("value",_this.tableData[i].inrOrOut=='0'?'行内汇款':'行外汇款'))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitInfoList["+i+"][btiStatus]").attr("value",_this.$tools.dict.statusTrans(_this.tableData[i].btiStatus)))
        }
        for(let i in remitDownloadTitleList){
          form.append($("<input></input>").attr("type","hidden").attr("name","remitDownloadTitleList["+i+"][flowNo]").attr("value",remitDownloadTitleList[i].flowNo))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitDownloadTitleList["+i+"][recName]").attr("value",remitDownloadTitleList[i].recName))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitDownloadTitleList["+i+"][transAmount]").attr("value",remitDownloadTitleList[i].transAmount))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitDownloadTitleList["+i+"][transTime]").attr("value",remitDownloadTitleList[i].transTime))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitDownloadTitleList["+i+"][currencyType]").attr("value",remitDownloadTitleList[i].currencyType))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitDownloadTitleList["+i+"][flag]").attr("value",remitDownloadTitleList[i].flag))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitDownloadTitleList["+i+"][inrOrOut]").attr("value",remitDownloadTitleList[i].inrOrOut))
          form.append($("<input></input>").attr("type","hidden").attr("name","remitDownloadTitleList["+i+"][btiStatus]").attr("value",remitDownloadTitleList[i].btiStatus))
        }
        form.appendTo("body").submit().remove()
      }
    }
  },
  mounted() {
  }
}
</script>