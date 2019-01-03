'use strict';
const Service = require('egg').Service;

class StatisticsService extends Service {
  async index() {
    console.log('StatisticsService=>index');
    const result = {};
    // 获取文章统计
    const postArray = [ 0, 1, 2 ];
    result.post = [];
    for (let i = 0, len = postArray.length; i < len; i++) {
      result.post.push({
        item: postArray[i],
        count: await this.ctx.model.Post.count({ post_type: postArray[i] }),
      });
    }
    // 获取用户统计
    const userArray = [ 1, 2, 3 ];
    result.user = [];
    for (let i = 0, len = userArray.length; i < len; i++) {
      result.user.push({
        item: userArray[i],
        count: await this.ctx.model.User.count({ user_level: userArray[i] }),
      });
    }
    // 获取评论统计
    const commentArray = [ 0, 1, 2, 3 ];
    result.comment = [];
    for (let i = 0, len = commentArray.length; i < len; i++) {
      result.comment.push({
        item: commentArray[i],
        count: await this.ctx.model.Comment.count({ comment_status: commentArray[i] }),
      });
    }
    return result;
  }
}

module.exports = StatisticsService;
