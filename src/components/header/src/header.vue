<template>
  <header class="header">
    <!--logo-->
    <div class="header-content container-border-b" v-if="headerMenu">
      <div class="main-container">
        <div class="header-logo"><img src="../../../images/common/logo.png" /></div>
        <div class="header-icon fr mt15" v-if="headerMenu" >
          <!--img src="../../../images/common/hearderLink.png" class="vab" />-->
          <span style="padding-right: 20px;"><a href="#/helpCenter">帮助中心</a></span>
          <span ><a :href="'#/menuMap'">网银地图</a></span>
          <!--a href="#/headerNav/mapMain"><img src="../../../images/common/hearderLink.png" class="vab" /></a-->
          <!--span><a href="#/serviceGuide">服务指南</a></span-->
            <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo " mode="horizontal" @select="handleSelect" style="display: inline-block;vertical-align: middle;height: 36px;">
                <el-submenu index="1">
                  <template slot="title" class="serviceC"><a>服务指南</a></template>
                  <el-menu-item index="1-1"><a @click="showGuidePage('1')">新用户向导</a></el-menu-item>
                  <el-menu-item index="1-2"><a @click="showGuidePage('2')">企业管理员操作指引</a></el-menu-item>
                  <el-menu-item index="1-3"><a @click="showGuidePage('3')">企业操作员指引</a></el-menu-item>
                </el-submenu>
            </el-menu>
          <a class="hearderQuit" @click="logout" >安全退出</a>
        </div>
      </div>
    </div>
    <!--logo--end-->
    <!--一级菜单-->
    <div class="header-subnav one-menu position-r" v-if="headerMenu">
      <div class="main-container position-r">
        <el-menu :default-active="$route.path" mode="horizontal" router>
          <template v-for="(item,index) in menu">
            <li v-if="item.isOpen=='0'" class="el-menu-item" @click="isOpen(item.warnMsg)">{{item.bsnName}}</li>
            <el-menu-item v-else :index="item.url">{{item.bsnName}}</el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="menuRight">
        <i class="menuRightBg"></i>
      </div>
    </div>
    <!--一级菜单--end-->
    <!--二、三级菜单-->
    <div class="two-menu BoxShadow" v-if="headerMenu">
      <div class="main-container">
        <div class="plr10">
          <el-menu :default-active="$route.path" mode="horizontal" router>
            <template v-for="(item,index) in twoMenu">
              <template v-if="item.childrens.length">
                <li class="twoChild el-submenu" @mouseenter="showThreeMenu" @mouseleave="hideThreeMenu">
                  <div class="el-submenu__title">{{item.bsnName}}
                    <i class="el-submenu__icon-arrow el-icon-caret-bottom"></i>
                  </div>
                  <el-menu :default-active="$route.path" router v-show="false" class="three-menu" @select="jumpCloseMenu">
                    <el-menu-item v-for="child in item.childrens" :index="child.url">{{child.bsnName}}</el-menu-item>
                  </el-menu>
                </li>
              </template>
              <template v-else>
                <li v-if="item.isOpen=='0'" class="el-menu-item twoChild" @click="isOpen(item.warnMsg)">{{item.bsnName}}</li>
                <el-menu-item v-else class="twoChild" :index="item.url">{{item.bsnName}}</el-menu-item>
              </template>
            </template>
          </el-menu>
        </div>
      </div>
    </div>
    <!--三级菜单--end-->
     <!--快捷菜单设置---->
    <div class="shortCutMenu pb20" v-if="headerMenu">
          <el-row style="width:100px;">
            <el-col :span="24" class="menu plr15 ptb10">快捷菜单</el-col>
            <el-col :span="24" class="shortCut" v-for="item in items"><a @click="toMenu(item)">{{ item.bsnName }}<div class="line">——</div></a></el-col>
            <div v-if="isCloseMenu"><el-col :span="24" class="tac menuIcon"><i class="el-icon-caret-top"></i></el-col>
            <el-col :span="24" class="retract tac"><a @click="up()">点击收起</a></el-col></div>
            <div v-if="isOpenMenu"><el-col :span="24" class="tac menuIcon"><i class="el-icon-caret-bottom"></i></el-col>
            <el-col :span="24" class="retract tac"><a @click="down()">点击展开</a></el-col></div>
          </el-row>
      </div>
  <!--快捷菜单设置-- end-->
  </header>
  
