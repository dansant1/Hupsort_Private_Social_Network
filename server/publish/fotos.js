Meteor.publish('fotos', function (user) {
  check(user, String);
  if (this.userId) {

    return Fotos.find({'metadata.creadorId': user, 'metadata.privado': false});
  } else {
    this.stop();
    return;
  }
});

Meteor.publish('fotosPrivado', function () {

  if (this.userId) {
    return Fotos.find({'metadata.privado': true});
  } else {
    this.stop();
    return;
  }
});

Meteor.publish('avatares', function () {

  if (this.userId) {

    return Avatares.find({});
  } else {
    this.stop();
    return;
  }
});

Meteor.publish( 'files', function(){
  var data = Files.find();

  if ( data ) {
    return data;
  }

  return this.ready();
});

Meteor.publish( 'imagenes', function(){
  var data = Imagenes.find();

  if ( data ) {
    return data;
  }

  return this.ready();
});


Meteor.publish( 'imagenesMuro', function(){
  var data = ImagenesMuro.find();

  if ( data ) {
    return data;
  }

  return this.ready();
});
