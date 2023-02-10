import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import TransactionPage from "../../app/components/templates/transactionPage/TransactionPage";
const Transaction = () => {
  return (
    <DefaultLayout>
      <TransactionPage />
    </DefaultLayout>
  );
};

export default Transaction;
