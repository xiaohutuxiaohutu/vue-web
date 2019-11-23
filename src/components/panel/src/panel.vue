<template>
  <div class="panel">
    <div v-if="showTop" class="panel-top"></div>
    <div class="panel-title">
      <slot name="title"></slot>
    </div>
    <div class="panel-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel',
  componentName: 'panel',
  props:{
    //是否显示白色顶部
    showTop: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

.panel{
  width: 100%;
  background-color: #ffffff;
}
.panel-top{
  width: 100%;
  height: 20px;
}
.panel-title{
  line-height: 40px;
  padding: 0 20px;
  width:-webkit-calc(100%-40px);
  width:-moz-calc(100%-40px);
  width:calc(100%-40px);
  color: #999999;
  background-color: #f5f5f5;
  font-size: 12px;
  height: 40px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.panel-content{
  width: 100%;
  padding-top: 30px;
  padding-bottom: 60px;
}
</style>
