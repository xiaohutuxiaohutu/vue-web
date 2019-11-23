<template>
  <div class="main">
    <slot></slot>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'content',
  componentName: 'content',
  props:{
      headerInformation:{type:Boolean},
      headerMenu:{type:Boolean},
      footerHasMarginTop:{type:Boolean,default:true},
  },
  methods: {
    ...mapActions([
      'setHeaderInformation',
      'setHeaderMenu',
      'setFooterHasMarginTop'
    ])
  },
  created: function(){
    let _this = this;
    _this.setHeaderInformation(_this.headerInformation)
    _this.setHeaderMenu(_this.headerMenu)
    _this.setFooterHasMarginTop(_this.footerHasMarginTop)
  }
}
</script>

<style>
.main {
  min-height: calc(100vh - 174px);
}
</style>

