'use strict';

const Controller = require('egg').Controller;

class PostController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ '_id', 'post_status', 'post_author', 'post_type', 'post_category' ], [ 'post_title' ]);
    console.log('PostController=>index', conditions, params.limit, params.page);
    try {
      if (params.tag_name) {
        const tag = await this.ctx.service.tag.index({tag_name: params.tag_name});
        if (tag.total !== 0) {
          const id = tag.list[0]._id;
          conditions.$or = [
            { gallery_style: id },
            { movie_actor: id },
            { movie_style: id },
            { movie_director: id },
          ];
        } else {
          this.ctx.body = {
            list: [],
            total: 0,
          };
          this.ctx.status = 200;
          return;
        }
      }
      if (params.user_name) {
        const user = await this.ctx.service.user.index({user_name: params.user_name});
        if (user.total !== 0) {
          conditions.post_author = user.list[0]._id;
        } else {
          this.ctx.body = {
            list: [],
            total: 0,
          };
          this.ctx.status = 200;
          return;
        }
      }
      this.ctx.body = await this.ctx.service.post.index(conditions, params.limit, params.page);
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '读取文章列表失败');
    }
  }
  async indexPostByCategoryId() {
    const params = this.ctx.query;
    const conditions = {};
    // 查询当前分类子孙树
    try {
      const categoryAll = await this.ctx.service.category.index(params._id);
      const ids = [params._id];
      categoryAll.son.forEach(item => {
        ids.push(item._id);
      });
      conditions.post_category = {$in: ids};
      console.log('PostController=>indexPostByCategoryId', conditions, params.limit, params.page);
      this.ctx.body = await this.ctx.service.post.index(conditions, params.limit, params.page);
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '根据分支ID读取文章列表失败');
    }
  }
  async indexRandomPostByCategoryId() {
    const post_category = this.ctx.query.post_category;
    const number = this.ctx.query.number;
    console.log('PostController=>indexRandomPostByCategoryId', post_category);
    try {
      this.ctx.body = await this.ctx.service.post.indexRandomPostByCategoryId(post_category, number);
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '根据分类ID读取随机文章列表失败');
    }
  }
  async create() {
    const params = this.ctx.request.body;
    console.log('PostController=>create', params);
    try {
      this.ctx.body = await this.ctx.service.post.create(params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '创建文章失败');
    }
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('PostController=>destroy', id);
    try {
      this.ctx.body = await this.ctx.service.post.destroy(id);
      this.ctx.status = 204;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '删除文章失败');
    }
  }
  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    console.log('PostController=>update', id, params);
    try {
      this.ctx.body = await this.ctx.service.post.update(id, params);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '更新文章失败');
    }
  }
}

module.exports = PostController;
