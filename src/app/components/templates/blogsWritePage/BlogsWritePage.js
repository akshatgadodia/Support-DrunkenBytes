import React, {useState} from "react";
import styles from "./blogsWritePage.module.css";
import Head from 'next/head';
import { Button, Form, Input, DatePicker, Modal, Spin } from "antd";
import dynamic from "next/dynamic";
let Editor = dynamic(() => import("@/app/components/modules/Editor"), {
  ssr: false
});
const BlogsWritePage = () => {
  const [blogData,setBlogData] = useState({});
  const editorCore = React.useRef(null);
  const [form] = Form.useForm();
  const onFinish = async values => {
    try {
      // const result = await sendRequest(
      //   "/nft/mint-nft",
      //   "POST",
      //   JSON.stringify({
      //     createdBy: values.createdBy,
      //     buyerName: values.buyerName,
      //     buyerEmail: values.buyerEmail,
      //     brandName: values.brandName,
      //     productName: values.productName,
      //     productId: values.productId,
      //     warrantyExpireDate: values.warrantyExpireDate.$d,
      //     buyerMetamaskAddress: values.buyerMetamaskAddress,
      //     methodType: 0
      //   })
      // );
      // if (!error) {
      //   setTransactionID(result.txId);
      //   setOpenModal(true);
      //   form.resetFields();
      // 
      const savedData = await editorCore.current.save();
      console.log("Title");
      console.log(values.title)
      console.log("URL");
      console.log(values.url)
      console.log("BLOG DATA");
      console.log(savedData);
    } catch (err) {}
  };
  return (
    <div className={styles.writeBlog}>
      <Head>
        <title>Write Blog | Support Drunken Bytes</title>
      </Head>
      <h1>Write a Blog</h1>
      <p className={styles.p}>Write whats on your mind</p>
      <div className={styles.blogDiv}>
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
            <Editor data={blogData} setData={setBlogData} editorCore={editorCore}/>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              CREATE BLOG
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};


export default BlogsWritePage;
