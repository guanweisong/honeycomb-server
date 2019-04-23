'use strict';
const Service = require('egg').Service;

class TokenService extends Service {
  async index(userId = null, token = null) {
    console.log('TokenService=>index');
    const conditions = {};
    !!userId && (conditions.user_id = userId);
    !!token && (conditions.token_content = token);
    try {
      const result = await this.ctx.model.Token.find(conditions);
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, 'TOKEN查询失败');
    }
  }
  async create(userId = null, token = null) {
    console.log('TokenService=>create');
    const conditions = {};
    !!userId && (conditions.user_id = userId);
    !!token && (conditions.token_content = token);
    conditions.created_at = Date.now();
    const model = new this.ctx.model.Token(conditions);
    try {
      const result = await model.save();
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, 'TOKEN创建失败');
    }
  }
  async destroy(userId = null, token = null) {
    console.log('TokenService=>destroy');
    const conditions = {};
    !!userId && (conditions.user_id = userId);
    !!token && (conditions.token_content = token);
    try {
      const result = await this.ctx.model.Token.remove(conditions);
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, 'TOKEN删除失败');
    }
  }
  async update(token = null) {
    console.log('TokenService=>update');
    const conditions = {};
    !!token && (conditions.token_content = token);
    try {
      const result = await this.ctx.model.Token.update(conditions, {$set: {}});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, 'TOKEN更新失败');
    }
  }
}

module.exports = TokenService;
