import React from "react";
import Helmet from "react-helmet";

import PropTypes from "prop-types";

const AppHelmet = ({ pageTitle }) => (
  <Helmet>
    <title>{pageTitle}</title>;
  </Helmet>
);

AppHelmet.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default AppHelmet;
