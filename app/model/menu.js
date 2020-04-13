'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MenuSchema = new Schema({
    _id: {
      type: Schema.Types.ObjectId,
    },
    type: {
      type: String,
      enum: [ 'category', 'page' ],
      enumDesc: 'category:分类, page:页面',
    },
    parent: {
      type: String,
      max: 100,
      required: true,
    },
    power: {
      type: Number,
      max: 100,
      required: true,
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

  return mongoose.model('Menu', MenuSchema);
};
