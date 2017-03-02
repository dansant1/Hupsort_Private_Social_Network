Meteor.methods({
	crearUsuario: function (datos)  {

		check(datos, {
			email: String,
			username: String,
			password: String
		});

		let usuarioId = Accounts.createUser(datos);


		if (usuarioId) {
			Meteor.defer( function () {
				Accounts.sendVerificationEmail( usuarioId );
			})


			Roles.addUsersToRoles(usuarioId, ['usuario'], 'chat');

		} else {
			return
		}

	}
});
