'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('users', '/users', controller.user);
  router.resources('links', '/links', controller.link);
  router.resources('categories', '/categories', controller.category);
  router.resources('pages', '/pages', controller.page);
  router.resources('posts', '/posts', controller.post);
  router.resources('tags', '/tags', controller.tag);
  router.resources('comments', '/comments', controller.comment);
  router.resources('media', '/media', controller.media);
  // 权限认证
  router.post('access', '/access/login', controller.access.login);
  router.post('access', '/access/logout', controller.access.logout);
  router.post('access', '/access/verify', controller.access.verify);
  // 设置
  router.get('settings', '/settings', controller.setting.index);
  router.put('settings', '/settings', controller.setting.update);
  // 控制面板
  router.get('statistics', '/statistics', controller.statistics.index);
};
