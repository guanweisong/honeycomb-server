'use strict';
const Service = require('egg').Service;

class TagService extends Service {
  async index(conditions, limit = 10, page = 1) {
    console.log('TagService=>index', conditions, limit, page);
    const result = {};
    result.list = await this.ctx.model.Tag
      .find(conditions)
      .limit(limit * 1)
      .skip((page * 1 - 1) * limit)
      .sort({ updated_at: -1 });
    result.total = await this.ctx.model.Tag.count(conditions);
    return result;
  }
  async create(params) {
    console.log('TagService=>create', params);
    const model = new this.ctx.model.Tag({...params, created_at: Date.now()});
    const result = await model.save();
    return result;
  }
  async destroy(_id) {
    console.log('TagService=>destroy', _id);
    const result = await this.ctx.model.Tag.remove({ _id });
    return result;
  }
  async update(_id, params) {
    console.log('TagService=>update', _id, params);
    const result = await this.ctx.model.Tag.update({ _id }, { $set: params });
    return result;
  }
}

module.exports = TagService;
