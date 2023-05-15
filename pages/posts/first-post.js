
import Head from "next/head";
import Script from 'next/script';
import Layout from "../../components/layout";
import Alert from "../../components/alert";
import { useState } from "react";

export default function FirstPost() {

    const [L,setL]= useState("")

    function toast(msg, type){
        setL( <Alert type={type}>{msg}</Alert>)
    }

    return (<Layout>
    <Head>
        <title>First Post</title>
        {/* <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      /> try another third party library this didnt work*/} 
    </Head>
    <h1>First Post</h1>

    <button onClick={()=>toast('Loged In successfully','success')}>Log In</button>
    <button onClick={()=>toast('Sign in page not found','error')}>Sign In</button>
    <div>{L}</div>
    </Layout>
    );


  }