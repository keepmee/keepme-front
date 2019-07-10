<template>
  <div class="row w-100">

    <!-- Card -->
    <div class="card-list row w-100 border-bottom py-3">

      <div class="col-3 col-md-2 d-flex justify-content-center align-items-center">
        <!-- Card header-->
        <div class="card-list-header rounded z-depth-1">
          <!-- Card image -->
          <div class="view overlay rounded">
            <img class="rounded mx-auto"
                 :src="post.image"
                 alt="Card image cap">
            <!--<div class="mask waves-effect waves-light rgba-white-slight"></div>-->
          </div>
        </div>
      </div>

      <div class="col-7">
        <!-- Card content -->
        <div class="card-list-body">

          <!-- Title -->
          <h5 class="card-title text-center"><a>{{ post.title }}</a></h5>
          <!-- Text -->
          <p class="card-text mb-1 text-justify grey-text">
            <i class="fal fa-water mr-2 small"></i>{{ post.description }}
          </p>
          <p class="card-txt mb-0">
            <i class="fal fa-child"></i>
            <span class="grey-text mx-2">|</span>
            <span class="number">{{ post.children.length }}</span>
            <span class="font-italic small">enfant(s)</span>
          </p>
          <p class="card-ext mb-0">
            <i class="fal fa-user"></i>
            <span class="grey-text mx-2">|</span>
            <span class="small">{{ post.author.firstname | lowercase | capitalize }} {{ post.author.lastname | lowercase | capitalize }}</span>
          </p>

        </div>
      </div>

      <div class="col-3 d-flex justify-content-center align-items-center">
        <!-- Card footer -->
        <div class="card-list-footer">

          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <i class="far fa-map-marked-alt color-3 mr-1 fa-xs"></i>
              <span class="number">{{ post.distance }}</span><span class="font-italic small">km</span>
            </div>
          </div>

          <div class="border-special text-center w-100">
            <i class="fal fa-atom-alt color-1"></i>
          </div>

          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <i class="far fa-clock color-3 mr-1 fa-xs"></i>
              <span class="number">{{ post.duration }}</span>
            </div>
          </div>

          <div class="border-special text-center w-100">
            <i class="fal fa-atom-alt color-1"></i>
          </div>

          <div class="row w-100">
            <div class="col-12 px-0 text-center">
              <i class="far fa-money-bill-wave color-3 mr-1 fa-xs"></i>
              <span class="number">{{ post.rate }}</span>
              <span class="font-italic small">€/h</span>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "List",

    props: ['post', 'getDistance', 'getTime', 'getImage']
  }
</script>

<style scoped>


  .card-list-header,
  .card-list-header img {
    /*height: 200px;*/
    /*width: 200px;*/
    height: 100px;
    width: 100px;
  }

  .border-special {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .border-special:after {
    /*content: '\f5d3';
    position: absolute;
    !*top: 0;*!
    left: 0;
    right: 0;
    bottom: 0;
    width: 17px;
    margin: auto;
    color: #225a94;
    font-weight: 300;
    font-family: "Font Awesome 5 Pro", sans-serif;
    font-size: 12px;*/
  }

</style>
