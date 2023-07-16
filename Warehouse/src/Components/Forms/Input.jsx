import React from "react";

import styles from "./Input.module.css";

const Input = ({ type, name, value, onChange, error, onBlur, placeholder }) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
