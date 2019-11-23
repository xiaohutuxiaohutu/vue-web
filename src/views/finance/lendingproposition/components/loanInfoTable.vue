<template>

    <table border=3 class="aaa">
        <tr>
            <th colspan=4 class="tl corange bggray"><h4>企业基本信息</h4></th>
        </tr> 
        <tr>
            <td class="one">贷款编号</td>
            <td class="two">1</td>
            <td class="one">贷款账号</td>
            <td class="two">1</td>
        </tr>
        <tr>
            <td class="one">企业名称</td>
            <td class="two">1</td>
            <td class="one">组织机构代码</td>
            <td class="two">1</td>
        </tr>
        <tr>
            <td class="one">法定代表人姓名</td>
            <td class="two">1</td>
            <td class="one">法定代表人证件</td>
            <td class="two">1</td>
        </tr>
        <tr>
            <td class="one">法定代表人证件号码</td>
            <td class="two">1</td>
            <td class="one">实际经营地址</td>
            <td class="two">1</td>
        </tr>
        <tr>
            <td class="one">所属行业</td>
            <td class="two">1</td>
            <td class="one">联系人姓名</td>
            <td class="two">1</td>
        </tr>
        <tr>
            <td class="one">联系人手机号</td>
            <td class="two">1</td>
            <td class="one">上年度营销收入</td>
            <td class="two">1</td>
        </tr>
        <tr>
            <td class="one">年度净利润</td>
            <td class="two">1</td>
            <td class="one">授信申报所在行</td>
            <td class="two">1</td>
        </tr>  
    </table>
     
</template>

<script>
export default {
  name:'loanInfoTable',
  components: {

  },
  data() {
    return {
       
    }
  },
  methods: {
    
  },
  mounted(){ 
    
  }
}
</script>
<style>
.aaa{
    width:100%;
  }
.one{
    width:20%;
}
.two{
    width:30%;
}
</style>