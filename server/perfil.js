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
  }
});
