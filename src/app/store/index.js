/**
 * File app/store/index.js
 *
 * Ce fichier contient les données vuex
 *
 * @author sofianeakbly
 **/

import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  APP_NAME   : 'keepme-front', // Nom de l'application et du cookie
  API_SERVER : "http://localhost:4001", // Adresse du serveur
  COOKIE_NAME: "keepme_token", // Adresse du serveur
  GMAPS_KEY  : 'AIzaSyDmlw5nwiNkWJo3Xznkn05vLFpP10lBXjU',
  form_load  : false, // Le formulaire est submit
}

const mutations = {
  setFormLoad(state, form_load) {
    state.form_load = form_load
  },

  setAppName(state, name) {
    state.APP_NAME = name
  },

  setApiServer(state, url) {
    state.API_SERVER = url
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters: {
    APP_NAME   : state => state.APP_NAME,
    API_SERVER : state => state.API_SERVER,
    COOKIE_NAME: state => state.COOKIE_NAME,
    GMAPS_KEY  : state => state.GMAPS_KEY,
    form_load  : state => state.form_load,
  }
})
