'use strict';
module.exports = options => {
  return async function(ctx, next) {
    const token = ctx.cookies.get('token');
    if (token) {
      const userInfo = await ctx.service.access.verify(token);
      const user_level = userInfo.list[0].user_level;
      if (options.includes(user_level)) {
        await next();
      } else {
        ctx.status = 403;
        ctx.body = { error: '权限不足' };
      }
    } else {
      ctx.status = 403;
      ctx.body = { error: '权限不足' };
    }
  };
};
