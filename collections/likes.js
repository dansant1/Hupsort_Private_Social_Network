Likes = new Mongo.Collection('likes');

Likes.allow({
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

Likes.deny({
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

EsquemaLikes = new SimpleSchema({
	de: {
		type: Object
	},
	'de.nombre': {
		type: String
	},
	'de.id': {
		type: String
	},
  pubId: {
    type: String
  },
	createdAt: {
		type: Date
	}
});

Likes.attachSchema(EsquemaLikes);
