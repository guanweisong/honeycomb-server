'use strict';

const Controller = require('egg').Controller;

class LinkController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ 'link_status', 'link_url' ], [ 'link_url', 'link_name' ]);
    console.log('LinkController=>index', conditions, params.limit, params.page);
    try {
      this.ctx.body = await this.ctx.service.link.index(conditions, params.limit, params.page);
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '读取链接列表失败');
    }
  }
  async create() {
    const params = this.ctx.request.body;
    console.log('LinkController=>create', params);
    try {
      this.ctx.body = await this.ctx.service.link.create(params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '创建链接失败');
    }
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('LinkController=>destroy', id);
    try {
      this.ctx.body = await this.ctx.service.link.destroy(id);
      this.ctx.status = 204;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '删除链接失败');
    }
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('LinkController=>update', id, params);
    try {
      this.ctx.body = await this.ctx.service.link.update(id, params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '更新链接失败');
    }
  }
}

module.exports = LinkController;
