import React from "react";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const ArticlesWritePage = (props) => {
  return (
    <>
      <Head>
        <title>{props.mode === "write" ? "Write Article" : "Edit Article"} | Support Drunken Bytes</title>
        <meta name="description" content="View and track your raised tickets and their status on the Drunken Bytes Tickets page. Stay updated on your NFT, wallet, and other inquiries with our efficient ticket management system."></meta>
        <meta name="keywords" content="Drunken Bytes Tickets, NFT tickets, ticket management, ticket tracking, raised tickets, ticket status, NFT support, wallet inquiries, customer support, NFT issues, NFT queries"/>
        <meta property="og:title" content="NFT Transactions | Drunken Bytes" />
        <meta property="og:description" content="View and track your raised tickets and their status on the Drunken Bytes Tickets page. Stay updated on your NFT, wallet, and other inquiries with our efficient ticket management system." />
        <meta property="og:image" content="https://drunkenbytes.vercel.app/images/page-shots/tickets.png" />
        <meta name="twitter:title" content="NFT Transactions | Drunken Bytes" />
        <meta name="twitter:description" content="View and track your raised tickets and their status on the Drunken Bytes Tickets page. Stay updated on your NFT, wallet, and other inquiries with our efficient ticket management system." />
        <meta name="twitter:image" content="https://drunkenbytes.vercel.app/images/page-shots/tickets.png"/>
        <link rel="canonical" href="https://drunkenbytes.vercel.app/tickets" />
        <link rel="og:url" href="https://drunkenbytes.vercel.app/tickets" />
      </Head>
      <FirstFold mode={props.mode}/>
      <SecondFold mode={props.mode} articleUrl={props.articleUrl}/>
    </>
  );
};

export default ArticlesWritePage;
