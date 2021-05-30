<template>
  <yandex-map v-if="coords" :coords="coords" :zoom="5" @click="onClick">
    <ymap-marker
      v-for="n in markers"
      :key="n.id"
      :marker-id="n.id"
      :coords="n.coords.split(',')"
      :balloon="{ body: n.title }"
    ></ymap-marker>
  </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker, loadYmap } from "vue-yandex-maps";

export default {
  components: {
    yandexMap,
    ymapMarker,
  },

  data() {
    return {
      coords: null,
      settings: {
        apiKey: "27eee2d0-1e45-4a9f-9ec5-d872564386d9",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      },
    };
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
  methods: {
    onClick(e) {
      this.coords = e.get("coords");
      this.$store.commit("setCoords", this.coords);
    },
    showMarker(coords) {
      this.coords = coords;
    },
  },
  async mounted() {
    await loadYmap({ ...this.settings, debug: true });
    ymaps.geolocation.get().then((res) => {
      this.coords = res.geoObjects.position;
    });
    this.$eventBus.$on("go-to-marker", this.showMarker);

    console.log(this.markers);
  },
};
</script>
