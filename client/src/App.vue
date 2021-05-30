<template>
  <div id="app">
    <div class="app__title">Добавление меток на карту</div>
    <router-link class="starting_button" v-if="!loggIn" to="/login"
      >Вход</router-link
    >
    <router-link class="starting_button" v-if="!loggIn" to="/register"
      >Регистрация</router-link
    >
    <button class="btn btn-primary" v-if="loggIn" @click.prevent="logout">
      {{ isToken ? " Сменить пользователя" : "Вход" }}
    </button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    loggIn() {
      return this.$store.getters.loggIn;
    },
    isToken() {
      return this.$store.getters.getToken;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("destroyToken");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
@import "assets/index.css";
</style>
