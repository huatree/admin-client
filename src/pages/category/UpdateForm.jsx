/* 更新分类 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useEffect } from 'react'
import { Modal, Form, Input } from 'antd'
import PropTypes from 'prop-types'

/* 使用类型检查
---------------------------------------------------------------- */
UpdateForm.prototype = {
  visible: PropTypes.bool.isRequired,
  categoryName: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

/* 唯一的模块导出
---------------------------------------------------------------- */
function UpdateForm(props) {
  const { visible, categoryName, onUpdate, onCancel } = props

  const [form] = Form.useForm()

  const onOk = () => {
    form.validateFields().then(values => {
      form.resetFields()
      onUpdate(values)
    })
  }

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ categoryName })
    }
  }, [visible, form, categoryName])

  return (
    <Modal
      title='更新分类'
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form}>
        <Form.Item name='categoryName' rules={[{ required: true, message: '分类名称必须输入' }]}>
          <Input placeholder='请输入分类名称' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateForm
