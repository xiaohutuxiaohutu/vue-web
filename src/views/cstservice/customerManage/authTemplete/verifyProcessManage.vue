<template>
  <ynet-content id="verifyProcessManage" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">审核流程维护</h3>
      <!--内容-->
      <div class="p20">
        <div v-if="stepIndex == 0" class="fourForm tableForm mt20">
          <el-table :data="authTempleteBsnList">
            <el-table-column label="交易类型">
              <template scope="scope">
                {{scope.row.bsnName}}
              </template>
            </el-table-column>
            <el-table-column prop="areaType" label="模板">
              <template scope="scope">
                <el-select v-model="scope.row.authId" placeholder="请选择" v-if="scope.row.areaType!='0'">
                  <el-option v-for="item in authTempleteList" :key="item.authId" :label="item.alias" :value="item.authId"></el-option>
                </el-select>
                <el-select v-model="scope.row.authId" placeholder="请选择" v-if="scope.row.areaType=='0'">
                  <el-option v-for="item in authTempleteList" :key="item.authId" :label="item.alias" :value="item.authId" v-if="item.areaType=='0'"></el-option>
                </el-select>
                <a class="cBlue" @click="toDetail(scope.row)">详情</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="uKeySubmit">确定</el-button>
          </div>
        </div>

        <detail v-if="stepIndex == 1" @changeStep="changeStep" :stepData="stepData"></detail>
        <!-- 溫馨提示 -->
        <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
        <!-- 溫馨提示end -->
      </div>
      <!--内容 end-->
    </div>

  </ynet-content>
</template>

<script>
import detail from './components/detail'
export default {
  name: 'verifyProcessManage',
  components: {
    detail
  },
  data() {
    return {
        warmTips:[
          '1.可针对某一交易功能设置该交易审批模板，如不设置则使用默认模板。',
        ],
      stepIndex: 0,
      rules: {
        alias: [
          { message: '请输入模板名称', trigger: 'blur', required: true },
        ]
      },
      stepData: {},
      authTempleteList: [],
      templeteAreaList: [],
      authTempleteBsnList: [],
      signData:''
    };
  },
  methods: {
    changeStep(index, stepData) {
      let _this = this
      _this.stepIndex = Number(index)
      if (stepData) _this.stepData = stepData
      _this.$tools.scrollTop()
    },
    uKeySubmit() {
      let _this = this
      let userStorge = _this.$tools.storage.get("user", "save")
      let cstNo = userStorge.cstNo
      let userNo = userStorge.eCIFID
      let newDate = [{ key: 'cstNo', value: cstNo },
      { key: 'userNo', value: userNo },]
      let siDate = JSON.stringify(newDate);
      let certNo = userStorge.serialNo
      let ukeyNo = userStorge.uKeySn
      let arrAcc = ["操作类型:", "审核流程设置维护"]
      let arrAmt = ["企业名称:", userStorge.cstCN]
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
      _this.submitForm()
    },
    submitForm() {
      let _this = this
      let body = {}
      body.signedData = _this.signData
      body.authTempleteBsnList = _this.authTempleteBsnList
      _this.$tools.request(_this, "CB08080502.do", body).then(
        data => {
          if (data.body.errorCode == 0) {
            _this.$alert('流程设置成功', '成功提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.initData()
              }
            });
          } else {
            _this.$alert(data.body.errorMsg, '失败提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.initData()
              }
            });
          }
        })//修改审批流程
    },
    toDetail(row) {
      let _this = this
      if (!row.authId) {
        _this.$alert('请先选择模板', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        });
      } else {
        let body = {}
        body.templeteArea = []
        for (let item of _this.authTempleteList) {
          if (item.authId == row.authId) {
            body.templete = item
          }
        }
        for (var value of _this.templeteAreaList) {
          if (value.authId == row.authId) {
            body.templeteArea.push(value)
          }
        }
        _this.stepData = body
        this.stepIndex = 1
      }
    },

    initData() {
      let _this = this
      let body = {}
      body.queryType = '3'
      body.keyWord = 'all'
      _this.$tools.request(_this, "CB08080401.do", body).then(
        data => {
          _this.authTempleteList = data.body.authTempleteList
          _this.templeteAreaList = data.body.templeteAreaList
        })//查询所有授权模板

      let templeteBsnList = []
      _this.$tools.request(_this, "CB08080501.do", body).then(
        data => {
          templeteBsnList = data.body.authTempleteBsnList
          _this.authTempleteBsnList = []
          let keyEqualBsnCode = false
          for (let item1 of _this.$tools.dict.funTransTypeList) {
            keyEqualBsnCode = false
            for (let item2 of templeteBsnList) {
              if (item1.key == item2.bsnCode) {
                keyEqualBsnCode = true
                _this.authTempleteBsnList.push({ 'bsnCode': item2.bsnCode, 'bsnName': item1.value, 'authId': item2.authId, 'cstNo': '', 'areaType': item1.areaType })
              }
            }
            if (!keyEqualBsnCode) {
              _this.authTempleteBsnList.push({ 'bsnCode': item1.key, 'bsnName': item1.value, 'authId': '', 'cstNo': '', 'areaType': item1.areaType })
            }
          }
        })//查询流程设置
    },
  },
  mounted() {
    let _this = this
    _this.initData()
  }
}

</script>


