'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SettingSchema = new Schema({
    site_name: {
      type: String,
      required: true,
      max: 50,
    },
    site_subName: {
      type: String,
      max: 100,
      required: true,
    },
    site_copyright: {
      type: String,
      max: 100,
      required: true,
    },
    site_statistics: {
      type: String,
      max: 500,
    },
  });

  return mongoose.model('Setting', SettingSchema);
};
