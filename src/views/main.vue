<template>
    <div>
        <v-breadcrumbs>
            <v-icon slot="divider">chevron_right</v-icon>
							<v-breadcrumbs-item v-for="(item , i) in breadcrumbsList" :key="i" :disabled="item.disabled" @click="breadcrumbsClick(i)">
									{{ item.text }}
							</v-breadcrumbs-item>
        </v-breadcrumbs>
        <v-tabs  color="grey lighten-3" fixed-tabs centered  show-arrows icons-and-text>
          <v-tabs-slider color="blue"></v-tabs-slider>
          <v-tab :exact="true" v-for="n in tabsData" :href="'#'+n.name" :key="n.name" :to="n.path"  ripple>{{ n.meta.title }}<v-icon>{{n.meta.icon}}</v-icon></v-tab>
          <v-tabs-items >
          <v-tab-item v-for="n in tabsData" :key="n.name" :id="n.name">
          <v-container fluid>
            <router-view ></router-view>
          </v-container>
          </v-tab-item>
          </v-tabs-items>
        </v-tabs>
    </div>
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
      breadcrumbsList:state=>state.breadcrumbsList,
      loadingStatus:state=>state.loadingStatus,
      tabsData:state=>state.tabsData,
    }),
  },
  methods: {
    //面包屑点击处理
    breadcrumbsClick:function(i){
      if(i==0){
        this.$router.push("/")
      }
    },
  },
  mounted(){
  },
  name: "Main"
}
</script>
<style>
</style>
