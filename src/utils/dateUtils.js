/* 包含n个日期时间处理的工具函数模块 */

/**
 * 格式化日期
 * @param {*} time
 * @returns
 */
export function formateDate(time) {
  if (!time) return ''
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}
