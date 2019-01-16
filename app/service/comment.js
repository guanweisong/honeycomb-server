'use strict';
const Service = require('egg').Service;
const listToTree = require('list-to-tree-lite');
const md5 = require('md5');

class CommentService extends Service {
  // 此列表用于中台管理
  async index(conditions, limit = 10, page = 1) {
    console.log('CommentService=>index', conditions, limit, page);
    const result = {};
    result.list = await this.ctx.model.Comment
      .find(conditions)
      .populate('comment_post', 'post_title')
      .limit(limit * 1)
      .skip((page * 1 - 1) * limit)
      .sort({ updated_at: -1 });
    result.total = await this.ctx.model.Comment.count(conditions);
    return result;
  }
  // 此列表用于前台关联文章显示
  async indexByPostId(id) {
    console.log('CommentService=>indexByPostId', id);
    const conditions = {
      comment_post: id,
      comment_status: { $in: [ 1, 3 ] },
    };
    const result = await this.ctx.model.Comment
      .find(conditions)
      .sort({ updated_at: -1 })
      .lean();
    const data = {};
    data.list = listToTree(result.map((item) => {
      return {...item, _id: item._id.toString(), comment_avatar: `//www.gravatar.com/avatar/${md5(item.comment_email.trim().toLowerCase())}?s=48&d=identicon`}
    }), {
      idKey: '_id',
      parentKey: 'comment_parent',
    });
    data.total = await this.ctx.model.Comment.count(conditions);
    return data;
  }
  async create(params) {
    console.log('CommentService=>create', params);
    const model = new this.ctx.model.Comment(params);
    const result = await model.save();
    return result;
  }
  async destroy(_id) {
    console.log('CommentService=>destroy', _id);
    const result = await this.ctx.model.Comment.remove({ _id });
    return result;
  }
  async update(_id, params) {
    console.log('CommentService=>update', _id, params);
    const result = await this.ctx.model.Comment.update({ _id }, { $set: params });
    return result;
  }
}

module.exports = CommentService;
