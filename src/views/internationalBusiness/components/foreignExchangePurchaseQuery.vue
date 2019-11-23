<template>
  <div class="Query">
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>填写查询信息</caption>
        <tr>
          <td><span class="cRed">*</span>交易类型：</td>
          <td>
            <el-form-item prop="type1">
              <el-select placeholder="----请选择----" v-model="form.type1">
                <el-option label="结汇" value="0"></el-option>
                <el-option label="购汇" value="1"></el-option>
                <el-option label="套汇" value="2"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td v-if="form.type1!='2'">外币账号：</td>
          <td v-if="form.type1=='2'">转出账号：</td>
          <td>
            <el-form-item prop="payAccount">
              <el-input v-model="form.payAccount" placeholder="转出账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td v-if="form.type1!='2'">人民币账号：</td>
          <td v-if="form.type1=='2'">转入账号：</td>
          <td>
            <el-form-item prop="recAccount">
              <el-input v-model="form.recAccount" placeholder="转入账号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td v-if="form.type1=='1'">购汇币种：</td>
          <td v-if="form.type1!='1'">原币币种：</td>
          <td>
            <el-form-item prop="currency">
              <el-select placeholder="----请选择----" clearable v-model="form.currency">
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
          <td v-if="form.type1=='1'">人民币金额范围：</td>
          <td v-if="form.type1!='1'">原币金额范围：</td>
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
          <td>{{exchangeType(form.type1)}}金额范围：</td>
          <td>
            <el-form-item prop="drawAmtMin">
              <ynet-currency-input v-model="form.drawAmtMin" name="drawAmtMin" placeholder="最小金额" :showChinese="false"></ynet-currency-input>
            </el-form-item>
            <span>至</span>
            <el-form-item prop="drawAmtMax">
              <ynet-currency-input v-model="form.drawAmtMax" name="drawAmtMax" placeholder="最大金额" :showChinese="false"></ynet-currency-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>{{exchangeType(form.type1)}}日期范围：</td>
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
        <el-table-column :label="exchangeType(tableType1)+'日期'">
          <template scope="scope">
            {{$tools.utils.formatDate(scope.row.transTime,{'symbol':'YYYY-MM-DD'})}}
          </template>
        </el-table-column>
        <el-table-column v-if="tableType1!='1'" label="原币币种" prop="currency">
          <template scope="scope">
            {{$tools.dict.CRYTrans(scope.row.currency)}}
          </template>
        </el-table-column>
        <el-table-column v-if="tableType1=='1'" label="购汇币种" prop="orignalCurrency">
          <template scope="scope">
            {{$tools.dict.CRYTrans(scope.row.orignalCurrency)}}
          </template>
        </el-table-column>
        <el-table-column :label="exchangeAMT(tableType1)+'金额'" prop="transAmount">
          <template scope="scope">
            {{$tools.utils.currencyFormat(scope.row.transAmount)}}
          </template>
        </el-table-column>
        <el-table-column :label="exchangeType(tableType1)+'金额'" prop="originalAmount">
          <template scope="scope">
            {{$tools.utils.currencyFormat(scope.row.originalAmount)}}
          </template>
        </el-table-column>
        <el-table-column :label="exchangeType(tableType1)+'牌价'" prop="serviceMKT">
          <template scope="scope">
            <span v-if="scope.row.type1=='0'||scope.row.type1=='1'">{{scope.row.serviceMKT}}</span>
            <span v-else>----</span>
          </template>
        </el-table-column>
        <el-table-column label="交易类型" prop="type1">
          <template scope="scope">
            {{exchangeType(scope.row.type1)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--查询表格--END-->
    <!--分页-->
    <div class="pagination tar mt20">
      <el-pagination 
        @current-change="handleCurrentChange" 
        :current-page="form.currentPage" 
        :page-size="form.turnPageShowNum" 
        layout="total, prev, pager, next, jumper" 
        :total="Number(turnPageTotalNum)">
      </el-pagination>
    </div>
    <!--分页--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="">打印</el-button>
      <el-button type="primary" @click="download">下载</el-button>
    </div>
    <!--弹窗-->
    <el-dialog :title="exchangeType(tableType1)+'详情'" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="formEmbedTable">
        <table>
          <tr>
            <td>网银流水号：</td>
            <td>{{popTableData.flowNo}}</td>
            <td>{{exchangeType(tableType1)}}金额：</td>
            <td>{{$tools.utils.toDecimalString(popTableData.originalAmount,true,2)}}</td>
          </tr>
          <tr>
            <td>转出账号：</td>
            <td>{{popTableData.payAccount}}</td>
            <td v-if="tableType1=='0'||tableType1=='2'">原币币种：</td>
            <td v-if="tableType1=='0'||tableType1=='2'">{{$tools.dict.CRYTrans(popTableData.currency)}}</td>
            <td v-if="tableType1=='1'">购汇币种：</td>
            <td v-if="tableType1=='1'">{{$tools.dict.CRYTrans(popTableData.orignalCurrency)}}</td>
          </tr>
          <tr>
            <td>转入账号：</td>
            <td>{{popTableData.recAccount}}</td>
            <td>{{exchangeType(tableType1)}}日期：</td>
            <td>{{$tools.utils.formatDate(popTableData.transTime,{"symbol":"YYYY-MM-DD"})}}</td>
          </tr>
          <tr>
            <td>{{exchangeAMT(tableType1)}}金额：</td>
            <td>{{$tools.utils.toDecimalString(popTableData.transAmount,true)}}</td>
            <td>{{exchangeType(tableType1)}}牌价：</td>
            <td v-if="tableType1=='0'||tableType1=='1'">{{popTableData.serviceMKT}}</td>
            <td v-else>----</td>
          </tr>
          <tr>
            <td>交易类型：</td>
            <td>{{this.exchangeType(popTableData.type1)}}</td>
            <td>交易状态：</td>
            <td>{{$tools.dict.statusTrans(popTableData.btiStatus)}}</td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="el-dialog__footer btnArea">
        <el-button @click="dialogTableVisible = false">返回</el-button>
      </div>
    </el-dialog>
    <!--弹窗--END-->
  </div>
</template>

<script>
export default {
  name: 'foreignExchangePurchaseQuery',
  components: {
  },
  data() {
    return {
      form: {
        type1: '0',
        payAccount: '',
        recAccount: '',
        currency: '',
        amtMin: '',
        amtMax: '',
        drawAmtMin: '',
        drawAmtMax: '',
        startDate: '',
        startDateObj: '',
        endDate: '',
        endDateObj: '',
        turnPageShowNum: 10,
        currentPage: 1
      },
      turnPageTotalNum:0,
      rules: {
        type1:[
          { trigger:'change', message: '请选择', required: true}
        ],
        amtMin: [
          { trigger: 'blur', validator: this.$tools.validator.amountCompare, compareList: ['amtMin', 'amtMax'], vm: this, formName: 'form' }
        ],
        amtMax: [
          { trigger: 'blur', validator: this.$tools.validator.amountCompare, compareList: ['amtMin', 'amtMax'], vm: this, formName: 'form' }
        ],
        drawAmtMin: [
          { trigger: 'blur', validator: this.$tools.validator.amountCompare, compareList: ['drawAmtMin', 'drawAmtMax'], vm: this, formName: 'form' }
        ],
        drawAmtMax: [
          { trigger: 'blur', validator: this.$tools.validator.amountCompare, compareList: ['drawAmtMin', 'drawAmtMax'], vm: this, formName: 'form' }
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
      tableType1:'0'  //查询出来的列表字段
    }
  },
  methods: {
    exchangeType(type){
      switch(type){
        case '0':
          return '结汇'
          break;
        case '1':
          return '购汇'
          break;
        case '2':
          return '套汇'
          break;
      }
    },
    exchangeAMT(type){
      switch(type){
        case '0':
          return '原币'
          break;
        case '1':
          return '人民币'
          break;
        case '2':
          return '原币'
          break;
      }
    },
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
    },
    handleCurrentChange(currentPage) {
      let _this = this
      _this.submitForm(currentPage)
    },
    requestTableList() {
      let _this = this
      _this.tableData = []
      _this.$tools.request(this, "CB050112.do", _this.form).then(data => {
        if(data.body.errorCode=='0'){
          _this.tableData = data.body.exchangeInfoList
          _this.turnPageTotalNum = data.body.turnPageTotalNum
          _this.tableType1 = _this.form.type1
        }else{
          _this.$alert(data.body.errorMsg,"温馨提示")
        }
      })
    },
    popWindow(index) {
      let _this = this
      _this.dialogTableVisible = true
      _this.popTableData = _this.tableData[index]
    },
    download(){
      let _this = this
      if(_this.tableData.length<=0){
        _this.$alert("暂无数据，不可下载","温馨提示")
      }else{
        let exchgDownloadTitleList = [{
          flowNo:'网银流水号',
          transTime:_this.exchangeType(_this.tableType1)+'日期',
          currency:_this.tableType1=='1'?'购汇币种':'原币币种',
          transAmount:_this.exchangeAMT(_this.tableType1)+'金额',
          originalAmount:_this.exchangeType(_this.tableType1)+'金额',
          serviceMKT:_this.exchangeType(_this.tableType1)+'牌价',
          type1:'交易类型'
        }]
        let url = "/api/CB050115.do"
        // let url = "/corporbank/CB050115.do"
        let form = $("<form></form>").attr("action",url).attr("method","post")
        form.append($("<input></input>").attr("type","hidden").attr("name","versionNo").attr("value","0.1"))
        form.append($("<input></input>").attr("type","hidden").attr("name","iCIFID").attr("value",_this.$tools.storage.get("user","save").iCIFID))
        form.append($("<input></input>").attr("type","hidden").attr("name","title").attr("value",_this.exchangeType(_this.tableType1)+'信息'))
        for(let i in _this.tableData){
          form.append($("<input></input>").attr("type","hidden").attr("name","exchangeInfoList["+i+"][flowNo]").attr("value",_this.tableData[i].flowNo))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchangeInfoList["+i+"][transTime]").attr("value",_this.$tools.utils.formatDate(_this.tableData[i].transTime,{"symbol":"YYYY-MM-DD"})))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchangeInfoList["+i+"][currency]").attr("value",_this.tableType1=='1'?_this.$tools.dict.CRYTrans(_this.tableData[i].orignalCurrency):_this.$tools.dict.CRYTrans(_this.tableData[i].currency)))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchangeInfoList["+i+"][transAmount]").attr("value",_this.$tools.utils.toDecimalString(_this.tableData[i].transAmount,true,2)))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchangeInfoList["+i+"][originalAmount]").attr("value",_this.$tools.utils.toDecimalString(_this.tableData[i].originalAmount,true,2)))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchangeInfoList["+i+"][serviceMKT]").attr("value",_this.tableType1=='2'?'----':_this.tableData[i].serviceMKT))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchangeInfoList["+i+"][type1]").attr("value",_this.exchangeType(_this.tableData[i].type1)))
        }
        for(let i in exchgDownloadTitleList){
          form.append($("<input></input>").attr("type","hidden").attr("name","exchgDownloadTitleList["+i+"][flowNo]").attr("value",exchgDownloadTitleList[i].flowNo))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchgDownloadTitleList["+i+"][transTime]").attr("value",exchgDownloadTitleList[i].transTime))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchgDownloadTitleList["+i+"][currency]").attr("value",exchgDownloadTitleList[i].currency))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchgDownloadTitleList["+i+"][transAmount]").attr("value",exchgDownloadTitleList[i].transAmount))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchgDownloadTitleList["+i+"][originalAmount]").attr("value",exchgDownloadTitleList[i].originalAmount))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchgDownloadTitleList["+i+"][serviceMKT]").attr("value",exchgDownloadTitleList[i].serviceMKT))
          form.append($("<input></input>").attr("type","hidden").attr("name","exchgDownloadTitleList["+i+"][type1]").attr("value",exchgDownloadTitleList[i].type1))
        }
        form.appendTo("body").submit().remove()
      }
    }
  },
  mounted() {
  }
}
</script>