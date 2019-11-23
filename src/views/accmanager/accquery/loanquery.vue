<template>
  <ynet-content id="termWithdrawList" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">填写查询信息</h3>
      <div class="p20">
        <div class="fourForm tableForm mt20">
            <!--table布局-->
            <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
              <table>
                <caption>填写查询信息</caption>
                <tr>
                  <td><span class="cRed">*</span>贷款号：</td>
                  <td>
                    <el-form-item  prop="loanNo">
                      <el-select v-model="form.loanNo" placeholder="请选择" @change="getLoanPutList">
                          <template v-for="item in deAccNoList">
                            <el-option :label="item.accNo" :value="item.accNo"></el-option>
                          </template>         
                      </el-select>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td><span class="cRed">*</span>贷款发放号：</td>
                  <td>
                    <el-form-item  prop="loanPutNo">
                      <el-select v-model="form.loanPutNo" placeholder="请选择">
                          <template v-for="item in loanPutList">
                            <el-option :label="item.accNo" :value="item.accNo"></el-option>
                          </template>         
                        </el-select>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td><span class="cRed">*</span>贷款到期：</td>
                  <td>
                    <el-form-item  prop="dateFrom">
                      <el-date-picker v-model="form.dateFrom" type="date" :editable="false" placeholder="开始日期"></el-date-picker>
                    </el-form-item>
                    <span>至</span>
                    <el-form-item  prop="dateTo">
                      <el-date-picker v-model="form.dateTo" type="date" :editable="false" placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </el-form>
            <!--table布局--END-->
        </div>
        <div class="btnArea mt20 tac">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </div>
          <!--列表table-->
        <div class="tableData mt20">
          <el-table  :data="perTableData">
            <el-table-column label="序列号">
            <template  scope="scope">
              {{Number(scope.$index)+(currentPage-1)*pageSize+1}}
            </template>
          </el-table-column>
            <el-table-column  label="贷款号" prop="loanAccNo"></el-table-column>
            <el-table-column  label="贷款账号名称" prop="loanAccName"></el-table-column>
            <el-table-column  label="贷款余额" prop="loanBalance"></el-table-column>
            <el-table-column  label="发放日期" prop="loanProviderTime"></el-table-column>
            <el-table-column  label="到期日" prop="loanxEpireTime"></el-table-column>
            <el-table-column  label="币种" prop="cry"></el-table-column>
            <el-table-column  label="利率" prop="loanRate"></el-table-column>
            <el-table-column  label="贷款状态" prop="loanSspcsStatus"></el-table-column>
          </el-table>
          <!--分页-->
          <div class="block mt30 tar" v-show="page_change">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="totalsize">
              </el-pagination>
            </div>
          <!--分页end-->
        </div>
        <!--列表table end-->

      </div>

       
      </div>
    </div>
  </ynet-content>
</template>
<script>

