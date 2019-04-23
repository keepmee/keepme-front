<template>
  <div v-if="load" id="form-load" class="d-flex justify-content-center align-items-center bg-color-4">
    <img src="@/assets/logo.png" alt="preload" class="img-fluid animated rotateIn">
  </div>
</template>

<script>


  export default {
    name: "FormLoad",

    computed: {
      load() {
        return this.$store.getters.form_load
      }
    },

    data() {
      return {}
    },

    created() {
    },

    methods: {}
  }
</script>

<style scoped>

  #form-load {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 59, 63, .9);
    z-index: 2050;
  }

  #form-load img {
    -webkit-animation: rotate 2s ease-in-out infinite;
    -o-animation: rotate 2s ease-in-out infinite;
    animation: rotate 2s ease-in-out infinite;
    -webkit-filter: brightness(0) invert(1);
    filter: brightness(0) invert(1);
    z-index: 2051;
  }

  @keyframes rotate {
    from {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -o-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

</style>
