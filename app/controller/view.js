'use strict';

const Controller = require('egg').Controller;

class ViewController extends Controller {
  async index() {
    const type = this.ctx.params.type;
    const id = this.ctx.params.id;
    console.log('ViewController=>index', type, id);
    try {
      const detail = await this.ctx.service[type].detail.index(id);
      this.ctx.body = {
        count: detail[`${type}_views`],
      };
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async update() {
    const type = this.ctx.params.type;
    const id = this.ctx.params.id;
    console.log('ViewController=>update', type, id);
    try {
      this.ctx.body = await this.ctx.service[type].detail.updateViews(id);
      this.ctx.status = 201;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = ViewController;
