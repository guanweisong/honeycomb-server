'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CategorySchema = new Schema({
    category_title: {
      type: String,
      required: true,
      max: 20,
    },
    category_parent: {
      type: String,
      required: true,
      default: '0',
    },
    category_description: {
      type: String,
      max: 200,
    },
    category_status: {
      type: Number,
      required: true,
      enum: [ 0, 1 ],
      enumDesc: '0：禁用, 1：启用',
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

  return mongoose.model('Category', CategorySchema);
};
