import React, {useReducer, useLayoutEffect, useState} from "react";
import Head from "next/head";
import 'antd/dist/reset.css';
import "../app/styles/globals.css"
import "../app/styles/antdOverrides.css"
import AppContext from "@/app/context/AppContext";
import { reducer, initialLoggedInDetails } from "@/app/context/Reducer";
import Cookies from 'js-cookie';
import Loader from "@/app/components/modules/Loader";

export default function MyApp({ Component, pageProps }) {
  const [loggedInDetails, dispatch] = useReducer( reducer, initialLoggedInDetails);
  const [cookie,setcookie]=useState(false)
  const [r,setrole]=useState("")
  useLayoutEffect(() => {
    const setLoggedInDetails = async () => {
      const role = Cookies.get('supportUserRole')
      console.log(role);
      if(role)
      {
        setcookie(true)
        setrole(role)
      }
      console.log(role);
      if (role) {
          dispatch({
            type: "UserLogin",
            payload: {role}
          });
      }
    };
    setLoggedInDetails();
  }, []);
  if(cookie)
  {
    console.log("hello");
    Cookies.set("supportuserrole",r,{domain:window.location.href})
  }
  return (
    <AppContext.Provider value={{loggedInDetails, dispatch}}>
      <Head>
        <title>Support | Drunken Bytes</title>
        <meta charSet="UTF-8" />
        <meta name="author" content="Akshat Gadodia" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com" rel="preconnect"></link>
        <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous"></link>
      </Head>
      <Loader/>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
