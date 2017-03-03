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
      if (Terminos.find().fetch().length > 0) {
        let id = Terminos.find().fetch()[0]._id;
        Terminos.update({_id: id}, {
          $set: {
            contenido: terminos
          }
        })
      } else {
          Terminos.insert({
            contenido: terminos
          })
      }

    } else {
      return;
    }
  },
  actualizarPoliticas(terminos) {
    check(terminos, String)
    if (this.userId) {
      if (Politicas.find().fetch().length > 0) {
        let id = Politicas.find().fetch()[0]._id;
        Politicas.update({_id: id}, {
          $set: {
            contenido: terminos
          }
        })
      } else {
          Politicas.insert({
            contenido: terminos
          })
      }

    } else {
      return;
    }
  }
});
