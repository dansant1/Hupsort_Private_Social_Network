import { Template } from 'meteor/templating';
 
import './login.html';


Template.login.events({
	'submit form': function (event, template) {
		event.preventDefault();
		let user = template.find("[name='user']").value;
		let password = template.find("[name='password']").value;
		
			Meteor.loginWithPassword(user, password, function (err) {
            	if (err) return console.log('Error en el usuario o contraseña, intentelo nuevamente','danger');
            	Modal.hide('login');
            	FlowRouter.go('/chat');
      		});
		

	}
});