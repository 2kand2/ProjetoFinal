import React from "react";

import styles from "./HeaderStockControl.module.css";
import { NavLink } from "react-router-dom";

const HeaderStockControl = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Controle de estoque</h1>
      <nav className={styles.nav}>
        <div className={styles.anchor}>
          <NavLink to="/home/estoque" end>
            Estoque
          </NavLink>
          <NavLink to="/home/entrada">Entrada</NavLink>
          <NavLink to="/home/saida">Saída</NavLink>
          <NavLink to="/home/relatorio_saida">Relatório de Saída</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default HeaderStockControl;
