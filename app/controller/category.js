'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async index() {
    const params = this.ctx.query;
    console.log('CategoryController=>index', params.id);
    try {
      this.ctx.body = await this.ctx.service.category.index(params._id);
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '读取分类列表失败');
    }
  }
  async create() {
    const params = this.ctx.request.body;
    console.log('CategoryController=>create', params);
    try {
      this.ctx.body = await this.ctx.service.category.create(params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '创建分类失败');
    }
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('CategoryController=>destroy', id);
    try {
      this.ctx.body = await this.ctx.service.category.destroy(id);
      this.ctx.status = 204;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '删除分类失败');
    }
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('CategoryController=>update', id, params);
    try {
      this.ctx.body = await this.ctx.service.category.update(id, params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '更新分类失败');
    }
  }
}

module.exports = CategoryController;
