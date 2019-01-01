'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async index(conditions, limit = 10, page = 1) {
    console.log('UserService=>index', conditions, limit = 10, page = 1);
    const result = {};
    result.list = await this.ctx.model.User
      .find(conditions, { user_password: 0 })
      .limit(limit * 1)
      .skip((page * 1 - 1) * limit)
      .sort({ updated_at: -1 });
    result.total = await this.ctx.model.User.count(conditions);
    return result;
  }
  async create(params) {
    console.log('UserService=>create', params);
    const model = new this.ctx.model.User(params);
    const result = await model.save();
    return result;
  }
  async destroy(_id) {
    console.log('UserService=>destroy', _id);
    const result = await this.ctx.model.User.remove({ _id });
    await this.ctx.service.token.destroy(_id);
    return result;
  }
  async update(_id, params) {
    console.log('UserService=>update', _id, params);
    const result = await this.ctx.model.User.update({ _id }, { $set: params });
    if (this.ctx.request.body.user_password) {
      await this.ctx.service.token.destroy(_id);
    }
    return result;
  }
}

module.exports = UserService;
