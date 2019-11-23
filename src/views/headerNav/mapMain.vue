<template>
  <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb location="网银地图"></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">网银地图</h3>
      <div class="p20">
        <el-radio-group v-model="mapState" @change="mapRadio">
          <el-radio label="show">全部展开</el-radio>
          <el-radio label="hide">全部收起</el-radio>
        </el-radio-group>
        <div class="fix mt20">
            <template v-for="menuTreeItem in menuTree">
              <div class="mapTreeOption fl">
                <!--菜单树节点-->
                <div class="menuTreeData" v-for="item1 in menuTreeItem">
                  <!--一级菜单节点-->
                  <div class="menuTreeLevel_1">
                      <table width="100%">
                          <tr>
                            <td class="treeDashed"><span @click="showMenu" class="menuTreeIcon"><i>+</i>{{item1.bsnName}}</span></td>
                          </tr>
                      </table>
                  </div>
                  <!--一级菜单节点--END-->
                  <!--二级菜单节点-->
                  <div class="menuTreeLevel_2_list hide">
                    <template v-for="item2 in item1.childrens">
                      <!--没有三级菜单节点-->
                      <div class="menuTreeLevel_2" v-if="!item2.childrens" :menuId="item2.bsnCode">
                          <table width="100%">
                              <tr>
                                <td class="treeDashed"><span class="treeDashed"></span>{{item2.bsnName}}</td>
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
        </div>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>

export default {
  name:'templateName',
  components: {

  },
  data() {
    return {
      menuTree:this.$tools.storage.get("menu", "save"),
      mapState:"show"
    }
  },
  methods: {
    showMenu(eve){
      $(eve.currentTarget).closest("div").next("div").slideToggle();
			if($(eve.currentTarget).find("i").html()=="+"){
				  $(eve.currentTarget).find("i").html("-")
			}else{
				  $(eve.currentTarget).find("i").html("+")
			}
    },
    mapRadio(value){
      if(value == "show") this.mapSlideDown()
      else this.mapSideUp()
    },
    mapSlideDown(){
      $(".menuTreeLevel_2_list").slideDown(function(){
        $(".menuTreeLevel_3_list").slideDown()
        $(".menuTreeIcon i").html("-")
      })
      
    },
    mapSideUp(){
      $(".menuTreeLevel_3_list").slideUp(function(){
        $(".menuTreeLevel_2_list").slideUp()
        $(".menuTreeIcon i").html("+")
      })
    },
  },
  mounted(){
    let _this = this
    _this.menuTree.splice(0, 1)
    _this.menuTree=_this.$tools.array["equalDivision"](_this.menuTree,3)
    //console.log(JSON.stringify(_this.menuTree))
    _this.mapSlideDown()
  }
}
</script>
<style  lang="scss">
@import '../../styles/vars.scss';
.mapTreeOption{width:33%;}
.mapTreeOption td{ line-height:40px; padding:0px;}
.mapTreeOption thead td{background:#eee; font-weight:bold; font-size:14px; text-align:center;}
.mapTreeOption td.treeDashed{background:url(../../images/common/dashed.png) no-repeat 20px center; padding-left:50px;}
.mapTreeOption span.treeDashed,.mapTreeOption strong.treeDashed{background:url(../../images/common/dashed.png) no-repeat; display:block; width:30px; float:left; height:40px;}
.mapTreeOption .menuTreeLevel_1 td.treeDashed,.mapTreeOption .menuTreeLevel_2 span.treeDashed,.mapTreeOption .menuTreeLevel_3 strong.treeDashed{background:url(../../images/common/dashed_left.png) no-repeat left center;}
.mapTreeOption .menuTreeLevel_1 td.treeDashed{background-position:20px center;}
.mapTreeOption .menuTreeIcon{position:relative;  display:inline-block; background:#FFF;}
.mapTreeOption .menuTreeIcon i{display:inline-block; width:16px; height:16px; overflow:hidden; text-align:center; line-height:16px; border:1px solid #ddd; position:absolute; background:#eee; font-style:normal; cursor:pointer; left:-34px; top:10px; }
.menuTreeData,.menuData,.menuTreeLevel_2,.menuTreeLevel_3{margin-top:-1px;}
.mapTreeOption .hide{display:none;}
</style>