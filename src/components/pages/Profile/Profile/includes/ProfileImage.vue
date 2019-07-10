<template>
  <div class="profile-image-container position-relative">

    <div class="profile-image d-flex justify-content-center align-items-center" :class="{'bg-color-1': !user.image}">
      <img :src="user.image" alt="Photo de profil" v-if="user.image">
      <i class="fal fa-user fa-6x text-white" v-else></i>
    </div>

    <div class="profile-image-details">
      <div class="bar first bg-color-1"></div>
      <div class="bar second bg-color-2"></div>
      <div class="bar main bg-color-1"></div>
      <div class="bar third bg-color-2"></div>
      <div class="bar four bg-color-1"></div>
    </div>

    <div class="profile-image-name">
      <h3>{{ getUserName() }}</h3>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ProfileImageContainer",

    props: ['user', 'getUserName']
  }
</script>

<style scoped>

  .profile-image-container .profile-image {
    height: 176px;
    width: 176px;
    background-color: #000;
    border: 4px solid #fff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .profile-image-container .profile-image-details .bar {
    position: absolute;
    left: 150px;
    z-index: -1;
  }

  .profile-image-container .profile-image-name {
    position: absolute;
    top: 54px;
    left: 260px;
    z-index: -1;
  }

  .profile-image-container .profile-image,
  .profile-image-container .profile-image-details .bar,
  .profile-image-container .profile-image-name {
    margin-left: calc(50% - 300px);
  }

  .profile-image-container .profile-image-details .bar.first {
    top: 48px;
  }

  .profile-image-container .profile-image-details .bar.second {
    top: 68px;
  }

  .profile-image-container .profile-image-details .bar.third {
    top: 108px;
  }

  .profile-image-container .profile-image-details .bar.four {
    top: 128px;
  }

  .profile-image-container .profile-image-details .bar.main {
    top: 88px;
    height: 4px;
    width: 200px;
  }

  .profile-image-container .profile-image-details .bar.first,
  .profile-image-container .profile-image-details .bar.four {
    height: 2px;
    width: 75px;
  }

  .profile-image-container .profile-image-details .bar.second,
  .profile-image-container .profile-image-details .bar.third {
    height: 3px;
    width: 100px;
  }

</style>
