import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import User from "./models/interfaces/user";
import Masthead from "./materials/organisms/masthead";

const Home = lazy(() => import("./pages/home/templates/home"));
const Article = lazy(() => import("./pages/article/templates/article"));
const NewArticle = lazy(() =>
  import("./pages/new-article/templates/new-article")
);
const UpdateArticle = lazy(() =>
  import("./pages/update-article/templates/update-article")
);

interface AppState {
  user?: User;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { user: Cookies.getJSON("loggedUser") };
  }

  render() {
    const { user } = this.state;
    return (
      <Router>
        <div className="app">
          <Masthead
            user={user}
            onLoginSuccess={username => {
              Cookies.set("loggedUser", username, { expires: 1 /* days */ });
              this.setState({ user: username });
            }}
            onLogoutSuccess={() => {
              Cookies.remove("loggedUser");
              this.setState({ user: undefined });
            }}
          />
          <Suspense fallback="Loading ...">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/article/new" exact component={NewArticle} />
              <Route
                path="/article/:id"
                exact
                render={props => <Article {...props} user={user} />}
              />
              <Route path="/article/:id/edit" exact component={UpdateArticle} />
              <Route path="*" status={404}>
                Resource Not Found
              </Route>
            </Switch>
          </Suspense>
          <img
            src="https://www.simple-counter.com/hit.php?id=zmnaxo&nd=8&nc=4&bc=1"
            alt="Access Counter"
          />
        </div>
      </Router>
    );
  }
}

export default App;
