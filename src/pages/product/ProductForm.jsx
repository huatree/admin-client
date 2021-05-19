/* 新增/更新商品 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Input, Cascader } from 'antd'
import { createFromIconfontCN, RollbackOutlined, CheckOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

/* 子模块
---------------------------------------------------------------- */
import PictureWall from './PictureWall'
import RichTextEditor from './RichTextEditor'

/* 功能模块
---------------------------------------------------------------- */
import { reqCategorys } from 'api'
import { BASE_IMG_URL } from 'utils/constants'

/* 调用模块：对象解构
---------------------------------------------------------------- */
const { Item } = Form
const { TextArea } = Input

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2546661_gwkl30fyvdj.js' // 在 iconfont.cn 上生成
})

/* 使用类型检查
---------------------------------------------------------------- */
ProductForm.prototype = {
  action: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddOrUpdate: PropTypes.func.isRequired
}

/* 唯一的模块导出
---------------------------------------------------------------- */
function ProductForm(props) {
  const {
    action: { type, data: product },
    onClose,
    onAddOrUpdate
  } = props
  const { imgs, detail: html } = product
  const [form] = Form.useForm()

  const [fileList, setFileList] = useState(() => {
    if (imgs && imgs.length > 0) {
      return imgs.map((img, index) => ({
        uid: -index, // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
        name: img, // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: BASE_IMG_URL + img
      }))
    }
    return []
  }) // 所有已上传图片文件对象的数组
  const [options, setOptions] = useState([]) // 商品分类级联
  const [editorState, setEditorState] = useState(() => {
    if (html) {
      const contentBlock = htmlToDraft(html)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      return editorState
    }
    return EditorState.createEmpty()
  }) // 富文本内容状态

  // const [parentId, setParentId] = useState('0')

  /**
   *  获取一级分类列表
   * @param {*} parentId
   * @returns
   */
  const getCategorys = async parentId => {
    const res = await reqCategorys({ parentId })
    if (res.status === 0) {
      const categorys = res.data || []
      if (parentId === '0') {
        const options = categorys.map(item => ({
          value: item._id,
          label: item.name,
          isLeaf: false
        }))

        setOptions(options)
      } else {
        return categorys
      }
    }
  }

  const getCategoryOfUp = async parentId => {
    const res = await reqCategorys({ parentId: '0' })
    if (res.status === 0) {
      const categorys = res.data || []
      const options = categorys.map(item => ({
        value: item._id,
        label: item.name,
        isLeaf: false
      }))
      if (parentId !== '0') {
        const subRes = await reqCategorys({ parentId })
        if (subRes.status === 0) {
          const subCategorys = subRes.data
          const childOptions = subCategorys.length
            ? subCategorys.map(cItem => ({
                value: cItem._id,
                label: cItem.name,
                isLeaf: true
              }))
            : []
          if (childOptions.length) {
            const targetOption = options.find(option => option.value === parentId)
            targetOption.children = childOptions
          }
        }
      }
      setOptions(options)
    }
  }

  const loadData = async selectedOptions => {
    const targetOption = selectedOptions[0]

    targetOption.loading = true
    // 根据选中的分类, 请求获取二级分类列表
    const subCategorys = await getCategorys(targetOption.value)
    targetOption.loading = false

    if (subCategorys && subCategorys.length) {
      // 生成一个二级列表的options
      targetOption.children = subCategorys.map(item => ({
        value: item._id,
        label: item.name,
        isLeaf: true
      }))
      // 更新options状态
      setOptions([...options])
    } else {
      // 当前选中的分类没有二级分类
      targetOption.isLeaf = true
    }
  }

  /**
   * 保存
   */
  const onSave = () => {
    form.validateFields().then(values => {
      form.resetFields()
      const imgs = fileList.map(item => item.name)
      const editor = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      const { name, desc, price, categoryIds } = values
      let pCategoryId, categoryId
      if (categoryIds.length === 1) {
        pCategoryId = '0'
        categoryId = categoryIds[0]
      } else {
        pCategoryId = categoryIds[0]
        categoryId = categoryIds[1]
      }
      onAddOrUpdate({ name, desc, price, imgs, detail: editor, pCategoryId, categoryId })
    })
  }

  useEffect(() => {
    if(type === 'add') getCategorys('0')
    if(type === 'up') getCategoryOfUp(product.pCategoryId)
  }, [type,  product.pCategoryId])

  useEffect(() => {
    if (type === 'up') {
      let categoryIds = []
      if (product.pCategoryId === '0') {
        categoryIds = [product.categoryId]
      } else {
        categoryIds = [product.pCategoryId, product.categoryId]
      }
      form.setFieldsValue(product)
      options.length && form.setFieldsValue({ categoryIds })
    }
  }, [type, form, product, options])

  return (
    <>
      <Card
        size='small'
        title={
          <>
            <Icon type='icon-setting' />
            <span style={{ marginLeft: 10 }}>{type === 'add' ? '新增商品' : '更新商品'}</span>
          </>
        }
      >
        <Form layout='vertical' wrapperCol={{ span: 10 }} form={form}>
          <Item name='name' label='商品名称' rules={[{ required: true, message: '必须输入商品名称' }]}>
            <Input />
          </Item>
          <Item name='desc' label='商品描述' rules={[{ required: true, message: '必须输入商品描述' }]}>
            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
          </Item>
          <Item name='price' label='商品价格' rules={[{ required: true, message: '必须输入商品价格' }]}>
            <Input type='number' addonAfter='元' />
          </Item>
          <Item name='categoryIds' label='商品分类' rules={[{ required: true, message: '必须选择商品分类' }]}>
            <Cascader options={options} loadData={loadData} />
          </Item>
          <Item label='商品图片'>
            <PictureWall fileList={fileList} setFileList={(params = []) => setFileList(params)} />
          </Item>
          <Item label='商品详情' wrapperCol={{ span: 20 }}>
            <RichTextEditor editorState={editorState} setEditorState={params => setEditorState(params)} />
          </Item>
        </Form>
      </Card>

      <div style={{ marginLeft: '20%', marginTop: 10, marginBottom: 30 }}>
        <Button style={{ marginRight: 10 }} type='primary' icon={<CheckOutlined />} onClick={onSave}>
          保存
        </Button>
        <Button
          icon={<RollbackOutlined />}
          onClick={() => {
            form.resetFields()
            onClose()
          }}
        >
          关闭
        </Button>
      </div>
    </>
  )
}

export default ProductForm
