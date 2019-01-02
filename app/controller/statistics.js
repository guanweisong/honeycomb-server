'use strict';

const Controller = require('egg').Controller;

class StatisticsController extends Controller {
  async index() {
    console.log('StatisticsController=>index');
    this.ctx.body = await this.ctx.service.statistics.index();
    this.ctx.status = 200;
  }
}

module.exports = StatisticsController;
