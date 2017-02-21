Meteor.methods({
	enviarMensajeChat: function (mensaje, color) {
		check(mensaje, String);
		check(color, String);

		let datos = {
			mensaje: mensaje,
			color: color
		};

		console.log(datos.color);

		if (this.userId) {
			datos.de = {
				nombre: Meteor.users.findOne({_id: this.userId}).username,
				id:  this.userId
			}
			datos.createdAt = new Date();
			datos.global = true;

			if ( Colores.findOne({userId: this.userId}) === undefined ) {
				Colores.insert({
					userId: this.userId,
					color: datos.color,
					createdAt: new Date()
				});
			} else {
				Colores.update({userId: this.userId}, {
					$set: {
						color: datos.color
					}
				});
			}

			Mensajes.insert(datos);
		} else {
			return;
		}
	},
	comentar: function (datos) {
		check(datos, Object);
		
		Comentarios.insert({
			username: Meteor.users.findOne({_id: this.userId}).username,
			userId: this.userId,
			comentario: datos.comentario,
			pubId: datos.pubId
		});
	},
	enviarMensajePrivado: function (mensaje, de) {
			check(mensaje, String);
			check(de, Object);

			let datos = {
				mensaje: mensaje,
				color: 'black'
			};

			if (this.userId) {
				datos.de = {
					nombre: Meteor.users.findOne({_id: this.userId}).username,
					id:  this.userId
				}
				datos.para = de;
				datos.para.nombre = Meteor.users.findOne({_id: de.id}).username;
				datos.createdAt = new Date();
				datos.global = false;
				let mensajeId = Mensajes.insert(datos);

				return {
					_id: mensajeId
				}
			} else {
				return;
			}
	},
	Conversar: function (usuarioId) {
		check(usuarioId, String);
		if (this.userId) {
				if (Conversaciones.find({usuarioId: usuarioId, userId: this.userId}).fetch().length > 0) {
					return;
				} else {
					Conversaciones.insert({
						usuarioId: usuarioId,
						userId: this.userId,
						createdAt: new Date()
					});
				}
		}
	},
	nuevaSolicitud: function (datos) {
		check(datos, Object);

		if (this.userId) {
			var id = Solicitudes.insert({
				createdAt: new Date(),
				de: this.userId,
				para: datos.para,
				aceptado: false,
				quien: datos.username
			});
			console.log(id);
		} else {
			return;
		}
	},
	aceptarSolicitud: function (solicitudId, amigoId) {
		check(solicitudId, String);
		check(amigoId, String);

		if (this.userId) {
			Solicitudes.update({_id: solicitudId}, {
				$set: {
					aceptado: true
				}
			});

			Amigos.insert({
				userId: this.userId,
				amigoId: amigoId,
				amigo: Meteor.users.findOne({_id: amigoId}).username
			});

		} else {
			return;
		}
	},
	denegarSolicitud: function (solicitudId) {
		check(solicitudId, String);

		if (this.userId) {
			Solicitudes.remove({_id: solicitudId});
		} else {
			return;
		}
	}
});
