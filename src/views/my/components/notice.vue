<template>
  <div class="functionalArea">
      <h3 class="functionalAreaTitle">填写查询信息</h3>
      <div class="p20">
        <div class="fourForm tableForm mt20">
            <!--table布局-->
            <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
              <table>
                <caption>填写查询信息</caption>
                <tr>
                  <td>公告标题：</td>
                  <td>
                    <el-form-item  prop="title">
                      <el-input  v-model="form.title"  placeholder="公告标题关键词"></el-input>    
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td><span class="cRed">*</span>发布时间：</td>
                  <td>
                    <el-form-item  prop="startDateObj">
                      <el-date-picker v-model="form.startDateObj" @change="form.startDate=$tools.utils.formatDate(form.startDateObj)" type="date" placeholder="开始日期"></el-date-picker>
                    </el-form-item>
                    <span>至</span>
                    <el-form-item  prop="endDateObj">
                      <el-date-picker v-model="form.endDateObj" @change="form.endDate=$tools.utils.formatDate(form.endDateObj)" type="date" placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </el-form>
            <!--table布局--END-->
          </div>
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="query()">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button @click="back">返回</el-button>
          </div>
          <!--列表table-->
          <div class="tableData mt20">
            <el-table  :data="tableData">
              <el-table-column  label="公告编号" prop="announcementNo">
                <template  scope="scope">
                  <a class="cBlue" @click="popWindow(scope.$index)">{{scope.row.announcementNo}}</a>
                </template>
              </el-table-column>
              <el-table-column  label="公告标题" prop="title">
                <template  scope="scope">{{scope.row.title}}</template>
              </el-table-column>
              <el-table-column  label="发布时间" prop="publishTime">
                <template  scope="scope">
                  {{$tools.utils.formatDate(scope.row.publishTime,{"symbol":"YYYY-MM-DD HH:mm:ss"})}}
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination tar mt20">
              <el-pagination 
                @current-change="handleCurrentChange"
                :current-page.sync="form.currentPage"
                :page-size="form.pagesize"
                layout="total, prev, pager, next, jumper"
                :total="Number(form.annoCount)">
              </el-pagination>
            </div>
          </div>
          <!--列表table end-->
          <!--弹窗-->
          <el-dialog title="详细信息" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="formEmbedTable">
              <table>
                <caption>公告详情</caption>
                <tr>
                  <td>公告编号：</td>
                  <td>{{popTableData.announcementNo}}</td>
                  <td>公告标题：</td>
                  <td>{{popTableData.title}}</td>
                </tr>
                <tr>
                  <td>发布时间：</td>
                  <td colspan="3">{{$tools.utils.formatDate(popTableData.publishTime,{"symbol":"YYYY-MM-DD HH:mm:ss"})}}</td>
                </tr>
                <tr>
                  <td>公告内容：</td>
                  <td colspan="3"><div v-html="popTableData.content"></div></td>
                </tr>
            </table>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false">关闭</el-button>
            </div>
          </el-dialog>
          <!--弹窗--END-->
        </div>
      </div>
    </div>
</template>

<script>

export default {
    name:'notice',
    components:{
      
    },
    data() {
    return {
      form: {
        title:'',
        startDateObj:'',
        endDateObj:'',
        startDate:'',
        endDate:'',
        annoCount: 0,
        pageSize: 10,
        currentPage: 1,
      },
      rules:{
        startDateObj: [
          {trigger: 'change', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'},
        ],
        endDateObj: [
          {trigger: 'change', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'},
        ],
      } ,
      tableData:[],
      dialogTableVisible:false,
      popTableData:{},
    }
  },
  methods: {
    query(changePage){
        let _this=this
        _this.$refs['form'].validate((valid) => {
        if (valid) {
          if(changePage){
            _this.form.currentPage=changePage
          }else{
            _this.form.currentPage=1
          }
          _this.requestTableList()
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    requestTableList(){
      let _this=this
      if(_this.form.startDate!='' && _this.form.endDate!=''){
          _this.form.startDate = _this.form.startDate+'000000'
          _this.form.endDate = _this.form.endDate+'235959'
      }
      //console.log(_this.form)
      _this.$tools.request(this,"CB000204.do",_this.form).then(data => {
          _this.form.annoCount = parseInt(data.body.annoCount)
          _this.tableData = data.body.announcementList
          //console.log(_this.tableData)
      })
    },
    handleCurrentChange(currentPage){
      let _this=this
      _this.query(currentPage)
    },
    popWindow(index){
      let _this=this
      _this.popTableData=_this.tableData[index]
      _this.popTableData.content = _this.$tools.validator.unescapeHTML(_this.popTableData.content)
      _this.popTableData.content = _this.$tools.validator.unformatHTML(_this.popTableData.content)
      _this.dialogTableVisible=true
    },
    resetForm() {
      let _this=this
      _this.$refs['form'].resetFields()
    },
    back(){
      let _this = this
      _this.$emit("announment",true)
    },
  },
}
</script>