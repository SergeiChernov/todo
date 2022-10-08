<template>
  <v-container class="d-flex justify-space-between">
    <div>
      <this-form-create></this-form-create>
    </div>
    <div>
      <this-list></this-list>
      <div class="mt-4 d-flex justify-center" >
        <v-btn
          v-if="tasks.length"
          dark
          @click="showListToConsole"
        >
        Сохранить
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
  import ThisFormCreate from '../components/ThisFormCreate.vue'
  import ThisList from '../components/ThisList.vue'

  export default {
  name: 'ThisHome',
  components: {
    ThisFormCreate, ThisList
  },
  methods: {
    showListToConsole() {
      let resultArray = []
      let iter = 0
      resultArray = this.tasks.map((i)=> {
        return { field_num: iter += 1, field_value: i.title }
      })

      console.log('Текущий список todo-листа', resultArray)
    }
  },
  computed: {
      tasks() {
        return this.$store.getters.tasks
      }
    }
  }
</script>