export default {
  name: 'accdetail',
  components: {
    
  },
  data() {
    return {
      user:this.$tools.storage.get("user","save"),
      dialogVisible:false,
      deAccNoList:[],
      loanPutList:[],
      form: {
        loanNo:'',
        loanPutNo:'',
        dateFrom:'',
        dateTo:'',
      },
      //termOptions: [],
      options: [],
      rules:{
           loanNo: [{ required: true, message: '请选择贷款编号', trigger: 'change' }],
           loanPutNo: [{ required: true, message: '请选择发放号', trigger: 'change' }],
           dateFrom: [{trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['dateFrom','dateTo'],vm:this,formName:'form'}],
           dateTo: [{trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['dateFrom','dateTo'],vm:this,formName:'form'}],
        } ,
      detailData:{},
      page_change:false,
      totalsize:0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      perTableData: [],
    }
  },
  mounted() {
    let _this = this
    _this.getdeAccNoList()
       //查询时间默认最近30天
      _this.form.dateFrom = _this.$tools.utils.differDate(29)[0]
       _this.form.dateTo = new Date()
        // _this.form.dateTo = new Date()
        // _this.form.dateFrom = new Date(_this.form.dateTo.getTime() - 1000 * 3600 * 24 * 1*30)
  },
  methods: {
    //查询贷款号
    getdeAccNoList(){
      let _this = this
      let queryData = {}
      queryData.reqTP = 'D'
      // queryData.cstNo = _this.user.hostNo
      _this.$tools.request(_this, "CB010104.do", queryData).then(
            data => {
              if(data.body.errorCode == '0'){
                _this.deAccNoList = data.body.deAccNoList
               
              }else{
                // this.$alert('查询贷款号失败', '提示', {
 		    			  //             confirmButtonText: '确定'
 		    			  //           });
              }
      })
    },
    //查询发放号
    getLoanPutList(){
      let _this = this
      let queryData = {}
      queryData.loanNo = _this.form.loanNo
      queryData.reqTP = 'P'
       _this.$tools.request(_this, "CB010104.do", queryData).then(
            data => {
              if('0' == data.body.errorCode){
                _this.loanPutList = data.body.dePutNoList
              }else{
                // this.$alert('查询贷款发放号失败', '提示', {
 		    			  //             confirmButtonText: '确定'
 		    			  //           });
              }
      })
    },
    query() {
      let _this = this
      _this.$refs.form.validate((valid)  => {
		    if(valid){
          let queryData = {}
          queryData.loanNo = _this.form.loanNo
          queryData.loanPutNo = _this.form.loanPutNo
          queryData.loadExpireStartTime = _this.$tools.utils.formatDate(_this.form.dateFrom) 
          queryData.loadExpireEndTime = _this.$tools.utils.formatDate(_this.form.dateTo)

   //       let start1 = _this.form.dateFrom.getTime()
   //       let end1 = _this.form.dateTo.getTime()
   //       if( (end1-start1) > (1000*3600*24*30*3) ){
  //          _this.$alert('查询时间跨度不能大于三个月', '提示', {
   //             confirmButtonText: '确定'
   //          })
  //           return
   //       }

          _this.$tools.request(_this, "CB010103.do", queryData).then(
            data => {
              _this.tableData = []
                _this.perTableData = []
              if('0' == data.body.errorCode){
                _this.tableData = data.body.loanQueryInfoList
                _this.totalsize = _this.tableData.length
                for(let i = 0;i < _this.totalsize;i++){
                   _this.tableData[i].loanBalance = _this.$tools.utils.currencyFormat(_this.tableData[i].loanBalance)
                   _this.tableData[i].loanProviderTime = _this.$tools.utils.formatDateSymbol(_this.tableData[i].loanProviderTime,"YYYY-MM-DD")
                   _this.tableData[i].loanxEpireTime = _this.$tools.utils.formatDateSymbol(_this.tableData[i].loanxEpireTime,"YYYY-MM-DD")
                   _this.tableData[i].cry = _this.formatCurrency(_this.tableData[i].cry)
                   _this.tableData[i].loanRate = _this.tableData[i].loanRate+'%'
                   _this.tableData[i].loanSspcsStatus = _this.formatStatus(_this.tableData[i].loanSspcsStatus)
                }
                if(_this.totalsize > _this.pageSize){
                  _this.page_change = true
                  _this.handleCurrentChange(1)
                }else{
                  _this.perTableData = _this.tableData
                }
              }else{
                _this.perTableData = []
              }
            }
          )
        }
      })
    },
    resetForm(form) {
      let _this = this
      _this.$refs[form].resetFields();
    },
    // withdraw(val) {
    //   let _this = this
    //   _this.$router.push('/accmanager/accquery/receipt')
    // },
    //币种
    formatCurrency(value){
      if('CNY' == value) return '人民币'
      if('HKD' == value) return '港元'
      if('USD' == value) return '美元'
      if('EUR' == value) return '欧元'
      if('GBP' == value) return '英镑'
      if('JPY' == value) return '日元'
      if('SGD' == value) return '新加坡币'
    },

    //贷款可疑状态
    formatStatus(value){
      if('YUQ' == value) return '逾期'
      if('FYJ' == value) return '非应计'  //非应计 指贷款本金或利息逾期90天没有收回的贷款
      if('ZHC' == value) return '正常'
    },

    handleCurrentChange(currentPage) {
      let _this = this
      let _firstIndex = (currentPage-1)*_this.pageSize
      let _lastIndex = currentPage*_this.pageSize
      _this.perTableData = _this.tableData.slice(_firstIndex,_lastIndex)
      _this.form.currentPage = currentPage
    },

  }
}
</script>