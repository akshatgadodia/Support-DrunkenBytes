import React, {useContext} from "react";
import styles from "./stylesheets/loader.module.css";

const Loader = ({isLoading}) => {
  return (
    <div className={isLoading ? styles.loadingPage : styles.hide}>
      <div class={styles.wrapper}>
        <div class={styles.circle} />
        <div class={styles.circle} />
        <div class={styles.circle} />
        <div class={styles.shadow} />
        <div class={styles.shadow} />
        <div class={styles.shadow} />
        <span>Loading</span>
      </div>
    </div>
  );
};

export default Loader;
