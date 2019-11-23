<template>
  <div class="transaction-bar">
    <el-row :style="rowStyle">
      <template v-for="index in items.length">
        <div :class="[
          'transaction-bar-step-left',
          itemIndex >= (index-1) ? 'transaction-bar-step-left-select' : '',
        ]"></div>

        <div :class="[
          'transaction-bar-step',
          itemIndex >= (index-1) ? 'transaction-bar-step-select' : '',
        ]">{{index}}</div>  

        <div :class="[
          'transaction-bar-step-right',
          itemIndex > (index-1) ? 'transaction-bar-step-right-select' : '',
        ]"></div>
      </template>
    </el-row>
    <el-row :style="rowStyle">
      <template v-for="(item, index) in items">
        <div :class="[
          'transaction-bar-text',
          itemIndex >= index ? 'transaction-bar-text-select' : '',
        ]">{{item}}</div>
      </template>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'transaction-bar',
  componentName: 'transaction-bar',
  data() {
    return {
      rowStyle: {},
    }
	},
  props: {
    items: {
      type: Array
    },
    itemIndex: {
      type: Number
    }
  },
  watch: {
    items: function(){
      this.setStyle()
    }    
  },
  created: function() {
    this.setStyle()
  },
  methods: {
    setStyle: function(){
      let rowWidth = (this.items.length *160) + 'px'
      this.rowStyle = {
        width : rowWidth
      }
    }
  }
  
      
}
</script>

<style lang="scss">
@import '../../../styles/vars.scss';

.transaction-bar{
  color: $color-text-gray;
  text-align: center;
  height: 70px;
  margin-left: -50px;
}
.transaction-bar-text{
  width: 160px;
  font-size: 14px;
  padding-top: 10px;
  float: left;
}
.transaction-bar-step-left{
  float: left;
  width: 60px;
  height: 15px;
  border-bottom: 10px solid #ccc;
}
.transaction-bar-step{
  float: left;
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius:50%;
  color: #fff;
  background:#ccc;
  border: 2px solid #fff;
}
.transaction-bar-step-right{
  float: left;
  width: 60px;
  height: 15px;
  border-bottom: 10px solid #ccc;
}
.transaction-bar .transaction-bar-step-left:first-child{
  border-bottom: 0px;
}
.transaction-bar .transaction-bar-step-right:last-child{
  border-bottom: 0px;
}

.transaction-bar-text-select{
  color: #f28d01;
}
.transaction-bar-step-select{
  background:#f28d01;
}
.transaction-bar-step-left-select{
  border-bottom: 10px solid #f28d01;
}
.transaction-bar-step-right-select{
  border-bottom: 10px solid #f28d01;
}

</style>
