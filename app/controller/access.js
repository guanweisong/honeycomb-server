'use strict';

const Controller = require('egg').Controller;

class AccessController extends Controller {
  async login() {
    const param = this.ctx.request.body;
    const conditions = {
      user_name: param.username,
      user_password: param.password,
    };
    console.log('AccessController=>login');
    try {
      const token = await this.ctx.service.access.login(conditions);
      this.ctx.set('Access-Control-Allow-Credentials', true);
      this.ctx.cookies.set('token', token, {
        expires: new Date('2199-12-31'),
      });
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async logout() {
    const params = this.ctx.request.body;
    console.log('AccessController=>logout');
    try {
      this.ctx.body = await this.ctx.service.access.logout(params.id, params.token);
      this.ctx.cookies.set('token', null);
      this.ctx.status = 204;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async verify() {
    console.log('AccessController=>verify');
    const token = this.ctx.cookies.get('token');
    if (token) {
      try {
        this.ctx.body = await this.ctx.service.access.verify(token);
        this.ctx.status = 200;
      } catch (err) {
        this.ctx.logger.error(new Error(err));
        this.ctx.throw(500, err);
      }
    } else {
      this.ctx.status = 204;
    }
  }
}

module.exports = AccessController;
