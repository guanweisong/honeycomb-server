'use strict';
const Service = require('egg').Service;
const showdown = require('showdown');
const converter = new showdown.Converter();

class PostService extends Service {
  async index(conditions, limit = 10, page = 1) {
    console.log('PostService=>index', conditions, limit, page);
    const result = {};
    let list = await this.ctx.model.Post
      .find(conditions)
      .populate('post_category', 'category_title')
      .populate('post_author', 'user_name')
      .populate('movie_director', 'tag_name')
      .populate('movie_actor', 'tag_name')
      .populate('movie_style', 'tag_name')
      .populate('gallery_style', 'tag_name')
      .populate('post_cover', 'media_url')
      .populate('movie_photo', 'media_url')
      .limit(limit * 1)
      .skip((page * 1 - 1) * limit)
      .sort({ updated_at: -1 })
      .lean();
    for (const item of list) {
      item.post_content = converter.makeHtml(item.post_content);
      item.comment_count = await this.ctx.model.Comment.count({ comment_post: item._id });
    }
    result.list = list;
    result.total = await this.ctx.model.Post.count(conditions);
    return result;
  }
  async create(params) {
    console.log('PostService=>create', params);
    const model = new this.ctx.model.Post(params);
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
