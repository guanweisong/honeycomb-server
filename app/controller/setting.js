'use strict';

const Controller = require('egg').Controller;

class SettingController extends Controller {
  async index() {
    console.log('SettingController=>index');
    this.ctx.body = await this.ctx.service.setting.index();
    this.ctx.status = 200;
  }
  async update() {
    const params = this.ctx.request.body;
    console.log('SettingController=>update', params);
    this.ctx.body = await this.ctx.service.setting.update(params);
    this.ctx.status = 201;
  }
}

module.exports = SettingController;
