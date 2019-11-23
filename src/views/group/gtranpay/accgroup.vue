<template>
  <ynet-content id="termDepositQuery" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea" v-if="first">
      <h3 class="functionalAreaTitle">账号分组</h3>
      <!--内容-->
      <div class="p20">
        <div class="fourForm tableForm mt20">
          <el-form ref="form" :model="form" :rules="rules">
            <el-row>
              <el-form-item label="子公司组别：" class="fullLine" prop="index">
                <el-select v-model="form.index = mostIndex" placeholder="请选择">
                  <el-option v-for="item in groupingList" :label="item.groupName" :value="item._index"></el-option>  
                </el-select>
              </el-form-item>
            </el-row>
          </el-form>
          <div  class="btnArea mt20 tac">
            <el-button type="primary" @click="query()">查询</el-button>
            <el-button type="primary" @click="toAddItem()">新增</el-button>
          </div>
        </div>
        <!--列表table-->
        <div class="tableData mt20">
          <el-table :data="perDetailItem" class="mt30">
            <el-table-column  prop="groupName" label="组别"></el-table-column>
            <el-table-column  prop="groupDesc" label="组别描述"></el-table-column>
            <el-table-column  label="操作">
               <template scope="scope">
                <span class="mr20"><a class="cOrange" @click="toModifyItem(scope.row)">修改</a></span>
                <span><a class="cOrange" @click="toDelateItem(scope.row)">删除</a></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--列表table end-->
        <!--分页-->
        <div class="ghb-pagination mt30 tac" v-if='page_change1'>
          <el-pagination @current-change="handleCurrentChange1" :current-page.sync="currentPage1" :page-size="pageSize1" :total="Number(totalSize1)"></el-pagination>
        </div>
        <!--分页end-->
      </div>
      <!--内容 end-->
    </div>
    <div class="functionalArea" v-if="second">
       <!--新增-->
      <div class="p20"> 
        <div class="fourForm tableForm mt20 mb40">
          <el-form ref="createDetailItem" :model="createDetailItem" :rules="rules">
            <el-row>
              <el-form-item label="组别名：" class="fullLine" prop="groupName">
                <el-input v-model="createDetailItem.groupName"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="组别描述：" class="fullLine" prop="groupDesc">
                <el-input v-model="createDetailItem.groupDesc"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </div>

        <div class="tableData printArea mb40">
            <el-table :data="perSubAcctNoList" @select="select" @select-all="select">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="acctNo" label="收款账户"></el-table-column>
              <el-table-column prop="acctName" label="账户名称"></el-table-column>     
            </el-table>
        </div>
        <!--分页-->
        <div class="ghb-pagination mt30 tac" v-if='page_change2'>
          <el-pagination @current-change="handleCurrentChange2" :current-page.sync="currentPage2" :page-size="pageSize2" :total="Number(totalSize2)"></el-pagination>
        </div>
        <!--分页end-->
        <div  class="btnArea mt20 mb20 tac">
            <el-button type="primary" @click="validateOptionList()">加入组列表</el-button>
        </div>

         <div class="tableData printArea mb40">
            <el-table :data="perCreateAccountList">
              <el-table-column prop="acctNo" label="收款账户"></el-table-column>
              <el-table-column prop="acctName" label="账户名称"></el-table-column>
              <el-table-column  label="操作">
                <template scope="scope">
                  <span><a class="cOrange" @click='deleteAccount(scope.row)'>删除</a></span>
                </template> 
              </el-table-column>  
            </el-table>
        </div>
        <!--分页-->
        <div class="ghb-pagination mt30 tac" v-if='page_change3'> 
          <el-pagination @current-change="handleCurrentChange3" :current-page.sync="currentPage3" :page-size="pageSize3" :total="Number(totalSize3)"></el-pagination>
        </div>
        <!--分页end-->
        <div  class="btnArea mt20 mb20 tac">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="back">返回</el-button>
        </div>
      </div>
      <!--新增 end-->
    </div>
  </ynet-content>
</template>


