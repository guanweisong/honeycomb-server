'use strict';
module.exports = {
  /**
   * 根据controller的queries参数拼接mongoose的查询条件
   * @param {*} queries controller的参数
   * @param {*} queryArray 允许查询的参数名数组
   * @param {*} searchArray 允许模糊搜索的参数名数组
   * @return {*} conditions 拼接完成的mongoose查询条件
   */
  getFindConditionsByQueries(queries, queryArray, searchArray) {
    const conditions = {};
    for (const item in queries) {
      if (queryArray.includes(item)) {
        conditions[item] = { $in: queries[item] };
      }
      if (item === 'keyword') {
        const or = [];
        const value = queries[item][0];
        searchArray.forEach(item => {
          or.push({
            [item]: { $regex: new RegExp(value, 'i') },
          });
        });
        conditions.$or = or;
      }
    }
    return conditions;
  },
};
