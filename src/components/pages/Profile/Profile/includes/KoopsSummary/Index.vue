<template>
  <div class="koops-summary bg-color-4">

    <div class="col-12 text-center py-2">
      <label class="h6 grey-text">Mes annonces...</label>
    </div>

    <div class="row w-100">
      <koops-summary-item :icon="'fa-mountains'" :number="total" :title="'Total'"/>
      <koops-summary-item :icon="'fa-check'" :number="past" :title="'Passés'"/>
      <koops-summary-item :icon="'fa-pause'" :number="waiting" :title="'En attente'"/>
      <koops-summary-item :icon="'fa-hourglass-end'" :number="future" :title="'À venir'" :border="false"/>
    </div>

  </div>
</template>

<script>

  import KoopsSummaryItem from './includes/Item'

  export default {
    name: "Index",

    props: ['koops'],

    components: {
      KoopsSummaryItem
    },

    data() {
      return {
        total  : 0,
        waiting: 0,
        past   : 0,
        future : 0
      }
    },

    watch: {
      koops() {
        this.run()
        console.log("Debug 4 ")
      }
    },

    created() {
      this.run()
    },

    methods: {


      setTotal(total = null) {
        this.total = total === null ? (this.koops === null ? 0 : this.koops.length)
          : total

      },

      setWaiting(waiting = null) {
        this.waiting = waiting === null ? (this.koops === null ? 0 : this.koops.filter(koop => koop.nanny_id === null && this.helpers.moment(koop.end) > this.helpers.moment()).length)
          : waiting

      },

      setPast(past = null) {
        this.past = past === null ? (this.koops === null ? 0 : this.koops.filter(koop => this.helpers.moment(koop.end) < this.helpers.moment()).length)
          : past

      },

      setFuture(future = null) {
        this.future = future === null ? (this.koops === null ? 0 : this.koops.filter(koop => koop.nanny_id !== null && this.helpers.moment(koop.end) > this.helpers.moment()).length)
          : future

      },

      setAll() {
        this.setTotal()
        this.setWaiting()
        this.setPast()
        this.setFuture()
      },

      run() {
        this.setAll()
      }

    }
  }
</script>

<style scoped>

</style>
