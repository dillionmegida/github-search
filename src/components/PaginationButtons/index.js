/* eslint-disable operator-linebreak */
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./index.module.scss";
import { genRandomNumber } from "../../utils/numbers";

const PaginationButtons = ({
  totalPages,
  active = 1,
  linkPrefix,
  buttonsToView = 8,
}) => {
  const count = 0;

  const activePage = parseInt(active, 10);

  const halfButtonsToView = Math.floor(buttonsToView / 2);

  return (
    <div className={styles.buttons}>
      {totalPages > 1 &&
        Array.from(Array(totalPages), (_, index) => index + 1).map((value) => {
          const searchPattern = linkPrefix + value;

          // regex is important to replace the pattern if it exists in the URL already
          const regexToTestSearchPattern = new RegExp(`${linkPrefix}\\d{1,}`);

          const isCurrentValueActivePage = parseInt(active, 10) === value;

          // append this new search to the current URL
          const link = `${window.location.href.replace(
            regexToTestSearchPattern,
            ""
          )}${searchPattern}`;

          const label = count + value;

          if (isCurrentValueActivePage) {
            // return NavLink to avoid refresh on pressing the active button
            return (
              <NavLink
                to={link.replace(window.location.origin, "")}
                className={styles["active-page"]}
              >
                {label}
              </NavLink>
            );
          }

          if (value === 1) {
            // show the first button
            // show some dots after the last button if
            // the haftbuttonstoview is less activePage
            // for example, if the halfview is less than an activePage of 15
            // show dots
            return (
              <>
                <a key={genRandomNumber()} href={link}>
                  {label}
                </a>
                {halfButtonsToView < activePage && <span>...</span>}
              </>
            );
          }

          if (value === totalPages) {
            // show the last button
            // show some dots before the last button if
            // the haftbuttonstoview is less than the total pages - activePage
            // for example, 20 buttons and the activePage is 4,
            // if halfbuttons to view is less than 16
            // show dots
            return (
              <>
                {totalPages - activePage > halfButtonsToView && (
                  <span>...</span>
                )}
                <a href={link}>{label}</a>
              </>
            );
          }

          if (
            // if the value falls within the digits between
            // the activePage and the activePage + halfButtonsToView
            (value < activePage + halfButtonsToView && value > activePage) ||
            // if the value falls within the digits between
            // the activePage and the activePage - halfButtonsToView
            (value > activePage - halfButtonsToView && value < activePage)
          ) {
            return (
              <a key={genRandomNumber()} href={link}>
                {label}
              </a>
            );
          }

          return <></>;
        })}
    </div>
  );
};

PaginationButtons.defaultProps = {
  buttonsToView: 8,
};

PaginationButtons.propTypes = {
  totalPages: PropTypes.number.isRequired,
  linkPrefix: PropTypes.string.isRequired,
  active: PropTypes.number.isRequired,
  buttonsToView: PropTypes.number,
};

export default PaginationButtons;
