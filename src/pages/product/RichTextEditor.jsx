/* 富文本编辑器 */

/* 调用模块
---------------------------------------------------------------- */
import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import PropTypes from 'prop-types'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { BASE_URL } from 'utils/constants'

/* 使用类型检查
---------------------------------------------------------------- */
RichTextEditor.prototype = {
  setEditorState: PropTypes.func.isRequired
}

/* 唯一的模块导出
---------------------------------------------------------------- */
function RichTextEditor(props) {
  const { editorState, setEditorState } = props

  const uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `${BASE_URL}/manage/img/upload`)
      const data = new FormData()
      data.append('image', file)
      xhr.send(data)
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText)
        const url = response.data.url // 得到图片的url
        resolve({ data: { link: url } })
      })
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText)
        reject(error)
      })
    })
  }

  return (
    <Editor
      editorState={editorState}
      editorStyle={{ border: '1px solid #d9d9d9', minHeight: 200, maxHeight: 500, paddingLeft: 10 }}
      onEditorStateChange={editorState => setEditorState(editorState)}
      toolbar={{
        image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } }
      }}
    />
  )
}

export default RichTextEditor
