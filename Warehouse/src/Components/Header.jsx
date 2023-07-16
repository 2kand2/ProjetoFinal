import React from "react";

import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import logoHome from "../assets/logohome.png";
import iconDropdown from "../assets/icondropdown.png";
import DropDownProfile from "./DropDownProfile";

const Header = ({ user }) => {
  const [openProfile, setOpenProfile] = React.useState(false);
  const dropDownRef = React.useRef(null);

  function handleDropDown() {
    setOpenProfile(!openProfile);
  }

  function handleClickOutside(event) {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setOpenProfile(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header} ref={dropDownRef}>
      <nav className={styles.nav}>
        <Link className={styles.logo} to="/">
          <img className={styles.img} src={logoHome} alt="" />
        </Link>
        <button className={styles.dropDownButton} onClick={handleDropDown}>
          <span className={styles.username}>{user.username}</span>
          <img className={styles.icon} src={iconDropdown} alt="icon dropdown" />
        </button>
        {openProfile && <DropDownProfile setOpenProfile={setOpenProfile} />}
      </nav>
    </header>
  );
};

export default Header;
