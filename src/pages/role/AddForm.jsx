/* 创建角色 */

/* 调用模块
---------------------------------------------------------------- */
import React from 'react'
import { Modal, Form, Input } from 'antd'
import PropTypes from 'prop-types'

/* 使用类型检查
---------------------------------------------------------------- */
AddForm.prototype = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAddRole: PropTypes.func.isRequired
}

/* 唯一的模块导出
---------------------------------------------------------------- */
function AddForm(props) {
  const { visible, onCancel, onAddRole } = props
  const [form] = Form.useForm()

  const onOk = () => {
    form.validateFields().then(values => {
      form.resetFields()
      onAddRole(values)
    })
  }

  return (
    <Modal
      title='创建角色'
      visible={visible}
      onCancel={() => {
        onCancel(form)
      }}
      onOk={onOk}
    >
      <Form form={form}>
        <Form.Item name='roleName' rules={[{ required: true, message: '角色名称必须输入' }]}>
          <Input placeholder='角色名称' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddForm
