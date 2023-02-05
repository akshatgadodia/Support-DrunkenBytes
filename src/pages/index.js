import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import Dashboard from "@/app/components/templates/dashboard/Dashboard";
import Login from "@/app/components/templates/login/Login";

const HomePage = () => {
  return (
    <>
    <Login/>

    {/* <DefaultLayout>
      <Dashboard />
    </DefaultLayout> */}
    </>
  );
};

export default HomePage;
