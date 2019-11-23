<template>
  <div class="el-input" :class="{'is-disabled':disabled}" v-if="currencyInput">
    <input Type="text"  
    autocomplete="off"  
    class="el-input__inner"  
    @input="currencyReg($event.target.value,$event)"
    @focus="currencyParse($event.target.value,$event)" 
    @blur="blurValidator($event.target.value,$event)"  
    v-model="currentValue"
    :placeholder="placeholder"
    maxlength="15"
    :class="{isError:validatorBox}"
    :disabled="disabled"
     />
     <div v-if="showChinese" class="chineseCurrencyTip">大写金额：{{$tools.utils.toChinese(currentValue)}}</div>
     <div class="el-form-item__error" v-if="validatorBox">{{errText}}</div>
  </div>
  <span v-else>{{currentValue}}</span>
</template>
<script>
export default {
  name: 'currency-input',
  componentName: 'currency-input',
  data() {
      return {
        currentValue:this.$tools.utils.currencyFormat(this.value),
        chineseCurrencyTip:"",
        validatorBox:false,
        errText:"请输入金额",
        $parent:this.$parent || this.$root
      };
  },
  props: {
    showChinese:{type:Boolean,default:true},
    value:{},
    disabled:false,
    currencyInput:{type:Boolean,default:true},
    currencyValidator:{type:Boolean,default:true},
    placeholder:{type:String,default:"请输入金额"}
  },
  methods:{
    currencyReg(value,event){
      //this.validatorBox=false
      let isChange=true 
      value=value.replace(/\s+/g,"")   
      value=value.replace(/[^\d.]/g,"") //清除"数字"和"."以外的字符
      if((/^\d{13}/).test(value)){
        let $input=$(event.target)
        value=value.substring(0,value.length-1)
        $input.val(value)
        isChange=false
      }
      if(isNaN(value) || (/\.(\d{3,})$/).test(value)){ //正则只能输入两个小数      
        value=value.replace(/[^\d.]/g,"") //清除"数字"和"."以外的字符
        value=value.replace(/^\./g,"") //验证第一个字符是数字
        value=value.replace(/\.{2,}/g,".") //只保留第一个, 清除多余的小数点
        value=value.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
        value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3') //只能输入两个小数 
        isChange=false   
      }     
      this.currentValue=value
      if(isChange){
        this.$emit('input',value)
        this.$parent.$emit("el.form.change",value)
      }
    },
    currencyParse(value,event){
      value=this.$tools.utils.currencyParse(value)
      let $input=$(event.target)
      $input.val(value)
      event.target.select()
    },
    // nonempty(value){
    //   if(this.currencyValidator){
    //     if($.trim(value) === ""){
    //       this.validatorBox=true
    //       this.errText="请输入金额"
    //     }
    //   }
    // },
    blurValidator(value,event){
      let _transform=this.$tools.utils
      let currencyFormat=_transform.currencyFormat(value)
      let currencyParse=_transform.currencyParse(currencyFormat)
      //this.nonempty(value)
      this.$emit('input',currencyParse)
      this.$parent.$emit("el.form.blur",value)
      this.$emit('blur',currencyParse)
      let $input=$(event.target)
      $input.val(currencyFormat)
    },
    showErrBox(errText){
      //this.validatorBox=true
      //this.errText=errText
    }
  },
  mounted(){
    // if(this.value){
    //   this.currentValue=this.$tools.utils.currencyFormat(this.value)
    // }
  },
  watch:{
    value(newVal,oldVal){
      if(newVal===this.currentValue) return
      this.currentValue=this.$tools.utils.currencyFormat(newVal)
    }
  }
}
</script>
<style  lang="scss">
@import '../../../styles/vars.scss';
.isError{border-color: #ff4949;}
</style>
