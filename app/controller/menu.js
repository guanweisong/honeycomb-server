'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  async index() {
    try {
      this.ctx.body = await this.ctx.service.menu.index();
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async update() {
    const data = this.ctx.request.body;
    console.log('MenuController=>update', data);
    const deteleResult = await this.ctx.service.menu.destroyMany();
    if (deteleResult.ok) {
      this.ctx.body = await this.ctx.service.menu.createMany(data);
      this.ctx.status = 200;
    } else {
      // this.ctx.logger.error();
      // this.ctx.throw(500);
    }
  }
}

module.exports = MenuController;
