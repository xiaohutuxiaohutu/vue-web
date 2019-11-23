<template>
  <ynet-content id="termModeChangeList" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">填写查询信息</h3>
      <div class="p20">
        <div class="fourForm tableForm mt20">
          <el-form ref="form" :model="form" :rules="rules">
            <el-row>
              <el-form-item label="选择定期存款账号：" class="fullLine" prop="accNo">
                <el-select v-model="form.accNo" placeholder="请选择" style="width:300px">
                  <el-option v-for="item in termOptions" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>          
                </el-select>
              </el-form-item>
            </el-row>
          </el-form>
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </div>
        </div>

        <!--列表table-->
        <div class="tableData mt20 printArea">
          <el-table  :data="tableData" stripe :default-sort="{prop:'depNo',order:'descending'}">
            <el-table-column label="存单编号" width="180" prop="depNo">
               <template scope="scope">
                <span><a class="cOrange" @click="queryDetail(scope.row)">{{scope.row.depNo}}</a></span>
              </template>
            </el-table-column>
            <el-table-column label="存期" prop="depTerm">
              <template scope="scope">
                {{$tools.dict.getDepTerm(scope.row.depTerm)}}
              </template>
            </el-table-column>
            <el-table-column  label="定期本金" prop="availBalance">
              <template scope="scope">
                {{$tools.utils.toDecimalString(scope.row.availBalance,true,2)}}
              </template>
            </el-table-column>
            <el-table-column  label="币种" prop="CRY">
              <template scope="scope">
                {{$tools.dict.CRYTrans(scope.row.CRY)}}
              </template>
            </el-table-column>
            <el-table-column  label="利率" prop="interestRate"></el-table-column>
            <el-table-column  label="到期日" prop="expDt">
              <template scope="scope">
                {{$tools.utils.formatDate(scope.row.expDt,{"symbol":"YYYY-MM-DD"})}}
              </template>
            </el-table-column>
            <el-table-column  label="状态" prop="accState">
              <template scope="scope">
                <span v-if="scope.row.accState=='A'">正常</span>
                <span v-else-if="scope.row.accState!='A'">冻结</span>
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
                <span><a class="cOrange" v-if="scope.row.transChannel==''" @click="change(scope.row)">更改</a></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
        <!--列表table end-->
      </div>
    </div>
    <!--弹窗-->
    <el-dialog title="存单详细信息" :visible.sync="dialogVisible" v-if="dialogVisible">
      <termDepositDetail :detailMsg="detailData"></termDepositDetail>
      <div slot="footer" class="el-dialog__footer btnArea">
          <el-button @click="dialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
    <!--弹窗end-->
  </ynet-content>
</template>

