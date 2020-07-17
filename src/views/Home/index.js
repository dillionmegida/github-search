// eslint-disable-next-line import/no-duplicates
import React from "react";
// eslint-disable-next-line import/no-duplicates
import { useState } from "react";

import styles from "./index.module.scss";

import Layout from "../../components/Layout";
import Notification from "../../components/Notification";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    msg: null,
    type: null,
  });

  const { show, msg, type } = notification;

  const hideNotification = () => setNotification(false);

  const updateSearchInputState = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const onSubmitSearchForm = async (e) => {
    e.preventDefault();

    if (searchInput === "") {
      setNotification({
        show: true,
        msg: "Search field should not be empty",
      });
      return;
    }

    let [prefix = null, value = null] = searchInput.split(":");

    setSearchInput("");

    prefix = prefix.trim().replace(" ", "+");
    if (value !== null) value = value.trim();

    // check if a prefix was used or just a value
    const usedPrefix = value !== null;

    if (usedPrefix) {
      window.location.href = `/search?prefix=${prefix}&value=${value}`;
    } else {
      window.location.href = `/search?prefix=username&value=${searchInput}`;
    }
  };

  return (
    <Layout>
      <Notification
        type={type}
        show={show}
        msg={msg}
        onClickCloseBtn={hideNotification}
      />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles["main-top"]}>
            <img src="/icons/search-icon.svg" alt="" />
            <h1>
              Search more than <strong>56M </strong> users
            </h1>
          </div>
          <div className={styles["search-form"]}>
            <form onSubmit={onSubmitSearchForm}>
              <div className={styles["input-group"]}>
                <input
                  onChange={updateSearchInputState}
                  placeholder="Search users on GitHub"
                />
                <span className={styles["input-group-message"]}>
                  Only one prefix can be used
                </span>
              </div>
              <div className={styles["submit-btn"]}>
                <input type="submit" value="Search" />
              </div>
            </form>
          </div>
          <section className={styles["search-tips-section"]}>
            <h2>Search Tips</h2>
            <ul>
              <li>
                <strong>user:[username]</strong>: to search user by username
              </li>
              <li>
                <strong>fullname:[fullname]</strong>: to search user by fullname
              </li>
              <li>
                <strong>[word] in:fullname</strong>: to search users with
                fullname that contains the word [word]
              </li>
              <li>
                <strong>[word] in:username</strong>: to search users with
                fullname that contains the word [word]
              </li>
              <li>
                <strong>[word] in:email</strong>: to search users with email
                that contains the word [word]
              </li>
            </ul>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
