const gen = {
    state: {
      tableMeta: {},
      tableMetasList:[],
      columnMetasList:[],
    },
    mutations: {
      setTableMeta(state, obj) {
        state.tableMeta = Object.assign({}, obj)
      },
      setTableMetasList(state, list) {
        state.tableMetasList = list
      },
      setColumnMetasList(state,list){
          state.columnMetas=list;
      }
    },
    actions: {
      query_tableMetas_json: function ({
        commit,
        state
      }, param) {
        this._vm.$http.get('/api/gen/list_table').then((res) => {
          commit('setTableMetasList', res)
        });
      },

      query_columnMetas_json: function ({
        commit,
        state
      }, param) {
        this._vm.$http.get('/api/gen/list_table_column',param).then((res) => {
          commit('setColumnMetasList', res)
        });
      },
    },
    
  }
  
  export default gen
  