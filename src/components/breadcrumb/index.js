import breadcrumb from './src/breadcrumb';
/**
 * 面板容器
 */
breadcrumb.install = function(Vue) {
  Vue.component(breadcrumb.name, breadcrumb);
};

export default breadcrumb;
