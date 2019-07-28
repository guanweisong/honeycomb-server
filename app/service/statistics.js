'use strict';
const Service = require('egg').Service;

class StatisticsService extends Service {
  async index() {
    console.log('StatisticsService=>index');
    try {
      const result = {};
      // 获取文章统计
      const postArray = [0, 1, 2];
      result.postType = [];
      for (let i = 0, len = postArray.length; i < len; i++) {
        result.postType.push({
          item: postArray[i],
          count: await this.ctx.model.Post.count({post_type: postArray[i]}),
        });
      }
      // 获取用户类型统计
      const userArray = [1, 2, 3];
      result.userType = [];
      for (let i = 0, len = userArray.length; i < len; i++) {
        result.userType.push({
          item: userArray[i],
          count: await this.ctx.model.User.count({user_level: userArray[i]}),
        });
      }
      // 获取评论统计
      const commentArray = [0, 1, 2, 3];
      result.commentStutas = [];
      for (let i = 0, len = commentArray.length; i < len; i++) {
        result.commentStutas.push({
          item: commentArray[i],
          count: await this.ctx.model.Comment.count({comment_status: commentArray[i]}),
        });
      }
      // 获取用户下文章数目
      result.userPost = [];
      const userList = await this.ctx.model.User.find({});
      for (let i = 0, len = userList.length; i < len; i++) {
        result.userPost.push({
          item: userList[i].user_name,
          count: await this.ctx.model.Post.count({post_author: userList[i]._id}),
        });
      }
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = StatisticsService;
