<template>
  <div>
    <exportCollectionPrint :formData="detailMsg.exportCollectionList[0]" :isPrint="isPrint"></exportCollectionPrint>
    <el-form class="formEmbedTable">
      <div class="tableData p20">
        <table >
          <tr v-if="detailMsg.exportCollectionList[0].status=='90'">
            <td>业务编号：</td>
            <td>{{detailMsg.exportCollectionList[0].busCode}}</td>
            <td>托收日期：</td>
            <td>{{$tools.utils.formatDate(detailMsg.exportCollectionList[0].openDate,{"symbol":"YYYY-MM-DD"})}}</td>
          </tr>
          <tr>
            <td>操作员姓名：</td>
            <td>{{detailMsg.exportCollectionList[0].oprName}}</td>
            <td>状态：</td>
            <td colspan="3">{{$tools.dict.statusTrans(detailMsg.exportCollectionList[0].status)}}</td>
          </tr>
        </table>
      </div>
    </el-form>
  </div>
</template>

<script>
import exportCollectionPrint from '../../../internationalBusiness/components/exportCollectionPrint'
export default {
  name:'exportCollectionPrint1',
  components: {
    exportCollectionPrint
  },
  data() {
    return {
    }
  },
  props:{
    formData:{type:Object},
    isPrint:{type:Boolean,default:false},
    detailMsg:{type:Object}
  },
  methods: {

  },
  mounted(){
  }
}
</script>
