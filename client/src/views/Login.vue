<template>
  <div>
    <div class="registration">
      <form>
        <span v-if="loggedIn">Successfully logged in</span><br />
        <div class="form-group">
          <label for="exampleInputEmail1">Email адрес</label>
          <input
            type="email"
            v-model="form.email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Введите email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Пароль</label>
          <input
            type="password"
            v-model="form.password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Пароль"
          />
        </div>
        <button
          @click.prevent="sendForm"
          :disabled="pending"
          class="btn btn-primary"
        >
          Войти
        </button>
        <router-link class="no__acc" to="/register"
          >Нет аккаунта? Зарегистрироваться!</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loggedIn: false,
      pending: false,
      markers: [],
      form: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    userId() {
      return this.$store.getters["getUserId"];
    },
  },
  mounted() {
    this.$store.dispatch("getAllMarkers");
  },
  methods: {
    sendForm() {
      if (this.pending === false) {
        this.pending = true;
        this.$store
          .dispatch("retrieveToken", this.form)
          .then((res) => {
            this.$router.push("/home");
            this.loggedIn = true;

            this.markers = this.$store.getters["getAllMarkers"];
          })
          .catch((errors) => {
            alert("Данные введены некорректно");
          })
          .then(() => {
            this.pending = false;
          });
      }
    },
  },
};
</script>
