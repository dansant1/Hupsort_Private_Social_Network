// Definimos el storage adapter GridFS
let docStore = new FS.Store.GridFS("fotos", {
  maxTries: 3
});


// Creamos la DB para Documentos
Fotos = new FS.Collection("fotos", {
  stores: [docStore]
});

// agregamos los permisos allow/deny
Fotos.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download: function () {
    return true;
  }
});
