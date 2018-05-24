<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-group v-model="item.active" v-for="(item, i) in menuList" :key="i" :prepend-icon="item.icon" no-action>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.children" :key="subItem.title" @click="">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <strong >ADMIN</strong>
      <v-menu offset-y >
        <v-btn slot="activator" large icon dark color="indigo" >
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in items1" :key="index" @click="">
            <v-list-tile-avatar>
              <v-icon  :color="item.color">{{ item.icon }}</v-icon>
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
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items1: [
        { title: "个人资料", icon: "person", color: "blue white--text" },
        {
          title: "退出系统",
          icon: "power_settings_new",
          color: "blue white--text"
        }
      ],
      miniVariant: false,
      title: "Vuetify.js"
    };
  },
  computed: {
    ...mapState({
      menuList: state => state.app.menuList
    })
  },
  name: "App"
};
</script>
