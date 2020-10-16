'use strict';
const Service = require('egg').Service;
const showdown = require('showdown');
const converter = new showdown.Converter();
const sortValueMapping = require('../../utils/sortValueMapping');

class PostService extends Service {
  async index(id) {
    try {
      const result =  await this.ctx.model.Post.findOne({ _id : id })
        .populate('post_category', 'category_title')
        .populate('post_author', 'user_name')
        .populate('movie_director', 'tag_name')
        .populate('movie_actor', 'tag_name')
        .populate('movie_style', 'tag_name')
        .populate('gallery_style', 'tag_name')
        .populate('post_cover', 'media_url media_url_720p media_url_360p')
        .lean();
      result.post_content = converter.makeHtml(result.post_content);
      return result;
    } catch (e) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async create(params) {
    console.log('PostService=>create', params);
    const model = new this.ctx.model.Post({...params, created_at: Date.now()});
    try {
      const result = await model.save();
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async destroy(_id) {
    console.log('PostService=>destroy', _id);
    try {
      const result = await this.ctx.model.Post.remove({_id});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async update(_id, params) {
    console.log('PostService=>update', _id, params);
    try {
      const result = await this.ctx.model.Post.update({_id}, {$set: params});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async updateViews(id) {
    console.log('PostService=>updateViews', id);
    // 访问量+1
    try {
      const result = this.ctx.model.Post.update({ _id : id }, {$inc: {post_views: 1}}, {upsert: true});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = PostService;
