const gen = {
  state: {
    tableMeta: {},
    tableMetasList: [],
    columnMetasList: [],
    genSource: {},
    genSourcePage: {}
  },
  mutations: {
    setTableMeta(state, obj) {
      state.tableMeta = Object.assign({}, obj)
    },
    setTableMetasList(state, list) {
      state.tableMetasList = list
    },
    setColumnMetasList(state, list) {
      state.columnMetas = list;
    },
    setGenSource(state, obj) {
      state.genSource = Object.assign({}, obj);
    },
    setGenSourcePage(state, page) {
      state.genSourcePage = page;
    }
  },
  actions: {
    query_tableMetas_json: function ({
      commit,
      state
    }, param) {
      this._vm.$http.post('/gen/list_table', param).then((res) => {
        commit('setTableMetasList', res)
      });
    },

    query_columnMetas_json: function ({
      commit,
      state
    }, param) {
      this._vm.$http.get('/gen/list_table_column', param).then((res) => {
        commit('setColumnMetasList', res)
      });
    },
    query_genSource_page: function ({
      commit,
      state
    }, param) {
      this._vm.$http.get('/genSource/page', param).then((res) => {
        commit('setGenSourcePage', res)
      });
    },
    save_genSource: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/genSource/save', param).then((res) => {
          resolve(res)
        }).catch((res)=>{
          reject(res)
        });
      })
    },
    update_genSource: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/genSource/update', param).then((res) => {
          resolve(res)
        }).catch((res)=>{
          reject(res)
        });
      })
    },
    del_genSource: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/genSource/del', param).then((res) => {
          resolve(res)
        }).catch((res)=>{
          reject(res)
        });
      })
    },
    get_genSource: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      vm.$http.post('/genSource/get', param).then((res) => {
        commit('setGenSource', res)
      });
    },
    sync_genSource: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/gen/syncLocal', param).then((res) => {
            resolve(res)
        }).catch((res)=>{
          reject(res)
        });
      })
    },
    save_colConfig: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/gen/saveColConfig', param).then((res) => {
          resolve(res)
        }).catch((res)=>{
          reject(res)
        });
      })
    },
    gen_code: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/gen/genCode', param).then((res) => {
          resolve(res)
        }).catch((res)=>{
          reject(res)
        });
      })
    }
  },

}

export default gen
