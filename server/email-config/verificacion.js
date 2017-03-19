Accounts.emailTemplates.siteName = "Chat";
Accounts.emailTemplates.from     = "Mariella <contacto@hupsort.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "Verifica tu dirección de correo electronico";
  },
  html( user, url ) {
      SSR.compileTemplate('Bienvenido', Assets.getText('bienvenido.html'));

      var emailData = {
          emailAddress: user.emails[0].address,
          nombre: user.username,
          urlWithoutHash: url.replace( '#/', '' )
      };

      let emailAddress   = user.emails[0].address,
          urlWithoutHash = url.replace( '#/', '' ),
          supportEmail   = "contacto@hupsort.com",
          emailBody      = SSR.render('Bienvenido', emailData)//`Para verificar tu dirección de correo electronico (${emailAddress}) visita el siguiente link:\n\n${urlWithoutHash}\n\n Si no solicitaste esta verificación, por favor ignora este email. Si sientes que hubo un error, por favor contactate con nuestro equipo de soporte: ${supportEmail}.`;

      return emailBody;
  }
};
