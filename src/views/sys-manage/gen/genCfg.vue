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
                        <v-switch :label="`列表显示`" v-model="config.tableShow"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-switch :label="'排序'"  v-model="config.isSort"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4 v-show="!config.likeQuery&&!(config.inputType=='date'||config.inputType=='dateTime')">
                        <v-switch :label="` = 查询`"  v-model="config.equalQuery"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4 v-show="!config.equalQuery&&!(config.inputType=='date'||config.inputType=='dateTime')">
                        <v-switch :label="` LIKE 查询`"  v-model="config.likeQuery"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4 v-show="config.inputType=='date'||config.inputType=='dateTime'">
                        <v-switch :label="` 日期查询`"  v-model="config.dateQuery"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-switch :label="`新增显示`" v-model="config.addShow"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-switch :label="'修改显示'" v-model="config.editShow"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-switch :label="'详细显示'" v-model="config.viewShow"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select :items="inputTypeList" v-model="config.inputType" label="类型" single-line ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-switch :label="'必填'" v-model="config.isRequired"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4 v-show="config.inputType=='text'||config.inputType=='textArea'">
                        <v-switch :label="'唯一'" v-model="config.onlyOne" ></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4 v-show="config.inputType=='text'||config.inputType=='textArea'">
                        <v-text-field v-model="config.min"  label="最小长度"   ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4 v-show="config.inputType=='text'||config.inputType=='textArea'">
                        <v-text-field v-model="config.max"  label="最大长度"    ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4 v-show="config.inputType=='text'||config.inputType=='textArea'">
                        <v-select :items="regRlues" v-model="config.rule" label="验证规则"  item-value="value" item-text="text"></v-select>
                      </v-flex>
                      <!-- <v-flex xs12 sm6 md4 v-show="config.inputType=='text'||config.inputType=='textArea'">
                        <v-text-field :label="'正则表达式'"  v-model="config.reg"></v-text-field>
                      </v-flex> -->
                      
                  </v-layout>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" flat @click.native="dialog = false">关闭</v-btn>
          <v-btn color="success darken-1" flat @click.native="save" :loading="loading" :disabled="loading||!fValid">保存</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-btn  @click="returnPre()" class="primary">
            <v-icon>keyboard_return</v-icon>返回
        </v-btn>
      </v-flex>
        
        <v-flex xs12 sm4 md4 >
            <v-card >
                <v-toolbar color="blue" dark>
                <v-toolbar-title>{{tableMetasTitle}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="搜索"
                    single-line
                    hide-details
                ></v-text-field>
                <v-btn icon @click="refresh()">
                    <v-icon>refresh</v-icon>
                </v-btn>
                </v-toolbar>
                    <v-data-table :headers="headers" :items="tableMetasList" hide-actions class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据" :search="search">
                    <template slot="items" slot-scope="props">
                        <!-- <td >{{ props.item.pName }}</td> -->
                        <td >{{ props.item.tbl }}</td>
                        <!-- <td >{{ props.item.primaryKey }}</td> -->
                        <td >{{ props.item.note }}</td>
                        <td class=" layout px-0">
                        <v-btn icon class="mx-0" @click="getColumnMetas(props.item)">
                            <v-icon color="teal">fas fa-eye</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-0" @click="createJava(props.item)">
                            <v-icon color="teal">fab fa-java</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-0" @click="createJs(props.item)">
                            <v-icon color="teal">fab fa-js</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-0" @click="createAll(props.item)">
                            <v-icon color="teal">done_all</v-icon>
                        </v-btn>
                        
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
        <v-flex xs12 sm8 md8 >
            <v-card >
                <v-toolbar color="blue" dark>
                <v-toolbar-title>{{columnMetasTitle}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search_column"
                    append-icon="search"
                    label="搜索"
                    single-line
                    hide-details
                ></v-text-field>
                </v-toolbar>
                    <v-data-table :headers="headers_column" :items="columnMetasList" hide-actions class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据" :search="search_column">
                    <template slot="items" slot-scope="props">
                        <td >{{ props.item.orgCol }}</td>
                        <td >{{ props.item.col }}</td>
                        <!-- <td >{{ props.item.type }}</td> -->
                        <!-- <td >{{ props.item.attrName }}</td> -->
                        <td >{{ props.item.tpe }}</td>
                        <!-- <td >{{ props.item.txt }}</td> -->
                        <td >{{ props.item.note }}</td>
                        <!-- <td >{{ props.item.defaultValue }}</td> -->
                        <!-- <td >{{ props.item.remarks }}</td> -->
                        <td class=" layout px-0">
                        <v-btn icon class="mx-0" @click="toEdit(props.item)">
                            <v-icon :color="(props.item.txt&&props.item.txt!='')?'purple':'teal'">edit</v-icon>
                        </v-btn>
                        <!-- <v-tooltip left>
                        <v-btn slot="activator" icon class="mx-0" >
                            <v-icon color="teal">fas fa-eye</v-icon>
                        </v-btn>
                        <div>{{props.item.txt}}</div>
                        </v-tooltip> -->
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

const defaultConfig = {
  tableShow: false,
  addShow: false,
  editShow: false,
  addDisabled: false,
  addReadonly: false,
  editDisabled: false,
  editReadonly: false,
  onlyOne: false,
  isEmail: false,
  isPhone: false,
  min: "",
  max: "",
  isRequired: false,
  inputType: "text",
  reg: "",
  isNum: false,
  isChart: false,
  isChinese: false,
  equalQuery: false,
  likeQuery: false,
  dateQuery: false
};

export default {
  data() {
    return {
      tableMetasTitle: "数据表",
      columnMetasTitle: "列表",
      search: "",
      search_column: "",
      fValid: true,
      dialogTitle: "",
      dialog: false,
      config: defaultConfig,
      loading: false,
      tbl: {},
      col: {},
      headers: [
        {
          text: "表名称",
          align: "left",
          value: "tbl"
        },
        { text: "注释", value: "note" },
        { text: "操作", sortable: false }
      ],
      headers_column: [
        {
          text: "列名称",
          align: "left",
          value: "orgCol"
        },
        { text: "属性名", value: "col" },
        { text: "类型", value: "tpe" },
        { text: "注释", value: "note" },
        { text: "操作", sortable: false }
      ],
      columnMetasList: [],
      inputTypeList: [
        "text",
        "select",
        "radio",
        "checkbox",
        "switch",
        "textArea",
        "date",
        "time",
        "slider",
      ],
      regRlues:[
        {text:'邮箱',value:'email'},
        {text:'手机号',value:'phone'},
        {text:'身份证',value:'ID'},
        {text:'用户名',value:'userName'},
        {text:'密码',value:'pwd'},
        {text:'加强密码',value:'strongPwd'},
        {text:'数字',value:'digital'},
        {text:'字母',value:'chart'},
        {text:'中文',value:'chinese'},
        {text:'网址',value:'url'},
        {text:'IP',value:'ip'},
        {text:'邮编',value:'zipCode'},
        {text:'金额',value:'amount'},
      ],
    };
  },
  computed: {
    ...mapState({
      tableMeta: state => state.gen.tableMeta,
      tableMetasList: state => state.gen.tableMetasList
      // columnMetas:state=>state.gen.columnMetas,
    })
  },
  mounted() {
    this.refresh();
  },

  methods: {
    refresh() {
      let gsId = this.$route.query.gsId;
      this.$store.dispatch("query_tableMetas_json", { gsId: gsId });
    },
    getColumnMetas(tableMeta) {
      this.tbl = tableMeta;
      this.columnMetasTitle = "【" + tableMeta.tbl + "】表中的列数据";
      this.columnMetasList = tableMeta.genCfgColList;
    },
    createJava(item) {
      let param = { tblId: item.id, action: "java" };
      let vm = this;

      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.$store.dispatch("gen_code", param).then(res => {});
        } else {
        }
      });
    },
    createJs(item) {
      let param = { tblId: item.id, action: "js" };
      let vm = this;

      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.$store.dispatch("gen_code", param).then(res => {});
        } else {
        }
      });
    },
    createAll(item) {
      let param = { tblId: item.id, action: "all" };
      let vm = this;

      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.$store.dispatch("gen_code", param).then(res => {});
        } else {
        }
      });
    },
    toEdit(col) {
      this.dialogTitle = "设置【" + col.col + "】列的配置";
      this.dialog = true;
      this.loading = false;
      this.col = col;
      if (col.txt && col.txt != "") {
        this.config = JSON.parse(col.txt);
      } else {
        this.config = Object.assign({}, defaultConfig);
      }
    },
    save() {
      this.col.txt = JSON.stringify(this.config);
      this.$store.dispatch("save_colConfig", this.col).then(res => {
        this.dialog = false;
        this.col = Object.assign({}, {});
      });
    },
    returnPre() {
      this.$router.back(-1);
    }
  }
};
</script>
<style>
</style>