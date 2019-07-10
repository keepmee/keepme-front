<template>
  <div class="profile-index" v-if="user">

    <profile-image :user="user" :get-user-name="getUserName"/>
    <koops-summary class="my-4" :koops="koops"/>


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
        <span class="text-uppercase mx-2 sr-only">Vue</span>
        <i class="fal fa-table fa-1x5 color-2 cursor-pointer mx-2" title="Grille" :class="{'color-1': view === 1}"
           @click="view = 1"></i>
        <i class="fal fa-list fa-1x5 color-2 cursor-pointer mx-2" title="Liste" :class="{'color-1': view === 2}"
           @click="view = 2"></i>
      </div>

      <hr class="w-100">

    </div>

    <div class="row">
      <!-- GRID -->
      <grid-view v-for="(koop, $i) in koops" :post="koop" :get-distance="getDistance" :key="$i"
                 v-if="view === 1" :apply="apply"/>

      <!-- LIST -->
      <list-view v-for="(koop, $i) in koops" :post="koop" :get-distance="getDistance" :key="$i"
                 v-if="view === 2"/>
    </div>

    <!--<button @click="run">re-run</button>-->

    <!--{{ user }}-->
  </div>
</template>

<script>

  import moment from 'moment'

  import ProfileImage from './includes/ProfileImage'
  import KoopsSummary from './includes/KoopsSummary'

  import GridView from '../../../includes/KoopView/Grid'
  import ListView from '../../../includes/KoopView/List'

  export default {
    name: "Index",

    components: {
      ProfileImage,
      KoopsSummary,
      GridView,
      ListView
    },

    data() {
      return {
        center   : { lat: 50.3667, lng: 3.0667 },
        user     : null,
        koops    : null,
        view     : 2,
        sortedBy : null,
        sortIcons: {
          default: 'fa-long-arrow-down',
          reverse: 'fa-long-arrow-up',
        },
      }
    },

    created() {
      this.run()
    },

    methods: {

      getDistance(lat, lng, unit = 'K') {
        return this.helpers.distance(this.center.lat, this.center.lng, lat, lng, unit).toFixed(2)
      },

      getCurrentUser() {
        this.api.get('/users/current').then((r) => {
          this.user = r.data.data.user
        })
      },

      getKoops() {
        this.api.get('/koops/mine').then((r) => {
          this.koops = r.data.data.koops

          setTimeout(() => {
            this.setAllKoopDistance()
            this.setAllKoopTime()
            this.setAllKoopImage()
          }, 1000)

        })
      },

      getUserName(user = null) {
        return user ? `${user.lastname.toLowerCase().capitalize()} ${user.firstname.toLowerCase().capitalize()}` :
          this.user ? `${this.user.lastname.toLowerCase().capitalize()} ${this.user.firstname.toLowerCase().capitalize()}` : ''
      },

      getImage(post) {
        let length = post.children.length,
          // let length = randInt(4),
          name = length === 1 ? 'kid-1' : length === 2 ? 'kid-2' : length === 3 ? 'kid-3' : length === 4 ? 'kid-4' : 'kid'
        return require('../../../../assets/img/' + name + '.jpg')
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

      setCenter(center) {
        this.center = JSON.parse(JSON.stringify(center))
        this.setAllKoopDistance()
      },

      setAllKoopDistance() {
        if (this.koops && this.koops !== null) {
          let postsTmp = this.helpers.clone(this.koops)
          postsTmp.forEach((post) => {
            post.distance = this.getDistance(post.location.lat, post.location.lng)
          })
          this.koops = this.helpers.clone(postsTmp)
        }
      },

      setAllKoopTime() {
        if (this.koops && this.koops !== null) {
          let postsTmp = this.helpers.clone(this.koops)
          postsTmp.forEach((post) => {
            post.duration = this.getTime(this.helpers.moment(post.start), this.helpers.moment(post.end))
          })
          this.koops = this.helpers.clone(postsTmp)
        }
      },

      setAllKoopImage() {
        if (this.koops && this.koops !== null) {
          let postsTmp = this.helpers.clone(this.koops)
          postsTmp.forEach((post) => {
            post.image = this.getImage(post)
          })
          this.koops = this.helpers.clone(postsTmp)
        }
      },

      apply(id) {
        return false
      },

      sortBy(field) {
        if (this.isCurrentSortedBy(field)) {
          this.koops.reverse()
          this.sortedBy = this.sortedBy === `-${field}` ? field : `-${field}`
        }
        else {
          if (field === 'distance')
            this.koops.sort((a, b) => (parseFloat(a[field]) > parseFloat(b[field])) ? 1 : ((parseFloat(b[field]) > parseFloat(a[field])) ? -1 : 0))
          else if (field === 'duration')
            this.koops.sort((a, b) => {
              let aDuration = this.getTime(a.start, a.end, false),
                bDuration = this.getTime(b.start, b.end, false)
              return (aDuration > bDuration) ? 1 : ((bDuration > aDuration) ? -1 : 0)
            })
          else if (field !== 'children')
            this.koops.sort((a, b) => (a[field].length > b[field].length) ? 1 : ((b[field].length > a[field].length) ? -1 : 0))
          else if (field === 'default')
            this.koops.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0))
          else
            this.koops.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0))
          this.sortedBy = field
        }
      },

      isCurrentSortedBy(field) {
        return (this.sortedBy === field || this.sortedBy === `-${field}`)
      },

      getSortIcon(field) {
        return this.isCurrentSortedBy(field) && this.sortedBy === `-${field}` ? this.sortIcons.reverse : this.sortIcons.default
      },

      run() {
        this.getCurrentUser()
        this.getKoops()
        this.$getLocation({ enableHighAccuracy: true }).then(coordinates => {
          this.setCenter(coordinates)
        })
      }


    }
  }
</script>

<style scoped>

  .koops-summary {
    height: 250px;
    width: 100%;
  }
</style>
