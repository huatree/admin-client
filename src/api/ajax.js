/* axios统一配置 */

/* 调用模块
---------------------------------------------------------------- */
import axios from 'axios'

/* 唯一模块导出
---------------------------------------------------------------- */
/**
 * 单个请求
 * @param {*} baseURL 
 * @param {*} url 
 * @param {*} data 
 * @param {*} method 
 * @returns 
 */
export function ajax(baseURL, url, data = {}, method = 'GET') {
  const instance = axios.create({
    baseURL,
    timeout: 5000
  })

  instance.interceptors.response.use(
    res => res.data,
    err => err
  )

  if (method === 'GET') return instance.get(url, { params: data })
  return instance.post(url, data)
}

/**
 * 并发请求
 * @param {*} concurrent 
 */
export function ajaxAll(concurrent = []) {
  return axios.all(concurrent)
}