Meteor.publish('muro', function (perfilId) {
    check(perfilId, String);

    if (this.userId) {
       return Muro.find({
         'de.id': perfilId
       });
    } else {
      this.stop();
      return;
    }
});

Meteor.publish('likes', function () {
    if (this.userId) {
       return Likes.find();
    } else {
      this.stop();
      return;
    }
});

Meteor.publish('comentarios', function () {
    if (this.userId) {
       return Comentarios.find();
    } else {
      this.stop();
      return;
    }
});

Meteor.publish('usuario', function () {
    if (this.userId) {
       return Meteor.users.find();
    } else {
      this.stop();
      return;
    }
});

Meteor.publish('emojis', function() {
  if (this.userId) {
    return Emojis.find();
  } else {
     this.stop();
     return;
  }

});
