'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ 'tag_name' ], [ 'tag_name' ]);
    console.log('TagController=>index', conditions, params.limit, params.page);
    this.ctx.body = await this.ctx.service.tag.index(conditions, params.limit, params.page);
    this.ctx.status = 200;
  }
  async create() {
    const params = this.ctx.request.body;
    console.log('TagController=>create', params);
    this.ctx.body = await this.ctx.service.tag.create(params);
    this.ctx.status = 201;
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('TagController=>destroy', id);
    this.ctx.body = await this.ctx.service.tag.destroy(id);
    this.ctx.status = 204;
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('TagController=>update', id, params);
    this.ctx.body = await this.ctx.service.tag.update(id, params);
    this.ctx.status = 201;
  }
}

module.exports = TagController;
