import React from "react";

import Header from "./Header";

import styles from "./Home.module.css";
import UserContext from "../UserContext";
import PainelStockControl from "./StockControl/PainelStockControl";

const Home = () => {
  const { data } = React.useContext(UserContext);

  return (
    <div className={styles.container}>
      <Header user={data} />
      <div className={styles.nav}></div>
      <PainelStockControl />
    </div>
  );
};

export default Home;
