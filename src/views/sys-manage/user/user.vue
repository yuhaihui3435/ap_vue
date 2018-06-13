<template>
<v-container fluid grid-list-md >
  <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card >
        <v-card-title>
          <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
            <v-form v-model="fValid" ref="form" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="user.loginname"  label="登录账号" box
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  (v) => !!v||(v!=undefined&&v.length >= 6)|| '最少 6 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="user.nickname"  label="昵称" box
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="user.phone"  label="电话号" box
                                  :rules="[
                                  rules.required,
                                  rules.phone,
                                  (v) => !!v||(v!=undefined&&v.length <= 20) || '最多 20 字符',
                                  ]"
                                  :counter="20">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="user.email"  label="邮件" box
                                  :rules="[
                                  rules.email,
                                  (v)=>!!!v||(v!=undefined&&v.length <= 100) || '最多 100 字符',
                                  (v)=>!!!v||(v!=undefined&&v.length >= 6)|| '最少 6 字符',
                                  ]"
                                  :counter="100">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='edit'">
                                <v-select :items="userSelectData" v-model="user.status" label="状态"  item-value="value" item-text="text"></v-select>
                           </v-flex>
                  </v-layout>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" flat @click.native="dialog = false">关闭</v-btn>
          <v-btn color="success darken-1" flat @click.native="save" :loading="loading" v-show="opt=='add'" :disabled="loading||!fValid">保存</v-btn>
          <v-btn color="success darken-1" flat @click.native="update" v-show="opt=='edit'" :loading="loading" :disabled="loading||!fValid">保存</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
  <v-dialog v-model="viewDialog" persistent max-width="300px">
        <v-card >
          <v-card-title>
            <span class="headline">查看详细</span>
          </v-card-title>
            <v-divider></v-divider>
                  <v-list dense>
                              <v-list-tile>
                                    <v-list-tile-content>登录账号:</v-list-tile-content><v-list-tile-content class="align-end">{{userView.loginname}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>昵称:</v-list-tile-content><v-list-tile-content class="align-end">{{userView.nickname}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>电话号:</v-list-tile-content><v-list-tile-content class="align-end">{{userView.phone}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>邮件:</v-list-tile-content><v-list-tile-content class="align-end">{{userView.email}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>头像:</v-list-tile-content><v-list-tile-content class="align-end">{{userView.avatar}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>状态:</v-list-tile-content><v-list-tile-content class="align-end">{{userView.statusStr}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>创建时间:</v-list-tile-content><v-list-tile-content class="align-end">{{userView.cAt | formatDate}}</v-list-tile-content>
                             </v-list-tile>
                  </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click.native="viewDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  <v-layout row wrap>
        <v-flex xs12 sm12 md12 >
          <v-btn slot="activator" color="blue" dark class="mb-2" @click.native="add()">新增<v-icon>add</v-icon></v-btn>
          <v-card >
              <v-card-title>用户信息表列表
              <v-spacer></v-spacer>
              <v-container grid-list-md>
                      <v-layout row wrap>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="userQuery.loginname"  label="登录账号" single-line hide-details ></v-text-field>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="userQuery.nickname"  label="昵称" single-line hide-details ></v-text-field>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="userQuery.phone"  label="电话号" single-line hide-details ></v-text-field>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="userQuery.email"  label="邮件" single-line hide-details ></v-text-field>
                         </v-flex>
                    <v-flex xs12 sm3 md3>
                        <v-select :items="userSelectData" v-model="userQuery.status" label="状态"  item-value="value" item-text="text"></v-select>
                    </v-flex>
                         <v-flex xs12 sm3 md3 >
                              <v-menu ref="cAtQueryBeginDateMenu" :close-on-content-click="false" v-model="cAtQueryBeginDateMenu" 
                                   :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px" >
                                   <v-text-field slot="activator" v-model="userQuery.beginCAt" label="创建时间查询开始日期" prepend-icon="event" readonly ></v-text-field>
                                   <v-date-picker v-model="userQuery.beginCAt" locale="zh-cn"  @input="$refs.cAtQueryBeginDateMenu.save(userQuery.beginCAt)"></v-date-picker>
                             </v-menu>
                         </v-flex>
                         <v-flex xs12 sm3 md3 >
                              <v-menu ref="cAtQueryEndDateMenu" :close-on-content-click="false" v-model="cAtQueryEndDateMenu" 
                                    :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px" >
                                    <v-text-field slot="activator" v-model="userQuery.endCAt" label="创建时间查询截至日期" prepend-icon="event" readonly ></v-text-field>
                                    <v-date-picker v-model="userQuery.endCAt" locale="zh-cn"  @input="$refs.cAtQueryEndDateMenu.save(userQuery.endCAt)"></v-date-picker>
                              </v-menu>
                         </v-flex>
                        <v-flex xs12 sm3 md3>
                             <v-btn color="info" class="white--text" @click="search()">
                                 搜索<v-icon>search</v-icon>
                             </v-btn>
                             <v-btn color="info" class="white--text" @click="clearQueryParam()">
                                 清空<v-icon>clear</v-icon>
                             </v-btn>
                        </v-flex>
                      </v-layout>
              </v-container>
              </v-card-title>
            <v-data-table :headers="userHeaders" :total-items="totalRow" :items="userList" hide-actions :pagination.sync="userQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    <td>
                               {{props.item.loginname}}
                    </td>
                    <td>
                               {{props.item.nickname}}
                    </td>
                    <td>
                               {{props.item.phone}}
                    </td>
                    <td>
                               {{props.item.email}}
                    </td>
                    <td>
                               {{props.item.statusStr}}
                    </td>
                    <td>
                               {{props.item.cAt | formatDate}}
                    </td>
                <td class=" layout px-0">
                  <v-btn icon class="mx-0" @click="edit(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="del(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="view(props.item)">
                      <v-icon color="teal">fas fa-eye</v-icon>
                  </v-btn>
                </td>
              </template>
          </v-data-table>
          <div class="text-xs-center pt-2" v-if="totalPage>0">
                <v-pagination v-model="userQuery.pn" :length="totalPage"></v-pagination>
          </div>
          </v-card>
        </v-flex>
  </v-layout>
</v-container>
</template>
<script>
import { mapState } from "vuex";
import Kit from "../../../libs/kit.js";
var moment = require("moment");
export default {
  data() {
    return {
      fValid: true,
      valid: true,
      userQuery: { pn: 1, rowsPerPage: 15, sortBy: "", descending: "" }, //列表查询参数数据对象
      userView: {}, //查询详细数据对象
      loading: false,
      title: "新增用户信息表",
      rules: Kit.inputRules,
      userHeaders: [
        {
          text: "登录账号",
          sortable: true,
          value: "loginname"
        },
        {
          text: "昵称",
          sortable: true,
          value: "nickname"
        },
        {
          text: "电话号",
          sortable: true,
          value: "phone"
        },
        {
          text: "邮件",
          sortable: false,
          value: "email"
        },
        {
          text: "状态",
          sortable: false,
          value: "status"
        },
        {
          text: "创建时间",
          sortable: true,
          value: "cAt"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: "",
      userSelectData: [
        { text: "默认", value: "0" },
        { text: "禁用", value: "1" }
      ],
      cAtQueryBeginDateMenu: false,
      cAtQueryEndDateMenu: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      userList: state => state.user.userList,
      totalRow: state => state.user.totalRow,
      pageNumber: state => state.user.pageNumber,
      pageSize: state => state.user.pageSize,
      totalPage: state => state.user.totalPage
    })
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      this.$store.dispatch("page_user", this.userQuery);
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.opt = "add";
      this.$store.commit("setUser", {});
      this.title = "新增用户信息表";
      this.dialog = true;
    },
    edit(user) {
      this.loading = false;
      this.$refs.form.reset();
      this.opt = "edit";
      this.$store.commit("setUser", user);
      this.dialog = true;
      this.title = "修改用户信息表";
    },
    save() {
      let vm = this;
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("save_user")
          .then(res => {
            vm.loading = false;
            if (res.resCode == "success") {
              vm.dialog = false;
              vm.search();
            }
          })
          .catch(() => {
            vm.loading = false;
            vm.dialog = false;
          });
      }
    },
    update(user) {
      let vm = this;
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("update_user")
          .then(res => {
            vm.loading = false;
            if (res.resCode == "success") {
              vm.dialog = false;
              vm.search();
            }
          })
          .catch(() => {
            vm.loading = false;
            vm.dialog = false;
          });
      }
    },
    del(user) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.$store.dispatch("del_user", { ids: user.id }).then(res => {
            if (res.resCode == "success") {
              vm.search();
            }
          });
        } else {
        }
      });
    },
    view(user) {
      let vm = this;
      vm.viewDialog = true;
      vm.$store.dispatch("get_user", { id: user.id }).then(res => {
        vm.userView = res;
      });
    },
    clearQueryParam() {
      this.userQuery["loginname"] = "";
      this.userQuery["nickname"] = "";
      this.userQuery["phone"] = "";
      this.userQuery["email"] = "";
      this.userQuery["status"] = "";
      this.userQuery["beginCAt"] = "";
      this.userQuery["endCAt"] = "";
    }
  },
  filters: {
    formatDate(time) {
      if (!!!time) return "";
      var date = new Date(time);
      return moment(date).format("YYYY-MM-DD hh:mm:ss");
    }
  },
  watch: {
    userQuery: {
      handler() {
        if (this.userQuery.sortBy != "") {
          this.search();
        }
      },
      deep: true
    }
  }
};
</script>
<style>
</style>