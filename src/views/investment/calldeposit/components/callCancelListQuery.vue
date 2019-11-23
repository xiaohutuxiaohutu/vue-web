<template>
  <div class="callCancelListQuery">
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
      <tr>
        <td>通知存款账号：</td>
        <td>
          <el-form-item prop="accNo">
            <el-select v-model="form.accNo" placeholder="请选择" class="w300">
              <el-option v-for="item in callOptions" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>  
            </el-select>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td>日期范围：</td>
        <td>
          <el-form-item prop="startDateObj">
            <el-date-picker v-model="form.startDateObj" @change="form.startTime=$tools.utils.formatDate(form.startDateObj)" type="date" placeholder="开始日期"></el-date-picker>
          </el-form-item>
          <span>至</span>
          <el-form-item  prop="endDateObj">
            <el-date-picker v-model="form.endDateObj" @change="form.endTime=$tools.utils.formatDate(form.endDateObj)" type="date" placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </td>
      </tr>
      </table>
    </el-form>
    <div  class="btnArea mt20 tac">
      <el-button type="primary" @click="query">查询</el-button>
      <el-button  @click="resetForm('form')">重置</el-button>
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
        <el-table-column label="存款本金" prop="PNPAmt">
          <template scope="scope">
            {{$tools.utils.toDecimalString(scope.row.PNPAmt,true,2)}}
          </template>
        </el-table-column>
        <el-table-column  label="币种" prop="CRY">
          <template scope="scope">
            {{$tools.dict.CRYTrans(scope.row.CRY)}}
          </template>
        </el-table-column>
        <el-table-column  label="登记日期" prop="rgstDate">
          <template scope="scope">
            {{$tools.utils.formatDate(scope.row.rgstDate,{"symbol":"YYYY-MM-DD"})}}
          </template>
        </el-table-column>
        <el-table-column  label="状态" prop="recordStt">
          <template scope="scope">
            <span v-if="scope.row.recordStt=='N'">未取消通知</span>
            <span v-if="scope.row.recordStt=='Y'">已取消通知</span>
            <span v-if="scope.row.recordStt=='D'">已删除</span>
          </template>
        </el-table-column>
        <el-table-column  label="开通渠道" prop="channel">
          <template scope="scope">
            <span v-if="scope.row.channel==''">柜台</span>
            <span v-else-if="scope.row.channel=='03'">网银</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作">
          <template scope="scope">
            <span v-if="scope.row.recordStt=='N'"><a class="cOrange" @click="canceldraw(scope.row)">取消通知</a></span>
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
      <callDepositOrderDetail :detailMsg="detailData"></callDepositOrderDetail>
      <div slot="footer" class="el-dialog__footer btnArea">
          <el-button @click="dialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
    <!--弹窗end-->
  </div>
</template>

<script>
  import callDepositOrderDetail from '../components/callDepositOrderDetail'
  export default {
    name:'callCancelListQuery',
    components:{
      callDepositOrderDetail,
    },
    data() {
      return {
        loginStorage:this.$tools.storage.get("user","save"),
        form:{
          accNo:'',
          startTime:'',
          endTime:'',
          startDateObj:'',  //中间变量
          endDateObj:''   //中间变量
        },
        rules:{
          accNo: [
            { required: true, message: '请选择账号', trigger: 'change' }
          ],
          startDateObj: [
            {trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'}
          ],
          endDateObj: [
            {trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'}
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
        storageData:[],      //所有数据
        tableData:[],      //当前页数据
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
        _this.$refs.form.validate((valid) =>{
          if(valid){
            for(let index in _this.callOptions){
              if(_this.callOptions[index].accNo == _this.form.accNo){
                _this.callOpenNode = _this.callOptions[index].openBankNo
                _this.callOpenBank = _this.callOptions[index].openBankName
                break
              }
            }
            _this.$tools.request(_this, "CB030211.do", _this.form).then(
              data => {
                _this.storageData = data.body.adviceInfoArray
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
      canceldraw(val) {
        let _this = this
        let value = $.extend({},val,{oprType:'1',callOpenNode:_this.callOpenNode,callOpenBank:_this.callOpenBank})
        delete value.channel
        _this.$emit("goStepPage",false,true,false,0,value)
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
          let callDepTitleList = [{depNo:'账户',transAmount:'存款本金',accTp:'通知类型',CRY:'币种',valDt:'登记日期',status:'状态',channel:'开通渠道'}]
          let url = "/api/CB030212.do"
          // let url = "/corporbank/CB030212.do"
          let form = $("<form></form>").attr("action",url).attr("method","post")
          form.append($("<input></input>").attr("type","hidden").attr("name","versionNo").attr("value","0.1"))
          form.append($("<input></input>").attr("type","hidden").attr("name","iCIFID").attr("value",_this.loginStorage.iCIFID))
          for(let i in _this.tableData){
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][depNo]").attr("value",_this.tableData[i].depNo))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][transAmount]").attr("value",_this.$tools.utils.toDecimalString(_this.tableData[i].PNPAmt,true,2)))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][accTp]").attr("value",_this.$tools.dict.callType(_this.tableData[i].accTp)))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][CRY]").attr("value",_this.$tools.dict.CRYTrans(_this.tableData[i].CRY)))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][valDt]").attr("value",_this.$tools.utils.formatDate(_this.tableData[i].rgstDate,{"symbol":"YYYY-MM-DD"})))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][status]").attr("value",_this.tableData[i].recordStt=='N'?'未取消通知':(_this.tableData[i].recordStt=='Y'?'已取消通知':'已删除')))
            form.append($("<input></input>").attr("type","hidden").attr("name","callDetailList["+i+"][channel]").attr("value",_this.tableData[i].channel=='03'?'网银':'柜台'))
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
      }
    }
  }
</script>