'use strict';
const Service = require('egg').Service;
const listToTree = require('list-to-tree-lite');
const FastScanner = require('fastscan');
const md5 = require('md5');
const words = require('../utils/censorWords');

const scanner = new FastScanner(words);

class CommentService extends Service {
  // 此列表用于中台管理
  async index(conditions, limit = 10, page = 1) {
    console.log('CommentService=>index', conditions, limit, page);
    try {
      const result = {};
      result.list = await this.ctx.model.Comment
        .find(conditions)
        .populate('comment_post', 'post_title')
        .limit(limit * 1)
        .skip((page * 1 - 1) * limit)
        .sort({updated_at: -1});
      result.total = await this.ctx.model.Comment.count(conditions);
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  // 此列表用于前台关联文章显示
  async indexByPostId(id) {
    console.log('CommentService=>indexByPostId', id);
    const conditions = {
      comment_post: id,
      comment_status: { $in: [ 1, 3 ] },
    };
    try {
      const result = await this.ctx.model.Comment
        .find(conditions)
        .sort({updated_at: -1})
        .lean();
      const data = {};
      data.list = listToTree(result.map((item) => {
        return {
          ...item,
          _id: item._id.toString(),
          comment_avatar: `//www.gravatar.com/avatar/${md5(item.comment_email.trim().toLowerCase())}?s=48&d=identicon`
        }
      }), {
        idKey: '_id',
        parentKey: 'comment_parent',
      });
      data.total = await this.ctx.model.Comment.count(conditions);
      return data;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async create(params) {
    console.log('CommentService=>create', params);
    const offWords = scanner.search(params.comment_content);
    if (offWords.length > 0) {
      this.ctx.throw(403, '评论内容包含敏感词，请检查后再发布');
    }
    const model = new this.ctx.model.Comment({...params, created_at: Date.now()});
    try {
      const result = await model.save();
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async destroy(_id) {
    console.log('CommentService=>destroy', _id);
    try {
      const result = await this.ctx.model.Comment.remove({_id});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async update(_id, params) {
    console.log('CommentService=>update', _id, params);
    try {
      const result = await this.ctx.model.Comment.update({_id}, {$set: params});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = CommentService;
