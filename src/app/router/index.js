/**
 * File app/router/index.js
 *
 * Ce fichier contient les routes d'accès à l'app
 *
 * @author sofianeakbly
 **/

import Vue    from 'vue'
import Router from 'vue-router'
import Route  from 'vue-routisan'

import Middleware from '../middleware/index'

import HomeIndex      from '../../components/pages/Home/Index'
import HomePostCreate from '../../components/pages/Home/Post/Create'
import Auth           from '../../components/pages/Auth/Auth'

Vue.use(Router)


Route.group({ beforeEnter: Middleware.Auth }, () => {

  /**
   * Page d'accueil
   */
  Route.view('/home', HomeIndex).name('home')
  Route.view('/home/post/create', HomePostCreate).name('home.post.create')

})

Route.view('/login', Auth).name('login')
Route.view('/register', Auth).name('register')


export default new Router({
  mode  : 'history',
  routes: Route.all(),
})
