'use strict';

const Controller = require('egg').Controller;

class PageListController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ 'page_status', 'page_author' ], [ 'page_title']);
    console.log('PageController=>index', conditions, params.limit, params.page, params.sortField, params.sortOrder);
    try {
      this.ctx.body = await this.ctx.service.page.list.index(conditions, params.limit, params.page, params.sortField, params.sortOrder);
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, 'err');
    }
  }
}

module.exports = PageListController;
