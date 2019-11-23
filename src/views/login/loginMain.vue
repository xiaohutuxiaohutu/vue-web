<template>
  <ynet-content>
    <login v-if="login"></login>
    <saoMa v-if="dimension" @back="back"></saoMa>
  </ynet-content>
</template>

<script>
  import login from './components/login';
  import saoMa from './components/saoMa';

  export default {
    name:'LoginMain',
    components:{
      login,
      saoMa
     
    },
    data() {
      return {
        login:true,
        dimension:false
      };
    },
    methods: {
      back(){
         let _this=this
        _this.login = false
        _this.dimension=true
      },
       changeStep(index,formData){
      let _this=this
      //_this.stepIndex=Number(index)
      //if(formData) _this.formData=formData
      //_this.$tools.scrollTop()
    }
    }
  }

</script>
