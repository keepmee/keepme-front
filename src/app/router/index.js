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

import HomeIndex      from '../../components/pages/Home/Nurse/Index'
// import HomeIndex      from '../../components/pages/Home/Index'
import HomePostCreate from '../../components/pages/Home/Post/Create'

import ProfileIndex  from '../../components/pages/Profile/Profile/Index'
import SettingsIndex from '../../components/pages/Profile/Settings/Index'

import Auth   from '../../components/pages/Auth/Auth'
import Logout from '../../components/pages/Auth/Logout'

Vue.use(Router)


Route.group({ beforeEnter: Middleware.Auth }, () => {

  /**
   * Page d'accueil
   */
  Route.view('/', HomeIndex).name('home')
  Route.view('/post/create', HomePostCreate).name('home.post.create')

  /**
   * Page profil
   */
  Route.view('/profile', ProfileIndex).name('profile.index')
  Route.view('/settings', SettingsIndex).name('settings.index')

})

Route.view('/login', Auth).name('login')
Route.view('/register', Auth).name('register')
Route.view('/logout', Logout).name('logout')

Route.redirect('*', '/')

export default new Router({
  // mode  : 'history',
  routes: Route.all(),
})
