import React from "react";

import styles from "./DropDownProfile.module.css";
import UserContext from "../UserContext";

const DropDownProfile = ({ setOpenProfile }) => {
  const { userLogout } = React.useContext(UserContext);

  function handleLogout() {
    userLogout();
  }

  return (
    <ul className={styles.dropDown}>
      <li>
        <button onClick={handleLogout}>Sair</button>
      </li>
    </ul>
  );
};

export default DropDownProfile;
