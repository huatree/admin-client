/* axios统一配置 */

/* 调用模块
---------------------------------------------------------------- */
import axios from 'axios'

/* 唯一模块导出
---------------------------------------------------------------- */
export default function ajax(baseURL, url, data = {}, method = 'GET') {
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
