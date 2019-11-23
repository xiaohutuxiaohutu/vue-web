<template>
  <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">快捷菜单设置</h3>
      <div class="p20">
        <ynet-shortcutMenu></ynet-shortcutMenu>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>

export default {
  name:'templateName',
  components: {

  },
  data() {
    return {
      form:{
        level:'1',
      },
      rules:{

      },
      form2:{
        amountRange:[{
          levelOne:'',
          levelTwo:'',
          levelThree:'',
          levelFour:'',
          levelFive:'',
          amount:''
        }],
      },
      rules2:{

      }
    }
  },
  methods: {
    addAmountRange(){
      let _this=this
      _this.$refs['form2'].validate((valid) => {
        if (valid) {
          _this.form2.amountRange.push({levelOne:'',levelTwo:'',levelThree:'',levelFour:'',levelFive:'',amount:''})
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    isShowAdd(index){
      let _this=this
      if(index != _this.form2.amountRange.length-1) return false
      return true
    },
    delAmountRange(index){
      let _this=this
      _this.form2.amountRange.splice(index, 1)
    },
    isShowDel(index){
      let _this=this
      if(index == 0 || index < _this.form2.amountRange.length-1) return false
      return true
    },
    inputRules(){
      return [
          {required: true, message: '请输入', trigger: 'blur' },
          {trigger: 'blur', validator:this.$tools.validator.isInteger},
          {trigger: 'blur', validator:this.$tools.validator.numberRange,rangeVal:[1,9]}
        ]
    },
    currencyRules(index){
      if(index=='0'){
        return [
          {required: true, message: '请输入', trigger: 'blur' },
        ]
      }
      return [
          {required: true, message: '请输入', trigger: 'blur' },
          {trigger: 'blur', validator:this.$tools.validator.amountCompareList,compareIndex:[index-1,index],compareName:'amount',vm:this,formName:"form2",formNode:'amountRange'}
        ]
    },
    selectChange(){
      let _this=this
      _this.form2.amountRange=[{levelOne:'',levelTwo:'',levelThree:'',levelFour:'',levelFive:'',amount:''}]
    },
    get(){
      console.log(this.form2.amountRange)
    }
  },
  mounted(){ 
    
  }
}
</script>
