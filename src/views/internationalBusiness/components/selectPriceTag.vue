<template>
<div>
  <el-form>
    <el-table class="tableData" :data="tableData" border style="width:100%" highlight-current-row>
      <el-table-column prop="CRY_NM" label="货币名称">
        <template scope="scope">
          {{$tools.dict.currTypeDict(scope.row.CRY_NM)}}
        </template>
      </el-table-column>
      <el-table-column prop="CRY_NM" label="币种简称"></el-table-column>
      <el-table-column prop="MDL_PRC" label="中间价">
        <template scope="scope">
          <span v-if="scope.row.MDL_PRC!=''">{{$tools.utils.toDecimalString(scope.row.MDL_PRC,true,4)}}</span>
          <span v-else-if="scope.row.MDL_PRC==''">----</span>
        </template>
      </el-table-column>
      <el-table-column prop="BUY_RATE" label="现汇买入价">
        <template scope="scope">
          <span v-if="scope.row.BUY_RATE!=''">{{$tools.utils.toDecimalString(scope.row.BUY_RATE,true,4)}}</span>
          <span v-else-if="scope.row.BUY_RATE==''">----</span>
        </template>
      </el-table-column>
      <el-table-column prop="CASH_BUY_PRC" label="现钞买入价">
        <template scope="scope">
          <span v-if="scope.row.CASH_BUY_PRC!=''">{{$tools.utils.toDecimalString(scope.row.CASH_BUY_PRC,true,4)}}</span>
          <span v-else-if="scope.row.CASH_BUY_PRC==''">----</span>
        </template>
      </el-table-column>
      <el-table-column prop="SELL_RATE" label="现汇卖出价">
        <template scope="scope">
          <span v-if="scope.row.SELL_RATE!=''">{{$tools.utils.toDecimalString(scope.row.SELL_RATE,true,4)}}</span>
          <span v-else-if="scope.row.SELL_RATE==''">----</span>
        </template>
      </el-table-column>
      <el-table-column prop="CASH_SELL_PRC" label="现钞卖出价">
        <template scope="scope">
          <span v-if="scope.row.CASH_SELL_PRC!=''">{{$tools.utils.toDecimalString(scope.row.CASH_SELL_PRC,true,4)}}</span>
          <span v-else-if="scope.row.CASH_SELL_PRC==''">----</span>
        </template>
      </el-table-column>
      <el-table-column prop="VALID_DT" label="发布时间">
        <template scope="scope">
          <span v-if="scope.row.VALID_DT!=''">{{$tools.utils.formatDate(scope.row.VALID_DT,{"symbol":"YYYY-MM-DD"})}}</span>
          <span v-else-if="scope.row.VALID_DT==''">----</span>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</div>
</template>
<script>
export default {
  name: 'selectPriceTag',
  components: {
  },
  data(){
    return{
      tableData:[],
      CRYList:[
        {CRY:'USD'},
        {CRY:'EUR'},
        {CRY:'GBP'},
        {CRY:'HKD'},
        {CRY:'JPY'},
        {CRY:'SGD'},
      ]
    }
  },
  methods:{
    searchPrice(index) {
      let _this = this
        _this.$tools.request(_this, "CB050101.do", {'CRY':_this.CRYList[index].CRY}).then(data => {
          if(data.body.status=='00'){
            _this.tableData.push(data.body.XRTE_INFO_ARRAY[0])
          }else{
            _this.tableData.push({"CRY_NM":_this.CRYList[index].CRY,"MDL_PRC":"","BUY_RATE":"","CASH_BUY_PRC":"","SELL_RATE":"","CASH_SELL_PRC":"","VALID_DT":""})
          }
          if(++index > (_this.CRYList.length-1)) return
          else _this.searchPrice(index)
        })
    },
  },
  mounted(){
    let _this = this
    _this.searchPrice(0)  //不用循环，因为是异步，执行完成时间有差异
  }
}
</script>