<template>
  <div class="importCreditOpen p20">
    <!--table布局-->
    <div class="mt30">
      <div class="tableData printArea">
        <el-table :data="tableData">
          <!--<el-table-column type="selection" width="180"></el-table-column>-->
          <el-table-column prop="accNo" label="账户"></el-table-column>
          <el-table-column prop="accName" label="账户名称"></el-table-column>
          <el-table-column prop="accName" label="集团账户">
            <template scope="scope">
              {{scope.row.groupFlag=='1'?'是':'否'}}
            </template>
          </el-table-column>
          <el-table-column label="操作权限" width="180" align="left">
            <template scope="scope">
              <el-checkbox-group v-model="checkedList[scope.$index]">
                <el-checkbox label="1" @change="checkboxChange(scope.$index)">查询</el-checkbox>
                <el-checkbox label="2" @change="checkboxChange(scope.$index)" v-if="scope.row.accRight.indexOf('1')>=0&&formData.userInfoList[0].right.charAt(1)=='1'">查询/动账</el-checkbox>
                <el-checkbox label="2" @change="checkboxChange(scope.$index)" v-if="scope.row.accRight.indexOf('1')>=0&&formData.userInfoList[0].right.charAt(2)=='1'">查询/授权</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block" v-if='turnPageTotalNum>turnPageShowNum'>
          <el-pagination @current-change="handleCurrentPageChange" :current-page.sync="currentPage" :page-size="turnPageShowNum" layout="total,prev, pager, next, jumper" :total="turnPageTotalNum">
          </el-pagination>
        </div>
        <!--分页--end-->
        <div class="btnArea mt20 tac">
          <el-button @click="preStep">上一步</el-button>
          <el-button @click="$emit('changeStep', '99')">取消</el-button>
          <el-button type="primary" @click="nextStep">下一步</el-button>
        </div>
      </div>

    </div>
    <!--table布局-->
  </div>
</template>

<script>
export default {
  name: 'templateStep1',
  components: {
  },
  data() {
    return {
      tableData: [],
      accInfoList: [],
      currentPage: 1,
      turnPageShowNum: 10,
      turnPageTotalNum: 5,
      checkedList: [],
      accRightList: []
    }
  },
  props: {
    formData: { type: Object, default: {} },
  },
  methods: {
    checkboxChange(index) {
      let _this = this
      setTimeout(function() {
        let length = _this.checkedList[index].length
        let temp = _this.checkedList[index][length - 1]
        _this.checkedList[index].pop()
        _this.checkedList[index].pop()
        _this.checkedList[index].push(temp)
        if (_this.checkedList[index][0] == '1') {
          _this.tableData[index].userAccRight = '1'
        } else if (_this.checkedList[index][0] == '2') {
          _this.tableData[index].userAccRight = '2'
        } else {
          _this.tableData[index].userAccRight = ''
        }
      }, 0)
    },
    handleCurrentPageChange(val) {
      let _this = this
      _this.currentPage = val
      _this.tableData = _this.accInfoList.filter(function(element, index) {
        return ((_this.currentPage - 1) * _this.turnPageShowNum <= index && index <= _this.currentPage * _this.turnPageShowNum - 1)
      })
      _this.checkedList = []
      for (var item of _this.tableData) {
        // if (item.userAccRight) {
          _this.checkedList.push([item.userAccRight])
        // } else {
        //   _this.checkedList.push(['1'])
        // }
      }
    },
    preStep() {
      let _this = this
      let userAccRightAdd = []
      for (var item of _this.accInfoList) {
        if (item.userAccRight) {
          userAccRightAdd.push({ "accNo": item.accNo, "userAccRight": item.userAccRight })
        }
      }
      _this.formData.userAccRightAdd = userAccRightAdd
      _this.$emit("changeStep", "0", _this.formData)
    },
    nextStep() {
      let _this = this
      let body = _this.formData
      let userAccRightAdd = []
      for (var item of _this.accInfoList) {
        if (item.userAccRight) {
          userAccRightAdd.push({ "accNo": item.accNo, "userAccRight": item.userAccRight })
        }
      }
      body.userAccRightAdd = userAccRightAdd
      _this.$emit("changeStep", "2", body)
    },
    initData() {
      let _this = this
      let body = {}
      body.cstNo = _this.$tools.storage.get('user', 'save').cstNo
      body.keyWord = 'CCB'
      _this.$tools.request(this, "CB08080303.do", body).then(
        data => {
          if (data.body.errorCode == 0) {
            _this.accInfoList = data.body.accInfoList
            if (_this.formData.userAccRightAdd) {
              for (let item1 of _this.formData.userAccRightAdd) {
                for (let item2 of _this.accInfoList) {
                  if (item1.accNo == item2.accNo) {
                    item2.userAccRight = item1.userAccRight
                  }
                }
              }
            } else {
              for (let item of _this.accInfoList) {
                  item.userAccRight = '1'
              }
            }

            _this.turnPageTotalNum = _this.accInfoList.length
            _this.handleCurrentPageChange(_this.currentPage)
          } else {

          }
        })
    }
  },
  mounted() {
    let _this = this
    _this.initData()
  },
  created() {
    let _this = this
  }
}
</script>
