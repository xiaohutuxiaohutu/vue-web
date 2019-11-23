<template>
  <div class="menuTreeOption" ref="menuTreeOption">
    <!--菜单树标题-->
    <div class="menuTreeTitle">
        <table width="100%">
              <thead>
                  <tr>
                    <td>菜单功能名称</td>
                    <td width="50%" class="tac">快捷菜单设置</td>
                  </tr>
              </thead>   
        </table>
    </div>
    <!--菜单树标题--END-->
    <!--菜单树节点-->
    <div class="menuTreeData" v-for="item1 in menuTree">
      <!--一级菜单节点-->
      <div class="menuTreeLevel_1">
          <table width="100%">
              <tr>
                <td class="treeDashed"><span @click="showMenu" class="menuTreeIcon"><i>+</i>{{item1.bsnName}}</span></td>
                <td width="50%" class="tac">--</td>
              </tr>
          </table>
      </div>
      <!--一级菜单节点--END-->
      <!--二级菜单节点-->
      <div class="menuTreeLevel_2_list hide">
        <template v-for="item2 in item1.childrens">
          <!--没有三级菜单节点-->
          <div class="menuTreeLevel_2" v-if="!item2.childrens.length" :menuId="item2.bsnCode">
              <table width="100%">
                  <tr>
                    <td class="treeDashed"><span class="treeDashed"></span>{{item2.bsnName}}</td>
                    <td width="50%" class="tac">
                      <el-checkbox class="checkboxTree menuTreeOption"  @change="checkboxChange(item2.bsnShort,item2)" v-model="item2.bsnShort"></el-checkbox>
                    </td>
                  </tr>
              </table> 
          </div>
          <!--没有三级菜单节点--END-->
          <!--有三级菜单节点-->
          <template v-else>
            <div class="menuTreeLevel_2">
                <table width="100%">
                    <tr>
                      <td class="treeDashed"><span class="treeDashed"></span>
                                            <span @click="showMenu" class="menuTreeIcon"><i>+</i>{{item2.bsnName}}</span></td>
                      <td width="50%" class="tac">--</td>
                    </tr>
                </table> 
            </div>
            <!--三级菜单节点-->
            <div class="menuTreeLevel_3_list hide">
              <template v-for="item3 in item2.childrens">
                <div class="menuTreeLevel_3" :menuId="item3.bsnCode">
                    <table width="100%">
                        <tr>
                          <td class="treeDashed"><span class="treeDashed"></span><strong class="treeDashed"></strong>{{item3.bsnName}}</td>
                          <td width="50%" class="tac">
                            <el-checkbox class="checkboxTree menuTreeOption"  @change="checkboxChange(item3.bsnShort,item3)" v-model="item3.bsnShort"></el-checkbox>
                          </td>
                        </tr>
                    </table> 
                </div>
              </template>
            </div>
            <!--三级菜单节点--END-->
          </template>
          <!--有三级菜单节点-->
        </template>
      </div>
      <!--二级菜单节点--END-->
    </div>
    <!--菜单树节点--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="setShortMenu">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'shortcutMenu',
  componentName: 'shortcutMenu',
  data() {
    return {
      menuTree:[],
      shortcutMenuList:[]
    }
  },
  props: {
    // Type: {type: String, default: ''},
    // NO: {type: String, default: ''},
    // Name: {type: String, default: ''},
  },
  methods:{
    showMenu(eve){
      $(eve.currentTarget).closest("div").next("div").slideToggle();
			if($(eve.currentTarget).find("i").html()=="+"){
				  $(eve.currentTarget).find("i").html("-")
			}else{
				  $(eve.currentTarget).find("i").html("+")
			}
    },
    checkboxChange(value,menuItem){
      
      let _this = this
      //console.log("value",value)
      //console.log("menuItem",menuItem.bsnCode)
      if(value){
        if(_this.shortcutMenuList.length == 5) {
          menuItem.bsnShort = false        
          _this.$alert('快捷菜单最多只能设置5个', '温馨提示',{
            confirmButtonText:'确定',
            // callback:action=> {
            //    menuItem.bsnShort = false
            // }
          })     
        }else{
          _this.shortcutMenuList.push({"bsnCode":menuItem.bsnCode})
        }
      }else{
        _this.shortcutMenuList = _this.shortcutMenuList.filter(function(obj,index){
           if(menuItem.bsnCode != obj.bsnCode) return obj
         })
      }
      //console.log(JSON.stringify(_this.shortcutMenuList))
		},
    setShortMenu(){
        let _this=this
        if(_this.shortcutMenuList.length){
            let body={}
            body.operRoleMenuList=_this.shortcutMenuList
            _this.$tools.request(_this,"CB000209.do",body).then(data =>{
              let errorCode=data.body.errorCode
              if(errorCode==''||errorCode==null||errorCode=='0')
              {
                _this.$alert("设置成功", '温馨提示', { 
                   confirmButtonText: '确定'
                }).then(() =>{
                  _this.refreshStorageMenu(_this.shortcutMenuList)
                  _this.back()
                })
              }else{
                _this.$alert(data.body.errorMsg, '温馨提示', { 
                   confirmButtonText: '确定'
                })
              }
            })
        }else{
          _this.$alert("请先勾选要设置的快捷菜单", '温馨提示', {
              confirmButtonText: '确定'
            })
        }
    },
    refreshStorageMenu(bsnCodeList){
      let _this=this
      let menu = _this.$tools.storage.get("menu", "save")
      for (let i = 0; i <menu.length; i++) {
        if (menu[i].childrens.length) {
          let children = menu[i].childrens
          for (let j = 0; j < children.length; j++) {
            if (children[j].childrens.length) {
              let childrenSon = children[j].childrens
              for (let k = 0; k < childrenSon.length; k++) {
                  for(let a = 0;a < bsnCodeList.length;a++){
                    if(childrenSon[k].bsnCode==bsnCodeList[a].bsnCode){
                      childrenSon[k].bsnShort="true"
                      break;
                    }else{
                      childrenSon[k].bsnShort = "false"
                    }
                  }
              }
            } else {
                for(let a = 0;a < bsnCodeList.length;a++){
                    if(children[j].bsnCode==bsnCodeList[a].bsnCode){
                      children[j].bsnShort="true"
                      break;
                    }else{
                      children[j].bsnShort="false"
                    }
                  }
              }
            }
          }
        }
        _this.$tools.storage.set("menu",menu)
    },
    shortMenu() {
      let _this = this
      _this.menuTree = _this.$tools.storage.get("menu", "save")
      _this.menuTree.splice(0, 1)
      for (let i = 0; i < _this.menuTree.length; i++) {
        if (_this.menuTree[i].childrens.length) {
          let children = _this.menuTree[i].childrens
          for (let j = 0; j < children.length; j++) {
            if (children[j].childrens.length) {
              let childrenSon = children[j].childrens
              for (let k = 0; k < childrenSon.length; k++) {
                if (childrenSon[k].bsnShort == "true") {
                  childrenSon[k].bsnShort = true
                   _this.shortcutMenuList.push({
                    "bsnCode":childrenSon[k].bsnCode,
                  })
                } else {
                  childrenSon[k].bsnShort = false
                }
              }
            } else {
              if (children[j].bsnShort == "true") {
                children[j].bsnShort = true
                _this.shortcutMenuList.push({
                    "bsnCode":children[j].bsnCode,
                  })
              } else {
                children[j].bsnShort = false
              }
            }
          }
        }
      }
      //console.log("快捷菜单列表"+JSON.stringify(_this.shortcutMenuList))
    },
    back(){
      let _this=this
      _this.$router.push({path: "/my/myMain"})
    },
  },
  mounted(){
    let _this = this
    _this.shortMenu()
  }
}
</script>
<style  lang="scss">
@import '../../../styles/vars.scss';
.menuTreeOption td{ border:1px solid #ddd; line-height:40px; padding:0px;}
.menuTreeOption thead td{background:#eee; font-weight:bold; font-size:14px; text-align:center;}
.menuTreeOption td.treeDashed{background:url(../../../images/common/dashed.png) no-repeat 20px center; padding-left:50px;}
.menuTreeOption span.treeDashed,.menuTreeOption strong.treeDashed{background:url(../../../images/common/dashed.png) no-repeat; display:block; width:30px; float:left; height:40px;}
.menuTreeOption .menuTreeLevel_1 td.treeDashed,.menuTreeOption .menuTreeLevel_2 span.treeDashed,.menuTreeOption .menuTreeLevel_3 strong.treeDashed{background:url(../../../images/common/dashed_left.png) no-repeat left center;}
.menuTreeOption .menuTreeLevel_1 td.treeDashed{background-position:20px center;}
.menuTreeOption .menuTreeIcon{position:relative;  display:inline-block; background:#FFF;}
.menuTreeOption .menuTreeIcon i{display:inline-block; width:16px; height:16px; overflow:hidden; text-align:center; line-height:16px; border:1px solid #ddd; position:absolute; background:#eee; font-style:normal; cursor:pointer; left:-34px; top:10px; }
.menuTreeData,.menuData,.menuTreeLevel_2,.menuTreeLevel_3{margin-top:-1px;}
.menuTreeOption .hide{display:none;}
</style>
