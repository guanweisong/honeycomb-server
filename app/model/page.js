'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PageSchema = new Schema({
    page_title: {
      type: String,
      max: 20,
    },
    page_content: {
      type: String,
      max: 20000,
    },
    page_author: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    updated_at: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    page_status: {
      type: Number,
      enum: [ 0, 1 ],
      enumDesc: '0：禁用, 1：启用',
      required: true,
    },
    page_views: {
      type: Number,
      default: 0,
    },
  }, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });

  return mongoose.model('Page', PageSchema);
};
