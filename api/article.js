import { request } from '@/plugins/request'

// 公共文章列表
export const getPublicArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 关注文章列表
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const cancelFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 文章详情
export const getArticleDetail = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 文章评论
export const getArticleComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 添加文章评论
export const addArticleComment = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}

// 添加文章
export const addArticle = data => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

// 修改文章
export const updateArticle = (slug, data) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })
}

// 删除文章
export const delArticle= slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}