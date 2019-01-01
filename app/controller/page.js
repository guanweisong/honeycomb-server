'use strict';

const Controller = require('egg').Controller;

class PageController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ '_id', 'page_status' ], [ 'page_title' ]);
    console.log('PageController=>index', conditions, params.limit, params.page);
    this.ctx.body = await this.ctx.service.page.index(conditions, params.limit, params.page);
    this.ctx.status = 200;
  }
  async create() {
    const params = this.ctx.request.body;
    console.log('PageController=>create', params);
    this.ctx.body = await this.ctx.service.page.create(params);
    this.ctx.status = 201;
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('PageController=>destroy', id);
    this.ctx.body = await this.ctx.service.page.destroy(id);
    this.ctx.status = 204;
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('PageController=>update', id, params);
    this.ctx.body = await this.ctx.service.page.update(id, params);
    this.ctx.status = 201;
  }
}

module.exports = PageController;
