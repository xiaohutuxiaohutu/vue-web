<template>
  <!--首页交易Icon-->
  <span v-if="Type == 'transactionStatus' && NO=='1'" class="iconSuccess"></span>
  <span v-else-if="Type == 'transactionStatus' && NO=='0'" class="iconFail"></span>

</template>
<script>
export default {
  name: 'icon',
  componentName: 'icon',
  props: {
    Type: {type: String, default: ''},
    NO: {type: String, default: ''},
    Name: {type: String, default: ''},
  },
  methods:{
    checkBankName: function(value){
      let name = this.Name
      return name.indexOf(value) != -1
    },
    errorImg(){
      console.log("errorImg")
    }
  }
}
</script>
