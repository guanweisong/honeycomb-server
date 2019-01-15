'use strict';
module.exports = () => {
  return async function roleAuthority(ctx, next) {
    console.log(1, ctx);
    await next();
  };
};
