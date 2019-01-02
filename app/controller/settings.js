'use strict';

const Controller = require('egg').Controller;

class SettingsController extends Controller {
  async index() {
    console.log('SettingsController=>index');
    this.ctx.body = await this.ctx.service.settings.index();
    this.ctx.status = 200;
  }
  async update() {
    const params = this.ctx.request.body;
    console.log('SettingsController=>update', params);
    this.ctx.body = await this.ctx.service.settings.update(params);
    this.ctx.status = 201;
  }
}

module.exports = SettingsController;
