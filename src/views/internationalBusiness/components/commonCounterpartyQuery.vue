<template>
  <div class="Query">
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>填写查询信息</caption>
        <tr>
          <td>输入查询条件：</td>
          <td>
            <el-form-item prop="cpInput">
              <el-input v-model="form.cpInput" placeholder="收款人账号、名称、地址"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!--table布局--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button type="primary" @click="addData">新增</el-button>
    </div>
    <!--查询表格-->
    <div class="tableData mt20 printArea">
      <el-table :data="tableData" stripe>
        <el-table-column label="汇款类型" prop="remitType">
          <template scope="scope">
            <span>{{$tools.dict.remitType(scope.row.remitType)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="收款人账号" prop="acctNo">
          <template scope="scope">
            <a class="cOrange" @click="popWindow(scope.row)">{{scope.row.acctNo}}</a>
          </template>
        </el-table-column>
        <el-table-column label="收款人名称及地址" prop="acctNmAndAddr"></el-table-column>
        <el-table-column label="收款人常驻国" prop="country"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <a class="cOrange" @click="modifyData(scope.row)">修改</a>
            <a class="cOrange ml5" @click="deleteData(scope.row)">删除</a>
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
        :total="Number(turnPageTotalNum)">
      </el-pagination>
    </div>
    <!--分页--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="$tools.print()">打印</el-button>
      <el-button type="primary" @click="download">下载</el-button>
    </div>
    <!--弹窗详情-->
    <el-dialog title="详情" :visible.sync="dialogTableVisible" width="500px" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="formEmbedTable">
        <table>
          <tr>
            <td>汇款类型：</td>
            <td v-if="popTableData.remitType=='0'">行内汇款</td>
            <td v-if="popTableData.remitType=='1'">行外汇款</td>
          </tr>
          <tr>
            <td>收款人账号：</td>
            <td>{{popTableData.acctNo}}</td>
          </tr>
          <tr>
            <td>收款人常驻国：</td>
            <td>{{popTableData.country}}</td>
          </tr>
          <tr>
            <td>收款人组别：</td>
            <td v-if="popTableData.remitType=='0'">行内汇款</td>
            <td v-if="popTableData.remitType=='1'">行外汇款</td>
          </tr>
          <tr>
            <td>收款人名称及地址：</td>
            <td>{{popTableData.acctNm}}-{{popTableData.address}}</td>
          </tr>
          <tr>
            <td>收款人开户行及地址：</td>
            <td><span v-if="popTableData.depositOfBankName!=''">{{popTableData.depositOfBankName}}-{{popTableData.depositOfBankAddress}}</span></td>
          </tr>
          <tr v-if="popTableData.remitType=='1'">
            <td>收款人开户行代理行所号：</td>
            <td>{{popTableData.depositOfAgncBankAccoun}}</td>
          </tr>
          <tr v-if="popTableData.remitType=='1'">
            <td>收款银行之代理名称及地址：</td>
            <td><span v-if="popTableData.agncBankName!=''">{{popTableData.agncBankName}}-{{popTableData.agncBankAddress}}</span></td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="el-dialog__footer btnArea">
        <el-button @click="dialogTableVisible = false">返回</el-button>
      </div>
    </el-dialog>
    <!--弹窗详情--END-->
  </div>
</template>

<script>
export default {
  name: 'commonCounterpartyQuery',
  components: {
  },
  data() {
    return {
      turnPageTotalNum: 0,
      form: {
        cpInput: '',
        turnPageShowNum: 10,
        currentPage: 1
      },
      rules: {
        cpInput: [
          { required: false, trigger: 'blur', message: '请输入'}
        ]
      },
      tableData: [],
      popTableData: {},
      dialogTableVisible: false,
    }
  },
  mounted() {
  },
  methods: {
    submitForm() {
      let _this = this
      _this.handleCurrentChange()
    },
    addData() {
      let _this = this
      _this.$emit("changePage", "1")
    },
    handleCurrentChange(changePage) {
      let _this = this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          if (changePage) {
            _this.form.currentPage = changePage
          } else {
            _this.form.currentPage = 1
          }
        }
      });
      _this.$tools.request(_this, "CB05060106.do", _this.form).then(
        data => {
          if(data.body.errorCode=='0'){
            _this.tableData = data.body.commonPayeeList
            _this.turnPageTotalNum = data.body.turnPageTotalNum
          }else{
            _this.$alert(data.body.errorMsg,"温馨提示")
          }
        }
      )
    },
    popWindow(row) {
      let _this = this
      _this.popTableData = row
      _this.dialogTableVisible = true
    },
    modifyData(row) {
      let _this = this
      _this.$emit("changePage", "1", row)
    },
    deleteData(row) {
      let _this = this
      this.$confirm('是否要删除?','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let form = {}
        let _this = this
        form.acctNo = row.acctNo
        _this.$tools.request(_this, "CB05060104.do", form).then(data =>{
          if(data.body.errorCode=='0'){
            _this.submitForm()
          }else{
            _this.$alert(data.body.errorMsg,'提示',{
              confirmButtonText: '确定'
            })
          }
        })
      }).catch(() => {
      })
    },
    download(){
      let _this = this
      if(_this.tableData.length<=0){
        _this.$alert("暂无数据，不可下载","温馨提示")
      }else{
        let commonPayeeTitleList = [{remitType:'汇款类型',acctNo:'收款人账号',acctNmAndAddr:'收款人名称及地址',country:'收款人常驻国'}]
        let url = "/api/CB05060107.do"
        // let url = "/corporbank/CB05060107.do"
        let form = $("<form></form>").attr("action",url).attr("method","post")
        form.append($("<input></input>").attr("type","hidden").attr("name","versionNo").attr("value","0.1"))
        form.append($("<input></input>").attr("type","hidden").attr("name","iCIFID").attr("value",_this.$tools.storage.get("user","save").iCIFID))
        for(let i in _this.tableData){
          form.append($("<input></input>").attr("type","hidden").attr("name","commonPayeeList["+i+"][remitType]").attr("value",_this.tableData[i].remitType=='0'?'行内汇款':'行外汇款'))
          form.append($("<input></input>").attr("type","hidden").attr("name","commonPayeeList["+i+"][acctNo]").attr("value",_this.tableData[i].acctNo))
          form.append($("<input></input>").attr("type","hidden").attr("name","commonPayeeList["+i+"][acctNmAndAddr]").attr("value",_this.tableData[i].acctNmAndAddr))
          form.append($("<input></input>").attr("type","hidden").attr("name","commonPayeeList["+i+"][country]").attr("value",_this.tableData[i].country))
        }
        for(let i in commonPayeeTitleList){
          form.append($("<input></input>").attr("type","hidden").attr("name","commonPayeeTitleList["+i+"][remitType]").attr("value",commonPayeeTitleList[i].remitType))
          form.append($("<input></input>").attr("type","hidden").attr("name","commonPayeeTitleList["+i+"][acctNo]").attr("value",commonPayeeTitleList[i].acctNo))
          form.append($("<input></input>").attr("type","hidden").attr("name","commonPayeeTitleList["+i+"][acctNmAndAddr]").attr("value",commonPayeeTitleList[i].acctNmAndAddr))
          form.append($("<input></input>").attr("type","hidden").attr("name","commonPayeeTitleList["+i+"][country]").attr("value",commonPayeeTitleList[i].country))
        }
        form.appendTo("body").submit().remove()
      }
    }
  }
}
</script>