<template>
  <ynet-content id="commonCounterpartyList" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">常用交易对手</h3>
      <div class="p20">

      <div class="twoForm tableForm mt10 mb10">
        <el-row>
          <el-col :span="24" align="middle">
              <span>输入查询条件：</span>
             <el-input v-model="cpInput" placeholder="请输入收款人账号、名称或组别" style="width:32%; margin:5px 0;">
              </el-input>
            </el-col>
        </el-row>
      </div>

          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="primary" @click="addCommonCounterparty">新增</el-button>
          </div>
        </div>

        <!--列表table-->
        <div class="tableData mt20">
         <!-- <el-table  :data="tableData" stripe >-->


          <el-table :data="tableData" border style="width: 100%">   
              <el-table-column label="收款人账号" width="150">
                        <template scope="scope">
                            <el-button type="text" @click="dialogTableVisible1 = true">
                                <span class="accoColor">1234135431321</span> 
                            </el-button>

                            <div class="fourForm tableForm mt20" >  
                                <el-dialog title="详情" :visible.sync="dialogTableVisible1">
                                    <el-form >
                                        <el-row>
                                            <el-form-item label="汇款类型：">
                                                {{ scope.row.accountNum }}
                                            </el-form-item>
                                            <el-form-item label="收款人名称及地址：">
                                                {{scope.row.accountType}}
                                            </el-form-item>
                                        </el-row>
                                        <el-row>
                                            <el-form-item label="收款人账号：">
                                                {{scope.row.accountName}}
                                            </el-form-item>
                                            <el-form-item label="收款人开户行及地址：">
                                                {{scope.row.accountAttr}}
                                            </el-form-item>
                                        </el-row>
                                        <el-row>
                                            <el-form-item label="收款人常驻国：">
                                                {{scope.row.accountMoney}}
                                            </el-form-item>
                                            <el-form-item label="收款人开户行代理行所号：">
                                                {{scope.row.accountCurrency}}
                                            </el-form-item>
                                        </el-row>
                                        <el-row>
                                            <el-form-item label="收款人组别：">
                                                {{scope.row.accountBal}}
                                            </el-form-item>
                                            <el-form-item label="收款银行之代理名称及地址：">
                                                {{scope.row.accountStatus}}
                                            </el-form-item>
                                        </el-row>
                                        
                                    </el-form>
                                </el-dialog>  
                            </div>
                        </template>
                    </el-table-column>

            <el-table-column label="收款人类型" prop="depTerm"></el-table-column>
            <el-table-column  label="收款人名称及地址" prop="accBalance"></el-table-column>
            <el-table-column  label="收款人常驻国" prop="CRY"></el-table-column>


            <el-table-column  label="操作">
              <template scope="scope">
                <span><a class="cBlue" @click="change(scope.row)">修改</a></span>
                <span><a class="cBlue" @click="change(scope.row)">删除</a></span>
                <!--<a v-link="{name='investmentTermWithdraw', params:{flowNo: scope.row.flowNo}}">支取</a>-->
              </template> 
            </el-table-column>

          </el-table>


          
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="$tools.print()">打印</el-button>
            <el-button type="primary" @click="download">下载</el-button>
          </div>
          <!--分页-->
          <div class="pagination mt30 tac">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="10">
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
  name: 'commonCounterpartyList',
  components: {},
  data() {
    return {
      cpInput:'',
      dialogTableVisible1:false,
      form: {
        accNo: ''
      }, //要提交的表单
      options: [{
        accNo: '80190030442901012',
        accName: '1'
      }],
      currentPage: 1,
      pageSize: 5,
      tableData: []  //当前页数据
    }
  },
  mounted() {
    let _this = this
    let body = {}
    body.cstNo = '01'
    _this.$tools.request(_this, "CB030101.do", body).then(
      data => {
        let _options = data.body.acctList   //可操作的所有账号
        // if(_options){
        //   for(let i=0;i<_options.length;i++){
        //     if(_options[i].type=='12'){
        //       _this.options.push(_options[i])     //可操作的定期存款账号
        //     }
        //   }
        // }
      }
    )
  },
  methods: {
    change(){
        this.$router.push('/commonCounterparty/changeCommonCounterparty')//暂时这样,为了跳转到修改页面
    },
    addCommonCounterparty(){
      this.$router.push('/commonCounterparty/addCommonCounterparty')
    },
    query() {
      let _this = this
      _this.$tools.request(_this, "CB030104.do", _this.form).then(
        data => {
            _this.tableData = data.body.acctNoList
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
            _this.$router.push({name: 'termWithdraw',params: $.extend({}, val, data.body)}) //向history栈添加一个新记录
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
    handleCurrentChange(val) {
      let _this = this
      _this.tableData = _this.loadData(`${val}`, _this.pageSize)
      console.log(`当前页: ${val}`)
    }
  }
}
</script>