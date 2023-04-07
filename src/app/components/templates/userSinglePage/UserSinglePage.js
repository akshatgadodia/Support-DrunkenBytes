import React, { useEffect, useState } from "react";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from "./components/SecondFold";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import SkeletonLoader from "../../modules/SkeletonLoader";

const UserSinglePage = (props) => {
  const { sendRequest } = useHttpClient();
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const userData = await sendRequest(
        `/user/get-user?userId=${props.userId}`
      );
      setUserData(userData.user);
    };
    fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>User | Support Drunken Bytes</title>
        <meta
          name="description"
          content="View details of a single wallet recharge transaction on Drunken Bytes. Get transaction ID, status, date, amount, and other relevant information."
        ></meta>
        <meta
          name="keywords"
          content="wallet recharge transaction, single transaction, transaction ID, transaction status, transaction date, transaction amount, Drunken Bytes."
        ></meta>
        <meta
          property="og:title"
          content="Wallet Recharge Transaction | Drunken Bytes"
        />
        <meta
          property="og:description"
          content="View details of a single wallet recharge transaction on Drunken Bytes. Get transaction ID, status, date, amount, and other relevant information."
        />
        <meta property="og:image" content="" />
        <meta
          name="twitter:title"
          content="Wallet Recharge Transaction | Drunken Bytes"
        />
        <meta
          name="twitter:description"
          content="View details of a single wallet recharge transaction on Drunken Bytes. Get transaction ID, status, date, amount, and other relevant information."
        />
        <meta name="twitter:image" content="" />
        <link
          rel="canonical"
          href="https://drunkenbytes.vercel.app/transactions/wallet-recharge/"
        />
      </Head>
      {userData?.logo === undefined ? (
        <SkeletonLoader/>
      ) : (
        <>
          <FirstFold userData={userData} />
          <SecondFold userData={userData} />
        </>
      )}
    </>
  );
};

export default UserSinglePage;
