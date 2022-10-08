<template>
  <v-app>
    <v-app-bar app dark></v-app-bar>
    <v-main>
      <this-home></this-home>
      <this-snackbar></this-snackbar>
    </v-main>
    <v-footer dark height="70"></v-footer>
  </v-app>
</template>

<script>
import ThisHome from './components/ThisHome';
import ThisSnackbar from './components/ThisSnackbar.vue';

export default {
  name: 'App',
  components: {
    ThisHome,
    ThisSnackbar
  }
};
</script>
