<template>
  <div class="content__list">
    <Map-list-item
      v-for="marker in markers"
      :key="marker.id"
      v-bind:marker="marker"
    />
  </div>
</template>

<script>
import MapListItem from "./MapListItem";

export default {
  name: "MapList",
  components: {
    MapListItem,
  },
  computed: {
    userId() {
      return this.$store.getters["getUserId"];
    },
    markers() {
      return this.$store.getters["getAllMarkers"].filter(
        (marker) => parseInt(marker.userId) === this.userId
      );
    },
  },
};
</script>
