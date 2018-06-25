<template>
<v-container>
  <v-card>
    <v-form v-model="fValid" ref="form" lazy-validation>
              <v-container fluid>
                <v-flex md4 sm6 xs8>
                  <v-select v-model="data.templateName" :rules="[ rules.required,]" :items="projectTemplates" label="项目模板" item-text="name" item-value="val"></v-select>
                  <v-text-field v-model="data.groupId" :rules="[ rules.required,]" label="groupId(com.公司名)"  ></v-text-field>
                  <v-text-field v-model="data.artifactId" :rules="[ rules.required,]"  label="artifactId"  ></v-text-field>
                  <v-text-field v-model="data.projectName" :rules="[ rules.required,]"  label="项目名"  ></v-text-field>
                </v-flex>
              </v-container>
         <v-btn color="primary"  @click="genProject" :loading="loading" :disabled="loading||!fValid" >生成</v-btn>
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
      data: {}
    };
  },
  computed: {
    ...mapState({
      projectTemplates: state => state.gen.projectTemplates
    })
  },
  mounted() {
    this.$store.dispatch("query_gen_project_templates");
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
  }
};
</script>
<style>
</style>
