<template>
  <ynet-content id="termWithdrawList" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea" v-if="display">
      <h3 class="functionalAreaTitle">填写查询信息</h3>
      <div class="p20">
        <div class="fourForm tableForm mt20">
          <el-form ref="form" :model="form" :rules="rules">
            <el-row>
              <el-form-item label="计划状态：" class="fullLine" prop="state">
                <el-select v-model="form.state" placeholder="请选择" @change="handleStateChanged">
                  <el-option v-for="item in states" :label="item.label" :value="item.value" :key="item.value"></el-option>  
                </el-select>
              </el-form-item>
            </el-row>
          </el-form>
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="primary" @click="add" v-if="userRole=='1'">新增</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </div>
        </div>

        <!--列表table-->
        <div class="tableData mt20">
          <el-table  :data="tableData" >
            <el-table-column label="计划编号" width="150" prop="taskNo">
              <!--<template scope="scope">
                <span><a class="cOrange" @click="queryDetail(scope.row.accNo)">{{scope.row.accNo}}</a></span>
              </template>-->
            </el-table-column>
            <el-table-column label="计划归集主题" prop="taskTheme"></el-table-column>
            <el-table-column  label="收款账户" prop="recAccount"></el-table-column>
            <el-table-column  label="生效日期" width="120" prop="effectDate">
              <template scope="scope">
                <span>{{$tools.utils.formatDateSymbol(scope.row.effectDate)}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="执行次数" prop="executedTimes"></el-table-column>
            <!--<el-table-column  label="执行总数" prop="executedTotal"></el-table-column>-->
            <el-table-column  label="状态" prop="state">
              <template scope="scope">
                <span v-if="scope.row.state=='1'">已完成</span>
                <span v-if="scope.row.state=='2'">进行中</span>
                <span v-if="scope.row.state=='3'">已暂停</span>
                <span v-if="scope.row.state=='4'">已删除</span>
                <span v-if="scope.row.state=='5'">等待授权</span>
                <span v-if="scope.row.state=='6'">授权中</span>
                <span v-if="scope.row.state=='7'">授权拒绝</span>
              </template>
            </el-table-column>
            <el-table-column  label="执行明细">
              <template scope="scope">
                <span><a class="cOrange" @click="taskDetail(scope.row)">明细</a></span>
              </template>
            </el-table-column>
            <el-table-column  label="操作">
              <template scope="scope">
                <span v-if="scope.row.state=='2' && userRole=='1'">
                  <a class="cOrange mr5" @click="operate(scope.row,'P')">暂停</a>
                  <a class="cOrange ml5" @click="operate(scope.row,'D')">删除</a>
                </span>
                <span v-if="scope.row.state=='3' && userRole=='1'">
                  <a class="cOrange mr5" @click="operate(scope.row,'L')">启动</a>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block mt20" v-if='totalSize>pageSize'>
            <el-pagination 
              @current-change="handleCurrentChange" 
              :current-page.sync="currentPage" 
              :page-size="pageSize" 
              layout="total, prev, pager, next, jumper" 
              :total="totalSize">
            </el-pagination>
          </div>
          <!--分页end-->
        </div>
        <!--列表table end-->
      </div>
    </div>
     <!--执行明细-->
    <div class="functionalArea detail mb40 p20" v-if="detail">
      <el-form ref="form1" :model="form1" class="formEmbedTable mb20">
        <table>
          <caption>执行明细</caption>
          <tr>
            <td>归集计划主题：</td>
            <td colspan="3">
              <el-form-item>
                {{taskDetailObj.taskTheme}}
              </el-form-item>      
            </td>
            <td>已执行次数：</td>
              <td>
                <el-form-item>
                  {{taskDetailObj.executedTimes}}
                </el-form-item>
              </td> 
          </tr>
          <tr>
            <td>收款账号：</td>
            <td colspan="3">
              <el-form-item>
                {{taskDetailObj.recAccount}}
              </el-form-item>
            </td>
            <td>生效日期：</td>
            <td colspan="3">
              <el-form-item>
                {{$tools.utils.formatDateSymbol(taskDetailObj.effectDate)}}
              </el-form-item>
            </td>
            <!--<td>总执行次数：</td>
            <td>
              <el-form-item>
                {{taskDetailObj.executedTotal}}
              </el-form-item>
            </td>-->
          </tr>
          <!--<tr>
            <td>生效日期：</td>
            <td colspan="3">
              <el-form-item>
                {{$tools.utils.formatDateSymbol(taskDetailObj.effectDate)}}
              </el-form-item>
            </td>
          </tr>-->
        </table>
      </el-form>

      <!--列表table-->
        <div class="tableData mt20">
          <el-table  :data="transactionList" >
            <el-table-column label="网银流水号" width="200" prop="flowId">
              <template scope="scope">
                <!--<span><a class="cOrange" @click="queryDetail(scope.row.accNo)">{{scope.row.accNo}}</a></span>-->
                <span>{{scope.row.flowId}}</span>
              </template>
            </el-table-column>
            <el-table-column label="付款账号" prop="payAccountNo"></el-table-column>
            <el-table-column label="付款账户名" prop="payAccountName"></el-table-column>
            <el-table-column label="收款账号" prop="recAccountNo"></el-table-column>
            <el-table-column label="收款账户名" prop="recAccountName"></el-table-column>
            <el-table-column label="金额" prop="amount"></el-table-column>
            <el-table-column label="交易日期" prop="hostSendTime">
              <template scope="scope">
                <span>{{$tools.utils.formatDateSymbol(scope.row.hostSendTime)}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="交易状态" prop="state">
              <template scope="scope">
                <span>{{$tools.dict.statusTrans(scope.row.state)}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column  label="资金状态" prop="status"></el-table-column>-->
          </el-table>
          
          <!--分页-->
          <div class="block mt20" v-if='flowTotalNum>flowPageSize'>
            <el-pagination
              @current-change="handleFlowCurrentChange"
              :current-page.sync="currentPage"
              :page-size="flowPageSize"
              layout="total, prev, pager, next, jumper"
              :total="flowTotalNum">
            </el-pagination>
          </div>
          <!--分页end-->
           <div class="btnArea mt20 tac">
              <el-button @click="close()">关闭</el-button>
            </div>
        </div>
        <!--列表table end-->
    </div>
    <!--执行明细end-->
    <div class="functionalArea" v-if="collect">
      <h3 class="functionalAreaTitle">资金归集</h3>
      <div class="p20">
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <fillinPage v-if="stepIndex=='0'" @changeStep="changeStep" @preStep="preStep" :fillinMsg="createForm"></fillinPage>
        <confirmPage v-if="stepIndex=='1'" @changeStep="changeStep" :confirmMsg="createForm"></confirmPage>
        <resultPage v-if="stepIndex=='2'" @changeStep="changeStep" :resultMsg="createForm"></resultPage>
      </div>
    </div>
  </ynet-content>
</template>


<script>
  import fillinPage from './components/fillinPage'    //填充存入开立信息表单
  import confirmPage from './components/confirmPage'    //交易确认页面
  import resultPage from './components/resultPage'    //交易完成页面
export default {
  name: 'gantotransMain',
  components: {
    fillinPage,
    confirmPage,
    resultPage
  },
  data() {
    return {
      stepText:["填写信息","确认转账信息","提交结果"],
      stepIndex:0,
      detail:false,
      display:true,
      collect:false,
      dialogVisible:false,
      createForm: {},//创建归集计划表单
      form: {
        cstNo: '',
        state: "0",
        // currentPage: 1,
        // turnPageShowNum: 5,
      }, //要提交的表单
      rules:{
        state: [{ message: '请选择计划状态', trigger:'change', required: true}]
      },
      states:[
        {label:"全部", value:"0"},
        {label:"已完成", value:"1"},
        {label:"进行中", value:"2"},
        {label:"已暂停", value:"3"},
        {label:"已删除", value:"4"},
        {label:"等待授权", value:"5"},
        {label:"授权中", value:"6"},
        {label:"授权拒绝", value:"7"}
      ],
      options: [{
        accNo: '80190030442901012',
        accName: '1'
      }],
      taskDetailObj:{},
      detailData:{},
      currentPage:1,
      flowCurrentPage:1,
      pageSize: 5,
      flowPageSize: 10,
      totalSize: 0,
      flowTotalNum: 0,
      tableData: [],  //当前页数据
      transactionList: [],//执行明细列表
      userRole: ''//操作员角色
    }
  },
  mounted() {
    let _this = this
    let userStorge = _this.$tools.storage.get("user","save")
    _this.form.cstNo = userStorge ? userStorge.cstNo : ''
    let userRight = userStorge ? userStorge.right : ''
    _this.userRole = _this.retrieveUserRole(userRight)
  },
  methods: {
    handleStateChanged(state){
      let _this = this
      _this.currentPage = 1
    },
    retrieveUserRole(right){
      let userRight = right
      if(userRight){
        let role = userRight.substring(1,4)
        if(role == '100'){//制单员
          return '1'
        }
        if(role == '010'){//审核员
          return '2'
        }
        if(role == '001'){//管理员
          return '3'
        }
        return '0'//查询员
      }else{//默认查询员
        return '0' 
      }
    },
    operate(taskObj,flag){
      let _this = this
      let form = {}
      form.taskNo = taskObj.taskNo
      form.taskTheme = taskObj.taskTheme
      form.cstNo = _this.form.cstNo
      form.optFlag = flag

      let userStorge = _this.$tools.storage.get("user","save")
      let cstNo = userStorge.cstNo
      let userId = userStorge.eCIFID
      let newDate = [
        {key:'cstNo', value:cstNo},
        {key:'userNo', value:userId},
        {key:'taskNo', value:taskObj.taskNo},
        {key:'taskTheme', value:taskObj.taskTheme}
      ]
      let siDate = JSON.stringify(newDate);
      let certNo = userStorge.serialNo
      let ukeyNo = userStorge.uKeySn
      let arrAcc = ["归集编号:",taskObj.taskNo]
      let arrAmt = ["归集主题:",taskObj.taskTheme]
      let keyFlag = _this.$ukey
      if(keyFlag == true || keyFlag == 'true'){
        let signFlag = getSignData(arrAcc,arrAmt,siDate,certNo,ukeyNo)
        if(signFlag == false || signFlag == 'false'){
          return
        } 
        let signData = document.getElementById("signData").value.toString()
        form.signedData = signData
      }
      if(flag){
        if(flag == 'P'){//暂停
          _this.$alert('是否确定暂停该归集计划？', 'CHB', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            callback: action => {
              if(action == 'cancel') return
              //request
              _this.$tools.request(_this, "CB040305.do", form).then(
                data => {
                  let errorCode = data.body.errorCode
                  let errorMsg = data.body.errorMsg
                  if(errorCode =='0'){
                    _this.$alert('操作成功', '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        //request
                        _this.query()
                      }
                    });
                  }else{
                    _this.$alert(errorMsg, errorCode, {confirmButtonText: '确定'});
                  }
                }
              )
            }
          });
        }
        if(flag == 'D'){//删除
          _this.$alert('是否确定删除该归集计划？', 'CHB', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            callback: action => {
              if(action == 'cancel') return
              //request
              _this.$tools.request(_this, "CB040305.do", form).then(
                data => {
                  let errorCode = data.body.errorCode
                  let errorMsg = data.body.errorMsg
                  if(errorCode =='0'){
                    _this.$alert('操作成功', '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        //request
                        _this.query()
                    }});
                  }else{
                    _this.$alert(errorMsg, errorCode, {confirmButtonText: '确定'});
                  }
                }
              )
            }
          });
        }
        if(flag == 'L'){//启动
          _this.$alert('是否确定启用该归集计划？', 'CHB', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            callback: action => {
              if(action == 'cancel') return
              //request
              _this.$tools.request(_this, "CB040305.do", form).then(
                data => {
                  let errorCode = data.body.errorCode
                  let errorMsg = data.body.errorMsg
                  if(errorCode =='0'){
                    _this.$alert('操作成功', '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                          //request
                          _this.query()
                      }
                    });
                  }else{
                    _this.$alert(errorMsg, '提示', {confirmButtonText: '确定'});
                  }
                }
              )
            }
          });
        }
      }
    },
    query() {
      let _this = this
      _this.form.currentPage = _this.currentPage
      _this.form.turnPageShowNum = _this.pageSize
      _this.$tools.request(_this, "CB040301.do", _this.form).then(
        data => {
          let errorCode = data.body.errorCode
          let errorMsg = data.body.errorMsg
          if(errorCode =='0'){
            _this.tableData = data.body.cashSweepTaskList
            _this.totalSize = Number(data.body.turnPageTotalNum)
          }else{
            _this.$alert(errorMsg, '提示', {confirmButtonText: '确定'});
          }
        }
      )
    },
    queryDetail(val){
      let _this = this
      _this.dialogVisible=!_this.dialogVisible
      _this.$tools.request(_this,"CB0301011.do").then(
        data =>{
            _this.detailData= data.body.acctList[0]
          
        }
      )
    },
    taskDetail(val) {
      let _this = this
      if(val) _this.taskDetailObj = val
      let body = {}
      body.taskNo = _this.taskDetailObj.taskNo
      body.currentPage = _this.flowCurrentPage
      body.turnPageShowNum = _this.flowPageSize
      _this.$tools.request(_this, "CB040304.do", body).then(
        data => {
          let errorCode = data.body.errorCode
          if(errorCode == '0'){
            _this.transactionList = data.body.cashSweepFlowList
            _this.flowTotalNum = Number(data.body.turnPageTotalNum)
            _this.detail= true
            _this.display= false
          }else{
            _this.$alert(errorMsg, '提示', {confirmButtonText: '确定'});
          }
        }
      )
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
   add(){
    let _this= this
    _this.display = false
    _this.collect = true
   },
    loadData: function(currentPage, pageSize) {
      let _this = this
      let body = {}
      body.currentPage = currentPage
      body.pageSize = pageSize
      // _this.$tools.request(_this, ".do", body).then(
      //   data => {
      //       //将data赋值给tableData
      //       //_this.tableData = data.body.tableData
      //   }
      // )
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
      _this.currentPage = val
      _this.query()
      //_this.tableData = _this.loadData(`${val}`, _this.pageSize)
      // console.log(`当前页: ${val}`)
    },
    handleFlowCurrentChange(val) {
      let _this = this
      _this.flowCurrentPage = val
      _this.taskDetail()
      //_this.tableData = _this.loadData(`${val}`, _this.pageSize)
      // console.log(`当前页: ${val}`)
    },
    changeStep(index,formData){
      let _this=this
      _this.stepIndex=Number(index)
      if(formData) _this.createForm = formData
      _this.$tools.scrollTop()
    },
    preStep(){
      let _this = this
      _this.collect = false
      _this.display = true
      _this.createForm = {}
    },
    close(){
      let _this= this
      _this.display = true
      _this.detail = false
    }
  
  }
}
</script>