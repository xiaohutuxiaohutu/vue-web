<template>
      <div class="shortCutMenu pb20"  v-if="shortCutMenu">
          <el-row style="width:100px;">
            <el-col :span="24" class="menu plr15 ptb10">快捷菜单</el-col>
            <el-col :span="24" class="shortCut"  v-for="item in items"><a :href="'#'+item.url">{{ item.bsnName }}<div class="line">——</div></a></el-col>
            <el-col :span="24" class="tac menuIcon" ><i class="el-icon-warning"></i></el-col>
            <el-col :span="24" class="retract tac">点击收起</el-col>
          </el-row>
      </div>
</template>

<script>
export default {
        data() {
            return {
                items:[],
                shortCutMenu:true,
                //  items: [     
                //     {message: '账号查询' }, 
                //     {message: '转账汇款' }, 
                //     {message: '定期存款' }, 
                //     {message: '存入通知' }, 
                //     {message: '转账汇款' },   
                //     {message: '存款存入' }, 
                //     {message: '设置' }, 
                //       ]
            }
        },
        name:'menuSetting',
        componentName:
          'menuSetting'
        ,
        
        methods:{
           //请求快捷菜单
           getShortMenu(){
            let _this = this;
            let body = {}
            body.userNo='10000111'
            body.count = '5'//快捷菜单显示条数
            _this.$tools.request(_this,"CB000207.do",body).then(data =>{
                _this.items = data.body.operRoleMenuList
                _this.items.push({bsnName: '设置',url:'/setShortMenu' })
            })
           },
           //判断登录信息
           isLogin(){
               let _this = this
               //alert(typeof(_this.$tools.storage.get("user", "save"))=='object')
               if(typeof(_this.$tools.storage.get("user", "save"))!='object'){
                  _this.shortCutMenu = false
               }else{
                   _this.shortCutMenu =true
               }
           }
        },
        mounted: function () {
            let _this = this;
            _this.getShortMenu()
            _this.isLogin()
        }
}

</script>
<style lang="scss">
.shortCutMenu{position:fixed;top:203px;left:50%;margin-left:500px;z-index:3;}
.menu{height:40px;background:#4c4c4c;color:#fff;font-size:16px;}
.shortCut{height:40px;line-height:40px;color:#353535;background:#fff;text-align:center;position:relative;}
.shortCut .line{position:absolute;top:46%;right:32%;color:#ee6b00;display:none;}
.shortCut a{display: block;}
.shortCut a:hover{color:#ee6b00;}
.shortCut a:hover .line{display:block;}
.menuIcon{font-size:25px;color:#ee6b00;position:absolute;bottom:-23px;right:1px;}
.retract{height:30px;line-height:30px;background:#a6a6a6;color:#fff;position:absolute;bottom:-51px;right:-1px;}

</style>