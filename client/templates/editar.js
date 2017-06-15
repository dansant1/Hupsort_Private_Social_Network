
function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

Template.editar.events({
  'click #datetimepicker'() {
    
    $('#datetimepicker').datetimepicker({format: 'DD/MM/YYYY'});
  },
  'submit form': function (event, template) {
		event.preventDefault();

		let datos = {
			pais: $( "#pais option:selected" ).text(),
			genero: $( "#genero option:selected" ).text(),
      edad: template.find("[name='edad']").value,
      condicion: $( "#condicion option:selected" ).text(),
      orientacion: $( "#orientacion option:selected" ).text()
		}

		if (datos.pais !== "" && datos.genero !== "" &&
		  datos.edad !== "")
		{
			Meteor.call('actualizarUsuario', datos, function (err, result) {
				if (err) {
					console.log(err)

				} else {
					let tipo = Session.set('tipo', $( "#genero option:selected" ).text() )
          
          FlowRouter.go('/editar/avatar');

				}
			});

		} else {
			alert('Complete los datos')
		}
	}
})

Template.editar.helpers({
  estaVerificado() {
    let verficado = Meteor.user().emails[0].verified

    if (verficado) {
      return true
    } 

    return false
  }
})

Template.chat.helpers({
  estaVerificado() {
    let verficado = Meteor.user().emails[0].verified

    if (verficado) {
      return true
    } 

    return false
  }
})

Template.Privados.helpers({
  estaVerificado() {
    let verficado = Meteor.user().emails[0].verified

    if (verficado) {
      return true
    } 

    return false
  }
})

Template.mensajes.helpers({
  estaVerificado() {
    let verficado = Meteor.user().emails[0].verified

    if (verficado) {
      return true
    } 

    return false
  }
})

Template.perfil.helpers({
  estaVerificado() {
    let verficado = Meteor.user().emails[0].verified

    if (verficado) {
      return true
    } 

    return false
  }
})



Template.avatar.onCreated(function () {
  var self = this;

	self.autorun(function () {
        self.subscribe('avatares');
	});
})

Template.avatar.helpers({
  isMobile() {
    if( detectmob() ) {
      return true
    } else {
      return false
    }
  }
})

