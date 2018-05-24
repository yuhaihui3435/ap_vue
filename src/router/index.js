import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue';

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: resolve => { require(['@/views/login.vue'], resolve); }
};
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: App,
  children: [
    { path: 'home', title: '控制台',  name: 'home_index', component: resolve => { require(['@/views/home.vue'], resolve); } },
    { path: 'pc', title: '个人中心',  name: 'pc_index', component: resolve => { require(['@/views/personCenter.vue'], resolve); } },
  ]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/sm',
    icon: 'setting',
    name: 'admin',
    title: '系统管理',
    component: App,
    children: [
      { path: 'param', title: '参数管理',icon:"mouse",  name: 'sm_param', component: resolve => { require(['@/views/sys-manage/param.vue'], resolve); } },
      { path: 'user', title: '用户管理',icon:"person",  name: 'sm_user', component: resolve => { require(['@/views/sys-manage/user.vue'], resolve); } },
      { path: 'role', title: '角色管理', icon:"group", name: 'asm_role', component: resolve => { require(['@/views/sys-manage/role.vue'], resolve); } },
      { path: 'res', title: '资源管理',  icon:"poll", name: 'sm_role', component: resolve => { require(['@/views/sys-manage/role.vue'], resolve); } },
      { path: 'dd', title: '数据字典',icon:"local_library", name: 'sm_dd', component: resolve => { require(['@/views/sys-manage/dd.vue'], resolve); } },
    ]
  }
];

export const routers = [
  loginRouter,
  otherRouter,
  ...appRouter,
];


Vue.use(Router);

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};

export const router = new Router(RouterConfig);

router.beforeEach((to, from, next) => {

});

router.afterEach((to) => {

});




