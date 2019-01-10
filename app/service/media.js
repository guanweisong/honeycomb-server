'use strict';
const Service = require('egg').Service;
const COS = require('cos-nodejs-sdk-v5');
const moment = require('moment');

class MediaService extends Service {
  constructor(props) {
    super(props);
    this.cos = new COS({
      AppId: this.config.cos.appId,
      SecretId: this.config.cos.secretId,
      SecretKey: this.config.cos.secretKey,
    });
    this.putObject = params => {
      return new Promise((resolve, reject) => {
        this.cos.putObject(params, (err, data) => {
          if (err !== null) {
            reject({
              code: 500,
              body: err,
            });
          } else {
            resolve(data);
          }
        });
      });
    };
    this.deleteObject = params => {
      return new Promise((resolve, reject) => {
        this.cos.deleteObject(params, (err, data) => {
          if (err !== null) {
            reject({
              code: 500,
              body: err,
            });
          } else {
            resolve(data);
          }
        });
      });
    };
  }
  async index() {
    console.log('MediaService=>index');
    const result = {};
    result.list = await this.ctx.model.Media
      .find({})
      .sort({ updated_at: -1 });
    result.total = await this.ctx.model.Media.count();
    return result;
  }
  async create(stream) {
    console.log('MediaService=>create');
    const data = {};
    data.media_name = stream.filename;
    data.media_size = stream.readableLength;
    data.media_type = stream.mimeType;
    data.media_key = `${moment().format('YYYY/MM/DD/HHmmssSSS')}.${stream.filename.split('.')[1]}`;
    const result = await this.putObject({
      Bucket: this.config.cos.bucket,
      Region: this.config.cos.region,
      Key: data.media_key,
      Body: stream,
    });
    data.media_url = result.Location;
    const model = new this.ctx.model.Media(data);
    return await model.save();
  }
  async destroy(_id) {
    console.log('MediaService=>destroy', _id);
    const mediaObject = await this.ctx.model.Media.find({ _id });
    const result = await this.ctx.model.Media.remove({ _id });
    await this.deleteObject({
      Bucket: this.config.cos.bucket,
      Region: this.config.cos.region,
      Key: mediaObject[0].media_key,
    });
    return result;
  }
}

module.exports = MediaService;
