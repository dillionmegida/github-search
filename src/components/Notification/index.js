import React from "react";
import PropTypes from "prop-types";

import styles from "./index.module.scss";

const Notification = ({
  show = false,
  type = "error",
  msg,
  onClickCloseBtn,
}) => {
  const nStyles = {
    error: {
      style: styles["notification-error"],
    },
    success: {
      style: styles["notification-success"],
    },
  };

  const nStyle = nStyles[type] || nStyles.error;

  return (
    <div
      className={`${styles["notification-wrapper"]} ${
        show ? styles["notification-show"] : ""
      }`}
    >
      <div className={`${styles.notification} ${nStyle.style} `}>
        <div className={styles["notification-msg"]}>{msg}</div>
        <button
          onClick={onClickCloseBtn}
          className={styles["notification-close-btn"]}
          type="button"
        >
          <img src="/icons/close-icon.png" alt="Close" />
        </button>
      </div>
    </div>
  );
};

Notification.defaultProps = {
  type: "error",
  msg: "",
};

Notification.propTypes = {
  show: PropTypes.bool.isRequired,
  type: PropTypes.string,
  msg: PropTypes.string,
  onClickCloseBtn: PropTypes.func.isRequired,
};

export default Notification;
