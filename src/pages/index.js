import React, {useContext} from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import Dashboard from "@/app/components/templates/dashboard/Dashboard";
import Login from "@/app/components/templates/login/Login";
import AppContext from "@/app/context/AppContext";

const HomePage = () => {
  const { loggedInDetails } = useContext(AppContext);
  return !loggedInDetails.isLoggedIn
    ? <Login />
    : <DefaultLayout>
        <Dashboard />
      </DefaultLayout>;
};

export default HomePage;
