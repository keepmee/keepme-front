<template>
  <div class="home" v-if="posts">

    <!-- MAP -->
    <map-view :map-center="center" :posts="posts" :circle-radius="radius" :is-visible-post="isVisiblePost"
              @setRadius="setRadius" @setCenter="setCenter" v-if="center"/>

    <!-- CLICK TO VIEW -->
    <div class="row w-100 click-to-view d-flex justify-content-center align-items-center smooth-scroll">
      <i class="fal fa-chevron-double-down color-1 cursor-pointer fa-3x animated pulse infinite"
         @click="scrollToCarousel"></i>
    </div>

    <!-- CAROUSEL -->
    <carousel-view :posts="posts.slice(0,5)"></carousel-view>

    <!-- SORT -->
    <div class="row w-100 my-3">
      <div class="col-6">
        <span class="mx-2 text-uppercase">trier par : </span>
        <span class="mx-2 text-uppercase cursor-pointer" :class="{'color-1': isCurrentSortedBy('children')}"
              @click="sortBy('children')">nb. enfants
          <i class="far" :class="getSortIcon('children')"></i>
        </span>
        <span class="mx-2 text-uppercase cursor-pointer" :class="{'color-1': isCurrentSortedBy('distance')}"
              @click="sortBy('distance')">distance
          <i class="far" :class="getSortIcon('distance')"></i>
        </span>
        <span class="mx-2 text-uppercase cursor-pointer" :class="{'color-1': isCurrentSortedBy('duration')}"
              @click="sortBy('duration')">durée
          <i class="far" :class="getSortIcon('duration')"></i>
        </span>
      </div>
      <div class="col-6 text-right px-5">
        <span class="text-uppercase mx-2">Vue</span>
        <i class="far fa-table fa-1x5 color-2 cursor-pointer mx-2" title="Grille" :class="{'color-1': view === 1}"
           @click="setView(1)"></i>
        <i class="far fa-list fa-1x5 color-2 cursor-pointer mx-2" title="Liste" :class="{'color-1': view === 2}"
           @click="setView(2)"></i>
      </div>

      <hr class="w-100">

    </div>

    <div class="row">
      <!-- GRID -->
      <grid-view v-for="(post, $i) in posts" :post="post" :get-distance="getDistance" :key="$i"
                 v-if="isVisiblePost(post) && view === 1" :apply="apply"/>

      <!-- LIST -->
      <list-view v-for="(post, $i) in posts" :post="post" :get-distance="getDistance" :key="$i"
                 v-if="isVisiblePost(post) && view === 2"/>
    </div>

  </div>
</template>

