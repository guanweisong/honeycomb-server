'use strict';

module.exports = app => {
  const { router, controller } = app;
  const roleAuthority = app.middleware.roleAuthority;
  // 用户
  router.get('users', '/users', controller.user.index);
  router.post('users', '/users', controller.user.create);
  router.delete('users', '/users/:id', controller.user.destroy);
  router.patch('users', '/users/:id', controller.user.update);
  // 链接
  router.get('links', '/links', controller.link.index);
  router.post('links', '/links', controller.link.create);
  router.delete('links', '/links/:id', controller.link.destroy);
  router.patch('links', '/links/:id', controller.link.update);
  // 文章分类
  router.get('categories', '/categories', controller.category.index);
  router.post('categories', '/categories', controller.category.create);
  router.delete('categories', '/categories/:id', controller.category.destroy);
  router.patch('categories', '/categories/:id', controller.category.update);
  // 页面
  router.get('pages', '/pages', controller.page.index);
  router.post('pages', '/pages', controller.page.create);
  router.delete('pages', '/pages/:id', controller.page.destroy);
  router.patch('pages', '/pages/:id', controller.page.update);
  // 文章
  router.get('posts', '/posts', controller.post.index);
  router.post('posts', '/posts', controller.post.create);
  router.delete('posts', '/posts/:id', controller.post.destroy);
  router.patch('posts', '/posts/:id', controller.post.update);
  // 标签
  router.get('tags', '/tags', controller.tag.index);
  router.post('tags', '/tags', controller.tag.create);
  router.delete('tags', '/tags/:id', roleAuthority, controller.tag.destroy);
  router.patch('tags', '/tags/:id', controller.tag.update);
  // 评论
  router.get('comments', '/comments', controller.comment.index);
  router.get('comments', '/comments/:id', controller.comment.indexByPostId);
  router.post('comments', '/comments', controller.comment.create);
  router.delete('comments', '/comments/:id', controller.comment.destroy);
  router.patch('comments', '/comments/:id', controller.comment.update);
  // 媒体
  router.get('media', '/media', controller.media.index);
  router.post('media', '/media', controller.media.create);
  router.delete('media', '/media/:id', controller.media.destroy);
  // 权限认证
  router.post('access', '/access/login', controller.access.login);
  router.post('access', '/access/logout', controller.access.logout);
  router.post('access', '/access/verify', controller.access.verify);
  // 设置
  router.get('settings', '/settings', controller.setting.index);
  router.put('settings', '/settings', controller.setting.update);
  // 统计
  router.get('statistics', '/statistics', controller.statistics.index);
};
