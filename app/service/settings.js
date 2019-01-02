'use strict';
const Service = require('egg').Service;

class SettingsService extends Service {
  async index() {
    console.log('SettingsService=>index');
    const result = await this.ctx.model.Settings.findOne();
    return result;
  }
  async update(params) {
    console.log('SettingsService=>update', params);
    const result = await this.ctx.model.Settings.findOneAndUpdate({}, { $set: params });
    return result;
  }
}

module.exports = SettingsService;
