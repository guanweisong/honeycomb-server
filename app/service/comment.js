'use strict';
const Service = require('egg').Service;

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
  async indexByPostId(_id) {
    console.log('CommentService=>indexByPostId', _id);
    // const conditions = {
    //   comment_post: this.ctx.query._id,
    // };
    const result = await this.ctx.model.Comment
      .find({ _id })
      .sort({ updated_at: -1 });
    const data = this.sonsTree(result, '0');
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
  // 子孙树，获取某个ID下的嵌套评论
  sonsTree(arr, id) {
    const temp = [],
      lev = 0;
    const forFn = (arr, id, lev) => {
      for (const value of arr) {
        if (value.comment_parent == id) {
          value.deep_path = lev;
          temp.push(value);
          forFn(arr, value._id, lev + 1);
        }
      }
    };
    forFn(arr, id, lev);
    return temp;
  }
}

module.exports = CommentService;
