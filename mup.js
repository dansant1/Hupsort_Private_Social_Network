module.exports = {
  servers: {
    one: {
      host: '104.236.121.204',
      username: 'root',
      pem: '~/.ssh/id_rsa',
      // password: 'password',
      // or leave blank to authenticate using ssh-agent
      // opts: {
      //     port: 22,
      // },
    }
  },

  meteor: {
    name: 'Hupsort',
    path: '~/desktop/daniel/chat-updated',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true, // skip building mobile apps, but still build the web.cordova architecture
      debug: true,
      cleanAfterBuild: true, // default
    },
    env: {
      // PORT: 8000, // useful when deploying multiple instances (optional)
      ROOT_URL: 'http://www.hupsort.com', // If you are using ssl, this needs to start with https
      MONGO_URL: 'mongodb://admin:admin@ds137360.mlab.com:37360/hupsort'
    },
    deployCheckWaitTime: 60, // default 10
    deployCheckPort: 3000,
    enableUploadProgressBar: true
  }
};
