'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    user_email: {
      type: String,
      required: true,
      unique: true,
      max: 20,
    },
    user_level: {
      type: Number,
      enum: [ 1, 2 ],
      enumDesc: '1：管理员，2：编辑',
      required: true,
    },
    user_name: {
      type: String,
      required: true,
      unique: true,
      max: 20,
    },
    user_password: {
      type: String,
      match: /\w+/,
      required: true,
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
    user_status: {
      type: Number,
      enum: [ 0, 1 ],
      enumDesc: '0：禁用, 1：启用',
      required: true,
    },
  }, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });

  return mongoose.model('User', UserSchema);
};
