import axios from "axios";

const api = "https://api.github.com/search/users";

export const searchUsersByUsername = async (username) => {
  const fullApi = `${api}?q=${username}`;
  try {
    const result = await axios({
      url: fullApi,
      method: "get",
    });
    return result;
  } catch (err) {
    return {
      error: err,
      message: "Unable to make request",
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
