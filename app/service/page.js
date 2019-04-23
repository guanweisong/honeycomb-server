'use strict';
const Service = require('egg').Service;

class PageService extends Service {
  async index(conditions, limit = 10, page = 1, exception = { page_content: 0 }) {
    console.log('PageService=>index');
    if (typeof conditions._id !== 'undefined') {
      exception = {};
    }
    try {
      const result = {};
      result.list = await this.ctx.model.Page
        .find(conditions, exception)
        .populate('page_author', 'user_name')
        .limit(limit * 1)
        .skip((page * 1 - 1) * limit)
        .sort({updated_at: -1});
      result.total = await this.ctx.model.Page.count(conditions);
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '读取页面列表失败');
    }
  }
  async create(params) {
    console.log('PageService=>create');
    const model = new this.ctx.model.Page({...params, created_at: Date.now()});
    try {
      const result = await model.save();
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '创建页面失败');
    }
  }
  async destroy(_id) {
    console.log('PageService=>destroy', _id);
    try {
      const result = await this.ctx.model.Page.remove({_id});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '删除页面失败');
    }
  }
  async update(_id, params) {
    console.log('PageService=>update', _id, params);
    try {
      const result = await this.ctx.model.Page.update({_id}, {$set: params});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '更新页面失败');
    }
  }
}

module.exports = PageService;
