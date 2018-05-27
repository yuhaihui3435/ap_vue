import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import param from './modules/param';
import dd from './modules/dd';
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
  },
  mutations: {
    setBreadcrumbsList (state, obj) {
      if(state.breadcrumbsList.length==2){
        state.breadcrumbsList.pop();
        if(obj.path!='/'&&obj.path!='/home'){
          state.breadcrumbsList.push({
            text:obj.meta.title,
            disabled:true
          })
        }
      }else{
        if(obj.path!='/'&&obj.path!='/home'){
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
    }
  },
  actions: {

  },
  modules: {
    app,
    param,
    dd
  }
});

export default store;
