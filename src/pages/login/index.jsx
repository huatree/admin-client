/* 登录 */

/* 调用模块
---------------------------------------------------------------- */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

/* 功能模块
---------------------------------------------------------------- */
import { reqLogin } from 'api'
import * as storageUtils from 'utils/storageUtils'

/* 静态资源
---------------------------------------------------------------- */
import logo from 'assets/img/logo192.png'
import './index.less'

/* 调用模块：对象解构
---------------------------------------------------------------- */
const { Item } = Form

/* 唯一的模块导出
---------------------------------------------------------------- */
function Login(props) {
  const { history } = props
  /**
   * 登录
   * @param {*} value
   */
  const onOk = async value => {
    const res = await reqLogin(value)
    if (res.status) {
      message.error(res.msg)
    } else {
      storageUtils.saveUser(res.data)
      history.replace('/')
      message.success('登录成功！')
    }
  }
  const user = storageUtils.getUser()
  if (user._id) return <Redirect to='/' />
  return (
    <div className='login'>
      <header className='login-header'>
        <img src={logo} alt='' />
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className='login-content'>
        <h2>用户登录</h2>
        <Form className='login-form' onFinish={onOk}>
          <Item
            name='username'
            rules={[
              { required: true, whitespace: true, message: '用户名必须输入' },
              { min: 4, message: '用户名至少4位' },
              { max: 12, message: '用户名最多12位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
            ]}
          >
            <Input placeholder='用户名' prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
          </Item>
          <Item
            name='password'
            rules={[
              { required: true, whitespace: true, message: '密码必须输入' },
              { min: 4, message: '密码至少4位' },
              { max: 12, message: '密码最多12位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' }
            ]}
          >
            <Input.Password
              placeholder='密码'
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              autoComplete='none'
            />
          </Item>
          <div>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              登录
            </Button>
          </div>
        </Form>
      </section>
    </div>
  )
}

export default Login
