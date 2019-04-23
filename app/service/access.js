'use strict';
const Service = require('egg').Service;

const moment = require('moment');

class AccessService extends Service {
  async login(conditions) {
    console.log('AccessService=>login');
    try {
      const result = await this.ctx.model.User.find(conditions, {user_password: 0});
      if (result.length === 0) {
        this.ctx.throw(401, '用户名或密码错误');
      }
      const userId = result[0]._id;
      const token = this.app.jwt.sign({id: userId, created_at: Date.now()}, this.config.jwt.secret);
      await this.ctx.service.token.create(userId, token);
      return token;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '登录系统错误');
    }
  }
  async logout(id, userToken) {
    console.log('AccessService=>logout');
    try {
      return await this.ctx.service.token.destroy(id, userToken);
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '登出系统错误');
    }
  }
  async verify(userToken) {
    console.log('AccessService=>verify');
    try {
      const tokenData = await this.ctx.service.token.index(null, userToken);
      if (tokenData.length === 0) {
        this.ctx.throw(401, '不合法的凭证');
      }
      if (moment().unix() - moment(tokenData[0].updated_at).unix() > this.config.jwt.expires) {
        this.ctx.throw(401, '身份已过期');
        await this.ctx.service.token.detory(userToken);
      }
      const decodedToken = this.app.jwt.verify(userToken, this.config.jwt.secret);
      const userInfo = this.ctx.service.user.index({_id: decodedToken.id});
      await this.ctx.service.token.update(userToken);
      return userInfo;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, '验证系统错误');
    }
  }
}

module.exports = AccessService;
