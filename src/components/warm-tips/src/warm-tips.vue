<template>
  <div class="warm-tips mt20">
    <h3 class="fs16" v-if="NO=='0'">温馨提示</h3>
    <h3 class="fs16" v-else-if="NO=='1'">业务说明</h3>
    <ul class="mt10">
      <template v-for="(item, index) in items">
        <li>{{item}}</li> 
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'warm-tips',
  componentName: 'warm-tips',
  props: {
    items: {type: Array},
    NO: {type: String, default: '0'}
  }
}
</script>

<style>
.warm-tips{
  padding: 30px;
  border-top:1px solid #cbcbc9;
}
.warm-tips li{
  color: #4c4c4c;
  font-size: 12px;
  line-height: 12px;
  padding-bottom: 10px;
}
.warm-tips li:last-child{
  padding-bottom: 0px;
}
</style>
