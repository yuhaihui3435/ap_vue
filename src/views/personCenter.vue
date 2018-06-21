<template>
    <v-container>
  <v-card>
    <v-form >
         <v-tabs color="blue"  icons-and-text dark >
             
             <v-tab   href="#tab-2">
                个人资料
                <v-icon>person</v-icon>
             </v-tab>
             <v-tab   href="#tab-4">
                密码修改
                <v-icon>lock</v-icon>
             </v-tab>
            
             <v-tab-item id="tab-2">
               <v-container fluid>
                  <v-flex md4 sm6 xs8 >
                    <v-text-field v-model="user.loginname"  label="登录用户名" disabled  ></v-text-field>
                    <v-text-field v-model="user.nickname"  label="昵称"  ></v-text-field>
                    <v-text-field v-model="user.phone" label="电话"  ></v-text-field>
                    <v-text-field v-model="user.email" label="EMAIL"  ></v-text-field>
                    
                    <!-- <v-flex md4 sm6 xs8 > -->
                      
                        <!-- <file-upload  v-if="env=='/api'"
                        extensions="gif,jpg,jpeg,png,"
                        accept="image/png,image/gif,image/jpeg"
                        name="file"
                        v-model="files"
                        post-action="/api/cmn/act01"
                        @input-filter="inputFilter"
                        @input-file="inputFile"
                        ref="upload">
                        上传头像
                        <v-avatar size="68px" color="grey lighten-4" >
                            <img :src="files.length ? files[0].url : '../../static/none.png'" >
                        </v-avatar>
                    </file-upload> -->
                    <!-- <file-upload  v-if="env==''"
                        extensions="gif,jpg,jpeg,png,"
                        accept="image/png,image/gif,image/jpeg"
                        name="file"
                        v-model="files"
                        post-action="/cmn/act01"
                        @input-filter="inputFilter"
                        @input-file="inputFile"
                        ref="upload">
                        上传头像1
                        <v-avatar size="68px" color="grey lighten-4" >
                            <img :src="files.length ? files[0].url : '../../static/none.png'" >
                        </v-avatar>
                    </file-upload> -->
                    <v-text-field v-model="user.statusStr" label="状态"  disabled></v-text-field>
                    
                  <!-- </v-flex> -->
                    <v-btn color="primary"  @click="saveUserInfo" :loading="loading" :disabled="loading" >保存</v-btn>
                  </v-flex>
               </v-container>
             </v-tab-item>
             <v-tab-item id="tab-4">
              <v-container fluid>
                  <v-flex md4 sm6 xs8 >
                    <v-text-field v-model="pwd.oldPassword"  label="旧密码"  ></v-text-field>
                    <v-text-field v-model="pwd.newPassword" label="新密码"  ></v-text-field>
                    <v-text-field v-model="pwd.rePassword" label="新密码确认"  ></v-text-field>
                    <v-btn color="primary"  @click="savePwd" :loading="loading" :disabled="loading" >保存</v-btn>
                  </v-flex>
               </v-container>
             </v-tab-item>
         </v-tabs>
    </v-form>
  </v-card>
</v-container> 
</template>
<script>
import FileUpload from "vue-upload-component";
import Kit from "../libs/kit.js";
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      user: {},
      pwd:{},
      loading: false,
      files: [],
      env:Kit.env,
    };
  },
  computed: {},
  mounted() {
    this.$store
      .dispatch("get_curr_user")
      .then(res => {
        this.user = res;
      })
      .catch(res => {
        this.loading = false;
      });
  },

  methods: {
    saveUserInfo() {
        
        
    },
    savePwd() {},
    inputFile: function (newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  Get the response status code
          console.log('status', newFile.xhr.status)
        }
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png)$/i.test(newFile.name)) {
          Kit.msg.err("请选择一张图片");
          return prevent();
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file);
        }
      }
      
    }
  }
};
</script>
<style>
</style>
