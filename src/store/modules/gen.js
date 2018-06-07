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
      this._vm.$http.post('/api/gen/list_table',param).then((res) => {
        commit('setTableMetasList', res)
      });
    },

    query_columnMetas_json: function ({
      commit,
      state
    }, param) {
      this._vm.$http.get('/api/gen/list_table_column', param).then((res) => {
        commit('setColumnMetasList', res)
      });
    },
    query_genSource_page: function ({
      commit,
      state
    }, param) {
      this._vm.$http.get('/api/genSource/page', param).then((res) => {
        commit('setGenSourcePage', res)
      });
    },
    save_genSource: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/api/genSource/save', state.genSource).then((res) => {
          resolve(res)
        });
      })
    },
    update_genSource: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/api/genSource/update', state.genSource).then((res) => {
          resolve(res)
        });
      })
    },
    del_genSource: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/api/genSource/del', param).then((res) => {
          resolve(res)
        });
      })
    },
    get_genSource: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      vm.$http.post('/api/genSource/get', param).then((res) => {
        commit('setGenSource',res)
      });
    },
    sync_genSource:function({
      commit,
      state
    }, param) {
      let vm = this._vm;
      vm.$http.post('/api/gen/syncLocal', param).then((res) => {
       
      });
    },
    save_colConfig:function({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/api/gen/saveColConfig', param).then((res) => {
          resolve(res)
        });
      })
    }
  },

}

export default gen
