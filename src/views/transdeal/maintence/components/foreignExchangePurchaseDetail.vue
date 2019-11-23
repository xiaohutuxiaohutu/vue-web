<template>
    <div class="foreignExchangePurchaseStep printArea">
        <!--table布局-->
        <el-form class="formEmbedTable" ref="form" :model="form" :rules="rules">
            <table>
                <tr>
                    <td>交易类型：</td>
                    <td>{{$tools.dict.transactionType(list.exchangeInfoList[0].type1)}}</td>
                </tr>
                <tr>
                    <td>{{exchangeType(list.exchangeInfoList[0].type1)}}币种：</td>
                    <td v-if="list.exchangeInfoList[0].type1!='1'">{{$tools.dict.CRYTrans(list.exchangeInfoList[0].currency)}}</td>
                    <td v-if="list.exchangeInfoList[0].type1=='1'">{{$tools.dict.CRYTrans(list.exchangeInfoList[0].orignalCurrency)}}</td>
                </tr>
                <tr>
                    <td>转出账号：</td>
                    <td>{{list.exchangeInfoList[0].payAccount}}</td>
                </tr>
                <tr>
                    <td>转入账号：</td>
                    <td>{{list.exchangeInfoList[0].recAccount}}</td>
                </tr>
                <tr>
                    <td>{{exchangeCRY(list.exchangeInfoList[0].type1)}}金额：</td>
                    <td>{{$tools.utils.toDecimalString(list.exchangeInfoList[0].transAmount,true,2)}}</td>
                </tr>
                <tr>
                    <td>{{exchangeCRY1(list.exchangeInfoList[0].type1)}}金额：</td>
                    <td>{{$tools.utils.toDecimalString(list.exchangeInfoList[0].originalAmount,true,2)}}</td>
                </tr>
                <tr>
                    <td>备注：</td>
                    <td>{{list.exchangeInfoList[0].RMK}}</td>
                </tr>
            </table>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'foreignExchangePurchaseDetail',
  props: {
    list:{
      type: Object
    }
  },
  data(){
    return {
    }
  },
  mounted(){
  },
  methods:{
    exchangeType(type){
        switch(type){
        case '0':
            return '原币'
            break;
        case '1':
            return '购汇'
            break;
        case '2':
            return '原币'
            break;
        }
    },
    exchangeCRY(type){
      switch(type){
        case '0':
          return '原币'
          break;
        case '1':
          return '转出'
          break;
        case '2':
          return '原币'
          break;
      }
    },
    exchangeCRY1(type){
      switch(type){
        case '0':
          return '结汇'
          break;
        case '1':
          return '购汇'
          break;
        case '2':
          return '套汇'
          break;
      }
    },
  }
}
</script>