'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const LinkSchema = new Schema({
    link_url: {
      type: String,
      required: true,
      unique: true,
      max: 20,
    },
    link_name: {
      type: String,
      max: 20,
      required: true,
    },
    link_description: {
      type: String,
      required: true,
      max: 200,
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
    link_status: {
      type: Number,
      enum: [ 0, 1 ],
      enumDesc: '0：禁用, 1：启用',
      required: true,
    },
  }, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });

  return mongoose.model('Link', LinkSchema);
};
