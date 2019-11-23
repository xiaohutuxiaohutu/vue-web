<template>
  <div class="TranPurpose">

    <div>
      <el-form ref="form" :model="form" class="formEmbedTable">
        <table>
          <tr>
            <td>转账用途：</td>
            <td colspan="3">
              <el-form-item prop="purposeName">
                <el-input v-model="purposeName" placeholder="请输入转账用途"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="initData(1)">查询</el-button>
        </div>
      </el-form>
    </div>

    <!--转账用途table-->
    <div class="tableData">
      <el-table :data="tableData" stripe>
        <el-table-column label="选择" width="120">
          <template scope="scope">
            <el-radio class="radio" v-model="radio" :label="scope.row">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="120"></el-table-column>
        <el-table-column property="purposeName" label="转账用途"></el-table-column>
      </el-table>
      <!--分页-->
      <div class="pagination tar mt20">
        <el-pagination @current-change="handleCurrentPageChange" :current-page.sync="currentPage" :page-size="turnPageShowNum" layout="total,prev, pager, next, jumper" :total="turnPageTotalNum">
        </el-pagination>
      </div>
      <!--分页--end-->
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="operFlag='add',dialogFormVisible = true">新增</el-button>
        <el-button type="primary" @click="update()">修改</el-button>
        <el-button type="primary" @click="deleteTranPurpose()">删除</el-button>
      </div>
    </div>
    <!--转账用途table--end-->

    <el-dialog title="转账用途维护" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="form" :model="form" class="formEmbedTable" :rules="rules">
        <table>
          <tr>
            <td>
              <span class="cRed">*</span>转账用途：</td>
            <td colspan="3">
              <el-form-item prop="purposeName">
                <el-input v-model="form.purposeName" placeholder="请输入转账用途"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="addOrUpdate()">确 定</el-button>
          <el-button type="primary" @click="dialogFormVisible = false,form.purposeName=''">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'TranPurpose',
  components: {

  },
  data() {
    return {
      purposeName: '',
      dialogFormVisible: false,
      form: {
        purposeName: ""
      },
      tableData: [],
      radio: '',
      currentPage: 1,
      turnPageShowNum: 10,
      turnPageTotalNum: 0,
      operFlag: '',
      rules: {
        purposeName: [
          { required: true, message: '请输入', trigger: 'blur' },
        ]
      }
    }
  },// data
  methods: {
    addOrUpdate() {
      if (this.operFlag == 'add') {
        this.addTranPurpose()
      } else if (this.operFlag == 'update') {
        this.updateTranPurpose()
      }
    },
    addTranPurpose() {
      let _this = this
      _this.$refs.form.validate((valid) => {
        if (valid) {
          let body = _this.form
          body.queryType = 'add'
          _this.$tools.request(_this, "CB080601.do", body).then(
            data => {
              if (data.body.errorCode == 0) {
                _this.$alert('新增转账用途成功', '成功提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.initData()
                    _this.dialogFormVisible = false
                    _this.form.purposeName = ''
                  }
                });
              } else {
                _this.$alert(data.body.errorMsg, '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.initData()
                    _this.dialogFormVisible = false
                    _this.form.purposeName = ''
                  }
                });
              }
            })
        }
      })
    },
    deleteTranPurpose() {
      let _this = this
      if (_this.radio == "") {
        _this.$alert('请选择一条记录', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      } else {
        _this.$confirm('此操作将永久删除该转账用途, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let body = {}
          body.queryType = 'delete'
          body.purposeId = this.radio.purposeId
          _this.$tools.request(_this, "CB080601.do", body).then(
            data => {
              if (data.body.errorCode == 0) {
                _this.$alert('删除转账用途成功', '成功提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.initData()
                  }
                });
              } else {
                _this.$alert(data.body.errorMsg, '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.initData()
                  }
                });
              }
            })
        }).catch(() => {
        });
      }
    },
    update() {
      let _this = this
      if (_this.radio == "") {
        _this.$alert('请选择一条记录', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      } else {
        _this.operFlag = 'update'
        _this.form.purposeName = _this.radio.purposeName
        _this.dialogFormVisible = true
      }
    },
    updateTranPurpose() {
      let _this = this
      _this.$refs.form.validate((valid) => {
        if (valid) {
          if (_this.radio.purposeName == _this.form.purposeName) {
            return
          }
          let body = {};
          body.queryType = 'update'
          body.purposeId = _this.radio.purposeId
          body.purposeName = _this.form.purposeName
          _this.$tools.request(_this, "CB080601.do", body).then(
            data => {
              if (data.body.errorCode == 0) {
                _this.$alert('修改转账用途成功', '成功提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.initData()
                    _this.dialogFormVisible = false
                    _this.form.purposeName = ''
                  }
                });
              } else {
                _this.$alert(data.body.errorMsg, '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.initData()
                    _this.dialogFormVisible = false
                    _this.form.purposeName = ''
                  }
                });
              }
            })
        }
      })
    },
    initData(val) {
      let _this = this
      let body = {}
      body.purposeName = _this.purposeName
      body.queryType = 'query'
      if (val) {
        body.currentPage = val
      } else {
        body.currentPage = 1
      }
      body.turnPageShowNum = _this.turnPageShowNum
      _this.$tools.request(this, "CB080601.do", body).then(
        data => {
          if (data.body.errorCode == '0') {
            _this.tableData = data.body.tranPurposeList;
            _this.turnPageTotalNum = Number(data.body.turnPageTotalNum)
            _this.radio = ''
          } else {
            _this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.tableData = []
                _this.turnPageTotalNum = 0
                _this.radio = ''
              }
            });
          }
        })
    },
    handleCurrentPageChange(val) {
      let _this = this;
      _this.currentPage = val
      _this.initData(val)
    }
  },// methods
  mounted() {
    let _this = this
    _this.initData()
  }
}

</script>
<style lang="scss">
@import "../../../../styles/vars.scss";
</style>

