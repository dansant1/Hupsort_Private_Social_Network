import { Template } from 'meteor/templating';

import './registro.html';


Template.registro.events({
	'submit form': function (event, template) {
		event.preventDefault();

		let datos = {
			email: template.find("[name='email']").value,
			username: template.find("[name='user']").value,
			password: template.find("[name='password']").value,
		};

		if (datos.email !== "" && datos.username !== "" &&
			datos.password !== "")
		{
      if ($('.aceptar').is(':checked')) {
        Meteor.call('crearUsuario', datos, function (err, result) {
          if (err) {
            alert('Hubo un error');

          } else {
            console.log('Bienvenido');

            Meteor.loginWithPassword(datos.email, datos.password, function (err) {
                  
                  if (err) return console.log('Error en el usuario o contraseña, intentelo nuevamente','danger');
                  swal("Te hemos enviado un email de verificación")        
                  Modal.hide('registro');
                    
            });


          }
        });
      } else {
        alert('Tienes que aceptar los terminos y condiciones')
      }


		} else {
			alert('faltan datos');
		}
	}
});
