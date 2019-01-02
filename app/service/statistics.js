'use strict';
const Service = require('egg').Service;

class StatisticsService extends Service {
  async index() {
    console.log('StatisticsService=>index');
    const result = {};
    // 获取文章统计
    const post = {};
    post[0] = await this.ctx.model.Post.count({ post_type: 0 });
    post[1] = await this.ctx.model.Post.count({ post_type: 1 });
    post[2] = await this.ctx.model.Post.count({ post_type: 2 });
    result.post = post;
    // 获取用户统计
    const user = {};
    user[1] = await this.ctx.model.User.count({ user_level: 1 });
    user[2] = await this.ctx.model.User.count({ user_level: 2 });
    user[3] = await this.ctx.model.User.count({ user_level: 3 });
    result.user = user;
    // 获取评论统计
    const comment = {};
    comment[0] = await this.ctx.model.Comment.count({ comment_status: 0 });
    comment[1] = await this.ctx.model.Comment.count({ comment_status: 1 });
    comment[2] = await this.ctx.model.Comment.count({ comment_status: 2 });
    comment[3] = await this.ctx.model.Comment.count({ comment_status: 3 });
    result.comment = comment;
    return result;
  }
}

module.exports = StatisticsService;
