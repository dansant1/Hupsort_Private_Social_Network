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
          urlWithoutHash: url.replace( '#/', '' ),
          absoluteUrl: Meteor.absoluteUrl('/')
      }

      let emailAddress   = user.emails[0].address,
          urlWithoutHash = url.replace( '#/', '' ),
          supportEmail   = "contacto@hupsort.com",
          emailBody      = SSR.render('Bienvenido', emailData)
      return emailBody;
  }
};
