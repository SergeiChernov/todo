<template>
  <div 
    style="background-color: white" 
    class="pa-10"
  >
    <h2 class="pl-4 ">Изменение задачи</h2 >
    <v-divider></v-divider>
    <v-form
      ref="formMode"
      class="ma-1"
      @submit.prevent="submitHandler"
    >
      <div>
        <this-form-body 
          @changeTitle="changeTitle"
          @changeRemark="changeRemark"
          @changeDeadline="changeDeadline"
          :title="title"
          :remark="remark"
          :deadline="deadline"
        ></this-form-body>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-center">
          <v-btn
            color="primary"
            class="ma-4"
            type="submit"
          >
          Изменить задачу
          </v-btn>
          <v-btn
            color="error"
            class="ma-4"
            type="button"
            :disabled="status !== 'Активный'"
            @click="status='Завершен'"
          >
          Завершить задачу
          </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import ThisFormBody from '../components/ThisFormBody.vue'
export default {
  name: 'ThisFormModify',
  components: {
    ThisFormBody
  },
  data: () => ({
    title: '',
    remark: '',
    deadline: '',
    status: '',
    id: ''
  }),
  computed: {
    modifiedTask() {
      return this.$store.getters.modifiedTask
    }
  },
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        remark: this.remark,
        deadline: this.deadline,
        id: this.id,
        status: this.status
      }

      this.$store.dispatch('modifyTask', task)
      this.$emit('closeDialog')
    },
    changeTitle(title) {
      this.title = title
    },
    changeDeadline(deadline) {
      this.deadline = deadline
    },
    changeRemark(remark) {
      this.remark = remark
    }
  },
  watch: {
    'modifiedTask': {
      handler: function (after) {
        this.title = after.title,
        this.remark = after.remark,
        this.deadline = after.deadline,
        this.status = after.status,
        this.id = after.id
      },
      deep: true,
      immediate: true
    }
  },
  emits: ['closeDialog']
}
</script>