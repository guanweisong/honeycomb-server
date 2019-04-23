'use strict';
const Service = require('egg').Service;

class TagService extends Service {
  async index(conditions, limit = 10, page = 1) {
    console.log('TagService=>index', conditions, limit, page);
    try {
      const result = {};
      result.list = await this.ctx.model.Tag
        .find(conditions)
        .limit(limit * 1)
        .skip((page * 1 - 1) * limit)
        .sort({updated_at: -1});
      result.total = await this.ctx.model.Tag.count(conditions);
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '读取标签列表失败');
    }
  }
  async create(params) {
    console.log('TagService=>create', params);
    const model = new this.ctx.model.Tag({...params, created_at: Date.now()});
    try {
      const result = await model.save();
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '创建标签失败');
    }
  }
  async destroy(_id) {
    console.log('TagService=>destroy', _id);
    try {
      const result = await this.ctx.model.Tag.remove({_id});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '删除标签失败');
    }
  }
  async update(_id, params) {
    console.log('TagService=>update', _id, params);
    try {
      const result = await this.ctx.model.Tag.update({_id}, {$set: params});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '更新标签失败');
    }
  }
}

module.exports = TagService;
