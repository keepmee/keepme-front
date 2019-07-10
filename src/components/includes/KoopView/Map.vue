<template>

  <!-- MAP -->
  <gmap-map :center="center" :zoom="10" @dragstart="dragMapStart()" @dragend="dragMapEnd()"
            @click="setCenter($event, true)" v-if="center">

    <!-- MARKERS -->
    <gmap-marker :key="index" v-for="(post, index) in posts" :position="post.location" :clickable="true"
                 @click="setCenter(post.location)" v-if="isVisiblePost(post)"/>

    <!-- CIRCLE -->
    <gmap-circle ref="circle" :bounds="circleBounds" :center="center" :radius="radius"
                 :editable="true" :draggable="true" @dragend="updateCenter($event)"
                 @radius_changed="updateCircle('radius', $event)"
                 @bounds_changed="updateCircle('bounds', $event)" v-if="radius !== null"/>

  </gmap-map>

</template>

<script>
  export default {
    name: "Map",

    props: ['posts', 'mapCenter', 'circleRadius', 'isVisiblePost'],


    data() {
      return {
        center      : { lat: 48.856613, lng: 2.352222 },
        radius      : 10000,
        // radius      : null,
        filtered    : null,
        circleBounds: {},
        mapIsDragged: false
      }
    },


    created() {
      this.$getLocation({ enableHighAccuracy: true }).then(coordinates => {
        this.center = JSON.parse(JSON.stringify(coordinates))
      })
    },

    watch: {
      circleRadius(value) {
        this.radius = value
      },
      mapCenter(value) {
        console.log(value)
        this.center = value
      }
    },

    methods: {

      updateCircle(prop, value) {
        this.$emit('setRadius', value)
      },

      setCenter(location, mapZoom = false) {
        if (mapZoom === true)
          location = { lat: location.latLng.lat(), lng: location.latLng.lng() }
        if (!this.mapIsDragged)
          this.$emit('setCenter', location)
      },

      updateCenter() {
        this.setCenter({
          lat: this.$refs.circle.$circleObject.center.lat(),
          lng: this.$refs.circle.$circleObject.center.lng()
        })
      },

      dragMapStart() {
        this.mapIsDragged = true
      },

      dragMapEnd() {
        this.mapIsDragged = false
      },


    }
  }
</script>

<style scoped>

  .vue-map-container {
    height: 75vh !important;
    width: 100%;
    /*margin-bottom: 25vh;*/
  }

</style>
