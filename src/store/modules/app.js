import {otherRouter, appRouter} from '@/router/index';
import Vue from 'vue';
import Kit from '../../libs/kit'
import Cookies from 'js-cookie';

const app = {
  state: {
    cachePage: [],
    openedSubmenuArr: [],  // 要展开的菜单数组
    pageOpenedList: [{
      title: '首页',
      path: '',
      name: 'home_index'
    }],
    currentPageName: '',
    currentPath: [
      {
        title: '控制台',
        path: '',
        name: 'home_index'
      }
    ],  // 面包屑数组
    menuList: [],
    routers: [
      otherRouter,
      ...appRouter
    ],
  },
  mutations: {
    updateMenulist (state) {
      let ma = Cookies.get('menuArray');
      let menuList = [];
      if(ma!=undefined)ma= eval ("(" + ma+ ")")

      appRouter.forEach((item, index) => {
        // if(ma&&Kit.oneOf(item.path,ma)) {
          if (item.children.length === 1) {
            menuList.push(item);
          } else {
            let len = menuList.push(item);
            let childrenArr = [];
            childrenArr = item.children.filter(child => {
              if (child.path !== undefined) {
                // if (Kit.oneOf(item.path+'/'+child.path, ma)) {
                  return child;
                // }
              }
            });
            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
            handledItem.children = childrenArr;
            menuList.splice(len - 1, 1, handledItem);
          }
        // }
      });
      state.menuList = menuList;
    },
  },
  actions: {
    
  },
};

export default app;
