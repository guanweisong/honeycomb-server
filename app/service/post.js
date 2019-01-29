'use strict';
const Service = require('egg').Service;
const showdown = require('showdown');
const converter = new showdown.Converter();

class PostService extends Service {
  async index(conditions, limit = 10, page = 1) {
    console.log('PostService=>index', conditions, limit, page);
    const result = {};
    const list = await this.ctx.model.Post
      .find(conditions)
      .populate('post_category', 'category_title')
      .populate('post_author', 'user_name')
      .populate('movie_director', 'tag_name')
      .populate('movie_actor', 'tag_name')
      .populate('movie_style', 'tag_name')
      .populate('gallery_style', 'tag_name')
      .populate('post_cover', 'media_url')
      .limit(limit * 1)
      .skip((page * 1 - 1) * limit)
      .sort({ created_at: -1 })
      .lean();
    for (const item of list) {
      item.post_content = converter.makeHtml(item.post_content);
      item.comment_count = await this.ctx.model.Comment.count({ comment_post: item._id, comment_status: { $in: [ 1, 3 ] } });
    }
    result.list = list;
    result.total = await this.ctx.model.Post.count(conditions);
    if (conditions._id) {
      this.ctx.model.Post.update(conditions, {$inc: {post_views: 1}}, {upsert: true}, (err,data) => {
        if(err) {
          return console.log(err);
        }
        console.log(data);
      });
    }
    return result;
  }
  async indexRandomPostByCategoryId(post_category, number = 5) {
    console.log('PostService=>indexRandomPostByCategoryId', post_category, number);
    const query = () => {
      return new Promise((resolve, reject) => {
        var filter = { post_category };
        var fields = { post_title: 1 };
        var options = { limit: number };
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
    return await query();
  }
  async create(params) {
    console.log('PostService=>create', params);
    const model = new this.ctx.model.Post({...params, created_at: Date.now()});
    const result = await model.save();
    return result;
  }
  async destroy(_id) {
    console.log('PostService=>destroy', _id);
    const result = await this.ctx.model.Post.remove({ _id });
    return result;
  }
  async update(_id, params) {
    console.log('PostService=>update', _id, params);
    const result = await this.ctx.model.Post.update({ _id }, { $set: params });
    return result;
  }
}

module.exports = PostService;
