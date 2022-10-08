
<template>
  <div style="min-width: 500px" class="ma-4">
    <h2 class="pl-4 ">Создание задачи</h2 >
    <v-divider></v-divider>
    <v-form
      ref="form"
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
            :disabled="!title.length"
        >
        Добавить задачу
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
import ThisFormBody from '../components/ThisFormBody.vue'
export default {
  name: 'ThisFormCreate',
  components: {
    ThisFormBody
  },
  data: () => ({
    title: '',
    deadline: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    remark: ''
  }),
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        remark: this.remark,
        id: Date.now(),
        deadline: this.deadline,
        status: 'Активный'
      }

      this.$store.dispatch('addTask', task)
      this.annulFields()
    },

    annulFields() {
      this.title = ''
      this.deadline = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      this.remark = ''
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
  }
}
</script>
