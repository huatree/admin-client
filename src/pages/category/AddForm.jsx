/* 新增分类 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useEffect } from 'react'
import { Form, Input, Select, Modal } from 'antd'
import PropTypes from 'prop-types'

/* 调用模块：对象解构
---------------------------------------------------------------- */
const { Item } = Form
const { Option } = Select

/* 使用类型检查
---------------------------------------------------------------- */
AddForm.prototype = {
  visible: PropTypes.bool.isRequired,
  categorys: PropTypes.array.isRequired,
  parentId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
}

/* 唯一的模块导出
---------------------------------------------------------------- */
function AddForm(props) {
  const { visible, categorys, parentId, onCancel, onAdd } = props

  const [form] = Form.useForm()

  const onOk = () => {
    form.validateFields().then(values => {
      form.resetFields()
      onAdd(values)
    })
    // .catch(info => {
    //   console.log('Validate Failed:', info)
    // })
  }

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ parentId })
    }
  }, [visible, form, parentId])

  return (
    <Modal
      title='新增分类'
      visible={visible}
      onCancel={() => {
        onCancel(form)
      }}
      onOk={onOk}
    >
      <Form form={form}>
        <Item name='parentId'>
          <Select placeholder='品类'>
            <Option value='0'>一级分类</Option>
            {categorys.map(c => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          name='categoryName'
          rules={[
            { required: true, message: '分类名称必须输入' },
            { pattern: /^[^\s]+[\s]*.*$/, message: '开头不能为空' }
          ]}
        >
          <Input placeholder='请输入分类名称' />
        </Item>
      </Form>
    </Modal>
  )
}

export default AddForm
