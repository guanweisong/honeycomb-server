'use strict';
const Service = require('egg').Service;

class CaptchaService extends Service {
  async verify(params) {
    console.log('CaptchaService=>verify');
    try {
      const result = await this.app.curl('https://ssl.captcha.qq.com/ticket/verify', {
        method: 'GET',
        dataType: 'json',
        data: params,
      });
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = CaptchaService;
