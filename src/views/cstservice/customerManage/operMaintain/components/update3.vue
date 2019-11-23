<template>
    <div class="importCreditOpen">
        <!--4格布局table-->
        <div class=" tableForm mt20">
            <el-form ref="form1" v-if="showTree">
                <el-row>
                    <el-col :span="8">
                        <el-tree :data="[menuList[0]]" show-checkbox node-key="bsnCode" default-expand-all ref="tree0" highlight-current :props="defaultProps" style="height:505px">
                        </el-tree>
                    </el-col>
                    <el-col :span="8">
                        <el-tree :data="[menuList[1]]" show-checkbox node-key="bsnCode" default-expand-all ref="tree1" highlight-current :props="defaultProps" style="height:505px">
                        </el-tree>
                    </el-col>
                    <el-col :span="8">
                        <el-tree :data="[menuList[2]]" show-checkbox node-key="bsnCode" default-expand-all ref="tree2" highlight-current :props="defaultProps" style="height:505px">
                        </el-tree>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-tree :data="[menuList[3]]" show-checkbox node-key="bsnCode" default-expand-all ref="tree3" highlight-current :props="defaultProps" style="height:755px">
                        </el-tree>
                    </el-col>
                    <el-col :span="8">
                        <el-tree :data="[menuList[4]]" show-checkbox node-key="bsnCode" default-expand-all ref="tree4" highlight-current :props="defaultProps" style="height:755px">
                        </el-tree>
                    </el-col>
                    <el-col :span="8">
                        <el-tree :data="[menuList[5]]" show-checkbox node-key="bsnCode" default-expand-all ref="tree5" highlight-current :props="defaultProps" style="height:755px">
                        </el-tree>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-tree :data="[menuList[6]]" show-checkbox node-key="bsnCode" default-expand-all ref="tree6" highlight-current :props="defaultProps" style="height:610px">
                        </el-tree>
                    </el-col>
                    <el-col :span="8">
                        <el-tree :data="[menuList[7]]" show-checkbox node-key="bsnCode" default-expand-all ref="tree7" highlight-current :props="defaultProps" style="height:610px">
                        </el-tree>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="btnArea mt20 tac">
            <el-button @click="preStep()">上一步</el-button>
            <el-button @click="resetChecked">清空</el-button>
            <el-button @click="$emit('changeStep', '99')">取消</el-button>
            <el-button type="primary" @click="uKeySubmit()">提交</el-button>
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
            showTree: false,
            checkedList: [],
            userBSNAdd: [],
            allMenu: [],
            defaultProps: {
                children: 'childrens',
                label: 'bsnName'
            },
            menuList: [],
            initCheckedList: [],
            signData: ''
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

            _this.userBSNAdd = [{ "bsnCode": 'CB00', 'isBsnShort': 'false' }]
            let _flag = false
            for (var item of checkedSet) {
                _flag = false
                for (let bsnItem of _this.formData.userBSNList) {
                    if (bsnItem.bsnCode == item) {
                        _this.userBSNAdd.push({ "bsnCode": item, 'isBsnShort': bsnItem.isBsnShort ? bsnItem.isBsnShort : 'false' })
                        _flag = true
                    }
                }
                if (!_flag) {
                    _this.userBSNAdd.push({ "bsnCode": item, 'isBsnShort': 'false' })
                }
            }//整合成传到后台的集合
        },
        setCheckedKeys() {
            for (let i = 0; i < 8; i++) {
                let treetree = 'tree' + i
                this.$refs[treetree].setCheckedKeys(this.initCheckedList)
            }
        },
        resetChecked() {
            for (let i = 0; i < 8; i++) {
                let treetree = 'tree' + i
                this.$refs[treetree].setCheckedKeys([]);
            }
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
            let arrAcc = ["操作类型:", "操作员信息维护"]
            let arrAmt = ["操作员登录名:", _this.formData.userInfoList[0].userAlias]
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
            _this.nextStep()
        },
        nextStep() {
            let _this = this
            _this.getCheckedKeys()
            let body = _this.formData
            body.signedData = _this.signData
            body.userBSNAdd = _this.userBSNAdd
            body.actionFlag = '1'
            _this.$tools.request(this, "CB08080302.do", body).then(
                data => {
                    if (data.body.errorCode == 0) {
                        let _result = { No: '1', message: "修改操作员成功" }
                        _this.$emit("changeStep", "3", _result)
                    } else {
                        let _result = { No: '0', message: "修改操作员失败" }
                        _this.$emit("changeStep", "3", _result)
                    }
                })
        },
        initData() {
            let _this = this
            _this.$tools.request(_this, "CB000011.do", { roleNo: _this.formData.userInfoList[0].roleNo }).then(
                data => {
                    _this.menuList = []
                    let _menuList = data.body.operRoleMenuList//角色菜单
                    if (_this.$tools.storage.get("user", "save").isGroup != '1') {
                        for (let item of _menuList) {
                            if (item.bsnCode != 'CB04') {
                                _this.menuList.push(item)
                            }
                        }
                    } else {
                        _this.menuList = data.body.operRoleMenuList
                    }
                    if (_this.formData.userInfoList[0].roleNo != _this.formData.roleNo) {
                        _this.initCheckedList = ['CB01', 'CB02', 'CB03', 'CB04', 'CB05', 'CB06', 'CB07', 'CB08']
                    } else {
                        for (let item of _this.formData.userBSNList) {
                            if (item.bsnLevel == 3) {
                                _this.initCheckedList.push(item.bsnCode)
                            } else if (item.bsnLevel == 2 && item.hasSub == 0) {
                                _this.initCheckedList.push(item.bsnCode)
                            }
                        }
                    }
                    _this.showTree = true
                })
        }
    },
    mounted() {
        let _this = this
        _this.initData()
    },
    updated() {
        let _this = this
        if (_this.formData.checkedKeys) {
            _this.initCheckedList = _this.formData.checkedKeys
            _this.setCheckedKeys()
        } else {
            _this.setCheckedKeys()
        }
    }
}
</script>
