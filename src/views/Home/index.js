import React from "react";
import styles from "./index.module.scss";

import Layout from "../../components/Layout";
// import { useState } from "react";

// const [searchInput, setSearchInput] = useState("");
// const [notification, setNotification] = useState({
//   show: false,
//   msg: null,
//   type: null,
// });

// const updateSearchInputState = ({ target: { value } }) => {
//   setSearchInput(value);
// };

// const onSubmitSearchForm = (e) => {
//   e.preventDefault();
//   if (searchInput === "") {
//     setNotification({
//       show: true,
//       msg: "Search field should not be empty",
//     });
//   }
// };
const Home = () => (
  <Layout>
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles["main-top"]}>
          <img src="/icons/search-icon.svg" alt="" />
          <h1>
            Search more than <strong>56M </strong> users
          </h1>
        </div>
        <div className={styles["search-form"]}>
          <form>
            <div className={styles["input-group"]}>
              <input placeholder="Search users on GitHub" />
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
          </ul>
        </section>
      </div>
    </main>
  </Layout>
);

export default Home;
