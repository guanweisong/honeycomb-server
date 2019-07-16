'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ 'tag_name' ], [ 'tag_name' ]);
    console.log('TagController=>index', conditions, params.limit, params.page);
    try {
      this.ctx.body = await this.ctx.service.tag.index(conditions, params.limit, params.page);
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async create() {
    const params = this.ctx.request.body;
    console.log('TagController=>create', params);
    try {
      this.ctx.body = await this.ctx.service.tag.create(params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('TagController=>destroy', id);
    try {
      this.ctx.body = await this.ctx.service.tag.destroy(id);
      this.ctx.status = 204;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('TagController=>update', id, params);
    try {
      this.ctx.body = await this.ctx.service.tag.update(id, params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = TagController;
