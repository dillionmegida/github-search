import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import ScrollToTop from "./scrollTop";

// views
import Home from "./views/Home";
import UserSearchResults from "./views/UserSearchResults";

const App = () => (
  <Router>
    <ScrollToTop />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={UserSearchResults} />
    </Switch>
  </Router>
);

export default App;
