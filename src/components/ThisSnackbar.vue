<template>
  <v-snackbar
    right
    v-model="snackbar"
    :color="statusColor"
    timeout="1000"
  >
    {{ textSnackbar}}
  </v-snackbar>
</template>

<script>
import messages from '../plugins/messages'
  export default {
    data: () => ({
      statusColor: ''
    }),
    computed: {
      snackbar(){
        return this.$store.getters.showSnackbar 
      },
      textSnackbar() {
          return messages[this.$store.getters.textSnackbar]
      },
      text() {
        return this.$store.getters.textSnackbar
      },
    },
    watch: {
      text(val) {
        if (val === 'create') {
          this.statusColor = 'green'
        } else if (val === 'delete') {
            this.statusColor =  'red'
        } else if (val === 'modify') {
          this.statusColor =  'blue'
        } else {
          this.statusColor =  'orange'
        }
      }
    }
  }
</script>