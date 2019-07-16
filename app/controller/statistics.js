'use strict';

const Controller = require('egg').Controller;

class StatisticsController extends Controller {
  async index() {
    console.log('StatisticsController=>index');
    try {
      this.ctx.body = await this.ctx.service.statistics.index();
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = StatisticsController;
