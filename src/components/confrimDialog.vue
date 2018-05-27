<template>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{title}}</v-card-title>
        <v-card-text>{{msg}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">取消</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    data(){
        return{
            dialog:false,
            title:'提示',
            msg:'确认要执行这个操作吗？'
        }
    },
    props:{
        
    },
    methods:{
        show(msg){
            this.msg=msg!=undefined?msg:this.msg;
            this.dialog=true;
        },
        done(){
            this.dialog=false;
            
        }
    }

}
</script>

