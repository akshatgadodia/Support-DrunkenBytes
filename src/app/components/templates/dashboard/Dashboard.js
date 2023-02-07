import React from "react";
import styles from "./dashboard.module.css";
import PerformanceDisplay from "./components/PerformanceDisplay";

const Dashboard = props => {
  console.log(props)

  return (
    <div className={styles.dashboard}>
      <div className={styles.performanceDiv}>
        <span>Business Performance</span>
        <hr />
        <div className={styles.performanceContainer}>
          <PerformanceDisplay
            src="/images/business-served-icon.png"
            heading="Business Served"
            value={`${props.props.businessServed}`}
            backgroundColor="#f6ba28"
          />
          <PerformanceDisplay
            src="/images/nfts-created.png"
            heading="NFT's Created"
            value={`${props.props.nftsCreated}`}
            backgroundColor="#dd3d63"
          />
          <PerformanceDisplay
            src="/images/net-transaction-value-icon.png"
            heading="Net Transaction Value"
            value={`${props.props.netTransactionValue} ETH`}
            backgroundColor="#55ce8e"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
