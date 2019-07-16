'use strict';
const Service = require('egg').Service;

class SettingService extends Service {
  async index() {
    console.log('SettingService=>index');
    try {
      const result = await this.ctx.model.Setting.findOne();
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async update(params) {
    console.log('SettingService=>update', params);
    try {
      const result = await this.ctx.model.Setting.update({}, {$set: params}, {upsert: true});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = SettingService;
