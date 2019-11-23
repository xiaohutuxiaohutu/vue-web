<template>
  <div class="main-content">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <ynet-content id="order" :headerInformation="true" :headerMenu="true" class="functionalArea p20">
      <div v-if="stepIndex== '1'">
        <!--table布局-->
        <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
          <table>
            <caption>查询条件</caption>
            <tr>
              <td>账号：</td>
              <td colspan="3">
                <el-form-item prop="accNo">
                  <el-select placeholder="请选择账户" v-model="form.accNo">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in operAccInfoList" :key="item.brhId" :label="item.lable" :value="item.accNo"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>预约状态：</td>
              <td>
                <el-form-item prop="stt">
                  <el-select placeholder="请选择预约状态" v-model="form.stt">
                    <el-option label="所有" value=""></el-option>
                    <el-option label="预约待处理" value="04"></el-option>
                    <el-option label="银行审核通过" value="06"></el-option>
                    <el-option label="银行拒绝" value="05"></el-option>
                    <el-option label="交易撤销" value="95"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td>分行：</td>
              <td>
                <el-form-item prop="branch">
                  <el-select placeholder="请选择取款分行" v-model="form.branch">
                    <el-option v-for="item in branchList" :key="item.brhId" :label="item.brhName" :value="item.brhId"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>预约时间：</td>
              <td>
                <el-form-item prop="rgst">
                  <el-date-picker type="date" @change="form.rgstDate=$tools.utils.formatDate(form.rgst)" placeholder="开始日期" v-model="form.rgst" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
              </td>
              <td>取款时间：</td>
              <td>
                <el-form-item prop="wthdw">
                  <el-date-picker type="date" @change="form.wthdwDate=$tools.utils.formatDate(form.wthdw)" placeholder="开始日期" v-model="form.wthdw"></el-date-picker>
                </el-form-item>
              </td>
            </tr>
          </table>
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="queryForm()">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </div>
        </el-form>
        <!--table布局-->

        <!--支取预约信息table-->
        <div class="tableData mt20">
          <el-table :data="tableData" stripe>
            <el-table-column property="accNo" label="账号"></el-table-column>
            <el-table-column property="accName" label="户名"></el-table-column>
            <el-table-column property="bookingType" label="预约方式">
              <template scope="scope">
                <span v-if="scope.row.wthdwType == '0'">现金支取预约</span>
              </template>
            </el-table-column>
            <el-table-column property="bookingAmt" label="预约金额">
              <template scope="scope">
                {{$tools.utils.currencyFormat(scope.row.bookingAmt)}}
              </template>
            </el-table-column>
            <el-table-column property="wthdwType" label="支取方式" width="90">
              <template scope="scope">
                <span v-if="scope.row.wthdwType == '0'">现金</span>
              </template>
            </el-table-column>
            <el-table-column property="rgstDate" label="预约登记时间">
              <template scope="scope">
                {{$tools.utils.formatDateSymbol(scope.row.rgstDate)}}
              </template>
            </el-table-column>
            <el-table-column property="wthdwDate" label="取款日期">
              <template scope="scope">
                {{$tools.utils.formatDateSymbol(scope.row.wthdwDate)}}
              </template>
            </el-table-column>
            <el-table-column property="stt" label="状态" width="70">
              <template scope="scope">
                <span v-if="scope.row.stt!='06'">{{$tools.dict.statusTrans(scope.row.stt)}}</span>
                <!--<span v-if="scope.row.stt=='04'">预约待处理</span>
                                                                      <span v-if="scope.row.stt=='05'">银行拒绝</span>-->
                <span v-if="scope.row.stt=='06' && Number(today)<=Number(scope.row.wthdwDate)">银行审核通过</span>
                <span v-if="scope.row.stt=='06' && Number(today)>Number(scope.row.wthdwDate)">逾期未使用</span>
                <!--<span v-if="scope.row.stt=='95'">交易撤销</span>-->
              </template>
            </el-table-column>
            <el-table-column property="rejReason" label="拒绝原因">
              <template scope="scope">
                <span v-if="scope.row.rejReason != ''">{{scope.row.rejReason}}</span>
                <span v-else>----</span>
              </template>
            </el-table-column>
            <el-table-column property="stt" label="操作" width="70">
              <template scope="scope">
                <a class="cOrange" v-if="scope.row.stt == '04'" @click="cancelBooking(scope.row)">取消</a>
                <span  v-if="scope.row.stt != '04'">----</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination tar mt20" v-if='turnPageTotalNum>turnPageShowNum'>
            <el-pagination @current-change="handleCurrentPageChange" :current-page.sync="currentPage" :page-size="turnPageShowNum" layout="total,prev, pager, next, jumper" :total="turnPageTotalNum">
            </el-pagination>
          </div>
          <!--分页--end-->
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="stepIndex=2">新增预约</el-button>
          </div>
        </div>
        <!--支取预约信息table--end-->
      </div>

      <!--支取预约信息-->
      <div class="tableForm" v-if="stepIndex== '2'">
        <h3>支取预约信息</h3>
        <el-form ref="form2" :model="form2" :rules="rules1" class="formEmbedTable">
          <table>
            <tr>
              <td>
                <span class="cRed">*</span>账户</td>
              <td>
                <el-form-item prop="accNo">
                  <el-select placeholder="请选择账户" v-model="form2.accNo" @change="accNoChange()">
                    <el-option v-for="item in operAccInfoList" :key="item.brhId" :label="item.lable" :value="item.accNo"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td>预约方式</td>
              <td>
                <el-form-item>
                  <el-select v-model="form2.bookingType" placeholder="请选择预约方式">
                    <el-option label="现金支取预约" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>户名</td>
              <td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{form2.accName}}
              </td>
              <td>
                <span class="cRed">*</span>支取方式</td>
              <td>
                <el-form-item>
                  <el-select v-model="form2.wthdwType" placeholder="请选择取款方式">
                    <el-option label="现金" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cRed">*</span>预约金额</td>
              <td>
                <el-form-item prop="bookingAmt">
                  <ynet-currency-input placeholder="请输入预约金额" v-model="form2.bookingAmt" :showChinese="false"></ynet-currency-input>
                </el-form-item>
              </td>
              <td>
                <span class="cRed">*</span>联系电话</td>
              <td>
                <el-form-item prop="phone">
                  <el-input v-model="form2.phone"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cRed">*</span>币种</td>
              <td>
                <el-form-item>
                  <el-select v-model="form2.currency" placeholder="请选择币种">
                    <el-option v-for="item in $tools.dict.currTypeList" :key="item.key" :label="item.currType" :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td>
                <span class="cRed">*</span>取款日期</td>
              <td>
                <el-form-item prop="date">
                  <el-date-picker type="date" @change="form2.wthdwDate=$tools.utils.formatDate(form2.date)" placeholder="选择日期" v-model="form2.date" :picker-options="pickerOptions2"></el-date-picker>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cRed">*</span>支取分行</td>
              <td>
                <el-form-item prop="branch">
                  <el-select placeholder="请选择取款分行" v-model="form2.branch">
                    <el-option v-for="item in branchList" :key="item.brhId" :label="item.brhName" :value="item.brhId"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="uKeySubmit()">确认</el-button>
          <el-button type="primary" @click="preStep()">返回</el-button>
        </div>
      </div>
      <!--支取预约信息--end-->
    </ynet-content>
  </div>
