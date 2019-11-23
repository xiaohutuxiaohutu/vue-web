<template>
<div id="myCard">
  <!--我的卡列表---->
  <div class="Iframe BoxShadow BgWhite mt10">
      <el-carousel height="230px" class="myCardCarousel" :interval="5000" indicator-position="none" :autoplay="false" arrow="always">
        <el-carousel-item v-for="(item,itemIndex) in cardList" class="cardCarousel">
          <template v-for="(itemChild,itemChildIndex) in item">
            <el-col :span="10"  :offset="2" class="cardChild mt20" v-if="!itemChild.addCard">
              <div class="myCard p10 fix" :class="{borderRed:itemChildIndex==0 && itemIndex==0}">
                <el-col :span="14">
                  <a href="javascript:;"  @click="requestMyTransaction"><ghb-icon :Type="type='ghbCard'" :NO="itemChild.cardType" ></ghb-icon></a>
                </el-col>
                <el-col :span="9" :offset="1">
                  <h3>账户余额</h3>
                  <p><strong class="colorRed fontSize14">{{itemChild.card}}</strong>元</p>
                  <ul class="mt10">
                    <li>
                      <p class="colorGray9">可用余额</p>
                      <p>532,836.00元</p>
                    </li>
                    <li>
                      <p class="colorGray9">可用余额</p>
                      <p>2,836.00元</p>
                    </li>
                    <li v-if="itemChild.NO">
                      <p class="colorGray9">关联存折</p>
                      <p>{{itemChild.NO}}</p>
                    </li>
                  </ul>
                </el-col>
              </div>
              <p class="myCardLink pl20 mt10">
                <router-link  to="/login">转账</router-link>
                <router-link  to="/login">投资</router-link>
                <router-link  to="/login">交易明细</router-link>
                <router-link  to="/login">账户查询</router-link>
              </p>
            </el-col>
            <el-col :span="10"  :offset="2" class="cardChild mt20" v-else>
              <div class="myCard p10 fix">
                <el-col :span="14">
                  <router-link class="addCardBg fl" to="/login">
                     <p class="tac mt40"><i class="el-icon-plus"></i></p>
                     <p class="tac mt10">添加新卡</p>
                  </router-link>
                </el-col>
                <el-col :span="9" :offset="1">
                  <h3 class="mt5">广东创兴银行</h3>
                  <p class="mt5">等待您的加入</p>
                </el-col>
              </div>
            </el-col>
          </template>
        </el-carousel-item>
      </el-carousel>
  </div>
  <!--我的卡列表--END-->
  <!--最近交易记录---->
  <div class="Iframe BoxShadow BgWhite mt10 MyTransaction">
    <div class="plr20 lh40 fix">
      <h3 class="fl">最近交易记录</h3>
      <span class="fr"><a href="javascript:;">更多交易记录</a></span>
    </div>
    
    <el-table ref="MyTransaction"  :data="tableData" id="MyTransaction" stripe>
      <el-table-column label="交易信息" width="160">
        <template scope="scope">
          <ghb-icon Type="transaction" NO="CR"></ghb-icon>
        </template>
      </el-table-column>
      <el-table-column label="交易金额">
        <template scope="scope">
          <span class="colorRed" v-if="scope.row.balanceOfPayments == '1'">￥ + {{ scope.row.money }}</span>
          <span class="colorGreen" v-if="scope.row.balanceOfPayments == '2'">￥ - {{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户余额">
        <template scope="scope">￥ 437.00</template>
      </el-table-column>
      <el-table-column prop="time" label="交易日期"></el-table-column>
      <el-table-column label="备注" width="200">  <!----label-class-name="btnEye"--配置打码-->
        <template scope="scope">
          <span v-if="scope.row.accont">
             <ghb-icon :Type="type='bank'" :NO="scope.row.bankType"></ghb-icon>
             {{$tools.utils.mask(scope.row.accont,{beforeIndex:4,behindIndex:4})}}
             {{ scope.row.name }}
          </span>
          <span v-if="scope.row.otherType">
             {{scope.row.otherType}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right"  width="100">
        <template scope="scope">
          <el-button  type="text" size="small">详细</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--最近交易记录--END-->
</div>
</template>

<script>
import ghbIcon from '@src/components/icon'  //icon
export default {
    name:'MyCard',
    components:{
      ghbIcon
    },
    data() {
      return {
        cardList:[],
        tableData:[],
        NO:"1",
        imgsrc:[
          {"url":""},
          {"url":""},
          {"url":""},
          {"url":""},
          {"url":""},
          {"url":""}
        ]
      };
    },
    methods: {
      /*accountMaskFn(column,e){
        let $target=$(e.target)
        if(column.label=="交易信息" && $target.hasClass("cell")){
          this.isAccountMask=!this.isAccountMask
          $target.toggleClass("showEye")
        }
      },*/
      requestMyTransaction(e){
        let _this=this
        let cardData=""
        if(!e){
          cardData=_this.cardList[0][0]
        }else{
          let $target=$(e.target)
          let cardChildIndex=$target.closest(".cardChild").index()
          let carouselIndex=$target.closest("div.cardCarousel").index("div.cardCarousel")
          cardData=_this.cardList[carouselIndex][cardChildIndex]
          $target.closest("div.myCardCarousel").find("div.myCard").removeClass("borderRed")
          $target.closest("div.myCard").addClass("borderRed")
        }
        _this.$tools.request(this,"MyTransaction.do",cardData).then(
            data => {
              _this.tableData=data.body.tableData
        })
      }
    },
    mounted(){
      let _this=this
      _this.$tools.request(this,"myCard.do").then( //先请求卡列表
        data => {
          data.body.myCardList.push({"addCard":true})
          _this.cardList=_this.$tools.array["equalDivision"](data.body.myCardList,2)
          _this.requestMyTransaction()  //在请求交易信息
      })
    }
}

</script>