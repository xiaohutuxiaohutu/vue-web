<template>
  <ynet-content :headerInformation="true" :headerMenu="true">
    <div class="mt20">
      <Search></Search>
      <AccTable @next="accept"></AccTable>
    </div>
    <div>
    <el-dialog
        title="保证金账户开立申请"
        :visible.sync="dialogVisible"
        size="small"
        :before-close="handleClose">
            <AccOpenAppay></AccOpenAppay>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">下一步</el-button>
            <el-button type="primary" @click="dialogVisible = false">返 回</el-button>
            </span>
    </el-dialog>
    </div>
  </ynet-content>
  
</template>

<script>
import Search from './components/search';
import AccTable from './components/accTable';
import AccOpenAppay from './components/accOpenAppay';
export default {
  name:'AccountOpenMain',
  components: {
      Search,
      AccTable,
      AccOpenAppay,
  },
  data() {
    return{
        dialogVisible:false,
    }
  },
  methods: {
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      accept(data){
        this.dialogVisible = data;
      }
  },
  mounted(){ 
    
  }
}
</script>
<style>
  
</style>