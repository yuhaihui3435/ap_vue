<template>

<v-container fluid grid-list-md >
  <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card >
        <v-card-title>
          <span class="headline">{{dialogTitle}}</span>
        </v-card-title>
        <v-card-text>
            <v-form v-model="fValid" ref="form" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="genSource.name"  label="数据源名"  :rules="[rules.required,(v) => !!v&&v.length <= 50 || '最多 50 字符']" :counter="50"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="genSource.remark"  label="数据源说明"  :rules="[rules.required,(v) => !!v&&v.length <= 50 || '最多 50 字符']" :counter="50"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="genSource.url"  label="数据源URL"   :rules="[rules.required,(v) => !!v&&v.length <= 200 || '最多 200 字符']" :counter="200"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="genSource.user"  label="数据源用户名"  :rules="[rules.required,(v) => !!v&&v.length <= 50 || '最多 50 字符']" :counter="50"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="genSource.pwd"  label="数据源密码"  :rules="[rules.required,(v) => !!v&&v.length <= 50 || '最多 50 字符']" :counter="50"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-select :items="dialectList" v-model="genSource.dialect" label="数据源方言" single-line></v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="genSource.baseModelPackageName"  label="数据模型基础包"  :rules="[rules.required,(v) => !!v&&v.length <= 100 || '最多 100 字符']" :counter="100"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="genSource.modelPackageName"  label="数据模型包"  :rules="[rules.required,(v) => !!v&&v.length <= 100 || '最多 100 字符']" :counter="100"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="genSource.removePrefix"  label="移除前缀（|分割）"  :rules="[rules.required,(v) => !!v&&v.length <= 100 || '最多 100 字符']" :counter="100"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="genSource.excludedTable"  label="排除表名(|分割)"  :rules="[(v) => !!!v||v.length <= 1000 || '最多 1000 字符']" :counter="1000"></v-text-field>
                      </v-flex>
                  </v-layout>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" flat @click.native="dialog = false">关闭</v-btn>
          <v-btn color="success darken-1" flat @click.native="save" :loading="loading" v-show="opt=='add'" :disabled="loading||!fValid">保存</v-btn>
          <v-btn color="success darken-1" flat @click.native="update" v-show="opt=='update'" :loading="loading" :disabled="loading||!fValid">保存</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    <v-layout row wrap>
    <v-flex xs12 sm12 md12 >
      <v-card >
        <v-toolbar color="blue" dark>
          <v-toolbar-title>{{genSourceListTitle}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="toAdd()">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn icon @click="refresh()">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-data-table :headers="headers" :items="genSourcePage.list" hide-actions class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
          <template slot="items" slot-scope="props">
            <td >{{ props.item.name }}</td>
            <td >{{ props.item.remark }}</td>
            <td >{{ props.item.url }}</td>
            <td >{{ props.item.user }}</td>
            <td >{{ props.item.pwd }}</td>
            <td >{{ props.item.dialect }}</td>
            <td >{{ props.item.baseModelPackageName }}</td>
            <td >{{ props.item.modelPackageName }}</td>
            <td >{{ props.item.removePrefix }}</td>
            <td >{{ props.item.excludedTable }}</td>
            <td class=" layout px-0">
              <v-btn icon class="mx-0" @click="toEdit(props.item)">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="sync(props.item)">
                <v-icon color="teal">sync</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="goSetting(props.item)">
                <v-icon color="teal">settings</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="del(props.item)">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
              
            </td>
          </template>
      </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>
import { mapState } from "vuex";
import Kit from "../../../libs/kit.js";

export default {
  data() {
    return {
      fValid: true,
      valid: true,
      loading: false,
      dialogTitle: "新增数据源",
      genSourceListTitle: "数据源列表",
      rules: Kit.inputRules,
      headers: [
        { text: "数据源名", align: "left", value: "name" },
        { text: "数据源说明", value: "remark" },
        { text: "数据源URL", value: "url" },
        { text: "数据源用户", value: "user" },
        { text: "数据源密码", value: "pwd" },
        { text: "数据源方言", value: "dialect" },
        { text: "数据模型基础包名", value: "baseModelPackageName" },
        { text: "数据模型包名", value: "modelPackageName" },
        { text: "移除前缀", value: "removePrefix" },
        { text: "排除表名", value: "excludedTable" },
        { text: "操作", value: "name", sortable: false }
      ],
      dialog: false,
      opt: "",
      dialectList: ["mysql", "oracle"]
    };
  },
  computed: {
    ...mapState({
      genSource: state => state.gen.genSource,
      genSourcePage: state => state.gen.genSourcePage
    })
  },
  mounted() {
    this.refresh();
  },

  methods: {
    refresh() {
      this.$store.dispatch("query_genSource_page");
    },
    save() {
      let vm = this;
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("save_genSource")
          .then(res => {
            this.loading = false;
            if (res.resCode == "success") {
              this.dialog = false;
              vm.$store.dispatch("query_genSource_page");
            }
          })
          .catch(() => {
            this.loading = false;
            this.dialog = false;
          });
      }
    },
    toAdd() {
      this.$store.commit('setGenSource',{});
      this.$refs.form.reset();
      this.opt = "add";
      this.dialogTitle = "新增数据源";
      this.dialog = true;
      this.loading = false;
    },
    toEdit(genSource) {
      this.$refs.form.reset();
      this.$store.commit('setGenSource',genSource);
      this.opt = "update";
      this.dialog = true;
      this.dialogTitle = "修改数据源";
      this.loading = false;
    },
    update() {
      let vm = this;
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("update_genSource")
          .then(res => {
            this.loading = false;
            if (res.resCode == "success") {
              this.dialog = false;
              vm.$store.dispatch("query_genSource_page");
            }
          })
          .catch(() => {
            this.loading = false;
            this.dialog = false;
          });
      }
    },
    del(genSource) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.$store
            .dispatch("del_genSource", { id: genSource.id })
            .then(res => {
              if (res.resCode == "success") {
                vm.$store.dispatch("query_genSource_page");
              }
            });
        } else {
        }
      });
    },
    goSetting(genSource){
        this.$router.push({path:'/genCfg',query:{gsId:genSource.id}})
    },
    sync(genSource){
      this.$store.dispatch('sync_genSource',{gsId:genSource.id})
    }
  }
};
</script>
<style>
</style>
