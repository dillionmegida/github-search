import React, { useEffect, useState } from "react";
import queryString from "query-string";

import styles from "./index.module.scss";

import Layout from "../../components/Layout";

import { searchUsersByUsername } from "../../apis/githubUsers";
import Loading from "../../components/Loading";
import Notification from "../../components/notification";

// eslint-disable-next-line react/prop-types
const UserSearchResults = ({ location: { search } }) => {
  const [results, setResults] = useState(null);
  const { prefix, value } = queryString.parse(search);
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

      const result = await searchFuncToUse(value);

      if (result.error) {
        setResults(0);
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

            {results.data.items.map(() => (
              <main>hi</main>
            ))}
          </main>
        </div>
      )}
    </Layout>
  );
};

export default UserSearchResults;
