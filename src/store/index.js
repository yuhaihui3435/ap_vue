import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import param from './modules/param';
import dd from './modules/dd';
import gen from './modules/gen';
import user from './modules/user';
import role from './modules/role';
import res from './modules/res';
import ser from './modules/ser';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    breadcrumbsList:[
      {
        text: "控制中心",
        disabled: false,
      }
    ],
    currOpenedMenu:'',
    currMenuItem:'',
    snackbar:{show:false},
    loadingStatus:false,
    tabsData:[],
    nickname:'',
    avatar:'',
  },
  mutations: {
    setBreadcrumbsList (state, obj) {
      if(state.breadcrumbsList.length==3||state.breadcrumbsList.length==2){
        if(state.breadcrumbsList.length==3){
          state.breadcrumbsList.pop();
          state.breadcrumbsList.pop();
        }else if(state.breadcrumbsList.length==2){
          state.breadcrumbsList.pop();
        }
        
        if(obj.path!='/'&&obj.path!='/home'){
          if(obj.meta.pTitle!=undefined){
            state.breadcrumbsList.push({
              text:obj.meta.pTitle,
              disabled:true
            })
          }
          
          state.breadcrumbsList.push({
            text:obj.meta.title,
            disabled:true
          })
        }
      }else{
        if(obj.path!='/'&&obj.path!='/home'){
          if(obj.meta.pTitle!=undefined){
            state.breadcrumbsList.push({
              text:obj.meta.pTitle,
              disabled:true
            })
          }
          state.breadcrumbsList.push({
            text:obj.meta.title,
            disabled:true
          })
        }
      }
    },
    setCurrMenuState(state,obj){
      state.currMenuItem=obj.currMenuItem?obj.currMenuItem:'';
      state.currOpenedMenu=obj.currOpenedMenu?obj.currOpenedMenu:'';
    },
    setSnackbar(state,obj){
      state.snackbar=obj;
    }
    ,
    setLoadingStatus(state,bl){
      state.loadingStatus=bl
    },
    addTab(state,obj){
      let b=false;
      state.tabsData.forEach(element => {
          if(obj.path!=undefined&&obj.path!='/'){
              if(element.name==obj.name)
                b=true;
          }
      });
      if(!b){
        state.tabsData.push(obj);
      }
    },
    logout(state){
      localStorage.removeItem('currMenuState');
      localStorage.removeItem('nickname')
      localStorage.removeItem('resList')
      localStorage.removeItem('serList')
    },
    setNickname(state,nickname){
      state.nickname=nickname;
    },
    setAvatar(state,avatar){
      state.avatar=avatar;
    }
  },
  actions: {
    logout: function ({
      commit,
      state
    }, param) {

      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/login/logout', state.user).then((res) => {
          commit('logout');
          resolve(res);
        });
      })
    },
  },
  modules: {
    app,
    param,
    dd,
    gen,
    user,
    role,
    res,
    ser,
  }
});

export default store;
