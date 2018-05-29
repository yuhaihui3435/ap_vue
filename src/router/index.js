import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue';
import Main from '@/views/main.vue';

Vue.use(Router);

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: resolve => {
    require(['@/views/login.vue'], resolve);
  }
};
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component:Main,
  children: [
    {
      path: 'home',
      title: '控制中心',
      meta:{title:'控制中心'},
      name: 'home',
      component: resolve => {
        require(['@/views/home.vue'], resolve);
      }
    },
    {
      path: 'pc',
      title: '个人中心',
      meta:{title:'个人中心'},
      name: 'pc_index',
      component: resolve => {
        require(['@/views/personCenter.vue'], resolve);
      }
    },
  ]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
  path: '/sm',
  icon: 'settings',
  name: 'admin',
  title: '系统管理',
  component:Main,
  meta:{title:'系统管理'},
  children: [{
      path: 'param',
      title: '参数管理',
      meta:{title:'参数管理'},
      icon: "mouse",
      name: 'sm_param',
      component: resolve => {
        require(['@/views/sys-manage/param/param.vue'], resolve);
      }
    },
    {
      path: 'user',
      title: '用户管理',
      meta:{title:'用户管理'},
      icon: "person",
      name: 'sm_user',
      component: resolve => {
        require(['@/views/sys-manage/user/user.vue'], resolve);
      }
    },
    {
      path: 'role',
      title: '角色管理',
      meta:{title:'角色管理'},
      icon: "group",
      name: 'sm_role',
      component: resolve => {
        require(['@/views/sys-manage/role/role.vue'], resolve);
      }
    },
    {
      path: 'res',
      title: '资源管理',
      meta:{title:'资源管理'},
      icon: "poll",
      name: 'sm_res',
      component: resolve => {
        require(['@/views/sys-manage/res/res.vue'], resolve);
      }
    },
    {
      path: 'dd',
      title: '数据字典',
      meta:{title:'数据字典'},
      icon: "local_library",
      name: 'sm_dd',
      component: resolve => {
        require(['@/views/sys-manage/dd/dd.vue'], resolve);
      }
    },
  ]
},
{path: '/genCode',
  icon: 'code',
  name: 'gen',
  title: '代码管理',
  component:Main,
  meta:{title:'代码管理'},
  children: [{
    path: 'gen',
    title: '代码生成',
    meta:{title:'代码生成'},
    icon: "build",
    name: 'gen_main',
    component: resolve => {
      require(['@/views/sys-manage/gen/gen.vue'], resolve);
    }
  }]
}
];

export const routers = [
  loginRouter,
  otherRouter,
  ...appRouter,
];

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};

export const router = new Router(RouterConfig);

