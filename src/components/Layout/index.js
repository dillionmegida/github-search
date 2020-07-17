import React from "react";
import PropTypes from "prop-types";

import styles from "./index.module.scss";

import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => (
  <div>
    <Header />
    <div className={styles.content}>{children}</div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Layout;
