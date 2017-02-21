Meteor.publish('usuarios', function () {
	if (this.userId) {
		return Meteor.users.find();
	} else {
		this.stop();
		return;
	}
});

Meteor.publish('solicitudes', function () {
	if (this.userId) {
		this.ready();
		return Solicitudes.find({para: this.userId, aceptado: false});
	} else {
		this.stop();
		return;
	}
});

Meteor.publish('amigos', function () {
	if (this.userId) {
		return Amigos.find();
	} else {
		this.stop();
		return;
	}
});

Meteor.publish('amigosDe', function (perfilId) {
	if (this.userId) {
		return Amigos.find({userId: perfilId});
	} else {
		this.stop();
		return;
	}
});