<template>
    <div>
        11111111111111
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item
        v-for="item in items"
        :key="item.text"
        :disabled="item.disabled"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    </div>
</template>
<script>
 export default {
    data () {
      return {
        items: [
          {
            text: 'Dashboard',
            disabled: false
          },
          {
            text: 'Link 1',
            disabled: false
          },
          {
            text: 'Link 2',
            disabled: true
          }
        ]
      }
    },
    mounted(){
        console.info('进入了本页')
    },
    created(){
        console.info("进入 本业")
    }
  }
</script>
<style>

</style>
