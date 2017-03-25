import { Template } from 'meteor/templating';

import './cuenta.html';

function Sound(source,volume,loop)
{
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    var son;
    this.son=son;
    this.finish=false;
    this.stop=function()
    {
        document.body.removeChild(this.son);
    }
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("embed");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("hidden","true");
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autostart","true");
        this.son.setAttribute("loop",this.loop);
        document.body.appendChild(this.son);
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish=true;
    }
    this.init=function(volume,loop)
    {
        this.finish=false;
        this.volume=volume;
        this.loop=loop;
    }
}

Template.cuenta.events({
  'click .abrir-buscador'() {
    Modal.show('ModalBuscador')
  },
	'click .logout': function () {
		Meteor.logout();
		FlowRouter.go('/');
	},
  'click .aceptar': function () {
    Meteor.call('aceptarSolicitud', this._id, this.de, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('listo');
      }
    });
  },
  'click .denegar': function () {
    console.log(this._id);
    Meteor.call('denegarSolicitud', this._id, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('eliminado');
      }
    });
  }
});

function sonar () {
   //Create the audio tag
var soundFile = document.createElement("audio");
soundFile.preload = "auto";

Session.set('sound', '/n')

var fileName = "/n"

//Load the sound file (using a source element for expandability)
var src = document.createElement("source");
src.src = fileName + ".mp3";
soundFile.appendChild(src);

//Load the audio tag
//It auto plays as a fallback
soundFile.load();
soundFile.volume = 1.000000;
soundFile.play();

//Plays the sound
function play() {
   //Set the current time for the audio file to the beginning
   soundFile.currentTime = 0.01;
   soundFile.volume = volume;

   //Due to a bug in Firefox, the audio needs to be played after a delay
   setTimeout(function(){soundFile.play();},1);
}
}

Template.cuenta.onCreated(function () {
    var self = this;

    self.autorun(function () {
      self.subscribe('usuarios');
      self.subscribe('solicitudes', function () {


      });
      self.subscribe('notificaciones')

      var s = Solicitudes.find({para: Meteor.userId(), aceptado: false}).fetch().length;

      if (s > 0) {
        sonar();
      }
    });
});


Template.cuenta.helpers({
  notificaciones() {
    return Notificaciones.find({}, {sort: {createdAt: -1}})
  },
  yo() {
    return Meteor.userId()
  },
  solicitudes: function () {
    return Solicitudes.find();
  },
  HaySolicitudes: function () {
    var s = Solicitudes.find({para: Meteor.userId(), aceptado: false}).fetch().length;
    if (Solicitudes.find({para: Meteor.userId(), aceptado: false}).fetch().length > 0 ) {
      console.log(s);
      return true;
    } else {
      return false;
    }
  },
  cantidadSolicitudes: function () {

    return Solicitudes.find({para: Meteor.userId(), aceptado: false}).fetch().length;
  }
});
