'use strict';
const Service = require('egg').Service;

class SettingService extends Service {
  async index() {
    console.log('SettingService=>index');
    const result = await this.ctx.model.Setting.findOne();
    return result;
  }
  async update(params) {
    console.log('SettingService=>update', params);
    const result = await this.ctx.model.Setting.update({}, { $set: params }, { upsert: true });
    return result;
  }
}

module.exports = SettingService;
