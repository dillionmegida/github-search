import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import ScrollToTop from "./scrollTop";

// views
import Home from "./views/Home";

const App = () => (
  <Router>
    <ScrollToTop />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
);

export default App;
