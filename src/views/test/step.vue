<template>
  <ynet-content id="templateName">
    <div class="main-container container-border mt20">

      <!--content--end-->
      <div class="main-container pt30">       
        <!--进度条-->
        <ynet-progress-bar class="mt20" :items="Global.BUSINESS_TEXT.registerStep" :itemIndex="itemIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <step1 @step="changeStep" v-if="currentStepIndex=='1'"></step1>
        <step2 @step="changeStep" v-if="currentStepIndex=='2'"></step2>

      </div>
      <!--content--end-->
      <!--温馨提示-->
      <ynet-panel :showTop="false" class="mt30">
        <template slot="title">温馨提示</template> 
        <template slot="content">
          <ynet-warm-tips :items="Global.BUSINESS_TEXT.registerTips"></ynet-warm-tips>
        </template>
      </ynet-panel>
      <!--温馨提示--end-->

    </div>
  </ynet-content>
</template>

<script>
import Global from '@src/components/global'   //温馨提示和进度条的文字说明
import step1 from './components/step1'
import step2 from './components/step2'
export default {
  name:'templateName',
  components: {
    step1,
    step2
  },
  data() {
    return {
        Global,
        itemIndex:0,
        currentStepIndex:"1"
    }
  },
  methods: {
    changeStep(index){
      this.currentStepIndex=index
      this.itemIndex=Number(index)-1
    }
  },
  mounted(){ 
    
  }
}
</script>
