import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import baseURL from "@/app/constants/baseURL";
import NftTransactionsSinglePage from '@/app/components/templates/nftTransactionsSinglePage/NftTransactionsSinglePage';

const NftTransaction = (props) => {
  return (
    <DefaultLayout>
      <NftTransactionsSinglePage transactionData={props.transaction}/>
    </DefaultLayout>
  );
};

export default NftTransaction;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { txId: "0xff06018521475d2874ba0053a1b7bf1f045d840f742f002f402799ef76c35dae" } }
    ],
    fallback: 'blocking' // false or 'blocking'
  };
}

export async function getStaticProps({params}) {
  const txId = params.txId;
  const config = {
    method: "GET",
    body: null,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: "include"
  };
  try {
    const transactions = await fetch(`${baseURL}/nft-transaction/get-transaction?transactionHash=${txId}`,config);
    const transactionsData = await transactions.json();
    return {
      props: {
        transaction:transactionsData.data.transaction,
      },
      revalidate: 60
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        transactions:{},
      },
      revalidate: 60
    };
  }
}

