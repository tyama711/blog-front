import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./models/interfaces/user";
import "./App.css";
import Masthead from "./materials/organisms/masthead";
const Home = lazy(() => import("./pages/home/components/templates/home"));
const Article = lazy(() =>
  import("./pages/article/components/templates/article")
);

interface AppState {
  user?: User;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="App">
          <Masthead
            user={this.state.user}
            onLoginSuccess={user => this.setState({ user })}
            onLogoutSuccess={() => this.setState({ user: undefined })}
          />
          <Suspense fallback={"Loading ..."}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/:id" exact component={Article} />
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
