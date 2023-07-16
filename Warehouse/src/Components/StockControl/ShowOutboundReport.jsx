import React from "react";

import styles from "./ShowOutboundReport.module.css";

const ShowOutboundReport = ({ setActiveModal, outbound }) => {
  return (
    <div className={styles.showContainer}>
      <div className={styles.topbox}>
        <h3 className={styles.requester}>{outbound.requester}</h3>
        <p className={styles.outDate}>{outbound.outDate}</p>
      </div>
      <div className={styles.itemBox}>
        <div className={styles.topItemBox}>
          <p>Item</p>
          <p>Quantidade</p>
        </div>
        <div className={styles.bottomItemBox}>
          <ul className={styles.listItems}>
            {outbound &&
              outbound.items.map((item, index) => {
                return (
                  <li key={index} className={styles.itemList}>
                    <p>{item.name}</p>
                    <p>{item.quantityOutbound}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShowOutboundReport;
