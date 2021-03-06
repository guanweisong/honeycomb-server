'use strict';
const Service = require('egg').Service;
const COS = require('cos-nodejs-sdk-v5');
const resizeImg = require('resize-img');
const fs = require('fs');
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
    this.resizeImg = (image, params) => {
      return new Promise((resolve, reject) => {
        resizeImg(fs.readFileSync(image), params).then(buf => {
          resolve(buf);
        }).catch(err => {
          reject({
            code: 500,
            body: err,
          });
        });
      });
    };
  }
  async index() {
    console.log('MediaService=>index');
    try {
      const result = {};
      result.list = await this.ctx.model.Media
        .find({})
        .sort({ updated_at: -1 });
      result.total = await this.ctx.model.Media.count();
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async create(file) {
    console.log('MediaService=>create', file);
    const data = {};
    data.media_name = file.filename;
    data.media_size = fs.statSync(file.filepath).size;
    data.media_type = file.mime;
    const keyContent = moment().format('YYYY/MM/DD/HHmmssSSS');
    const filenameArray = file.filename.split('.');
    const keySuffix = filenameArray[filenameArray.length - 1];
    try {
      // 原文件
      const file_original = fs.readFileSync(file.filepath);
      const result = await this.putObject({
        Bucket: this.config.cos.bucket,
        Region: this.config.cos.region,
        Key: `${keyContent}.${keySuffix}`,
        Body: file_original,
      });
      data.media_url = result.Location;
      data.media_key = `${keyContent}.${keySuffix}`;
      // 如果是图片,生成缩略图
      if (data.media_type.indexOf('image') !== -1) {
        // 720P
        const file_720p = await this.resizeImg(file.filepath, { width: 1280 });
        const result_720p = await this.putObject({
          Bucket: this.config.cos.bucket,
          Region: this.config.cos.region,
          Key: `${keyContent}_720p.${keySuffix}`,
          Body: file_720p,
        });
        data.media_url_720p = result_720p.Location;
        data.media_key_720p = `${keyContent}_720p.${keySuffix}`;
        // 360P
        const file_360p = await this.resizeImg(file.filepath, { width: 640 });
        const result_360p = await this.putObject({
          Bucket: this.config.cos.bucket,
          Region: this.config.cos.region,
          Key: `${keyContent}_360p.${keySuffix}`,
          Body: file_360p,
        });
        data.media_url_360p = result_360p.Location;
        data.media_key_360p = `${keyContent}_360p.${keySuffix}`;
      }
      data.created_at = Date.now();
      const model = new this.ctx.model.Media(data);
      return await model.save();
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
  async destroy(_id) {
    console.log('MediaService=>destroy', _id);
    try {
      const mediaObject = await this.ctx.model.Media.find({_id});
      const result = await this.ctx.model.Media.remove({_id});
      await this.deleteObject({
        Bucket: this.config.cos.bucket,
        Region: this.config.cos.region,
        Key: mediaObject[0].media_key,
      });
      // 如果有缩略图，删除缩略图
      if (mediaObject[0].media_key_360p) {
        await this.deleteObject({
          Bucket: this.config.cos.bucket,
          Region: this.config.cos.region,
          Key: mediaObject[0].media_key_360p,
        });
      }
      if (mediaObject[0].media_key_720p) {
        await this.deleteObject({
          Bucket: this.config.cos.bucket,
          Region: this.config.cos.region,
          Key: mediaObject[0].media_key_720p,
        });
      }
      return result;
    } catch (err) {
      this.ctx.logger.error(new Error(err));
      this.ctx.throw(500, err);
    }
  }
}

module.exports = MediaService;
