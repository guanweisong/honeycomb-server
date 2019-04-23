'use strict';

const Controller = require('egg').Controller;

class SettingController extends Controller {
  async index() {
    console.log('SettingController=>index');
    try {
      this.ctx.body = await this.ctx.service.setting.index();
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '读取设置信息失败');
    }
  }
  async update() {
    const params = this.ctx.request.body;
    console.log('SettingController=>update', params);
    try {
      this.ctx.body = await this.ctx.service.setting.update(params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '更新设置信息失败');
    }
  }
}

module.exports = SettingController;
