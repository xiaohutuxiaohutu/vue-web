<template>
	<div id="app"  class="page">
		<ynet-header :headerInformation="getHeaderInformation" :headerMenu="getHeaderMenu"></ynet-header>
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
    	<ynet-footer :hasMarginTop="getFooterHasMarginTop"></ynet-footer>
		<ynet-right-tools></ynet-right-tools>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'app',
	components: {

	},
	computed: {
		// 使用对象展开运算符将 getters 混入 computed 对象中
		...mapGetters([
			'getHeaderInformation',
			'getHeaderMenu',
			'getFooterHasMarginTop'
		])
	},
	mounted(){
		let _this = this
		document.onkeydown = function(e){
			_this.$tools.backSpace.backSpace(e);
		}
	}
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>