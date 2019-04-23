/**
 * File app/middleware/auth.js
 *
 * Ce fichier contient le middleware pour l'accès à l'app
 *
 * @author sofianeakbly
 **/

import helpers from '../helpers'


/**
 * Vérifie si l'accès à l'app est autorisé
 *
 * @param to La route suivante
 * @param from La route de provenance
 * @param next La requête suivante
 **/
export default function (to, from, next) {
  $(window).scrollTop(0)
  return helpers.userIsAuthenticate() ? next() : next({ name: 'login' })
}
