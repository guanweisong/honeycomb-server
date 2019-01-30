'use strict';
module.exports = () => {
  return async function(ctx, next) {
    const captcha = ctx.request.body.captcha;
    if (captcha) {
      const result = await ctx.service.captcha.verify({
        Randstr: captcha.randstr,
        Ticket: captcha.ticket,
        aid: 2090829333,
        AppSecretKey: '0UamqEBSdPAIx-mzPd2n0kg**',
        UserIP: ctx.request.ip,
      });
      if (result.status === 200 && result.data.response === '1') {
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