Template.avatar.onRendered( () => {

  let canva = document.getElementById('avatar');

  let contexto = document.getElementById('avatar').getContext("2d");

  let template = Template.instance();

  let genero = Meteor.user().profile.genero;

  let totalPartes = 7;
  let numeroRecursoCargados = 0;
  let fps = 30;

  template.fondo = new Image();
  template.fondo.onload = function() {
      resourceLoaded();
  }
  template.fondo.src = '/avatares/a/blank.png'

  template.expresion = new Image();
  template.expresion.onload = function() {
      resourceLoaded();
  }
  template.expresion.src = '/avatares/a/blank.png';

  template.rostro = new Image()
  template.rostro.onload = function() {
      resourceLoaded();
  }
  template.rostro.src = '/avatares/a/rostros/' + genero + '/blanco/1.png'
  template.cabello = new Image()
  template.cabello.onload = function() {
      resourceLoaded();
  }
  template.cabello.src = '/avatares/a/cabello/' + genero + '/negro/1.png'
  template.ojo = new Image()
  template.ojo.onload = function() {
      resourceLoaded();
  }
  template.ojo.src = '/avatares/a/ojos/' + genero + '/marronoscuro/1.png'
  template.ceja = new Image()
  template.ceja.onload = function() {
      resourceLoaded();
  }
  template.ceja.src = '/avatares/a/cejas/' + genero + '/castanoclaro/1.png'
  template.nariz = new Image()
  template.nariz.onload = function() {
      resourceLoaded();
  }
  template.nariz.src = '/avatares/a/narices/' + genero + '/6.png'
  template.boca = new Image()
  template.boca.onload = function() {
      resourceLoaded();
  }



  if (genero === 'Hombre') {
    template.boca.src = '/avatares/a/bocas/' + genero + '/2.png'
    template.barba = new Image()
    template.barba.onload = function() {
        resourceLoaded();
    }
    template.barba.src = undefined; //'/avatares/a/barba/' + genero + '1.png'

    template.bigote = new Image()
    template.bigote.onload = function() {
        resourceLoaded();
    }
    template.bigote.src = undefined; //'/avatares/a/bigotes/' + genero + '/marronoscuro/1.png'

  } else {
    template.boca.src = '/avatares/a/bocas/' + genero + '/naranja/2.png'
  }

  template.ropa = new Image()
  template.ropa.onload = function() {
      resourceLoaded();
  }
  template.ropa.src = '/avatares/a/ropa/' + genero + '/amarillo/1.png'
  template.accesorio = new Image()
  template.accesorio.onload = function() {
      resourceLoaded();
  }
  template.accesorio.src = '/avatares/a/blank.png'; //'/avatares/a/accesorios/' + genero + '/azul/1.png'

  function resourceLoaded() {

    numeroRecursoCargados += 1;
    if(numeroRecursoCargados === totalPartes) {
      setInterval(redraw, 1000 / fps);
    }
  }

  let charX = 400;
  let charY = 400;

  function redraw() {

    let x = charX;
    let y = charY;

    contexto.canvas.width = 360; //contexto.canvas.width; // clears the canvas
    contexto.canvas.height = 500;
    contexto.drawImage(template.fondo, 40, 0);

    contexto.drawImage(template.rostro, 0, 0);
    contexto.drawImage(template.expresion, 0, 0);
    contexto.drawImage(template.ceja, 0, 0);
    contexto.drawImage(template.cabello, 0, 0);

    contexto.drawImage(template.boca, 0, 0);

    contexto.drawImage(template.ojo, 0, 0);
    contexto.drawImage(template.accesorio, 0, 0);
    contexto.drawImage(template.nariz, 0, 0);

    contexto.drawImage(template.ropa, 0, 0);


    if (genero === 'Hombre') {
      contexto.drawImage(template.barba, 0, 0);
      contexto.drawImage(template.bigote, 0, 0);
    }
  }

  function dlCanvas() {
    let doc = canva.toDataURL('img/png');

    canva.toBlob(function(file) {
      const uploader = new Slingshot.Upload( "uploadToAmazonS3" );

      uploader.send( file, ( error, url ) => {
        if ( error ) {
          //Bert.alert( error.message, "warning" );
          _setPlaceholderText();
        } else {
          Meteor.call( "storeUrlInDatabase", url, ( error ) => {
            if ( error ) {
              //Bert.alert( error.reason, "warning" );
              //_setPlaceholderText();
              console.log(error)
            } else {
              console.log('subio!')
              //Bert.alert( "File uploaded to Amazon S3!", "success" );
              //_setPlaceholderText();
            }
          });
        }
      });
      //uploader.send(blob, function(error, downloadUrl) {/*...*/}) ;
    });
    console.log('guardar');
    let d = new FS.File(doc);
    d.name('avatar');
    d.metadata = {
      userId: Meteor.userId(),
    };
    //doc.metadata.userId = Meteor.userId();
    if ( Avatares.find({'metadata.userId': Meteor.userId()}).fetch().length > 0 ) {
      let i = Avatares.find({'metadata.userId': Meteor.userId()}).fetch()[0]._id
      Avatares.remove({_id: i});
      Avatares.insert(d, function (err, fileObj) {
        if (err) {
          alert('Hubo un problema', 'warning');
        } else {
          FlowRouter.go('/chat')
        }
      });
    } else {
      Avatares.insert(d, function (err, fileObj) {
        if (err) {
          alert('Hubo un problema', 'warning');
        } else {
          FlowRouter.go('/chat')
        }
      });
    }



  }

  document.getElementById("save-avatar").addEventListener('click', dlCanvas, false);

})

Template.avatar.events({
  'click .fondos'(e, t) {

    t.fondo.src = e.target.src;
  },
  'click .rostros'(e, t) {

    t.rostro.src = e.target.src;
  },
  'click .cabellos'(e, t) {
    t.cabello.src = e.target.src;
    //console.log(e.target.src);
  },
  'click .ojos'(e, t) {
    t.ojo.src = e.target.src;
  },
  'click .expresiones'(e, t) {
    t.expresion.src = e.target.src;
  },
  'click .cejas'(e, t) {
    t.ceja.src = e.target.src;
  },
  'click .narices'(e, t) {
    t.nariz.src = e.target.src;
  },
  'click .bocas'(e, t) {
    t.boca.src = e.target.src;
  },
  'click .ropa'(e, t) {
    //console.log(e.target.src);
    t.ropa.src = e.target.src;
  },
  'click .accesorios'(e, t) {
    t.accesorio.src = e.target.src;
  },
  'click .barba'(e, t) {
    t.barba.src = e.target.src;
  },
  'click .bigotes'(e, t) {
    t.bigote.src = e.target.src;
  }
})

Template.avatar.helpers({
  tipo() {
    return Meteor.user().profile.genero
  },
  esMujer() {
    if (Meteor.user().profile.genero === 'Mujer') {
      return true
    } else {
      return false
    }
  },
  esHombre() {
    if (Meteor.user().profile.genero === 'Hombre') {
      return true
    } else {
      return false
    }
  }
});
