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
					console.log('Bienvenido');

          			FlowRouter.go('/editar/avatar');

				}
			});

		} else {
			console.log('faltan datos');
		}
	}
});
