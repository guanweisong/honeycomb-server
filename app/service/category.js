'use strict';
const Service = require('egg').Service;

class CategoryService extends Service {
  async index(id) {
    console.log('CategoryService=>index');
    const result = await this.ctx.model.Category
      .find({})
      .lean()
      .sort({ updated_at: -1 });
    const data = {};
    data.son = this.sonsTree(result, id || '0');
    data.family = this.familyTree(result, id || '0');
    return data;
  }
  async create(params) {
    console.log('CategoryService=>create', params);
    const model = new this.ctx.model.Category(params);
    const result = await model.save();
    return result;
  }
  async destroy(_id) {
    console.log('CategoryService=>destroy', _id);
    // 查询若其含有子孙树，则禁止删除
    let son = await this.ctx.model.Category.find({}).lean();
    son = this.sonsTree(son, _id || '0');
    if (son.length > 0) {
      throw new Error('被删分类包含子分类，无法删除');
    } else {
      const result = await this.ctx.model.Category.remove({ _id });
      return result;
    }
  }
  async update(_id, params) {
    console.log('CategoryService=>update', _id, params);
    const result = await this.ctx.model.Category.update({ _id }, { $set: params });
    return result;
  }
  // 家族树，根据子节点寻找家族节点
  familyTree(arr, pid) {
    const temp = [];
    const forFn = (arr, pid) => {
      for (const value of arr) {
        if (value._id == pid) {
          temp.push(value);
          forFn(arr, value.category_parent);
        }
      }
    };
    forFn(arr, pid);
    return temp;
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
