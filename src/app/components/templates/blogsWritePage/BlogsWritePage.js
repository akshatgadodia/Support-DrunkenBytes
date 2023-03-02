import React, { useState } from "react";
import styles from "./blogsWritePage.module.css";
import Head from "next/head";
import { Button, Form, Input } from "antd";
import dynamic from "next/dynamic";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import { uploadImage } from "@/app/utils/uploadImage"
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, notification } from 'antd';

let Editor = dynamic(() => import("@/app/components/modules/Editor"), {
  ssr: false
});

const BlogsWritePage = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const { error, sendRequest, isLoading } = useHttpClient();
  const [BlogData, setBlogData] = useState({});
  const editorCore = React.useRef(null);
  const [form] = Form.useForm();
  const onFinish = async values => {
    try {
      const savedData = await editorCore.current.save();
      if(fileList.length === 0){
        notification.error({
          message: "Image Required",
          description: `Main Image Required` ,
          placement: "top",
          className: "error-notification"
        });
      }
      const data = { title: values.title, url: values.url, content: JSON.stringify(savedData), image: fileList[0].url }
      await sendRequest(
        `/blog/save-blog`,
        "POST",
        JSON.stringify(data)
      );
      if (!error) {
        notification.success({
          message: "Blog Created Successfully",
          description: `Blog ${values.title} created successfully` ,
          placement: "top",
          className: "error-notification"
        });
        form.resetFields();
        setFileList([]);
        await editorCore.current.clear();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadMainImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    try {
      const res = await uploadImage(file)
      onSuccess("Ok");
      setFileList([{
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: res.file.url
      }])
    } catch (err) {
      console.log(err);
      onError({ err });
    }
  };
  const removeMainImage = async (file) => {
    console.log(file)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  
  return (
    <div className={styles.writeBlog}>
      <Head>
        <title>Write Blog | Support Drunken Bytes</title>
      </Head>
      <h1>Write a Blog</h1>
      <p className={styles.p}>Write whats on your mind</p>
      <div className={styles.BlogDiv}>
        <Form
          name="basic"
          form={form}
          style={{ maxWidth: "100%" }}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter Blog Title"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Blog Title" className={styles.input} />
          </Form.Item>
          <Form.Item
            name="url"
            rules={[
              {
                required: true,
                message: "Please enter Blog URL"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Blog URL" className={styles.input} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter Main Photo"
              }
            ]}
            className={styles.formItem}>
            <Upload
              accept="image/*"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              customRequest={uploadMainImage}
              onRemove={removeMainImage}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>
          <Editor data={BlogData} setData={setBlogData} editorCore={editorCore} />
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              CREATE Blog
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BlogsWritePage;
