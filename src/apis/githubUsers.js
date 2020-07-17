import axios from "axios";
import { RESULTS_PER_PAGE } from "../utils/constants";

const searchApi = `https://api.github.com/search/users?per_page=${RESULTS_PER_PAGE}`;

export const searchUsersByUsername = async (username, page = 1) => {
  const fullApi = `${searchApi}&q=${username}&page=${page}`;
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

export const searchUsersByFullName = (fullname) => {
  const f = fullname;
  return f;
};

export const searchDetailsForAllUsers = async (users, usernameField) => {
  const userApi = "https://api.github.com/users/";
  // const requests = users.map((user) => userApi + user[usernameField]);

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

// export const searchUsersByFindInName = (name) => {};

// export const searchUsersByFindInEmail = (email) => {};

// export const searchUsersByFindInUsername = (username) => {};
