const dd = {
    state: {
      dd: {},
      ddList:[],
      ddChildren:[]
    },
    mutations: {
      setDd(state, obj) {
        state.dd = Object.assign({}, obj)
      },
      setDdList(state, list) {
        state.ddList = list
      },
      setDdChildren(state,list){
        state.ddChildren=list
      }
    },
    actions: {
      query_dd_json: function ({
        commit,
        state
      }, param) {
        this._vm.$http.get('/api/dd/list').then((res) => {
          commit('setDdList', res)
        });
      },
      save_dd: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/api/dd/save', param).then((res) => {
              resolve(res)
          });
        })
  
      },
      update_dd: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/api/dd/update', param).then((res) => {
              resolve(res)
          });
        })
      },
      del_dd: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/api/dd/del', param).then((res) => {
              resolve(res)
          });
        })
      },
      get_dd: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/api/dd/get', param).then((res) => {
              commit('setDd',res)
          });
        })
      },
      get_dd_children: function ({
        commit,
        state
      }, param) {
        let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/api/dd/get', param).then((res) => {
              commit('setDdChildren',res.children)
          });
        })
      }
      
    },
    
  }
  
  export default dd
  