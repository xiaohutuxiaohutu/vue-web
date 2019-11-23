<template>
    <el-dialog title="交易编码" :visible.sync="dialogShow" :before-close="getCheckedNodes" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-tree :data="data2" ref="tree" node-key="trancode" :props="defaultProps" show-checkbox @check-change="checkChange" :check-strictly="false"></el-tree>
        <div class="el-dialog__footer btnArea">
            <el-button @click="getCheckedNodes">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'selectCode',
    components: {

    },
    data() {
        return {
            dialogShow:true,
            data2: [],
            selectKey:'',
            defaultProps: {
                children: 'children',
                label: 'trandesc'
            }
        };
    },
    methods: {
        // handleCheckChange(obj,flag){//对象，节点是否被选中
        //     this.$emit("selectCode1",obj,flag)
        // },
        getCheckedNodes() {
            let _this = this
            let selected = _this.$refs.tree.getCheckedNodes()
            if(selected.length==1){
                _this.$emit("selectCode1", selected)
            }else{
                selected.splice(0,1)
                _this.$emit("selectCode1", selected)
            }
        },
        // getCheckedKeys() {
        //     console.log(this.$refs.tree.getCheckedKeys());
        //     this.$emit("selectCode1", this.$refs.tree.getCheckedKeys())
        // },
        checkChange(data, checked) {
            let _this = this
            if (checked) {
                let selectKeys = this.$refs.tree.getCheckedKeys()
                if(selectKeys.length>1){
                    if(selectKeys[0]==_this.selectKey) _this.$refs.tree.setCheckedKeys([selectKeys[1]])
                    else _this.$refs.tree.setCheckedKeys([selectKeys[0]])
                }
                _this.selectKey = _this.$refs.tree.getCheckedKeys()
            }
        },
        getTreeList2(){
            let _this = this
            _this.$tools.request(this, "CB050104.do").then(
                data => {
                    if(data.body.errorCode=='0'){
                        let _tranCodeList = new Set()
                        for (let item1 of data.body.tranCodeList) {
                            if (item1.parentCode == '0') {
                                _tranCodeList.add({ 'parentCode': item1.parentCode, 'seqNo': item1.seqNo, 'trancode': item1.trancode, 'trandesc': item1.trancode+' '+item1.trandesc, 'children': [], 'disabled': false })
                            }
                        }
                        for (let item1 of data.body.tranCodeList) {
                            if (item1.parentCode != '0') {
                                for (let item2 of _tranCodeList) {
                                    if (item1.parentCode == item2.seqNo) {
                                        item2.children.push({ 'parentCode': item1.parentCode, 'seqNo': item1.seqNo, 'trancode': item1.trancode, 'trandesc': item1.trancode+' '+item1.trandesc, 'children': [], 'disabled': false })
                                    }
                                }
                            }
                        }
                        for(let item2 of _tranCodeList){
                            for(let item3 of item2.children){
                                let hasChildren = false
                                for(let item1 of data.body.tranCodeList){
                                    if(item1.parentCode == item3.seqNo){
                                        hasChildren = true
                                        item3.children.push({ 'parentCode': item1.parentCode, 'seqNo': item1.seqNo, 'trancode': item1.trancode, 'trandesc': item1.trancode+' '+item1.trandesc, 'children': [], 'disabled': false })
                                    }
                                }
                                if(!hasChildren){
                                    item3.disabled = false
                                }
                            }
                        }
                        for(let item2 of _tranCodeList){
                            for(let item3 of item2.children){
                                for(let item4 of item3.children){
                                    let hasChildren = false
                                    for(let item1 of data.body.tranCodeList){
                                        if(item1.parentCode == item4.seqNo){
                                            hasChildren = true
                                            item4.children.push({ 'parentCode': item1.parentCode, 'seqNo': item1.seqNo, 'trancode': item1.trancode, 'trandesc': item1.trancode+' '+item1.trandesc, 'children': [] })
                                        }
                                    }
                                    if(!hasChildren){
                                        item4.disabled = false
                                    }
                                }
                            }
                        }
                        for (let item of _tranCodeList) {
                            this.data2.push(item)
                        }
                    }else{
                        _this.alert(data.body.errorMsg,"温馨提示")
                    }
                }
            )
        }
    },
    mounted() {
        this.getTreeList2()
    }
} 
</script>