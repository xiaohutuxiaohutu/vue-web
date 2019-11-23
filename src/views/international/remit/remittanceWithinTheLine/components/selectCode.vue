<template>
    <el-tree
        :data="data"
        :props="props"
        accordion
        @node-click="handleNodeClick">
    </el-tree>
</template>
<script>
    export default{
        name:'selectCode',
        components:{

        },
        props:{
            form:Object
        },
        data(){
            return{
                data:[],
                props: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods:{
            handleNodeClick(){
                
            }
        },
        mounted(){
            let _this = this
            _this.$tools.request(this,"codeSelect.do").then(
                data =>{
                    _this.data = data.body.data
                }
            )
        }
    } 
</script>