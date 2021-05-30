<template>
  <div :data-coords="marker.coords.split(',')">
    <div class="content__item" @click="showMarker(marker)">
      <div class="list__name">{{ marker.title }}</div>
      <div class="list__content">
        <div class="list__koord">
          <div class="list__dolg">
            <span>Долгота: </span>{{ marker.coords.split(",")[0] }}
          </div>
          <div class="list__shir">
            <span>Широта: </span>{{ marker.coords.split(",")[1] }}
          </div>
        </div>
        <div class="list__btns">
          <button
            @click.prevent="editMarker(marker)"
            type="button"
            class="btn btn-success list__btn"
          >
            &#9998;
          </button>
          <button
            @click.prevent="deleteMarker(marker)"
            type="button"
            class="btn btn-danger list__btn"
          >
            &#10060;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    marker: {
      type: Object,
    },
  },
  methods: {
    deleteMarker() {
      this.$store
        .dispatch("deleteMarker", {
          id: this.marker.id,
        })
        .then((res) => console.log("delete", res));
    },
    showMarker(marker) {
      this.$eventBus.$emit("go-to-marker", marker.coords.split(","));
    },
    editMarker(marker) {
      this.$store.commit("setTitle", marker.title);
      this.$store.commit("setCoords", marker.coords.split(","));
      this.$store.commit("setId", marker.id);
      this.$eventBus.$emit("edit-marker", true, marker.title);
    },
  },
};
</script>
