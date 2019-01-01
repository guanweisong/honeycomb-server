'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ 'user_level', 'user_status' ], [ 'user_name', 'user_email' ]);
    console.log('UserController=>index', conditions, params.limit, params.page);
    this.ctx.body = await this.ctx.service.user.index(conditions, params.limit, params.page);
    this.ctx.status = 200;
  }
  async create() {
    const params = this.ctx.request.body;
    console.log('UserController=>create', params);
    this.ctx.body = await this.ctx.service.user.create(params);
    this.ctx.status = 201;
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('UserController=>destroy', id);
    this.ctx.body = await this.ctx.service.user.destroy(id);
    this.ctx.status = 204;
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('UserController=>update');
    this.ctx.body = await this.ctx.service.user.update(id, params);
    this.ctx.status = 201;
  }
}

module.exports = UserController;
