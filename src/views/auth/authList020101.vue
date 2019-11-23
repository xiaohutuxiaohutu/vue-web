<template>
  <ynet-content id="authMain" :headerInformation="true" :headerMenu="true">
    <div class="main-container container-border mt20">
      <!--content--end-->
      <div class="pt30">       
        <el-tree :data="authList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
  name:'authMain',
  components: {
    step1,
    step2
  },
  data() {
    return {
        Global,
        itemIndex:0,
        currentStepIndex:"1",
        authList:[],
          defaultProps: {
            children: 'children',
            label: 'label',
            bsncode:'bsncode'
          }
    }
  },
  methods: {
    changeStep(index){
      this.currentStepIndex=index
      this.itemIndex=Number(index)-1
    },
    handleNodeClick(data) {
      console.log(data);
    }
  },
  mounted(){
	  let _this=this
      _this.$tools.request(this,"authList.do").then( //先请求卡列表
        data => {
        	console.log("11");
        	console.log(data);
          _this.authList=data.body.data;
      })
  }
}
</script>

