<template>
  <div>
    <v-text-field
      v-model="etitle"
      label="Название задачи"
      requireds
      prepend-icon="mdi-format-size"
    ></v-text-field>
    <v-menu
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :v-model="edeadline"
          label="Дата окончания"
          prepend-icon="mdi-calendar"
          readonly
          :value="edeadline"
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="edeadline"
        :min="minDate"
      ></v-date-picker>
    </v-menu>
    <v-textarea
      v-model="eremark"
      color="teal"
      rows="2"
      prepend-icon="mdi-fountain-pen"
    >
      <template v-slot:label>
        <div>
          <small>Описание задачи</small>
        </div>
      </template>
    </v-textarea>
  </div>
</template>

<script>
export default {
  name: 'ThisFormBody',
    data: () => ({
    minDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
  }),
  props: {
    title: {
      type: String,
      default: '',
    },
    deadline: {
      type: String,
      default:''
    },
    remark: {
      type: String,
      default: '',
    }
  },
  emits: ['changeTitle', 'changeRemark', 'changeDeadline'],
  computed: {
    etitle: {
      get() {
        return this.title;
      },
      set(newValue){
        this.$emit('changeTitle', newValue)
      }   
    },
    edeadline: {
      get() {
        return this.deadline;
      },
      set(newValue){
        this.$emit('changeDeadline', newValue)
      }   
    },
    eremark: {
      get() {
        return this.remark;
      },
      set(newValue){
        this.$emit('changeRemark', newValue)
      }   
    }
  }
}
</script>