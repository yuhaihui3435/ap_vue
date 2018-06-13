const user = {
  state: {
    user: {
      id: '',
      loginname: '',
      password: '',
      nickname: '',
      phone: '',
      email: '',
      avatar: '',
      status: '',
      salt: '',
      lAt: '',
      opId: '',
      cAt: '',
      dAt: '',
    },
    userList: [],
    totalPage: 0,
    pageNumber: 1,
    pageSize: 15,
    totalRow: 0,
  },
  mutations: {
    setUser(state, obj) {
      state.user = Object.assign({}, obj)
    },
    setUserList(state, list) {
      state.userList = list
    },
    setUserPage(state, page) {
      state.userList = page.list
      state.totalPage = page.totalPage
      state.pageNumber = page.pageNumber
      state.pageSize = page.pageSize
      state.totalRow = page.totalRow
    },
  },
  actions: {
    list_user: function ({
      commit,
      state
    }, param) {
      this._vm.$http.post('/api/user/list', param).then((res) => {
        commit('setUserList', res)
      });
    },
    page_user: function ({
      commit,
      state
    }, param) {
      this._vm.$http.post('/api/user/page', param).then((res) => {
        commit('setUserPage', res)
      });
    },
    save_user: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/api/user/save', state.user).then((res) => {
          resolve(res)
        });
      })

    },
    update_user: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/api/user/update', state.user).then((res) => {
          resolve(res)
        });
      })
    },
    del_user: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/api/user/logicDel', param).then((res) => {
          resolve(res)
        });
      })
    },
    get_user: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/api/user/get', param).then((res) => {
          resolve( res)
        });
      })
    },
  },

}

export default user
