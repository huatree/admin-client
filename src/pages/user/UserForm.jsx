/* 新增/更新用户 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const { Item } = Form
const { Option } = Select

/* 使用类型检查
---------------------------------------------------------------- */
UserForm.prototype = {
  action: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAddOrUpdate: PropTypes.func.isRequired
}

/* 唯一的模块导出
---------------------------------------------------------------- */
function UserForm(props) {
  const {
    action: { type, data },
    roles,
    onCancel,
    onAddOrUpdate
  } = props

  const [form] = Form.useForm()

  const onOk = () => {
    form.validateFields().then(values => {
      onAddOrUpdate(form, values)
    })
  }

  useEffect(() => {
    if (type === 'up') form.setFieldsValue(data)
    if (type === 'add') form.resetFields()
  }, [type, form, data])

  return (
    <Modal
      title={type === 'add' ? '新增用户' : '更新用户'}
      visible={type !== ''}
      onCancel={() => {
        onCancel(form)
      }}
      onOk={onOk}
    >
      <Form form={form}>
        <Item
          name='username'
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 4, message: '用户名至少4位' },
            { max: 12, message: '用户名最多12位' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
          ]}
        >
          <Input placeholder='用户名' />
        </Item>
        {type === 'up' ? null : (
          <Item
            name='password'
            rules={[
              { required: true, message: '请输入密码' },
              { min: 4, message: '密码至少4位' },
              { max: 12, message: '密码最多12位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' }
            ]}
          >
            <Input placeholder='密码' />
          </Item>
        )}
        <Item name='phone' rules={[{ required: true, message: '请输入手机号' }]}>
          <Input placeholder='手机号' />
        </Item>
        <Item name='email' rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input placeholder='邮箱' />
        </Item>
        <Item name='role_id' rules={[{ required: true, message: '请选择角色' }]}>
          <Select placeholder='角色'>
            {roles.map(item => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Item>
      </Form>
    </Modal>
  )
}

export default UserForm
