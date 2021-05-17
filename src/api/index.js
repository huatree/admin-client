/* api请求 */

/* 功能模块
---------------------------------------------------------------- */
import { ajax, ajaxAll } from './ajax'
import { BASE_URL, POST } from 'utils/constants'

/* 登录模块
---------------------------------------------------------------- */
// 请求登录
export const reqLogin = params => ajax(BASE_URL, '/login', params, POST)

/* 商品模块
---------------------------------------------------------------- */
// 获取一级/二级分类的列表
export const reqCategorys = params => ajax(BASE_URL, '/manage/category/list', params)

// 新增分类
export const reqAddCategory = params => ajax(BASE_URL, '/manage/category/add', params, POST)

// 更新分类
export const reqUpdateCategory = params => ajax(BASE_URL, '/manage/category/update', params, POST)

// 获取商品分页列表
// export const reqProducts = params => ajax(BASE_URL, '/manage/product/list', params)
export const reqProducts = params => ajax(BASE_URL, '/manage/product/search', params)

// 更新商品的状态
export const reqUpProductStatus = params => ajax(BASE_URL, '/manage/product/updateStatus', params, POST)

// 查询商品的分页列表
// export const reqQueryProducts = params => ajax(BASE_URL.anchor, '/manage/product/search', params)

// 获取一个分类
export const reqCategory = params => ajax(BASE_URL, '/manage/category/info', params)

// 并发请求一级分类和二级分类
export const reqConcurrent = params => ajaxAll(params)

// 删除上传的图片
export const reqDeleteImg = params => ajax(BASE_URL, '/manage/img/delete', params, POST)

// 新增/更新商品
export const reqAddOrUpdateProduct = params => ajax(BASE_URL, `/manage/product/${params._id ? 'update' : 'add'}`, params, POST)

/* 角色管理模块
---------------------------------------------------------------- */
// 获取所有用户的列表
export const reqUsers = () => ajax(BASE_URL, '/manage/user/list')

// 删除指定用户
export const reqDeleteUser = params => ajax(BASE_URL, '/manage/user/delete', params, POST)

// 添加用户
export const reqAddUser = params => ajax(BASE_URL, '/manage/user/add', params, POST)

// 更新用户
export const reqUpdateUser = params => ajax(BASE_URL, '/manage/user/update', params, POST)

/* 角色管理模块
---------------------------------------------------------------- */
// 获取所有角色的列表
export const reqRoles = () => ajax(BASE_URL, '/manage/role/list')

// 创建角色
export const reqAddRole = params => ajax(BASE_URL, '/manage/role/add', params, POST)

// 修改角色
export const reqUpdateRole = params => ajax(BASE_URL, '/manage/role/update', params, POST)
