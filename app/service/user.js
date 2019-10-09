'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async index(conditions, limit = 10, page = 1) {
    console.log('UserService=>index', conditions, limit = 10, page = 1);
    try {
      const result = {};
      result.list = await this.ctx.model.User
        .find(conditions, { user_password: 0 })
        .limit(limit * 1)
        .skip((page * 1 - 1) * limit)
        .sort({ updated_at: -1 });
      result.total = await this.ctx.model.User.count(conditions);
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async create(params) {
    console.log('UserService=>create', params);
    try {
      const model = new this.ctx.model.User({...params, created_at: Date.now()});
      const result = await model.save();
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async destroy(_id) {
    console.log('UserService=>destroy', _id);
    try {
      const item = await this.ctx.model.User.findOne({ _id });
      if (item.user_level === 1) {
        this.ctx.throw(403, '无法删除管理员');
      }
      const result = await this.ctx.model.User.update({_id}, {$set: { user_status : -1 }});
      await this.ctx.service.token.destroy(_id);
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async update(_id, params) {
    console.log('UserService=>update', _id, params);
    try {
      const item = await this.ctx.model.User.findOne({_id});
      if (item.user_level === 1 && (parseInt(params.user_status, 10) !== item.user_status || parseInt(params.user_level, 10) !== item.user_level)) {
        this.ctx.throw(403, '无法修改管理员的等级或状态');
      }
      const result = await this.ctx.model.User.update({_id}, {$set: params});
      if (this.ctx.request.body.user_password) {
        await this.ctx.service.token.destroy(_id);
      }
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = UserService;
