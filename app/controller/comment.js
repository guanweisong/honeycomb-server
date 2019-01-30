'use strict';

const Controller = require('egg').Controller;
const RateLimiter = require('limiter').RateLimiter;
const rateLimiter = new RateLimiter(60, 'hour', true);

class CommentController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ 'comment_status' ], [ 'comment_ip', 'comment_author', 'comment_content' ]);
    console.log('CommentController=>index', conditions, params.limit, params.page);
    this.ctx.body = await this.ctx.service.comment.index(conditions, params.limit, params.page);
    this.ctx.status = 200;
  }
  async indexByPostId() {
    const id = this.ctx.params.id;
    console.log('CommentController=>indexByPostId', id);
    this.ctx.body = await this.ctx.service.comment.indexByPostId(id);
    this.ctx.status = 200;
  }
  async create() {
    const params = this.ctx.request.body;
    params.comment_agent = this.ctx.request.header['user-agent'];
    params.comment_ip = this.ctx.ip;
    console.log('CommentController=>create', params);
    if (rateLimiter.tryRemoveTokens(1)) {
      this.ctx.body = await this.ctx.service.comment.create(params);
      this.ctx.status = 201;
    } else {
      this.ctx.body = { error: '发布评论频率太快，请1小时后重试' };
      this.ctx.status = 403;
    }
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
