<template>
   <div class="LoginLife mt20">
     <div class="Iframe">
       <div class="LoginLifeBoxLeft fix position-r">
         <div class="LoginBoxLeftIcon position-a LifeBgIcon"></div>
         <div class="fl w220 LoginBoxLeft LoginLifeBoxLeft">
           <h1 class="plr15 fontSize24">生活</h1>
           <h2 class="plr15 lh60 fontSize28">花钱</h2>
           <p class="plr15 line h40 fontSize18">精打细算</p>           
         </div> 
         <div class="fr w780 LoginBoxRight FinancingBoxRightt">
           <el-tabs v-model="activeName" @tab-click="handleClick">
             <el-tab-pane label="缴费" name="financing">
               <!--缴费-->
               <div class="LoginLifeBox fix">
                 <ul>
                   <li v-for="items in 6">
                     <h3>电影票</h3>
                     <p class="colorGray9 mt5 f14">10分钟内到账</p>
                     <p class="mt10"><a href="javascript:;">立即缴费</a></p>
                     <div class="lifeIconPosition">
                       <ghb-icon :Type="type='lifeIcon'" NO="1"></ghb-icon>
                     </div>
                   </li>
                 </ul>
               </div>
               <!--缴费--end-->
             </el-tab-pane>
             <el-tab-pane label="生活" name="fund">
               <img src="../../../images/login/lifeBg2.jpg"/>
             </el-tab-pane>
             <el-tab-pane label="积分" name="deposit">
               <img src="../../../images/login/lifeBg3.jpg"/>
             </el-tab-pane>
           </el-tabs>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
  import ghbIcon from '@src/components/icon'  //icon
  export default {
    name:'LoginLife',
    components:{
      ghbIcon
    },
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

