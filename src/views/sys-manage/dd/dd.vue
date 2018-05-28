<template>

<v-container fluid grid-list-md >
  <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card >
        <v-card-title>
          <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
            <v-form v-model="valid">
                <v-container grid-list-md>
                  <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="dd.dict"  label="字典名"  :disabled="pName!=''" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="pName"  label="上级名字"   disabled></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="dd.name"  label="名字"  required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="dd.val"  label="值"  required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="dd.idx"  label="序号"  ></v-text-field>
                      </v-flex>
                  </v-layout>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" flat @click.native="dialog = false">关闭</v-btn>
          <v-btn color="success darken-1" flat @click.native="save" :loading="loading" :disabled="loading">保存</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    <v-layout row wrap>
    <v-flex xs12 sm4 md4 >
      <v-card>
        <v-toolbar color="blue" dark>
          <v-toolbar-title>数据字典</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="toAdd()">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn icon @click="refresh()">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list >
            <v-list-tile v-for="item in ddList" :key="item.id" >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}({{item.dict}})</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                      <v-btn icon @click="getChildren(item)">
                        <v-icon>visibility</v-icon>
                      </v-btn>
              </v-list-tile-action>
               <v-list-tile-action @click="toAdd(item.name,item.id,item.dict)">
                      <v-btn icon >
                        <v-icon>add_circle_outline</v-icon>
                      </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                      <v-btn icon >
                        <v-icon>update</v-icon>
                      </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                      <v-btn icon >
                        <v-icon>delete</v-icon>
                      </v-btn>
              </v-list-tile-action>
            </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    
      
    <v-flex xs12 sm8 md8 >
      <v-card >
        <v-toolbar color="blue" dark>
          <v-toolbar-title>{{ddListTitle}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table :headers="headers" :items="ddChildren" hide-actions class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.dict }}</td>
            <!-- <td >{{ props.item.pName }}</td> -->
            <td >{{ props.item.name }}</td>
            <td >{{ props.item.val }}</td>
            <td >{{ props.item.idx }}</td>
            <td class=" layout px-0">
              <v-btn icon class="mx-0" @click="toEdit(props.item)">
                <v-icon color="teal">edit</v-icon>
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
      valid: true,
      loading: false,
      title: "新增数据字典",
      ddListTitle: "字典数据列表",
      pName: "",
      pId: "",
      icon: "menu",
      headers: [
        {
          text: "字典名",
          align: "left",
          sortable: false,
          value: "dict"
        },
        // { text: "上级名字", value: "pName" },
        { text: "名字", value: "name" },
        { text: "值", value: "val" },
        { text: "序号", value: "idx" },
        { text: '操作', value: 'name', sortable: false }
      ],
      dialog: false,
      opt:'',
      selectId:'',
    };
  },
  computed: {
    ...mapState({
      dd: state => state.dd.dd,
      ddList: state => state.dd.ddList,
      ddChildren: state => state.dd.ddChildren
    })
  },
  mounted() {
    this.refresh()
    this.$store.commit('setDdChildren',[])
  },

  methods: {
    refresh(){
      this.$store.dispatch("query_dd_json");
    },
    save() {
      let vm=this;
      this.loading = true;
      this.$store
        .dispatch("save_dd")
        .then((res) => {
          this.loading = false;
          
          if(res.resCode=='success'){
            this.dialog=false;
            if(vm.pName==''){
              vm.$store.dispatch('query_dd_json');
            }else{
              vm.$store.dispatch('get_dd_children',{id:vm.selectId})
            }
          }
          
          
        })
        .catch(() => {
          this.loading = false;
          this.dialog=false;
        });
    },
    toAdd(pName,pId,dict) {
      this.opt='add';
      this.selectId=pId!=undefined?pId:0;
      this.$store.commit('setDd',{pId:this.selectId,dict:dict});
      this.pName=pName!=undefined?pName:'';
      if(this.pName=='')
        this.title = "新增数据字典";
      else
        this.title="新增数据字典值";
      this.dialog=true;


    },
    getChildren(dd) {
      // this.ddChildren.splice(0, this.ddChildren.length); //清空数组
      // dd.children.forEach(function(item, index, array) {
      //   this.ddChildren.push(item);
      // });
      if(dd.name!=undefined)
      this.ddListTitle='字典【'+dd.name+'】数据列表'
      this.$store.dispatch('get_dd_children',{id:dd.id})
      this.selectId=dd.id;
    },
    toEdit(dd){

    },
    del(dd){
      let vm=this;
      this.$APDialog.confirm(function(ret){
            if(ret){
              vm.$store.dispatch('del_dd',{id:dd.id}).then(res=>{
                if(res.resCode=='success'){
                   vm.getChildren({id:vm.selectId}) 
                }
              })
            }else{
              
            }
      })
    }
  }
};
</script>
<style>


</style>
