<template>
  <v-card
    class="mx-auto"
    width="500"
  >
    <v-toolbar dark>
      <v-toolbar-title>Задачи</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-text-field
          v-model="search"
          clearable
          class="pt-4 pr-2"
          v-if="showSearch && tasks.length"
        ></v-text-field>
        <v-btn 
          icon 
          @click="showSearch=!showSearch" 
          :disabled="!tasks.length">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn 
          icon 
          @click="clearList" 
          :disabled="!tasks.length">
          <v-icon>mdi-delete-outline </v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <div>
      <v-list 
        v-if="filteredTasks.length?filteredTasks.length:tasks.length"
        dense 
        tile 
        dark 
        max-height="600" 
        class="overflow-auto"
      >
        <template  v-for="(item, index) in filteredTasks ? filteredTasks : tasks" >
          <v-list-item :key="index" class="list-item" >
            <v-list-item-content>  
              <div class="d-flex justify-space-between">
                <v-list-item-title 
                  v-text="item.title"
                  style="color: orange"
                ></v-list-item-title>
                <v-list-item-subtitle 
                  v-text="item.deadline"
                  class="d-flex justify-end"
                  style="color: white"
                ></v-list-item-subtitle>
              </div>
              <v-list-item-subtitle
                :class="[item.status ==='Активный'? 'green--text': 'red--text']"
                v-text="item.status"
              ></v-list-item-subtitle>
              <v-list-item-subtitle v-text="item.remark"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-dialog
                v-model="dialog"
                width="500"
                :retain-focus="false"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="grey lighten-1"
                    v-bind="attrs"
                    v-on="on"
                    @click="modifyTask(item.id)"
                    :disabled="item.status === 'Завершен'"
                  >
                  mdi-pencil
                  </v-icon>
                </template>
                <div>
                  <this-form-modify 
                    @closeDialog="dialog=!dialog" 
                    :dialog="dialog" 
                  ></this-form-modify>
                </div>
              </v-dialog>
              <v-icon
                color="grey lighten-1"
                class="mt-2"
                @click.prevent="deleteTask(item.id)"
              >
              mdi-trash-can-outline
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
      <v-card-text 
        class="d-flex justify-center align-center" 
        v-else
      >
      Создай первую задачу
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import ThisFormModify from './ThisFormModify.vue'
  export default {
    name: 'ThisList',
    components: { ThisFormModify },
    data: () => ({
      dialog: false,
      idTask: '',
      search: '',
      showSearch: false
    }),
    methods: {
      deleteTask(id) {
        this.$store.dispatch('deleteTask', id)
      },
      modifyTask(id) {
        this.$store.dispatch('getModifiedTask', id)
      },
      clearList() {
        this.$store.dispatch('clearList')
      }
    },
    computed: {
      tasks() {
        return this.$store.getters.tasks
      },
      task() {
        return this.$store.getters.taskById(this.idTask)
      },
      filteredTasks() {
        return this.tasks.filter((i)=> {
          if (i.title.includes(this.search.toLowerCase()) ) {
            return i 
          }
        })
      }
    },
    watch: {
      search(newValue) {
        if(newValue === null) {
          this.search = ''
        }
      }
    }
  }
</script>

<style scoped>
  .list-item:hover {
    background-color: #272727;
  }
</style>