<script>

  export default {
    name:'accgroup',
    components:{
      
    },
    data() {
      return {
        user:this.$tools.storage.get("user","save"),
        first:true,
        second:false,
        mostIndex:'',
        form: {
          index:''
        }, 
        groupingList:[],
        detailItem:[],
        perDetailItem:[],
        createDetailItem:{},
        subAcctNoList:[],
        perSubAcctNoList:[],
        optionList:[],
        createAccountList:[],
        perCreateAccountList:[],
        submitFlag:'CB040401',
        rules:{
           groupName: [{ required: true, message: '请输入组别名', trigger: 'blur' }],
           groupDesc: [{ required: true, message: '请输入组别描述', trigger: 'blur' }],
        },                    
        page_change1:false,
        page_change2:false,
        page_change3:false,
        currentPage1: 1,
        currentPage2: 1,
        currentPage3: 1,
        pageSize1: 10,
        pageSize2: 5,
        pageSize3: 5,
        totalSize1: 0,
        totalSize2: 0,
        totalSize3: 0,
      };
    },
    mounted(){
      let _this = this
      _this.getGroupingList()
    },
    methods: {
      //获取分组列表
      getGroupingList(){
        let _this = this
        let body = {}
        body.cstNo=_this.user.cstNo
        _this.$tools.request(_this,"CB040402.do",body).then(
            data =>{
              let errorCode = data.body.errorCode
              if(errorCode == '0'){
                _this.groupingList = []
                _this.mostIndex = data.body.groupingList.length
                for(let i = 0;i<_this.mostIndex;i++){
                    _this.groupingList.push({_index:'', groupName:'',ItemData:[]})
                    _this.groupingList[i]._index = i
                    _this.groupingList[i].groupName = data.body.groupingList[i].groupName
                    _this.groupingList[i].ItemData[0] = data.body.groupingList[i] 
                }
                _this.groupingList.push({_index:_this.groupingList.length,groupName:'全部',ItemData:data.body.groupingList})
                setTimeout(function(){
                  _this.query()
                },500)
              }else{
                _this.$alert(data.body.errorMsg, '提示', {confirmButtonText: '确定'});
              }
            }
        )
      },
      //查看
      query(){
        let _this = this
        // debugger
        _this.detailItem = _this.groupingList[_this.form.index].ItemData
        _this.totalSize1 = _this.detailItem.length
        if(Number(_this.totalSize1) > Number(_this.pageSize1)){
          _this.page_change1 = true
          _this.handleCurrentChange1(1)
        }else{
          _this.perDetailItem = _this.detailItem
        }
      },
      //新增（查询收款账户列表）
      toAddItem(){
        let _this= this
        _this.submitFlag = 'CB040401'
        _this.first = false
        _this.second = true
        _this.getSubAcctNoList()
      },
      //查询收款账户列表
      getSubAcctNoList(){
        let _this = this
        let list = _this.$tools.storage.get("user","save")
        let operAccInfoList = list ? list.operAccInfoList : []
        _this.subAcctNoList = []
        for(let i=0;i<operAccInfoList.length;i++){
          let _right = operAccInfoList[i].right
          let _type = operAccInfoList[i].type
          let _currency = operAccInfoList[i].currType
          let _groupFlag = operAccInfoList[i].groupFlag
          let _groupRight = operAccInfoList[i].groupRight
          let _auth = operAccInfoList[i].auth
          if(_type == '1' && _currency == 'CNY'){//集团转账权限的活期人民币账户
            let _acno=operAccInfoList[i].accNo
            let _name=operAccInfoList[i].accName
            // let _alias=operAccInfoList[i].alias
            // if(_alias=='' ||_alias==null){
            //   _alias=_name
            // }
            // let _lable=operAccInfoList[i].accNo+'['+_this.$tools.dict.currTypeDict(operAccInfoList[i].currType) +']'+'['+_alias +']'
            // let lable=_lable
            // let value=_acno
            if(_groupFlag == '1'){
              if(_right.substr(3,1)=='1' && _groupRight != '' && _groupRight.substr(0,1) == '1'){
                  // _this.subAcctNoList.push($.extend({}, operAccInfoList[i], {"value":value,"name":_name,"label":lable}))//子公司账号列表
                  _this.subAcctNoList.push($.extend({}, {"acctNo":_acno,"acctName":_name}))//子公司账号列表
              }
            }
          }
        }
        for(let i = 0;i<_this.subAcctNoList.length;i++){
          _this.subAcctNoList[i]._index = i
        }
        _this.refreshSubAcctNoList()
        console.log(_this.subAcctNoList)
      },
      //勾选框
      select(selection){
          let _this = this
          _this.optionList = selection
      },
      //加入组列表
      createOptionList(){
        // debugger
        let _this = this
        for(let i = 0 ;i < _this.optionList.length;i++){
          _this.createAccountList.push(_this.optionList[i])
        }
        for(let i = 0 ;i < _this.optionList.length;i++){
          _this.subAcctNoList.splice(_this.optionList[i]._index-i,1)
        }
        _this.sortCreateAccountList()
        _this.sortSubAcctNoList()
        _this.optionList = []
        _this.refreshCreateAccountList()
        _this.refreshSubAcctNoList()
      },
      //校验是否可以加入组列表
      validateOptionList(){
        let _this = this
        _this.$refs['createDetailItem'].validate((valid) => {
          if (valid){
            if(_this.optionList.length < 1){
              _this.$alert('请选择要添加的账号', '温馨提示', {
                confirmButtonText: '确定',
              });
            }else{
              _this.createOptionList()
            }
          }
        })
      },
      //删除列表中的账户
      deleteAccount(row){
        let _this = this
        _this.createAccountList.splice(row._index,1)
        _this.subAcctNoList.push(row)
        _this.sortCreateAccountList()
        _this.sortSubAcctNoList()
        _this.refreshCreateAccountList()
        _this.refreshSubAcctNoList()
      },
      sortCreateAccountList(){
        let _this = this
        for(let i = 0;i<_this.createAccountList.length;i++){
          _this.createAccountList[i]._index = i
        }
      },
      sortSubAcctNoList(){
        let _this = this
        for(let i = 0;i<_this.subAcctNoList.length;i++){
          _this.subAcctNoList[i]._index = i
        }
      },
      refreshCreateAccountList(){
        let _this = this
        _this.totalSize3 = _this.createAccountList.length
        if(_this.totalSize3 > _this.pageSize3){
          _this.page_change3 = true
          _this.handleCurrentChange3(1)
        }else{
          _this.perCreateAccountList = _this.createAccountList
        }
      },
      refreshSubAcctNoList(){
        let _this = this
        _this.totalSize2 = _this.subAcctNoList.length
        if(_this.totalSize2 > _this.pageSize2){
          _this.page_change2 = true
          _this.handleCurrentChange2(1)
        }else{
          _this.perSubAcctNoList = _this.subAcctNoList
        }
      },

      toModifyItem(row){
        let _this = this
        _this.submitFlag = 'CB040403'        
        _this.createDetailItem = row
        _this.getSubAcctNoList()
        _this.first = false
        _this.second = true 
        _this.queryAcctList()
      },
      queryAcctList(){
        let _this= this
        let body = {}
        body.acctGroupNo = _this.createDetailItem.groupNo
        _this.$tools.request(_this,"CB040407.do",body).then(
          data =>{
            if('0' == data.body.errorCode){
              // debugger
              // _this.perCreateAccountList = []
              _this.optionList = data.body.acctGroupList
              _this.createOptionList()
            }else{
              _this.$alert(data.body.errorMsg, '错误', {confirmButtonText: '确定'});
            }
          }
        )
      },
      submit(){
        let _this= this
        _this.$refs.createDetailItem.validate((valid)  => {
          if (valid) {
            let body = {}
            // body.cstNo = _this.user.cstNo
            body.acctGroupNo = _this.createDetailItem.groupNo
            body.acctGroupName = _this.createDetailItem.groupName
            body.acctGroupDesc = _this.createDetailItem.groupDesc
            body.acctGroupList = _this.createAccountList
            _this.$tools.request(_this,_this.submitFlag+".do",body).then(
              data =>{
                if('0' == data.body.errorCode){
                  _this.$alert("操作成功", '提示', {confirmButtonText: '确定',
                    callback: action => {
                      _this.back()
                    }
                  });
                }else{
                  console.log("fail")
                  _this.$alert(data.body.errorMsg, '错误', {confirmButtonText: '确定'});
                }
              }
            )
          }
        })
      },
      back(){
        let _this = this
        _this.first = true
        _this.second = false

        _this.createDetailItem = {}
        _this.perSubAcctNoList = []
        _this.perCreateAccountList = []
        _this.createAccountList = []
        _this.subAcctNoList = []
        
        _this.getGroupingList()
      },
      //delete
      toDelateItem(row){
        let _this = this
        let body = {}
        body.cstNo = _this.user.cstNo
        body.acctGroupNo = row.groupNo
        _this.$tools.request(_this,"CB040404.do",body).then(
            data =>{
              if('0' == data.body.errorCode){
                _this.$alert("删除成功", '提示', {confirmButtonText: '确定',
                  callback: action => {
                    _this.getGroupingList()
                  }
                });
              }else{
                _this.$alert(data.body.errorMsg, '错误', {confirmButtonText: '确定'});
              }
            }
        )
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //分页
      handleCurrentChange1(currentPage){
          let _this = this
          let _firstIndex = (currentPage-1)*_this.pageSize1
          let _lastIndex = currentPage*_this.pageSize1
          _this.perDetailItem = _this.detailItem.slice(_firstIndex,_lastIndex)
          _this.currentPage1 = currentPage
      },
      handleCurrentChange2(currentPage){
          let _this = this
          let _firstIndex = (currentPage-1)*_this.pageSize2
          let _lastIndex = currentPage*_this.pageSize2
          _this.perSubAcctNoList = _this.subAcctNoList.slice(_firstIndex,_lastIndex)
          _this.currentPage2 = currentPage
      },
      handleCurrentChange3(currentPage){
          let _this = this
          let _firstIndex = (currentPage-1)*_this.pageSize3
          let _lastIndex = currentPage*_this.pageSize3
          _this.perCreateAccountList = _this.createAccountList.slice(_firstIndex,_lastIndex)
          _this.currentPage3 = currentPage
      },
    }
  }

</script>