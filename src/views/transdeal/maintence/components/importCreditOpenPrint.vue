<template>
  <importCreditOpenPrint :formData="formData" :isPrint="isPrint"></importCreditOpenPrint>
</template>

<script>
import importCreditOpenPrint from '../../../internationalBusiness/components/importCreditOpenPrint'
export default {
  name:'importCreditOpenPrint1',
  components: {
    importCreditOpenPrint
  },
  data() {
    return {
    }
  },
  props:{
    formData:{type:Object,default:{}},
    isPrint:{type:Boolean,default:false},
  },
  methods: {
  },
  mounted(){
  }
}
</script>
<style  lang="scss">
</style>