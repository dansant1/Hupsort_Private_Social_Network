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
  }
})

Template.ConfigTerms.helpers({
  esMariella() {
    if (Meteor.user().emails[0].address === 'mariellaperedab@gmail.com') {
      return true;
    } else {
      return false;
    }
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