<script>
import termDepositDetail from './components/termDepositDetail'
  export default {
    name: 'termModeChangeList',
    components:{
      termDepositDetail
    },
    data(){
      return {
        loginStorage:this.$tools.storage.get("user","save"),
        dialogVisible:false,
        form: {
          accNo: ''
        },   //要提交的表单
        termOptions:[],      //定期账号列表
        termOpenNode:'',  //定期账号开户网点
        termOpenBank:'',  //定期账号开户行
        detailData:{},
        currentPage: 1,
        pageSize: 10,
        startPage:0,
        endPage:9,
        turnPageTotalNum:0,
        rules:{
          accNo: [
            { required: true, message: '请选择账号', trigger: 'change' }
          ]
        },
        storageData:[], //所有数据
        tableData:[]  //当前页数据
      }
    },
    mounted(){
      let _this = this
      let _options = _this.loginStorage.operAccInfoList
      _this.termOptions = _options.filter(_this.checkTermOptionsArray)
      // _this.termOptions = [{accNo:'8900001090001701',accName:'aew2w3',currType:'CNY'}]
    },
    methods:{
      checkTermOptionsArray(option){
        return option.right.substr(0,1)=='1' && option.coreType=='280' && option.cstNo==this.loginStorage.cstNo && option.auth=='2'
      },
      query(){
        let _this = this
        _this.storageData = []
        _this.tableData = []
        _this.$refs['form'].validate((valid) =>{
          if(valid){
            for(let index in _this.termOptions){
              if(_this.termOptions[index].accNo == _this.form.accNo){
                _this.termOpenNode = _this.termOptions[index].openBankNo
                _this.termOpenBank = _this.termOptions[index].openBankName
                break
              }
            }
            _this.$tools.request(_this, "CB030104.do", _this.form).then(
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
      queryDetail(val){
        let _this = this
        _this.detailData= val
        _this.dialogVisible=!_this.dialogVisible
      },
      change(val){
        let _this = this
        val.cstNo=_this.loginStorage.cstNo
        val.hostNo=_this.loginStorage.hostNo
        val.eCIFID = _this.loginStorage.eCIFID
        val.userName = _this.loginStorage.userName
        val.bsnCode='CB030109'
        _this.$router.push({
          name: 'termModeChange',
          params: $.extend({},val,{thirdAccNo:'',thirdAccName:'',termOpenNode:_this.termOpenNode,termOpenBank:_this.termOpenBank})}) //向history栈添加一个新记录
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
          let termDepTitleList = [{depNo:'存单编号',transAmount:'定期本金',depTerm:'存期',valDt:'起息日',CRY:'币种',interestRate:'利率',expDt:'到期日',status:'状态',channel:'开通渠道'}]
          let url = "/api/CB030113.do"
          // let url = "/corporbank/CB030113.do"
          let form = $("<form></form>").attr("action",url).attr("method","post")
          form.append($("<input></input>").attr("type","hidden").attr("name","versionNo").attr("value","0.1"))
          form.append($("<input></input>").attr("type","hidden").attr("name","iCIFID").attr("value",_this.loginStorage.iCIFID))
          for(let i in _this.tableData){
            form.append($("<input></input>").attr("type","hidden").attr("name","termDetailList["+i+"][depNo]").attr("value",_this.tableData[i].depNo))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDetailList["+i+"][transAmount]").attr("value",_this.$tools.utils.toDecimalString(_this.tableData[i].accBalance,true,2)))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDetailList["+i+"][depTerm]").attr("value",_this.$tools.dict.getDepTerm(_this.tableData[i].depTerm)))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDetailList["+i+"][valDt]").attr("value",_this.$tools.utils.formatDate(_this.tableData[i].openAccDate,{"symbol":"YYYY-MM-DD"})))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDetailList["+i+"][CRY]").attr("value",_this.$tools.dict.CRYTrans(_this.tableData[i].CRY)))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDetailList["+i+"][interestRate]").attr("value",_this.tableData[i].interestRate))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDetailList["+i+"][expDt]").attr("value",_this.$tools.utils.formatDate(_this.tableData[i].expDt,{"symbol":"YYYY-MM-DD"})))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDetailList["+i+"][status]").attr("value",_this.tableData[i].accState=='A'?'正常':'冻结'))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDetailList["+i+"][channel]").attr("value",_this.tableData[i].transChannel=='MT'?'柜台':'网银'))
          }
          for(let i in termDepTitleList){
            form.append($("<input></input>").attr("type","hidden").attr("name","termDepTitleList["+i+"][depNo]").attr("value",termDepTitleList[i].depNo))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDepTitleList["+i+"][transAmount]").attr("value",termDepTitleList[i].transAmount))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDepTitleList["+i+"][depTerm]").attr("value",termDepTitleList[i].depTerm))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDepTitleList["+i+"][valDt]").attr("value",termDepTitleList[i].valDt))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDepTitleList["+i+"][CRY]").attr("value",termDepTitleList[i].CRY))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDepTitleList["+i+"][interestRate]").attr("value",termDepTitleList[i].interestRate))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDepTitleList["+i+"][expDt]").attr("value",termDepTitleList[i].expDt))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDepTitleList["+i+"][status]").attr("value",termDepTitleList[i].status))
            form.append($("<input></input>").attr("type","hidden").attr("name","termDepTitleList["+i+"][channel]").attr("value",termDepTitleList[i].channel))
          }
          form.appendTo("body").submit().remove()
        }
      }
    }
  }
</script>