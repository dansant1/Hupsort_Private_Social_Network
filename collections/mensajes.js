Mensajes = new Mongo.Collection('mensajes');

Mensajes.allow({
	insert: () => {
		return false;
	},
	update: () => {
		return false;
	},
	remove: () => {
		return false;
	}
});

Mensajes.deny({
	insert: () => {
		return true;
	},
	update: () => {
		return true;
	},
	remove: () => {
		return true;
	}
});

EsquemaMensajes = new SimpleSchema({
	mensaje: {
		type: String
	},
	de: {
		type: Object
	},
	'de.nombre': {
		type: String
	},
	'de.id': {
		type: String
	},
	para: {
		type: Object,
		optional: true
	},
	'para.nombre': {
		type: String,
		optional: true
	},
	'para.id': {
		type: String,
		optional: true
	},
	createdAt: {
		type: Date
	},
	global: {
		type: Boolean
	},
	color: {
		type: String,
		optional: true
	}
});

Mensajes.attachSchema(EsquemaMensajes);

// Muro
Muro = new Mongo.Collection('muro');

Muro.allow({
	insert: () => {
		return false;
	},
	update: () => {
		return false;
	},
	remove: () => {
		return false;
	}
});

Muro.deny({
	insert: () => {
		return true;
	},
	update: () => {
		return true;
	},
	remove: () => {
		return true;
	}
});

EsquemaMuro = new SimpleSchema({
	texto: {
		type: String
	},
	de: {
		type: Object
	},
	'de.nombre': {
		type: String
	},
	'de.id': {
		type: String
	},
	esYoutube: {
		type: Boolean
	},
	youtube: {
		type: String,
		optional: true
	},
	createdAt: {
		type: Date
	}
});

Muro.attachSchema(EsquemaMuro);


Colores = new Mongo.Collection('colores');

Colores.allow({
	insert: () => {
		return false;
	},
	update: () => {
		return false;
	},
	remove: () => {
		return false;
	}
});

Colores.deny({
	insert: () => {
		return true;
	},
	update: () => {
		return true;
	},
	remove: () => {
		return true;
	}
});

EsquemaColores = new SimpleSchema({
	color: {
		type: String
	},
	userId: {
		type: String
	},
	createdAt: {
		type: Date,
		optional: true
	}
});

Colores.attachSchema(EsquemaColores);


Conversaciones = new Mongo.Collection('conversaciones');

Conversaciones.allow({
	insert: () => {
		return false;
	},
	update: () => {
		return false;
	},
	remove: () => {
		return false;
	}
});

Conversaciones.deny({
	insert: () => {
		return true;
	},
	update: () => {
		return true;
	},
	remove: () => {
		return true;
	}
});

Amigos = new Mongo.Collection('amigos');

Amigos.allow({
	insert: () => {
		return false;
	},
	update: () => {
		return false;
	},
	remove: () => {
		return false;
	}
});

Amigos.deny({
	insert: () => {
		return true;
	},
	update: () => {
		return true;
	},
	remove: () => {
		return true;
	}
});


Solicitudes = new Mongo.Collection('solicitudes'); // de, para, aceptado

Solicitudes.allow({
	insert: () => {
		return false;
	},
	update: () => {
		return false;
	},
	remove: () => {
		return false;
	}
});

Solicitudes.deny({
	insert: () => {
		return true;
	},
	update: () => {
		return true;
	},
	remove: () => {
		return true;
	}
});

Comentarios = new Mongo.Collection('comentarios');
Notificaciones = new Mongo.Collection('notificaciones');
