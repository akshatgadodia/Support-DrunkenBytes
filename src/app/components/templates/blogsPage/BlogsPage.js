import React from "react";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from "./components/SecondFold";

const Blog = (props) => {
  return (
    <div>
      <Head>
        <title>{props.blogData.title} | Support Drunken Bytes</title>
      </Head>
      <FirstFold blogData={props.blogData} />
      <SecondFold blogData={props.blogData} />
    </div>
  );
};

export default Blog;
