/* 商品详情 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Divider, Button, Affix } from 'antd'
import { createFromIconfontCN, RollbackOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

/* 功能模块
---------------------------------------------------------------- */
import { reqCategory, reqConcurrent } from 'api'
import { BASE_IMG_URL } from 'utils/constants'

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2546661_gwkl30fyvdj.js' // 在 iconfont.cn 上生成
})

/* 使用类型检查
---------------------------------------------------------------- */
Detail.prototype = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

/* 唯一的模块导出
---------------------------------------------------------------- */
function Detail(props) {
  const { product, onClose } = props
  // const { history, location} = props

  const [cName1, setCName1] = useState('') // 一级分类名称
  const [cName2, setCName2] = useState('') // 二级分类名称

  const { name, desc, price, categoryId, pCategoryId, imgs, detail } = product
  // const { name, desc, price, categoryId, pCategoryId, imgs, detail } = location.state ? location.state.product : {}

  const getCategoryName = async (pCategoryId, categoryId) => {
    let res
    if (pCategoryId === '0') {
      res = await reqCategory({ categoryId })
      if (res.status === 0) {
        setCName1(res.data.name)
      }
    } else {
      res = await reqConcurrent([reqCategory({ categoryId: pCategoryId }), reqCategory({ categoryId })])
      if (res) {
        setCName1(res[0].data.name)
        setCName2(res[1].data.name)
      }
    }
  }

  useEffect(() => {
    getCategoryName(pCategoryId, categoryId)
  }, [pCategoryId, categoryId])

  return (
    <Card
      size='small'
      title={
        <>
          <Icon type='icon-setting' />
          <span style={{ marginLeft: 10 }}>商品详情</span>
        </>
      }
      extra={
        <Affix offsetTop={80}>
          <Button
            icon={<RollbackOutlined />}
            onClick={onClose}
          >
            关闭
          </Button>
        </Affix>
      }
    >
      <Row>
        <Col style={{ fontSize: 20, fontWeight: 'bold' }}>商品名称:</Col>
      </Row>
      <Row>
        <Col>{name}</Col>
      </Row>
      <Divider style={{ margin: '10px 0' }} dashed />

      <Row>
        <Col style={{ fontSize: 20, fontWeight: 'bold' }}>商品描述:</Col>
      </Row>
      <Row>
        <Col>{desc}</Col>
      </Row>
      <Divider style={{ margin: '10px 0' }} dashed />

      <Row>
        <Col style={{ fontSize: 20, fontWeight: 'bold' }}>商品价格:</Col>
      </Row>
      <Row>
        <Col>{price}元</Col>
      </Row>
      <Divider style={{ margin: '10px 0' }} dashed />

      <Row>
        <Col style={{ fontSize: 20, fontWeight: 'bold' }}>所属分类:</Col>
      </Row>
      <Row>
        <Col>
          {cName1} {cName2 !== '' ? ' --> ' + cName2 : ''}
        </Col>
      </Row>
      <Divider style={{ margin: '10px 0' }} dashed />

      <Row>
        <Col style={{ fontSize: 20, fontWeight: 'bold' }}>商品图片:</Col>
      </Row>
      <Row>
        <Col>
          {imgs.map(img => (
            <img key={img} src={BASE_IMG_URL + img} className='product-img' alt='img' />
          ))}
        </Col>
      </Row>
      <Divider style={{ margin: '10px 0' }} dashed />

      <Row>
        <Col style={{ fontSize: 20, fontWeight: 'bold' }}>商品详情:</Col>
      </Row>
      <Row>
        <Col>
          <span dangerouslySetInnerHTML={{ __html: detail }}></span>
        </Col>
      </Row>
      <Divider style={{ margin: '10px 0' }} dashed />
    </Card>
  )
}

export default Detail
