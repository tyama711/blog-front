import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import User from "./models/interfaces/user";
import Masthead from "./materials/organisms/masthead";
const Home = lazy(() => import("./pages/home/components/templates/home"));
const Article = lazy(() =>
  import("./pages/article/components/templates/article")
);
const Draft = lazy(() => import("./pages/draft/components/templates/draft"));

import "./App.scss";

interface AppState {
  user?: User;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { user: Cookies.getJSON("loggedUser") };
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="App">
          <Masthead
            user={this.state.user}
            onLoginSuccess={user => {
              Cookies.set("loggedUser", user);
              this.setState({ user });
            }}
            onLogoutSuccess={() => {
              Cookies.remove("loggedUser");
              this.setState({ user: undefined });
            }}
          />
          <Suspense fallback={"Loading ..."}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/article/:id" exact component={Article} />
              <Route path="/draft" exact component={Draft} />
              <Route path="*" status={404}>
                Resource Not Found
              </Route>
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
