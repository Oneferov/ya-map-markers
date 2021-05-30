<template>
  <div class="container">
    <form class="form-reg">
      <div class="form-group">
        <label for="exampleInputName">Имя</label>
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          id="exampleInputName"
          aria-describedby="nameHelp"
          placeholder="Введите имя"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Введите email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Пароль</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword2">Пароль</label>
        <input
          v-model="form.password_confirmation"
          type="password"
          class="form-control"
          id="exampleInputPassword2"
          placeholder="Password"
        />
      </div>
      <button
        @click.prevent="sendForm"
        :disabled="pending"
        type="submit"
        class="btn btn-primary"
      >
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pending: false,
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
    };
  },
  methods: {
    sendForm() {
      if (this.pending === false) {
        this.pending = true;
        this.$store
          .dispatch("register", this.form)
          .then((res) => {
            this.$router.push("/login");
          })
          .catch((e) => {
            alert("Данные введены некорректно");
            this.pending = false;
          });
      }
    },
  },
};
</script>
