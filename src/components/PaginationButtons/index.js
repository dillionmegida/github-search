/* eslint-disable operator-linebreak */
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./index.module.scss";
import { genRandomNumber } from "../../utils/numbers";

const PaginationButtons = ({ totalPages, active = 1, linkPrefix }) => {
  const count = 0;

  return (
    <div className={styles.buttons}>
      {totalPages > 1 &&
        Array.from(Array(totalPages), (_, index) => index + 1).map((value) => {
          const searchPattern = linkPrefix + value;

          // regex is important to replace the pattern if it exists in the URL already
          const regexToTestSearchPattern = new RegExp(`${linkPrefix}\\d{1,}`);

          const isActivePage = parseInt(active, 10) === value;

          // append this new search to the current URL
          const link = `${window.location.href.replace(
            regexToTestSearchPattern,
            ""
          )}${searchPattern}`;

          const label = count + value;

          return (
            <>
              {isActivePage ? (
                // to avoid reload when current page button is pressed
                <NavLink
                  to={link.replace(window.location.origin, "")}
                  className={styles["active-page"]}
                >
                  {label}
                </NavLink>
              ) : (
                <a key={genRandomNumber()} href={link}>
                  {label}
                </a>
              )}
            </>
          );
        })}
    </div>
  );
};

PaginationButtons.propTypes = {
  totalPages: PropTypes.number.isRequired,
  linkPrefix: PropTypes.string.isRequired,
  active: PropTypes.number.isRequired,
};

export default PaginationButtons;
