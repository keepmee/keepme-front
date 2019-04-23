<template>
  <div id="preload" class="position-fixed justify-content-center align-items-center" :class="className">
    <!--<img src="@/assets/logo.png" alt="preload" class="img-fluid animated rubberBand infinite">-->
    <!--<img src="@/assets/logo.png" alt="preload" class="img-fluid animated rubberBand infinite">-->
    <origami :size="'150px'"/>
  </div>
</template>

<script>

  let interval

  import { Origami } from 'vue-loading-spinner'

  export default {
    name: "Preload",

    components: {
      Origami
    },

    data() {
      return {
        className: "d-flex"
      }
    },

    created() {
      this.run()
    },

    methods: {

      close() {
        // this.className = "d-flex animated fadeOut"
        let self = this
        setTimeout(() => {
          self.className = "d-none"
        }, 2000)
      },

      run() {
        let self = this, i = 0
        interval = setInterval(() => {
          if ((document.readyState === "complete" || document.readyState === "ready") || i++ > 10) {
            interval = null
            self.close()
          }
        }, 1000)

      }
    }
  }
</script>

<style scoped>

  #preload {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 16777271;
    background-color: #fff;
  }

</style>
