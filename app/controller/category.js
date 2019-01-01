'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async index() {
    const params = this.ctx.query;
    console.log('CategoryController=>index', params.id);
    this.ctx.body = await this.ctx.service.category.index(params._id);
    this.ctx.status = 200;
  }
  async create() {
    const params = this.ctx.request.body;
    console.log('CategoryController=>create', params);
    this.ctx.body = await this.ctx.service.category.create(params);
    this.ctx.status = 201;
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('CategoryController=>destroy', id);
    this.ctx.body = await this.ctx.service.category.destroy(id);
    this.ctx.status = 204;
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('CategoryController=>update', id, params);
    this.ctx.body = await this.ctx.service.category.update(id, params);
    this.ctx.status = 201;
  }
}

module.exports = CategoryController;
