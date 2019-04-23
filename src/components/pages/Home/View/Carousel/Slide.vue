<template>

  <!-- Card -->
  <div class="card rounded z-depth-0 mx-auto h-100">


    <!-- Card header-->
    <div class="card-header rounded border-0 p-0 white">
      <!-- Title -->
      <h5 class="card-title text-center"><a>{{ post.title }}</a></h5>
    </div>

    <!-- Card content -->
    <div class="card-body">

      <div class="row">

        <div class="col-6 col-md-5 d-flex justify-content-center align-items-center">
          <!-- Card image -->
          <img class="rounded-circle mx-auto"
               :src="post.image"
               alt="Card image cap">
        </div>

        <div class="col-6 col-md-7">
          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <i class="far fa-map-marked-alt color-2 mr-1"></i>
              <span class="number">{{ post.distance }}</span><span class="font-italic small">km</span>
            </div>
          </div>

          <div class="border-special text-center w-100">
            <i class="fal fa-atom-alt color-1"></i>
          </div>

          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <i class="far fa-clock color-2 mr-1"></i>
              <span class="number">{{ post.duration }}</span>
            </div>
          </div>

          <div class="border-special text-center w-100">
            <i class="fal fa-atom-alt color-1"></i>
          </div>

          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <i class="far fa-money-bill-wave color-2 mr-1"></i>
              <span class="number">{{ post.rate }}</span><span class="font-italic small">€/h</span>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Card footer -->
    <div class="card-footer white border-0 rounded pt-0 px-2 w-100">

      <div class="row">
        <hr class="w-25 border-color-1">
      </div>

      <!-- Text -->
      <div class="row mt-2">
        <p class="mb-0 w-50">
          <i class="fal fa-child"></i>
          <span class="grey-text mx-2">|</span>
          <span class="number">{{ post.children.length }}</span>
          <span class="font-italic small">enfant(s)</span>
        </p>
        <p class="mb-0 w-50 text-right">
          <i class="fal fa-user"></i>
          <span class="grey-text mx-2">|</span>
          <span class="small">{{ post.author.firstname | lowercase | capitalize }} {{ post.author.lastname | lowercase | capitalize }}</span>
        </p>
      </div>


    </div>

  </div>

</template>

<script>
  export default {
    name: "MySlide",

    props: ['post'],

    data() {
      return {
        gClass: null
      }
    },

  }
</script>

<style scoped>

  .card {
    max-width: 350px;
  }

  .card-body img {
    height: 100px;
    width: 100px;
  }

  .card-footer {
    position: absolute;
    bottom: 0;
  }

  .border-special {
    padding-top: 5px;
    padding-bottom: 5px;
  }

</style>
