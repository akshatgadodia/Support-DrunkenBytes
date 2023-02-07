import React, { useContext } from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import Dashboard from "@/app/components/templates/dashboard/Dashboard";
import Login from "@/app/components/templates/login/Login";
import AppContext from "@/app/context/AppContext";
import baseURL from "@/app/constants/baseURL";

const HomePage = props => {
  const { loggedInDetails } = useContext(AppContext);
  return !loggedInDetails.isLoggedIn
    ? <Login />
    : <DefaultLayout>
        <Dashboard props={props} />
      </DefaultLayout>;
};

export default HomePage;

export async function getServerSideProps(context) {
  try {
    const performanceDataResponse = await fetch(
      `${baseURL}/admin-dashboard/get-performance-data`,
      {
        method: "GET",
        body: null,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      }
    );
    const performanceData = await performanceDataResponse.json();
    return {
      props: {
        businessServed: performanceData.data.businessServed,
        nftsCreated: performanceData.data.nftsCreated,
        netTransactionValue: `${performanceData.data.netTransactionValue}` 
      }
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        businessServed: "N/A",
        nftsCreated: "N/A",
        netTransactionValue: "N/A"
      }
    };
  }
}
