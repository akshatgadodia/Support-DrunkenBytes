import React from 'react'
import CookieBar from './components/CookieBar'
import styles from "./login.module.css"
import Image from 'next/image';

const Login = () => {
  return (
    <div className={styles.supportLogin}>
        <CookieBar/>
        <div className={styles.container}>
        <div className={styles.logoContainer}>
            <Image src="/images/drunken-bytes-logo-icon.png" fill style={{objectFit:"contain"}}/>
        </div>
        <div className={styles.loginDiv}>
        <h1> Login to Drunken Bytes</h1>
        <Form>
            
        </Form>
        </div>
        </div>
    </div>
  )
}

export default Login