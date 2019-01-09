'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PostSchema = new Schema({
    post_title: {
      type: String,
      max: 20,
    },
    post_content: {
      type: String,
      max: 20000,
    },
    post_excerpt: {
      type: String,
      max: 200,
    },
    post_category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    post_author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    updated_at: {
      type: Date,
      default: Date.now(),
    },
    post_status: {
      type: Number,
      enum: [ 0, 1 ],
      enumDesc: '0：禁用, 1：启用',
      default: 1,
      required: true,
    },
    comment_status: {
      type: Number,
      enum: [ 0, 1 ],
      enumDesc: '0：禁用, 1：启用',
      default: 1,
      required: true,
    },
    post_views: {
      type: Number,
      default: 0,
    },
    post_type: {
      type: Number,
      enum: [ 0, 1, 2 ],
      enumDesc: '0：文章, 1：电影, 2: 画廊',
      default: 1,
      required: true,
    },
    post_cover: {
      type: Schema.Types.ObjectId,
      ref: 'Media',
    },
    movie_time: {
      type: Date,
    },
    movie_photo: {
      type: Schema.Types.ObjectId,
      ref: 'Media',
    },
    movie_name_en: {
      type: String,
      max: 20,
    },
    movie_director: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    movie_actor: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    movie_style: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    gallery_location: {
      type: String,
      max: 20,
    },
    gallery_time: {
      type: Date,
    },
    gallery_style: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  }, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });

  return mongoose.model('Post', PostSchema);
};
