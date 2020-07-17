import React, { useEffect, useState } from "react";
import queryString from "query-string";

import styles from "./index.module.scss";

import Layout from "../../components/Layout";

import {
  searchUsersBy,
  searchDetailsForAllUsers,
  searchUsersByFindIn,
} from "../../apis/githubUsers";
import Loading from "../../components/Loading";
import Notification from "../../components/Notification";
import { genRandomNumber, addCommaToNumber } from "../../utils/numbers";
import PaginationButtons from "../../components/PaginationButtons";
import { RESULTS_PER_PAGE } from "../../utils/constants";
import UserBlock from "../../components/UserBlock";

// eslint-disable-next-line react/prop-types
const UserSearchResults = ({ location: { search } }) => {
  const { prefix, value, page = 1 } = queryString.parse(search);

  const [results, setResults] = useState({
    totalResults: null,
    resultsForCurrentPage: null,
  });

  const { totalResults, resultsForCurrentPage } = results;

  const [notification, setNotification] = useState({
    show: false,
    type: null,
    msg: null,
  });

  const { show, type, msg } = notification;

  const hideNotification = () => setNotification(false);

  const testIfSearchInPattern = /(in)$/;

  useEffect(() => {
    (async () => {
      let result;

      if (testIfSearchInPattern.test(prefix)) {
        const [phrase] = prefix.split(" ");
        if (value === "fullname") {
          result = await searchUsersByFindIn("fullname", phrase, page);
        } else if (value === "email") {
          result = await searchUsersByFindIn("email", phrase, page);
        } else {
          result = await searchUsersByFindIn("result", phrase, page);
        }
      } else {
        result = await searchUsersBy(prefix, value, page);
      }

      if (result.error) {
        setResults({
          totalResults: null,
          resultsForCurrentPage: "error",
        });
        setNotification({
          show: true,
          type: "error",
          msg: result.error.response.data.message,
        });
        return;
      }

      const allUserDetails = await searchDetailsForAllUsers(
        result.data.items,
        "login"
      );

      if (allUserDetails.error) {
        setResults({
          totalResults: null,
          resultsForCurrentPage: "error",
        });
        setNotification({
          show: true,
          type: "error",
          msg: allUserDetails.message,
        });
        return;
      }

      setResults({
        totalResults: result.data.total_count,
        resultsForCurrentPage: allUserDetails,
      });
    })();
  }, []);

  return (
    <Layout>
      <Notification
        type={type}
        msg={msg}
        show={show}
        onClickCloseBtn={hideNotification}
      />
      {resultsForCurrentPage === "error" && (
        <button
          className={styles["go-back-btn"]}
          type="button"
          onClick={() => window.history.back()}
        >
          Go back
        </button>
      )}
      {resultsForCurrentPage === null ? (
        <Loading />
      ) : (
        resultsForCurrentPage !== "error" && (
          <div className={styles.container}>
            <main className={styles.main}>
              <div className={styles["top-main"]}>
                <h1>
                  Users that match the pattern{" "}
                  <strong>
                    &quot;{prefix}: {value}&quot;
                  </strong>
                </h1>
                <p>{addCommaToNumber(totalResults)} result(s)</p>
              </div>
              <div className={styles.users}>
                {resultsForCurrentPage.map(
                  ({
                    data: {
                      avatar_url: avatarUrl,
                      login,
                      html_url: htmlUrl,
                      name,
                      followers,
                      bio,
                    },
                  }) => (
                    <UserBlock
                      key={genRandomNumber()}
                      fullname={name}
                      bio={bio}
                      followers={followers}
                      url={htmlUrl}
                      avatar={avatarUrl}
                      username={login}
                    />
                  )
                )}
              </div>
              {/* {results.data.items.map((user) => (
                <pre>{JSON.stringify(user, null, 2)}</pre>
              ))} */}
              <PaginationButtons
                totalPages={Math.ceil(totalResults / RESULTS_PER_PAGE)}
                linkPrefix="&page="
                active={page}
              />
            </main>
          </div>
        )
      )}
    </Layout>
  );
};

export default UserSearchResults;
