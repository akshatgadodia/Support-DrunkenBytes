import React, {useReducer, useEffect} from "react";
import Head from "next/head";
import 'antd/dist/reset.css';
import "../app/styles/globals.css"
import "../app/styles/antdOverrides.css"
import AppContext from "@/app/context/AppContext";
import { reducer, initialLoggedInDetails } from "@/app/context/Reducer";
import Cookies from 'js-cookie';

export default function MyApp({ Component, pageProps }) {
  console.log(typeof reducer)
  const [loggedInDetails, dispatch] = useReducer( reducer, initialLoggedInDetails);
  useEffect(() => {
    const setLoggedInDetails = async () => {
      const role = Cookies.get('supportUserRole')
      if (role) {
          dispatch({
            type: "UserLogin",
            payload: {role}
          });
      }
    };
    setLoggedInDetails();
  }, []);
  return (
    <AppContext.Provider value={{loggedInDetails, dispatch}}>
      <Head>
        <title>Support | Drunken Bytes</title>
        <meta charSet="UTF-8" />
        <meta name="author" content="Akshat Gadodia" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
