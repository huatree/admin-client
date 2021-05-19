/* 上传图片 */

/* 调用模块
---------------------------------------------------------------- */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

/* 功能模块
---------------------------------------------------------------- */
import { BASE_URL, BASE_IMG_URL } from 'utils/constants'
import { reqDeleteImg } from 'api'

/* 使用类型检查
---------------------------------------------------------------- */
PictureWall.prototype = {
  fileList: PropTypes.array.isRequired,
  setFileList: PropTypes.func.isRequired
}

/* 唯一的模块导出
---------------------------------------------------------------- */
function PictureWall(props) {
  const { fileList, setFileList } = props
  const [previewVisible, setPreviewVisible] = useState(false) // 标识是否显示大图预览Modal
  const [previewImage, setPreviewImage] = useState('') // 大图的URL
  const [previewTitle, setPreviewTitle] = useState('') // 图片名称

  /**
   * 显示指定file对应的大图
   * @param {*} file
   */
  const onPreview = file => {
    // console.log(file)
    setPreviewImage(file.url || file.thumbUrl)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const onChangeImage = async ({ file, fileList }) => {
    // console.log('handleChange()', file.status, fileList.length, file === fileList[fileList.length - 1])
    // 一旦上传成功, 将当前上传的file的信息修正(name, url)
    let res
    switch (file.status) {
      case 'done':
        res = file.response // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
        if (res.status === 0) {
          message.success('上传图片成功!')
          const { name, url } = res.data
          file = fileList[fileList.length - 1]
          file.name = name
          file.url = url
        } else {
          message.success('上传图片失败!')
        }
        break
      case 'removed':
        // 删除图片
        res = await reqDeleteImg({ name: file.name })
        if (res.status === 0) {
          message.success('删除图片成功!')
        } else {
          message.error('删除图片失败!')
        }
        break

      default:
        break
    }
    // 在操作(上传/删除)过程中更新fileList状态
    setFileList(fileList)
  }

  /**
   * 上传按钮
   */
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div>上传</div>
    </div>
  )

  return (
    <>
      <Upload
        action={`${BASE_URL}/manage/img/upload`} // 上传图片的接口地址
        accept='image/*' // 只接收图片格式
        name='image' // 请求参数名
        listType='picture-card' // 卡片样式
        fileList={fileList}
        onPreview={onPreview}
        onChange={onChangeImage}
      >
        {fileList.length >= 4 ? null : uploadButton}
      </Upload>
      <Modal title={previewTitle} visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img src={BASE_IMG_URL + previewImage.slice(previewImage.lastIndexOf('/'))} alt='' />
      </Modal>
    </>
  )
}

export default PictureWall
