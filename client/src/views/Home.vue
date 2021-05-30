<template>
  <div class="container">
    <div class="ymaps">
      <div class="ymaps__controls">
        <Map-add />
        <Map-list />
      </div>
      <Map-create />
    </div>
  </div>
</template>

<script>
import MapCreate from "../components/MapCreate";
import MapList from "../components/MapList";
import MapAdd from "../components/MapAdd";

export default {
  components: { MapCreate, MapList, MapAdd },
  name: "Home",
  mounted() {
    this.$store.dispatch("getAllMarkers");
  },
};
</script>
