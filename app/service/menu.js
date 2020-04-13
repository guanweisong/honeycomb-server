'use strict';
const Service = require('egg').Service;

class MenuService extends Service {
  async index(conditions) {
    console.log('MenuService=>index', conditions);
    try {
      const list = await this.ctx.model.Menu
        .find(conditions)
        .sort({ power: 1 })
        .lean();
      const categoryList = await this.ctx.service.category.index();
      const pageList = await this.ctx.service.page.index({}, 9999, 1);
      list.forEach(m => {
        if (m.type === 'category') {
          categoryList.list.forEach(n => {
            if (m._id.toString() === n._id.toString()) {
              m.category_title = n.category_title;
            }
          });
        }
        if (m.type === 'page') {
          pageList.list.forEach(n => {
            if (m._id.toString() === n._id.toString()) {
              m.page_title = n.page_title;
            }
          });
        }
      })

      const result = {
        list,
        total: await this.ctx.model.Menu.count(conditions),
      };
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async destroyMany() {
    console.log('MenuService=>destroyMany');
    try {
      const result = await this.ctx.model.Menu.deleteMany();
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async createMany(params) {
    console.log('MenuService=>create', params);
    try {
      const result = await this.ctx.model.Menu.insertMany(params);
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = MenuService;
