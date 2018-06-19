<template>
    <div>
          <v-container fluid>
            <router-view ></router-view>
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
      loadingStatus:state=>state.loadingStatus,
      
    }),
  },
  methods: {
    
  },
  mounted(){
  },
  name: "Main"
}
</script>
<style>
</style>
