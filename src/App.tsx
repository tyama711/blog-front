import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import User from "./models/interfaces/user";
import Masthead from "./materials/organisms/masthead";
const Home = lazy(() => import("./pages/home/templates/home"));
const Article = lazy(() =>
  import("./pages/article/templates/article")
);
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
    return (
      <Router>
        <div className="app">
          <Masthead
            user={this.state.user}
            onLoginSuccess={user => {
              Cookies.set("loggedUser", user, { expires: 1 /* days */ });
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
              <Route path="/article/new" exact component={NewArticle} />} />
              <Route
                path="/article/:id"
                exact
                render={props => <Article {...props} user={this.state.user} />}
              />
              <Route path="/article/:id/edit" exact component={UpdateArticle} />
              } />
              <Route path="*" status={404}>
                Resource Not Found
              </Route>
            </Switch>
          </Suspense>
          <img src="https://www.simple-counter.com/hit.php?id=zmnaxo&nd=8&nc=4&bc=1"/>
        </div>
      </Router>
    );
  }
}

export default App;
