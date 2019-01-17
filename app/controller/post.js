'use strict';

const Controller = require('egg').Controller;

class PostController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ '_id', 'post_status', 'post_author', 'post_type', 'post_category' ], [ 'post_title' ]);
    if (params.post_tag) {
      conditions.$or = [
        { gallery_style: params.post_tag },
        { movie_actor: params.post_tag },
        { movie_style: params.post_tag },
        { movie_director: params.post_tag },
      ];
    }
    console.log('PostController=>index', conditions, params.limit, params.page);
    this.ctx.body = await this.ctx.service.post.index(conditions, params.limit, params.page);
    this.ctx.status = 200;
  }
  async create() {
    const params = this.ctx.request.body;
    console.log('PostController=>create', params);
    this.ctx.body = await this.ctx.service.post.create(params);
    this.ctx.status = 201;
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('PostController=>destroy', id);
    this.ctx.body = await this.ctx.service.post.destroy(id);
    this.ctx.status = 204;
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('PostController=>update', id, params);
    this.ctx.body = await this.ctx.service.post.update(id, params);
    this.ctx.status = 201;
  }
}

module.exports = PostController;
