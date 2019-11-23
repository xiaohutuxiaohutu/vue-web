<template>
    <div class="main-container container-border">
        <div class="success tac" v-if="success">
            <img src="../../../../../images/common/success.png" />
            <p><strong class="fontSize18">恭喜你，注册成功</strong></p>
            <ynet-refresh-route :parentVM="this" :parentInit="this.parentInit"></ynet-refresh-route>
        </div>
    </div>
</template>
<script>
    export default{
        name:'resultPage',
        components:{
            
        },
        data(){
            return{
                success:true,
                form:{  
                },
            }
        },
        methods:{
            parentInit(){
                let _this = this
                _this.$emit("step",[0,_this.form])
            }
        },
        mouted(){
            
        }
    }
</script>