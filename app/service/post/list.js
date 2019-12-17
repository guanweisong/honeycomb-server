'use strict';
const Service = require('egg').Service;
const sortValueMapping = require('../../utils/sortValueMapping');

class PostListService extends Service {
  async index(conditions, limit = 10, page = 1, sortField = 'created_at', sortOrder = 'descend') {
    console.log('PostService=>index', conditions, limit, page);
    try {
      const result = {};
      const list = await this.ctx.model.Post
        .find(conditions, { post_content: 0 })
        .sort({ [sortField]: sortValueMapping[sortOrder] })
        .limit(limit * 1)
        .skip((page * 1 - 1) * limit)
        .populate('post_category', 'category_title')
        .populate('post_author', 'user_name')
        .populate('movie_director', 'tag_name')
        .populate('movie_actor', 'tag_name')
        .populate('movie_style', 'tag_name')
        .populate('gallery_style', 'tag_name')
        .populate('post_cover', 'media_url media_url_720p media_url_360p')
        .lean();
      for (const item of list) {
        item.comment_count = await this.ctx.model.Comment.count({
          comment_post: item._id,
          comment_status: { $in: [ 1, 3 ] },
        });
      }
      result.list = list;
      result.total = await this.ctx.model.Post.count(conditions);
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async indexRandom(post_category, number = 5) {
    console.log('PostService=>indexRandom', post_category, number);
    const query = () => {
      return new Promise((resolve, reject) => {
        const filter = { post_category };
        const fields = { post_title: 1, quote_content: 1 };
        const options = { limit: number };
        this.ctx.model.Post.findRandom(filter, fields, options, function(err, data) {
          if (err) {
            reject({
              code: 500,
              body: err,
            });
          } else {
            resolve(data);
          }
        });
      });
    };
    try {
      return await query();
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = PostListService;
