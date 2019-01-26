'use strict';
const Service = require('egg').Service;

class TokenService extends Service {
  async index(userId = null, token = null) {
    console.log('TokenService=>index');
    const conditions = {};
    !!userId && (conditions.user_id = userId);
    !!token && (conditions.token_content = token);
    const result = await this.ctx.model.Token.find(conditions);
    return result;
  }
  async create(userId = null, token = null) {
    console.log('TokenService=>create');
    const conditions = {};
    !!userId && (conditions.user_id = userId);
    !!token && (conditions.token_content = token);
    conditions.created_at = Date.now(); // 补丁：该处model生成的时间会是服务端启动时间，造成bug
    const model = new this.ctx.model.Token(conditions);
    const result = await model.save();
    return result;
  }
  async destroy(userId = null, token = null) {
    console.log('TokenService=>destroy');
    const conditions = {};
    !!userId && (conditions.user_id = userId);
    !!token && (conditions.token_content = token);
    const result = await this.ctx.model.Token.remove(conditions);
    return result;
  }
  async update(token = null) {
    console.log('TokenService=>update');
    const conditions = {};
    !!token && (conditions.token_content = token);
    const result = await this.ctx.model.Token.update(conditions, { $set: {} });
    return result;
  }
}

module.exports = TokenService;
