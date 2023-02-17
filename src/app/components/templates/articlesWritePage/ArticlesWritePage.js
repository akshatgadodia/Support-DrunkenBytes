import React, {useState} from "react";
import styles from "./articlesWritePage.module.css";
import Head from "next/head";
import { Button, Form, Input } from "antd";
import dynamic from "next/dynamic";
import { useHttpClient } from "@/app/hooks/useHttpClient";

let Editor = dynamic(() => import("@/app/components/modules/Editor"), {
    ssr: false
  });
const ArticlesWritePage = () => {
  const { error, sendRequest, isLoading } = useHttpClient();
  const [articleData,setArticleData] = useState({});
  const editorCore = React.useRef(null);
  const [form] = Form.useForm();
  const onFinish = async values => {
    try {
      const savedData = await editorCore.current.save()
      console.log("Title");
      console.log(values.title)
      console.log("URL");
      console.log(values.url)
      console.log("BLOG DATA");
      console.log(savedData);
      const result = await sendRequest(
        `/article/save-article`,
        "POST",
        JSON.stringify({
          title: values.title,
          url: values.url,
          content:JSON.stringify(savedData),
        })
      ); 
      console.log(result);
      if (!error) {
        alert("Article successfully created")
        form.resetFields();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.writeArticle}>
      <Head>
        <title>Write Article | Support Drunken Bytes</title>
      </Head>
      <h1>Write a Article</h1>
      <p className={styles.p}>Write whats on your mind</p>
      <div className={styles.articleDiv}>
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
                message: "Please enter Article Title"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Article Title" className={styles.input} />
          </Form.Item>
          <Form.Item
            name="url"
            rules={[
              {
                required: true,
                message: "Please enter Article URL"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Article URL" className={styles.input} />
          </Form.Item>
            <Editor data={articleData} setData={setArticleData} editorCore={editorCore}/>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              CREATE ARTICLE
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ArticlesWritePage;
