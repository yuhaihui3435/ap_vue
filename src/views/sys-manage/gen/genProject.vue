<template>
<v-container>
  <v-card>
    <v-form v-model="fValid" ref="form" lazy-validation>
              <v-container fluid>
                <v-flex md4 sm6 xs8>
                  <v-radio-group v-model="data.action" :mandatory="false">
                    <v-radio label="前端项目" value="frontendProject" ></v-radio>
                    <v-radio label="后端项目" value="backendProject"></v-radio>
                  </v-radio-group>
                  <v-select v-model="data.templateName" :rules="[ rules.required,]" :items="projectTemplates" label="项目模板" item-text="name" item-value="val"></v-select>
                  
                  <v-text-field v-model="data.groupId" :rules="[ rules.required,]" label="groupId(com.公司名)"  ></v-text-field>
                  <v-text-field v-model="data.artifactId" :rules="[ rules.required,]"  label="artifactId"  ></v-text-field>
                  <v-text-field v-model="data.projectName" :rules="[ rules.required,]"  label="项目名"  ></v-text-field>
                  <v-text-field v-model="data.projectDesc"   label="描述"  v-show="data.action=='frontendProject'"></v-text-field>
                  <v-text-field v-model="data.projectAuthor"   label="作者"  v-show="data.action=='frontendProject'"></v-text-field>
                </v-flex>
              </v-container>
         <v-btn color="primary"  @click="genProject" :loading="loading" :disabled="loading||!fValid" >生成项目</v-btn>
         
    </v-form>
  </v-card>
</v-container> 
</template>
<script>
import { mapState } from "vuex";
import Kit from "../../../libs/kit.js";
export default {
  data() {
    return {
      fValid: true,
      loading: false,
      rules: Kit.inputRules,
      data: {action:'frontendProject'}
    };
  },
  computed: {
    ...mapState({
      projectTemplates: state => state.gen.projectTemplates
    })
  },
  mounted() {
    this.$store.dispatch("query_gen_project_templates",this.data);
  },
  methods: {
    genProject() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("gen_project", this.data)
          .then((res) => {
            this.loading = false;
            if(res.resCode=='success'){
                let url=Kit.env+'/cmn/act05?codePath='+res.resData;
                window.open(url,'_blank')
            }
          })
          .catch(res => {
            this.loading = false;
          });
      }
    }
  },
  watch:{
    'data.action'(now,old){
      this.$store.dispatch("query_gen_project_templates",this.data);
    }
  }
};
</script>
<style>
</style>
