<template>
  <ynet-content id="termDepositQuery" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">填写查询信息</h3>
      <!--内容-->
      <div class="p20">
        <div class="fourForm tableForm mt20">
          <el-form ref="form" :model="form" :rules="rules">
            <el-row>
              <el-form-item label="定期存款账号：" class="fullLine" prop="accNo">
                <el-select v-model="form.accNo" placeholder="请选择" style="width:300px">
                  <el-option v-for="item in options" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>  
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
          <el-table :data="tableData" stripe :default-sort="{prop:'depNo',order:'descending'}">
            <el-table-column label="存单编号" width="180" prop="depNo">
              <template scope="scope">
                <span><a class="cOrange" @click="queryDetail(scope.row)">{{scope.row.depNo}}</a></span>
              </template>
            </el-table-column>
            <el-table-column  label="定期本金" prop="accBalance">
              <template scope="scope">
                {{$tools.utils.toDecimalString(scope.row.accBalance,true,2)}}
              </template>
            </el-table-column>
            <el-table-column  label="存期" prop="depTerm">
              <template scope="scope">
                {{$tools.dict.getDepTerm(scope.row.depTerm)}}
              </template>
            </el-table-column>
            <el-table-column label="起息日" prop="openAccDate">
              <template scope="scope">
                {{$tools.utils.formatDate(scope.row.openAccDate,{"symbol":"YYYY-MM-DD"})}}
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
                <span>{{scope.row.accState=='A'?'正常':'冻结'}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="开通渠道" prop="transChannel">
              <template scope="scope">
                <span>{{scope.row.transChannel=='MT'?'柜台':'网银'}}</span>
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
      </div>
      <!--内容 end-->
      
    <!-- 溫馨提示 -->
    <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
    <!-- 溫馨提示end -->
    </div>

    <!--弹窗-->
    <el-dialog title="存单详细信息" :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
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
    name:'termDepositQuery',
    components:{
      termDepositDetail
    },
    data() {
      return {
      warmTips: [
        '1.您可查询到您全部定期存款账号下，所有存单的详细信息；',
        '2.本模块仅受理人民币项下业务，暂不支持外币处理，不便之处，敬请见谅。',
      ],
        loginStorage:this.$tools.storage.get("user","save"),
        form: {
          accNo:'',
          hostNo:this.$tools.storage.get("user","save").hostNo
        }, 
        rules:{
           accNo: [
            { required: true, message: '请选择账号', trigger: 'change' }
          ],
        },            
        options:[],
        currentPage: 1,
        pageSize: 10,
        startPage:0,
        endPage:9,
        turnPageTotalNum:0,
        storageData:[],            //所有数据
        tableData:[],            //当前页数据
        dialogVisible:false,
        detailData: {}           //存单详细信息
      };
    },
    mounted(){
      let _this = this
      let _options = _this.loginStorage.operAccInfoList
      _this.options = _options.filter(_this.checkOptionsArray)
      // _this.options = [{accNo:'8900001090001701',accName:'aew2w3',currType:'CNY'}]
    },
    methods: {
      checkOptionsArray(option){
        return option.coreType=='280' && option.cstNo==this.loginStorage.cstNo
      },
      query(){
        let _this = this
        _this.storageData = []
        _this.tableData = []
        _this.$refs['form'].validate((valid) =>{
          if(valid){
            _this.$tools.request(_this,"CB030104.do",_this.form).then(
              data =>{
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 分页方法
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
<style>
</style>
