const param = {
  state: {
    param: {}
  },
  mutations: {
    setParam(state, obj) {
      state.param = Object.assign({}, obj)
    },
  },
  actions: {
    query_param_json: function ({
      commit,
      state
    }, param) {
      this._vm.$http.get('/api/param/json').then((res) => {
        commit('setParam', res)
      });
    },
    save_param: function ({
      commit,
      state
    }, param) {
        let vm=this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/api/param/save', state.param).then((res) => {
            resolve(res)
        });
      })

    }
  },
}

export default param
