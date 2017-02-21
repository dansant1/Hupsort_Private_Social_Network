import { Template } from 'meteor/templating';

 
import './home.html';

Template.home.events({
	'click .registro': function () {
		Modal.show('registro');	
	},
	'click .login': function () {
		Modal.show('login');
	}
});