/* 商品首页 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useState, useEffect } from 'react'
import { Card, Button, Select, Input, Table, message, Tooltip } from 'antd'
import { createFromIconfontCN, PlusOutlined, EditOutlined, SwapOutlined, SelectOutlined } from '@ant-design/icons'

/* 公共UI组件
---------------------------------------------------------------- */
import { Span } from 'components/common'

/* 子组件
---------------------------------------------------------------- */
import Detail from './Detail'
import ProductForm from './ProductForm'

/* 功能模块
---------------------------------------------------------------- */
import { PAGE_SIZE, PRODUCT_STATUS } from 'utils/constants'
import { reqProducts, reqUpProductStatus, reqAddOrUpdateProduct } from 'api'

/* 调用模块：对象解构
---------------------------------------------------------------- */
const { Option } = Select

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2546661_gwkl30fyvdj.js' // 在 iconfont.cn 上生成
})

/* 唯一的模块导出
---------------------------------------------------------------- */
function Product(props) {
  const [isLoading, setIsLoading] = useState(false) // 是否数据加载中
  const [products, setProducts] = useState([]) // 所有商品
  const [search, setSearch] = useState({ type: null, name: null }) // 搜索条件相关参数
  const [page, setPage] = useState({ pageNum: 1, pageSize: PAGE_SIZE }) // 分页相关参数
  const [total, setTotal] = useState(0) // 商品的总数量
  const [action, setAction] = useState({ type: '', data: {} }) // 操作类型

  const initColumns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: price => '¥' + price
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: status => {
        const type = status === 1 ? 'success' : 'error'
        return <Span type={type}>{PRODUCT_STATUS[status - 1]}</Span>
      }
    },
    {
      title: '操作',
      width: 150,
      align: 'center',
      render: product => {
        return (
          <>
            {/*将product对象使用state传递给目标路由组件*/}
            <Tooltip placement='bottomLeft' title='商品更新'>
              <Button icon={<EditOutlined />} onClick={() => onShowAction('up', product)} />
            </Tooltip>
            <Tooltip placement='bottomLeft' title='状态更新'>
              <Button style={{ margin: '0 10px' }} icon={<SwapOutlined />} onClick={() => onUpProductStatus(product)} />
            </Tooltip>
            <Tooltip placement='bottomLeft' title='商品详情'>
              <Button icon={<SelectOutlined />} onClick={() => onShowAction('see', product)} />
            </Tooltip>
          </>
        )
      }
    }
  ]

  const getProducts = async params => {
    setIsLoading(true)
    try {
      const res = await reqProducts(params)
      if (res.status === 0) {
        const { list, total } = res.data
        setProducts(list)
        setTotal(total)
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * 切换当前页
   * @param {*} pageNum
   * @param {*} pageSize
   */
  const onChangePage = (pageNum, pageSize) => {
    setPage({ pageNum, pageSize })
  }

  /**
   * 更新商品状态
   * @param {*} product
   */
  const onUpProductStatus = async product => {
    const { _id: productId, status } = product
    const res = await reqUpProductStatus({ productId, status: status === 1 ? 2 : 1 })
    if (res.status === 0) {
      message.success('商品状态更新成功！')
      getProducts(page)
    }
  }

  const onShowAction = (type, data = {}) => {
    setAction({ type, data })
  }

  /**
   * 新增/更新商品
   * @param {*} form
   * @param {*} values
   */
  const onAddOrUpdateProduct = async (values) => {
    const { type, data } = action
    let res = {}
    switch (type) {
      case 'add':
        res = await reqAddOrUpdateProduct(values)
        if (res.status === 0) {
          message.success('新增商品成功！')
          // form.resetFields()
          setAction({ ...action, type: '' })
          getProducts(page)
        } else {
          message.error('新增商品失败！')
        }
        break
      case 'up':
        res = await reqAddOrUpdateProduct({ _id: data._id, ...values })
        if (res.status === 0) {
          message.success('更新用户成功！')
          setAction({ ...action, type: '' })
          getProducts(page)
        } else {
          message.error('更新用户失败！')
        }
        break

      default:
        break
    }
  }

  useEffect(() => {
    getProducts(page)

    return () => {
      setProducts(products => products)
      setTotal(total => total)
    }
  }, [page])

  if (action.type === '') {
    return (
      <Card
        size='small'
        title={
          <>
            <Icon type='icon-setting' />
            <span style={{ marginLeft: 10 }}>商品管理</span>
          </>
        }
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={() => onShowAction('add')}>
            新增
          </Button>
        }
      >
        <div style={{ marginBottom: 10 }}>
          <Select
            style={{ width: 150 }}
            placeholder='查询类型'
            value={search.type}
            onChange={value => setSearch({ ...search, type: value })}
          >
            <Option value='productName'>按名称</Option>
            <Option value='productDesc'>按描述</Option>
          </Select>
          <Input
            placeholder='关键字'
            style={{ width: 150, margin: '0 15px' }}
            value={search.name}
            onChange={event => setSearch({ ...search, name: event.target.value })}
          />
          <Button
            type='primary'
            onClick={() => getProducts({ pageNum: 1, pageSize: PAGE_SIZE, [search.type]: search.name })}
          >
            查询
          </Button>
        </div>

        <Table
          bordered
          rowKey='_id'
          loading={isLoading}
          columns={initColumns}
          dataSource={products}
          pagination={{
            current: page.pageNum,
            pageSize: page.pageSize,
            // showSizeChanger	是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
            total,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条记录`,
            onChange: onChangePage
          }}
        />
      </Card>
    )
  }

  if (action.type === 'see') {
    return (
      <Detail
        product={action.data}
        onClose={() => {
          setAction({ ...action, type: '' })
        }}
      />
    )
  }

  return (
    <ProductForm action={action} onClose={() => setAction({ ...action, type: '' })} onAddOrUpdate={onAddOrUpdateProduct} />
  )
}

export default Product
