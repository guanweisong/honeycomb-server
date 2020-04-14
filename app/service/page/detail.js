'use strict';
const Service = require('egg').Service;
const showdown = require('showdown');
const converter = new showdown.Converter();

class PageDetailService extends Service {
  async index(id) {
    console.log('PageDetailService=>index');
    try {
      const result = await this.ctx.model.Page
        .findOne({_id: id})
        .populate('page_author', 'user_name')
        .lean();
      result.page_content = converter.makeHtml(result.page_content);
      // 访问量+1
      this.ctx.model.Page.update({ _id : id }, {$inc: {page_views: 1}}, {upsert: true}, (err, data) => {
        if (err) {
          return console.log(err);
        }
        console.log(data);
      });
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async create(params) {
    console.log('PageDetailService=>create');
    const model = new this.ctx.model.Page({...params, created_at: Date.now()});
    try {
      const result = await model.save();
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async destroy(_id) {
    console.log('PageDetailService=>destroy', _id);
    try {
      const result = await this.ctx.model.Page.remove({_id});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async update(_id, params) {
    console.log('PageDetailService=>update', _id, params);
    try {
      const result = await this.ctx.model.Page.update({_id}, {$set: params});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = PageDetailService;
