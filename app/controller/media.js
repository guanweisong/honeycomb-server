'use strict';
const Controller = require('egg').Controller;
const fs = require('mz/fs');

class MediaController extends Controller {
  async index() {
    console.log('MediaController=>index');
    try {
      this.ctx.body = await this.ctx.service.media.index();
      this.ctx.status = 200;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '读取媒体列表失败');
    }
  }
  async create() {
    for (const file of this.ctx.request.files) {
      try {
        this.ctx.body = await this.ctx.service.media.create(file);
        this.ctx.status = 201;
      } catch (err) {
        this.ctx.logger.error(new Error(err));
        this.ctx.throw(500, '上传媒体失败');
      } finally {
        await fs.unlink(file.filepath);
      }
    }
  }
  async destroy() {
    const id = this.ctx.params.id;
    console.log('MediaController=>destroy', id);
    try {
      this.ctx.body = await this.ctx.service.media.destroy(id);
      this.ctx.status = 204;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '删除媒体失败');
    }
  }
}

module.exports = MediaController;
