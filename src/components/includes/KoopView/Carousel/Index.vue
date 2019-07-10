<template>
  <div class="carousel-container position-relative" id="carouselContainer">
    <div class="carousel-overlay"></div>
    <carousel-3d class="d-flex justify-content-center align-items-center mt-0 position-relative"
                 :dir="'ltr'"
                 :controls-visible="true" :controls-prev-html="`<i class='fal fa-angle-left'></i>`"
                 :controls-next-html="`<i class='fal fa-angle-right'></i>`">
      <slide class="border-0 rounded bg-white z-depth-1-half mx-auto" v-for="(post, i) in posts"
             :index="i" :key="i">
        <my-slide :post="post" :key="i"/>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>

  import MySlide from './Slide'

  export default {
    name: "CarouselIndex",

    props: ['posts'],

    components: {
      MySlide
    }
  }
</script>

<style scoped>


  .carousel-container {
    height: 600px !important;
    background: url("../../../../assets/img/auth.jpg") no-repeat fixed;
    background-size: 100% 100%;
  }

  .carousel-3d-container {
    height: 100% !important;
  }

  .carousel-3d-slide {
    width: 350px !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    margin: auto !important;
  }

  .carousel-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 21, 41, .3);
  }

</style>
