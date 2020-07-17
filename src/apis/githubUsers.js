import axios from "axios";
import { RESULTS_PER_PAGE } from "../utils/constants";

const searchApi = `https://api.github.com/search/users?per_page=${RESULTS_PER_PAGE}`;

export const searchUsersBy = async (field, value, page = 1) => {
  const fullApi = `${searchApi}&q=${
    field === "username" ? "" : `${field}:`
  }${value}&page=${page}`;

  try {
    const result = await axios({
      url: fullApi,
      method: "get",
    });
    return result;
  } catch (err) {
    return {
      error: err,
      message: "Unable to make request. Please try again",
    };
  }
};

export const searchDetailsForAllUsers = async (users, usernameField) => {
  const userApi = "https://api.github.com/users/";

  try {
    const result = await Promise.all(
      users.map(
        (user) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          axios({
            method: "get",
            url: userApi + user[usernameField],
          })
        // eslint-disable-next-line function-paren-newline
      )
    );
    return result;
  } catch (err) {
    return {
      error: err,
      message: "Unable to make request. Please try again",
    };
  }
};

export const searchUsersByFindIn = async (field, value, page) => {
  const fullApi = `${searchApi}&q=${value}+in:${field}&page=${page}`;

  try {
    const result = await axios({
      url: fullApi,
      method: "get",
    });
    return result;
  } catch (err) {
    return {
      error: err,
      message: "Unable to make request. Please try again",
    };
  }
};
