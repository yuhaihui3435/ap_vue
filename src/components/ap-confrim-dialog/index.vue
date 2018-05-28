<template>
    <v-dialog v-model="dialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">{{title}}</v-card-title>
        <v-card-text>{{msg}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" flat="flat" @click.native="actions[0]">取消</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="actions[1]">确认</v-btn>
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
            msg:'确认要执行这个操作吗？',
            actions:[],
        }
    },
    methods:{
        
    },
    mounted(){
        
    }

}
</script>

