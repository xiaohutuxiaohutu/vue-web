<template>
  <ynet-content id="beneficiaryList" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <div class="contentTab">
        <a href="#/internationalBusiness/commonCounterpartyMain">常用交易对手</a>
        <a href="#/internationalBusiness/commonCounterpartyMain@beneficiary" class="current">信用证受益人</a>
      </div>
      <h3 class="functionalAreaTitle">信用证受益人维护</h3>
      <!--table布局-->
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
        <table>
          <caption>填写查询信息</caption>
          <tr>
            <td>输入查询条件：</td>
            <td>
              <el-form-item prop="beneficiaryName">
                <el-input v-model="beneficiaryName" placeholder="请输入受益人名称"></el-input>
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
      <div class="tableData mt20">
        <el-table :data="tableData" stripe @select="select">
          <el-table-column type="selection"></el-table-column>

          <el-table-column label="受益人名称" prop="beneficiaryName">
            <template scope="scope">
              <a class="cBlue" @click="popWindow(scope.row)">{{scope.row.beneficiaryName}}</a>
            </template>
          </el-table-column>
          <el-table-column label="受益人地址" prop="beneficiaryAddress"></el-table-column>

          <el-table-column label="操作">
            <template scope="scope">
              <a class="cBlue" @click="modifyData(scope.row)">修改</a>
              <a class="cBlue" @click="deleteData(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--查询表格--END-->
      <!--分页-->
      <div class="pagination tar mt20">
        <el-pagination @current-change="handleCurrentChange" :current-page="form.currentPage" :page-size="form.turnPageShowNum" layout="total, prev, pager, next, jumper" :total="Number(turnPageTotalNum)">
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
  </ynet-content>
</template>


<script>
export default {
  name: 'commonCounterpartyList',
  components: {},
  data() {
    return {
      beneficiaryName: '',
      dialogTableVisible1: false,
      turnPageTotalNum: "",
      form: {
        accNo: '',
        currentPage: 1,
        turnPageShowNum: 5,
        beneficiaryName:""
      }, //要提交的表单
      options: [{
      }],
      tableData: [],  //当前页数据
      rules: {
        beneficiaryName: [
          { required: false, trigger: 'blur', message: '请输入', }
        ]
      },
    }
  },

  mounted() {
    let _this = this
    _this.$tools.storage.set("user", { "proNo": "10", "cstNo": "30" })   //储存登录数据信息
    let user = _this.$tools.storage.get("user", "save")
    _this.form.proNo = user.proNo
    _this.form.cstNo = user.cstNo
    _this.$tools.request(_this, "CB05060202.do", _this.form).then(
      data => {
        _this.tableData = data.body.beneficiaryList
        _this.turnPageTotalNum = data.body.turnPageTotalNum
      }
    )
  },
  methods: {
    change() {
      this.$router.push('/beneficiary/changeBeneficiary')//暂时这样,为了跳转到修改页面
    },
    addBeneficiary() {
      let _this = this
      _this.$emit("changePage", "1")
    },
    query() {
      let _this = this
      _this.form.turnPageShowNum = 5
      _this.form.currentPage = 1
      _this.form.beneficiaryName = _this.beneficiaryName
      _this.$tools.request(_this, "CB05060202.do", _this.form).then(
        data => {
          _this.tableData = data.body.beneficiaryList
          _this.turnPageTotalNum = data.body.turnPageTotalNum
        }
      )
    },
    withdraw(val) {
      let _this = this
      let body = {}
      body.cstNo = '01' //（测试用，实际不需要）搜索收款人信息
      body.depNo = '1010101010101010' //（测试用，实际不需要）搜索收款人信息
      val.cstNo = '01' //（测试用，实际不需要）
      val.withType = '1' //传到支取页面的字段(全部支取/部分支取) 默认全部支取
      val.PNPAmt = '' //传到支取页面的字段（支取金额）
      val.eCIFID = '00001' //（测试用，实际不需要）
      val.bsnCode = 'CB030106' //（测试用，实际不需要）
      _this.$tools.request(_this, "CB030105.do", body).then(
        data => {
          if (data.body) {
            _this.$router.push({ name: 'termWithdraw', params: $.extend({}, val, data.body) }) //向history栈添加一个新记录
          } else {

          }
        }
      )
    },
    download() {

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
    handleCurrentChange(changePage) {
      console.log(changePage)
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
          _this.tableData = data.body.beneficiaryList
          _this.turnPageTotalNum = data.body.turnPageTotalNum
        }
      )
    },
    select(selection, row) {
      console.log(selection)
      console.log(row)
    },
    deleteData(row) {
      let _this = this
      this.$confirm('是否要删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this
        _this.form.beneficiaryName = row.beneficiaryName
        alert(_this.form.beneficiaryName)
        _this.$tools.request(_this, "CB05060203.do", _this.form).then(
          _this.query()
        )
      }).catch(() => {

      })
    },
  }
}
</script>