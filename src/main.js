// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store';
import http from './libs/http';
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
    VMenu,
    VAvatar,VBreadcrumbs,VTabs,VForm,VTextField,VCard,VSnackbar,VProgressLinear,VDataTable,VAlert,VDialog
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
      VMenu,
      VAvatar,VBreadcrumbs,VTabs,VForm,VTextField,VCard,VSnackbar,VProgressLinear,VDataTable,VAlert,VDialog
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false
Vue.prototype.$http = http;

router.beforeEach((to, from, next) => {

  //处理每个页面上面的面包屑 的数据
  store.commit('setBreadcrumbsList',to)
  //面包屑数据处理结束

  next()
});

router.afterEach((to) => {

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  data: {
    currentPageName: ''
  },
  mounted () {
    this.currentPageName = this.$route.name;
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist');
  },
  created () {

  }
})


