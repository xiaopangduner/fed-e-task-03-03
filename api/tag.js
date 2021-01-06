import { request } from '@/plugins/request'

// 文章标签列表
export const getPublicTags = params => {
  return request({
    method: 'GET',
    url: '/api/tags',
    params
  })
}