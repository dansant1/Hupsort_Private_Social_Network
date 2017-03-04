Meteor.publish('mensajes', function () {
	if (this.userId) {
		return Mensajes.find({global: true});
	} else {
		this.stop();
		return;
	}
});

Meteor.publish('colores', function () {
	if (this.userId) {
		return Colores.find({userId: this.userId});
	} else {
		this.stop();
		return;
	}
});

Meteor.publish( 'mensajesDirectos', function( de ) {
  check( de, String );

  if (this.userId) {
		console.log(de);
		let numero = Mensajes.find({
      $or: [ { 'de.id': this.userId, 'para.id': de }, { 'de.id': de, 'para.id': this.userId } ]
    }).fetch().length
		console.log(numero);
		return Mensajes.find({
      $or: [ { 'de.id': this.userId, 'para.id': de }, { 'de.id': de, 'para.id': this.userId } ]
    });
  } else {
		this.stop();
		return;
	}
});

Meteor.publish('conversaciones', function () {
	if (this.userId) {
			return Conversaciones.find({userId: this.userId},  {limit: 5});
	} else {
		this.stop();
		return;
	}

});

Meteor.publish('terminos', function () {

			return Terminos.find();

});

Meteor.publish('politicas', function () {

	return Politicas.find();

});
