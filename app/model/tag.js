'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TagSchema = new Schema({
    tag_name: {
      type: String,
      max: 20,
      unique: true,
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

  return mongoose.model('Tag', TagSchema);
};
