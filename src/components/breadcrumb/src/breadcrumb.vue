<template>
<div class="breadcrumb">
  <p class="breadcrumbLeft fl pl15 fs16">您的位置</p>
  <p class="fl cgray"><span class="cOrange">{{getLocation}}</span> <template v-if="getLocation != ''">></template> {{lastLocation}}</p>
  <p class="fr" v-if="false">页面编号 : {{getPageId}}{{lastNO.length=="2"?"00"+lastNO:lastNO}}</p>
</div>
</template>
<script>
export default {
  name: 'breadcrumb',
  componentName: 'breadcrumb',
  data () {
    return {
      getLocation:"",
      lastLocation:"",
      getPageId:""
    }
  },
  props: {
    lastNO: {default: '',type:String},
    location:{default: ''}
  },
  methods:{
    initData(){
      let _this=this
      _this.getPageId=_this.$tools.getPageId(_this)
      let currentGround=_this.$tools.menuGround(_this)
      if(!currentGround){
        if(_this.$tools.validator.isShowMenu(_this) && _this.$tools.validator.isRequestRouter(_this)){
          setTimeout(function(){
            _this.initData()
          },100)
        }else{
          _this.lastLocation = _this.location
        }
      }else{
        let locationList=[]
        let menu=_this.$tools.storage.get("menu","save")
        let oneMenu=menu[currentGround["ground"]]
        let twoMenu=oneMenu.childrens[currentGround["current"][0]]
        locationList.push(oneMenu.bsnName)
        locationList.push(twoMenu.bsnName)
        if(currentGround["current"].length > 1){
          let threeMenu=twoMenu.childrens[currentGround["current"][1]]
          locationList.push(threeMenu.bsnName)
        }
        if(_this.location) locationList.push(_this.location)
        _this.lastLocation=locationList.pop()
        _this.getLocation=locationList.join(" > ")
      }
    }
  },
  mounted(){
    let _this=this
    _this.initData()
  }
}
</script>
<style>
.breadcrumb{height:38px; line-height:38px; border: 1px solid #f1f1f1; background:#fff;}
.breadcrumbLeft{ background:url(../../../images/common/breadcrumbLeft.png) no-repeat; display: block; width: 120px; color:#fff;}
</style>