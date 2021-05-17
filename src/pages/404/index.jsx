/* 404 */

/* 调用模块
---------------------------------------------------------------- */
import React from 'react'
import { Row, Col,Button } from 'antd'

/* 静态资源
---------------------------------------------------------------- */
import './index.less'

/* 唯一的模块导出
---------------------------------------------------------------- */
function ErrorPage(props) {
  return (
    <Row className='not-found'>
      <Col span={12} className='left'></Col>
      <Col span={12} className='right'>
        <h1>404</h1>
        <h2>抱歉，你访问的页面不存在</h2>
        <div>
          <Button type='primary' onClick={() => props.history.replace('/home')}>
            回到首页
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default ErrorPage
