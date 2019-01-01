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
    const token = await this.ctx.service.access.login(conditions);
    this.ctx.set('Access-Control-Allow-Credentials', true);
    this.ctx.cookies.set('token', token, {
      expires: new Date('2199-12-31'),
    });
    this.ctx.status = 200;
  }
  async logout() {
    const params = this.ctx.request.body;
    console.log('AccessController=>logout');
    this.ctx.body = await this.ctx.service.access.logout(params.id, params.token);
    this.ctx.cookies.set('token', null);
    this.ctx.status = 204;
  }
  async verify() {
    console.log('AccessController=>verify');
    const token = this.ctx.cookies.get('token');
    if (token) {
      this.ctx.body = await this.ctx.service.access.verify(token);
      this.ctx.status = 200;
    } else {
      this.ctx.status = 204;
    }
  }
}

module.exports = AccessController;
