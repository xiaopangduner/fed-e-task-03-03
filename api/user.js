import { request } from '@/plugins/request'

// 登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

// 用户设置
export const userSetting = () => {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}

// 修改用户设置
export const updateSetting = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}
