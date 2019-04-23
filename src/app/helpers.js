/**
 * File app/helpers.js
 *
 * Ce fichier contient les outils utiles
 * au bon fonctionnement de l'app
 *
 * @author sofianeakbly
 **/


import moment       from 'moment'
import date         from 'moment-timezone'
import VueJwtDecode from 'vue-jwt-decode'
import store        from '@/app/store'
import cookie       from 'json-cookie'

let helpers = {}

helpers.twoDigits = (n) => {
  return n < 10 ? '0' + n : n
}

helpers.moment = (d = null) => {
  date.locale('fr')
  // date.tz.setDefault('Europe/Paris')
  // return d === null ? date.tz(moment(), 'Europe/Paris') : date.tz(d, 'Europe/Paris')
  return d === null ? moment() : moment(d)
}

helpers.distance2 = (lat1, lon1, lat2, lon2, unit) => {

  if (lat1 === 0)
    return 0

  let radlat1 = Math.PI * lat1 / 180,
    radlat2 = Math.PI * lat2 / 180,
    radtheta = Math.PI * (lon1 - lon2) / 180,
    dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  dist = ((Math.acos((dist > 1 ? 1 : dist)) * 180) / Math.PI) * 60 * 1.1515
  if (unit === 'N') console.log(dist * 0.8684)
  return unit === "K" ? dist * 1.609344 : unit === "N" ? dist * 0.8684 : dist
}

helpers.distance = (lat1, lon1, lat2, lon2, unit) => {
  var R = 6371; // km
  var dLat = helpers.toRad(lat2 - lat1);
  var dLon = helpers.toRad(lon2 - lon1);
  lat1 = helpers.toRad(lat1);
  lat2 = helpers.toRad(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return unit === 'm' ? d * 1000 : d;
}

helpers.toRad = (Value) => {
  return Value * Math.PI / 180;
}

helpers.clone = (object) => {
  return JSON.parse(JSON.stringify(object))
}

helpers.decode = (token) => {
  return VueJwtDecode.decode(token)
}

helpers.userIsAuthenticate = () => {
  let token = cookie.get(store.getters.COOKIE_NAME)
  console.log('token exists', (token && token !== null && token.trim() !== ""))
  return (token && token !== null && token.trim() !== "")
}

export default helpers

