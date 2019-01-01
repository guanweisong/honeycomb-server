'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ 'comment_status' ], [ 'comment_ip', 'comment_author', 'comment_content' ]);
    console.log('CommentController=>index', conditions, params.limit, params.page);
    this.ctx.body = await this.ctx.service.comment.index(conditions, params.limit, params.page);
    this.ctx.status = 200;
  }
  async create() {
    const params = this.ctx.request.body;
    params.comment_agent = this.ctx.request.header['user-agent'];
    params.comment_ip = '127.0.0.1'; // TO DO
    console.log('CommentController=>create', params);
    this.ctx.body = await this.ctx.service.comment.create(params);
    this.ctx.status = 201;
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('CommentController=>destroy', id);
    this.ctx.body = await this.ctx.service.comment.destroy(id);
    this.ctx.status = 204;
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('CommentController=>update', id, params);
    this.ctx.body = await this.ctx.service.comment.update(id, params);
    this.ctx.status = 201;
  }
}

module.exports = CommentController;
