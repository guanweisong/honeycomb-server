'use strict';

module.exports = app => {
  const { router, controller } = app;
  const roleAuthority = app.middleware.roleAuthority;
  // 用户
  router.get('users', '/users', controller.user.index);
  router.post('users', '/users', roleAuthority([ 1 ]), controller.user.create);
  router.delete('users', '/users/:id', roleAuthority([ 1 ]), controller.user.destroy);
  router.patch('users', '/users/:id', roleAuthority([ 1 ]), controller.user.update);
  // 链接
  router.get('links', '/links', controller.link.index);
  router.post('links', '/links', roleAuthority([ 1, 2 ]), controller.link.create);
  router.delete('links', '/links/:id', roleAuthority([ 1, 2 ]), controller.link.destroy);
  router.patch('links', '/links/:id', roleAuthority([ 1, 2 ]), controller.link.update);
  // 文章分类
  router.get('categories', '/categories', controller.category.index);
  router.post('categories', '/categories', roleAuthority([ 1, 2, 3 ]), controller.category.create);
  router.delete('categories', '/categories/:id', roleAuthority([ 1, 2 ]), controller.category.destroy);
  router.patch('categories', '/categories/:id', roleAuthority([ 1, 2 ]), controller.category.update);
  // 页面
  router.get('pages', '/pages', controller.page.index);
  router.post('pages', '/pages', roleAuthority([ 1, 2, 3 ]), controller.page.create);
  router.delete('pages', '/pages/:id', roleAuthority([ 1, 2 ]), controller.page.destroy);
  router.patch('pages', '/pages/:id', roleAuthority([ 1, 2 ]), controller.page.update);
  // 文章
  router.get('posts', '/posts', controller.post.index);
  router.post('posts', '/posts', roleAuthority([ 1, 2, 3 ]), controller.post.create);
  router.delete('posts', '/posts/:id', roleAuthority([ 1, 2 ]), controller.post.destroy);
  router.patch('posts', '/posts/:id', roleAuthority([ 1, 2 ]), controller.post.update);
  // 标签
  router.get('tags', '/tags', controller.tag.index);
  router.post('tags', '/tags', roleAuthority([ 1, 2, 3 ]), controller.tag.create);
  router.delete('tags', '/tags/:id', roleAuthority([ 1, 2, 3 ]), controller.tag.destroy);
  router.patch('tags', '/tags/:id', roleAuthority([ 1, 2, 3 ]), controller.tag.update);
  // 评论
  router.get('comments', '/comments', controller.comment.index);
  router.get('comments', '/comments/:id', controller.comment.indexByPostId);
  router.post('comments', '/comments', controller.comment.create);
  router.patch('comments', '/comments/:id', roleAuthority([ 1, 2 ]), controller.comment.update);
  // 媒体
  router.get('media', '/media', roleAuthority([ 1, 2, 3 ]), controller.media.index);
  router.post('media', '/media', roleAuthority([ 1, 2, 3 ]), controller.media.create);
  router.delete('media', '/media/:id', roleAuthority([ 1, 2 ]), controller.media.destroy);
  // 权限认证
  router.post('access', '/access/login', controller.access.login);
  router.post('access', '/access/logout', controller.access.logout);
  router.post('access', '/access/verify', controller.access.verify);
  // 设置
  router.get('settings', '/settings', roleAuthority([ 1 ]), controller.setting.index);
  router.put('settings', '/settings', roleAuthority([ 1 ]), controller.setting.update);
  // 统计
  router.get('statistics', '/statistics', controller.statistics.index);
};
