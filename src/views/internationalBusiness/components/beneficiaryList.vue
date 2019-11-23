<template>
  <div class="Query">
      <!--table布局-->
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
        <table>
          <caption>填写查询信息</caption>
          <tr>
            <td>输入查询条件：</td>
            <td>
              <el-form-item prop="beneficiaryName">
                <el-input v-model="form.beneficiaryName" placeholder="请输入受益人名称"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <!--table布局--END-->
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="addBeneficiary">新增</el-button>
      </div>

      <!--列表table-->
      <div class="tableData mt20 printArea">
        <el-table :data="tableData" stripe>
          <el-table-column label="受益人名称" prop="beneficiaryName">
          </el-table-column>
          <el-table-column label="受益人地址" prop="beneficiaryAddress"></el-table-column>

          <el-table-column label="操作">
            <template scope="scope">
              <a class="cOrange" @click="modifyData(scope.$index)">修改</a>
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
          :current-page="form.currentPage" 
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
      <!--列表table end-->
    </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'commonCounterpartyList',
  components: {},
  data() {
    return {
      dialogTableVisible1: false,
      turnPageTotalNum: "",
      form: {
        currentPage: 1,
        turnPageShowNum: 10,
        beneficiaryName:"",
        cstNo:this.$tools.storage.get("user","save").cstNo,
        proNo:this.$tools.storage.get("user","save").eCIFID,
      }, //要提交的表单
      options: [{
      }],
      tableData: [],  //当前页数据
      rules: {
        beneficiaryName: [
          {trigger:'blur', validator:this.$tools.validator.isEngNumSpace}
        ]
      },
    }
  },

  mounted() {
  },
  methods: {
    query() {
      let _this = this
      _this.handleCurrentChange()
    },
    addBeneficiary() {
      let _this = this
      _this.$emit("changePage", "1",null)
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
      _this.$tools.request(_this, "CB05060202.do", _this.form).then(
        data => {
          if(data.body.errorCode=='0'){
            _this.tableData = data.body.beneficiaryList
            _this.turnPageTotalNum = data.body.turnPageTotalNum
          }else{
            _this.$alert(data.body.errorMsg,"温馨提示")
          }
        }
      )
    },
    deleteData(row) {
      let _this = this
      this.$confirm('是否要删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this
        let form = {}
        form.beneficiaryName = row.beneficiaryName
        form.proNo = _this.form.proNo
        form.cstNo = _this.form.cstNo
        _this.$tools.request(_this, "CB05060203.do", form).then(
          _this.query()
        )
      }).catch(() => {
      })
    },
    modifyData(index) {
      let _this = this
      _this.$emit("changePage", "1", _this.tableData[index])
    },
    download(){
      let _this = this
      if(_this.tableData.length<=0){
        _this.$alert("暂无数据，不可下载","温馨提示")
      }else{
        let beneficiaryTitleList = [{beneficiaryName:'受益人名称',beneficiaryAddress:'受益人地址'}]
        let url = "/api/CB05060206.do"
        // let url = "/corporbank/CB05060206.do"
        let form = $("<form></form>").attr("action",url).attr("method","post")
        form.append($("<input></input>").attr("type","hidden").attr("name","versionNo").attr("value","0.1"))
        form.append($("<input></input>").attr("type","hidden").attr("name","iCIFID").attr("value",_this.$tools.storage.get("user","save").iCIFID))
        for(let i in _this.tableData){
          form.append($("<input></input>").attr("type","hidden").attr("name","beneficiaryList["+i+"][beneficiaryName]").attr("value",_this.tableData[i].beneficiaryName))
          form.append($("<input></input>").attr("type","hidden").attr("name","beneficiaryList["+i+"][beneficiaryAddress]").attr("value",_this.tableData[i].beneficiaryAddress))
        }
        for(let i in beneficiaryTitleList){
          form.append($("<input></input>").attr("type","hidden").attr("name","beneficiaryTitleList["+i+"][beneficiaryName]").attr("value",beneficiaryTitleList[i].beneficiaryName))
          form.append($("<input></input>").attr("type","hidden").attr("name","beneficiaryTitleList["+i+"][beneficiaryAddress]").attr("value",beneficiaryTitleList[i].beneficiaryAddress))
        }
        form.appendTo("body").submit().remove()
      }
    }
  }
}
</script>