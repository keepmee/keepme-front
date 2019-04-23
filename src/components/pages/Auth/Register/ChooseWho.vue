<template>
  <div id="chooseWho">

    <div class="row">
      <div class="col-12 col-md-8 col-lg-6 mx-auto my-2 px-0">
        <label class="h3 text-center w-100">Vous êtes...</label>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-8 col-lg-6 mx-auto my-2 px-0">
        <button class="btn btn-block border border-color-1 color-1 bg-transparent z-depth-0"
                :class="{'text-white bg-color-1': isParentHover()}" @click="nextStep('parent')"
                @mouseenter="setHover('parent')"
                @mouseleave="setHover(null)">
          parent
        </button>
      </div>
    </div>

    <div class="row">
      <hr class="w-25">
    </div>

    <div class="row">
      <div class="col-12 col-md-8 col-lg-6 mx-auto my-2 px-0">
        <button class="btn btn-block border border-color-1 color-1 bg-transparent z-depth-0"
                :class="{'text-white bg-color-1': isNurseHover()}" @click="nextStep('nurse')"
                @mouseenter="setHover('nurse')"
                @mouseleave="setHover(null)">
          nounou
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ChooseWho",

    data() {
      return {
        hover: null
      }
    },

    methods: {

      isParentHover() {
        return this.hover === 'parent'
      },

      isNurseHover() {
        return this.hover === 'nurse'
      },

      setHover(hover) {
        this.hover = hover
      },

      nextStep(choice) {
        this.$emit('setRole', choice)
      }

    }
  }
</script>

<style scoped>

</style>
