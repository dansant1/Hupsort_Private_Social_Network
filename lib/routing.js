import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        FlowRouter.go( '/' );

      } else {
        FlowRouter.go( '/editar' );

      }
    });
  }
});

FlowRouter.route('/', {
	name: 'Home',
	action(params, queryParams) {
		BlazeLayout.render('home');
	}
});

FlowRouter.route('/terminos-condiciones', {
	name: 'Home',
	action(params, queryParams) {
		BlazeLayout.render('TerminosYCondiciones');
	}
});

FlowRouter.route('/politicas-privacidad', {
	name: 'Home',
	action(params, queryParams) {
		BlazeLayout.render('PoliticasDePrivacidad');
	}
});

FlowRouter.route('/config-terms', {
	name: 'Configurar.Terminos',
	action() {
		BlazeLayout.render('ConfigTerms');
	}
});

FlowRouter.route('/editar', {
	name: 'Editar',
	action(params, queryParams) {
		BlazeLayout.render( 'cuenta', {content: 'editar'} );
	}
});

FlowRouter.route('/editar/avatar', {
	name: 'Editar.avatar',
	action(params, queryParams) {
		BlazeLayout.render( 'cuenta', {content: 'avatar'} );
	}
});


FlowRouter.route('/registrate', {
	name: 'Registrate',
	action(params, queryParams) {
		BlazeLayout.render('registro');
	}
});

FlowRouter.route('/chat', {
	name: 'Chat',
	action(params, queryParams) {
		BlazeLayout.render( 'cuenta', {content: 'chat'} );
	}
});

FlowRouter.route('/chat/:de', {
	name: 'Chat.Privado',
	action(params, queryParams) {
		BlazeLayout.render( 'cuenta', {content: 'Privado'} );
	}
});

FlowRouter.route('/chatp/:de', {
	name: 'Chat.Privados',
	action(params, queryParams) {
		BlazeLayout.render( 'cuenta', {content: 'Privados'} );
	}
});

FlowRouter.route('/privado', {
	name: 'Privado',
	action(params, queryParams) {
		BlazeLayout.render( 'cuenta', {content: 'Privado1'} );
	}
});

FlowRouter.route('/m/:user', {
	name: 'Perfil',
	action(params, queryParams) {
		BlazeLayout.render( 'cuenta', {content: 'perfil'} );
	}
});
