<template>
<div class="applicationGuide p10">
  <h3>申请须知</h3>
  <ul>
    <li v-for="item in textList">
      {{item}}
    </li>
  </ul>
</div>
</template>
<script>
import applicationGuideText from './applicationGuideText'     //申请须知
export default {
  name: 'application-guide',
  componentName: 'application-guide',
  data () {
    return {
      textList:applicationGuideText[this.textNO]
    }
  },
  props: {
    textNO: {default: 'intraBankRemittance',type:String}
  },
  methods:{

  },
  mounted(){
    let _this=this
    //console.log(_this.textList)
  }
}
</script>
<style>
.applicationGuide{border:1px solid #cbcbc9; height: 200px; overflow: auto}
.applicationGuide h3{font-size:16px;}
.applicationGuide  li{margin-top:10px;}
</style>

