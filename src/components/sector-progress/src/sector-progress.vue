<template>
  <div @click="handleClick" class="sector-progress" :class="{progressBuyDisable:percentage==100}">
    <div class="sector-progress-btn">{{buttonText}}</div>
    <div class="sector-progress-info">{{infoText}}</div>
    <el-progress :class="colorValue" type="circle" :percentage="percentageVaule" :show-text="false" :width="72" :stroke-width="4"></el-progress>
  </div>
</template>
<script>
export default {
  name: 'sector-progress',
  componentName: 'sector-progress',
  props: {
    buttonText: {
      type: String,
    },
    infoText: {
      type: String,
    },
    percentage: {
      type: Number,
      default: 0
    },
  },
  computed: {
    colorValue() {
      if (this.percentage < 60) {
        return 'sector-progress-level1'
      } else if (this.percentage < 80) {
        return 'sector-progress-level2'
      } else if (this.percentage < 100) {
        return 'sector-progress-level3'
      } else {
        return 'sector-progress-level4'
      } 
    },
    percentageVaule() {
      return Math.floor(this.percentage*2/3)
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
}
</script>

<style lang="scss">
@import '../../../styles/vars.scss';
.sector-progress{
  width: 92px;
  height: 84px;
  overflow: hidden;
  margin: 0px auto;
  cursor: pointer;
}
.sector-progress.progressBuyDisable{cursor:default}
.sector-progress-level1,
.sector-progress-level2,
.sector-progress-level3,
.sector-progress-level4{
  margin: 0 10px;
  position: relative;
  top: -36px;
}
.sector-progress-level1 .el-progress-circle,
.sector-progress-level2 .el-progress-circle,
.sector-progress-level3 .el-progress-circle,
.sector-progress-level4 .el-progress-circle{
  transform:rotate(-120deg);
  -ms-transform:rotate(-120deg);
  -moz-transform:rotate(-120deg);
  -webkit-transform:rotate(-120deg);
  -o-transform:rotate(-120deg);
}
.sector-progress-level1 svg :last-child{
  stroke: $color-assist-green;
}
.sector-progress-level2 svg :last-child{
  stroke: $color-assist-yellow;
}
.sector-progress-level3 svg :last-child{
  stroke: $color-primary;
}
.sector-progress-level4 svg :last-child{
  stroke: rgb(229, 233, 242);
}

.sector-progress-btn{
  margin: 0 10px;
  width: 72px;
  position: relative;
  top: 29px;
  line-height: 14px;
  height: 14px;
  text-align: center;
  font-size: 14px;
  color: #ac202a;
}
.progressBuyDisable .sector-progress-btn{color:rgb(229, 233, 242)}
.sector-progress-info{
  width: 92px;
  background: #fff;
  position: relative;
  top: 40px;
  text-align: center;
  line-height: 12px;
  padding-top:6px;
  font-size: 12px;
  color: #d5d5d5;
  height: 18px;
  z-index: 2;
}
</style>

