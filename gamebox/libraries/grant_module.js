var Grant = require('grant-express');

var grant = new Grant({
    server: {
        host: 'localhost:3000',
        protocol: 'http'
    },
    facebook: {
        key: '137459620243698',
        secret: '3ed3316be669708ad23aaa64f0787dc0',
        callback: '/site/callback',
    },
    google: {
        key: '535555503630-4064t3rh33ev4c0c32flv1v06ott8rg1.apps.googleusercontent.com',
        secret: 'ivJUJGfVE0Z4xDyjhE7PSHTs',
        callback: '/site/callback',
        scope: ['email'],
    },
    github: {
        key: '287d6e1ae7f6716bc157',
        secret: '01712ee2c7c3a5d080f89ba5c8c210a5649f8879',
        callback: '/site/callback',
    },
    linkedin: {
        key: '81azktty1ka21j',
        secret: 'A38gxpKpfNyyj9Rp',
        callback: '/site/callback',
    },
});

module.exports = grant;