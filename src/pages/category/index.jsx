/* 品类管理 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useState, useEffect } from 'react'
import { Card, Table, Button } from 'antd'
import { createFromIconfontCN, PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'

/* 子模块
---------------------------------------------------------------- */
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'

/* 功能模块
---------------------------------------------------------------- */
import { reqCategorys, reqAddCategory, reqUpdateCategory } from 'api'

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2546661_gwkl30fyvdj.js' // 在 iconfont.cn 上生成
})

/* 唯一的模块导出
---------------------------------------------------------------- */
function Category() {
  const [isLoading, setIsLoading] = useState(false) // 是否正在获取数据中
  const [parentId, setParentId] = useState('0') // 当前需要显示的分类列表的父分类ID
  const [categorys, setCategorys] = useState([]) // 一级分类列表
  const [subCategorys, setSubCategorys] = useState([]) // 二级分类列表
  const [parentName, setParentName] = useState('') // 当前需要显示的分类列表的父分类名称
  const [action, setAction] = useState({ type: '', data: {} }) // 操作类型

  const showTitle =
    parentId === '0' ? (
      <span>一级分类列表</span>
    ) : (
      <span>
        <span style={{ color: '#1951be', cursor: 'pointer' }} onClick={() => showCategorys()}>
          一级分类列表
        </span>
        <ArrowRightOutlined style={{ marginLeft: 10 }} />
        <span style={{ marginLeft: 10 }}>{parentName}</span>
      </span>
    )

  /**
   * 初始化列表
   */
  const initColumns = [
    {
      title: '分类的名称',
      dataIndex: 'name'
    },
    {
      title: '操作',
      width: 250,
      align: 'center',
      render: category => (
        <span>
          <Button type='link' onClick={() => onShowAction('up', category)}>
            更新分类
          </Button>
          {parentId === '0' ? (
            <Button type='link' onClick={() => onShowAction('see', category)}>
              查看子分类
            </Button>
          ) : null}
        </span>
      )
    }
  ]

  /**
   * 获取一级/二级分类的列表
   * @param {*} params
   */
  const getCategorys = async params => {
    setIsLoading(true)
    try {
      const res = await reqCategorys(params)
      if (res.status === 0) {
        if (params.parentId === '0') {
          setCategorys(res.data)
        } else {
          setSubCategorys(res.data)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onShowAction = (type, data = {}) => {
    switch (type) {
      case 'see':
        setParentId(data._id)
        setParentName(data.name)
        break

      default:
        setAction({ type, data })
        break
    }
  }

  const onCancelCategory = form => {
    form.resetFields()
    setAction({ ...action, type: '' })
  }

  /**
   * 添加分类
   * @param {*} value
   */
  const onAddCategory = async values => {
    const res = await reqAddCategory(values)
    if (res.status === 0) {
      setAction({ ...action, type: '' })
      if (values.parentId === parentId) {
        getCategorys({ parentId })
      } else {
        getCategorys({ parentId: '0' })
      }
    }
  }

  /**
   * 显示指定一级分类列表
   */
  const showCategorys = () => {
    setParentId('0')
    setParentName('')
    setSubCategorys([])
  }

  /**
   * 更新分类
   */
  const onUpdateCategory = async values => {
    const res = await reqUpdateCategory({ categoryId: action.data._id, ...values })
    if (res.status === 0) {
      setAction({ ...action, type: '' })
      getCategorys({ parentId })
    }
  }

  useEffect(() => {
    getCategorys({ parentId })

    return () => {
      setCategorys(category => category)
      setSubCategorys(subCategorys => subCategorys)
    }
  }, [parentId])

  return (
    <>
      <Card
        size='small'
        title={
          <>
            <Icon type='icon-menu' style={{ marginRight: 10 }} />
            <span>品类管理</span>
          </>
        }
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={() => onShowAction('add')}>
            新增
          </Button>
        }
      >
        <div style={{ marginBottom: 10 }}>{showTitle}</div>
        <Table
          bordered
          scroll={{ y: 450 }}
          rowKey='_id'
          loading={isLoading}
          dataSource={parentId === '0' ? categorys : subCategorys}
          columns={initColumns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
      </Card>

      <AddForm
        visible={action.type === 'add'}
        categorys={categorys}
        parentId={parentId}
        onCancel={onCancelCategory}
        onAdd={onAddCategory}
      />
      <UpdateForm
        visible={action.type === 'up'}
        categoryName={action.data.name}
        onCancel={() => {
          setAction({ ...action, type: '' })
        }}
        onUpdate={onUpdateCategory}
      />
    </>
  )
}

export default Category
