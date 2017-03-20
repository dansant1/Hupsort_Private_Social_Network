Template.ConfigTerms.onCreated(() => {
  let template = Template.instance()

  template.autorun( () => {
    template.subscribe('terminos')
    template.subscribe('politicas')
  })
})

Template.ConfigTerms.events({
  'click .gt'(e, t) {
    e.preventDefault()
    let terminos = t.find("[name='terminos']").value;

    if (terminos !== '') {
      Meteor.call('actualizarTerminos', terminos, (err) => {
        if (err) {
          alert(err)
        } else {
          alert('Terminos Y Condiciones Guardados')
        }
      })
    } else {
      alert('Complete los datos')
    }
  },
  'click .gp'(e, t) {
    e.preventDefault()
    let terminos = t.find("[name='politicas']").value;
    if (terminos !== '') {
      Meteor.call('actualizarPoliticas', terminos, (err) => {
        if (err) {
          alert(err)
        } else {
          alert('Politicas De Privacidad Guardados')
        }
      })
    } else {
      alert('Complete los datos')
    }
  },
  'click .et'(e, t) {
    let contenido = $('.e' + this._id).val();

    console.log(contenido);
    console.log(this._id);

    if (contenido !== "") {
      Meteor.call('updateTerminos', this._id, contenido, (err) => {
        if (err) {
          alert(err)
        } else {
          alert('Parrafo Actualziado')
        }
      })
    } else {
      alert('Complete los datos')
    }

  },
  'click .ep'() {
    let contenido = $('.p' + this._id).val();

    if (contenido !== "") {
      Meteor.call('updatePoliticas', this._id, contenido, (err) => {
        if (err) {
          alert(err)
        } else {
          alert('Parrafo Actualziado')
        }
      })
    } else {
      alert('Complete los datos')
    }
  }
})

Template.ConfigTerms.helpers({
  esMariella() {
    if (Meteor.user().emails[0].address === 'mariellaperedab@gmail.com') {
      return true;
    } else {
      return false;
    }
  },
  terminos() {
    return Terminos.find();
  },
  politicas() {
    return Politicas.find();
  }
})

Template.TerminosYCondiciones.onCreated(() => {
  let template = Template.instance()

  template.autorun( () => {
    template.subscribe('terminos')
  })
})

Template.TerminosYCondiciones.helpers({
  terminos() {
    return Terminos.find();
  }
})

Template.PoliticasDePrivacidad.onCreated(() => {
  let template = Template.instance()

  template.autorun( () => {
    template.subscribe('politicas')
  })
})

Template.PoliticasDePrivacidad.helpers({
  terminos() {
    return Politicas.find();
  }
})
