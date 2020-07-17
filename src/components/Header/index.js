import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./index.module.scss";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <img src="/icons/github-logo.svg" alt="GitHub logo" />
    </div>
    <nav>
      <NavLink to="/">Homepage</NavLink>
    </nav>
  </header>
);

export default Header;
