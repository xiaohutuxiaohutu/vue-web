<template>
      <div class="shortCutMenu pb20">
          <el-row style="width:70px;">
            <el-col :span="24" class="menu plr15 ptb10">快捷菜单</el-col>
            <el-col :span="24" class="shortCut" v-for="item in items"><a @click="toMenu(item)">{{ item.bsnName }}<div class="line">——</div></a></el-col>
            <el-col :span="24" class="tac menuIcon"><i class="el-icon-warning"></i></el-col>
            <el-col :span="24" class="retract tac"><a @click="toggle()">点击收起</a></el-col>
          </el-row>
      </div>
</template>

<script>
export default {
    data() {
        return {
            items:[],
        }
    },
    name:'shortCutMenu',
    components:{
    
    },
    methods:{
        getShortMenu(){     //请求快捷菜单
            let _this = this
            let body = {}
            body.userNo = this.$tools.storage.get("user","save").eCIFID,
            body.count = '5'//快捷菜单显示条数
            _this.$tools.request(_this,"CB000207.do",body).then(data =>{
                _this.items = data.body.operRoleMenuList
                _this.items.push({bsnName: '设置',url:'/setShortMenu' })
                //console.log("快捷菜单:"+_this.items)
            })
        },
        toMenu(val){
            let _this = this
            //console.log("跳转地址:"+val.url)
            _this.$router.push({ path: '/'+val.url+'' })
        },
        toggle(){
            $(e.target).find(".shortCut").slideToggle("show")
            //console.log("显示隐藏方法")
        },
    },
    mounted: function () {
        let _this = this;
        _this.getShortMenu()
    }
}

</script>
<style lang="scss">
.shortCutMenu{position:fixed;top:159px;left:50%;margin-left:500px;}
.menu{height:60px;background:#4c4c4c;color:#fff;font-size:16px;}
.shortCut{height:40px;line-height:40px;color:#353535;background:#fff;text-align:center;position:relative;}
.shortCut .line{position:absolute;top:46%;right:32%;color:#ee6b00;display:none;}
.shortCut a{display: block;}
.shortCut a:hover{color:#ee6b00;}
.shortCut a:hover .line{display:block;}
.menuIcon{font-size:25px;color:#ee6b00;position:absolute;bottom:-23px;right:1px;}
.retract{height:30px;line-height:30px;background:#a6a6a6;color:#fff;position:absolute;bottom:-51px;right:-1px;}
</style>