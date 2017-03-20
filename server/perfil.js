Meteor.methods({
  actualizarEstado: function (estado) {
    check(estado, String);

    if (this.userId) {

      Meteor.users.update({_id: this.userId}, {
        $set: {
          'profile.estado': estado
        }
      });

    } else {
      return;
    }
  },
  actualizarUsuario: function (datos) {
      check(datos, Object);

      if (this.userId) {
        Meteor.users.update({_id: this.userId}, {
          $set: {
            'profile.pais': datos.pais,
            'profile.genero': datos.genero,
            'profile.edad': datos.edad,
            'profile.orientacion': datos.orientacion,
            'profile.condicion': datos.condicion
          }
        });
      } else {
        return;
      }
  },
  actualizarTerminos(terminos) {
    check(terminos, String)
    if (this.userId) {

          Terminos.insert({
            contenido: terminos
          })


    } else {
      return;
    }
  },
  actualizarPoliticas(terminos) {
    check(terminos, String)
    if (this.userId) {

          Politicas.insert({
            contenido: terminos
          })


    } else {
      return;
    }
  },
  updateTerminos(id, contenido) {
    check(id, String)
    check(contenido, String)
    console.log(id);
    Terminos.update({_id: id}, {
      $set: {
        contenido: contenido
      }
    })
  },
  updatePoliticas(id, contenido) {
    check(id, String)
    check(contenido, String)
    Politicas.update({_id: id}, {
      $set: {
        contenido: contenido
      }
    })
  }
});
