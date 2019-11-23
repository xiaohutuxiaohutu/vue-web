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
              <el-form-item label="账号：" class="fullLine" prop="acctNo">
                <el-select v-model="form.acctNo" placeholder="请选择" width="300">
                  <el-option v-for="item in acctList" :label="item.label" :value="item.value"></el-option>  
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
        <div class="tableData mt20">
          <el-table  :data="currentAcctList" stripe >
            <el-table-column label="账号" width="180" prop="acctNo">
              <template scope="scope">
                <span><a class="cOrange" @click="queryDetail(scope.row)">{{scope.row.acctNo}}</a></span>
              </template>
            </el-table-column>
            <el-table-column  label="账号名称" prop="acctName"></el-table-column>
            <el-table-column label="可用余额" prop="avlBal">
              <template scope="scope">
                <span>{{$tools.utils.currencyFormat(scope.row.avlBal)}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column  label="账户组别" prop="acctGroup"></el-table-column>-->
            <el-table-column  label="币种" prop="currency">
              <template scope="scope">
                <span>{{$tools.dict.currTypeDict(scope.row.currency)}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="状态" prop="acctState">
              <template scope="scope">
                <span v-if="scope.row.acctState=='0'">正常</span>
                <span v-if="scope.row.acctState=='1'">解挂</span>
              </template>
            </el-table-column>
            <el-table-column  label="明细" prop="">
               <template scope="scope">
                <span><a class="cOrange" @click="clickDetail(scope.row.acctNo)">明细</a></span>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="ghb-pagination mt30 tac">
            <el-pagination 
              @current-change="handleCurrentChange" 
              :current-page.sync="currentPage" 
              :page-size="pageSize" 
              layout="prev, pager, next, jumper" 
              :total="Number(totalAcctList.length)">
            </el-pagination>
          </div>
          <!--分页end-->
        </div>
        <!--列表table end-->
      </div>
      <!--内容 end-->
    </div>

    <!--弹窗-->
    <el-dialog title="账户详细信息" :visible.sync="dialogVisible" v-if="dialogVisible" class="tac">
      <acctDetail :detailMsg="detailData"></acctDetail>
      <div slot="footer" class="dialog-footer btnArea tac">
          <el-button @click="dialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
    <!--弹窗end-->
  </ynet-content>
</template>


<script>
  import acctDetail from './components/acctDetail'
  export default {
    name:'childcompanyquery',
    components:{
      acctDetail
    },
    data() {
      return {
        form: {
          acctNo: '',
          cstNo: '',
          groupNo: ''
        }, 
        rules:{
          // acctNo: [
          //   { required: true, message: '请选择账号', trigger: 'change' }
          // ],
        },
        acctList: [{"value":"","name":"","label":"全部"}],
        currentPage: 1,
        pageSize: 10,
        currentAcctList:[],
        totalAcctList:[],
        startPage:0,
        endPage:9,
        acctListFromCB:[],
        acctListFromESB:[],
        dialogVisible:false,
        detailData: {}           //存单详细信息
      };
    },
    mounted(){
      let _this = this
      _this.retrieveAccts()
    },
    methods: {
      retrieveAccts(){
        let _this = this
        let list = _this.$tools.storage.get("user","save")
        let operAccInfoList = list ? list.operAccInfoList : []
        for(let i = 0; i < operAccInfoList.length; i++){
          let _right = operAccInfoList[i].right
          let _type = operAccInfoList[i].type
          let _currency = operAccInfoList[i].currType
          let _groupFlag = operAccInfoList[i].groupFlag
          let _groupRight = operAccInfoList[i].groupRight
          if(_type == '1' && _currency == 'CNY'){//集团转账权限的活期人民币账户
            let _acno = operAccInfoList[i].accNo
            let _name = operAccInfoList[i].accName
            let _alias=operAccInfoList[i].alias
            if(_alias=='' ||_alias==null){
              _alias=_name
            }
            let _lable=operAccInfoList[i].accNo+'['+_this.$tools.dict.currTypeDict(operAccInfoList[i].currType) +']'+'['+_alias +']'
            let lable=_lable
            let value = _acno
            if(_groupFlag == '1'){//加挂集团的子公司账户
              _this.acctList.push($.extend({}, operAccInfoList[i], {"value":value,"name":_name,"label":lable}))//子公司账号列表
            }
          }
        }
      },
      query(){
        let _this = this
        // _this.form.cstNo = _this.$tools.storage.get('user', 'save').cstNo
        // _this.form.groupNo = _this.$tools.storage.get('user', 'save').groupNo
        let form = {}
        form.acctNo = _this.form.acctNo
        _this.$tools.request(_this,"CB040103Action.do",form).then(
          data =>{
            if(data.body.errorCode == '0'){
              _this.totalAcctList = []
              _this.acctListFromCB = data.body.subActiveAcctListCB
              _this.acctListFromESB = data.body.accNoInfoList
              for(var i = 0; i < _this.acctListFromCB.length; i++){
                let cbObj = _this.acctListFromCB[i]
                for(var j = 0; j < _this.acctListFromESB.length; j++){
                  let esbObj = _this.acctListFromESB[j]
                  if(cbObj.acctNo == esbObj.accNo){
                    _this.totalAcctList.push($.extend({}, cbObj, esbObj))
                  }
                }
                _this.handleCurrentChange(1)
              }
            }else{
              _this.$alert(data.body.errorMsg, 'CHB', {
                confirmButtonText: '确定'
              });
            }
          }
        )
      },
      queryDetail(val){
        let _this = this
        _this.detailData= val
        console.log(_this.detailData)
        _this.dialogVisible=!_this.dialogVisible
      },
      clickDetail(acctNo){
        let _this = this
        _this.$router.push({name:'chilcompanydetailquery', params:{'acctNo': acctNo}})
      },
    
     resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 分页方法
      handleSizeChange(val) {
        let _this = this
        _this.pageSize = val
        _this.query()
        //console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        let _this = this
        _this.currentPage = val
        _this.startPage=(_this.currentPage-1)*_this.pagesize
        _this.endPage=_this.currentPage*_this.pagesize-1
        _this.currentAcctList = _this.totalAcctList.slice((_this.currentPage-1)*_this.pageSize,_this.currentPage*_this.pageSize)
      }
      // 分页方法end
    }
  }

</script>
