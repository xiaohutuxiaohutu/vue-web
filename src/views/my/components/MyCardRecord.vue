<template>
    <!-- 最近转账交易 -->
    <div class="box4">
        <div class="bt top">
            <p>
                <span class="fl" style="font-size:16px;"><img src="../../../images/my/main_title_bj_178.png" alt=""></span>
                <span class="deal_record"><img src="../../../images/my/deal_record.png" alt=""></span>
                <span class="recent">最近转账交易</span>
                <span class="fr mt10"><img src="../../../images/my/button_bj_78.png" alt=""></span>
                <span class="more" @click="more">更多</span>
            </p>
        </div>
        <div>
            <el-row>
                <el-col :span="24" class="ptb10" style="border-top:1px solid #f1f1f1;" v-for="(item, index) in items">
                    <div class="cardImg inline-block mlr20" v-if="index==0"><img src="../../../images/my/no_01.png" alt=""></div>
                    <div class="cardImg inline-block mlr20" v-if="index==1"><img src="../../../images/my/no_02.png" alt=""></div>
                    <div class="cardImg inline-block mlr20" v-if="index==2"><img src="../../../images/my/no_03.png" alt=""></div>
                    <div class="cardImg inline-block mlr20" v-if="index==3"><img src="../../../images/my/no_04.png" alt=""></div>
                    <div class="inline-block hide" style="width:200px;">
                        <label class="pb5 lh30" style="color: #353535;">{{ item.recAccBank }}</label><br>
                        <label class="pb10" style="color:#9d9c9c;">卡号：{{ item.recAccNo }}</label>
                    </div>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: "first",
            items: []
        }
    },
    name: 'MyCardRecord',
    components: {

    },
    methods: {
        myCard() {
            let _this = this
            let body = {}
            let list = []
            // body.cstNo='01'
            // body.userNo='00001'
            body.tranCode = 'CB020102'
            _this.$tools.request(_this, "CB000206.do", body).then(
                data => {
                    let aa = data.body.oneStopTranList
                    if (aa!=null) {
                        for (var i = 0; i < aa.length; i++) {
                            if (i < 4) {
                                list.push(aa[i])
                            }
                        }
                        _this.items = list
                    }
                })
        },
        more() {
            let _this = this
            let form = {}
            form.startDate = new Date(this.getDefaultDate().replace(/-/g,"/"))
            form.endDate = new Date()
            _this.$router.push({ name: 'query', params: form })
        },
        getDefaultDate(){
            //let currDate = new Date('2012-05-30')     //resultDate='2012-02-29'
            //let currDate = new Date('2017-05-30')     //resultDate='2012-02-28'
            let currDate = new Date()
            let year = currDate.getFullYear()
            let month = currDate.getMonth()+1
            let date  = currDate.getDate()
            //let hms = currDate.getHours()+':'+currDate.getMinutes()+':'+(currDate.getSeconds()<10?'0'+currDate.getSeconds():currDate.getSeconds())
            switch(month){
                case 1:
                case 2:
                case 3:
                    month += 6
                    year --
                    break
                default:
                    month -= 6
                    break
            }
            month = (month < 10) ? ( '0' + month) : month
            if(month=='02'){
                if((year%4==0&&year%100!=0)||(year%400==0)){   //闰年判断
                if(Number(date)>29){
                    date='29'
                }
                } else {    //平年
                if(Number(date)>28){
                    date='28'
                }
                }
            }
            let resultDate = year+'-'+month+'-'+date
            return resultDate
        }
    },     //-------methods
    mounted: function() {
        let _this = this;
        _this.myCard()
    }
}

</script>
<style lang="scss">
.box4 {
    width: 270px;
    height: 358px;
    background: #fff;
}

.box4 .cardImg {
    width: 15px;
    height: 40px;
}

.box4 .top {
    position: relative;
}

.box4 .recent {
    position: absolute;
    top: 4px;
    left: 46px;
    color: #fff;
    font-size: 13px;
}

.box4 .more {
    position: absolute;
    top: 12px;
    right: 18px;
    color: #ee6b00;
    z-index: 100;
    cursor: pointer;
}

.box4 .deal_record {
    position: absolute;
    top: 7px;
    left: 22px;
}
.box4 .hide{
    white-space:nowrap;
    overflow:hidden;
   text-overflow: ellipsis;
    
}

.mlr20 {
margin-right: 25px;
margin-left: 5px;
}
</style>