function validateYouTubeUrl(url)
{
    var url = url;
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                // Do anything for being valid
                // if need to change the url to embed url then use below line
                //$('#ytplayerSide').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
                return true;
            }
            else {
                return false;
            }
        }
}

import { request } from "meteor/froatsnook:request";

Meteor.methods({
  eliminarPublicacion(id) {
    check(id, String)
    Muro.remove({_id: id})
  },
  postear: function (texto) {
    check(texto, String);

    if (this.userId) {

      let datos = {
        createdAt: new Date(),
        de: {
          nombre: Meteor.users.findOne({_id: this.userId}).username,
          id: this.userId
        }
      }

      if (validateYouTubeUrl(texto)) {
        datos.esYoutube = true;
        datos.texto = texto;
        datos.youtube = texto;
      } else {
        datos.texto = texto;
        datos.esYoutube = false;
      }

      let pubId = Muro.insert(datos);

      return pubId;

    } else {
      return;
    }

  },
  like: function (post) {
    check(post, String);

    if (this.userId) {

      let datos = {
        createdAt: new Date(),
        de: {
          nombre: Meteor.users.findOne({_id: this.userId}).username,
          id: this.userId
        },
        pubId: post
      }

      if (Likes.find({pubId: datos.pubId, 'de.id': this.userId}).fetch().length > 0) {

      } else {
        Likes.insert(datos);
        console.log(post)
        Notificaciones.insert({
          createdAt: new Date(),
          de: {
            nombre: Meteor.users.findOne({_id: this.userId}).username,
            id: this.userId
          },
          pubId: post,
          para: Muro.findOne({_id: post}).de.id,
          descripcion: Meteor.users.findOne({_id: this.userId}).username + ' le gusto una publicacion tuya.'
        })
      }


    } else {
      return;
    }

  }
});
