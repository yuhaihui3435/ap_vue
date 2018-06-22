<template>
  <v-app>
    <router-view/>
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

export default {
  data() {
    return {
    };
  },

  computed: {
    ...mapState({
      snackbar:state=>state.snackbar,
    }),
  },
  methods: {
  },
  mounted(){
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist');
    this.$store.commit('setNickname',localStorage.getItem('nickname'))
    let avatar=localStorage.getItem('avatar');
    if(!avatar)
      avatar="../../static/none.png";
    this.$store.commit('setAvatar',avatar)
    //恢复菜单前一次的展开状态
    let currMenuState = localStorage.getItem("currMenuState");
    if (currMenuState != null) {
      this.$store.commit("setCurrMenuState", JSON.parse(currMenuState));
    }
    let lastLogin=localStorage.getItem("lastLogin");
    if(lastLogin!=null){
      this.$store.commit('setLastLogin',JSON.parse(lastLogin));
    }
  },
  name: "App"
};
</script>
