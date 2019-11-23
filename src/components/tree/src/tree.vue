<template>
  <div class="menuTreeOption" ref="menuTreeOption">
    <!--菜单树标题-->
    <div class="menuTreeTitle">
        <table width="100%">
              <thead>
                  <tr>
                    <td>企业网银菜单地图</td>
                    <!-- <td width="30%" class="tac">操作功能权限</td>
                    <td width="30%" class="tac">审核功能权限</td> -->
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
                <!-- <td width="30%" class="tac">--</td>
                <td width="30%" class="tac">--</td> -->
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
                    <!-- <td width="30%" class="tac">
                      <el-checkbox class="checkboxTree menuTreeOption"  @change="checkboxChange" v-model="item2.menuTreeOption"></el-checkbox>
                    </td>
                    <td width="30%" class="tac">
                      <el-checkbox class="checkboxTree menuTreeVerify"  @change="checkboxChange" v-model="item2.menuTreeVerify"></el-checkbox>
                    </td> -->
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
                      <!-- <td width="30%" class="tac">--</td>
                      <td width="30%" class="tac">--</td> -->
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
                          <!-- <td width="30%" class="tac">
                            <el-checkbox class="checkboxTree menuTreeOption"  @change="checkboxChange" v-model="item2.menuTreeOption"></el-checkbox>
                          </td>
                          <td width="30%" class="tac">
                            <el-checkbox class="checkboxTree menuTreeVerify"  @change="checkboxChange" v-model="item2.menuTreeVerify"></el-checkbox>
                          </td> -->
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

  </div>
</template>
<script>
export default {
  name: 'tree',
  componentName: 'tree',
  data() {
    return {
      menuTree:[]
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
    checkboxChange(eve){
      console.log(eve)
			var checkboxChange=$(eve.currentTarget).attr("checkboxChange")
			if(checkboxChange){
				  $(eve.currentTarget).removeAttr("checkboxChange")
			}else{
			   $(eve.currentTarget).attr("checkboxChange","checkboxChange")
			}
			var checkbox=$(eve.currentTarget).closest("div").find("input[type='checkbox']")
			var checkboxLength=checkbox.length
			for(var i=0;i<checkboxLength;i++){
				var checkboxChange=checkbox.eq(i).attr("checkboxChange");
				if(checkboxChange){
					 $(eve.currentTarget).closest("div").addClass("checkboxDivChange")
					 break
				}else{
					 $(eve.currentTarget).closest("div").removeClass("checkboxDivChange")
				}
			}
      //this.recordChange()
		},
    recordChange(){
      var modifyMenuTree=[]
      var checkboxDivChange=$(this.$refs["menuTreeOption"]).find(".checkboxDivChange")
      var checkboxDivChangeLength=checkboxDivChange.length;
      if(checkboxDivChangeLength>0){
        modifyMenuTree=[]
      }
      for(var i=0;i<checkboxDivChangeLength;i++){
        var menuTreeOption=checkboxDivChange.eq(i).find("label.menuTreeOption")
        var menuTreeVerify=checkboxDivChange.eq(i).find("label.menuTreeVerify")
        modifyMenuTree[i]={}
        modifyMenuTree[i].bsnCode = checkboxDivChange.eq(i).attr("menuId")
        modifyMenuTree[i].menuFlag = menuTreeOption.find(".el-checkbox__input").hasClass("is-checked")
        modifyMenuTree[i].menuAuth = menuTreeVerify.find(".el-checkbox__input").hasClass("is-checked")
        modifyMenuTree[i].bsnName = ""
      }
      console.log(modifyMenuTree)
    }
  },
  mounted(){
    let _this=this
    _this.menuTree=this.$tools.storage.get("menu", "save")
    _this.menuTree.splice(0,1)
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
