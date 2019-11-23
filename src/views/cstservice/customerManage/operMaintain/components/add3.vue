<template>
  <div class="importCreditOpen">
    <!--4格布局table-->
    <div class=" tableForm mt20">
      <el-form ref="form1" v-if="showTree">
        <el-row>
          <el-col :span="8">
            <el-tree :data="[menuList[0]]" :default-checked-keys="checkedKeys" show-checkbox auto-expand-parent node-key="bsnCode" default-expand-all ref="tree0" highlight-current :props="defaultProps" style="height:505px">
            </el-tree>
          </el-col>
          <el-col :span="8">
            <el-tree :data="[menuList[1]]" :default-checked-keys="checkedKeys" show-checkbox node-key="bsnCode" default-expand-all ref="tree1" highlight-current :props="defaultProps" style="height:505px">
            </el-tree>
          </el-col>
          <el-col :span="8">
            <el-tree :data="[menuList[2]]" :default-checked-keys="checkedKeys" show-checkbox node-key="bsnCode" default-expand-all ref="tree2" highlight-current :props="defaultProps" style="height:505px">
            </el-tree>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-tree :data="[menuList[3]]" :default-checked-keys="checkedKeys" show-checkbox node-key="bsnCode" default-expand-all ref="tree3" highlight-current :props="defaultProps" style="height:755px">
            </el-tree>
          </el-col>
          <el-col :span="8">
            <el-tree :data="[menuList[4]]" :default-checked-keys="checkedKeys" show-checkbox node-key="bsnCode" default-expand-all ref="tree4" highlight-current :props="defaultProps" style="height:755px">
            </el-tree>
          </el-col>
          <el-col :span="8">
            <el-tree :data="[menuList[5]]" :default-checked-keys="checkedKeys" show-checkbox node-key="bsnCode" default-expand-all ref="tree5" highlight-current :props="defaultProps" style="height:755px">
            </el-tree>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-tree :data="[menuList[6]]" :default-checked-keys="checkedKeys" show-checkbox node-key="bsnCode" default-expand-all ref="tree6" highlight-current :props="defaultProps" style="height:610px">
            </el-tree>
          </el-col>
          <el-col :span="8">
            <el-tree :data="[menuList[7]]" :default-checked-keys="checkedKeys" show-checkbox node-key="bsnCode" default-expand-all ref="tree7" highlight-current :props="defaultProps" style="height:610px">
            </el-tree>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="btnArea mt20 tac">
      <el-button @click="preStep()">上一步</el-button>
      <el-button @click="resetChecked">清空</el-button>
      <el-button @click="$emit('changeStep', '99')">取消</el-button>
      <el-button type="primary" @click="nextStep()">提交</el-button>
    </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'templateStep1',
  components: {
  },
  data() {
    return {
      checkedKeys: ['CB01', 'CB02', 'CB03', 'CB04', 'CB05', 'CB06', 'CB07', 'CB08'],
      showTree: false,
      userBSNAdd: [],
      allMenu: [],
      defaultProps: {
        children: 'childrens',
        label: 'bsnName'
      },
      menuList: []
    }
  },
  props: {
    formData: { type: Object, default: {} },
  },
  methods: {
    getCheckedKeys() {
      let _this = this
      let checkedKeys = []
      for (let i = 0; i < 8; i++) {
        let treetree = 'tree' + i
        checkedKeys = checkedKeys.concat(_this.$refs[treetree].getCheckedKeys())
      }//elementUI拿到的keys

      let checkedSet = new Set(checkedKeys)
      for (let item of checkedSet) {
        if (item.length == 8) {
          checkedSet.add(item.substring(0, 6))
        }
        if (item.length == 6) {
          checkedSet.add(item.substring(0, 4))
        }
      }//添加选中节点的爹和爷

      _this.userBSNAdd = [{ "bsnCode": 'CB00' }]
      for (var item of checkedSet) {
        _this.userBSNAdd.push({ "bsnCode": item })
      }//整合成传到后台的集合
    },
    setCheckedKeys() {
      for (let i = 0; i < 8; i++) {
        let treetree = 'tree' + i
        this.$refs[treetree].setCheckedKeys(['CB01', 'CB02', 'CB03', 'CB04', 'CB05', 'CB06', 'CB07', 'CB08'])
      }
    },
    resetChecked() {
      for (let i = 0; i < 8; i++) {
        let treetree = 'tree' + i
        this.$refs[treetree].setCheckedKeys([]);
      }
    },
    roleChange() {
      let _this = this
      _this.form.authLevel = ''
    },
    preStep() {
      let _this = this
      let checkedKeys = []
      for (let i = 0; i < 8; i++) {
        let treetree = 'tree' + i
        checkedKeys = checkedKeys.concat(_this.$refs[treetree].getCheckedKeys())
      }
      _this.formData.checkedKeys = checkedKeys
      _this.$emit("changeStep", "1", _this.formData)
    },
    nextStep() {
      let _this = this
      _this.getCheckedKeys()
      let body = _this.formData
      body.userBSNAdd = _this.userBSNAdd
      body.actionFlag = '0'
      body.cstNo = _this.$tools.storage.get('user', 'save').cstNo
      _this.$tools.request(this, "CB08080302.do", body).then(
        data => {
          if (data.body.errorCode == 0) {
            let _result = { No: '1', message: "新增操作员成功,密码为："+data.body.password }
            _this.$emit("changeStep", "3", _result)
          } else {
            let _result = { No: '0', message: "新增操作员失败" }
            _this.$emit("changeStep", "3", _result)
          }
        })
    }
  },
  created() {
    let _this = this
    _this.$tools.request(_this, "CB000011.do", { roleNo: _this.formData.userInfoList[0].roleNo }).then(
      data => {
        _this.menuList = data.body.operRoleMenuList//角色菜单
        _this.showTree = true
      })
    if (_this.formData.checkedKeys) {
      _this.checkedKeys = _this.formData.checkedKeys
    }
  }
}
</script>
