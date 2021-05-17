/* 状态标签 */

/* 调用模块
---------------------------------------------------------------- */
import React from 'react'

import './index.less'

/* 唯一的模块导出
---------------------------------------------------------------- */
function Span(props) {
  return <span className={['i-span', `i-span-${props.type}`, props.className].join(' ')}>{props.children}</span>
}

export default Span
