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
                        <v-switch :label="`新增显示`" v-model="config.addShow"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-switch :label="'修改显示'" v-model="config.editShow"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-switch :label="'必填'" v-model="config.isRequired"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-switch :label="'不可用'" v-model="config.disabled"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-switch :label="'只读'" v-model="config.readonly"></v-switch>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select :items="config.inputTypeList" v-model="config.inputType" label="类型" single-line ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="config.min"  label="最小长度"   ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="config.max"  label="最大长度"   ></v-text-field>
                      </v-flex>
                      
                      
                      
                      <!-- <v-flex xs12 sm6 md4>
                        <v-text-field v-model="pName"  label="上级名字"   disabled></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="dd.name"  label="名字"  :rules="[rules.required,(v) => !!v&&v.length <= 50 || '最多 50 字符']" :counter="50"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="dd.val"  label="值"  :rules="[rules.required,(v) => !!v&&v.length <= 50 || '最多 50 字符']" :counter="50"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="dd.idx"  label="序号"  :rules="[rules.digital]"></v-text-field>
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
                        <td >{{ props.item.name }}</td>
                        <td >{{ props.item.primaryKey }}</td>
                        <!-- <td >{{ props.item.remarks }}</td> -->
                        <td class=" layout px-0">
                        <v-btn icon class="mx-0" @click="getColumnMetas(props.item)">
                            <v-icon color="teal">visibility</v-icon>
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
                        <!-- <td >{{ props.item.pName }}</td> -->
                        <td >{{ props.item.name }}</td>
                        <!-- <td >{{ props.item.type }}</td> -->
                        <!-- <td >{{ props.item.attrName }}</td> -->
                        <td >{{ props.item.javaType }}</td>
                        <td >{{ props.item.config }}</td>
                        <!-- <td >{{ props.item.isNullable }}</td> -->
                        <!-- <td >{{ props.item.defaultValue }}</td> -->
                        <!-- <td >{{ props.item.remarks }}</td> -->
                        <td class=" layout px-0">
                        <v-btn icon class="mx-0" @click="toEdit(props.item.name)">
                            <v-icon color="teal">edit</v-icon>
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

const defaultConfig={
      tableShow: false,
      addShow:false,
      editShow:false,
      disabled:false,
      readonly:false,
      min:'',
      max:'',
      isRequired:false,
      inputType:'text',
      inputTypeList:[
          'text','select','radio','checkbox','textArea','date','dateTime','slider'
      ],
}

export default {
  data() {
    return {
      tableMetasTitle: "数据表",
      columnMetasTitle: "列表",
      search: "",
      search_column: "",
      fValid:true,
      dialogTitle: "",
      dialog: false,
      config:defaultConfig,
      loading:false,
      headers: [
        {
          text: "表名称",
          align: "left",
          value: "name"
        },
        { text: "主键", value: "primaryKey" },
        // { text: "备注", value: "remarks" },
        { text: "操作", value: "name", sortable: false }
      ],
      headers_column: [
        {
          text: "列名称",
          align: "left",
          value: "name"
        },
        { text: "类型", value: "javaType" },
        { text: "配置", value: "config" },
        { text: "操作", value: "name", sortable: false }
      ],
      columnMetasList: []
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
      let gsId=this.$route.query.gsId;
      this.$store.dispatch("query_tableMetas_json",{gsId:gsId});
    },
    getColumnMetas(tableMeta) {
      this.columnMetasTitle = "【" + tableMeta.name + "】表中的列数据";
      this.columnMetasList = tableMeta.columnMetas;
    },
    toEdit(columnName) {
      this.dialogTitle = "设置【" + columnName + "】列的配置";
      this.dialog = true;
    }
  }
};
</script>
<style>
</style>