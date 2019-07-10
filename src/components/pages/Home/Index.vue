<template>

  <div class="landing-page">

    <div class="row w-100"></div>

    <div class="row w-100"></div>

    <div class="row w-100"></div>

  </div>

</template>

<script>

  export default {

    name: 'LandingPage',

    components: {},

    data() {
      return {
        actions: {
          parent: [
            { "label": "Publier une annonce" }, { "label": "Consulter vos annonces" }, { "label": "Sélectionner une nounou" },
            { "label": "Publier une annonce" }
          ],
          nanny : []
        }
      }
    },

    created() {
    },

    methods: {}

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
