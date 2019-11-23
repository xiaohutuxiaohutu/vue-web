<template>
  <ynet-content id="termWithdrawList" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">填写查询信息</h3>
      <div class="p20">
        <div class="fourForm tableForm mt20">
          <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
            <table>
              <caption>填写查询信息</caption>
              <tr>
                <td><span class="cRed">*</span>账号：</td>
                <td>
                  <el-form-item prop="acctNo">
                    <el-select v-model="form.acctNo" placeholder="请选择">
                      <el-option v-for="item in acctList" :label="item.label" :value="item.value"></el-option>          
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td><span class="cRed">*</span>记账日期范围：</td>
                <td>
                  <el-form-item  prop="tranStartDate">
                    <el-date-picker v-model="form.tranStartDate" @change="form.startDate=$tools.utils.formatDate(form.tranStartDate)" type="date" placeholder="开始日期"></el-date-picker>
                  </el-form-item>
                  <span>至</span>
                  <el-form-item  prop="tranEndDate">
                    <el-date-picker v-model="form.tranEndDate" @change="form.endDate=$tools.utils.formatDate(form.tranEndDate)" type="date" placeholder="结束日期"></el-date-picker>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-form>
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </div>
        </div>

        <!--列表table-->
        <div class="tableData mt20" >
        <div class="printArea" >
          <el-table  :data="tableData">
            <el-table-column label="记账日期" prop="acctDate">
              <template scope="scope">
                <span>{{$tools.utils.formatDateSymbol(scope.row.acctDate,'YYYY-MM-DD')}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="交易时间" prop="tranTime">
              <template scope="scope">
                <span>{{$tools.utils.formatDateSymbol(scope.row.tranDate,'YYYY-MM-DD')}}</span>
                <p>{{scope.row.tranTime}}</p>
              </template>
            </el-table-column>
            <el-table-column  label="对方账号" prop="payeeAcctNo">
              <template scope="scope">
                <span v-if="scope.row.payeeAcctNo!=''">{{scope.row.payeeAcctNo}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column  label="对方户名" prop="payeeAcctName">
              <template scope="scope">
                <span v-if="scope.row.payeeAcctName!=''">{{scope.row.payeeAcctName}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column  label="余额" prop="acctBal">
              <template scope="scope">
                <span v-if="scope.row.acctBal!=''">{{$tools.utils.currencyFormat(scope.row.acctBal)}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column  label="支出" prop="tranAmount">
              <template scope="scope">
                <span v-if="scope.row.debitCreditFlag=='D'">{{$tools.utils.currencyFormat(scope.row.tranAmount)}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column  label="收入" prop="tranAmount">
              <template scope="scope">
                <span v-if="scope.row.debitCreditFlag=='C'">{{$tools.utils.currencyFormat(scope.row.tranAmount)}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column  label="交易类型" prop="tranType">
              <template scope="scope">
                <span v-if="scope.row.tranType!=''">{{scope.row.tranType}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <!--<el-table-column  label="用途" prop=""></el-table-column>-->
            <el-table-column  label="附言" prop="comments">
              <template scope="scope">
                <span v-if="scope.row.comments!=''">{{scope.row.comments}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="$tools.print()">打印</el-button>
          </div>
          <!--分页-->
          <div class="pagination mt30 tac">
            <el-pagination 
              @current-change="handleCurrentChange" 
              :current-page.sync="currentPage" 
              :page-size="pageSize" 
              layout="prev, pager, next, jumper" 
              :total="Number(txnDetailList.length)">
            </el-pagination>
          </div>
          <!--分页end-->
          
        </div>
        <!--列表table end-->
      </div>
    </div>
  </ynet-content>
</template>
<script>

export default {
  name: 'chilcompanydetailquery',
  components: {
    
  },
  data() {
    return {
      dialogVisible:false,
      form: {
        acctNo: this.$route.params.acctNo || '',
        tranStartDate: '',
        tranEndDate: '',
        cry: 'CNY',
        // dateRange: []
      }, //要提交的表单
      acctList: [],
      // acctList: [{"value":"","name":"","label":"全部"}],
      options: [],
      rules:{
        acctNo: [
          { required: false, message: '请选择账号', trigger: 'blur' }
        ],
        tranStartDate: [
          {trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['tranStartDate','tranEndDate'],vm:this,formName:'form'}
        ],
        tranEndDate: [
          {trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['tranStartDate','tranEndDate'],vm:this,formName:'form'}
        ]
      },
      today: new Date(),
      detailData:{},
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      txnDetailList:[],
      startPage:0,
      endPage:9,
    }
  },
  mounted() {
    let _this = this
    _this.retrieveAccts()
    _this.getThreeMonth()
    // let body = {}
    // let user = _this.$tools.storage.get('user', 'save')
    // body.cstNo = user ? user.cstNo : ""
    // _this.$tools.request(_this, "CB040105Action.do", body).then(
    //   data => {
    //     let _options = data.body.subAcctNoList
    //     if(_options){
    //       _this.acctList.push({"acctNickName":"","acctNo":"","acctName":"全部"})
    //       for(let i=0;i<_options.length;i++){
    //         _this.acctList.push(_options[i])
    //       }
    //     }
    //   }
    // )
  },
  methods: {
    retrieveAccts(){
      let _this = this
      let list = _this.$tools.storage.get("user","save")
      let operAccInfoList = list ? list.operAccInfoList : []
      for(let i = 0; i < operAccInfoList.length; i++){
        let _right = operAccInfoList[i].right
        let _type = operAccInfoList[i].type
        let _currency = operAccInfoList[i].currType
        let _groupFlag = operAccInfoList[i].groupFlag
        let _groupRight = operAccInfoList[i].groupRight
        if(_type == '1' && _currency == 'CNY'){//集团转账权限的活期人民币账户
          let _acno = operAccInfoList[i].accNo
          let _name = operAccInfoList[i].accName
          let _alias=operAccInfoList[i].alias
          if(_alias=='' ||_alias==null){
            _alias=_name
          }
          let _lable=operAccInfoList[i].accNo+'['+_this.$tools.dict.currTypeDict(operAccInfoList[i].currType) +']'+'['+_alias +']'
          let lable=_lable
          let value = _acno
          if(_groupFlag == '1'){//加挂集团的子公司账户
            _this.acctList.push($.extend({}, operAccInfoList[i], {"value":value,"name":_name,"label":lable}))//子公司账号列表
          }
        }
      }
    },
    query() {
      let _this = this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          let body = {}
          body.cry = _this.form.cry
          body.acctNo = _this.form.acctNo
          // console.log('_this.form.startDate',_this.form.startDate)
          // console.log('_this.form.endDate',_this.form.endDate)
          body.tranStartDate = _this.form.startDate
          body.tranEndDate = _this.form.endDate
          _this.$tools.request(_this, "CB040104Action.do", body).then(
            data => {
              let errorCode = data.body.errorCode
              let errorMsg = data.body.errorMsg
              _this.tableData = []
              if(errorCode == '0'){
                // _this.tableData = data.body.txnDetailList
                _this.txnDetailList = data.body.txnDetailList
                _this.handleCurrentChange(1)
              }else{
                _this.$alert(errorMsg, '温馨提示', {confirmButtonText: '确定'});
              }
            }
          )
        } else {
          console.log('error submit!!');
        }
      });
      
    },
    resetForm(formName) {
      let _this = this
      _this.$refs[formName].resetFields();
    },
    loadData: function(currentPage, pageSize) {
      let _this = this
      let body = {}
      body.currentPage = currentPage
      body.pageSize = pageSize
      _this.$tools.request(_this, ".do", body).then(
        data => {
          //将data赋值给tableData
          //_this.tableData = data.body.tableData
        }
      )
      let temp = _this.storageData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      return temp
    },
    handleSizeChange(val) {
      let _this = this
      _this.tableData = _this.loadData(1, `${val}`)
      console.log(`每页 ${val} 条`)
    },
    //最近3个月
    getThreeMonth(){
      let _this = this
      _this.form.tranStartDate = _this.$tools.utils.differDate(90)[0]
      _this.form.startDate = _this.$tools.utils.formatDate(_this.form.tranStartDate)
      _this.form.tranEndDate = _this.today
      _this.form.endDate = _this.$tools.utils.formatDate(_this.form.tranEndDate)
      //  console.log("_this.form.tranEndDate",_this.form.tranEndDate)
      if(_this.form.acctNo) _this.query()
    },
    handleCurrentChange(val) {
      let _this = this
      _this.currentPage = val
      _this.startPage = (_this.currentPage - 1) * _this.pagesize
      _this.endPage = _this.currentPage * _this.pagesize - 1
      _this.tableData = _this.txnDetailList.slice((_this.currentPage-1)*_this.pageSize,_this.currentPage*_this.pageSize)
    }
  }
}
</script>