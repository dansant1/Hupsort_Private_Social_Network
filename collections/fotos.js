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

// Definimos el storage adapter GridFS
let docStoreavatar = new FS.Store.GridFS("avatars", {
  maxTries: 3
});


// Creamos la DB para Documentos
Avatares = new FS.Collection("avatars", {
  stores: [docStoreavatar]
});

// agregamos los permisos allow/deny
Avatares.allow({
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
