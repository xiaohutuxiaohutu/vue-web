<template>
<div class="box1">
            <div class="left bt">
                <div class="top mb40">
                    <span class="fl inline-block bc"><img src="../../../images/my/main_title_bj_178.png" alt=""></span>
                    <span class="pie"><img src="../../../images/my/asset.png" alt=""></span>
                    <span class="text">{{viewType}}视图（人民币）</span>
                    <div v-if="isManager">
                    <span class="fr mt10 inline-block mr20"><img src="../../../images/my/button_bj_108.png" alt=""></span>
                    <!--<a class="switch" style="color:#f28d01;" @click.stop="changeView()">切换{{viewType1}}</a>-->
                    <a class="switch" style="color:#f28d01;" v-if="viewType=='资产'" @click="changeView(1,0)">切换负债</a>
                    <a class="switch" style="color:#f28d01;" v-if="viewType=='负债'" @click="changeView(0,1)">切换资产</a>
                    </div>
                </div>
                <div class="block pt60">
                    <el-carousel ref="carousel" height="200px" :arrow="isArrow" :autoplay="false" :interval="Number(0)" trigger="click" @change="changeView">
                        <el-carousel-item ref="carousel-item" v-for="item in viewCount" :key="item">
                            <el-row>
                                <!--左边饼图-->
                                <el-col :span="8" :offset="1" class="chartPie" style="position:relative;">
                                    <div id="chartPie" style="width:170px; height:180px;" v-if="item==1"></div>
                                    <div id="chartPie2" style="width:170px; height:180px;" v-if="item==2"></div>
                                    <div class="tac fund">
                                        <p style="line-height:22px;color:#9c9c9c;">{{viewType}}总额（元）</p>
                                        <h3>
                                            <span class="colorRed" style="line-height:27px;" v-if="item==1">{{$tools.utils.currencyFormat(myAssetsForm.totalSum)}}</span>
                                            <span class="colorRed" style="line-height:27px;" v-if="item==2">{{$tools.utils.currencyFormat(myDebtForm.totalDebt)}}</span>
                                        </h3>
                                    </div>
                                </el-col>
                                <el-col :span="12" class="assetscard">
                                    <ul class="assetsPieList" ref="leftPie">
                                        <li @mouseenter="liHover($event)" @mouseleave="liLeave($event)">
                                            <router-link to="/accmanager/accquery/balancequeryMain">
                                                <span class="assetsPieListLeft">
                                                    <i class="squarePie mr15"></i>
                                                    <em v-if="item==1">活期存款</em>
                                                    <em v-if="item==2">贸易融资</em>
                                                </span>
                                                <span class="assetsPieListRight">
                                                    <em class="colorRed" v-if="item==1">{{$tools.utils.currencyFormat(myAssetsForm.currentSum)}}</em>
                                                    <em class="colorRed" v-if="item==2">{{$tools.utils.currencyFormat(myDebtForm.finnanceDebt)}}</em>
                                                    元</span>
                                                    
                                            </router-link>
                                        </li>
                                        <li @mouseenter="liHover($event)" @mouseleave="liLeave($event)">
                                            <router-link to="/accmanager/accquery/balancequeryMain">
                                                <span class="assetsPieListLeft">
                                                    <i class="squarePie mr15"></i>
                                                    <em v-if="item==1">定期存款</em>
                                                    <em v-if="item==2">流动性贷款</em>
                                                </span>
                                                <span class="assetsPieListRight">
                                                    <em class="colorRed" v-if="item==1">{{$tools.utils.currencyFormat(myAssetsForm.terminalSum)}}</em>
                                                    <em class="colorRed" v-if="item==2">{{$tools.utils.currencyFormat(myDebtForm.flowDebt)}}</em>
                                                    元</span>
                                            </router-link>
                                        </li>
                                        <li @mouseenter="liHover($event)" @mouseleave="liLeave($event)">
                                            <router-link to="/investment/calldeposit/callDepositQuery">
                                                <span class="assetsPieListLeft">
                                                    <i class="squarePie mr15"></i>
                                                    <em v-if="item==1">通知存款</em>
                                                    <em v-if="item==2">国定贷款</em>
                                                </span>
                                                <span class="assetsPieListRight">
                                                    <em class="colorRed" v-if="item==1">{{$tools.utils.currencyFormat(myAssetsForm.callSum)}}</em>
                                                    <em class="colorRed" v-if="item==2">{{$tools.utils.currencyFormat(myDebtForm.nationalDebt)}}</em>
                                                    元</span>
                                            </router-link>
                                        </li>
                                        <li @mouseenter="liHover($event)" @mouseleave="liLeave($event)" v-if="item==2">
                                            <router-link to="/investment/calldeposit/callDepositQuery">
                                                <span class="assetsPieListLeft">
                                                    <i class="squarePie mr15"></i>
                                                    <em>其他贷款</em>
                                                </span>
                                                <span class="assetsPieListRight">
                                                    <em class="colorRed">{{$tools.utils.currencyFormat(myDebtForm.totalDebt)}}</em>元</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </el-col>
                                <!--左边饼图--End-->
                            </el-row>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            chartLine: null,
            chartPie: null,
            viewType:"资产",//视图类型字段
            viewType1:"负债",//视图类型字段
            viewCount:1,//视图个数
            pieData1:[],//资产饼图数据
            pieData2:[],//负债饼图数据
            isArrow:"never",//是否显示切换箭头
            isManager:false,
            myAssetsForm: {
                currentSum: '0',//活期存款
                terminalSum: '0',//定期存款
                callSum: '0',//通知存款
                totalSum: '0'//资产总额
            },
            myDebtForm:{
                finnanceDebt:'0',//贸易融资
                flowDebt:'0',//流动性贷款
                nationalDebt:'0',//国定贷款
                otherDebt:'0',//其他贷款
                totalDebt:'0',//贷款总额
            },
        }
    },
    methods: {
        // selectchange(value) {
        //     console.log(value)
        // },
        changeView(newVal,oldVal){
            //console.log(newVal)
            let _this = this
            if(newVal=="1"){
                _this.viewType="负债"
                _this.viewType1="资产"
                _this.setPie(_this.pieData2,newVal)
            }else{
                _this.viewType="资产"
                _this.viewType1="负债"
                _this.setPie(_this.pieData1,newVal)
            }          
            _this.$refs['carousel'].setActiveItem(newVal)
        },

        liHover(e) {
            let currentIndex = $(e.target).index()
            this.pieDownplay()
            // 高亮当前图形
            this.chartPie.dispatchAction({
                type: 'highlight',
                dataIndex: currentIndex
            })
        },
        liLeave() {
            this.pieDownplay()
        },
        pieDownplay() {
            // 取消之前高亮的图形
            this.chartPie.dispatchAction({
                type: 'downplay',
                seriesIndex: [0, 1, 2, 3, 4]
            });
        },
        pieHover() {
            let _this = this
            let $leftPie = $(_this.$refs.leftPie)
            let $rightPie = $(_this.$refs.rightPie)
            _this.chartPie.on("mouseover", function(parm) {
                $leftPie.find("li").eq(parm.dataIndex).addClass("hover").siblings("li").removeClass("hover")
            })
            _this.chartPie.on("mouseout", function(parm) {
                $leftPie.find("li").eq(parm.dataIndex).removeClass("hover")
            })

        },
        getAssetsData(){
            let _this = this
            //let body = {}
            //body.cstNo = 800000000109
            //let user = _this.$tools.storage.get("user", "save")
            //body.operAccInfoList = user.operAccInfoList
            //console.log(JSON.stringify(user.operAccInfoList))
            //body.cstNo = user.hostNo
            _this.$tools.request(_this, "CB000202.do").then(
                data => {
                _this.myAssetsForm = data.body
                // _this.myAssetsForm.currentSum="100"
                // _this.myAssetsForm.terminalSum="200"
                // _this.myAssetsForm.callSum="300"
                // _this.myAssetsForm.totalSum="600"
                _this.pieData1 = [
                    { value: _this.myAssetsForm.currentSum, name: 'currentSum' },
                    { value: _this.myAssetsForm.terminalSum, name: 'terminalSum' },
                    { value: _this.myAssetsForm.callSum, name: 'callSum' },
                ]
                _this.setPie(_this.pieData1,0)
            })
        },
        getDebtData(){
            let _this=this
            _this.$tools.request(_this, "CB000208.do").then(data =>{
                let DealAssetDebtList=data.body.DealAssetDebtList
                if(DealAssetDebtList){
                    for(let i=0;i<DealAssetDebtList.length;i++){
                        if(DealAssetDebtList[i].currency=="CNY"){
                            if(DealAssetDebtList[i].productType=="finnanceDebt"){
                                _this.myDebtForm.finnanceDebt=DealAssetDebtList[i].balance
                            }else if(DealAssetDebtList[i].productType=="flowDebt"){
                                _this.myDebtForm.flowDebt=DealAssetDebtList[i].balance
                            }else if(DealAssetDebtList[i].productType=="nationalDebt"){
                                _this.myDebtForm.nationalDebt=DealAssetDebtList[i].balance
                            }else if(DealAssetDebtList[i].productType=="otherDebt"){
                                _this.myDebtForm.otherDebt=DealAssetDebtList[i].balance
                            }
                        }
                    }
                }
                _this.myDebtForm.totalDebt=Number(_this.myDebtForm.finnanceDebt)+Number(_this.myDebtForm.flowDebt)+Number(_this.myDebtForm.nationalDebt)+Number(_this.myDebtForm.otherDebt)
                _this.pieData2 = [
                    { value:_this.myDebtForm.finnanceDebt, name: '贸易融资' },
                    { value:_this.myDebtForm.flowDebt, name: '流动性贷款' },
                    { value:_this.myDebtForm.nationalDebt, name: '国定贷款' },
                    { value:_this.myDebtForm.otherDebt, name: '其他贷款' }
                ]   
            }) 
        },
        setPie(data,no){
            let _this=this
            let pieData=data
            //console.log("饼图数据------------------------------------"+JSON.stringify(pieData))
            //基于准备好的dom，初始化echarts实例
            if(no=='0'){
                _this.chartPie = echarts.init(document.getElementById('chartPie'));
            }else{
                _this.chartPie = echarts.init(document.getElementById('chartPie2'));
            }   
            _this.chartPie.setOption({
                series: [
                    {
                        name: '我的资产',
                        type: 'pie',
                        center: ['50%', "50%"],
                        data: pieData,
                        label: {
                            normal: { show: false, position: 'center' },
                            emphasis: {
                                show: true,
                                formatter: '{d}%',
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: { normal: { show: false } }
                    }

                ],
                color: ["#cd83f7", "#ea5044", "#f18031", "#28769e", "#2bcd7b"]
            });  // 饼图1配置
        },
    },     //-------methods
    mounted() {
        let _this=this
        _this.getAssetsData()
        let user=_this.$tools.storage.get("user","save")
        let right=user.right.substr(3,1)
        //alert(right)
        if(right=='1'){
            _this.getDebtData()
            _this.viewCount=2
            _this.isManager=true
            _this.isArrow="hover"
        }
    }
}

</script>
<style lang="scss">
.box1 {
    overflow: hidden;
    width: 670px;
    height: 342px;
    background:#fff;
}

.box1 .left .top {
    height: 33px;
    position: relative;
}

.box1 .left .top .pie {
    position: absolute;
    top: 5px;
    left: 14px;
}

.box1 .left .top .text {
    position: absolute;
    top: 0px;
    left: 38px;
    font-size: 14px;
    color: #fff;
    line-height: 29px;
}

.box1 .left .assetscard {
    width: 330px;
    height: 174px;
    overflow: auto;
    box-shadow: 2px 2px 10px pink;
}

.box1 .left .top .switch {
    position: absolute;
    top: 10px;
    right: 34px;
}

.box1 .left .el-carousel {
    overflow: inherit;
}

.box1 .el-carousel__arrow {
    border-radius: 0px;
    width: 20px;
    height: 82px;
}
.box1 .el-carousel__arrow i{display: none;}
.box1 .el-carousel__container button:nth-of-type(1) {
    background: url(../../../images/my/forward.png) no-repeat
}

.box1 .el-carousel__container button:nth-of-type(2) {
    background: url(../../../images/my/back.png) no-repeat
}

.fund {
    position: absolute;
    bottom: -25px;
    left: 40px;
}

.fade-leave-active {
    transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

span .colorRed{
    line-height: 29px;
}
</style>