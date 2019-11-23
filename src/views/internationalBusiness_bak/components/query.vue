<template>
<div class="Query">
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>填写查询信息</caption>
        <tr>
          <td>收款人：</td>
          <td>
            <el-form-item  prop="chineseAdd">
              <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>收款行：</td>
          <td>
            <el-form-item  prop="chineseAdd">
              <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>币种：</td>
          <td>
            <el-form-item  prop="chineseAdd">
              <el-select placeholder="请选择"  v-model="form.chineseName">
                <el-option :label="1" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>金额范围：</td>
          <td>
            <el-form-item  prop="chineseAdd">
              <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
            </el-form-item>
            <span>至</span>
            <el-form-item  prop="chineseAdd">
              <el-input v-model="form.chineseName" placeholder="中文名称"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td><span class="cRed">*</span>入账日期范围：</td>
          <td>
            <el-form-item  prop="chineseAdd">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <span>至</span>
            <el-form-item  prop="chineseAdd">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!--table布局--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submitForm()">查询</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </div>
    <!--查询表格-->
    <div class="tableData mt20">
      <el-table :data="tableData" stripe @select="select">
        <el-table-column type="selection" :selectable="isChoose"></el-table-column>
        <el-table-column label="业务编号" prop="NO">
          <template  scope="scope">
            <a class="cBlue" @click="popWindow">{{scope.row.NO}}</a>
            {{scope.$index}}
          </template>
        </el-table-column>
        <el-table-column label="收款人" prop="NO"></el-table-column>
        <el-table-column label="汇出金额" prop="NO"></el-table-column>
        <el-table-column label="汇出日期" prop="NO"></el-table-column>
        <el-table-column label="币种" prop="NO"></el-table-column>
        <el-table-column label="是否代付" prop="NO"></el-table-column>
        <el-table-column label="状态" prop="NO"></el-table-column>
      </el-table>
    </div>
    <!--查询表格--END-->
    <!--分页-->
    <div class="pagination tar mt20">
      <el-pagination 
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    <!--分页--END-->
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="">打印</el-button>
        <el-button @click="">下载</el-button>
    </div>
    <!--弹窗-->
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
    <!--弹窗--END-->
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
          {trigger: 'blur'}
        ]
      },
      tableData:[
        {
          NO:123
        },
        {
          NO:456
        },
        {
          NO:789
        }
      ],
      dialogTableVisible:false,
      popTableData:{}
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
    resetForm() {
      let _this=this
      _this.$refs['form'].resetFields()
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
    select(selection, row){
      console.log(selection)
      console.log(row)
    }
  },
  mounted(){ 
  }
}
</script>