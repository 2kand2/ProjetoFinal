import React from "react";

import styles from "./Login.module.css";
import foto from "../../assets/logoLogin.png";
import UseForm from "../../Hooks/UseForm";
import Input from "../Forms/Input";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { userLogin, login, error } = React.useContext(UserContext);
  const email = UseForm("email");
  const password = UseForm("password");

  function handleSubmit(event) {
    event.preventDefault();

    if (email.validate() && password.validate()) {
      userLogin(email, password);
    }
  }

  if (login === true) {
    return <Navigate to="/home" />;
  } else {
    return (
      <section className={styles.loginContainer}>
        <div className={styles.containerContent}>
          <img className={styles.logo} src={foto} alt="logo warehouse" />
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              label="email"
              type="text"
              name="email"
              placeholder="Usuário"
              {...email}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Senha"
              {...password}
            />
            <button className={styles.button}>Entrar</button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </section>
    );
  }
};

export default Login;
