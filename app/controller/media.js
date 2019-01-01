'use strict';

const Controller = require('egg').Controller;

class MediaController extends Controller {
  async index() {
    console.log('MediaController=>index');
    this.ctx.body = await this.ctx.service.media.index();
    this.ctx.status = 200;
  }
  async create() {
    const stream = await this.ctx.getFileStream();
    console.log('MediaController=>create', stream);
    this.ctx.body = await this.ctx.service.media.create(stream);
    this.ctx.status = 201;
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('MediaController=>destroy', id);
    this.ctx.body = await this.ctx.service.media.destroy(id);
    this.ctx.status = 204;
  }
}

module.exports = MediaController;
