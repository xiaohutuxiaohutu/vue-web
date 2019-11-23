import Vue from 'vue'
import content from './content'                      //内容
import currencyInput from './currency-input'         //金额组件
import footer from './footer'                        //页脚
import header from './header'                        //页头
import icon from './icon'                            //icon
// import panel from './panel'                          //标题条
//import transformation from './transformation'        //数据转换
import progressBar from './progress-bar'             //进度条
import transactionBar from './transaction-bar'             //交易进度条
// import sectorProgress from './sector-progress'       //购买进度条
import rightTools from './right-tools'               //右边工具栏
import warmTips from './warm-tips'                   //温馨提示内容
import btnVerification from './btn-verification'     //验证码按钮
import refreshRoute from './refresh-route'     //刷新路由
import password from './password'              //密码控件
import breadcrumb from './breadcrumb'              //面包屑
import applicationGuide from './application-guide'     //申请须知
import upload from './upload'     //上传控件
import tree from './tree'         //内管权限设置树结构
import shortcutMenu from './shortcutMenu'         //快捷菜单设置
import menuSetting from './menuSetting'       //首页快捷菜单设置

const components=[
  content,
  currencyInput,
  footer,
  header,
  icon,
  // panel,
  //transformation,
  progressBar,
  transactionBar,
  // sectorProgress,
  rightTools,
  warmTips,
  btnVerification,
  refreshRoute,
  password,
  breadcrumb,
  applicationGuide,
  upload,
  tree,
  shortcutMenu,
  menuSetting
]

let install=(Vue)=>{
  components.map(component => {
    let componentName="ynet-"+component.name
    Vue.component(componentName, component);
  })
}
install(Vue)
