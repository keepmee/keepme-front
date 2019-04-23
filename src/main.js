// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue                 from 'vue'
import Vue2Filters         from 'vue2-filters'
import VueTextareaAutosize from 'vue-textarea-autosize'
import VueGeolocation      from 'vue-browser-geolocation'
import VModal              from 'vue-js-modal'
import Carousel3d          from 'vue-carousel-3d'
import * as VueGoogleMaps  from 'vue2-google-maps'
import VueSidebarMenu      from 'vue-sidebar-menu'
import cookie              from 'json-cookie'
import swal                from 'sweetalert2'

import App     from './App'
import helpers from './app/helpers'
import router  from './app/router'
import store   from './app/store'
import api     from './app/api'

import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

Vue.use(Vue2Filters)
Vue.use(Carousel3d)
Vue.use(VueTextareaAutosize)
Vue.use(VModal)
Vue.use(VueGeolocation)
Vue.use(VueSidebarMenu)


Vue.use(VueGoogleMaps, {
  load: {
    // key      : store.getters.GMAPS_KEY,
    // key      : 'AIzaSyBvWE_sIwKbWkiuJQOf8gSk9qzpO96fhfY',
    // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

Vue.config.productionTip = false

Vue.prototype.api = api
Vue.prototype.helpers = helpers
Vue.prototype.swal = swal
Vue.prototype.cookie = cookie

new Vue({
  el        : '#app',
  router,
  store,
  components: { App },
  template  : '<App/>'
})
