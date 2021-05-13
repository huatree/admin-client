/* 包含 n 个操作 local storage 的工具函数的模块 */

import store from 'store'

const USER_KEY = 'user_key'

const saveUser = user => {
  store.set(USER_KEY, user)
}

const getUser = () => store.get(USER_KEY) || {}

const removeUser = () => {
  store.remove(USER_KEY)
}

export { saveUser, getUser, removeUser }
