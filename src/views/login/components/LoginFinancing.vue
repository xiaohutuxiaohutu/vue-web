<template>
   <div class="LoginFinancing">
     <div class="Iframe">
       <div class="LoginFinancingBox fix position-r">
         <div class="LoginBoxLeftIcon position-a FinancingBgIcon"></div>
         <div class="fl w220 LoginBoxLeft FinancingBoxLeft">
           <h1 class="plr15 fontSize24">投资</h1>
           <h2 class="plr15 lh60 fontSize28">赚钱</h2>
           <p class="plr15 line h40 fontSize18">数钱到你手软</p>           
         </div> 
         <div class="fr w780 LoginBoxRight FinancingBoxRightt">
           <el-tabs v-model="activeName" @tab-click="handleClick">
             <!--理财产品-->
             <el-tab-pane label="理财产品" name="financing">
               <div class="LoginProductList plr30">
                 <ul>
                   <li>
                     <h3>创兴季季超越<span class="Productag">非保本</span><span class="Productag">热销</span></h3>
                     <el-row>
                       <el-col :span="5" class="tal">
                         <p><strong>4.4%</strong></p>
                       </el-col>
                       <el-col :span="4" :offset="1">
                         <p><strong class="fontSize22">84</strong>天</p>
                         <p>封存期数</p>
                       </el-col>
                       <el-col :span="9">
                         <p><strong class="fontSize22">5</strong>万</p>
                         <p>起点金额</p>
                       </el-col>
                       <el-col :span="5">
                         <span @click="buyProduct">
                           <ghb-sector-progress :percentage="10" button-text="购买" info-text="剩833万/4亿"></ghb-sector-progress>
                         </span>
                       </el-col>
                     </el-row>
                   </li>
                   <li>
                     <h3>创兴季季超越<span class="Productag">非保本</span><span class="Productag">热销</span></h3>
                     <el-row>
                       <el-col :span="5" class="tal">
                         <p><strong>上个工作日4.4%</strong></p>
                       </el-col>
                       <el-col :span="4" :offset="1">
                         <p><strong  class="fontSize22">84</strong>天</p>
                         <p>封存期数</p>
                       </el-col>
                       <el-col :span="9">
                         <p><strong class="fontSize22">5</strong>万</p>
                         <p>起点金额</p>
                       </el-col>
                       <el-col :span="5">
                         <span @click="buyProduct">
                           <ghb-sector-progress :percentage="60" button-text="购买" info-text="剩20000万/4亿"></ghb-sector-progress>
                         </span>
                       </el-col>
                     </el-row>
                   </li>
                   <li>
                     <h3>创兴季季超越<span class="Productag">非保本</span><span class="Productag">热销</span></h3>
                     <el-row>
                       <el-col :span="5" class="tal">
                         <p><strong>4.75%（>30万元，4.80%）</strong></p>
                       </el-col>
                       <el-col :span="4" :offset="1">
                         <p><strong class="fontSize22">84</strong>天</p>
                         <p>封存期数</p>
                       </el-col>
                       <el-col :span="9">
                         <p><strong class="fontSize22">5</strong>万</p>
                         <p>起点金额</p>
                       </el-col>
                       <el-col :span="5">
                         <ghb-sector-progress :percentage="100" button-text="售罄" info-text="剩0/4亿"></ghb-sector-progress>
                       </el-col>
                     </el-row>
                   </li>
                 </ul>
               </div>
             </el-tab-pane>
             <!--理财产品--end-->
             <!--基金产品--> 
             <el-tab-pane label="基金产品" name="fund">
               <div class="LoginProductList plr30">
                 <ul>
                   <li>
                     <h3>华夏大盘精选（000011）<em>混合型</em></h3>
                     <el-row>
                       <el-col :span="5" class="tal" :offset="1">
                         <p><strong>10.912</strong></p>
                         <p>单位净值</p>
                       </el-col>
                       <el-col :span="13" class="tar">
                         <p><strong>14.992</strong></p>
                         <p>累计净值</p>
                       </el-col>
                       <el-col :span="5" class="tar">
                         <p><a class="btn_buy_ellipse">购买</a></p>
                       </el-col>
                     </el-row>
                   </li>       
                   <li>
                     <h3>景顺中证（240008）<em>混合型</em></h3>
                     <el-row>
                       <el-col :span="5" class="tal" :offset="1">
                         <p><strong>10.912</strong></p>
                         <p>单位净值</p>
                       </el-col>
                       <el-col :span="13" class="tar">
                         <p><strong>14.992</strong></p>
                         <p>累计净值</p>
                       </el-col>
                       <el-col :span="5" class="tar">
                         <p><a class="btn_buy_ellipse">购买</a></p>
                       </el-col>
                     </el-row>
                   </li>
                   <li>
                     <h3>益民货币（560001）<em>货币型</em></h3>
                     <el-row>
                       <el-col :span="5" class="tal" :offset="1">
                         <p><strong>0.01483%</strong></p>
                         <p>七日年化</p>
                       </el-col>
                       <el-col :span="13" class="tar">
                         <p><strong>0</strong></p>
                         <p>万分收益</p>
                       </el-col>
                       <el-col :span="5" class="tar">
                         <p><a class="btn_buy_ellipse">购买</a></p>
                       </el-col>
                     </el-row>
                   </li>
                 </ul>
               </div>
             </el-tab-pane>
             <!--基金产品--end-->
             <!--智能存款-->
             <el-tab-pane label="智能存款" name="deposit">
               <div class="LoginProductList plr30">
                 <ul>
                   <li>
                     <h3>通知存款 <em>短期灵活储蓄</em></h3>
                     <el-row>
                       <el-col :span="5" class="tal" :offset="1">
                         <p><strong>5,000</strong></p>
                         <p>最低存款（元）</p>
                       </el-col>
                       <el-col :span="13" class="tar">
                         <p><strong>1天、7天</strong></p>
                         <p>存期</p>
                       </el-col>
                       <el-col :span="5" class="tar">
                         <p><a class="btn_buy_ellipse">存入</a></p>
                       </el-col>
                     </el-row>
                   </li>       
                   <li>
                     <h3>灵活盈 <em>闲置资金自动转存，靠档计息</em></h3>
                     <el-row>
                       <el-col :span="5" class="tal" :offset="1">
                         <p><strong>15,000</strong></p>
                         <p>最低转存（元）</p>
                       </el-col>
                       <el-col :span="13" class="tar">
                         <p><strong>3个月~5年</strong></p>
                         <p>存期</p>
                       </el-col>
                       <el-col :span="5" class="tar">
                         <p><a class="btn_buy_ellipse">签约</a></p>
                       </el-col>
                     </el-row>
                   </li>
                   <li>
                     <h3>跳板存款 <em>闲置资金自动转存，靠档计息</em></h3>
                     <el-row>
                       <el-col :span="5" class="tal" :offset="1">
                         <p><strong>5,000</strong></p>
                         <p>最低存款（元）</p>
                       </el-col>
                       <el-col :span="13" class="tar">
                         <p><strong>无固定期限</strong></p>
                         <p>存期</p>
                       </el-col>
                       <el-col :span="5" class="tar">
                         <p><a class="btn_buy_ellipse">签约</a></p>
                       </el-col>
                     </el-row>
                   </li>
                 </ul>
               </div>
             </el-tab-pane>
             <!--智能存款--end-->
           </el-tabs>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
  // import { requestLogin } from '../../api/api';
  // import NProgress from 'nprogress'
  import GhbSectorProgress from '@src/components/sector-progress'
  export default {
    name:'LoginFinancing',
    components:{
      GhbSectorProgress
    },
    data () {
      return {
        activeName:'financing'
      };
    },// data
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      buyProduct(){
        alert("敬请期待...")
      }
    }// methods
  }

</script>

