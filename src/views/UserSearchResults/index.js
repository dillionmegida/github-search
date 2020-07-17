import React, { useEffect, useState } from "react";
import queryString from "query-string";

import styles from "./index.module.scss";

import Layout from "../../components/Layout";

import { searchUsersByUsername } from "../../apis/githubUsers";
import Loading from "../../components/Loading";
import Notification from "../../components/notification";
import { genRandomNumber } from "../../utils/numbers";
import PaginationButtons from "../../components/PaginationButtons";
import { RESULTS_PER_PAGE } from "../../utils/constants";

// eslint-disable-next-line react/prop-types
const UserSearchResults = ({ location: { search } }) => {
  const { prefix, value, page = 1 } = queryString.parse(search);

  const [results, setResults] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    type: null,
    msg: null,
  });

  const { show, type, msg } = notification;

  const hideNotification = () => setNotification(false);

  useEffect(() => {
    (async () => {
      let searchFuncToUse;

      switch (prefix) {
        default:
          searchFuncToUse = searchUsersByUsername;
      }

      const result = await searchFuncToUse(value, page);

      if (result.error) {
        setResults("error");
        setNotification({ show: true, type: "error", msg: result.message });
        return;
      }

      setResults(result);
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
      {results === null ? (
        <Loading />
      ) : (
        results !== "error" && (
          <div className={styles.container}>
            <main className={styles.main}>
              <div className={styles["top-main"]}>
                <h1>
                  Users with the{" "}
                  <strong>
                    {prefix}: &quot;{value}&quot;
                  </strong>
                </h1>
                <p>{results.data.total_count} results</p>
              </div>
              <div className={styles.users}>
                {results.data.items.map((user) => (
                  <a
                    href={user.html_url}
                    className={styles["user-block"]}
                    key={genRandomNumber()}
                  >
                    <div className={styles["user-avatar"]}>
                      <img src={user.avatar_url} alt="User avatar" />
                    </div>
                    <div className={styles["user-details"]}>
                      <span>
                        <strong className={styles["user-details-username"]}>
                          username:
                        </strong>{" "}
                        {user.login}
                      </span>
                      <span>
                        <strong className={styles["user-details-username"]}>
                          fullname:
                        </strong>{" "}
                        {user.login}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
              {/* {results.data.items.map((user) => (
                <pre>{JSON.stringify(user, null, 2)}</pre>
              ))} */}
              <PaginationButtons
                totalPages={Math.ceil(
                  results.data.total_count / RESULTS_PER_PAGE
                )}
                link="&page="
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
