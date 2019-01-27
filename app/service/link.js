'use strict';
const Service = require('egg').Service;

class LinkService extends Service {
  async index(conditions, limit = 10, page = 1) {
    console.log('LinkService=>index', conditions, limit, page);
    const result = {};
    result.list = await this.ctx.model.Link
      .find(conditions)
      .limit(limit * 1)
      .skip((page * 1 - 1) * limit)
      .sort({ updated_at: -1 });
    result.total = await this.ctx.model.Link.count(conditions);
    return result;
  }
  async create(params) {
    console.log('LinkService=>create', params);
    const model = new this.ctx.model.Link({...params, created_at: Date.now()});
    const result = await model.save();
    return result;
  }
  async destroy(_id) {
    console.log('LinkService=>destroy', _id);
    const result = await this.ctx.model.Link.remove({ _id });
    return result;
  }
  async update(_id, params) {
    console.log('LinkService=>update', _id, params);
    const result = await this.ctx.model.Link.update({ _id }, { $set: params });
    return result;
  }
}


module.exports = LinkService;
