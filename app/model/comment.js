'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema({
    comment_post: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    comment_author: {
      required: true,
      type: String,
      max: 20,
    },
    comment_email: {
      required: true,
      type: String,
      max: 30,
    },
    comment_ip: {
      required: true,
      type: String,
      max: 20,
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
    comment_content: {
      required: true,
      type: String,
      max: 200,
    },
    comment_status: {
      type: Number,
      enum: [ 0, 1, 2, 3 ],
      enumDesc: '0：待审核, 1：允许发布，2：垃圾评论，3：屏蔽',
      required: true,
      default: 0,
    },
    comment_agent: {
      required: true,
      type: String,
      max: 2000,
    },
    comment_parent: {
      required: true,
      type: String,
      default: '0',
    },
  }, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });

  return mongoose.model('Comment', CommentSchema);
};
