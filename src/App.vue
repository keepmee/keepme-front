<template>
  <div id="app">

    <div class="row w-100">

      <sidebar-menu class="bg-color-4 color-1" :menu="menu" :width="width" @collapse="onCollapse"
                    :collapsed="sidebarCollapsed" v-if="showSidebar"/>


      <div class="container-fluid px-0 ml-auto mr-0"
           :class="{'w-75': (!sidebarCollapsed && showSidebar), 'almost-full-width': (sidebarCollapsed && showSidebar)}">

        <!--<div class="col-12 my-2" v-if="showSidebar">-->
        <!--<img src="/static/img/logo.png" alt="Logo" class="img-fluid navbar-logo mx-auto d-block">-->
        <!--</div>-->

        <router-view/>

      </div>
    </div>


    <preload/>
    <!--<form-load/>-->

  </div>
</template>

<script>

  import Preload  from './components/includes/Preload'
  import FormLoad from './components/includes/FormLoad'

  export default {
    name: 'App',

    components: {
      Preload,
      FormLoad,
    },

    watch: {
      $route() {
        this.checkRoute()
      }
    },

    created() {
      this.checkRoute()


      console.log(this.helpers.decode(this.cookie.get(this.$store.getters.COOKIE_NAME)))


    },

    data() {
      return {
        width           : '25%',
        sidebarCollapsed: true,
        showSidebar     : true,
        menu            : [
          {
            header: true,
            title : 'Main Navigation',
            icon  : 'fa fa-user',
            // component: componentName
            // visibleOnCollapse: true
          },
          {
            href : '/home',
            title: 'Accueil',
            icon : 'fal fa-1x5 fa-home',
            /*
            disabled: true
            badge: {
                text: 'new',
                // class:''
            }
            */
          },
          {
            href : '/home/post/create',
            title: 'Poster',
            icon : 'fal fa-1x5 fa-layer-plus',
          },
          {
            title: 'Charts',
            icon : 'fal fa-1x5 fa-chart-area',
            child: [
              {
                href : '/charts/sublink',
                title: 'Sub Link',
              }
            ]
          }
        ]
      }
    },

    methods: {

      checkRoute() {
        this.showSidebar = !(this.$route.name === 'login' || this.$route.name === 'register')

      },

      onCollapse(collapsed) {
        this.sidebarCollapsed = collapsed
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

  .container-fluid.almost-full-width {
    width: calc(100% - 50px);
  }

  .navbar-logo {
    height: 50px;
  }

  .v-sidebar-menu {
    z-index: 111
  }

  .v-sidebar-menu .vsm-arrow:after,
  .v-sidebar-menu .collapse-btn:after {
    font-family: "Font Awesome 5 Pro", sans-serif;
  }

  .v-sidebar-menu .collapse-btn {
    /*color: #001529 !important;*/
    background-color: #EBC8B2 !important;
    outline: 0 !important;
  }

  .v-sidebar-menu .vsm-item > .vsm-link > .vsm-icon {
    background-color: transparent !important;
  }

  .v-sidebar-menu.vsm-collapsed .vsm-item.active-item > .vsm-link > .vsm-title,
  .v-sidebar-menu.vsm-collapsed .vsm-item.active-item > .vsm-link > .vsm-icon,
  .v-sidebar-menu .vsm-item:not(.active-item) > .vsm-link > .vsm-title,
  .v-sidebar-menu .vsm-item:not(.active-item) > .vsm-link > .vsm-icon {
    color: #EBC8B2 !important;
  }

  .v-sidebar-menu .vsm-item:hover,
  .v-sidebar-menu .vsm-item:hover {
    background-color: #fff !important;
  }

  .v-sidebar-menu .vsm-item.first-item.active-item > .vsm-link, .v-sidebar-menu .vsm-item.first-item.parent-active-item > .vsm-link {
    -webkit-box-shadow: inset 3px 0 0 0 #EBC8B2;
    -moz-box-shadow: inset 3px 0 0 0 #EBC8B2;
    box-shadow: inset 3px 0 0 0 #EBC8B2;
  }

  .v-sidebar-menu:not(.vsm-collapsed) .vsm-item.first-item.active-item {
    background-color: #EBC8B2 !important;
  }

  .v-sidebar-menu .vsm-mobile-bg {
    background-color: #EBC8B2 !important;
  }

  .v-sidebar-menu .vsm-item.mobile-item {
    display: none !important;
  }


</style>
