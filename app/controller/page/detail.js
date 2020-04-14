'use strict';

const Controller = require('egg').Controller;

class PageController extends Controller {
  async index() {
    const id = this.ctx.params.id;
    console.log('PageController=>index');
    try {
      this.ctx.body = await this.ctx.service.page.detail.index(id);
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async create() {
    const params = this.ctx.request.body;
    console.log('PageController=>create', params);
    try {
      this.ctx.body = await this.ctx.service.page.detail.create(params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('PageController=>destroy', id);
    try {
      this.ctx.body = await this.ctx.service.page.detail.destroy(id);
      this.ctx.status = 204;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('PageController=>update', id, params);
    try {
      this.ctx.body = await this.ctx.service.page.detail.update(id, params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = PageController;
