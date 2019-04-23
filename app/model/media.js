'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MediaSchema = new Schema({
    media_name: {
      type: String,
      max: 20,
      required: true,
    },
    media_type: {
      type: String,
      required: true,
    },
    media_url: {
      type: String,
      required: true,
    },
    media_url_720p: {
      type: String,
    },
    media_url_360p: {
      type: String,
    },
    media_size: {
      type: Number,
    },
    media_key: {
      type: String,
      required: true,
    },
    media_key_720p: {
      type: String,
    },
    media_key_360p: {
      type: String,
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
  }, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });

  return mongoose.model('Media', MediaSchema);
};
