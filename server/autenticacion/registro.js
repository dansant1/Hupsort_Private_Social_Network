Meteor.methods({
	crearUsuario: function (datos)  {

		check(datos, {
			email: String,
			username: String,
			password: String
		});

		let usuarioId = Accounts.createUser(datos);


		if (usuarioId) {
			Accounts.sendVerificationEmail( usuarioId );

			Meteor.defer( () => {
				/*Email.send({
				  to: datos.email,
				  from: 'mariellaperedab@gmail.com',
				  subject: "Bienvenido a Hupsort",
				  html:
				});*/
			})

			Roles.addUsersToRoles(usuarioId, ['usuario'], 'chat');

		} else {
			return
		}

	}
});