</template>
  
<script>

export default {
  name: 'order',
  components: {},
  data() {
    return {
      today: this.$tools.utils.formatDate(new Date()),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      stepIndex: 1,
      currentPage: 1,
      turnPageShowNum: 10,
      turnPageTotalNum: '',
      form: {
        accNo: '',
        stt: "",
        branch: "",
        rgstDate: "",
        wthdwDate: "",
        rgst: "",
        wthdw: ""
      },
      tableData: [],
      form2: { date: '', accNo: '', bookingType: '0', accName: '', wthdwType: "0", bookingAmt: "", branch: '', phone: "", wthdwDate: "", currency: 'CNY', queryType: 'save' },
      branchList: [{ brhId: '018888', brhName: '创兴银行有限公司汕头分行' }, { brhId: '020101', brhName: '创兴银行有限公司广州天河支行' }],
      rules: {
        accNo: [
        ],
        rgst: [
          { validator: this.compareDate, trigger: 'blur' }
        ],
        wthdw: [
          { validator: this.compareDate, trigger: 'blur' }
        ]
      },
      rules1: {
        accNo: [
          { required: true, message: '请选择账户', trigger: 'change' }
        ],
        bookingAmt: [
          { required: true, message: '请输入预约金额', trigger: 'blur' },
          { validator: this.bookingAmtValidate, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: this.$tools.validator.isMobile, trigger: 'blur' }
        ],
        branch: [
          { required: true, message: '请选择取款分行', trigger: 'change' }
        ],
        date: [
          { trigger: 'change', validator: this.$tools.validator.dateCompare, compareList: ['', 'date'], vm: this, formName: 'form' },
          // { validator: this.wthdwDateValidate, trigger: 'change' },
          // { required: true, message: '请选择取款日期', trigger: 'change' }
        ]
      },
      operAccInfoList: []
    };
  },
  methods: {
    bookingAmtValidate(rule, value, callback) {
      let _this = this
      if (Number(_this.form2.bookingAmt) > 0) {
        callback()
      }
      callback("预约金额不能为零")
    },
    wthdwDateValidate(rule, value, callback) {
      let _this = this
      if (_this.form2.wthdwDate) {
        callback()
      }
      callback("请选择取款日期")
    },
    accNoChange() {
      let _this = this
      for (let item of _this.operAccInfoList) {
        if (_this.form2.accNo == item.accNo) {
          _this.form2.accName = item.accName
        }
      }
    },
    preStep() {
      let _this = this
      _this.stepIndex = '1'
      _this.form2 = { date: '', accNo: '', bookingType: '0', accName: '', wthdwType: "0", bookingAmt: "", branch: '', phone: "", wthdwDate: "", currency: 'CNY', queryType: 'save' }
    },
    compareDate(rule, value, callback) {
      let _this = this
      let star = _this.form.rgst
      let end = _this.form.wthdw
      if (star && end) {
        if (star.getTime() >= end.getTime()) callback("预约日期不能大于取款日期")
      }
      callback()
    },
    resetForm() {
      let _this = this
      _this.form = {
        accNo: '',
        stt: "",
        branch: "",
        rgstDate: "",
        wthdwDate: "",
        rgst: "",
        wthdw: ""
      },
        _this.$refs['form'].resetFields()
    },
    handleCurrentPageChange(val) {
      let _this = this;
      _this.currentPage = val
      _this.queryForm()
    },
    queryForm() {
      let _this = this
      let body = {}
      body.currentPage = _this.currentPage
      body.turnPageShowNum = _this.turnPageShowNum
      body.accNo = _this.form.accNo
      body.stt = _this.form.stt
      body.branch = _this.form.branch
      body.rgstDate = _this.form.rgstDate
      body.wthdwDate = _this.form.wthdwDate
      _this.$tools.request(_this, "CB080603.do", body).then(
        data => {
          _this.tableData = data.body.bookingAmtList
          _this.turnPageTotalNum = Number(data.body.turnPageTotalNum)
        })
    },
    uKeySubmit() {
      let _this = this
      let userStorge = _this.$tools.storage.get("user", "save")
      let cstNo = userStorge.cstNo
      let userNo = userStorge.eCIFID
      let newDate = [{ key: 'cstNo', value: cstNo },
      { key: 'userNo', value: userNo },
      { key: 'accNo', value: _this.form2.accNo },
      { key: 'wthdwDate', value: _this.form2.wthdwDate },
      { key: 'bookingType', value: _this.form2.bookingType },
      { key: 'wthdwType', value: _this.form2.wthdwType },
      { key: 'bookingAmt', value: _this.form2.bookingAmt }]
      let siDate = JSON.stringify(newDate);
      let certNo = userStorge.serialNo
      let ukeyNo = userStorge.uKeySn
      let siAmt = _this.form2.bookingAmt
      let siAccountNo = _this.form2.accNo
      let arrAcc = ["预约账号:", siAccountNo]
      let arrAmt = ["预约金额:", siAmt]
      let keyFlag = _this.$ukey
      if (keyFlag == true || keyFlag == 'true') {
        let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
        if (flag == false || flag == 'false') {
          return
        }
        let signData = document.getElementById("signData").value.toString()
        _this.form2.signedData = signData
      }
      _this.submitForm2()
    },
    submitForm2() {
      let _this = this
      _this.$refs['form2'].validate((valid) => {
        if (valid) {
          let body = _this.form2
          body.timeStamps = _this.timeStamps
          _this.$tools.request(_this, "CB080604.do", body).then(
            data => {
              if (data.body.errorCode == 0) {
                this.$alert('预约成功', '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.getTimeStamps('CB080604')
                    _this.stepIndex = '1'
                    _this.queryForm()
                    _this.form2 = { date: '', accNo: '', bookingType: '0', accName: '', wthdwType: "0", bookingAmt: "", branch: '', phone: "", wthdwDate: "", currency: 'CNY', queryType: 'save' }
                  }
                });
              } else {
                this.$alert(data.body.errorMsg, '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.getTimeStamps('CB080604')
                    _this.stepIndex = '1'
                    _this.queryForm()
                    _this.form2 = { date: '', accNo: '', bookingType: '0', accName: '', wthdwType: "0", bookingAmt: "", branch: '', phone: "", wthdwDate: "", currency: 'CNY', queryType: 'save' }
                  }
                });
              }
            })
        }
      })
    },
    cancelBooking(val) {
      let _this = this
      this.$confirm('此操作将取消本条预约, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let body = {}
        body.bookingAmtId = val.bookingAmtId
        body.timeStamps = _this.timeStamps
        body.queryType = 'update'
        _this.$tools.request(_this, "CB080604.do", body).then(
          data => {
            if (data.body.errorCode == '0') {
              this.$alert('取消预约成功', '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.getTimeStamps('CB080604')
                  _this.currentPage = 1
                  this.queryForm()
                }
              });
            } else {
              this.$alert(data.body.errorMsg, '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.getTimeStamps('CB080604')
                  _this.currentPage = 1
                  this.queryForm()
                }
              });
            }
          })
      }).catch(() => {
      });
    },
    getShowAccList(accList) {
      let _this = this
      let _options = []
      for (let i = 0; i < accList.length; i++) {
        let _alias = accList[i].alias
        if (_alias == '' || _alias == null) {
          _alias = accList[i].accName
        }
        let _lable = accList[i].accNo + '[' + _this.$tools.dict.currTypeDict(accList[i].currType) + ']' + '[' + _alias + ']'
        let lable = _lable
        let value = accList[i].accNo
        let _item = $.extend({}, accList[i], { "value": value, "lable": lable })
        _options.push(_item)
      }
      return _options
    },
    checkOptionsArray(option) {
      if ((option.right.substr(0, 1) == '1') && option.auth == '2' && option.attr == '4' && option.currType == 'CNY' && option.cstNo == this.$tools.storage.get("user", "save").cstNo && option.type == '1') {
        return true
      }
    },
    getTimeStamps(val) { //获取防重复提交timeStamps
      let _this = this
      _this.$tools.request(_this, "CB000028Action.do", { tradeCode: val }).then(data => {
        _this.timeStamps = data.body.timeStamps
      })
    },
  },
  mounted() {
    let _this = this
    _this.getTimeStamps('CB080604')
    let _operAccInfoList = _this.$tools.storage.get('user', 'save').operAccInfoList
    let _options = _operAccInfoList.filter(_this.checkOptionsArray)
    _this.operAccInfoList = _this.getShowAccList(_options)
  }
}
</script>
