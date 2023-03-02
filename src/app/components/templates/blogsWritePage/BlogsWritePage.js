import React, {useState} from "react";
import styles from "./blogsWritePage.module.css";
import Head from 'next/head';
import { Button, Form, Input, DatePicker, Modal, Spin } from "antd";
import dynamic from "next/dynamic";
import {imageupload} from "@/app/components/elements/imageupload"
import { useHttpClient } from "@/app/hooks/useHttpClient";

let Editor = dynamic(() => import("@/app/components/modules/Editor"), {
  ssr: false
});
const BlogsWritePage = () => {
  const { error, sendRequest, isLoading } = useHttpClient();
  const [blogData,setBlogData] = useState({});
  const [mainphoto,setmainphoto]=useState("")
  const editorCore = React.useRef(null);
  const [form] = Form.useForm();
  const onFinish = async values => {
    try {
      const savedData = await editorCore.current.save()
      const data={title:values.title,url:values.url,content:JSON.stringify(savedData)}
      if(mainphoto)
      {
        const res= await imageupload(mainphoto)
        data.photo=res.file.url
      }
      // console.log(data);
      // console.log("Title");
      // console.log(values.title)
      // console.log("URL");
      // console.log(values.url)
      // console.log("BLOG DATA");
      console.log(savedData);
      const result = await sendRequest(
        `/blog/save-blog`,
        "POST",
        JSON.stringify(data)
      ); 
      console.log(result);
      if (!error) {
        alert("Blog successfully created")
        form.resetFields();
      }
    } catch (err) {
      console.log(err);
    }
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
          <Form.Item 
            rules={[
              {
                required: true,
                message: "Please enter Main Photo"
              }
            ]}
            className={styles.formItem}>
          <Input placeholder="Add Main Photo" type="file" onChange={(e)=>{setmainphoto(e.target.files[0])}}></Input>
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
