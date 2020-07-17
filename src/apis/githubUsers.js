import axios from "axios";
import { RESULTS_PER_PAGE } from "../utils/constants";

const api = `https://api.github.com/search/users?per_page=${RESULTS_PER_PAGE}`;

export const searchUsersByUsername = async (username, page = 1) => {
  const fullApi = `${api}&q=${username}&page=${page}`;
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

// export const searchUsersByFindInName = (name) => {};

// export const searchUsersByFindInEmail = (email) => {};

// export const searchUsersByFindInUsername = (username) => {};