<script>

  // import Posts from '../../../assets/posts'

  import MapView      from '../../../includes/KoopView/Map'
  import CarouselView from '../../../includes/KoopView/Carousel/Index'
  import GridView     from '../../../includes/KoopView/Grid'
  import ListView     from '../../../includes/KoopView/List'

  import moment  from 'moment'
  import randInt from 'rand-int'

  export default {

    name: 'Home',

    components: {
      MapView,
      CarouselView,
      GridView,
      ListView,
    },

    data() {
      return {
        posts    : null,
        view     : 1, // 1 : grid, 2 : list, 3 : map
        radius   : 10000,
        // radius   : null,
        center   : { lat: 48.856613, lng: 2.352222 },
        sortedBy : null,
        sortIcons: {
          default: 'fa-long-arrow-down',
          reverse: 'fa-long-arrow-up',
        },
      }
    },

    created() {
      /*this.$getLocation({ enableHighAccuracy: true }).then(coordinates => {
        this.setCenter(coordinates)
      })*/
      this.getAllAvailableKoops()
    },

    methods: {

      sortBy(field) {
        if (this.isCurrentSortedBy(field)) {
          this.posts.reverse()
          this.sortedBy = this.sortedBy === `-${field}` ? field : `-${field}`
        }
        else {
          if (field === 'distance')
            this.posts.sort((a, b) => (parseFloat(a[field]) > parseFloat(b[field])) ? 1 : ((parseFloat(b[field]) > parseFloat(a[field])) ? -1 : 0))
          else if (field === 'duration')
            this.posts.sort((a, b) => {
              let aDuration = this.getTime(a.time.start, a.time.end, false),
                bDuration = this.getTime(b.time.start, b.time.end, false)
              return (aDuration > bDuration) ? 1 : ((bDuration > aDuration) ? -1 : 0)
            })
          else if (field !== 'children')
            this.posts.sort((a, b) => (a[field].length > b[field].length) ? 1 : ((b[field].length > a[field].length) ? -1 : 0))
          else
            this.posts.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0))
          this.sortedBy = field
        }
      },

      isCurrentSortedBy(field) {
        return (this.sortedBy === field || this.sortedBy === `-${field}`)
      },

      scrollToCarousel() {
        let el = $('#carouselContainer'), offset = el.offset()
        $("html, body").animate({ scrollTop: offset.top }, 1000);
      },

      getAllAvailableKoops() {
        this.api.get('/koop/available').then(r => {
          this.posts = r.data.data.koops
          setTimeout(() => {
            this.setAllPostDistance()
            this.setAllPostTime()
            this.setAllPostImage()
          }, 1000)
        }, (e) => {
          console.log(e, e.response)
        })
      },

      getDistance(lat, lng, unit = 'K') {
        return this.helpers.distance(this.center.lat, this.center.lng, lat, lng, unit).toFixed(2)
      },

      getDistanceBetween(lat, lng, lat2, lng2, unit = 'K') {
        return this.helpers.distance(lat, lng, lat2, lng2, unit)
      },

      getTime(start = null, end = null, concat = true) {
        if (start === null && end === null)
          return null
        else {
          let d = moment.duration(((end === null ? this.helpers.moment() : this.helpers.moment(end)).diff(this.helpers.moment(start))))
          return concat ? this.concatTime(d.hours(), d.minutes(), d.seconds()) : d
        }
      },

      concatTime(h, m, s) {
        return `${this.helpers.twoDigits(h)}h${this.helpers.twoDigits(m)}`
      },

      getImage(post) {
        // let length = post.childrens.length,
        let length = randInt(4),
          name = length === 1 ? 'kid-1' : length === 2 ? 'kid-2' : length === 3 ? 'kid-3' : length === 4 ? 'kid-4' : 'kid'
        return require('../../../../assets/img/' + name + '.jpg')
        // return require('../../../assets/img/' + name + '.jpg')
      },

      isVisiblePost(post) {
        return /*post.nanny_id !== null ? false :*/ this.radius !== null ? this.getDistanceBetween(this.center.lat, this.center.lng, post.location.lat, post.location.lng, 'm') < this.radius : true
      },

      setRadius(radius) {
        this.radius = radius
      },

      setCenter(center) {
        this.center = JSON.parse(JSON.stringify(center))
        this.setAllPostDistance()
        this.$forceUpdate()
      },

      setAllPostDistance() {
        if (this.posts && this.posts !== null) {
          let postsTmp = this.helpers.clone(this.posts)
          postsTmp.forEach((post) => {
            post.distance = this.getDistance(post.location.lat, post.location.lng)
          })
          this.posts = this.helpers.clone(postsTmp)
        }
      },

      setAllPostTime() {
        if (this.posts && this.posts !== null) {
          let postsTmp = this.helpers.clone(this.posts)
          postsTmp.forEach((post) => {
            post.duration = this.getTime(this.helpers.moment(post.start), this.helpers.moment(post.end))
          })
          this.posts = this.helpers.clone(postsTmp)
          console.log(this.posts)
        }
      },

      setAllPostImage() {
        if (this.posts && this.posts !== null) {
          let postsTmp = this.helpers.clone(this.posts)
          postsTmp.forEach((post) => {
            post.image = this.getImage(post)
          })
          this.posts = this.helpers.clone(postsTmp)
        }
      },

      setView(view) {
        this.view = view
      },

      getSortIcon(field) {
        return this.isCurrentSortedBy(field) && this.sortedBy === `-${field}` ? this.sortIcons.reverse : this.sortIcons.default
      },

      apply(postId) {

        let user = this.helpers.getUserCookie()

        if (user === null) return this.$router.push({ name: 'login' })

        if (user.role === 'nanny') {

          this.swal({
            title             : "Voulez-vous postuler ?",
            confirmButtonText : "Oui",
            confirmButtonClass: "btn bg-color-1",
            cancelButtonText  : "Non, j'abandonne",
            showCancelButton  : true
          }).then((response) => {
            if (response.value)
              this.api.put(`/koop/validate`, postId).then(() => this.getAllAvailableKoops())
          })

        }
      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .click-to-view {
    height: 25vh;
  }

</style>
