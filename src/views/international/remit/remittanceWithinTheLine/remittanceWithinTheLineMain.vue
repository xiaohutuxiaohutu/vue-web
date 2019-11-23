<template>
    <ynet-content id="remittanceWithinTheLineMain" class="main-content" :headerInformation="true" :headerMenu="true">
        <!--面包屑-->
        <ynet-breadcrumb></ynet-breadcrumb>
        <!--面包屑--end-->
        <!-- 功能区 -->
        <div class="functionalArea">
            <h3 class="functionalAreaTitle">行内汇出汇款</h3>
            <div class="p20">
                <!--进度条-->
                <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="itemIndex"></ynet-progress-bar>
                <!--进度条--end-->
                <inputPage v-if="itemIndex=='0'" @changeStep="changeStep"></inputPage>
                <confirmPage v-if="itemIndex=='1'" @changeStep="changeStep" :form="form"></confirmPage>
                <resultPage v-if="itemIndex=='2'" @changeStep="changeStep" :form="form"></resultPage>
            </div>
        </div>
        <!--功能区--end-->
    </ynet-content>
</template>
<script>
import inputPage from './components/inputPage'                          //录入页面
import confirmPage from './components/confirmPage'                      //确认页面
import resultPage from './components/resultPage'                        //结果页面
    export default{
        name:'remittanceWithinTheLineMain',
        components:{
            inputPage,
            confirmPage,
            resultPage
        },
        data(){
            return{
                stepText:["填写汇款信息","确认汇款信息","提交结果"],
                headerInformation:true, // 配置头部右边显示的信息
                headerMenu:true,        // 配置是否请求菜单
                itemIndex:0,            //步骤
                form:{}
            }
        },
        mounted(){
        },
        methods:{
            changeStep(index,form){
                let _this=this
                _this.itemIndex=Number(index)
                if(form) _this.form=form
                _this.$tools.scrollTop()
            }
        }
    }
</script>