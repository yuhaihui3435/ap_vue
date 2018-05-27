<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
      <v-list>
        <v-list-group v-model="item.path == currOpenedMenu" v-for="(item, i) in menuList" :key="i" :prepend-icon="item.icon" no-action>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.meta.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.children" :key="subItem.title" @click="menuClick(item.path,subItem.path)" v-model="subItem.path==currMenuItem">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.meta.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <strong>ADMIN</strong>
      <v-menu offset-y>
        <v-btn slot="activator" large icon dark color="indigo">
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in mList" :key="index" @click="mListClick(index)">
            <v-list-tile-avatar>
              <v-icon :color="item.color">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
				<router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
    <v-snackbar
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :bottom="snackbar.y === 'bottom'"
      :right="snackbar.x === 'right'"
      :left="snackbar.x === 'left'"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
      v-model="snackbar.show"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
      <v-btn flat  @click.native="snackbar.show = false">关闭</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
const packageConfig = require('../package.json')

export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      mList: [
        {
          title: "个人资料",
          icon: "person",
          color: "blue white--text"
        },
        {
          title: "退出系统",
          icon: "power_settings_new",
          color: "blue white--text"
        }
      ],
      miniVariant: false,
      title:packageConfig.description,
    };
  },

  computed: {
    ...mapState({
      menuList: state => state.app.menuList,
      breadcrumbsList:state=>state.breadcrumbsList,
      currOpenedMenu:state=>state.currOpenedMenu,
      currMenuItem:state=>state.currMenuItem,
      snackbar:state=>state.snackbar,
    }),
    // breadcrumbsList:function(){
    //   return JSON.parse(sessionStorage.getItem('breadcrumbsList'));
    // }
  },
  methods: {
    //右侧toolbar上的下来菜单的处理，
    mListClick(i) {
      if (i == 0) {
        this.$router.push("/pc");
      } else if (i == 1) {

      }
      sessionStorage.removeItem('setCurrMenuState')
      this.$store.commit('setCurrMenuState',{});
    },
    //面包屑点击处理
    breadcrumbsClick(i){
      if(i==0){
        this.$router.push("/")
      }
    },
    //左侧菜单点击处理，
    menuClick(pPath,path){
      let data={currOpenedMenu:pPath,currMenuItem:path};
      this.$store.commit('setCurrMenuState',data);
      sessionStorage.setItem('currMenuState',JSON.stringify(data))
      this.$router.push(pPath+'/'+path);
    }
  },
  mounted(){
    //恢复菜单前一次的展开状态
    let currMenuState=sessionStorage.getItem('currMenuState');
    if(currMenuState!=null){
      this.$store.commit('setCurrMenuState',JSON.parse(currMenuState));
    }
  },
  name: "App"
};
</script>
