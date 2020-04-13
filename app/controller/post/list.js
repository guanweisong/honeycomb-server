'use strict';

const Controller = require('egg').Controller;

class PostListController extends Controller {
  async index() {
    const params = this.ctx.query;
    const paramsArray = this.ctx.queries;
    const conditions = this.ctx.helper.getFindConditionsByQueries(paramsArray, [ 'post_status', 'post_author', 'post_type', 'post_category' ], [ 'post_title', 'quote_author', 'quote_content' ]);
    console.log('PostController=>index', conditions, params.limit, params.page, params.sortField, params.sortOrder);
    const $or = [];
    try {
      if (params.category_id) {
        const category = await this.ctx.service.category.index(params.category_id);
        $or.push({ post_category: params.category_id });
        category.list.forEach(item => {
          $or.push({ post_category: item._id });
        });
      }
      if (params.tag_name) {
        const tag = await this.ctx.service.tag.index({ tag_name: params.tag_name });
        if (tag.total !== 0) {
          const id = tag.list[0]._id;
          $or.push(
            { gallery_style: id },
            { movie_actor: id },
            { movie_style: id },
            { movie_director: id }
          );
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
        const user = await this.ctx.service.user.index({ user_name: params.user_name });
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
      if ($or.length > 0) {
        conditions.$or = $or;
      }
      this.ctx.body = await this.ctx.service.post.list.index(conditions, params.limit, params.page, params.sortField, params.sortOrder);
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, 'err');
    }
  }
  async indexRandom() {
    const post_category = this.ctx.query.post_category;
    const number = this.ctx.query.number;
    console.log('PostController=>indexRandomPostByCategoryId', post_category);
    try {
      this.ctx.body = await this.ctx.service.post.list.indexRandom(post_category, number);
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = PostListController;
