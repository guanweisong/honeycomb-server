'use strict';
const Service = require('egg').Service;

class CaptchaService extends Service {
  async verify(params) {
    console.log('CaptchaService=>verify');
    const result = await this.app.curl('https://ssl.captcha.qq.com/ticket/verify', {
      method: 'GET',
      dataType: 'json',
      data: params,
    });
    return result;
  }
}

module.exports = CaptchaService;
