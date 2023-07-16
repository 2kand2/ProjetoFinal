import React from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [login, setLogin] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = () => {
    setData(null);
    setError(null);
    setLogin(false);
    window.localStorage.removeItem("token");
  };

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/user");
          const json = await response.json();
          json.forEach((user) => {
            if (user.token === token) {
              setData(user);
              setLogin(true);
              navigate("/home/estoque");
            }
          });
        } catch (error) {
          throw new Error(error);
        }
      }
    }
    autoLogin();
  }, []);

  async function userLogin(email, password) {
    try {
      const response = await fetch("http://localhost:3000/user");
      const json = await response.json();
      json.forEach((user) => {
        if (
          user.email.toUpperCase().trim() ===
            email.value.toUpperCase().trim() &&
          user.password === password.value
        ) {
          setData(user);
          setLogin(true);
          window.localStorage.setItem("token", user.token);
          navigate("/home/estoque");
        } else {
          setLogin(false);
          setError("Usuário ou Senha inválidos");
        }
      });
    } catch (error) {
      setError(error);
    }
  }

  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, login, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
