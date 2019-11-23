<template>
  <!--功能区-->
  <div>
    <div class="p20 csmanager">
      <div class="tableData printArea">
        <el-table :data="userInfoList" stripe>
          <el-table-column label="请选择">
            <template scope="scope">
              <el-radio class="radio" v-model="selectedUser" :label="scope.row">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="登陆名">
            <template scope="scope">
              <a class="cOrange" @click="detail(scope.row)">{{scope.row.userAlias}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="使用者姓名"></el-table-column>
          <el-table-column prop="userOpenDate" label="创建时间">
            <template scope="scope">
              {{$tools.utils.formatDateSymbol(scope.row.userOpenDate)}}
            </template>
          </el-table-column>
          <el-table-column prop="roleName" label="操作员角色"></el-table-column>
          <el-table-column prop="authLevel" label="审批级别">
            <template scope="scope">
              <span v-if="scope.row.authLevel!=''||scope.row.authLevel!=undefined">{{scope.row.authLevel}}</span>
              <span v-if="scope.row.authLevel==''||scope.row.authLevel==undefined">----</span>
            </template>
          </el-table-column>
          <el-table-column prop="userStt" label="状态">
            <template scope="scope">
              <span v-if="scope.row.userStt==0">正常</span>
              <span v-if="scope.row.userStt==1">暂停</span>
              <span v-if="scope.row.userStt==2">临时冻结</span>
              <span v-if="scope.row.userStt==4">维护中</span>
              <span v-if="scope.row.userStt==5">永久冻结</span>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="pagination tar mt20" v-if='turnPageTotalNum>turnPageShowNum'>
          <el-pagination @current-change="handleCurrentPageChange" :current-page.sync="currentPage" :page-size="turnPageShowNum" layout="total,prev, pager, next, jumper" :total="turnPageTotalNum">
          </el-pagination>
        </div>
        <!--分页--end-->
      </div>
      <div class="btnArea mt20 tac">
        <!--<el-button type="primary" @click="add">新增</el-button>-->
        <el-button type="primary" @click="update">修改</el-button>
        <!--<el-button type="primary" @click="deleteOper">删除</el-button>-->
        <!--<el-button type="primary" @click="unFreezeOper">冻结</el-button>
                        <el-button type="primary" @click="freezeOper">解冻</el-button>-->
        <el-button type="primary" @click="uKeySubmit">重置密码</el-button>
      </div>
      <!--确认弹窗-->
      <el-dialog :visible.sync="dialogFirmVisible" size="tiny" class="tac" :close-on-click-modal="false" :close-on-press-escape="false">

      </el-dialog>
      <!--确认弹窗end-->
    </div>
  </div>

  <!--功能区--end-->
</template>

<script>
import detail from './detail'
export default {
  name: 'csmanager',
  components: {
    detail
  },
  data() {
    return {
      selectedUser: '',
      currentPage: 1,
      turnPageShowNum: 10,
      turnPageTotalNum: 0,
      dialogVisible: false,
      dialogFirmVisible: false,
      tableData: [],
      userAccRightList: [],
      userBSNList: [],
      userInfoList: [],
      form: {},
      signData:''
    };
  },
  methods: {
    unFreezeOper() {
      let _this = this
      if (!_this.selectedUser) {
        this.$alert('请选择一条记录', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        });
      } else if (_this.selectedUser.userStt == '2' || _this.selectedUser.userStt == '5') {
        this.$alert('该操作员已冻结', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        });
      } else if (_this.selectedUser.right.charAt(3) == '1') {
        this.$alert('不能冻结管理员', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        });
      } else {
        _this.$confirm('此操作将冻结该操作员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let body = {}
          body.scryActionFlag = '1'
          _this.$tools.request(this, "CB08080304.do", body).then(
            data => {
              if (data.body.errorCode == 0) {
                this.$alert('冻结成功', '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.initData()
                  }
                });
              } else {
                this.$alert(data.body.errorMsg, '失败提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$emit("changeStep", "0")
                  }
                });
              }
            })
        }).catch(() => {
        });
      }
    },
    freezeOper() {
      let _this = this
      if (!_this.selectedUser) {
        this.$alert('请选择一条记录', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        });
      } else if (_this.selectedUser.userStt != '2' && _this.selectedUser.userStt != '5') {
        this.$alert('该操作员无需解冻', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        });
      } else {
        _this.$confirm('此操作将解冻该操作员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let body = {}
          body.scryActionFlag = '2'
          _this.$tools.request(this, "CB08080304.do", body).then(
            data => {
              if (data.body.errorCode == 0) {
                this.$alert('解冻成功', '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.initData()
                  }
                });
              } else {
                this.$alert(data.body.errorMsg, '失败提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$emit("changeStep", "0")
                  }
                });
              }
            })
        }).catch(() => {
        });
      }
    },
    resetPwd() {
      let _this = this
      let body = {}
      body.signedData = _this.signData
      body.actionFlag = '1'
      body.imUserList = [{ 'userNo': _this.selectedUser.userNo, 'userSystem': _this.selectedUser.userSystem, 'channels': _this.selectedUser.channels }]
      _this.$tools.request(this, "CB08080305.do", body).then(
        data => {
          if (data.body.errorCode == 0) {
            let _result = { No: '1', message: "密码重置成功"}
            _this.$emit("changeStep", "4", _result)
          } else {
            let _result = { No: '0', message: "密码重置失败" }
            _this.$emit("changeStep", "4", _result)
          }
        })
    },
    handleCurrentPageChange(val) {
      let _this = this
      _this.currentPage = val
      _this.initData()
    },
    uKeySubmit() {
      let _this = this
      if (!_this.selectedUser) {
        this.$alert('请选择一条记录', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        });
      } else if (_this.selectedUser.right.charAt(3) == '1') {
        this.$alert('不能重置管理员密码', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        });
      } else {
        _this.$confirm('此操作将重置操作员密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let userStorge = _this.$tools.storage.get("user", "save")
          let cstNo = userStorge.cstNo
          let userNo = userStorge.eCIFID
          let newDate = [{ key: 'cstNo', value: cstNo },
          { key: 'userNo', value: userNo },]
          let siDate = JSON.stringify(newDate);
          let certNo = userStorge.serialNo
          let ukeyNo = userStorge.uKeySn
          let arrAcc = ["操作类型:", "操作员信息维护"]
          let arrAmt = ["操作员登录名:", _this.selectedUser.userAlias]
          let keyFlag = _this.$ukey
          if (keyFlag == true || keyFlag == 'true') {
            let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
            if (flag == false || flag == 'false') {
              //this.$alert('UKey签名失败,请重新再试', '温馨提示')
              return
            }
            let signData = document.getElementById("signData").value.toString()
            _this.signData = signData
          }
          _this.resetPwd()
        }).catch(() => {
        });
      }
    },
    deleteOper(row) {
      let _this = this
      if (!_this.selectedUser) {
        this.$alert('请选择一条记录', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        });
      } else if (_this.selectedUser.right.charAt(3) == '1') {
        this.$alert('不能删除管理员', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        });
      } else {
        _this.$confirm('此操作将永久删除该操作员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let body = {}
          body.actionFlag = '2'
          body.userInfoList = [{ userNo: _this.selectedUser.userNo, cstNo: _this.selectedUser.cstNo }]
          _this.$tools.request(this, "CB08080302.do", body).then(
            data => {
              if (data.body.errorCode == 0) {
                this.$alert('删除成功', '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.initData()
                  }
                });
              } else {
                this.$alert(data.body.errorMsg, '失败提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$emit("changeStep", "0")
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
      if (!_this.selectedUser) {
        this.$alert('请选择一条记录', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        });
      } else {
        let body = {}
        body.userInfoListCopy = [_this.selectedUser]
        body.keyWord = 'one'
        _this.$tools.request(_this, "CB08080301.do", body).then(
          data => {
            body.userInfoList = data.body.userInfoList
            body.userAccRightList = data.body.userAccRightList
            body.userBSNList = data.body.userBSNList
            _this.$emit("changeStep", "3", body)
          })
      }
    },
    add() {
      let _this = this
      _this.$emit("changeStep", "2")
    },
    detail(row) {
      let _this = this
      _this.$emit("changeStep", "1", row)
    },
    initData() {
      let _this = this
      _this.selectedUser = ''
      let body = {}
      body.currentPage = _this.currentPage
      body.turnPageShowNum = _this.turnPageShowNum
      _this.$tools.request(_this, "CB08080301.do", body).then(
        data => {
          if (data.body.errorCode == '0') {
            _this.turnPageTotalNum = Number(data.body.turnPageTotalNum)
            _this.userInfoList = data.body.userInfoList
          } else {
            this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.turnPageTotalNum = 0
                _this.userInfoList = []
              }
            });
          }
        })
    }
  },
  mounted() {
    let _this = this
    _this.initData()
  }
}
</script>

<style>
.csmanager .el-dialog__body {
  padding: 30px 110px;
}

.csmanager .el-form-item__label {
  padding: 11px 0px 11px 0;
}

.csmanager .el-input {
  width: 60%
}
</style>



