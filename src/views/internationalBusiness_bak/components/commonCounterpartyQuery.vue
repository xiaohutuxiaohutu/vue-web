<template>
<div class="Query">
  <template>
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>填写查询信息</caption>
        <tr>
          <td>输入查询条件：</td>
          <td>
            <el-form-item  prop="chineseName">
              <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
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
    <div class="tableData mt20">
      <el-table :data="tableData" stripe @select="select">
        <el-table-column type="selection" :selectable="isChoose"></el-table-column>
        <el-table-column label="收款人账号" prop="NO">
          <template  scope="scope">
            <a class="cBlue" @click="popWindow">{{scope.row.NO}}</a>
            {{scope.$index}}
          </template>
        </el-table-column>
        <el-table-column label="汇款人类型" prop="NO"></el-table-column>
        <el-table-column label="收入款名称及地址" prop="NO"></el-table-column>
        <el-table-column label="收款人常驻国" prop="NO"></el-table-column>
        <el-table-column label="操作" prop="NO">
          <template  scope="scope">
            <a class="cBlue" @click="modifyData(scope.$index)">修改</a>
            <a class="cBlue ml5" @click="deleteData(scope.$index)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--查询表格--END-->
    <!--分页-->
    <div class="pagination tar mt20">
      <el-pagination 
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="paginationTotal"
      >
      </el-pagination>
    </div>
    <!--分页--END-->
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="">打印</el-button>
        <el-button @click="">下载</el-button>
    </div>
    <!--弹窗详情-->
    <el-dialog title="详情" :visible.sync="dialogTableVisible">
      <div class="formEmbedTable">
        <table>
          <tr>
            <td>业务编号：</td>
            <td>{{popTableData.ceshi}}</td>
            <td>收款人：</td>
            <td></td>
          </tr>
          <tr>
            <td>出账账号：</td>
            <td></td>
            <td>收款人账号：</td>
            <td></td>
          </tr>
          <tr>
            <td>出账金额：</td>
            <td></td>
            <td>收款行：</td>
            <td></td>
          </tr>
          <tr>
            <td>出账币种：</td>
            <td></td>
            <td>账户行：</td>
            <td></td>
          </tr>
          <tr>
            <td>汇出金额：</td>
            <td></td>
            <td>是否代付：</td>
            <td></td>
          </tr>
          <tr>
            <td>汇出币种：</td>
            <td></td>
            <td>汇率：</td>
            <td></td>
          </tr>
          <tr>
            <td>汇出日期：</td>
            <td></td>
            <td>合同：</td>
            <td></td>
          </tr>
          <tr>
            <td>附言：</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">返回</el-button>
      </div>
    </el-dialog>
    <!--弹窗详情--END-->
  </template>
  <template>
    <!--table布局-->
    <el-form ref="popForm" :model="popForm" :rules="popRules" class="formEmbedTable">
      <table>
        <caption>录入收款人信息</caption>
        <tr>
          <td><span class="cRed">*</span>汇款类型：</td>
          <td>
            <el-form-item  prop="chineseAdd">
              <el-radio-group v-model="form.resource" @change="radioChage">
                <el-radio label="行内汇款"></el-radio>
                <el-radio label="行外汇款"></el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款人账号：</td>
          <td>
            <el-form-item  prop="NO">
              <el-input v-model="popForm.NO" placeholder="中文名称"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款人常驻国：</td>
          <td>
            <el-form-item  prop="chineseAdd">
              <el-select placeholder="请选择证件类型"  v-model="form.name">
                <el-option label="身份证" value="身份证"></el-option>
                <el-option label="军官证" value="军官证"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款人名称及地址：</td>
          <td>
            <el-form-item  prop="chineseAdd">
              <el-input placeholder="中文名称"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款人开户行及地址：</td>
          <td>
            <el-form-item  prop="chineseAdd">
              <el-select placeholder="请选择证件类型"  v-model="form.name">
                <el-option label="身份证" value="身份证"></el-option>
                <el-option label="军官证" value="军官证"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款人开户行代理行所号：</td>
          <td>
            <el-form-item  prop="chineseAdd">
              <el-input placeholder="中文名称"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>收款银行之代理名称及地址：</td>
          <td>
            <el-form-item  prop="chineseAdd">
              <el-select placeholder="请选择证件类型"  v-model="form.name">
                <el-option label="身份证" value="身份证"></el-option>
                <el-option label="军官证" value="军官证"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!--table布局--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submitPopForm">提交</el-button>
      <el-button @click="backPopForm">返回</el-button>
      <el-button @click="resetPopForm">重置</el-button>
    </div>
  </template>
</div>
</template>

<script>
export default {
  name:'Query',
  components: {
  },
  data() {
    return {
      form: {
          chineseName:''
      },
      rules: {
        chineseName: [
          {required: true,trigger: 'blur',message:'请输入',}
        ]
      },
      popForm:{
        NO:""
      },
      popRules:{
        NO: [
          {required: true,trigger: 'blur',message:'请输入',}
        ]
      },
      tableData:[],
      dialogTableVisible:false,
      dialogAddVisible:false,
      trIndex:'',
      dialogTitle:"新增",
      isAdd:true,
      popTableData:{},
      paginationTotal:0
    }
  },
  methods: {
    submitForm() {
      let _this=this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log('submit!!')
          _this.requestTableList()
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    addData(){
      let _this=this
      _this.isAdd=true
      _this.dialogAddVisible=true
    },
    handleCurrentChange(currentPage){
      console.log(currentPage)
    },
    requestTableList(){

    },
    popWindow(){
      let _this=this
      _this.dialogTableVisible=true
      _this.popTableData.ceshi="测试数据"
    },
    modifyData(index){
      let _this=this
      _this.isAdd=false
      _this.trIndex=index
      _this.popForm=_this.tableData[index]
      _this.dialogAddVisible=true
    },
    deleteData(index){
      let _this=this
      _this.tableData.splice(index,1)
      _this.paginationTotal=_this.tableData.length
    },
    select(selection, row){
      console.log(selection)
      console.log(row)
    },
    
    backPopForm(){
      let _this=this
      _this.dialogAddVisible=false
    },
    submitPopForm(){
      let _this=this
      _this.$refs['popForm'].validate((valid) => {
        if (valid) {
          _this.sendPopData()
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    sendPopData(){
      let _this=this
      let obj={}
      for(name in _this.popForm){
        obj[name]= _this.popForm[name]
      }
      if(_this.isAdd){
        _this.tableData.push(obj)
      }else{
        _this.tableData[_this.trIndex]=obj
      }
      _this.$refs['popForm'].resetFields()
      _this.dialogAddVisible=false
      _this.paginationTotal=_this.tableData.length
    },
    resetPopForm(){

    }
  },
  mounted(){ 
  }
}
</script>