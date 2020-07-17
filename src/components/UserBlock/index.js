import React from "react";
import PropTypes from "prop-types";

import styles from "./index.module.scss";

// eslint-disable-next-line object-curly-newline
const UserBlock = ({ url, avatar, username, fullname, followers, bio }) => (
  <a href={url} className={styles["user-block"]}>
    <div className={styles["user-avatar"]}>
      <img src={avatar} alt="User avatar" />
    </div>
    <div className={styles["user-details"]}>
      <span>
        <strong className={styles["user-details-username"]}>username:</strong>{" "}
        {username}
      </span>
      {fullname !== null && (
        <span>
          <strong className={styles["user-details-username"]}>fullname:</strong>{" "}
          {fullname}
        </span>
      )}
      <span>
        <strong className={styles["user-details-username"]}>followers:</strong>{" "}
        {followers}
      </span>
      {bio !== null && (
        <span>
          <strong className={styles["user-details-username"]}>bio:</strong>{" "}
          {bio}
        </span>
      )}
    </div>
  </a>
);

UserBlock.defaultProps = {
  fullname: "",
  bio: "",
};

UserBlock.propTypes = {
  url: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  bio: PropTypes.string,
  fullname: PropTypes.string,
};

export default UserBlock;
