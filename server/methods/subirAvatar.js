Meteor.methods({
  storeUrlInDatabase: function( url ) {
    check( url, String );
    //Modules.both.checkUrlValidity( url );


      if (Files.find({userId: this.userId}).fetch().length > 0 ) {
        Files.update({ "url": url, "userId": Meteor.userId()}, {
          $set: {
            url: url
          }
        })
      } else {
        Files.insert({
          url: url,
          userId: Meteor.userId(),
          added: new Date()
        });
      }


  },
  storeUrlOfImageInDatabase: function( url, id ) {
    check( url, String );
    check(id, String)
        Imagenes.insert({
          url: url,
          mensajeId: id,
          userId: Meteor.userId(),
          added: new Date()
        });
  },
  storeUrlOfImageMuroInDatabase: function( url, id ) {
    check( url, String );
    check(id, String)
        ImagenesMuro.insert({
          url: url,
          pubId: id,
          userId: Meteor.userId(),
          added: new Date()
        });
  }
});
