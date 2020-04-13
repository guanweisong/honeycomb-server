'use strict';
const Service = require('egg').Service;

class CategoryService extends Service {
  async index() {
    console.log('CategoryService=>index');
    try {
      const result = await this.ctx.model.Category
        .find({})
        .lean()
        .sort({updated_at: -1});
      const data = {
        list: this.sonsTree(result, '0'),
        total: await this.ctx.model.Category.count()
      };
      return data;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async create(params) {
    console.log('CategoryService=>create', params);
    const model = new this.ctx.model.Category({...params, created_at: Date.now()});
    try {
      const result = await model.save();
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async destroy(_id) {
    console.log('CategoryService=>destroy', _id);
    // 查询若其含有子孙树，则禁止删除
    try {
      let son = await this.ctx.model.Category.find({}).lean();
      son = this.sonsTree(son, _id || '0');
      if (son.length > 0) {
        this.ctx.throw(403, '被删分类包含子分类，无法删除');
      } else {
        const result = await this.ctx.model.Category.remove({_id});
        return result;
      }
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async update(_id, params) {
    console.log('CategoryService=>update', _id, params);
    try {
      const result = await this.ctx.model.Category.update({_id}, {$set: params});
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  // 子孙树，获取某个ID下的分类
  sonsTree(arr, id) {
    const temp = [],
      lev = 0;
    const forFn = (arr, id, lev) => {
      for (const value of arr) {
        if (value.category_parent == id) {
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

module.exports = CategoryService;
