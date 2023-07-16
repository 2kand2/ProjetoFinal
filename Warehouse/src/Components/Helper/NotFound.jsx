import React from "react";

import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Página Não encontrada</h1>
      <p>
        Desculpa, A página que você está procurando não existe nesse software!
      </p>
    </div>
  );
};

export default NotFound;
