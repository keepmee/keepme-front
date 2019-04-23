/**
 * File app/middleware/guest.js
 *
 * Ce fichier contient le middleware pour l'accès à l'app
 *
 * @author sofianeakbly
 **/


/**
 * Vérifie si l'accès à l'app est autorisé
 *
 * @param to La route suivante
 * @param from La route de provenance
 * @param next La requête suivante
 **/
export default function (to, from, next) {
  $(window).scrollTop(0)
  next()
}
