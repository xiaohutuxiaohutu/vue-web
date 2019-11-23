<template>
  <ynet-content id="termWithdrawList" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑 end-->
  <!--母公司-->
    <div class="functionalArea" v-if="parent">
      <div class="p20">
        <div class="fourForm tableForm mt20">
          <el-form  class="formEmbedTable" :model="form">
            <table>
              <tr>
                <!--<td>母公司网上银行客户号：</td>
                <td>
                  <el-form-item  prop="input1">
                    {{this.relInfo.cstNo}}
                  </el-form-item>
                </td>-->
                <td>母公司客户名称：</td>
                <td>
                  <el-form-item>
                   {{this.relInfo.cnName}}
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <!--<td>母公司证件类型：</td>
                <td>
                  <el-form-item  prop="input1">
                    {{this.$tools.dict.certTypeDict(this.relInfo.certType)}}
                  </el-form-item>
                </td>-->
                <td>集团服务开通状态：</td>
                <td>
                  <el-form-item v-if="relInfo.state=='00'">已签约</el-form-item>
                  <el-form-item v-if="relInfo.state=='01'">未签约</el-form-item>
                </td>
              </tr>
              <tr>
                <!--<td>母公司证件证件：</td>
                <td>
                  <el-form-item  prop="input1">
                    {{this.relInfo.certNo}}
                  </el-form-item>
                </td>-->
                <td>开通日期：</td>
                <td>
                  <el-form-item>
                   {{$tools.utils.formatDate(this.relInfo.createTime,{today:true})}}
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-form>
        </div>
        <!--列表table-->
        <div class="tableData mt20">
          <el-table :data="subCstTableList">
            <el-table-column label="序号">
               <template scope="scope">
                <span>{{scope.$index+1+(currentPage-1)*pageSize}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column label="子公司客户号" prop="cstNo">
               <template scope="scope">
                <span><a class="cOrange" @click="queryDetail(scope.row)">{{scope.row.cstNo}}</a></span>
              </template>
            </el-table-column>-->
            <el-table-column  label="子公司客户名称" prop="cstName">
              <template scope="scope">
                <span><a class="cOrange" @click="queryDetail(scope.row)">{{scope.row.cstName}}</a></span>
              </template>
            </el-table-column>
            <el-table-column  label="加挂时间" prop="createTime">
              <template scope="scope">
                <span>{{$tools.utils.formatDate(scope.row.createTime,{today:true})}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column  label="子公司证件类型" prop="certType">
              <template scope="scope">
                <span>{{$tools.dict.certTypeDict(scope.row.certType)}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="子公司证件号" prop="certNo"></el-table-column>-->
          </el-table>
          <!--分页-->
          <div class="pagination mt30 tac">
            <el-pagination 
              @current-change="handleCurrentChange" 
              :current-page.sync="currentPage" 
              :page-size="pageSize" 
              layout="prev, pager, next, jumper" 
              :total="Number(storageData.length)">
            </el-pagination>
          </div>
          <!--分页end-->    
        </div>
        <!--列表table end-->
      </div>
    </div>
  <!--母公司end-->
  <!--子公司-->
    <div class="functionalArea" v-if="child">
      <div class="p20">
        <div class="fourForm tableForm mt20">
          <el-form  class="formEmbedTable" :model="form">
            <table>
              <tr>
                <!--<td>子公司网上银行客户号：</td>
                <td>
                  <el-form-item  prop="input1">
                    {{this.childInfo.cstNo}}
                  </el-form-item>
                </td>-->
                <td>子公司客户名称：</td>
                <td>
                  <el-form-item>
                   {{this.childInfo.cstName}}
                  </el-form-item>
                </td>
                <td>状态：</td>
                <td>
                  <el-form-item>
                    <span v-if="childInfo.state=='00'">正常</span>
                    <span v-if="childInfo.state=='01'">撤销</span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>关系类型：</td>
                <td>
                  <el-form-item>
                    <span v-if="childInfo.groupRel=='0'">母/子</span>
                    <span v-if="childInfo.groupRel=='1'">总/分</span>
                  </el-form-item>
                </td>
                <td>建立时间：</td>
                <td>
                  <el-form-item>
                    {{$tools.utils.formatDate(childInfo.createTime,{today:true})}}
                  </el-form-item>
                </td>
                <!--<td>子公司证件类型</td>
                <td>
                  <el-form-item  prop="input1">
                    {{this.$tools.dict.certTypeDict(this.childInfo.certType)}}
                  </el-form-item>
                </td>
                <td>子公司证件件号</td>
                <td>
                  <el-form-item>
                   {{this.childInfo.certNo}}
                  </el-form-item>
                </td>-->
              </tr>
            </table>
          </el-form>
        </div>
        <!--列表table-->
        <div class="tableData mt20">
          <el-table :data="subAcctTableList">
            <el-table-column label="子公司授权账号" prop="acctNo"></el-table-column>
            <el-table-column  label="单笔限额" prop="singleLimit">
              <template scope="scope">
                <span>{{$tools.utils.currencyFormat(scope.row.singleLimit)}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="日累计限额" prop="dayLimit">
              <template scope="scope">
                <span>{{$tools.utils.currencyFormat(scope.row.dayLimit)}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="年累计限额" prop="yearLimit">
              <template scope="scope">
                <span>{{$tools.utils.currencyFormat(scope.row.yearLimit)}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="日累计笔数" prop="dayNumLimit">
            </el-table-column>
            <el-table-column  label="授权类型" prop="right">
              <template scope="scope">
                <!--<span>{{$tools.dict.acctAuthType(scope.row.right.substring(0,1))}}</span>-->
                <span v-if="scope.row.right.substring(3,4)=='0'">查询</span>
                <span v-if="scope.row.right.substring(3,4)=='1'">转账</span>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="pagination mt30 tac">
            <el-pagination 
              @current-change="handleAcctCurrentChange" 
              :current-page.sync="acctCurrentPage" 
              :page-size="pageSize" 
              layout="prev, pager, next, jumper" 
              :total="Number(acctStorageData.length)">
            </el-pagination>
          </div>
          <!--分页end-->    
        </div>
         <div class="btnArea mt20 tac">
            <el-button @click="close">关闭</el-button>
          </div>
        <!--列表table end-->
      </div>
    </div>
  <!--子公司end-->
  </ynet-content>
</template>
<script>

export default {
  name: 'grelationquery',
  components: {
    
  },
  data() {
    return {
      relInfo: {},
      parent: true,
      child: false,
      childInfo: {},
      dialogVisible: false,
      form: {
        accNo1: '',
        accNo2:''
      }, //要提交的表单
      termOptions: [],
      options: [],
      detailData:{},
      currentPage: 1,
      acctCurrentPage: 1,
      pageSize: 10,
      startPage:0,
      endPage:9,
      subCstTableList: [], //子公司列表当前页
      subAcctTableList: [], //子账户列表当前页
      storageData:[], //子公司列表所有数据
      acctStorageData:[], //子账户列表所有数据
    }
  },
  mounted() {
    let _this = this
    let body = {}
    let user = _this.$tools.storage.get('user', 'save')
    // body.cstNo = user ? user.cstNo : ""
    _this.$tools.request(this, 'CB040101Action.do',body).then(
      data => {
        _this.storageData = []
        _this.subCstTableList = []
        if(data.body && data.body.errorCode=='0'){
          _this.relInfo = data.body
          // _this.subCstTableList = data.body.relInfoList
          _this.storageData = data.body.relInfoList
          _this.handleCurrentChange(1)
        }
      }
    )
  },
  methods: {
    queryDetail(subObj){
      let _this = this
      _this.parent = false
      _this.child = true
      _this.childInfo = subObj
      _this.$tools.request(this, 'CB040102Action.do',{hostNo: subObj.hostNo}).then(
      data => {
        _this.acctStorageData = []
        _this.subAcctTableList = []
        if(data.body && data.body.errorCode=='0'){
          // _this.subAcctTableList = data.body.subAcctList
          _this.acctStorageData = data.body.subAcctList
          _this.handleAcctCurrentChange(1)
        }
      }
    )
    },
    close(){
      let _this = this
      _this.parent = true
      _this.child = false
    }, 
    handleSizeChange(val) {
      let _this = this
      _this.tableData = _this.loadData(1, `${val}`)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      let _this = this
      // _this.tableData = _this.loadData(`${val}`, _this.pageSize)
      console.log(`当前页: ${val}`)
      _this.currentPage = val
      _this.startPage=(_this.currentPage-1)*_this.pagesize
      _this.endPage=_this.currentPage*_this.pagesize-1
      _this.subCstTableList = _this.storageData.slice((_this.currentPage-1)*_this.pageSize,_this.currentPage*_this.pageSize)
    },
    handleAcctCurrentChange(val) {
      let _this = this
      _this.acctCurrentPage = val
      _this.startPage=(_this.acctCurrentPage-1)*_this.pagesize
      _this.endPage=_this.acctCurrentPage*_this.pagesize-1
      _this.subAcctTableList = _this.acctStorageData.slice((_this.acctCurrentPage-1)*_this.pageSize,_this.acctCurrentPage*_this.pageSize)
    }
  }
}
</script>