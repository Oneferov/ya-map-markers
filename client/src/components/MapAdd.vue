<template>
  <div class="content__add">
    <form class="content__form">
      <div class="form-group">
        <label for="inputTitle">Название</label>
        <input
          v-model="title"
          type="text"
          class="form-control"
          id="inputTitle"
          placeholder="Введите название"
        />
      </div>
      <div class="form-group">
        <label for="inputDolgota">Долгота</label>
        <input
          v-model="coords[0]"
          type="text"
          class="form-control"
          id="inputDolgota"
          placeholder="Введите долготу"
        />
      </div>
      <div class="form-group">
        <label for="inputShirota">Широта</label>
        <input
          v-model="coords[1]"
          type="text"
          class="form-control"
          id="inputShirota"
          placeholder="Введите широту"
        />
      </div>
      <div v-if="isEdit">
        <button
          @click.prevent="editMarker"
          variant="primary"
          class="btn btn-primary"
        >
          Сохранить
        </button>
        <button
          @click.prevent="editCancel"
          variant="warning"
          class="btn btn-primary"
        >
          Отменить
        </button>
      </div>
      <div v-else>
        <button
          @click.prevent="addMarker"
          variant="primary"
          class="btn btn-primary"
        >
          Добавить
        </button>
        <button
          @click.prevent="clearFields"
          variant="warning"
          class="btn btn-primary"
        >
          Очистить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "MapAdd",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    addMarker() {
      this.$store
        .dispatch("addMarker", {
          title: this.title,
          dolgota: this.coords[0],
          shirota: this.coords[1],
          userId: this.userId,
        })
        .then((res) => {
          this.clearFields();
        })
        .catch((e) => console.log(e.message));
    },
    editMarker() {
      this.$store
        .dispatch("editMarker", {
          id: this.id,
          title: this.title,
          coords: this.coords,
        })
        .then((res) => {
          this.$store.commit("setEdit", false);
          this.clearFields();
        })
        .catch((e) => {
          return e;
        });
    },
    editCancel() {
      this.$store.commit("setEdit", false);
      this.clearFields();
    },
    clearFields() {
      this.title = "";
      this.$store.commit("resetForm");
    },
  },
  computed: {
    userId() {
      return this.$store.getters["getUserId"];
    },
    id() {
      return this.$store.getters["getId"];
    },
    coords() {
      return this.$store.getters["getCoords"].length
        ? this.$store.getters["getCoords"]
        : [];
    },
    isEdit() {
      return this.$store.getters["getEdit"];
    },
  },
  created() {
    this.$eventBus.$on("edit-marker", (value, title) => {
      this.title = title;
      this.$store.commit("setEdit", value);
    });
  },
  beforeDestroy() {
    this.$eventBus.$destroy();
  },
};
</script>
