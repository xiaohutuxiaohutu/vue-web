<template>
    <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
       <!--面包屑-->
       <ynet-breadcrumb></ynet-breadcrumb>
        <!--面包屑--end-->
        <div class="functionalArea">
          <h3 class="functionalAreaTitle">常用收款人维护</h3>
          <payeemaintain1></payeemaintain1>           
        </div>        
      </div>   
    </ynet-content>
</template>

<script>  
import payeemaintain1 from './components/payeemaintain1';

  export default {
    name:'batchtrans',
    components:{
      payeemaintain1,
    },
    data(){
      return{
       formData:{}
      }
    },
     methods: {
     changeStep(index,formData){
      let _this=this
      _this.stepIndex=Number(index)
      if(formData) _this.formData=formData
      _this.$tools.scrollTop()
    }
  },
  
}

</script>