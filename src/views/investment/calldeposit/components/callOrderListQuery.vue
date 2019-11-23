<template>
  <div class="callOrderListQuery">
    <div class="fourForm tableForm mt20">
      <el-form ref="form" :model="form" :rules="rules">
        <el-row>
          <el-form-item label="通知存款账号：" class="fullLine" prop="accNo">
            <el-select v-model="form.accNo" placeholder="请选择" style="width:300px">
                <el-option v-for="item in callOptions" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>  
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <div  class="btnArea mt20 tac">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button  @click="resetForm('form')">重置</el-button>
      </div>
    </div>
    <!--列表table-->
    <div class="tableData mt20 printArea">
      <el-table  :data="tableData" stripe :default-sort="{prop:'depNo',order:'descending'}">
        <el-table-column label="账户" width="160" prop="depNo">
          <template scope="scope">
            <span><a class="cOrange" @click="queryDetail(scope.row)">{{scope.row.depNo}}</a></span>
          </template>
        </el-table-column>
        <el-table-column  label="通知类型" prop="accTp">
          <template scope="scope">
            <span>{{$tools.dict.callType(scope.row.accTp)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="存款本金" prop="accBalance">
          <template scope="scope">
            {{$tools.utils.toDecimalString(scope.row.accBalance,true,2)}}
          </template>
        </el-table-column>
        <el-table-column  label="币种" prop="CRY">
          <template scope="scope">
            {{$tools.dict.CRYTrans(scope.row.CRY)}}
          </template>
        </el-table-column>
        <el-table-column  label="起息日" prop="openAccDate">
          <template scope="scope">
            {{$tools.utils.formatDate(scope.row.openAccDate,{"symbol":"YYYY-MM-DD"})}}
          </template>
        </el-table-column>
        <el-table-column  label="状态" prop="accState">
          <template scope="scope">
            <span v-if="scope.row.accState=='A'">正常</span>
            <span v-else-if="scope.row.accState!='A'">异常</span>
          </template>
        </el-table-column>
        <el-table-column  label="开通渠道" prop="transChannel">
          <template scope="scope">
            <span v-if="scope.row.transChannel=='MT'">柜台</span>
            <span v-else-if="scope.row.transChannel==''">网银</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作">
            <template scope="scope">
              <span><a class="cOrange" v-if="scope.row.transChannel==''" @click="withdraw(scope.row)">通知</a></span>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <!--列表table end-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="$tools.print()">打印</el-button>
      <el-button type="primary" @click="download">下载</el-button>
    </div>

    <!--分页-->
    <div class="pagination tar mt20">
      <el-pagination 
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="Number(turnPageTotalNum)">
      </el-pagination>
    </div>
    <!--分页--END-->
    <!--弹窗-->
    <el-dialog title="通知存款存单明细" :visible.sync="dialogVisible" v-if="dialogVisible">
      <callDepositDetail :detailMsg="detailData"></callDepositDetail>
      <div slot="footer" class="el-dialog__footer btnArea">
        <el-button @click="dialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
    <!--弹窗end-->
  </div>
</template>

<script>
  import callDepositDetail from '../components/callDepositDetail'
  export default {
    name:'callOrderListQuery',
    components:{
      callDepositDetail,
    },
    data() {
      return {
        loginStorage:this.$tools.storage.get("user","save"),
        form:{
          accNo:''
        },
        rules:{
          accNo: [
            { required: true, message: '请选择账号', trigger: 'change' }
          ],
        },                        
        callOptions:[],      //通知账号列表
        callOpenNode:'',  //通知账号开户网点
        callOpenBank:'',  //通知账号开户行
        currentPage: 1,
        pageSize: 10,
        startPage:0,
        endPage:9,
        turnPageTotalNum:0,
        storageData:[],        //所有数据
        tableData:[],        //当前页数据
        dialogVisible: false,
        detailData: {}
      }
    },
    mounted(){
      let _this = this
      let _options = _this.loginStorage.operAccInfoList
      _this.callOptions = _options.filter(_this.checkCallOptionsArray)
      // _this.callOptions = [{accNo:'8900001090001701',accName:'aew2w3',currType:'CNY'}]
    },
    methods: {
      checkCallOptionsArray(option){
        return option.right.substr(0,1)=='1' && option.coreType=='280' && option.cstNo==this.loginStorage.cstNo && option.auth=='2'
      },
      query(){
        let _this = this
        _this.storageData = []
        _this.tableData = []
        _this.$refs['form'].validate((valid) =>{
          if(valid){
            for(let index in _this.callOptions){
              if(_this.callOptions[index].accNo == _this.form.accNo){
                _this.callOpenNode = _this.callOptions[index].openBankNo
                _this.callOpenBank = _this.callOptions[index].openBankName
                break
              }
            }
            _this.$tools.request(_this, "CB030206.do", _this.form).then(
              data => {
                _this.storageData = data.body.acctNoList
                if(_this.storageData!='' && _this.storageData != undefined){
                  _this.turnPageTotalNum = _this.storageData.length
                  _this.handleCurrentChange(1)
                }
              })
          }
        })
      },
      resetForm(formName) {
        let _this=this
        _this.$refs[formName].resetFields()
      },
      queryDetail(val){
        let _this = this
        _this.detailData = val
        _this.dialogVisible=!_this.dialogVisible
      },
      withdraw(val) {
        let _this = this
        // val.cstNo = _this.loginStorage.cstNo
        // val.eCIFID = _this.loginStorage.eCIFID
        // val.userName = _this.loginStorage.userName
        val.bsnCode = 'CB030204'
        val.withType = '1' //默认全部支取
        val.PNPAmt = '' //支取金额
        val.transInAccNo = ''
        val.transInAccName = ''
        val.openNode = ''  //收款账号开户网点
        val.openName = ''  //收款账号开户行
        val.date = ''  //为校验方便
        val.orderDate = '' //预约日期
        let value = $.extend({},val,{callOpenNode:_this.callOpenNode,callOpenBank:_this.callOpenBank}) //向history栈添加一个新记录
        _this.$emit("goStepPage",false,0,value)
      },
      handleCurrentChange(val) {
        let _this=this
        _this.currentPage = val
        _this.startPage=(_this.currentPage-1)*_this.pagesize
        _this.endPage=_this.currentPage*_this.pagesize-1
        _this.tableData = _this.storageData.slice((_this.currentPage-1)*_this.pageSize,_this.currentPage*_this.pageSize)
        //console.log(`当前页: ${val}`)
      },
      download(){
        let _this = this
        if(_this.tableData.length<=0){
          _this.$alert("暂无数据，不可下载","温馨提示")
        }else{
          let callDepTitleList = [{depNo:'账户',transAmount:'存款本金',accTp:'通知类型',CRY:'币种',valDt:'起息日',status:'状态',channel:'开通渠道'}]
          let url = "/api/CB030212.do"
          // let url = "/corporbank/CB030212.do"
          let form = $("<form></form>").attr("action",url).attr("method","post")
          form.append($("<input></input>").attr("type","hidden").attr("name","versionNo").attr("value","0.1"))
          form.append($("<input></input>").attr("type","hidden").attr("name","iCIFID").attr("value",_this.loginStorage.iCIFID))
          for(let i in _this.tableData){
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][depNo]").attr("value",_this.tableData[i].depNo))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][transAmount]").attr("value",_this.$tools.utils.toDecimalString(_this.tableData[i].accBalance,true,2)))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][accTp]").attr("value",_this.$tools.dict.callType(_this.tableData[i].accTp)))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][CRY]").attr("value",_this.$tools.dict.CRYTrans(_this.tableData[i].CRY)))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][valDt]").attr("value",_this.$tools.utils.formatDate(_this.tableData[i].openAccDate,{"symbol":"YYYY-MM-DD"})))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][status]").attr("value",_this.tableData[i].accState=='A'?'正常':'冻结'))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][channel]").attr("value",_this.tableData[i].transChannel=='MT'?'柜台':'网银'))
          }
          for(let i in callDepTitleList){
            form.append($("<input></input>").attr("type","hidden").attr("name","callDepTitleList["+i+"][depNo]").attr("value",callDepTitleList[i].depNo))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDepTitleList["+i+"][transAmount]").attr("value",callDepTitleList[i].transAmount))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDepTitleList["+i+"][accTp]").attr("value",callDepTitleList[i].accTp))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDepTitleList["+i+"][CRY]").attr("value",callDepTitleList[i].CRY))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDepTitleList["+i+"][valDt]").attr("value",callDepTitleList[i].valDt))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDepTitleList["+i+"][status]").attr("value",callDepTitleList[i].status))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDepTitleList["+i+"][channel]").attr("value",callDepTitleList[i].channel))
          }
          form.appendTo("body").submit().remove()
        }
      },
    }
  }
</script>