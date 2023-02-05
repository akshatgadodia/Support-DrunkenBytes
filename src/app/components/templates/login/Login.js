import React from "react";
import CookieBar from "./components/CookieBar";
import styles from "./login.module.css";
import Image from "next/image";
import { Button, Checkbox, Form, Input } from "antd";
import CustomButton from "./../../elements/CustomButton";
const Login = () => {
  const onFinish = () => {
    console.log("SUCCESS");
  };
  const onFinishFailed = () => {
    console.log("FAILED");
  };
  return (
    <div className={styles.supportLogin}>
      <CookieBar />
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/drunken-bytes-logo-icon.png"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={styles.loginDiv}>
          <h1> Login to Drunken Bytes</h1>
          <Form
            name="basic"
            style={{ maxWidth: "100%" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your username!" }
              ]}
              className={styles.formItem}
            >
              <Input placeholder="Email" className={styles.input} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
              className={styles.formItem}
            >
              <Input.Password placeholder="Password" className={styles.input} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.button}
              >
                LOGIN
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
