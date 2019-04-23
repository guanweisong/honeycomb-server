'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1536243315185_8968';

  config.middleware = [ 'errorHandler', 'limiter' ];

  config.limiter = {
    limit: 1000,
    unit: 'hour',
    msg: '请求过于频繁，您的IP已经被封，请1个小时后重试',
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/honeycomb',
    options: {},
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.jwt = {
    secret: '!o5sv&MXoNmiW@L@IkAR',
    expires: 2 * 60 * 60, // unit: seconds
  };

  config.cos = {
    appId: '1257715480',
    secretId: 'AKIDb60kIeD39i9PTLFkBQUO6ugHhuvml4by',
    secretKey: 'MWZR8rxxvzaFTl5xsprwyTaHKPYm2NoB',
    bucket: 'honeycomb-1257715480',
    region: 'ap-shanghai',
  };

  config.cors = {
    credentials: true,
    origin: ctx => ctx.get('origin'),
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.multipart = {
    mode: 'file',
  };

  return config;
};
