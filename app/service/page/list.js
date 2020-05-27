'use strict';
const Service = require('egg').Service;
const sortValueMapping = require('../../utils/sortValueMapping');

class PageListService extends Service {
  async index(conditions, limit = 10, page = 1, sortField = 'created_at', sortOrder = 'descend') {
    console.log('PageService=>index', conditions, limit, page);
    try {
      const result = {};
      const list = await this.ctx.model.Page
        .find(conditions, { page_content: 0 })
        .sort({ [sortField]: sortValueMapping[sortOrder] })
        .limit(limit * 1)
        .skip((page * 1 - 1) * limit)
        .populate('page_author', 'user_name')
        .lean();
      for (const item of list) {
        item.comment_count = await this.ctx.model.Comment.count({
          comment_post: item._id,
          comment_status: { $in: [ 1, 3 ] },
        });
      }
      result.list = list;
      result.total = await this.ctx.model.Page.count(conditions);
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = PageListService;
