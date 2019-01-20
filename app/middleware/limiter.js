'use strict';

const RateLimiter = require('limiter').RateLimiter;

module.exports = options => {
  const rateLimiter = new RateLimiter(options.limit, options.unit, true);
  return async function(ctx, next) {
    if (rateLimiter.tryRemoveTokens(1)) {
      await next();
    } else {
      ctx.body = { error: options.msg };
      ctx.status = 403;
    }
  };
};
