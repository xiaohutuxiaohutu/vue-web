<template>
  <div class="entrystep1">
    <div class="p20">
      <!--table布局-->
      <el-form ref="form1" :model="form1" class="formEmbedTable">
        <table>
          <caption>查询条件</caption>
          <tr>
            <td>请输入查询条件：</td>
            <td>
              <el-form-item>
                <el-input v-model="form1.keyWord" placeholder="请输入账号、名称或别名"></el-input>
              </el-form-item>
              <el-button type="primary" class="mlr20"  @click="initData()">查询</el-button>
            </td>
          </tr>
        </table>
      </el-form>
      <!--table布局--> 

      <!--查询结果-->
      <div class="tableData mt40  printArea">
        <el-table :data="tableData" stripe>
          <el-table-column label="收款帐号" width="170">
            <template scope="scope">
              <a class="cOrange" @click="toDetail(scope.row)">{{scope.row.recvAccount}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="recvAccountName" label="收款人姓名"></el-table-column>
          <el-table-column prop="alias" label="别名"></el-table-column>
          <el-table-column prop="recvType" label="转账方式">
            <template scope="scope">
              <span v-if="scope.row.recvType==0">行内转账</span>
              <span v-if="scope.row.recvType==1">跨行转账</span>
            </template>
          </el-table-column>、
          <el-table-column prop="recvAccountType" label="账户类型">
            <template scope="scope">
              <span v-if="scope.row.recvAccountType==0">个人</span>
              <span v-if="scope.row.recvAccountType==1">企业</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <a class="cOrange" @click="edit(scope.row)">修改</a>
              <a class="cOrange ml5" @click="deletePayee(scope.row.payeeId)">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="pagination tar mt20">
          <el-pagination @current-change="handleCurrentPageChange" :current-page.sync="currentPage" :page-size="turnPageShowNum" layout="total,prev, pager, next, jumper" :total="turnPageTotalNum">
          </el-pagination>
        </div>
        <!--分页--end-->
      </div>
      <!--查询结果--END-->

      <div slot="footer" class="btnArea tac">
        <el-button type="primary" @click="add=true"> 新增</el-button>
        <el-button type="primary" @click="$tools.print()">打印</el-button>
        <!--<el-button type="primary">下载</el-button>-->
      </div>
    </div>

    <!--录入信息-->
    <el-dialog :visible.sync="add" @close="resetForm()" v-if="add" :close-on-click-modal="false" :close-on-press-escape="false">
      <!--table布局-->
      <el-form ref="form2" :model="form2" :rules="rules" class="formEmbedTable">
        <table>
          <caption>新增常用收款人</caption>
          <tr>
            <td>
              <span class="cRed">*</span>转账类型：</td>
            <td>
              <el-radio-group v-model="form2.recvType" @change="recvTypeChange(form2.recvType)">
                <el-radio :label="'0'">行内</el-radio>
                <el-radio :label="'1'">行外</el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td>
              <span class="cRed">*</span>收款方账号：</td>
            <td>
              <el-form-item prop="recvAccount">
                <el-input v-model="form2.recvAccount" placeholder="请输入账号"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>收款方账户类型：</td>
            <td>
              <el-form-item prop="recvAccountType">
                <el-select placeholder="请选择账户类型" v-model="form2.recvAccountType">
                  <el-option label="个人" value="0"></el-option>
                  <el-option label="企业" value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <span class="cRed">*</span>收款方户名：</td>
            <td>
              <el-form-item prop="recvAccountName">
                <el-input v-model="form2.recvAccountName" placeholder="请输入户名"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>收款方别名：</td>
            <td>
              <el-form-item prop="recName">
                <el-input v-model="form2.recName" placeholder="请输入别名"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr v-if="form2.recvType==1">
            <td>收款行：</td>
            <td>
              <el-form-item prop="openBankName">
                <el-input v-model="form2.openBankName" placeholder="请选择收款行" :disabled="true"></el-input>
              </el-form-item>
              <a class="cBlue" @click="otherBankDialogVisible=true">查询收款行</a>
            </td>
          </tr>
          <tr>
            <td>手机号码：</td>
            <td>
              <el-form-item prop="mobilePhone">
                <el-input v-model="form2.mobilePhone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </td>
          </tr>

        </table>
      </el-form>
      <!--table布局-->
      <div slot="footer" class="dialog-footer btnArea tac">
        <el-button type="primary" @click="addPayee()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
        <el-button @click="add=false,resetForm()">关闭</el-button>
      </div>
    </el-dialog>
    <!--录入信息弹窗--END-->

    <!--修改信息-->
    <el-dialog :visible.sync="update" :close-on-click-modal="false" :close-on-press-escape="false">
      <!--table布局-->
      <el-form ref="form3" :model="form3" :rules="rules" class="formEmbedTable mt20">
        <table>
          <caption>修改常用收款人</caption>
          <tr>
            <td>
              <span class="cRed">*</span>转账类型：</td>
            <td>
              <el-radio-group v-model="form3.recvType" @change="recvTypeChange(form3.recvType)">
                <el-radio :label="'0'">行内</el-radio>
                <el-radio :label="'1'">行外</el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td>
              <span class="cRed">*</span>收款方账号：</td>
            <td>
              <el-form-item prop="recvAccount">
                <el-input v-model="form3.recvAccount" placeholder="请输入账号"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>收款方账户类型：</td>
            <td>
              <el-form-item prop="recvAccountType">
                <el-select placeholder="请选择账户类型" v-model="form3.recvAccountType">
                  <el-option label="个人" value="0"></el-option>
                  <el-option label="企业" value="1"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <span class="cRed">*</span>收款方户名：</td>
            <td>
              <el-form-item prop="recvAccountName">
                <el-input v-model="form3.recvAccountName" placeholder="请输入户名"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>收款方别名：</td>
            <td>
              <el-form-item prop="recName">
                <el-input v-model="form3.recName" placeholder="请输入别名"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr v-if="form3.recvType==1">
            <td>收款行：</td>
            <td>
              <el-form-item  prop="openBankName">
                <el-input v-model="form3.openBankName" placeholder="请选择收款行" :disabled="true"></el-input>
              </el-form-item>
              <a class="cBlue" @click="otherBankDialogVisible=true">查询收款行</a>
            </td>
          </tr>
          <tr>
            <td>手机号码：</td>
            <td>
              <el-form-item prop="mobilePhone">
                <el-input v-model="form3.mobilePhone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </td>
          </tr>

        </table>
      </el-form>
      <!--table布局-->
      <div slot="footer" class="dialog-footer btnArea tac">
        <el-button type="primary" @click="updatePayee()">提交</el-button>
        <el-button @click="update=false">关闭</el-button>
      </div>
    </el-dialog>
    <!--修改信息弹窗--END-->

    <!--账户信息详情---->
    <el-dialog title="常用收款人详情" :visible.sync="dialogDetailVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <!--table布局-->
      <el-form :model="detailForm" class="formEmbedTable" :rules="rules">
        <table>
          <tr>
            <td>账户：</td>
            <td colspan="3">
              <el-form-item prop="recvAccount">
                {{detailForm.recvAccount}}
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>账户名称：</td>
            <td>
              <el-form-item prop="input1">
                {{detailForm.recvAccountName}}
              </el-form-item>
            </td>
            <td>账户别名：</td>
            <td>
              <el-form-item>
                {{detailForm.alias}}
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>账户类型：</td>
            <td>
              <el-form-item>
                <span v-if="detailForm.recvType==0">个人</span>
                <span v-if="detailForm.recvType==1">企业</span>
              </el-form-item>
            </td>
            <td>收款方手机号：</td>
            <td>
              <el-form-item>
                {{detailForm.mobilePhone}}
              </el-form-item>
            </td>
          </tr>
          <tr v-if="detailForm.transType==1">
            <td>收款行：</td>
            <td colspan="3">
              <el-form-item prop="openBankName">
                {{detailForm.openBankName}}
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <!--table布局-->
      <div slot="footer" class="dialog-footer btnArea tac">
        <el-button type="primary" @click="isPrint=false,$tools.print()">打印</el-button>
        <el-button @click="dialogDetailVisible=false,isPrint=true">关闭</el-button>
      </div>
    </el-dialog>
    <!--账户信息详情--END-->

    <!--查询收款行弹窗---->
    <el-dialog title="查询收款行" :visible.sync="otherBankDialogVisible" size="small">
      <selectOtherBankName v-if="otherBankDialogVisible" @goOtherBankPage="otherBankPageName" :selankPageNameMsg="OtherBank"></selectOtherBankName>
    </el-dialog>
    <!--查询收款行弹窗--END-->

  </div>
</template>

<script>  

import selectOtherBankName from '../../../transferPayment/transferRemit/components/selectOtherBankName'
export default {
  name: 'entry',
  components: {
    selectOtherBankName
  },
  data() {
    return {
      currentPage: 1,
      turnPageShowNum: 10,
      turnPageTotalNum: 0,
      otherBankDialogVisible: false,
      tableData: [],
      OtherBank: {},
      form1: {
        keyWord: ''
      },
      form2: {
        queryType: 'add',
        transType: '0',
        recvAccount: '',
        recvAccountName: '',
        recName: '',
        recvType: '0',
        recvAccountType: '0',
        mobilePhone: '',
        openBankName: '创兴银行'
      },
      form3: {},
      detailForm: {},
      rules: {
        openBankName: [
          { message: '请选择收款行', trigger: 'blur,cahnge', required: true }
        ],
        recvAccount: [
          { validator: this.$tools.validator.isAccNo, trigger: 'blur' },
          { message: '请输入账号', trigger: 'blur', required: true }
        ],
        recvAccountName: [
          { message: '请输入户名', trigger: 'blur', required: true },
          { validator: this.$tools.validator.isChEng, trigger: 'blur' },
          { validator: this.validateRecvAccountName, trigger: 'blur' }
        ],
        mobilePhone: [
          { validator: this.$tools.validator.isMobile, trigger: 'blur' }
        ]
      },
      add: false,
      update: false,
      dialogDetailVisible: false
    }
  },
  methods: {
    recvTypeChange(val){
      let _this = this
      if(val=='0'){
        _this.form2.openBankName = '创兴银行'
        _this.form3.openBankName = '创兴银行'
      }
      if(val=='1'){
        _this.form2.openBankName = ''
        _this.form3.openBankName = ''
      }
    },
    toDetail(row) {
      let _this = this
      _this.dialogDetailVisible = true
      _this.detailForm = row
    },
    validateRecvAccountName(rule, value, callback) {
      let _this = this
      if (_this.form2.recvAccountType == 0) {
        if (_this.form2.recvAccountName.length > 5) {
          callback("收款方户名长度不能大于5位")
        } else {
          let body = {}
          body.PAYEE_ACCT_NM = _this.form2.recvAccountName
          _this.$tools.request(this, "CB000016.do", body).then(
            data => {
              if (data.body.errorCode == '0') {
                if (Number(data.body.companyFlag) == Number(_this.form2.recvAccountType)) {
                  callback("该收款方为企业用户")
                } else {
                  callback()
                }
              } else {
                _this.$alert(data.body.errorMsg, '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  }
                });
              }
            })
        }
      } else {
        if (_this.form2.recvAccountName.length > 5) {
          callback()
        } else {
          let body = {}
          body.PAYEE_ACCT_NM = _this.form2.recvAccountName
          _this.$tools.request(this, "CB000016.do", body).then(
            data => {
              if (data.body.errorCode == '0') {
                if (Number(data.body.companyFlag) == Number(_this.form2.recvAccountType)) {
                  callback("该收款方不在白名单内")
                } else {
                  callback()
                }
              } else {
                _this.$alert(data.body.errorMsg, '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  }
                });
              }
            })
        }
      }
    },
    resetForm() {
      let _this = this
      _this.$refs['form2'].resetFields()
      _this.form2= {
        queryType: 'add',
        transType: '0',
        recvAccount: '',
        recvAccountName: '',
        recName: '',
        recvType: '0',
        recvAccountType: '0',
        mobilePhone: '',
        openBankName: '创兴银行'
      }
    },
    handleCurrentPageChange(val) {
      let _this = this;
      _this.currentPage = val
      _this.initData()
    },
    edit(row) {
      let _this = this
      _this.update = true
      _this.form3 = $.extend({}, row)
      _this.form3.recName = row.alias
      // console.log(_this.form3,'_this.form3')
    },
    otherBankPageName(index, form) {
      let _this = this
      _this.form2.bankNo = _this.OtherBank.rcvLinkBank //联行号
      _this.form2.bankName = _this.OtherBank.recBankName //总行名称
      _this.form2.openBankNo = _this.OtherBank.rcvNode //支行号
      _this.form2.openBankName = _this.OtherBank.recopenNode //支行名称
      _this.form3.bankNo = _this.OtherBank.rcvLinkBank //联行号
      _this.form3.bankName = _this.OtherBank.recBankName //总行名称
      _this.form3.openBankNo = _this.OtherBank.rcvNode //支行号
      _this.form3.openBankName = _this.OtherBank.recopenNode //支行名称
      if (index == '1') {
        _this.otherBankDialogVisible = false
      } else {
        _this.otherBankDialogVisible = true
      }

    },
    addPayee() {
      let _this = this
      _this.$refs['form2'].validate((valid) => {
        if (valid) {
          let body = _this.form2
          _this.$tools.request(this, "CB02010301.do", body).then(
            data => {
              if (data.body.errorCode == 0) {
                _this.$alert('新增常用收款人成功', '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.add = false
                    _this.resetForm()
                    _this.initData()
                  }
                });
              } else {
                _this.$alert(data.body.errorMsg, '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // _this.add = false
                    // _this.initData()
                  }
                });
              }
            })
        }
      });
    },
    deletePayee(val) {
      this.$confirm('此操作将永久删除该常用收款人, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this
        let body = {}
        body.payeeId = val
        body.queryType = 'delete'
        _this.$tools.request(this, "CB02010301.do", body).then(
          data => {
            if (data.body.errorCode == 0) {
              _this.$alert('删除常用收款人成功', '温馨提示', {
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

    },
    updatePayee() {
      let _this = this
      _this.$refs['form3'].validate((valid) => {
        if (valid) {
          _this.form3.queryType = 'update'
          let body = _this.form3
          _this.$tools.request(this, "CB02010301.do", body).then(
            data => {
              if (data.body.errorCode == 0) {
                _this.$alert('修改常用收款人成功', '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.update = false
                    _this.initData()
                  }
                });
              } else {
                _this.$alert(data.body.errorMsg, '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // _this.update = false
                    // _this.initData()
                  }
                });
              }
            })
        }
      });

    },
    initData() {
      let _this = this
      let body = {}
      body.keyWord = _this.form1.keyWord
      body.currentPage = _this.currentPage
      body.turnPageShowNum = _this.turnPageShowNum
      _this.$tools.request(this, "CB000003.do", body).then(
        data => {
          if(data.body.errorCode=='0'){
          _this.tableData = data.body.payeeList
          _this.turnPageTotalNum = Number(data.body.turnPageTotalNum)
        }else{
          _this.$alert(data.body.errorMsg, '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
          _this.tableData = []
          _this.turnPageTotalNum = 0
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