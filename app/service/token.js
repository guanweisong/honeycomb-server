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
      this.ctx.throw(500, err);
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
      this.ctx.throw(500, err);
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
      this.ctx.throw(500, err);
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
      this.ctx.throw(500, err);
    }
  }
}

module.exports = TokenService;
