<template>
   <div class="LoginLoan mt20">
     <div class="Iframe">
       <div class="LoginLoanBoxLeft fix position-r">
         <div class="LoginBoxLeftIcon position-a LoanBgIcon"></div>
         <div class="fl w220 LoginBoxLeft LoginLoanBoxLeft">
           <h1 class="plr15 fontSize24">贷款</h1>
           <h2 class="plr15 lh60 fontSize28">借钱</h2>
           <p class="plr15 line h40 fontSize18">全心为你着想</p>           
         </div> 
         <div class="fr w780 LoginBoxRight FinancingBoxRightt">
           <el-tabs v-model="activeName" @tab-click="handleClick">
             <!--消费贷款-->
             <el-tab-pane label="消费贷款" name="financing">
               <el-col :span="8" v-for="items in 3">
                  <div class="LoginLoanBox">
                     <h3>个人生产经营贷</h3>
                     <p class="colorGray9 mt5 f14">快速审批 马上到账</p>
                     <p class="LoginLoanImg tac mt20">
                       <img src="../../../images/login/loanIcon1.jpg" />
                     </p>
                     <p class="LoginLoanBtn"><el-button type="primary" style="width:100%;">立即申请</el-button></p>
                  </div>
               </el-col>
             </el-tab-pane>
             <!--消费贷款--end-->
             <el-tab-pane label="经营贷款" name="fund">
               <img src="../../../images/login/loanBg2.jpg"/>
             </el-tab-pane>
             <el-tab-pane label="按揭贷款" name="deposit">
               <img src="../../../images/login/loanBg3.jpg"/>
             </el-tab-pane>
             <el-tab-pane label="其他贷款" name="other">
               <img src="../../../images/login/loanBg4.jpg"/>
             </el-tab-pane>
           </el-tabs>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
  // import { requestLogin } from '../../api/api';
  // import NProgress from 'nprogress'
  export default {
    name:'LoginLoan',
    data () {
      return {
        activeName:'financing'
      };
    },// data
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      }
    }// methods
  }

</script>

