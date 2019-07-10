<template>
  <div id="app">

    <div class="row w-100">

      <!--<sidebar-menu class="bg-color-4 color-1" :menu="menu" :width="width" @collapse="onCollapse"
                    :collapsed="sidebarCollapsed" v-if="showSidebar"/>-->


      <div class="container-fluid px-0 ml-auto mr-0"
           :class="{'sidebar-open': (!sidebarCollapsed && showSidebar), 'almost-full-width': (sidebarCollapsed && showSidebar)}">

        <!--<div class="col-12 my-2" v-if="showSidebar">-->
        <!--<img src="/static/img/logo.png" alt="Logo" class="img-fluid navbar-logo mx-auto d-block">-->
        <!--</div>-->

        <router-view/>

      </div>
    </div>

    <vue-sidebar class="bg-color-4 color-1" :links="menu" v-if="showSidebar" @collapse="onCollapse"/>

    <!--<preload/>-->
    <form-load/>

  </div>
</template>

<script>

  import Preload  from './components/includes/Preload'
  import FormLoad from './components/includes/FormLoad'

  import VueSidebar from '../ssf_modules/vue-sidebar'
  // import VueSidebar from 'vue-sidebar'
  // import VueSidebar from '../node_modules/vue-sidebar/VueSidebar'

  export default {
    name: 'App',

    components: {
      Preload,
      FormLoad,
      VueSidebar,
    },

    watch: {
      $route() {
        this.checkRoute()
      }
    },

    created() {
      this.checkRoute()


      // console.log(this.helpers.decode(this.cookie.get(this.$store.getters.COOKIE_NAME)))


    },

    data() {
      return {
        width           : '25%',
        sidebarCollapsed: true,
        showSidebar     : true,
        menu            : [
          {
            title: 'Accueil',
            icon : 'fal fa-1x5 fa-home',
            name : 'home'
          },
          {
            title: 'Poster',
            icon : 'fal fa-1x5 fa-layer-plus',
            name : 'home.post.create'
          },
          {
            title   : 'Profil',
            icon    : 'fal fa-1x5 fa-user',
            children: [{
              title: 'Paramètres',
              icon : 'fa fa-cog',
              name : 'settings.index'
            }, {
              title: 'Voir le profil',
              icon : 'fa fa-eye',
              name : 'profile.index'
            }, {
              title: 'Déconnexion',
              icon : 'fa fa-sign-out',
              name : 'logout'
            }],
            routes  : ['profile.index', 'logout', 'settings.index']
          }
        ]
      }
    },

    methods: {

      checkRoute() {
        this.showSidebar = !(this.$route.name === 'login' || this.$route.name === 'register')

      },

      onCollapse(collapsed) {
        this.sidebarCollapsed = !collapsed
      },

    }
  }
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .container-fluid {
    -webkit-transition: width .3s, margin-left .3s;
    -moz-transition: width .3s, margin-left .3s;
    -ms-transition: width .3s, margin-left .3s;
    -o-transition: width .3s, margin-left .3s;
    transition: width .3s, margin-left .3s;
  }

  .container-fluid.sidebar-open {
    width: calc(100% - 250px);
  }

  .container-fluid.almost-full-width {
    width: calc(100% - 50px);
  }

  .navbar-logo {
    height: 50px;
  }

  .vue-sidebar .vue-sidebar-list .vue-sidebar-item.active-item .vue-sidebar-link {
    -webkit-box-shadow: inset 3px 0 0 0 #EBC8B2 !important;
    -moz-box-shadow: inset 3px 0 0 0 #EBC8B2 !important;
    box-shadow: inset 3px 0 0 0 #EBC8B2 !important;
  }

  .vue-sidebar.open .vue-sidebar-list .vue-sidebar-item.active-item .vue-sidebar-link {
    background-color: #000 !important;
    color: #EBC8B2 !important;
  }

  .vue-sidebar-toggle {
    width: 100% !important;
    background-color: #EBC8B2 !important;;
    color: #fff;
    margin-top: 0 !important;
    padding: 10px 0 !important;
    height: auto !important;
  }

  .vue-sidebar .vue-sidebar-link.vue-sidebar-dropdown .vue-dropdown-menu {
    background-color: #EBC8B2;
    color: #fff;
  }

</style>
