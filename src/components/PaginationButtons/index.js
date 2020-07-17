import React from "react";
import PropTypes from "prop-types";

import styles from "./index.module.scss";
import { genRandomNumber } from "../../utils/numbers";

const PaginationButtons = ({ totalPages, active = 1, link }) => {
  const count = 0;

  return (
    <div className={styles.buttons}>
      {Array.from(Array(totalPages), (_, index) => index + 1).map((value) => {
        const searchPattern = link + value;

        // regex is important to replace the pattern if it exists in the URL already
        const regexToTestSearchPattern = new RegExp(`${link}\\d{1,}`);

        return (
          <a
            className={
              parseInt(active, 10) === value ? styles["active-page"] : ""
            }
            key={genRandomNumber()}
            // append the previous url to this new search
            href={`${window.location.href.replace(
              regexToTestSearchPattern,
              ""
            )}${searchPattern}`}
          >
            {count + value}
          </a>
        );
      })}
    </div>
  );
};

PaginationButtons.propTypes = {
  totalPages: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  active: PropTypes.number.isRequired,
};

export default PaginationButtons;
