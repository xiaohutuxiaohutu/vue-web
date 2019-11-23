<template>
<div class="Query">
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>填写查询信息</caption>
        <tr>
          <td>业务编号：</td>
          <td>
            <el-form-item  prop="busCode">
              <el-input v-model="form.busCode" placeholder="业务编号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>受益人：</td>
          <td>
            <el-form-item  prop="beneficiary">
              <el-input v-model="form.beneficiary" placeholder="受益人"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>币种：</td>
          <td>
            <el-form-item  prop="CRY">
              <el-select placeholder="----请选择----" clearable v-model="form.CRY">
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
            <el-form-item  prop="amtMin">
              <ynet-currency-input v-model="form.amtMin" name="amtMin" placeholder="最小金额" :showChinese="false"></ynet-currency-input>
            </el-form-item>
            <span>至</span>
            <el-form-item  prop="amtMax">
               <ynet-currency-input v-model="form.amtMax" name="amtMax" placeholder="最大金额" :showChinese="false"></ynet-currency-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>开证日期范围：</td>
          <td>
            <el-form-item  prop="startDateObj1">
              <el-date-picker v-model="form.startDateObj1" :picker-options="pickerOptions0" @change="form.startDate1=$tools.utils.formatDate(form.startDateObj1)" type="date" placeholder="开始日期"></el-date-picker>
            </el-form-item>
            <span>至</span>
            <el-form-item  prop="endDateObj1">
              <el-date-picker v-model="form.endDateObj1" :picker-options="pickerOptions1" @change="form.endDate1=$tools.utils.formatDate(form.endDateObj1)" type="date" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>申请日期范围：</td>
          <td>
            <el-form-item  prop="startDateObj">
              <el-date-picker v-model="form.startDateObj" :picker-options="pickerOptions0" @change="form.startDate=$tools.utils.formatDate(form.startDateObj)" type="date" placeholder="开始日期"></el-date-picker>
            </el-form-item>
            <span>至</span>
            <el-form-item  prop="endDateObj">
              <el-date-picker v-model="form.endDateObj" :picker-options="pickerOptions1" @change="form.endDate=$tools.utils.formatDate(form.endDateObj)" type="date" placeholder="结束日期"></el-date-picker>
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
        <el-table-column label="网银流水号" prop="sequenceNo">
          <template  scope="scope">
            <span><a class="cOrange" @click="popWindow(scope.row)">{{scope.row.sequenceNo}}</a></span>
          </template>
        </el-table-column>
        <el-table-column label="业务编号" prop="busCode">
          <template scope="scope">
            <span v-if="scope.row.busCode==''">----</span>
            <span v-else-if="scope.row.busCode!=''">{{scope.row.busCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开证日期" prop="openDate">
          <template scope="scope">
            <span v-if="scope.row.openDate==''">----</span>
            <span v-else-if="scope.row.openDate!=''">{{$tools.utils.formatDate(scope.row.openDate,{'symbol':"YYYY-MM-DD"})}}</span>
          </template>
        </el-table-column>
        <el-table-column label="受益人" prop="beneficiary"></el-table-column>
        <el-table-column label="金额" prop="AMTFigures">
          <template scope="scope">
            {{$tools.utils.currencyFormat(scope.row.AMTFigures)}}
          </template>
        </el-table-column>
        <el-table-column label="申请日期" prop="applyDate">
          <template scope="scope">
            <span>{{$tools.utils.formatDate(scope.row.applyDate,{'symbol':"YYYY-MM-DD"})}}</span>
          </template>
        </el-table-column>
        <el-table-column label="到期日" prop="expDt">
          <template  scope="scope">
            {{$tools.utils.formatDate(scope.row.expDt,{'symbol':"YYYY-MM-DD"})}}
          </template>
        </el-table-column>
        <el-table-column label="币种" prop="CRY">
          <template scope="scope">
            {{$tools.dict.CRYTrans(scope.row.CRY)}}
          </template>
        </el-table-column>
        <el-table-column label="信用证状态" prop="status">
          <template scope="scope">
            {{$tools.dict.statusTrans(scope.row.status)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--查询表格--END-->
    <!--分页-->
    <div class="pagination tar mt20">
      <el-pagination 
        @current-change="handleCurrentChange"
        :current-page.sync="form.currentPage"
        :page-size="form.turnPageShowNum"
        layout="total, prev, pager, next, jumper"
        :total="Number(form.turnPageTotalNum)">
      </el-pagination>
    </div>
    <!--分页--END-->
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="$tools.print()">打印</el-button>
        <el-button type="primary" @click="download">下载</el-button>
    </div>
    <!--弹窗-->
    <el-dialog :visible.sync="dialogTableVisible" v-if="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <importCreditOpenPrint :formData="detailData" :isPrint="false"></importCreditOpenPrint>
      <div slot="footer" class="el-dialog__footer btnArea">
        <el-button @click="dialogTableVisible = false">返回</el-button>
      </div>
    </el-dialog>
    <!--弹窗--END-->
  </div>
</template>

<script>
import importCreditOpenPrint from './importCreditOpenPrint'
export default {
  name:'importCreditQuery',
  components: {
    importCreditOpenPrint
  },
  props:{
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7-3600 * 1000 * 24*365;
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7+3600 * 1000 * 24;
        }
      },
      form: {
          busCode:'',
          beneficiary:'',
          CRY:'',
          amtMin:'',
          amtMax:'',
          startDate:'',
          startDateObj:'',
          endDate:'',
          endDateObj:'',
          startDate1:'',
          startDateObj1:'',
          endDate1:'',
          endDateObj1:'',
          currentPage: 1,
          turnPageShowNum:10,
          turnPageTotalNum:0
      },
      rules: {
        amtMin: [
          {trigger: 'blur', validator:this.$tools.validator.amountCompare,compareList:['amtMin','amtMax'],vm:this,formName:'form'}
        ],
        amtMax: [
          {trigger: 'blur', validator:this.$tools.validator.amountCompare,compareList:['amtMin','amtMax'],vm:this,formName:'form'}
        ],
        startDateObj: [
          {trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form',requested:false},
          {trigger: 'blur', validator:this.dateRange,compareList:['startDateObj','endDateObj'],requested:false}
        ],
        endDateObj: [
          {trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form',requested:false},
          {trigger: 'blur', validator:this.dateRange,compareList:['startDateObj','endDateObj'],requested:false}
        ],
        startDateObj1: [
          {trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['startDateObj1','endDateObj1'],vm:this,formName:'form',requested:false},
          {trigger: 'blur', validator:this.dateRange,compareList:['startDateObj1','endDateObj1'],requested:false}
        ],
        endDateObj1: [
          {trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['startDateObj1','endDateObj1'],vm:this,formName:'form',requested:false},
          {trigger: 'blur', validator:this.dateRange,compareList:['startDateObj1','endDateObj1'],requested:false}
        ],
      },
      tableData:[],
      detailData:[],
      dialogTableVisible:false,
      popTableData:{}
    }
  },
  methods: {
    submitForm(changePage) {
      let _this=this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          if(changePage){
            _this.form.currentPage=changePage
          }else{
            _this.form.currentPage=1
          }
          _this.requestTableList()
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm() {
      let _this=this
      _this.$refs['form'].resetFields()
    },
    handleCurrentChange(currentPage){
      let _this=this
      _this.submitForm(currentPage)
    },
    requestTableList(){
      let _this=this
      _this.tableData = []
      _this.$tools.request(this,"CB050307.do",_this.form).then(data => {
        _this.tableData=data.body.letterCreditList
        if(data.body.errorCode=='0'){
          _this.form.turnPageTotalNum = data.body.turnPageTotalNum
        }else{
          _this.$alert(data.body.errorMsg,"温馨提示")
        }
      })
    },
    popWindow(val){
      let _this=this
      let _fileBatchNo = ''
      if(val.fileBatchNo!=''){
        _fileBatchNo = val.fileBatchNo
      }
      _this.$tools.request(this,"CB000110.do",{fileBatchNo:_fileBatchNo}).then(
        data => {
          _this.detailData = $.extend({},val,{fileList:data.body.fileList})
          _this.dialogTableVisible=true
        })
    },
    dateRange(rule,value,callback){
      let _this = this
      let compareValue1 = _this.form[rule.compareList[0]]
      let compareValue2 = _this.form[rule.compareList[1]]
      if($.trim(compareValue1)!="" && $.trim(compareValue2)!=""){
        if(compareValue1.getTime()+3600 * 1000 * 24 *91 <= compareValue2.getTime()){
          callback("查询跨度不可超过3个月")
        }else callback()
      }
      callback()
    },
    getDateRange(){
      let _this = this
      let start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      _this.form.startDateObj = start
      _this.form.endDateObj = new Date()
      _this.form.startDate = _this.$tools.utils.formatDate(_this.form.startDateObj)
      _this.form.endDate = _this.$tools.utils.formatDate(_this.form.endDateObj)
    },
    download(){
      let _this = this
        if(_this.tableData.length<=0){
          _this.$alert("暂无数据，不可下载","温馨提示")
        }else{
          let LCDownloadTitleList = [{sequenceNo:'网银流水号',busCode:'业务编号',openDate:'开证日期',beneficiary:'受益人',AMTFigures:'金额',applyDate:'申请日期',expDt:'到期日',CRYFigures:'币种',status:'信用证状态'}]
          let url = "/api/CB050309.do"
          // let url = "/corporbank/CB050309.do"
          let form = $("<form></form>").attr("action",url).attr("method","post")
          form.append($("<input></input>").attr("type","hidden").attr("name","versionNo").attr("value","0.1"))
          form.append($("<input></input>").attr("type","hidden").attr("name","iCIFID").attr("value",_this.$tools.storage.get("user","save").iCIFID))
          for(let i in _this.tableData){
            form.append($("<input></input>").attr("type","hidden").attr("name","letterCreditList["+i+"][sequenceNo]").attr("value",_this.tableData[i].sequenceNo))
            form.append($("<input></input>").attr("type","hidden").attr("name","letterCreditList["+i+"][busCode]").attr("value",_this.tableData[i].busCode))
            form.append($("<input></input>").attr("type","hidden").attr("name","letterCreditList["+i+"][openDate]").attr("value",_this.$tools.utils.formatDate(_this.tableData[i].openDate,{"symbol":"YYYY-MM-DD"})))
            form.append($("<input></input>").attr("type","hidden").attr("name","letterCreditList["+i+"][beneficiary]").attr("value",_this.tableData[i].beneficiary))
            form.append($("<input></input>").attr("type","hidden").attr("name","letterCreditList["+i+"][AMTFigures]").attr("value",_this.$tools.utils.toDecimalString(_this.tableData[i].AMTFigures,true,2)))
            form.append($("<input></input>").attr("type","hidden").attr("name","letterCreditList["+i+"][applyDate]").attr("value",_this.$tools.utils.formatDate(_this.tableData[i].applyDate,{"symbol":"YYYY-MM-DD"})))
            form.append($("<input></input>").attr("type","hidden").attr("name","letterCreditList["+i+"][expDt]").attr("value",_this.$tools.utils.formatDate(_this.tableData[i].expDt,{"symbol":"YYYY-MM-DD"})))
            form.append($("<input></input>").attr("type","hidden").attr("name","letterCreditList["+i+"][CRYFigures]").attr("value",_this.$tools.dict.CRYTrans(_this.tableData[i].CRYFigures)))
            form.append($("<input></input>").attr("type","hidden").attr("name","letterCreditList["+i+"][status]").attr("value",_this.$tools.dict.statusTrans(_this.tableData[i].status)))
          }
          for(let i in LCDownloadTitleList){
            form.append($("<input></input>").attr("type","hidden").attr("name","LCDownloadTitleList["+i+"][sequenceNo]").attr("value",LCDownloadTitleList[i].sequenceNo))
            form.append($("<input></input>").attr("type","hidden").attr("name","LCDownloadTitleList["+i+"][busCode]").attr("value",LCDownloadTitleList[i].busCode))
            form.append($("<input></input>").attr("type","hidden").attr("name","LCDownloadTitleList["+i+"][openDate]").attr("value",LCDownloadTitleList[i].openDate))
            form.append($("<input></input>").attr("type","hidden").attr("name","LCDownloadTitleList["+i+"][beneficiary]").attr("value",LCDownloadTitleList[i].beneficiary))
            form.append($("<input></input>").attr("type","hidden").attr("name","LCDownloadTitleList["+i+"][AMTFigures]").attr("value",LCDownloadTitleList[i].AMTFigures))
            form.append($("<input></input>").attr("type","hidden").attr("name","LCDownloadTitleList["+i+"][applyDate]").attr("value",LCDownloadTitleList[i].applyDate))
            form.append($("<input></input>").attr("type","hidden").attr("name","LCDownloadTitleList["+i+"][expDt]").attr("value",LCDownloadTitleList[i].expDt))
            form.append($("<input></input>").attr("type","hidden").attr("name","LCDownloadTitleList["+i+"][CRYFigures]").attr("value",LCDownloadTitleList[i].CRYFigures))
            form.append($("<input></input>").attr("type","hidden").attr("name","LCDownloadTitleList["+i+"][status]").attr("value",LCDownloadTitleList[i].status))
          }
          form.appendTo("body").submit().remove()
        }
    }
  },
  mounted(){
    this.getDateRange()
  }
}
</script>