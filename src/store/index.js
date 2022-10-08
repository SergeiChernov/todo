import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    modifiedTask: {},

    showSnackbar: false,
    textSnackbar: ''
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter(t => t.id !== id)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    MODIFY_TASK(state, task) {
      const tasks = [...state.tasks]
      const idx = tasks.findIndex( u => u.id === task.id)
      tasks[idx] = task
      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    SNACKBAR_MESSAGE(state, message) {
      state.showSnackbar = true
      state.textSnackbar = message
      setTimeout(()=> {
        state.showSnackbar = false
      },1000)
    },
    CLEAR_LIST(state) {
      state.tasks = []
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    GET_MODIFIED_TASK(state, id) {
      const tasks = [...state.tasks]
      const task = tasks.find( u => u.id === id)
      state.modifiedTask = task
    },
    CHANGE_FILTER_STATE(state, value) {
      state.stateFilter = value
    }
  },
  actions: {
    addTask({commit}, task) {
      if (task) {
        commit('ADD_TASK', task)
        commit('SNACKBAR_MESSAGE', 'create')
      }
    },
    deleteTask({commit}, taskId) {
      if (taskId) {
        commit('DELETE_TASK', taskId)
        commit('SNACKBAR_MESSAGE', 'delete')
      }
    },
    modifyTask({commit}, task) {
      if (task) {
        commit('MODIFY_TASK', task)
        commit('SNACKBAR_MESSAGE', 'modify')
      }
    },
    clearList({commit}) {
      commit('CLEAR_LIST')
      commit('SNACKBAR_MESSAGE', 'clear')
    },
    getModifiedTask({commit}, taskId) {
      commit('GET_MODIFIED_TASK', taskId)
    }
  },
  getters: {
    tasks: i => i.tasks,
    taskById: u => id => u.tasks.find(e => e.id === id),
    modifiedTask: r=> r.modifiedTask,
    
    showSnackbar: o => o.showSnackbar,
    textSnackbar: o => o.textSnackbar
  }
})
