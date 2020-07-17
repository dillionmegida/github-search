import React from "react";
import styles from "./index.module.scss";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <img src="/icons/github-logo.svg" alt="GitHub logo" />
    </div>
  </header>
);

export default Header;
