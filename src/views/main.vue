<template>
    <div>
        <v-breadcrumbs>
            <v-icon slot="divider">chevron_right</v-icon>
							<v-breadcrumbs-item v-for="(item , i) in breadcrumbsList" :key="i" :disabled="item.disabled" @click="breadcrumbsClick(i)">
									{{ item.text }}
							</v-breadcrumbs-item>
        </v-breadcrumbs>
        <v-container>
            <router-view></router-view>
        </v-container>
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
