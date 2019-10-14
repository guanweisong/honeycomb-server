'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ 'user_level', 'user_status', 'user_name', 'user_email' ], [ 'user_name', 'user_email' ]);
    console.log('UserController=>index', conditions, params.limit, params.page, params.sortField, params.sortOrder);
    try {
      this.ctx.body = await this.ctx.service.user.index(conditions, params.limit, params.page, params.sortField, params.sortOrder);
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async create() {
    const params = this.ctx.request.body;
    console.log('UserController=>create', params);
    try {
      this.ctx.body = await this.ctx.service.user.create(params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('UserController=>destroy', id);
    try {
      this.ctx.body = await this.ctx.service.user.destroy(id);
      this.ctx.status = 204;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('UserController=>update');
    try {
      this.ctx.body = await this.ctx.service.user.update(id, params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = UserController;
