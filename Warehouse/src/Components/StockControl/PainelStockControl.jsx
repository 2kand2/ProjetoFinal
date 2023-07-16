import React from "react";
import { Route, Routes } from "react-router-dom";

import Stock from "./Stock";
import Inbound from "./Inbound";
import Outbound from "./Outbound";
import OutboundReport from "./OutboundReport";
import HeaderStockControl from "./HeaderStockControl";

import styles from "./PainelStockControl.module.css";

const PainelStockControl = () => {
  return (
    <section className={styles.painel}>
      <HeaderStockControl />
      <Routes>
        <Route path="/estoque" element={<Stock />} />
        <Route path="/entrada" element={<Inbound />} />
        <Route path="/saida" element={<Outbound />} />
        <Route path="/relatorio_saida" element={<OutboundReport />} />
      </Routes>
    </section>
  );
};

export default PainelStockControl;
