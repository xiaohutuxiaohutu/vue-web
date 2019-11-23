<template>
  <ynet-content id="residualRequeryMain" class="main-content" :headerInformation="true" :headerMenu="true">
    <ynet-breadcrumb></ynet-breadcrumb>
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">剩余还款计划</h3>
      <div class="p20">
        <residualRequery></residualRequery>
      </div>
    </div>
  </ynet-content>
</template>

<script>
import residualRequery from './components/residualRequery';
export default {
  name: 'residualRequeryMain',
  components: {
    residualRequery
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>
