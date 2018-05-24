<template>
    
         <v-tabs color="blue"  icons-and-text dark slider-color="white">
             <v-tab  ripple href="#tab-1">
                网站基础信息设置
                 <v-icon>language</v-icon>
             </v-tab>
             <v-tab  ripple href="#tab-2">
                图片储存服务设置
                <v-icon>image</v-icon>
             </v-tab>
             <v-tab  ripple href="#tab-3">
                短信服务设置
                <v-icon>sms</v-icon>
             </v-tab>
             <v-tab  ripple href="#tab-4">
                邮件服务设置
                <v-icon>email</v-icon>
             </v-tab>
             <v-tab  ripple href="#tab-5">
                上传服务设置
                <v-icon>cloud_upload</v-icon>
             </v-tab>
             <v-tab-item id="tab-1">
                
             </v-tab-item>
             <v-tab-item id="tab-2">

             </v-tab-item>
             <v-tab-item id="tab-3">

             </v-tab-item>
             <v-tab-item id="tab-4">

             </v-tab-item>
             <v-tab-item id="tab-5">

             </v-tab-item>
         </v-tabs>
    
</template>
<script>

export default {
  data() {
    return {};
  },
  mounted() {
    console.info("enter ....");
  }
};
</script>
<style>
</style>