</template>

<script>
import menuList from '@src/components/menu.js'   //测试用菜单
export default {
  name: 'header',
  componentName: 'header',
  data() {
    return {
      menu: [],
      twoMenu: [],
      threeMenu: [],
      isShowTwo: false,
      isShowThree: false,
      isCloseMenu:true,
      isOpenMenu:false,
      menuSearchData: "",
      cbLogin: "",
      cbHome: "",
      userName: "",
      projectMessage: "",
      menuList: "",
      beforeLogin: true,
      allMenu:[],
      items:[],
      isManagerGuide: false,
    }
  },// data
  props: {
    headerInformation: { type: Boolean, default: false },
    headerMenu: { type: Boolean, default: false }
  },
  methods: {
    showThreeMenu(e) {
      $(e.target).addClass("is-opened")
      $(e.target).find(".el-menu").stop().fadeIn()
    },
    hideThreeMenu(e) {
      $(e.target).removeClass("is-opened")
      $(e.target).find(".el-menu").stop().fadeOut()
    },
    jumpCloseMenu() {
      $(".twoChild.is-opened").removeClass("is-opened")
      $(".three-menu").hide()
    },
    handleIconClick(e) {
      //console.log(this.menuSearchData)
    },
    isOpen(warnMsg) {
      this.$alert(warnMsg, '提醒')
    },
    logout() {   // 退出登录
      var _this = this
      _this.beforeLogin = false
      this.$confirm('您确定要退出网上银行吗?', '温馨提示', {
        //type: 'warning'
      }).then(() => {
        _this.$tools.request(_this,"CB000108.do").then(data =>{
        _this.$tools.storage.get("user")
        _this.$tools.storage.get("menu")
        _this.$tools.storage.get("menuGround")
        _this.$router.push({ path: '/login/loginMain' })
        //sessionStorage.clear()
        })
      }).catch(() => {

      });
    },
    onehandleselect(Path, indexPath, e) {  // 一级菜单点击事件
      //let _this=this
      //let menuIndex=$(e.$el).index()
      //_this.twoMenu=_this.menu[menuIndex].iTaskInfo.menu     
    },
    requestMenu() {  // 初次请求菜单
      let _this = this
      let user = _this.$tools.storage.get("user", "save")
      let body = {}
      body.userNo= user.eCIFID
      //菜单接口CB000201.do
      //虚拟报文taskInfo.do
      _this.$tools.request(this, "CB000201.do", body).then(
        data => {
          //测试用菜单
          //data=menuList
          let menu = []
          //menu = data.body.operRoleMenuList
          menu=data.body.operRoleMenuList
          if(menu[0].bsnCode!='CB00'){
            let myMain={"bsnCode":"CB00",
                        "bsnName":"首页",
                        "url":"/my/myMain",
                        "childrens":[],
                        "order":"0",
                        "level":"1"
                        }
            menu.splice(0,0,myMain)
          }
          for (let i = 0; i < menu.length; i++) {
              if (menu[i].childrens.length) {
                let children = menu[i].childrens
                if (children[0].childrens.length) {
                  children[0].url = children[0].childrens[0].url
                  menu[i].url = children[0].url
                } else {
                  menu[i].url = children[0].url
                }
                for (let j = 1; j < children.length; j++) {
                  if (children[j].childrens.length) {
                    children[j].url = children[j].childrens[0].url
                  }
                }
              }
            }
          //console.log(menu)
          _this.$tools.storage.set("menu", menu)
          _this.$tools.setMenuGround(menu)
          _this.refreshMenu()
          //_this.getShortMenu()
        }
      )
    },
    refreshMenu() {   // 刷新页面重新加载本地菜单
      let _this = this
      let menu = _this.$tools.storage.get("menu", "save")
      if (!menu) return
      let currentGround = _this.cbCurrentMenuGround()
      if (!currentGround){
        _this.menu = menu
        _this.twoMenu = []
        _this.isShowTwo = false
        return
      }
      _this.menu = menu
      if (_this.menu[currentGround["ground"]].childrens.length) {
        _this.twoMenu = _this.menu[currentGround["ground"]].childrens
        _this.isShowTwo = true
      } else {
        _this.twoMenu = []
        _this.isShowTwo = false
      }
      //console.log(_this.menu[currentGround["ground"]].order)
      if(0==_this.menu[currentGround["ground"]].order){ //首页刷新快捷菜单
        _this.getShortMenu()
      }
    },
    cbCurrentMenuGround() {  // 返回当前路由的分组
      let _this = this
      return _this.$tools.menuGround(_this)
    },
    menuState() {  // 选中当前菜单状态
      let _this = this
      let currentGround = _this.cbCurrentMenuGround()
      if (!currentGround) return
      $(".one-menu").find("li").eq(currentGround.ground).addClass("is-active").siblings("li").removeClass("is-active")
      if (_this.isShowTwo) {
        $(".two-menu").find("li.twoChild").eq(currentGround.current[0]).addClass("is-active").siblings("li").removeClass("is-active")
        $(".twoChild.is-active .three-menu").find("li").eq(currentGround.current[1]).addClass("is-active").siblings("li").removeClass("is-active")
      }
    },
    
    showHeadType() {
      let _this = this
      if (_this.headerMenu && _this.$tools.validator.isShowMenu(_this)) {
        let menu = _this.$tools.storage.get("menu", "save")
        if (!menu) {
          //显示用户名和预留信息
          _this.requestMenu()
        }
        else {
          _this.refreshMenu()
        }
      } else {
        _this.menu = []
        _this.twoMenu = []
      }
    },
     //请求快捷菜单
     getShortMenu(){     //请求快捷菜单
        let _this = this
        let body = {}
        body.userNo = this.$tools.storage.get("user","save").eCIFID,
        body.count = '5'//快捷菜单显示条数
        _this.$tools.request(_this,"CB000207.do",body).then(data =>{
            _this.items = data.body.operRoleMenuList
            _this.items.push({ bsnName:'设置',url:'/setShortMenu' })
            //console.log("快捷菜单:"+_this.items)
        })
    },
    toMenu(val){
        let _this = this
        //console.log("跳转地址:"+val.url)
        _this.$router.push({ path: val.url })
    },
    up(){  //收起快捷菜单方法
        let _this = this
        $(".shortCut").slideUp("show")
        _this.isCloseMenu = false
        _this.isOpenMenu = true
    },
    down(){  //展开快捷菜单方法
        let _this = this
        $(".shortCut").slideDown("slow")
        _this.isCloseMenu = true
        _this.isOpenMenu = false 
    },
    showGuidePage(val){
      let _this = this
      _this.headerMenu=false
      if(val=='1') _this.$router.push({path:'/serviceGuide'})
      else if(val=='2') _this.$router.push({path:'/managerGuide'})
      else if(val=='3') _this.$router.push({path:'/operatorGuide'})
    }
  },// methods
  watch: { // 挂载结束状态
    "headerMenu": "showHeadType",
    "$route": "showHeadType"
  },
  mounted() {
    //let _this = this
    //_this.getShortMenu()
  },
  updated() {  // 更新完成状态
    if (this.headerMenu) this.menuState()
  },
}
</script>

<style>
.header .header-content {
  width: 100%;
  height: 94px;
  background-color: #ffffff;
  min-width: 1000px;
}

.header-logo {
  float: left;
  padding-top: 25px;
  padding-top: 25px;
}
.shortCutMenu{position:fixed;top:204px;left:50%;margin-left:500px;z-index:3;}
.menu{height:40px;background:#4c4c4c;color:#fff;font-size:16px;}
.shortCut{height:40px;line-height:40px;color:#353535;background:#fff;text-align:center;position:relative;}
.shortCut .line{position:absolute;top:46%;right:32%;color:#ee6b00;display:none;}
.shortCut a{display: block;}
.shortCut a:hover{color:#ee6b00;}
.shortCut a:hover .line{display:block;}
.menuIcon{font-size:25px;color:#ee6b00;position:absolute;bottom:-23px;right:1px;}
.retract{height:30px;line-height:30px;background:#a6a6a6;color:#fff;position:absolute;bottom:-51px;right:-1px;}
.retract a{color:#fff;}
.retract a:hover{color:#ee6b00;}
.serviceC a:hover{color:#ee6b00;}
</style>
