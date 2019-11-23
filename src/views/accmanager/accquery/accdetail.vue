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
                <td><span class="cRed">*</span>账号：</td>
                <td>
                  <el-form-item  prop="accNo" class="fullLine" id="accdetail">
                    <el-select v-model="form.accNo" placeholder="请选择">
                        <template v-for="item in accountList">
                          <el-option :label="item.cardNO" :value="item.payAccountNo"></el-option>
                        </template>         
                    </el-select>
                  </el-form-item>
                </td>  
              </tr>
              <tr>
                <td><span class="cRed">*</span>记账日期范围：</td>
                <td>
                  <div class="inline-block">
                    <el-form-item  prop="startDateObj" class="first">
                      <el-date-picker v-model="form.startDateObj"  type="date" :editable="false"></el-date-picker>
                    </el-form-item>
                    <span>至</span>
                    <el-form-item  prop="endDateObj" class="second">
                      <el-date-picker v-model="form.endDateObj" type="date" :editable="false"></el-date-picker>
                    </el-form-item>
                  </div>
                  <a class="cBlue" @click="getToday">当天</a>
                  <a class="cBlue" @click="getWeek">最近一周</a>
                  <a class="cBlue" @click="getMonth">最近30天</a>
                </td>
              </tr>
            </table>
          </el-form>
          <!--table布局--END-->
            <div class="btnArea mt20 tac">
              <el-button type="primary" @click="query">查询</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </div>
          </div>

          <!--列表table-->
          <div class="tableData mt20 printArea">
            <el-table  :data="perTableData">
              <el-table-column  label="交易时间" prop="depTerm"></el-table-column>
              <el-table-column  label="收入（贷）" prop="tranAMT_C"> </el-table-column>
              <el-table-column  label="支出（借）" prop="tranAMT_D"></el-table-column>
              <el-table-column  label="余额" prop="tranBal">
                  <template scope="scope">
                      <span>
                          {{$tools.utils.currencyFormat(scope.row.tranBal)}}
                      </span>
                  </template>
              </el-table-column>
              <el-table-column  label="对方账户" prop="qteAcctTPNo"></el-table-column>
              <el-table-column  label="对方户名" prop="reciprocalAccoName"></el-table-column>
              <el-table-column  label="交易类型" prop="tranTP">
               <template scope="scope">
                      <span>
                       <!-- {{scope.row.tranTP}}-->
                           {{$tools.dict.accuntQListDict(scope.row.tranTP)}}
                      </span>
                  </template>
              </el-table-column>
            </el-table>
            <div class="tar mt10" v-if="monryTotal">
             
              <span style="color:#f18e00;" >总收入：{{inSumMoney}}</span>
              <span style="color:#f18e00;" >&nbsp&nbsp&nbsp总支出：{{outSumMoney}}</span>
            </div>
          </div>
          <!--列表table end-->
          <!--分页-->
            <div class="block mt30 tar" v-if="page_change">
              <el-pagination 
                @current-change="handleCurrentChange" 
                :current-page.sync="currentPage" 
                :page-size="pageSize" 
                layout="prev, pager, next, jumper" 
                :total="totalsize">
              </el-pagination>
            </div>
            <!--分页end-->
            <div class="reminder">
              <b>业务说明：</b>
              <div class="remiContent"> 1、带“*”为输入项为必输项</div>
              <div class="remiContent"> 2、如有疑问，请随时拨打客服电话与我们联系</div>
            </div>
          <div class="btnArea mt20 tac">
              <el-button type="primary" @click="$tools.print()">打印</el-button>
              <el-button type="primary" @click="download">下载</el-button>
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
      
      form: {
        accNo: this.$route.params.accNo,
        startDateObj:'',
        endDateObj:'',
      }, //要提交的表单
      accountList:[],
      rules:{
           accNo: [{ validator:this.accNoValidator, trigger: 'change' }],
           startDateObj: [{trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'}],
           endDateObj: [{trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'}],
        } ,
      currentPage: 1,
      totalsize: 0,
      pageSize: 10,
      page_change:false,
      monryTotal:false,
      tableData: [],
      perTableData: [],
      inSumMoney:'',
      outSumMoney:'',
      today:new Date(),
    }
  },
  mounted() {
    let _this = this
    _this.getCardList()
    _this.getMonth()
  },
  methods: {
    //获取用户账号
    getCardList(){
      let _this = this
      let _list = _this.user
      let _operAccInfoList = _list.operAccInfoList
  		for(let i=0;i<_operAccInfoList.length;i++){
          if ('1' == _operAccInfoList[i].type && '1' != _operAccInfoList[i].groupFlag) {  //只要type=1类型的账号（活期账号）和 不能是集团子公司账户
              let _acno = _operAccInfoList[i].accNo
              let _name = ''
              if('' == _operAccInfoList[i].alias){
                  _name = _operAccInfoList[i].accName
              }else{
                  _name = _operAccInfoList[i].alias
              }
              let _currType =  _this.formatCurrency(_operAccInfoList[i].currType)  
              // let _lable = _this.$tools.utils.mask(_acno,{beforeIndex:3,behindIndex:4})
              // let cardNO = _lable+'-'+_name
              let cardNO = _acno + '[' + _currType + ']' + '[' + _name + ']'
              let payAccountNo = _acno+'-'+_currType
              // console.log("cardNO",cardNO)
              // console.log("payAccountNo",payAccountNo)
              _this.accountList.push({"payAccountNo":payAccountNo,"cardNO":cardNO})
          }
  		}
    },
    query() {
      let _this = this
      _this.$refs.form.validate((valid)  => {
		    if(valid){
          let queryData = {}
          queryData.accNo = (_this.form.accNo).split("-")[0]
          queryData.tranStartDate = _this.$tools.utils.formatDate(_this.form.startDateObj)
          queryData.tranEndDate = _this.$tools.utils.formatDate(_this.form.endDateObj)

         let start1 = _this.form.startDateObj.getTime()
         let end1 = _this.form.endDateObj.getTime()
         if( (end1-start1) > (1000*3600*24*30*3) ){
           _this.$alert('查询时间跨度不能大于三个月', '提示', {
               confirmButtonText: '确定'
            })
            return
         }

        if( (_this.today.getTime() - start1) > (1000*3600*24*365) ){
            _this.$alert('查询开始时间为最近一年内', '提示', {
                  confirmButtonText: '确定'
            })
            return
        }


          queryData.cry = _this.unFormatCurrency((_this.form.accNo).split("-")[1])  //核心接口参数需要账号币种
          _this.$tools.request(_this, "CB010102.do", queryData).then(
            data => {
              _this.tableData = []
              _this.perTableData = []
              if('0' == data.body.errorCode){
                _this.monryTotal = true
                _this.inSumMoney = _this.$tools.utils.currencyFormat(data.body.inSumMoney)
                _this.outSumMoney = _this.$tools.utils.currencyFormat(data.body.outSumMoney)
                let _tableData = data.body.tradeHistArray
                for(let i = 0;i<_tableData.length;i++){
                  _tableData[i].depTerm = _this.$tools.utils.formatDateSymbol(_tableData[i].tranDate,"YYYY-MM-DD")+" "+(_tableData[i].tranTimeStamp).substr(0,5)
                  if("D" == _tableData[i].dbInd){
                    _tableData[i].tranAMT_D = _this.$tools.utils.currencyFormat(_tableData[i].tranAMT)
                    _tableData[i].tranAMT_C = "--"
                  }else{
                    _tableData[i].tranAMT_C = _this.$tools.utils.currencyFormat(_tableData[i].tranAMT)
                    _tableData[i].tranAMT_D = "--"
                  }
                  if("" == _tableData[i].qteAcctTPNo){  
                      _tableData[i].qteAcctTPNo = "--"
                  }
                  if("" == _tableData[i].reciprocalAccoName){
                      _tableData[i].reciprocalAccoName = "--"
                  }
                }
                let _index = (_tableData.length)-1
                for(let j = 0; j < (_tableData.length/2); j++, _index--){ //核心返回的数据排序是按时间递增排序，我们改为递减
                    let _temp = {}
                    _temp = _tableData[j]
                    _tableData[j] = _tableData[_index]
                    _tableData[_index] = _temp
                }


                _this.tableData = _tableData
                _this.totalsize = _this.tableData.length
                if(_this.totalsize > _this.pageSize){
                  _this.page_change = true
                  _this.handleCurrentChange(1)
                }else{
                  _this.perTableData = _this.tableData
                }
              }else{
                 _this.$alert(data.body.errorMsg, '提示', {
                     confirmButtonText: '确定'
                 })
                 return
              }
            }
          )
        }
      })
    },

    download(){
        let _this = this
            if(_this.perTableData.length<=0){
               _this.$alert("暂无数据，不可下载","温馨提示")
            }else{
                let detailQueryTitleList = [{depTerm:'交易时间',tranAMT_C:'收入（贷）',tranAMT_D:'支出（借）',tranBal:'余额',qteAcctTPNo:'对方账户',reciprocalAccoName:'对方户名',tranTP:'交易类型'}]
                let url = "/api/CB010106.do"
                let form = $("<form></form>").attr("action",url).attr("method","post")
                form.append($("<input></input>").attr("type","hidden").attr("name","versionNo").attr("value","0.1"))
                form.append($("<input></input>").attr("type","hidden").attr("name","iCIFID").attr("value",_this.user.iCIFID))
                for(let i in _this.perTableData){
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryDataList["+i+"][depTerm]").attr("value",_this.perTableData[i].depTerm))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryDataList["+i+"][tranAMT_C]").attr("value",_this.perTableData[i].tranAMT_C))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryDataList["+i+"][tranAMT_D]").attr("value",_this.perTableData[i].tranAMT_D))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryDataList["+i+"][tranBal]").attr("value",_this.$tools.utils.currencyFormat(_this.perTableData[i].tranBal)))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryDataList["+i+"][qteAcctTPNo]").attr("value",_this.perTableData[i].qteAcctTPNo))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryDataList["+i+"][reciprocalAccoName]").attr("value",_this.perTableData[i].reciprocalAccoName))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryDataList["+i+"][tranTP]").attr("value", _this.$tools.dict.accuntQListDict(_this.perTableData[i].tranTP)))
                }
                for(let i in detailQueryTitleList){
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryTitleList["+i+"][depTerm]").attr("value",detailQueryTitleList[i].depTerm))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryTitleList["+i+"][tranAMT_C]").attr("value",detailQueryTitleList[i].tranAMT_C))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryTitleList["+i+"][tranAMT_D]").attr("value",detailQueryTitleList[i].tranAMT_D))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryTitleList["+i+"][tranBal]").attr("value",detailQueryTitleList[i].tranBal))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryTitleList["+i+"][qteAcctTPNo]").attr("value",detailQueryTitleList[i].qteAcctTPNo))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryTitleList["+i+"][reciprocalAccoName]").attr("value",detailQueryTitleList[i].reciprocalAccoName))
                    form.append($("<input></input>").attr("type","hidden").attr("name","detailQueryTitleList["+i+"][tranTP]").attr("value",_this.$tools.dict.accuntQListDict(_this.perTableData[i].tranTP)))
                }
                form.appendTo("body").submit().remove()
            }
    },

    resetForm(form) {
      let _this = this
      _this.form.accNo = ''
      _this.form.startDateObj = _this.$tools.utils.differDate(29)[0]
      _this.form.endDateObj = _this.today
    },
    withdraw(val) {
      let _this = this
      _this.$router.push('/accmanager/accquery/receipt')
    },
    //翻页
    handleCurrentChange(currentPage){
        let _this = this
        let _firstIndex = (currentPage-1)*_this.pageSize
        let _lastIndex = currentPage*_this.pageSize
        _this.perTableData = _this.tableData.slice(_firstIndex,_lastIndex)
        _this.form.currentPage = currentPage
     },
     //校验查询账号
    accNoValidator(rule, value, callback){
      let _this=this
      if( ("" == value) || ("undefined" == typeof(value)))return callback("请选择查询账号")
      callback()
    },
    //当天
    getToday(){
      let _this = this
      _this.form.startDateObj = _this.today
      _this.form.endDateObj = _this.today
    },
    //最近一周
    getWeek(){
      let _this = this
      _this.form.startDateObj = _this.$tools.utils.differDate(6)[0]
      _this.form.endDateObj = _this.today
    },
    //最近30天
    getMonth(){
      let _this = this
      _this.form.startDateObj = _this.$tools.utils.differDate(29)[0]
      _this.form.endDateObj = _this.today
    },
    //获取当月最后一天
    formatEndDate(){
      let _this = this
      if(_this.form.endDateObj != ''){
        let y = _this.form.endDateObj.getFullYear()
        let m = _this.form.endDateObj.getMonth() + 1
        let d = _this.form.endDateObj.getDate()
        let endDate = new Date()
        endDate.setFullYear(y,m,d)
        endDate.setTime(endDate.getTime() - 1000 * 3600 * 24 * 1)
        return endDate
      }
    },
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
    unFormatCurrency(value){
      if('人民币' == value) return 'CNY'
      if('港元' == value) return 'HKD'
      if('美元' == value) return 'USD'
      if('欧元' == value) return 'EUR'
      if('英镑' == value) return 'GBP'
      if('日元' == value) return 'JPY'
      if('新加坡币' == value) return 'SGD'
    },
    
  }
}
</script>
<style>
 .first .el-form-item__content{padding-right:5px;}
 .second .el-form-item__content{padding-left:5px;}
 .reminder{text-align:left;margin-top:10px}
 .remiContent{text-indent:35px}
 #accdetail .el-input{width:300px;}
</style>