<template>
  <div>
    <!--审批模版设置-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>审批模版设置</caption>
        <tr>
          <td>
            <span class="cRed">*</span>模版名称：</td>
          <td>
            <el-form-item prop="alias">
              <el-input v-model="form.alias" placeholder="模版名称"></el-input>
            </el-form-item>
          </td>
          <td>模版类型：</td>
          <td>
            <el-form-item prop="areaType">
              <el-radio-group v-model="form.areaType" @change="selectAreaType(form.areaType)">
                <el-radio label="1">有金额式</el-radio>
                <el-radio label="0">无金额式</el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <span class="cRed">*</span>审批级别：</td>
          <td colspan="3">
            <el-form-item prop="level">
              <el-select v-model="form.level" placeholder="请选择审批级别" @change="selectChange">
                <el-option label="一级" value="1"></el-option>
                <el-option label="二级" value="2"></el-option>
                <el-option label="三级" value="3"></el-option>
                <el-option label="四级" value="4"></el-option>
                <el-option label="五级" value="5"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!--审批模版设置-->

    <!--金额跨度区间-->
    <el-form ref="form2" :model="form2" class="tableData mt20 amountRangeTable">
      <el-table :data="form2.amountRange" stripe>
        <el-table-column label="金额区间" :width="320" align="left">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.start'" :rules="currencyRules(scope.$index)">
              <ynet-currency-input class="w100" v-model="form2.amountRange[scope.$index].start" :change="startToEnd(scope.$index)" :showChinese="false" :disabled="scope.$index < form2.amountRange.length-1||form.areaType==0||scope.$index==0">
              </ynet-currency-input>
            </el-form-item>
            <span>&lt; 金额</span>
            <template v-if="scope.$index < form2.amountRange.length-1">
              <span> &lt;=</span>
              <el-form-item>
                <ynet-currency-input class="w100" v-model="form2.amountRange[scope.$index].end" :showChinese="false" :disabled="scope.$index < form2.amountRange.length-1">
                </ynet-currency-input>
              </el-form-item>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="一级" v-if="form.level>=1">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.levelOne'" :rules="inputRules(form.level==1)">
              <el-input class="w30" v-model="form2.amountRange[scope.$index].levelOne"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="二级" v-if="form.level>=2">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.levelTwo'" :rules="inputRules(form.level==2)">
              <el-input class="w30" v-model="form2.amountRange[scope.$index].levelTwo"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="三级" v-if="form.level>=3">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.levelThree'" :rules="inputRules(form.level==3)">
              <el-input class="w30" v-model="form2.amountRange[scope.$index].levelThree"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="四级" v-if="form.level>=4">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.levelFour'" :rules="inputRules(form.level==4)">
              <el-input class="w30" v-model="form2.amountRange[scope.$index].levelFour"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="五级" v-if="form.level>=5">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.levelFive'" :rules="inputRules(form.level==5)">
              <el-input class="w30" v-model="form2.amountRange[scope.$index].levelFive"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="this.form.areaType==1">
          <template scope="scope">
            <a class="cBlue" style="cursor:pointer;" @click="addAmountRange(scope.$index)" v-if="isShowAdd(scope.$index)">添加</a>
            <a class="cBlue" style="cursor:pointer;" @click="delAmountRange(scope.$index)" v-if="isShowDel(scope.$index)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!--金额跨度区间--END-->

    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="uKeySubmit()">确定</el-button>
      <el-button type="primary" @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'templateName',
  components: {

  },
  data() {
    return {
      form: {
        alias: '',
        areaType: '1',
        level: '1',
      },
      signData: '',
      rules: {
        alias: [
          { message: '请输入模板名称', trigger: 'blur', required: true },
          { min: 1, max: 10, message: '模板名称长度在1到10位', trigger: 'change,blur' },
        ],
        areaType: [
          { message: '请输入模板名称', trigger: 'blur', required: true },
        ],
        level: [
          { message: '请输入模板名称', trigger: 'blur', required: true },
        ]
      },
      form2: {
        amountRange: [{
          levelOne: '',
          levelTwo: '',
          levelThree: '',
          levelFour: '',
          levelFive: '',
          start: '0',
          end: '999999999999999',
          authDef: ''
        }],
      },
      rules2: {

      }
    }
  },
  methods: {
    selectAreaType(val) {
      let _this = this
      _this.form2 = {
        amountRange: [{
          levelOne: '',
          levelTwo: '',
          levelThree: '',
          levelFour: '',
          levelFive: '',
          start: '0',
          end: '999999999999999',
          authDef: ''
        }],
      }
    },
    uKeySubmit() {
      let _this = this
      let index = _this.form2.amountRange.length - 1
      if (_this.form.level == '2') {
        if (_this.form2.amountRange[index].levelOne == '') _this.form2.amountRange[index].levelOne = '0'
      }
      if (_this.form.level == '3') {
        if (_this.form2.amountRange[index].levelOne == '') _this.form2.amountRange[index].levelOne = '0'
        if (_this.form2.amountRange[index].levelTwo == '') _this.form2.amountRange[index].levelTwo = '0'
      }
      if (_this.form.level == '4') {
        if (_this.form2.amountRange[index].levelOne == '') _this.form2.amountRange[index].levelOne = '0'
        if (_this.form2.amountRange[index].levelTwo == '') _this.form2.amountRange[index].levelTwo = '0'
        if (_this.form2.amountRange[index].levelThree == '') _this.form2.amountRange[index].levelThree = '0'
      }
      if (_this.form.level == '5') {
        if (_this.form2.amountRange[index].levelOne == '') _this.form2.amountRange[index].levelOne = '0'
        if (_this.form2.amountRange[index].levelTwo == '') _this.form2.amountRange[index].levelTwo = '0'
        if (_this.form2.amountRange[index].levelThree == '') _this.form2.amountRange[index].levelThree = '0'
        if (_this.form2.amountRange[index].levelFour == '') _this.form2.amountRange[index].levelFour = '0'
      }
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          _this.$refs['form2'].validate((valid) => {
            if (valid) {
              let userStorge = _this.$tools.storage.get("user", "save")
              let cstNo = userStorge.cstNo
              let userNo = userStorge.eCIFID
              let newDate = [{ key: 'cstNo', value: cstNo },
              { key: 'userNo', value: userNo },
              { key: 'authAlias', value: _this.form.alias },]
              let siDate = JSON.stringify(newDate);
              let certNo = userStorge.serialNo
              let ukeyNo = userStorge.uKeySn
              let arrAcc = ["操作类型:", "审批模板维护"]
              let arrAmt = ["模板名称:", _this.form.alias]
              let keyFlag = _this.$ukey
              if (keyFlag == true || keyFlag == 'true') {
                let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
                if (flag == false || flag == 'false') {
                  return
                }
                let signData = document.getElementById("signData").value.toString()
                _this.signData = signData
              }
              _this.submit()
            }
          });
        }
      });
    },
    submit() {
      let _this = this
      for (var val of _this.form2.amountRange) {
        val.authDef = (val.levelOne == '' ? 0 : val.levelOne) + (val.levelTwo == '' ? 0 : val.levelTwo) + (val.levelThree == '' ? 0 : val.levelThree) + (val.levelFour == '' ? 0 : val.levelFour) + (val.levelFive == '' ? 0 : val.levelFive)
      }
      let body = {}
      body.signedData = _this.signData
      let _authTempleteList = [_this.form]
      body = $.extend(body, { 'authTempleteList': _authTempleteList })
      body.templeteAreaList = _this.form2.amountRange
      body.queryType = '0'
      body.authAlias = _this.form.alias
      body.cstNo = _this.$tools.storage.get('user', 'save').cstNo
      _this.$tools.request(this, "CB08080402.do", body).then(
        data => {
          if (data.body.errorCode == 0) {
            let _result = { No: '1', message: "新增审批模板成功" }
            _this.$emit("changeStep", "3", _result)
          } else {
            let _result = { No: '0', message: data.body.errorMsg }
            _this.$emit("changeStep", "3", _result)
          }
        })
    },
    startToEnd(index) {
      let _this = this
      if (index == 0) {
      } else {
        _this.form2.amountRange[index - 1].end = _this.form2.amountRange[index].start
      }
    },
    back() {
      let _this = this
      _this.$emit("changeStep", "0")
    },
    addAmountRange(index) {
      let _this = this
      if (_this.form.level == '2') {
        if (_this.form2.amountRange[index].levelOne == '') _this.form2.amountRange[index].levelOne = '0'
      }
      if (_this.form.level == '3') {
        if (_this.form2.amountRange[index].levelOne == '') _this.form2.amountRange[index].levelOne = '0'
        if (_this.form2.amountRange[index].levelTwo == '') _this.form2.amountRange[index].levelTwo = '0'
      }
      if (_this.form.level == '4') {
        if (_this.form2.amountRange[index].levelOne == '') _this.form2.amountRange[index].levelOne = '0'
        if (_this.form2.amountRange[index].levelTwo == '') _this.form2.amountRange[index].levelTwo = '0'
        if (_this.form2.amountRange[index].levelThree == '') _this.form2.amountRange[index].levelThree = '0'
      }
      if (_this.form.level == '5') {
        if (_this.form2.amountRange[index].levelOne == '') _this.form2.amountRange[index].levelOne = '0'
        if (_this.form2.amountRange[index].levelTwo == '') _this.form2.amountRange[index].levelTwo = '0'
        if (_this.form2.amountRange[index].levelThree == '') _this.form2.amountRange[index].levelThree = '0'
        if (_this.form2.amountRange[index].levelFour == '') _this.form2.amountRange[index].levelFour = '0'
      }
      if (index < 4) {
        _this.$refs['form2'].validate((valid) => {
          if (valid) {
            _this.form2.amountRange.push({ levelOne: '', levelTwo: '', levelThree: '', levelFour: '', levelFive: '', start: '', end: '999999999999999' })
          } else {
            return false
          }
        });
      } else {
        _this.$alert('最多设置5个区间', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      }
    },
    isShowAdd(index) {
      let _this = this
      if (index != _this.form2.amountRange.length - 1) return false
      return true
    },
    delAmountRange(index) {
      let _this = this
      _this.form2.amountRange.splice(index, 1)
    },
    isShowDel(index) {
      let _this = this
      if (index == 0 || index < _this.form2.amountRange.length - 1) return false
      return true
    },
    inputRules(lastLevel) {
      return [
        { required: true, message: '请输入', trigger: 'blur' },
        { min: 1, max: 1, message: '请输入一位数字', trigger: 'blur,change' },
        // { trigger: 'blur', validator: this.$tools.validator.isInteger },
        { trigger: 'blur', validator: this.$tools.validator.numberRange, rangeVal: (lastLevel ? [1, 9] : [0, 9]) }
      ]
    },
    currencyRules(index) {
      if (index == '0') {
        return [
          { required: true, message: '请输入', trigger: 'blur' },
        ]
      }
      return [
        { required: true, message: '请输入', trigger: 'blur' },
        { trigger: 'blur', validator: this.$tools.validator.amountCompareList, compareIndex: [index - 1, index], compareName: 'start', vm: this, formName: "form2", formNode: 'amountRange' }
      ]
    },
    selectChange() {
      let _this = this
      _this.form2.amountRange = [{ levelOne: '', levelTwo: '', levelThree: '', levelFour: '', levelFive: '', start: '0', end: '999999999999999' }]
    }
  },
  mounted() {

  }
}
</script>
