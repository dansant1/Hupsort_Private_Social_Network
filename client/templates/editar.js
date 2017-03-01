Template.editar.events({
  'submit form': function (event, template) {
		event.preventDefault();

		let datos = {
			pais: $( "#pais option:selected" ).text(),
			genero: $( "#genero option:selected" ).text(),
      		edad: template.find("[name='edad']").value,
      		condicion: $( "#condicion option:selected" ).text(),
      		orientacion: $( "#orientacion option:selected" ).text()
		};

		if (datos.pais !== "" && datos.genero !== "" &&
		  datos.edad !== "")
		{
			Meteor.call('actualizarUsuario', datos, function (err, result) {
				if (err) {
					console.log('Hubo un error');

				} else {
					let tipo = Session.set('tipo', $( "#genero option:selected" ).text() )
          console.log(tipo);
          FlowRouter.go('/editar/avatar');

				}
			});

		} else {
			alert('Complete los datos')
		}
	}
});

Template.avatar.onRendered( () => {

  let contexto = document.getElementById('avatar').getContext("2d");

  let template = Template.instance();

  let genero = Meteor.user().profile.genero;

  template.fondo = new Image()
  template.fondo.src = '/avatares/a/fondos/1.png'
  //console.log(template.fondo);
  template.rostro = new Image()
  template.rostro.src = '/avatares/a/rostros/' + genero + '/blanco/1.png'
  template.cabello = new Image()
  template.cabello.src = '/avatares/a/rostros/' + genero + '/castanoclaro/1.png'
  template.ojo = new Image()
  template.ojo.src = '/avatares/a/ojos/' + genero + '/marronoscuro/1.png'
  template.ceja = new Image()
  template.ceja.src = '/avatares/a/cejas/' + genero + '/castanoclaro/1.png'
  template.nariz = new Image()
  template.nariz.src = '/avatares/a/narices/' + genero + '/1.png'
  template.boca = new Image()
  template.boca.src = '/avatares/a/bocas/' + genero + '/1.png'
  template.barba = new Image()
  if (genero === 'Hombre') {
    template.barba.src = '/avatares/a/barba/' + genero + '1.png'
    template.bigote = new Image()
    template.bigote.src = '/avatares/a/bigotes/' + genero + '/marronoscuro/1.png'

  }

  template.ropa = new Image()
  template.bigote.src = '/avatares/a/ropa/' + genero + '/amarillo/1.png'
  template.accesorio = new Image()
  template.bigote.src = '/avatares/a/bigotes/' + genero + '/azul/1.png'

  let cargarParte = function(name) {

    /*images[name] = new Image();
    images[name].onload = function() {
        resourceLoaded();
    }
    images[name].src = "images/" + name + ".png";*/
  }

  let charX = 245;
  let charY = 185;

  let x = charX;
  let y = charY;

  //canvas.width = canvas.width; // clears the canvas

  contexto.drawImage(template.fondo, x + 40, y - 42);
  contexto.drawImage(template.rostro, x, y);
  contexto.drawImage(template.cabello, x, y - 50);
  contexto.drawImage(template.ceja, x - 15, y - 42);
  contexto.drawImage(template.ojo, x - 10, y - 125);
  contexto.drawImage(template.nariz, x - 37, y - 138);

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

Template.avatar.events({

})
