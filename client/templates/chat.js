import { Template } from 'meteor/templating';

import './chat.html';


// Return all youtube links from text content
function youtubelinks(parent, children) {
    // Initialize
    var results = [];
    // Loop through youtube regular expressions array
    $.each($(parent).find(children), function(index, value) {
        // Match elements containg youtube urls
        var match = $(this).text().match(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/);
        if(match != null) {
            // Add matched URL to results
            results.push(match);
        }
    });
    // Return our links
    return results;
}

// Get results example usage
var ytlinks = youtubelinks('#anothercontainer', 'div, li');
$.each(ytlinks, function(index, value) {
    console.log(value[0]);
});

Template.listaDeUsuariosConectados.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('usuarios');
	});
});

Template.listaDeUsuariosConectados.helpers({
	usuarios: function () {
		return Meteor.users.find({});
	}
});

function gotoBottom(id){
   var div = document.getElementById(id);
   div.scrollTop = div.scrollHeight - div.clientHeight;
}

Template.mensajes.onRendered( function () {
	$('#cp2').colorpicker();
   	setTimeout(function () {
      gotoBottom("mensajes3")
   	}, 1000);

   	$("input.message").mention({
        delimiter: '@',
        users: Meteor.users.find().fetch()
    });

    $('#input-default').emojiPicker();


});

Template.mensajes.onCreated( function () {
	var self = this;

	self.autorun(function () {
		self.subscribe('mensajes');
    	//self.subscribe('emojis');
    	self.subscribe('colores');
      	self.subscribe('usuarios');
      	self.subscribe('conversaciones');
	});

  Session.set('conversaId', undefined);
});

Template.mensajes.events({
	'click .enviar': function (event, template) {
		event.preventDefault();

		let mensaje = template.find("[name='mensaje']").value
		let color = $('#color').val();

		console.log(color);

		if (color === "") {
			color = '#000';
		} 

		console.log(color);

		if (mensaje !== "") {
			Meteor.call('enviarMensajeChat', mensaje, color, function (err, result) {
				if (err) {
					console.log('Hubo un error');
				} else {
					template.find("[name='mensaje']").value = "";
          			gotoBottom("mensajes3")
				}
			});
		}
	},
	'keyup [name="mensaje"]': function (event, template) {

		event.preventDefault();

		if (event.which == 13 || event.which == 27) {


			let mensaje = template.find("[name='mensaje']").value
			let color = $('#color').val();
      console.log(color);
			if (mensaje !== "") {
				Meteor.call('enviarMensajeChat', mensaje, color, function (err, result) {
					if (err) {
						console.log('Hubo un error');
					} else {
						template.find("[name='mensaje']").value = "";
            gotoBottom("mensajes3")
					}
				});
			}
		}
	}
});

Template.mensajesUnicos.onCreated(function () {
  var self = this;

	self.autorun(function () {
    let de = Session.get('conversa');
		self.subscribe('mensajesDirectos', de);
    	//self.subscribe('emojis');
		self.subscribe('fotosPrivado');
	});


});

Template.mensajesUnicos.onRendered(function () {
  setTimeout(function () {
     gotoBottom("mensajes4")
  }, 1000);
});


Template.mensajesUnicos.helpers({
  mensajes: function () {
    return Mensajes.find({
      $or: [ { 'de.id': Meteor.userId(), 'para.id': de }, { 'de.id': de, 'para.id': Meteor.userId() } ]
    });
	},
  quien: function () {
    if (this.de.id === Meteor.userId()) {
      return 'Tú'
    } else {
      return this.de.nombre;
    }
  },
	fotos: function () {
		let mensajeId = this._id;
		return Fotos.find({'metadata.mensajeId': mensajeId});
	}
});

Template.mensajesUnicos.events({
	'click .enviar': function (event, template) {
		event.preventDefault();

		let mensaje = template.find("[name='mensaje']").value
		let para = {
      id: Session.get('conversa')
    };

		if (mensaje !== "") {
			Meteor.call('enviarMensajePrivado', mensaje, para, function (err, result) {
				if (err) {
					console.log('Hubo un error');
				} else {
					template.find("[name='mensaje']").value = "";
          gotoBottom("mensajes4")
				}
			});
		}
	},
  'keyup [name=mensaje]': function (event, template) {

		if ( event.which == 13 || event.which == 27 ) {
      let mensaje = template.find("[name='mensaje']").value
  		let para = {
        id: Session.get('conversa')
      };
			Meteor.call('enviarMensajePrivado', mensaje, para, function (err, result) {
				if (err) {
					console.log('Hubo un error');
				} else {
					template.find("[name='mensaje']").value = "";
          gotoBottom("mensajes4")
				}
			});
		}
  }
});


Template.mensajes.helpers({
	mensajes: function () {
		return Mensajes.find({});
	},
	colores: function () {
    if (Colores.findOne({userId: Meteor.userId() }).color === undefined) {
      return "black";
    } else {
      console.log(Colores.findOne({userId: Meteor.userId() }).color);
      return Colores.findOne({userId: Meteor.userId() }).color;
    }
	},
  conversaciones: function () {
    return Conversaciones.find({},  {limit: 5});
  },
  username: function (userId) {
    return Meteor.users.findOne({_id: userId}).username;
  }
});
