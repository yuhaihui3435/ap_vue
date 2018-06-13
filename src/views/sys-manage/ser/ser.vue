<template>
<div>
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
                              <v-text-field v-model="ser.code"  label="编号" required :disabled="opt=='edit'"
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="serSelectData" v-model="ser.type" :rules="[rules.required]" label="类型" required item-value="value" item-text="text"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="ser.name"  label="标题" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="ser.url"  label="URL" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
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
                                    <v-list-tile-content>编号:</v-list-tile-content><v-list-tile-content class="align-end">{{serView.code}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>类型:</v-list-tile-content><v-list-tile-content class="align-end">{{serView.typeStr}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>标题:</v-list-tile-content><v-list-tile-content class="align-end">{{serView.name}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>URL:</v-list-tile-content><v-list-tile-content class="align-end">{{serView.url}}</v-list-tile-content>
                             </v-list-tile>
                  </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click.native="viewDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
          <v-btn slot="activator" color="blue" dark class="mb-2" @click.native="add()">新增<v-icon>add</v-icon></v-btn>
          <v-card >
              <v-card-title>服务列表</v-card-title>
              <v-container grid-list-md>
                      <v-layout row wrap>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="serQuery.code"  label="编号" single-line hide-details ></v-text-field>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="serQuery.name"  label="标题" single-line hide-details ></v-text-field>
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
            <v-data-table :headers="serHeaders" :total-items="totalRow" :items="serList" :rows-per-page-items="rowsPerPageItems" :pagination.sync="serQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    <td>
                               {{props.item.code}}
                    </td>
                    <td>
                               {{props.item.typeStr}}
                    </td>
                    <td>
                               {{props.item.name}}
                    </td>
                    <td>
                               {{props.item.url}}
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
          </v-card>
</div>
</template>
<script>
import { mapState } from "vuex";
import Kit from "../../../libs/kit.js";
export default {
  data() {
    return {
      fValid: true,
      valid: true,
      rowsPerPageItems: [15],
      serQuery: { pn: 1, sortBy: "", descending: "" }, //列表查询参数数据对象
      serView: {}, //查询详细数据对象
      loading: false,
      title: "新增服务",
      rules: Kit.inputRules,
      serHeaders: [
        {
          text: "编号",
          sortable: false,
          value: "code"
        },
        {
          text: "类型",
          sortable: false,
          value: "type"
        },
        {
          text: "标题",
          sortable: false,
          value: "name"
        },
        {
          text: "URL",
          sortable: false,
          value: "url"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: "",
      serSelectData: [{ text: "服务", value: "0" }]
    };
  },
  computed: {
    ...mapState({
      ser: state => state.ser.ser,
      serList: state => state.ser.serList,
      totalRow: state => state.ser.totalRow,
      pageNumber: state => state.ser.pageNumber,
      pageSize: state => state.ser.pageSize,
      totalPage: state => state.ser.totalPage
    })
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      this.serQuery["pn"] = this.serQuery.page;
      this.$store.dispatch("page_ser", this.serQuery);
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.opt = "add";
      this.$store.commit("setSer", {});
      this.title = "新增服务";
      this.dialog = true;
    },
    edit(ser) {
      this.loading = false;
      this.$refs.form.reset();
      this.opt = "edit";
      this.$store.commit("setSer", ser);
      this.dialog = true;
      this.title = "修改服务";
    },
    save() {
      let vm = this;
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("save_ser")
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
    update(ser) {
      let vm = this;
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("update_ser")
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
    del(ser) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.$store.dispatch("del_ser", { ids: ser.id }).then(res => {
            if (res.resCode == "success") {
              vm.search();
            }
          });
        } else {
        }
      });
    },
    view(ser) {
      let vm = this;
      vm.viewDialog = true;
      vm.$store.dispatch("get_ser", { id: ser.id }).then(res => {
        vm.serView = res;
      });
    },
    clearQueryParam() {
      this.serQuery["code"] = "";
      this.serQuery["name"] = "";
    }
  },
  watch: {
    serQuery: {
      handler(val, oldVal) {
        if (this.serQuery.sortBy != "" || val.page != oldVal.page) {
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