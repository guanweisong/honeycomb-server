'use strict';
const Service = require('egg').Service;

class PageService extends Service {
  async index(conditions, limit = 10, page = 1, exception = { page_content: 0 }) {
    console.log('PageService=>index');
    if (typeof conditions._id !== 'undefined') {
      exception = {};
    }
    const result = {};
    result.list = await this.ctx.model.Page
      .find(conditions, exception)
      .populate('page_author', 'user_name')
      .limit(limit * 1)
      .skip((page * 1 - 1) * limit)
      .sort({ updated_at: -1 });
    result.total = await this.ctx.model.Page.count(conditions);
    return result;
  }
  async create(params) {
    console.log('PageService=>create');
    const model = new this.ctx.model.Page({...params, created_at: Date.now()});
    const result = await model.save();
    return result;
  }
  async destroy(_id) {
    console.log('PageService=>destroy', _id);
    const result = await this.ctx.model.Page.remove({ _id });
    return result;
  }
  async update(_id, params) {
    console.log('PageService=>update', _id, params);
    const result = await this.ctx.model.Page.update({ _id }, { $set: params });
    return result;
  }
}

module.exports = PageService;
